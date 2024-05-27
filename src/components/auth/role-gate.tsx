'use client';

import { useCurrentUserRole } from '@/hooks';
import { withChildren } from '@/lib/types';
import { UserRole } from '@prisma/client';
import { FormError } from '../form-error';

;

type RoleGateProps = withChildren & {
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentUserRole();
  if (role === allowedRole) {
    return (
      <>
        {children}
      </>);
  } else {
    return (
      <FormError>You are not authorized to view this content.</FormError>
    );
  }
}
