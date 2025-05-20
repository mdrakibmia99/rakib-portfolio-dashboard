"use client";

import { useForm, } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { createSkill } from "@/services/Skill";

// Assuming category is selected from a dropdown
const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  icon: z.any().optional(),
});

type SkillFormData = z.infer<typeof skillSchema>;

export default function SkillForm({ categories }: { categories: any[] }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
  });

  const onSubmit = async (data: SkillFormData) => {
    if (!data.icon || (data.icon as FileList).length === 0) {
      toast.error("Please upload an icon image.");
      return;
    }

    const formData = new FormData();
    const {name,category} = data;
    formData.append("data", JSON.stringify({ name, category }));

    formData.append("image", (data.icon as FileList)[0]);

    try {
      setLoading(true);
      const res = await createSkill(formData);
      if (res.success) {
        toast.success("Skill created successfully");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto p-6 border rounded-md shadow">
      {/* Name */}
      <div className="space-y-1">
        <Label htmlFor="name">Skill Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Category */}
      <div className="space-y-1">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          {...register("category")}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
      </div>

      {/* Icon Upload */}
      <div className="space-y-1">
        <Label htmlFor="icon">Icon (Image)</Label>
        <Input
          id="icon"
          type="file"
          accept="image/*"
          {...register("icon")}
          onChange={(e) => {
            register("icon").onChange(e);
            handlePreview(e);
          }}
        />
        {preview && (
          <div className="w-20 h-20 mt-2 relative rounded overflow-hidden border">
            <Image src={preview} alt="Preview" fill className="object-contain" />
          </div>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Skill"}
      </Button>
    </form>
  );
}
