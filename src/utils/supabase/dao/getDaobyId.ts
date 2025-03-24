import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getDaoById(daoId: number) {
  const supabase = createClientComponentClient()

  const { data, error } = await supabase
    .from('dao')
    .select('*')
    .eq('dao_id', daoId)
    .single()

  if (error) {
    console.error(`Error fetching DAO Id ${daoId}:`, error.message)
    throw new Error('Failed to fetch DAO')
  }

  return data
}
