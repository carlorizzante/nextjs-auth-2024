// Edge compatibility
// Verify if this file is necessary

import { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';

export default {
  debug: true,
  providers: [GitHub],
} satisfies NextAuthConfig;

/**
 * Public routes accessible to everyone
 * Do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
];

/**
 * Auth routes used to authenticate users
 * Redirect to settings page after login
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  // '/auth/forgot-password',
  // '/auth/reset-password',
  // '/auth/verify-email',
  // '/auth/*',
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
