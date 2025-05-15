import { useReadContract } from 'wagmi'
import { Address } from 'viem'

interface UseWalletOfOwnerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contractConfig: any
  address: Address
}

export const useWalletOfOwner = ({
  contractConfig,
  address,
}: UseWalletOfOwnerProps) => {
  return useReadContract({
    ...contractConfig,
    functionName: 'walletOfOwner',
    args: [address],
  })
}
