'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type {
  withChildren,
  WithClassName,
} from '@/lib/types';
import { cn } from '@/lib/utils';
import { Social } from './auth/social';
import { BackButton } from './back-button';
import { Header } from './header';

type CardWrapperProps = withChildren & WithClassName & {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({ children, backButtonHref, backButtonLabel, headerLabel, className, showSocial }: CardWrapperProps) => (
  <Card className={cn('w-[400px]\ shadow-md', className)}>
    <CardHeader>
      <Header>{headerLabel}</Header>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
    {showSocial && <CardFooter><Social /></CardFooter>}
    <CardFooter>
      <BackButton href={backButtonHref}>{backButtonLabel}</BackButton>
    </CardFooter>
  </Card>
)
