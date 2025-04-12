'use client';

import { addUser } from '../lib/addUser';

export default function TestAddUser() {
  const handleClick = async () => {
    await addUser({
      first_name: 'Jean',
      last_name: 'Testeur',
      email: `jean.testeur.${Date.now()}@test.com`, // pour éviter les doublons
      parrain_first_name: 'Alice',
      parrain_last_name: 'Durand',
      parrain_phone: '0612345678',
      birth_date: '2003-05-12',
      rallye_before: true,
      rallye_name: 'Rallye St-Pierre',
      from_nantes: false,
      location: 'Angers',
      profile_picture: '',
      phone: '0600000000',
      instagram_account: 'jean_rallye',
      status: 'pending',
      editions_count: 2,
      editions_list: ['Été 2023', 'Hiver 2024'],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Test ajout utilisateur</h1>
      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Ajouter un utilisateur
      </button>
    </div>
  );
}
