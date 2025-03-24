import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getUsedNFTId(
  daoId: number,
  walletOfOwner: Array<number>,
  chainId: number,
) {
  const supabase = createClientComponentClient()

  // Get data of NFT Id that has vote
  const { data: hasVoteNfts, error } = await supabase
    .from('mapping_vote')
    .select('nft_id')
    .eq('dao_id', daoId)
    .neq('chain_id', chainId)
    .in('nft_id', walletOfOwner.length > 0 ? walletOfOwner : [])

  if (error) {
    console.error(`Error Get Votes:`, error.message)
    throw new Error('Failed to fetch mapping vote')
  }

  return hasVoteNfts
}
