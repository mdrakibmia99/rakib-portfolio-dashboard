import { z } from 'zod';

const createSkillZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required!!',
      })
      .min(1, 'Name cannot be empty'),

    icon: z
      .string({
        required_error: 'Icon is required!',
      })
      .min(1, 'Icon cannot be empty'),

    category: z
      .string({
        required_error: 'Category is required!',
      })
      .min(1, 'Category cannot be empty'),
  }),
});

const updateSkillZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
    category: z.string().optional(),
  }),
});

const skillCategorySchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Title is required' })
      .max(100, { message: 'Title is too long' })
      .trim(),

    icon: z
      .string()
      .min(1, { message: 'Icon is required' })
      .trim(),
  }),
});


export const SkillValidation = {
  createSkillZodSchema,
  updateSkillZodSchema,
  skillCategorySchema,
};
