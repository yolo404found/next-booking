import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from './src/utils/db';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    // await connectDB();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
