import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getUserById } from './data/user';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // debug: true,
  adapter: PrismaAdapter(db),
  events: {
    linkAccount: async (message) => {
      console.log('linkAccount', message);
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
      console.log('signIn', data);
      const { account } = data;
      if (account?.provider === 'email' || account?.provider === 'credentials') {
        const existingUser = await getUserById(data.user.id);
        return !!existingUser?.emailVerified
      } else {
        // TODO: Implement 2FA for OAuth providers
        return true;
      }
    },
    async jwt(data) {
      console.log('jwt', data);
      // If user has log out, return token
      if (!data.token.sub) return data.token;
      const user = await getUserById(data.token.sub);
      if (user) data.token.role = user.role;
      return data.token;
    },
    async session(data) {
      console.log('session', data);
      const { session, token } = data;
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
})
