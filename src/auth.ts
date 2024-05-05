import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getUserById } from './data/user';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // debug: true,
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn(data) {
      console.log('signIn', data);
      return true;
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
  session: { strategy: 'jwt' }
})
