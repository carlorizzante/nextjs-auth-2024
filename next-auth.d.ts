import { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: $Enums.UserRole;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: $Enums.UserRole;
  }
}
