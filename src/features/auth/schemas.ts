import { z } from "zod";

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address"));

export const PasswordSchema = z
  .string()
  .min(10, { error: "Use at least 10 characters" })
  .regex(/[a-z]/, { error: "Include at least one lowercase letter" })
  .regex(/[A-Z]/, { error: "Include at least one uppercase letter" })
  .regex(/[0-9]/, { error: "Include at least one number" })
  .regex(/[^A-Za-z0-9]/, { error: "Include at least one special character" });

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
  email: z.string().pipe(z.email()),
  name: z.string().nullable(),
  avatarUrl: z.string().pipe(z.url()).nullable(),
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
