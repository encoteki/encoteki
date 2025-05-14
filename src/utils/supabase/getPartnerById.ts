import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getPartnerById(partnerId: number) {
  const supabase = createClientComponentClient()

  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', partnerId)
    .single()

  if (error) {
    console.error(`Error fetching Partner Id ${partnerId}:`, error.message)
    throw new Error('Failed to fetch Partner')
  }

  return data
}
