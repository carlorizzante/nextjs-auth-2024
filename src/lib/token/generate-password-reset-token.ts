import { v4 as uuid } from 'uuid';
import { db } from '@/lib/db';
import {
  getResetPasswordTokenByEmail,
} from './get-reset-password-token-by-email';

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 10); // 10 minutes
  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken) {
    try {
      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        }
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  try {
    await db.passwordResetToken.create({
      data: {
        token,
        email,
        expiresAt,
      },
    });
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
}
