import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getPartners() {
  const supabase = createServerComponentClient({
    cookies: () => cookies(),
  })

  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching partners:', error.message)
    throw new Error('Failed to fetch partners')
  }

  return data
}
