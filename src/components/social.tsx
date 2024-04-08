"use client";

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import {
  withChildren,
  WithClassName,
} from '@/lib/types';
import { cn } from '@/lib/utils';

type SocialProps = withChildren & WithClassName;

export const Social = ({ children, className }: SocialProps) => {
  const handleClickSocial = () => null;
  return (
    <div className={cn("flex items-center w-full gap-x-2", className)}>
      {children}
      <Button size="lg" className="w-full" variant="outline" onClick={handleClickSocial}>
        <FcGoogle className="w-5 h-5 text-blue-600" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={handleClickSocial}>
        <FaGithub className="w-5 h-5 text-gray-800" />
      </Button>
    </div>
  );
}
