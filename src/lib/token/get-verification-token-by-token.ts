import { db } from '@/lib/db';

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await db.verificationToken.findUnique({
      where: { token },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
