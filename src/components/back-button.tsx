import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  withChildren,
  WithClassName,
} from '@/lib/types';
import { cn } from '@/lib/utils';

type BackButtonProps = withChildren & WithClassName & {
  href: string;
};

export const BackButton = ({ children, className, href }: BackButtonProps) => (
  <Button
    variant="link"
    size="sm"
    className={cn('w-full font-normal', className)}
    asChild
  >
    <Link href={href}>
      {children}
    </Link>
  </Button>
)
