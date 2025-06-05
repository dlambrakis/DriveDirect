import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = typeof window !== 'undefined' 
    ? process.env.NEXT_PUBLIC_SUPABASE_URL || (window as any).EXPO_PUBLIC_SUPABASE_URL
    : process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
    
  const supabaseAnonKey = typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (window as any).EXPO_PUBLIC_SUPABASE_ANON_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // In a real app, you might want to throw an error or handle this more gracefully.
    // For development, a warning might be sufficient if some parts of the app can run without Supabase.
    console.error(
      'Supabase URL or Anon Key is missing. Please check your environment variables (e.g., .env file and prefixes like NEXT_PUBLIC_ or EXPO_PUBLIC_).'
    );
    // Fallback to a dummy client or throw an error to prevent app misbehavior
    // This is a placeholder; adjust error handling as needed.
    throw new Error('Supabase client could not be initialized: Credentials missing.');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

// Export the client directly if you prefer a singleton initialized on module load.
// However, the getSupabaseClient function allows for more flexible initialization,
// especially if env vars might not be available immediately at module load time in all environments.
export const supabase = getSupabaseClient();

// You can also export types for your database schema if you generate them
// For example:
// export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
// export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
// This requires generating types from your Supabase schema first.
