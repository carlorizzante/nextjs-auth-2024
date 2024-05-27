import {
  Navbar,
  NavbarItem,
} from '@/components';
import { withChildren } from '@/lib/types';
import { cn } from '@/lib/utils';

const style_layout = "flex flex-col w-full h-full gap-y-10 justify-center items-center";
const style_gradient = "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800";

export default async function ProtectedLayout({ children }: Readonly<withChildren>) {
  return (
    <div className={cn(style_layout, style_gradient)}>
      <Navbar>
        <NavbarItem href="/admin">Admin</NavbarItem>
        <NavbarItem href="/client">Client</NavbarItem>
        <NavbarItem href="/server">Server</NavbarItem>
        <NavbarItem href="/settings-client">Settings Client</NavbarItem>
        <NavbarItem href="/settings">Settings Server</NavbarItem>
      </Navbar>
      {children}
    </div>
  )
}
