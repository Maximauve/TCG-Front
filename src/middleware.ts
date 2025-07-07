import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';

export default async function middleware(request: NextRequestWithAuth) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, 
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production" });

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register') ||
                    request.nextUrl.pathname.startsWith('/api/auth');

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    return NextResponse.next();
  }


  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.ico|.*\\.gif).*)',
  ],
};

