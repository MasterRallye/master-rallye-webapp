'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      // Requête supplémentaire pour vérifier le champ `is_verified`
      const userId = data.user.id
      const { data: userDetails, error: userError } = await supabase
        .from('users')
        .select('is_verified')
        .eq('id', userId)
        .single()

      if (userError || !userDetails?.is_verified) {
        setError("Ton compte n'est pas encore vérifié.")
        return
      }

      router.push('/espace-membre') // ✅ Redirection uniquement si vérifié
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
    </div>
  )
}
