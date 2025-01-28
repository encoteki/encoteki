import { HexString } from '@/types/hexString'
import { abi } from './contract-abi'

const ca: HexString =
  (process.env.NEXT_PUBLIC_AVAX_TESTNET_CA as HexString) ??
  '0xFB36048157EC2634D7eBf0FD5901aD474b4c1Af1'

const contractConfig = {
  abi,
  address: ca,
} as const

export default contractConfig
