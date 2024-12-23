import { abi } from './contract-abi'

type HexString = `0x${string}`

const mantaCA: HexString =
  (process.env.NEXT_PUBLIC_MANTA_TESTNET_CA as HexString) ??
  '0xD2b0395b86EbCD52f21333526327771364c05f0E'

const contractConfig = {
  abi,
  address: mantaCA,
} as const

export default contractConfig
