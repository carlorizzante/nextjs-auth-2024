type VerifyEmailTemplateProps = {
  actionLink: string;
}

export const VerifyEmailTemplate = ({ actionLink }: VerifyEmailTemplateProps) => (
  <div>
    <h1>Verify your email address</h1>
    <p>Click the link below to verify your email address:</p>
    <p><a href={actionLink}>{actionLink}</a></p>
  </div>
)
