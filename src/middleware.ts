import NextAuth from 'next-auth';
import authConfig, {
  API_AUTH_PREFIX,
  authRoutes,
  LOGIN_ROUTE,
  publicRoutes,
  REDIRECT_AFTER_LOGIN,
} from '@/auth.config';

// export { auth as middleware } from './src/auth';
// import { auth } from '@/auth';
// import { auth } from './auth';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isUserLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isUserLoggedIn) {
      return Response.redirect(new URL(REDIRECT_AFTER_LOGIN, nextUrl))
    } else {
      return;
    }
  }

  if (!isUserLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN_ROUTE, nextUrl));
  }

  if (isPublicRoute) return;
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)', // from Clerk IO
    // "/((?!api|_next/static|_next/image|favicon.icon).*)", // from AuthJS
  ]
}
