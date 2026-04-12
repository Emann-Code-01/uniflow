import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = {
  student: ['/dashboard', '/timetable', '/pulse', '/buddies'],
  lecturer: ['/lecturer'],
  admin: ['/admin'],
}

export async function middleware(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/register')) {
    // If already logged in, redirect away from login
    if (session) {
      // TODO: Redirect based on role once we have user role in session
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // No session → redirect to login
  if (!session) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Basic role check (we'll improve this with profile data later)
  // For now, allow access and let individual layouts handle role validation
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)',
  ],
}