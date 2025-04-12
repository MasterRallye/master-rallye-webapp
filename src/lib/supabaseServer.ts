import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // clé serveur

export const supabaseServer = createClient(supabaseUrl, supabaseKey)
