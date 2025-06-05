import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

function getEnvVariable(baseName: string): string | undefined {
  const prefixes = ['NEXT_PUBLIC_', 'EXPO_PUBLIC_'];
  if (typeof window !== 'undefined') {
    // Browser or Expo environment
    for (const prefix of prefixes) {
      const envVar = (window as any)[`${prefix}${baseName}`];
      if (envVar) return envVar;
    }
    // Check without prefix for browser if NEXT_PUBLIC_ or EXPO_PUBLIC_ not found (less common)
    return (window as any)[baseName];
  } else {
    // Node.js environment
    for (const prefix of prefixes) {
      const envVar = process.env[`${prefix}${baseName}`];
      if (envVar) return envVar;
    }
    // Check without prefix for Node.js
    return process.env[baseName];
  }
}

export function getSupabaseClient(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = getEnvVariable('SUPABASE_URL');
  const supabaseAnonKey = getEnvVariable('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseAnonKey) {
    const errorMessage = `Supabase client could not be initialized: SUPABASE_URL or SUPABASE_ANON_KEY is missing. 
    Please ensure these are set in your environment variables. 
    For web, use NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
    For Expo, use EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY.
    Check your .env file and ensure it's loaded correctly.`;
    console.error(errorMessage);
    // This error will halt execution, which is appropriate if Supabase is critical.
    throw new Error('Supabase credentials missing, client initialization failed.');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

// Export the client directly for easy import as a singleton.
// getSupabaseClient() ensures it's initialized only once.
export const supabase = getSupabaseClient();

// Example for future reference:
// To use generated types from your Supabase schema (after running supabase gen types typescript):
// import { Database } from './your-generated-types-file'; // Adjust path as needed
// supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey);
// export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
// export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
