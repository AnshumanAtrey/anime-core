import { auth, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',  
  '/_next(.*)',
  '/(assets|images|favicon.ico)',
];

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard(.*)',
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(route => 
    new RegExp(`^${route.replace(/\*/g, '.*')}$`).test(pathname)
  );

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    new RegExp(`^${route.replace(/\*/g, '.*')}$`).test(pathname)
  );

  // Get the session
  const { userId } = auth();

  // Allow public routes
  if (isPublicRoute) {
    // If user is signed in and tries to access sign-in/sign-up, redirect to dashboard
    if (userId && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Handle protected routes
  if (isProtectedRoute) {
    // If user is not signed in, redirect to sign-in
    if (!userId) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect_url', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // If the route is not public or protected, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
