import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getDAOs() {
  const supabase = createServerComponentClient({
    cookies: () => cookies(),
  })

  const { data: daos, error } = await supabase.from('dao').select('*')

  if (error) {
    console.error('Error fetching data:', error.message)
    throw new Error('Failed to fetch DAOs')
  }

  return daos
}
