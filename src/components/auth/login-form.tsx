'use client';
import {
  useState,
  useTransition,
} from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { loginAction } from '@/actions';
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
import { LoginSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [twoFactor, setTwoFactor] = useState<boolean>();
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
    ? 'This account is already linked to another provider. It is unsafe to automatically link accounts. Please login with your already linked account, or with username and password.'
    : undefined;

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      loginAction(values)
        .then((response) => {
          setError(response.error);
          setSuccess(response.success);
          setTwoFactor(response.twofactor);
        })
        .catch((error) => {
          console.log('login-form > An error occurred', error);
          setError('login-form > An error occurred');
        });
    });
  }

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="space-y-6">
            {twoFactor && <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2FA Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {!twoFactor && <FormLabel>Email</FormLabel>}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type={!twoFactor ? "email" : "hidden"}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {!twoFactor && <FormLabel>Password</FormLabel>}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type={!twoFactor ? "password" : "hidden"}
                      disabled={isPending}
                    />
                  </FormControl>
                  {!twoFactor && <Button variant="link" size="sm" asChild className="px-0 font-normal">
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>}
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormError>{error || urlError}</FormError>
          <FormSuccess>{success}</FormSuccess>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >{twoFactor ? 'Confirm' : 'Login'}</Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
