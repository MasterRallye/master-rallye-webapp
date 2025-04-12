'use client' // ← Doit absolument être la toute première ligne du fichier

export const dynamic = "force-dynamic" // ← Peut venir juste après

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'


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
    console.log('Nouvel utilisateur ajouté :', data) // ✅ debug dans la console

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
