import { createSupabaseServerClient } from '@/lib/supabaseServer'

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      <h1>Bienvenue {user?.email}</h1>
      <p>Ceci est ton espace membre.</p>
    </div>
  )
}
