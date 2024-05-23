type VerificationEmailProps = {
  confirmationUrl: string;
}

export const VerificationEmail = ({ confirmationUrl }: VerificationEmailProps) => (
  <div>
    <h1>Verify your email address</h1>
    <p>Click the link below to verify your email address:</p>
    <p><a href={confirmationUrl}>{confirmationUrl}</a></p>
  </div>
)
