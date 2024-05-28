"use client";

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { REDIRECT_AFTER_LOGIN } from '@/auth.config';
import { Button } from '@/components/ui/button';
import {
  withChildren,
  WithClassName,
} from '@/lib/types';
import { cn } from '@/lib/utils';

type SocialProps = withChildren & WithClassName;

export const Social = ({ children, className }: SocialProps) => {
  const callbackUrl = useSearchParams().get('callbackUrl');
  const handleClick = (provider: 'google' | 'github') => () => {
    signIn(provider, { callbackUrl: callbackUrl || REDIRECT_AFTER_LOGIN });
  };

  return (
    <div className={cn("flex items-center w-full gap-x-2", className)}>
      {children}
      <Button size="lg" className="w-full" variant="outline" onClick={handleClick('google')}>
        <FcGoogle className="w-5 h-5 text-blue-600" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={handleClick('github')}>
        <FaGithub className="w-5 h-5 text-gray-800" />
      </Button>
    </div>
  );
}
