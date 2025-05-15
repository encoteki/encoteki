import { abi } from './contract-abi'
import { Address } from 'viem'

const ca: Address = (process.env.NEXT_PUBLIC_TESTNET_CA as Address) ?? '0x00'

const contractConfig = {
  abi,
  address: ca,
} as const

export default contractConfig
