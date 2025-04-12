// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Ces variables vont lire les valeurs dans ton fichier .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
