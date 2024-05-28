import { LoginButton } from '@/components';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const style_layout = "flex h-full flex-col items-center justify-center";
const style_gradient = "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800";

export default function Home() {
  return (
    <main className={cn(style_layout, style_gradient)}>
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">🔐 Auth</h1>
        <p className="text-lg text-white">A simple authentication service</p>
        <LoginButton className="block">
          <Button variant="secondary" size="lg">Sign in (redirect)</Button>
        </LoginButton>
        <LoginButton className="block" mode="modal" asChild>
          <Button variant="secondary" size="lg">Sign in (modal)</Button>
        </LoginButton>
      </div>
    </main >
  );
}
