import Image from 'next/image'
import Arrow from '@/assets/icon/green.arrow.svg'
import { useMintCtx } from '@/context/mintContext'

export default function MintPageHeading({
  wording,
  action,
}: {
  wording: string
  action: () => void
}) {
  const { paymentMethod } = useMintCtx()

  return (
    <div className="flex items-center gap-2 p-6 pl-4">
      {paymentMethod !== '' && (
        <button onClick={action}>
          <Image
            className="rotate-180"
            src={Arrow}
            alt={'return'}
            width={32}
            height={32}
          />
        </button>
      )}

      <h1 className="text-left text-lg font-medium">{wording}</h1>
    </div>
  )
}
