import { type NextRequest } from 'next/server'
import { updateSession } from '@/constants/utils/supabase/middleware'
// import { getSessionDetails } from './app/auth/action'

export async function middleware(request: NextRequest) {
  // update user's auth session
  console.log('middleware', request);
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}