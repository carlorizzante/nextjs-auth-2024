import { v4 as uuid } from 'uuid';
import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from './get-verification-token-by-email';

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60); // 1 hour
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    try {
      await db.verificationToken.delete({
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
    await db.verificationToken.create({
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
