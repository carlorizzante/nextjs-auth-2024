'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas';

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedValues = LoginSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: 'Invalid email or password' }
  } else {
    return { success: 'Logged in successfully' }
  }
}
