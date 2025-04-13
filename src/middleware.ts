import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // 🔐 Redirige vers /login si l'utilisateur n'est pas connecté
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

// 🔒 On protège uniquement la page membre
export const config = {
  matcher: ['/espace-membre'],
}
