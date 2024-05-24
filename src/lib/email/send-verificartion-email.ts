import { Resend } from 'resend';
import { VerifyEmailTemplate } from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const actionLink = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}&email=${email}`;

  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your email address',
      react: VerifyEmailTemplate({ actionLink })
    });
    return true;

  } catch (error) {
    console.error(error);
    return null;
  }
}
