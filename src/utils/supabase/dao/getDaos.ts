import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getDAOs() {
  const supabase = createClientComponentClient()

  const { data, error } = await supabase.from('dao').select('*')

  if (error) {
    console.error('Error fetching data:', error.message)
    throw new Error('Failed to fetch DAOs')
  }

  return data
}
