import { SubmitVoteDto } from '@/types/dao'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function submitDAO(request: SubmitVoteDto): Promise<boolean> {
  const supabase = createClientComponentClient()

  const { chain_id, nft_id, dao_id, option_id, isNeutral } = request

  console.log(`chainid: ${chain_id}`)

  try {
    const { error } = await supabase
      .from('mapping_vote')
      .insert([{ chain_id, nft_id, dao_id, option_id, isNeutral }])

    if (error) {
      console.error('Error submit DAO:', error.message)
      throw new Error('Failed to submit DAO')
    }

    return true
  } catch (error) {
    console.error('Unexpected error:', error)
    return false
  }
}
