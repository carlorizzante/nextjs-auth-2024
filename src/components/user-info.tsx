import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { WithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ExtendedUser } from '@/next-auth';
import { Badge } from './ui/badge';

type UserInfoProps = WithClassName & {
  label: string;
  user?: ExtendedUser | null;
}

const style_layout = "w-[600px] shadow-md";

export const UserInfo = ({ label, user, className }: UserInfoProps) => (
  <Card className={cn(style_layout, className)}>
    <CardHeader>
      <h3 className="text-2xl font-semibold">{label}</h3>
    </CardHeader>
    <CardContent className="flex flex-col justify-between gap-4">
      <UserInfoRow label="ID" value={user?.id} />
      <UserInfoRow label="Name" value={user?.name} />
      <UserInfoRow label="Email" value={user?.email} />
      <UserInfoRow label="Role" value={user?.role} />
      <UserInfoRow label="2FA" value={user?.isTwoFactorEnabled} />
      {/* <p>{JSON.stringify(user)}</p> */}
    </CardContent>
  </Card>
)

const UserInfoRow = ({ label, value }: { label: string, value?: string | boolean | null }) => (
  <div className="flex justify-between items-center gap-4 rounded-lg border p-3 shadow-sm">
    <span className="text-sm font-medium">{label}</span>
    {typeof value === 'string' && <span className="text-sm font-mono truncate bg-slate-100 rounded-md px-1">{value}</span>}
    {typeof value === 'boolean' && <Badge variant={value ? 'success' : 'destructive'}>{value ? 'ON' : 'OFF'}</Badge>}
  </div>
)
