import { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: $Enums.UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: $Enums.UserRole;
    isTwoFactorEnabled: boolean;
  }
}
