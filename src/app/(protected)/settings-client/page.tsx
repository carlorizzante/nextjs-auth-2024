'use client';

import {
  useState,
  useTransition,
} from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { saveSettingsAction } from '@/actions';
import {
  FormError,
  FormSuccess,
} from '@/components';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCurrentUser } from '@/hooks';
import { SettingsSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';

export default function SettingsClientPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      confirmPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    }
  });

  const handleSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      saveSettingsAction(values)
        .then((response) => {
          if (response.success) update();
          setError(response.error);
          setSuccess(response.success);
        })
        .catch((error) => {
          console.log('settings-client > An error occurred', error);
          setError('settings-client > An error occurred');
        })
    });
  }

  const isNotOAuth = user && !user.isOAuth;

  return (
    <Card className="w-[700px]">
      <CardHeader>
        <h3 className="text-2xl font-semibold">⚙️ Settings Client</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        placeholder="John Doe"
                        autoComplete="name"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isNotOAuth && <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        autoComplete="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />}
              {isNotOAuth && <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        autoComplete="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />}
              {isNotOAuth && <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="confirmPassword"
                        type="password"
                        autoComplete="confirmPassword"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="role">Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isNotOAuth && <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem>
                    <FormItem className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel htmlFor="isTwoFactorEnabled">2FA enabled</FormLabel>
                        <FormDescription>Enable two-factor authentication</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                          checked={field.value}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />}
            </div>
            <FormError>{error}</FormError>
            <FormSuccess>{success}</FormSuccess>
            <Button type="submit" disabled={isPending}>Save</Button>
          </form>
        </Form>

        {/* <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess>You are authorized to see this content.</FormSuccess>
        </RoleGate> */}
      </CardContent>
    </Card>
  );
}
