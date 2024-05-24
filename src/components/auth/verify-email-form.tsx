'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { verifyEmailAction } from '@/actions';
import {
  CardWrapper,
  FormError,
  FormSuccess,
} from '@/components';
import { Button } from '@/components/ui/button';

export const VerifyEmailForm = () => {
  const [isPending, setIsPending] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleSubmit = () => {
    setIsPending(true);
    setError(undefined);
    setSuccess(undefined);
    verifyEmailAction({ email, token })
      .then((response) => {
        setIsPending(false);
        setError(response.error);
        setSuccess(response.success);
      })
  }

  return (
    <CardWrapper
      headerLabel="Confirm your email address"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col justify-center items-center w-full gap-6">
        <BeatLoader loading={!success && !error} />
        <FormError>{error}</FormError>
        <FormSuccess>{success}</FormSuccess>
        <Button
          onClick={handleSubmit}
          className="w-full max-w-52"
          disabled={isPending}
        >Verify email</Button>
      </div>
    </CardWrapper>
  );
}
