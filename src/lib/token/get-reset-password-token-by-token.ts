import { db } from '@/lib/db';

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    return await db.passwordResetToken.findUnique({
      where: { token },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
