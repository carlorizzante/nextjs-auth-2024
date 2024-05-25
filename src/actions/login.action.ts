'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';
import { signIn } from '@/auth';
import { REDIRECT_AFTER_LOGIN } from '@/auth.config';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';
import { sendTwoFactorEmail } from '@/lib/email/send-two-factor-email';
import { LoginSchema } from '@/lib/schemas';
import {
  generateVerificationToken,
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
} from '@/lib/token';
import {
  generateTwoFactorToken,
} from '@/lib/token/generate-two-factor-confirmation';
import { getUserByEmail } from '@/lib/user';

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid email or password' }

  } else {
    const { email, password, code } = validatedValues.data;
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

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const token = await getTwoFactorTokenByEmail(email);
        if (!token || token.token !== code) {
          return { error: 'Invalid two-factor authentication code.' }
        }
        if (token.expiresAt < new Date()) {
          // TODO: remove expired tokens
          return { error: 'Two-factor authentication code expired.' }
        }
        await db.twoFactorToken.delete({
          where: {
            id: token.id,
          },
        });
        const confirmationToken = await getTwoFactorConfirmationByUserId(existingUser.id);
        if (confirmationToken) {
          await db.twoFactorConfirmation.delete({
            where: {
              id: confirmationToken.id,
            },
          });
        }
        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          },
        });
      } else {
        const token = await generateTwoFactorToken(email);
        if (token) {
          await sendTwoFactorEmail(email, token);
          return {
            twofactor: true,
            success: 'Please enter your two-factor authentication code.'
          }
        }
      }
    }

    try {
      await signIn('credentials', { email, password, redirectTo: REDIRECT_AFTER_LOGIN });
      return { success: 'Logged in successfully' }

    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin' || 'CredentialsVerification':
            return { error: 'Invalid email or password.' }
          default:
            console.log('login.action > An error occurred.', error)
            return { error: 'login.action > An error occurred.' }
        }
      }
      // Throw error if not an AuthError to force redirection
      console.log(error);
      throw error;
    }
  }
}
