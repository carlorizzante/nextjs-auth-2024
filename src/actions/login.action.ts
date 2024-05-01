'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';
import { signIn } from '@/auth';
import { REDIRECT_AFTER_LOGIN } from '@/auth.config';
import { LoginSchema } from '@/schemas';

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid email or password' }

  } else {
    const { email, password } = validatedValues.data;

    try {
      await signIn('credentials', { email, password, redirectTo: REDIRECT_AFTER_LOGIN });
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
