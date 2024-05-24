'use server';

import { EmailVerificationSchema } from '@/lib/schemas';
import {
  getVerificationTokenByToken,
  verifyEmail,
} from '@/lib/token';
import { getUserByEmail } from '@/lib/user';

export const verifyEmailAction = async (values: { email: string | null; token: string | null; }) => {
  const validatedValues = EmailVerificationSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Unable to verify email.' }

  } else {
    const { email, token } = validatedValues.data;
    const existingUser = await getUserByEmail(email);
    const existingToken = await getVerificationTokenByToken(token);

    if (existingUser?.emailVerified) {
      return { success: 'Email already verified.' }
    }
    if (!existingUser || !existingToken) {
      return { error: 'Invalid email or token.' }
    }
    if (existingUser.email !== email) {
      return { error: 'emailVerification > Invalid email.' }
    }
    if (existingToken.token !== token) {
      return { error: 'Invalid token.' }
    }
    if (new Date(existingToken.expiresAt) < new Date()) {
      return { error: 'Token expired.' }
    }

    try {
      await verifyEmail({ user: existingUser, token: existingToken });
      return { success: 'Email verified successfully' }

    } catch (error) {
      console.log(error);
      return { error: 'Unable to verify email.' }
    }
  }
}
