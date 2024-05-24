import { db } from '@/lib/db';
import {
  User,
  VerificationToken,
} from '@prisma/client';

export const verifyEmail = async ({ user, token }: { user: User, token: VerificationToken }) => {
  try {
    await db.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date(), email: token.email.toLowerCase() },
    });
    await db.verificationToken.delete({
      where: { id: token.id },
    });
    return { success: 'Email verified!' };

  } catch (error) {
    console.error(error);
    return { error: 'Unable to verify email.' };
  }
}
