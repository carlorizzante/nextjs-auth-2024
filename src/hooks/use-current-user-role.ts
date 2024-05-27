'use client';

import { useSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';

export const useCurrentUserRole = () => {
  const session = useSession();
  return session.data ? session.data.user.role as UserRole : null;
}
