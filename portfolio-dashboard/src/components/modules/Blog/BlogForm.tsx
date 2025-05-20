"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import RichTextEditor from "@/components/rich-text-editor";
import { useRouter } from "next/navigation";

import { Loader } from "lucide-react";
import { createBlog } from "@/services/Blog";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  images: z.any().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function BlogForm() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    if (!data.images || (data.images as FileList).length === 0) {
      toast.error("Please upload at least one image!");
      return;
    }

    const formData = new FormData();

    const payload = {
      title: data.title,
      description: data.description,
      content: data.content,
    };

    formData.append("data", JSON.stringify(payload));
    Array.from(data.images as FileList).forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);
      const res = await createBlog(formData); // replace with actual API call
      if (res?.success) {
        toast.success(res?.message);
        router.push(`/blogs/${res?.data?._id}`);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewImages(urls);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-6 border rounded-lg shadow-md"
    >
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} placeholder="Blog Title" />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="A short summary of the blog"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Blog Content</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor content={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* Cover Images */}
      <div className="space-y-2">
        <Label htmlFor="images">Cover Images</Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          {...register("images")}
          onChange={(e) => {
            register("images").onChange(e);
            handleImagePreview(e);
          }}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {previewImages.map((src, i) => (
            <div
              key={i}
              className="relative h-20 w-20 rounded overflow-hidden border"
            >
              <Image
                src={src}
                alt={`preview-${i}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="bg-green-800 hover:bg-green-900 text-white flex items-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Blog"
        )}
      </Button>
    </form>
  );
}
