import { createClient } from '@supabase/supabase-js'

export const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseURL, supabaseKEY);

export default supabase;