import { Resend } from 'resend';
import { PasswordResetTemplate } from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const actionLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}&email=${email}`;

  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Reset your password',
      react: PasswordResetTemplate({ actionLink })
    });
    return true;

  } catch (error) {
    console.error(error);
    return null;
  }
}
