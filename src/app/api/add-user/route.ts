import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  const body = await req.json()

  const { first_name, last_name, email, phone } = body

  const { data, error } = await supabase.from('users').insert([
    {
      first_name,
      last_name,
      email,
      phone_number: phone,
    },
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Utilisateur ajouté', data }, { status: 200 })
}
