'use client';

import { useRouter } from 'next/navigation';
import { type ButtonProps } from '@/components/ui/button';
import { withChildren } from '@/lib/types';
import { cn } from '@/lib/utils';

type LoginButtonProps = withChildren & ButtonProps & {
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
};

export const LoginButton = ({ children, className, mode = 'redirect', asChild, ...props }: LoginButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth/login');
  }

  if (mode === 'modal') {
    throw new Error('Not implemented');
  }

  return (
    <span onClick={handleClick} className={cn("cursor-pointer", className)}>
      {children}
    </span>
  )
}
