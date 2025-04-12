import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1)
    if (error) {
      console.error('❌ Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ message: 'Connexion Supabase OK ✅', data })
  } catch (err) {
    console.error('❌ Server crash:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unexpected error' },
      { status: 500 }
    )
  }
}
