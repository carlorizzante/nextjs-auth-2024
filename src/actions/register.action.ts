'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterSchema } from '@/schemas';

export const registerAction = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid name, email, or password' }

  } else {
    const { name, email, password } = validatedValues.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    // const existingUser = await db.user.findUnique({ where: { email } });
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: 'Email already used.' }
    } else {
      await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      const verificationToken = await generateVerificationToken(email);
      if (verificationToken) {
        await sendVerificationEmail(email, verificationToken);
        return { success: 'Success! Please look into your inbox folder and confirm your email.' }
      } else {
        return { error: 'Failed to send verification email.' }
      }
    }
  }
}
