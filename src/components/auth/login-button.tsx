'use client';

import { useRouter } from 'next/navigation';
import { type ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { withChildren } from '@/lib/types';
import { cn } from '@/lib/utils';
import { LoginForm } from './login-form';

type LoginButtonProps = withChildren & ButtonProps & {
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
};

export const LoginButton = ({ children, className, mode = 'redirect', asChild }: LoginButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth/login');
  }

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogContent className="w-auto p-0 bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <span onClick={handleClick} className={cn("cursor-pointer", className)}>
        {children}
      </span>
    )
  }
}
