import { DaoType } from '@/enums/daoType'

export default function DaoBadge({ daoType }: { daoType: number }) {
  return (
    <div
      className={`w-fit rounded-full px-2 py-1 text-xs tablet:text-sm ${daoType === DaoType.proposal ? 'bg-brown-10 text-brown-90' : 'bg-blue-10 text-blue-90'}`}
    >
      {daoType === DaoType.proposal ? 'Proposal' : 'Proof of donation'}
    </div>
  )
}
