import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  if (typeof window === 'undefined') {
    throw new Error('Supabase browser client must be instantiated in the browser.');
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required in the browser environment.');
  }

  return createBrowserClient(url, key);
}
