import { z } from "zod";
export const loginValidationSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email("Invalid Email"),
  password: z.string({
    required_error: "Required Password",
  }),
});
