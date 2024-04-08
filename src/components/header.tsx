import type {
  withChildren,
  WithClassName,
} from '@/lib/types';
import { cn } from '@/lib/utils';

type HeaderProps = withChildren & WithClassName;

export const Header = ({ children, className }: HeaderProps) => {
  return (
    <header className={cn("w-full flex flex-col gap-y-4 items-center justify-center", className)}>
      <h1 className="text-3xl font-semibold">🔐 Auth</h1>
      <p className="text-muted-foreground text-sm">{children}</p>
    </header>
  );
}
