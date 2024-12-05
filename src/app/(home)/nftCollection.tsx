import Cendry from '@/assets/tsb/CENDRY.png'
import Owen from '@/assets/tsb/OWEN.png'
import Gajara from '@/assets/tsb/GAJARA.png'
import Tiggy from '@/assets/tsb/TIGGY.png'
import Kanghoon from '@/assets/tsb/KANGHOON.png'
import Komesi from '@/assets/tsb/KOMESI.png'
import Image from 'next/image'
import HomepageHeading from '@/components/heading/homepageHeading'
import Link from 'next/link'

export default function NFTCollection() {
  const tsb = [
    {
      name: 'Cendry',
      role: 'Vocalist',
      about:
        'She’s the light to the team. The empowering-leader with bright vision to the group.',
      image: Cendry,
    },
    {
      name: 'Owen',
      role: 'Ketipung Player',
      about:
        'Besides playing Ketipung, a musical instrument from Java, he’s also a songwriter.',
      image: Owen,
    },
    {
      name: 'Gajara',
      role: 'Drummer',
      about:
        'He’s the chillest member in the group and he really loves to drum. In his free time, he likes to help others.',
      image: Gajara,
    },
    {
      name: 'Tiggy',
      role: 'Keyboardist',
      about:
        'She’s a deep thinker and full of imagination. Her humanism principle guide them in all things.',
      image: Tiggy,
    },
    {
      name: 'Kanghoon',
      role: 'Bassist',
      about:
        'The bassist doppelgänger of Komesi. She’s cheerful, caring, and ready to serve people in need.',
      image: Kanghoon,
    },
    {
      name: 'Komesi',
      role: 'Guitarist',
      about:
        'He’s the chillest member in the group and he really loves to drum. In his free time, he likes to help others.',
      image: Komesi,
    },
  ]
  return (
    <div className="m-auto max-w-[360px] tablet:max-w-[736px] desktop:max-w-[calc(100%-200px)]">
      <HomepageHeading
        heading={{
          title: 'NFT Collection',
          subtitle:
            'Our collection, The Satwas Band, are inspired by endangered animals in Indonesia. Mint and collect them all!',
          align: undefined,
        }}
      />
      <div className="flex flex-col gap-4 desktop:grid desktop:grid-cols-2 desktop:grid-rows-3 desktop:gap-6">
        {tsb.map((item, index) => {
          return (
            <div
              id="card-collection"
              key={index}
              className="rounded-2xl border border-neutral-60 bg-white p-4 duration-150 hover:border-primary-green tablet:rounded-[32px] tablet:p-6"
            >
              <div className="flex gap-6">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="hidden size-[112px] rounded-2xl tablet:block tablet:size-[208px]"
                />
                <div className="flex w-full flex-col justify-between">
                  <div className="mb-6">
                    <div className="flex flex-col tablet:flex-row tablet:flex-wrap tablet:items-center tablet:justify-between">
                      <h1 className="text-xl font-medium tablet:text-[32px] desktop:text-4xl">
                        {item.name}
                      </h1>
                      <span className="text-base font-normal tablet:text-right">
                        {item.role}
                      </span>
                    </div>
                    <p className="hidden tablet:mt-4 tablet:block tablet:text-base">
                      {item.about}
                    </p>
                  </div>
                  <Link href="https://mint.encoteki.com">
                    <button className="w-full rounded-[32px] bg-primary-green px-4 py-2 duration-300 hover:bg-green-10 tablet:w-[104px] tablet:px-6 tablet:py-3">
                      <span className="text-base font-medium text-white">
                        Mint
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
