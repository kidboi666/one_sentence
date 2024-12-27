import { authRestrictedRoutes, protectedRoutes, routes } from '@/src/routes'
import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const attemptedUnauthorizedAccess =
    user &&
    authRestrictedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    )

  if (attemptedUnauthorizedAccess) {
    const url = request.nextUrl.clone()
    url.pathname = routes.home
    return NextResponse.redirect(url)
  }

  const isUnauthorized =
    !user &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isUnauthorized) {
    const url = request.nextUrl.clone()
    url.pathname = routes.modal.auth.guard
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
