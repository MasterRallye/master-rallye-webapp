import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('🔍 Supabase URL =', url)
  console.log('🔍 Supabase KEY =', key?.slice(0, 10) + '...')

  return NextResponse.json({
    url,
    key: key?.slice(0, 10) + '...', // pour ne pas tout afficher
  })
}
