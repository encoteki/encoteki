import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { liskSepolia } from 'viem/chains'

export const config = getDefaultConfig({
  appName: 'Encoteki',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '',
  chains: [liskSepolia],
  ssr: true,
})
