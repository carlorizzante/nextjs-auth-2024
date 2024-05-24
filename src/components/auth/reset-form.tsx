'use client';
import {
  useState,
  useTransition,
} from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { resetAction } from '@/actions';
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
import { ResetSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    }
  });

  const handleSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      resetAction(values)
        .then((response) => {
          setError(response.error);
          setSuccess(response.success);
        })
    });
  }

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
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
          >Send reset email</Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
