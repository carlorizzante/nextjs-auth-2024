import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getAccountByUserId } from './lib/account';
import { getTwoFactorConfirmationByUserId } from './lib/token';
import { getUserById } from './lib/user';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  events: {
    linkAccount: async (message) => {
      // console.log('linkAccount', message);
      const { user } = message;
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      });
    }
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn(data) {
      // console.log('signIn', data);
      const { account } = data;
      if (account?.provider === 'email' || account?.provider === 'credentials') {
        const existingUser = await getUserById(data.user.id);
        if (!existingUser) return false;
        if (!existingUser?.emailVerified) return false;
        if (existingUser?.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
          if (!twoFactorConfirmation) return false;
          await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id }
          });
        }
      }
      return true;
    },
    async jwt({ token }) {
      // console.log('jwt', token);
      // If user has log out, return token
      if (!token.sub) return token;
      // Else, extend user token with role and isTwoFactorEnabled
      const user = await getUserById(token.sub);
      if (user) {
        const account = await getAccountByUserId(user.id);
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.isTwoFactorEnabled = user.isTwoFactorEnabled;
        token.isOAuth = !!account?.providerAccountId;
      }
      return token;
    },
    async session(data) {
      // console.log('session', data);
      const { session, token } = data;
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        if (token.name) session.user.name = token.name;
        if (token.email) session.user.email = token.email;
        session.user.role = token.role;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        session.user.isOAuth = !!token.isOAuth;
      }
      return session;
    },
  }
})
