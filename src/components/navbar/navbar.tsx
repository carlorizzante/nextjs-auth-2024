import { UserButton } from '@/components/auth';
import { withChildren } from '@/lib/types';
import { cn } from '@/lib/utils';

const style_layout = "flex justify-between items-center gap-4 w-[700px] p-4";
const style_gradient = "bg-secondary rounded-xl shadow-sm";

export const Navbar = ({ children }: withChildren) => {
  return (
    <nav className={cn(style_layout, style_gradient)}>
      <div className="flex gap-x-2">
        {children}
      </div>
      <UserButton />
    </nav>
  );

}
