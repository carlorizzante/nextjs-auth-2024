import * as z from 'zod';
import { UserRole } from '@prisma/client';

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
  code: z.optional(z.string().min(6, {
    message: "Invalid 2FA code"
  })),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required"
  }),
});

export const EmailVerificationSchema = z.object({
  email: z.string().email(),
  token: z.string()
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  })
});

export const ResetPasswordSchema = z.object({
  // email: z.string().email({
  //   message: "Email is required"
  // }),
  password: z.string().min(6, {
    message: "Password is required (min 6 characters)"
  }),
  confirmPassword: z.string().min(6, {
    message: "You need to confirm your password"
  }),
});

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  confirmPassword: z.optional(z.string().min(6)),
  role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
  isTwoFactorEnabled: z.optional(z.boolean()),
})
  .refine(data => {
    return data.password === data.confirmPassword;
  }, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });
