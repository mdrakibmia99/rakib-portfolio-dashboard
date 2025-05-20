'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Image from 'next/image';

// Zod Schema
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  techStack: z.array(z.string().min(1, 'Tech is required')).nonempty('At least one tech stack is required'),
  images: z.any().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectForm() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      techStack: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techStack',
  });

  // Always keep at least one tech field
  useEffect(() => {
    if (fields.length === 0) append('');
  }, [fields, append]);

  const onSubmit = async (data: ProjectFormData) => {
    if (!data.images || (data.images as FileList).length === 0) {
      toast.error('Please select at least one image!');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);

    data.techStack.forEach((tech, index) => {
      formData.append(`techStack[${index}]`, tech);
    });

    const files = (data.images as FileList) || [];
    Array.from(files).forEach((file) => {
      formData.append('images', file);
    });

    // For debug
    console.log([...formData.entries()]);
    // TODO: API call here
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
        <Input id="title" {...register('title')} placeholder="Project Title" />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Project Description"
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
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
        <Button type="button" size="sm" onClick={() => append('')} className="mt-2">
          + Add Tech
        </Button>
        {errors.techStack && (
          <p className="text-sm text-red-500">{(errors.techStack as any)?.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="images">Upload Images</Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          {...register('images')}
          onChange={(e) => {
            register('images').onChange(e);
            handleImagePreview(e);
          }}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {previewImages.map((src, i) => (
            <div key={i} className="relative h-20 w-20 rounded overflow-hidden border">
              <Image
                src={src}
                alt={`preview-${i}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button type="submit">Submit Project</Button>
    </form>
  );
}
