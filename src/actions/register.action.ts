'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';
import { RegisterSchema } from '@/lib/schemas';
import { generateVerificationToken } from '@/lib/token';
import { getUserByEmail } from '@/lib/user';

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
      const token = await generateVerificationToken(email);
      if (token) {
        await sendVerificationEmail(email, token);
        return { success: 'Success! Please look into your inbox folder and confirm your email.' }
      } else {
        return { error: 'Failed to send verification email.' }
      }
    }
  }
}
