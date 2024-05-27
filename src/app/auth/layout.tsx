import { withChildren } from '@/lib/types';
import { cn } from '@/lib/utils';

const style_layout = "flex h-full flex-col items-center justify-center";
const style_gradient = "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800";

export default function AuthLayout({ children }: Readonly<withChildren>) {
  return (
    <main className={cn(style_layout, style_gradient)}>{children}</main>
  );
}
