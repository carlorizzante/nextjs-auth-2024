import { saveSettingsAction } from '@/actions';
import { auth } from '@/auth';
import { FormSuccess } from '@/components';
import { RoleGate } from '@/components/auth/role-gate';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { UserRole } from '@prisma/client';

export default async function SettingsServerPage() {
  const session = await auth();

  const handleUpdateName = async () => {
    await saveSettingsAction({ name: 'New Name' });
  }

  return (
    <Card className="w-[700px]">
      <CardHeader>
        <h3 className="text-2xl font-semibold">⚙️ Settings Server</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess>You are authorized to see this content.</FormSuccess>
        </RoleGate>
        <Button onClick={handleUpdateName}>Update Name</Button>
      </CardContent>
    </Card>
  );
}
