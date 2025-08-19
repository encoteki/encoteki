import { FamilyResponse } from '@/types/supabase'
import { getFamily } from '@/utils/supabase/family/getFamily'
import Image from 'next/image'

export default async function Family() {
  const families: FamilyResponse[] = await getFamily()

  return (
    <>
      <div className="space-y-3">
        <h1 className="text-center text-[32px] font-medium tablet:text-5xl">
          Encoteki Family
        </h1>
        <p className="text-center">Check out cool stuff from our friends!</p>
      </div>

      <div className="mt-14">
        <ul className="mx-auto grid max-w-6xl grid-cols-3 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
          {families.map((item) => (
            <li key={item.id} className="rounded-lg bg-white">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex aspect-square items-center justify-center p-4"
              >
                <Image
                  src={item.image_url}
                  alt={item.name}
                  priority
                  width={80}
                  height={80}
                  className="h-16 w-auto object-contain"
                  sizes="(max-width: 640px) 33vw,
                 (max-width: 768px) 25vw,
                 (max-width: 1024px) 20vw,
                 12.5vw"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
