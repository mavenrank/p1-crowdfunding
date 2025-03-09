import { createClient } from "@supabase/supabase-js";
import {config} from "@/lib/config";

// ✅ Load environment variables
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ✅ Initialize Supabase client
export const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);