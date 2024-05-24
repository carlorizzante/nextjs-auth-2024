'use client';
import {
  useState,
  useTransition,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { resetPasswordAction } from '@/actions';
import {
  CardWrapper,
  FormError,
  FormSuccess,
} from '@/components';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ResetPasswordSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  });

  const handleSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      resetPasswordAction({ ...values, email, token })
        .then((response) => {
          setError(response.error);
          setSuccess(response.success);
        })
    });
  }

  return (
    <CardWrapper
      headerLabel="Reset password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormError>{error}</FormError>
          <FormSuccess>{success}</FormSuccess>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >Reset password</Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
