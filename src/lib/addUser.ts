// On importe le client Supabase qu'on a configuré dans supabase.ts
import { supabase } from './supabase';

// On déclare une fonction asynchrone appelée addUser, qui prend en paramètre un objet "data"
export async function addUser(data: {
  first_name: string;                // prénom de l'utilisateur
  last_name: string;                 // nom de famille
  email: string;                     // adresse mail

  parrain_first_name?: string;       // prénom du parrain (optionnel)
  parrain_last_name?: string;        // nom du parrain (optionnel)
  parrain_phone?: string;            // numéro du parrain (optionnel)

  birth_date?: string;               // date de naissance (optionnelle)
  rallye_before?: boolean;           // a-t-il déjà fait un rallye ? (optionnel)
  rallye_name?: string;              // nom du rallye (si oui) (optionnel)

  from_nantes?: boolean;             // est-il de la région nantaise ? (optionnel)
  location?: string;                 // si non : d'où vient-il ? (optionnel)

  profile_picture?: string;          // lien vers sa photo de profil (optionnel)
  phone?: string;                    // numéro de téléphone personnel (optionnel)
  instagram_account?: string;        // pseudo Insta (optionnel)

  status?: string;                   // statut dans le MR : pending, validé, etc. (optionnel)

  editions_count?: number;           // nombre de soirées auxquelles il a participé
  editions_list?: string[];          // noms des éditions auxquelles il a participé (optionnel, à faire évoluer plus tard)
}) {
  // On appelle Supabase pour insérer les données dans la table "users"
  const { error } = await supabase.from('users').insert([data]);

  // Si Supabase retourne une erreur, on l’affiche dans la console
  if (error) {
    console.error('Erreur lors de l’ajout :', error.message);
  } else {
    console.log('Utilisateur ajouté avec succès');
  }
}
