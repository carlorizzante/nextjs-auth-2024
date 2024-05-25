import crypto from 'crypto';
import { db } from '@/lib/db';
import { getTwoFactorTokenByEmail } from './get-two-factor-token-by-email';

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 999_999).toString();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60); // 1 hour
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    try {
      await db.twoFactorToken.delete({
        where: {
          id: existingToken.id,
        },
      });

    } catch (error) {
      console.error(error);
      return null;
    }
  }

  try {
    await db.twoFactorToken.create({
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
