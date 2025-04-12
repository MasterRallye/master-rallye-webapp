'use client' // ← Doit absolument être la toute première ligne du fichier

export const dynamic = "force-dynamic" // ← Peut venir juste après

import { useState } from 'react'
//import { supabase } from '@/lib/supabaseClient'

// console.log('SUPABASE_URL =', process.env.NEXT_PUBLIC_SUPABASE_URL)
// console.log('SUPABASE_KEY =', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function AddUserPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const res = await fetch('/api/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
  
      const result = await res.json()
      console.log('✅ Résultat :', result)
  
      if (!res.ok) {
        setMessage('❌ Erreur : ' + result.error)
      } else {
        setMessage('✅ Utilisateur ajouté avec succès')
      }
    } catch (err) {
      console.error(err)
      setMessage('❌ Erreur : ' + err)
    }
  }
  

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Ajouter un utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="Prénom" value={form.first_name} onChange={handleChange} required />
        <br />
        <input name="last_name" placeholder="Nom" value={form.last_name} onChange={handleChange} required />
        <br />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <br />
        <input name="phone" placeholder="Téléphone" value={form.phone} onChange={handleChange} />
        <br />
        <button type="submit">Ajouter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
