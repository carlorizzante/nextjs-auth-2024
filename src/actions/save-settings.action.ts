'use server';

import bcrypt from 'bcryptjs';
import _ from 'lodash';
import * as z from 'zod';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';
import { SettingsSchema } from '@/lib/schemas';
import { generateVerificationToken } from '@/lib/token';
import { getUserById } from '@/lib/user';

export const saveSettingsAction = async (values: z.infer<typeof SettingsSchema>) => {
  console.log('settings-action > values', values);
  const user = await currentUser();
  const userFromDB = await getUserById(user?.id);

  if (!user || !userFromDB) {
    return { error: 'Not user found.' };
  }

  const validatedValues = SettingsSchema.safeParse(values) as { success: boolean; data: z.infer<typeof SettingsSchema> }

  if (user.isOAuth) {
    validatedValues.data.email = undefined;
    validatedValues.data.password = undefined;
    validatedValues.data.confirmPassword = undefined;
    validatedValues.data.isTwoFactorEnabled = undefined;
  }

  if (validatedValues.data.email && validatedValues.data.email !== user.email) {
    const emailInUse = await db.user.findFirst({
      where: { email: validatedValues.data.email }
    });
    if (emailInUse) {
      return { error: 'Email is already in use.' };
    } else {
      const verificationToken = await generateVerificationToken(validatedValues.data.email);
      if (verificationToken) {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: null }
        });
        await sendVerificationEmail(validatedValues.data.email, verificationToken);
        return { success: 'Verification email sent!' }
      }
    }
  }

  if (validatedValues.data.password && validatedValues.data.confirmPassword) {
    const passwordMatch = await bcrypt.compare(validatedValues.data.password, validatedValues.data.confirmPassword);
    if (!passwordMatch) {
      return { error: 'Passwords do not match.' };
    } else {
      validatedValues.data.password = await bcrypt.hash(validatedValues.data.password, 10);
      validatedValues.data.confirmPassword = undefined;
    }
  }

  try {
    if (validatedValues.success) {
      await db.user.update({
        where: { id: user.id },
        data: _.omit(validatedValues.data, ['confirmPassword'])
      });
      return { success: 'Settings updated!' };
    } else {
      return { error: 'Invalid settings.' };
    }
  } catch (error) {
    console.log(error);
    return { error: 'Unable to update settings.' };
  }
}
