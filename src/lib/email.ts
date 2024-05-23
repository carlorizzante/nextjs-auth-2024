import { Resend } from 'resend';
import { VerificationEmail } from './email-verification';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationUrl = `${process.env.NEXTAUTH_URL}/auth/email-verification?token=${token}&email=${email}`;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your email address',
      react: VerificationEmail({ confirmationUrl })
    });
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}
