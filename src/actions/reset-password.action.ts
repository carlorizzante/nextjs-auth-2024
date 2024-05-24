'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { db } from '@/lib/db';
import { ResetPasswordSchema } from '@/lib/schemas';
import { getResetPasswordTokenByToken } from '@/lib/token';
import { getUserByEmail } from '@/lib/user';

type ResetPasswordActionProps = z.infer<typeof ResetPasswordSchema> & {
  email: string | null;
  token: string | null;
}

export const resetPasswordAction = async (values: ResetPasswordActionProps) => {
  const validatedValues = ResetPasswordSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid fields.' }

  } else {
    const { password, confirmPassword } = validatedValues.data;
    const { email, token } = values;

    if (!email || !token) {
      return { error: 'Email or token not found.' }
    }

    const existingUser = await getUserByEmail(email);
    const existingToken = await getResetPasswordTokenByToken(token);

    if (!existingUser || !existingToken) {
      return { error: 'Invalid email or token.' }
    }
    if (existingUser && !existingUser.emailVerified) {
      return { success: 'Please verify your email first.' }
    }
    if (existingUser.email !== email) {
      return { error: 'Invalid email.' }
    }
    if (existingToken.token !== token) {
      return { error: 'Invalid token.' }
    }
    if (existingToken.email !== email) {
      return { error: 'Email mismatch.' }
    }
    if (new Date(existingToken.expiresAt) < new Date()) {
      return { error: 'Token has expired.' }
    }
    if (password !== confirmPassword) {
      return { error: 'Passwords do not match.' }
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
      });
      await db.passwordResetToken.delete({ where: { id: existingToken.id } });
      return { success: 'Password updated!' }

    } catch (error) {
      console.log(error);
      return { error: 'Unable to update password.' }
    }
  }
}
