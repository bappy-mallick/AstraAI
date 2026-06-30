import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log("Supabase URL:", url);
console.log("Anon Key Exists:", !!key);

export const supabase = createClient(url, key);