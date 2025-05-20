"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import RichTextEditor from "@/components/rich-text-editor";
import { createProject } from "@/services/Projects";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  details: z.string().min(1, "details is required"),
  techStack: z
    .array(z.string().min(1, "Tech is required"))
    .nonempty("At least one tech stack is required"),
  liveUrl: z.string().url().optional(),
  serverLiveUrl: z.string().url().optional(),
  frontendGithubRepoLink: z.string().url().optional(),
  backendGithubRepoLink: z.string().url().optional(),
  images: z.any().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectForm() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      details: "",
      techStack: [""],
      liveUrl: "",
      serverLiveUrl: "",
      frontendGithubRepoLink: "",
      backendGithubRepoLink: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techStack",
  });

  useEffect(() => {
    if (fields.length === 0) append("");
  }, [fields, append]);

  const onSubmit = async (data: ProjectFormData) => {
    if (!data.images || (data.images as FileList).length === 0) {
      toast.error("Please select at least one image!");
      return;
    }

    const formData = new FormData();

    const payload = {
      title: data.title,
      description: data.description,
      details: data.details,
      techStack: data.techStack,
      liveUrl: data.liveUrl,
      serverLiveUrl: data.serverLiveUrl,
      frontendGithubRepoLink: data.frontendGithubRepoLink,
      backendGithubRepoLink: data.backendGithubRepoLink,
    };

    formData.append("data", JSON.stringify(payload));

    Array.from(data.images as FileList).forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);
      const res = await createProject(formData);
      if (res?.success) {
        toast.success(res?.message);
        router.push(`/projects/${res?.data?._id}`);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to create project.");
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
        <Input id="title" {...register("title")} placeholder="Project Title" />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      {/* details */}
      <div className="space-y-2">
        <Label htmlFor="details">Details</Label>
        <Input id="details" {...register("details")} placeholder="Project Title" />
        {errors.title && (
          <p className="text-sm text-red-500">{errors?.details?.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <RichTextEditor content={field.value} onChange={field.onChange} />
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <Label>Tech Stack</Label>
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-center">
              <Input
                {...register(`techStack.${index}`)}
                placeholder={`Tech #${index + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => append("")}
          className="mt-2"
        >
          + Add Tech
        </Button>
        {errors.techStack && (
          <p className="text-sm text-red-500">
            {(errors.techStack as any)?.message}
          </p>
        )}
      </div>

      {/* Additional Links */}
      <div className="space-y-2">
        <Label htmlFor="liveUrl">Live URL</Label>
        <Input id="liveUrl" {...register("liveUrl")} placeholder="https://example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="serverLiveUrl">Server Live URL</Label>
        <Input id="serverLiveUrl" {...register("serverLiveUrl")} placeholder="https://api.example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="frontendGithubRepoLink">Frontend GitHub Repo</Label>
        <Input id="frontendGithubRepoLink" {...register("frontendGithubRepoLink")} placeholder="https://github.com/user/frontend" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="backendGithubRepoLink">Backend GitHub Repo</Label>
        <Input id="backendGithubRepoLink" {...register("backendGithubRepoLink")} placeholder="https://github.com/user/backend" />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="images">Upload Images</Label>
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
            <div key={i} className="relative h-20 w-20 rounded overflow-hidden border">
              <Image src={src} alt={`preview-${i}`} fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="bg-green-800 hover:bg-green-900 text-white transition-colors duration-200 cursor-pointer flex items-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Project"
        )}
      </Button>
    </form>
  );
}
