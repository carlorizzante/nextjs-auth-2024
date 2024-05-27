'use server';

import { currentUserRole } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export const adminAction = async () => {
  const role = await currentUserRole();
  if (role === UserRole.ADMIN) {
    return { success: "You are authorized to access this route!" }
  } else {
    return { error: "You are NOT authorized to access this route!" }
  }
}
