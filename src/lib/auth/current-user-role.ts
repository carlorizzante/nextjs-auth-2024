import { auth } from '@/auth';
import { UserRole } from '@prisma/client';

export const currentUserRole = async () => {
  const session = await auth();
  return session?.user ? session?.user.role as UserRole : UserRole.GUEST;
}
