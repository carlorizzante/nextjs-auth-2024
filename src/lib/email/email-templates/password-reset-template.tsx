type PasswordResetTemplateProps = {
  actionLink: string;
}

export const PasswordResetTemplate = ({ actionLink }: PasswordResetTemplateProps) => (
  <div>
    <h1>Verify your email address</h1>
    <p>Click the link below to verify your email address:</p>
    <p><a href={actionLink}>{actionLink}</a></p>
  </div>
)
