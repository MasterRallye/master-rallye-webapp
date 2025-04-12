import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

console.log('🌐 SUPABASE_URL =', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('🔑 SUPABASE_KEY =', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export async function POST(req: Request) {
  try {
    const form = await req.json()

    const { data, error } = await supabase.from('users').insert([
      {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone_number: form.phone,
      },
    ])

    console.log('✅ Supabase insert data:', data)

    if (error) {
      console.error('❌ Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'User added successfully ✅', data })
  } catch (err) {
    console.error('❌ Server crash:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unexpected error' },
      { status: 500 }
    )
  }
}
