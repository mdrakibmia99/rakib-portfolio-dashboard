import { z } from 'zod';

export const UserRoleEnum = z.enum(['admin', 'user']);
// User Validation Schema
export const UserValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: UserRoleEnum.default('user'),
  }),
});

// Validation for User Login
export const UserLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});


const updatePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password  is required' }),
    newPassword: z.string({ required_error: 'New Password is required' }),
  }),
});



export const updateUserProfileSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    image: z.string().optional(),
  }),
});



export const userValidation = {
  UserValidationSchema,
  UserLoginSchema,
  updatePasswordValidationSchema,
  updateUserProfileSchema
};
