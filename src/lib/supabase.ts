import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import 'react-native-url-polyfill/auto'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if(!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Supabase URL and Anon Key must be provided in environment variables.")
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: {
      getItem: async (key) => SecureStore.getItemAsync(key),
      setItem: async (key, value) => SecureStore.setItemAsync(key, value),
      removeItem: async (key) => SecureStore.deleteItemAsync(key),
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})