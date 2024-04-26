'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

export const registerAction = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedValues = RegisterSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: 'Invalid name, email, or password' }
  } else {
    return { success: 'Account successfully created!' }
  }
}
