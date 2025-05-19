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
export const SkillValidation = {
  createSkillZodSchema,
  updateSkillZodSchema,
};
