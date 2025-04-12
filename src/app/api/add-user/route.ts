import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  const form = await req.json()

  const { data, error } = await supabase.from('users').insert([
    {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone_number: form.phone,
    },
  ])

  if (error) {
    console.error('Erreur Supabase :', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 200 })
}
