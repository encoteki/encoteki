import { FamilyResponse } from '@/types/supabase'
import { getFamily } from '@/utils/supabase/family/getFamily'
import Image from 'next/image'

export default async function Family() {
  const families: FamilyResponse[] = await getFamily()

  // Split items into chunks of 8 for each row
  const chunkArray = (array: FamilyResponse[], chunkSize: number) => {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
    return result
  }

  const rows = chunkArray(families, 8)

  return (
    <>
      <div className="space-y-3">
        <h1 className="text-center text-[32px] font-medium tablet:text-5xl">
          Encoteki Family
        </h1>
        <p className="text-center">Check out cool stuff from our friends!</p>
      </div>
      <div className="mt-14">
        {' '}
        <div className="flex flex-col items-center gap-4 p-4">
          {rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex w-full max-w-6xl flex-wrap justify-center gap-4"
            >
              {row.map((item: FamilyResponse, itemIndex: number) => (
                <div
                  key={`item-${rowIndex}-${itemIndex}`}
                  className="flex h-24 w-24 items-center justify-center rounded-lg bg-white p-4"
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {' '}
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={75}
                      height={75}
                    />
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
