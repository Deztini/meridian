import { z } from "zod";

const strongPassword =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      strongPassword,
      "Password must contain at least one letter,number and special character",
    ),
});


export type SignupInput = z.infer<typeof signupSchema>;