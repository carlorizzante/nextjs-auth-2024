import { Resend } from 'resend';
import { TwoFactorEmailTemplate } from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
  // const actionLink = `${process.env.NEXTAUTH_URL}/auth/two-factor?token=${token}&email=${email}`;

  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Two Factor Confirmation',
      react: TwoFactorEmailTemplate({ token })
    });
    return true;

  } catch (error) {
    console.error(error);
    return null;
  }
}
