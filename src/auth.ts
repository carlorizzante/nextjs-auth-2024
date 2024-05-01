import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  debug: true,
  // adapter: PrismaAdapter(prisma),
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' }
})
