import { HexString } from '@/types/hexString'
import { abi } from './contract-abi'

const ca: HexString =
  (process.env.NEXT_PUBLIC_TESTNET_CA as HexString) ?? '0x00'

const contractConfig = {
  abi,
  address: ca,
} as const

export default contractConfig
