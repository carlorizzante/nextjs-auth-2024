'use client';

import { toast } from 'sonner';
import { adminAction } from '@/actions';
import { FormSuccess } from '@/components';
import { RoleGate } from '@/components/auth/role-gate';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { useCurrentUser } from '@/hooks';
import { withChildren } from '@/lib/types';
import { UserRole } from '@prisma/client';

export default function AdminPage() {
  const user = useCurrentUser();

  const handleAPIRoute = async () => {
    fetch('/api/admin')
      .then((res) => {
        if (res.ok) {
          toast.success('You are allowed to access this route!');
        } else {
          toast.error('You are NOT allowed to access this route!');
        }
        return res.json();
      })
      .catch((error) => console.error(error))
  }
  const handleAdminAction = async () => {
    const response = await adminAction();
    if ('success' in response) {
      toast.success('You are allowed to access this route!');
    } else if ('error' in response) {
      toast.error('You are NOT allowed to access this route!');
    } else {
      toast.error('An error occurred while trying to access this route!');
    }
  }

  return (
    <Card className="w-[700px]">
      <CardHeader>
        <h3 className="text-2xl font-semibold">Admin</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess>You are authorized to see this content.</FormSuccess>
        </RoleGate>
        <RoleGate allowedRole={UserRole.USER}>
          <FormSuccess>You are authorized to see this content.</FormSuccess>
        </RoleGate>
        <InfoRow label="Admin-only API route">
          <Button onClick={handleAPIRoute}>
            Click to test
          </Button>
        </InfoRow>
        <InfoRow label="Admin-only Server action">
          <Button onClick={handleAdminAction}>
            Click to test
          </Button>
        </InfoRow>
      </CardContent>
    </Card>
  )
}

const InfoRow = ({ children, label, value }: withChildren & { label: string, value?: string | boolean | null }) => (
  <div className="flex justify-between items-center gap-4 rounded-lg border p-3 shadow-sm">
    <span className="text-sm font-medium">{label}</span>
    {children}
    {typeof value === 'string' && <span className="text-sm font-mono truncate bg-slate-100 rounded-md px-1">{value}</span>}
    {typeof value === 'boolean' && <Badge variant={value ? 'success' : 'destructive'}>{value ? 'ON' : 'OFF'}</Badge>}
  </div>
)
