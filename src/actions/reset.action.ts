'use server';

import * as z from 'zod';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '@/lib/email';
import { ResetSchema } from '@/lib/schemas';
import { generateVerificationToken } from '@/lib/token';
import {
  generatePasswordResetToken,
} from '@/lib/token/generate-password-reset-token';
import { getUserByEmail } from '@/lib/user';

export const resetAction = async (values: z.infer<typeof ResetSchema>) => {
  const validatedValues = ResetSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid email.' }

  } else {
    const { email } = validatedValues.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
      return { error: 'Email not found.' }
    }

    if (!existingUser.emailVerified) {
      const token = await generateVerificationToken(email);
      if (token) {
        await sendVerificationEmail(email, token);
        return { success: 'Please verify your email first.' }
      }
    }

    try {
      const token = await generatePasswordResetToken(email);
      if (token) {
        await sendPasswordResetEmail(email, token);
        return { success: 'Reset email sent. Please check your inbox.' }
      } else {
        return { error: 'Unable to generate password reset token.' }
      }

    } catch (error) {
      console.log(error);
      return { error: 'Unable to send password reset email.' }
    }
  }
}
