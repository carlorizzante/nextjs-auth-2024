'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { withChildren } from '@/lib/types';

type NavbarItemProps = withChildren & {
  href: string;
}

export const NavbarItem = ({ children, href }: NavbarItemProps) => {
  const pathname = usePathname();
  const variant = pathname === href ? 'default' : 'outline';
  return (
    <Button variant={variant} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  )
}
