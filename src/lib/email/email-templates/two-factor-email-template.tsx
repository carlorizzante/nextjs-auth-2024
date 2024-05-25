type TwoFactorEmailTemplateProps = {
  token: string;
}

export const TwoFactorEmailTemplate = ({ token }: TwoFactorEmailTemplateProps) => (
  <div>
    <h1>Two factor confirmation</h1>
    <p>Your 2FA code: <strong>{token}</strong></p>
  </div>
)
