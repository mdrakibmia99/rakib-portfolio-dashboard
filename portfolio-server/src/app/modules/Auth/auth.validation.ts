import { z } from 'zod';
import { USER_ROLE } from '../../constants/user';
const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email must be provided and must be a string',
      })
      .email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});
const updatePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password  is required' }),
    newPassword: z.string({ required_error: 'New Password is required' }),
  }),
});

const contactValidationSchema = z.object({
 body: z.object({ name: z.string().min(2),
  email: z.string().email(),
  subjectLine: z.string().min(3),
  message: z.string(),})
});
export const authValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  updatePasswordValidationSchema,
  contactValidationSchema
};
export type TUserRole = keyof typeof USER_ROLE;