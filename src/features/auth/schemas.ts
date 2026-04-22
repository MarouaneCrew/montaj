import { z } from "zod";

export const EmailSchema = z.string().trim().toLowerCase().email("Enter a valid email address");

export const PasswordSchema = z.string().min(6, "Use at least 6 characters");

export const SignUpSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const LogInSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, "Enter your password"),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  avatarUrl: z.string().url().nullable(),
  createdAt: z.string(),
});

export const SessionSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type LogInInput = z.infer<typeof LogInSchema>;
export type User = z.infer<typeof UserSchema>;
export type Session = z.infer<typeof SessionSchema>;
