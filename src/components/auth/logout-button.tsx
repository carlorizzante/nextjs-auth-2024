'use client';

import { logoutAction } from '@/actions';
import { type ButtonProps } from '@/components/ui/button';
import { withChildren } from '@/lib/types';
import { cn } from '@/lib/utils';

type LogoutButtonProps = ButtonProps & withChildren;

export const LogoutButton = ({ children, className, ...props }: LogoutButtonProps) => {
  const handleLogout = () => {
    logoutAction();
  }

  return (
    <span onClick={handleLogout} className={cn("cursor-pointer", className)} {...props}>
      {children || 'Logout'}
    </span>
  )
  // return (
  //   <Button onClick={handleLogout} className={cn("cursor-pointer", className)} {...props}>
  //     {children || 'Logout'}
  //   </Button>
  // )
}
