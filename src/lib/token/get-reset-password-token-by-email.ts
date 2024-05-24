import { db } from '@/lib/db';

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    return await db.passwordResetToken.findFirst({
      where: { email },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
