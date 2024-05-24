'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';
import { signIn } from '@/auth';
import { REDIRECT_AFTER_LOGIN } from '@/auth.config';
import { sendVerificationEmail } from '@/lib/email';
import { LoginSchema } from '@/lib/schemas';
import { generateVerificationToken } from '@/lib/token';
import { getUserByEmail } from '@/lib/user';

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid email or password' }

  } else {
    const { email, password } = validatedValues.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: 'Invalid email or password.' }
    }

    if (!existingUser.emailVerified) {
      const token = await generateVerificationToken(email);
      if (token) {
        await sendVerificationEmail(email, token);
        return { success: 'Please verify your email first.' }
      }
    }

    try {
      await signIn('credentials', { email, password, redirectTo: REDIRECT_AFTER_LOGIN });
      // Placeholder for future 2FA implementation
      return { success: 'Logged in successfully' }

    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin' || 'CredentialsVerification':
            return { error: 'Invalid email or password.' }
          default:
            return { error: 'An error occurred.' }
        }
      }
      // Throw error if not an AuthError to force redirection
      throw error;
    }
  }
}
