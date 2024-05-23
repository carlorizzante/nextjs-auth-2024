import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { getUserByEmail } from './data/user';
import { LoginSchema } from './schemas';

export default {
  debug: true,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return Promise.resolve(null);
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return Promise.resolve(user);
          }
        }
        return Promise.resolve(null);
      }
    })
  ]
} satisfies NextAuthConfig;

/**
 * Public routes accessible to everyone
 * Do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/auth/email-verification',
];

/**
 * Auth routes used to authenticate users
 * Redirect to settings page after login
 * @type {string[]}
 */
export const authRoutes = [
  // '/auth/*',
  '/auth/login',
  '/auth/register',
  '/auth/error',
  // '/auth/forgot-password',
  // '/auth/reset-password',
  // '/auth/verify-email',
];

/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are usewd for API authentication purposes
 * @type {string}
 */
export const API_AUTH_PREFIX = '/api/auth';

/**
 * Default redirect path after login
 * Routes that start with this prefix are usewd for API authentication purposes
 * @type {string}
 */
export const REDIRECT_AFTER_LOGIN = '/settings';

/**
 * Default login route
 * Not logged in users are redirected to this route if accessing a protected route
 * @type {string}
 */
export const LOGIN_ROUTE = '/auth/login';
