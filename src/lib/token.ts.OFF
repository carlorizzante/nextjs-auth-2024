import { v4 as uuid } from 'uuid';
import { db } from '@/lib/db';
import {
  User,
  VerificationToken,
} from '@prisma/client';

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

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({
      where: { email },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

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
