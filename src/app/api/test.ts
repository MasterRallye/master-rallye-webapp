import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://cmaqpuxrxsygcadazwui.supabase.co/rest/v1/users', {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    })

    const json = await res.json()
    return NextResponse.json(json)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
