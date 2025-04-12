'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// ✅ On affiche les variables d'environnement dans la console navigateur
console.log('SUPABASE_URL =', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('SUPABASE_KEY =', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
    const { data, error } = await supabase.from('users').insert([
      {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone_number: form.phone,
      },
    ])
    console.log('Nouvel utilisateur ajouté :', data) // ✅ placé ici, après l'insertion
  
    if (error) {
      setMessage(`❌ Erreur : ${error.message}`)
    } else {
      setMessage('✅ Utilisateur ajouté avec succès !')
      setForm({ first_name: '', last_name: '', email: '', phone: '' })
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
