import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export default async function EspaceMembrePage() {
  const supabase = createSupabaseServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login') // Redirige si non connecté
  }

  // 🔐 Vérifie le champ `is_verified`
  const { data: user, error } = await supabase
    .from('users')
    .select('is_verified')
    .eq('uid', session.user.id)
    .single()

  if (error || !user?.is_verified) {
    redirect('/login') // Redirige si non vérifié
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenue dans l’espace membre 🎉</h1>
      <p>Ton compte a bien été vérifié. Tu peux accéder à toutes les fonctionnalités !</p>
    </div>
  )
}
