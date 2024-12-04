import Image from 'next/image'

import HomepageHeading from '@/components/heading/homepageHeading'

import Freebies from '@/assets/benefits/freebies.svg'
import Secure from '@/assets/benefits/secure.svg'
import ProfitSharingMini from '@/assets/benefits/profit-sharing-mini.svg'
import ProfitSharing from '@/assets/benefits/profit-sharing.svg'
import EventPass from '@/assets/benefits/event-pass.svg'
import DAO from '@/assets/benefits/dao.svg'
import Link from 'next/link'

export default async function Benefit() {
  const benefits = [
    {
      title: 'Secure',
      subtitle: 'Blockchain-validated proof of payment',
    },
    {
      title: 'Profit-sharing',
      subtitle:
        'Receive shares of Encoteki’s subsidiaries and a percentage of their profits',
    },
    {
      title: 'Freebies',
      subtitle: 'Free national park and zoo entrance with selected partners',
    },
    {
      title: 'Event pass',
      subtitle: 'Community or special event pass',
    },
    {
      title: 'DAO',
      subtitle: 'Access to DAO voting mechanism for all Encoteki’s projects',
    },
    {
      title: 'Partner discount',
      subtitle:
        'Discounts and special prices to Encoteki partners & subsidiaries',
    },
  ]

  return (
    <div className="m-auto max-w-[360px] tablet:max-w-[736px] desktop:max-w-[calc(100%-200px)]">
      <HomepageHeading
        heading={{
          title: 'Benefits',
          subtitle:
            'Here are some benefits you will receive as an owner of The Satwas Band NFT',
          align: undefined,
        }}
      />

      {/* Mobile View */}
      <div className="block tablet:hidden">
        <div className="flex flex-col gap-4">
          <div className="relative h-36 rounded-2xl bg-khaki-99 p-4">
            <Image
              src={Secure}
              alt={benefits[0].title}
              width={128}
              className="absolute right-0 top-0 m-4"
            />
            <div className="absolute bottom-0 left-0 m-4">
              <h1 className="mb-1 text-xl font-medium">{benefits[0].title}</h1>
              <span className="text-sm">{benefits[0].subtitle}</span>
            </div>
          </div>

          <div className="relative h-36 rounded-2xl bg-khaki-99 p-4">
            <Image
              src={ProfitSharingMini}
              alt={benefits[1].title}
              width={128}
              className="absolute right-0 top-0 m-4"
            />
            <div className="absolute bottom-0 left-0 m-4 w-1/2">
              <h1 className="mb-1 text-xl font-medium">{benefits[1].title}</h1>
              <span className="text-sm">{benefits[1].subtitle}</span>
            </div>
          </div>

          <div className="relative h-36 rounded-2xl bg-khaki-99 p-4">
            <Image
              src={Freebies}
              alt={benefits[2].title}
              width={161}
              className="absolute bottom-0 right-0 m-4"
            />
            <div className="absolute left-0 top-0 m-4 w-1/2">
              <h1 className="mb-1 text-xl font-medium">{benefits[2].title}</h1>
              <span className="text-sm">{benefits[2].subtitle}</span>
            </div>
          </div>

          <div className="h-18 rounded-2xl bg-khaki-99 p-4">
            <h1 className="mb-1 text-xl font-medium">{benefits[3].title}</h1>
            <span className="text-sm">{benefits[3].subtitle}</span>
          </div>

          <div className="h-18 rounded-2xl bg-khaki-99 p-4">
            <h1 className="mb-1 text-xl font-medium">{benefits[4].title}</h1>
            <span className="text-sm">{benefits[4].subtitle}</span>
          </div>

          <div className="h-18 rounded-2xl bg-khaki-99 p-4">
            <h1 className="mb-1 text-xl font-medium">{benefits[5].title}</h1>
            <p className="mb-1 text-sm">{benefits[5].subtitle}</p>
            <Link href="/partner-deals">
              <span className="text-sm font-normal text-primary-green">
                View Offer
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tablet View */}
      <div className="hidden tablet:block desktop:hidden">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="relative h-[356px] rounded-[32px] bg-khaki-99 p-8">
            <Image
              src={Secure}
              alt="alt"
              width={213}
              className="absolute right-0 top-0 m-8"
            />
            <div className="absolute bottom-0 left-0 m-8">
              <h1 className="text-[32px] font-medium">{benefits[0].title}</h1>
              <p className="text-base">{benefits[0].subtitle}</p>
            </div>
          </div>

          <div className="relative h-[356px] rounded-[32px] bg-khaki-99 p-8">
            <Image
              src={ProfitSharing}
              alt="alt"
              width={140}
              className="absolute right-0 top-0 m-8"
            />
            <div className="absolute bottom-0 left-0 m-8">
              <h1 className="text-[32px] font-medium">{benefits[1].title}</h1>
              <p className="text-base">{benefits[1].subtitle}</p>
            </div>
          </div>

          <div className="relative h-[356px] rounded-[32px] bg-khaki-99 p-8">
            <Image
              src={Freebies}
              alt="alt"
              width={250}
              className="absolute bottom-0 mb-8"
            />
            <div className="absolute left-0 top-0 m-8">
              <h1 className="text-[32px] font-medium">{benefits[2].title}</h1>
              <p className="text-base">{benefits[2].subtitle}</p>
            </div>
          </div>

          <div className="grid-row-2 grid h-[356px] gap-4">
            <div className="rounded-[32px] bg-khaki-99 p-8">
              <h1 className="text-[32px] font-medium">{benefits[3].title}</h1>
              <p className="text-base">{benefits[3].subtitle}</p>
            </div>
            <div className="rounded-[32px] bg-khaki-99 p-8">
              <h1 className="text-[32px] font-medium">{benefits[4].title}</h1>
              <p className="text-base">{benefits[4].subtitle}</p>
            </div>
          </div>

          <div className="col-span-2 rounded-[32px] bg-khaki-99 p-8">
            <div>
              <h1 className="text-[32px] font-medium">{benefits[5].title}</h1>
              <p className="text-base">{benefits[5].subtitle}</p>
              <Link href="/partner-deals">
                <span className="text-base font-normal text-primary-green">
                  View Offer
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden desktop:block">
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-[302px] rounded-[32px] bg-khaki-99 p-8">
              <Image
                src={Secure}
                alt={benefits[0].title}
                className="absolute right-0 top-0 m-8"
              />
              <div className="absolute bottom-0 left-0 m-8 w-[200px]">
                <h1 className="mb-1 text-[32px] font-medium">
                  {benefits[0].title}
                </h1>
                <p className="text-base font-normal">{benefits[0].subtitle}</p>
              </div>
            </div>

            <div className="relative h-[302px] rounded-[32px] bg-khaki-99 p-8">
              <Image
                src={ProfitSharing}
                alt={benefits[1].title}
                className="absolute right-0 top-0 m-8"
              />
              <div className="absolute bottom-0 left-0 m-8 w-[268px]">
                <h1 className="mb-1 text-[32px] font-medium">
                  {benefits[1].title}
                </h1>
                <p className="text-base font-normal">{benefits[1].subtitle}</p>
              </div>
            </div>
          </div>

          <div className="grid h-[440px] grid-cols-3 gap-3">
            <div className="relative rounded-[32px] bg-khaki-99 p-8">
              <div className="absolute left-0 top-0 m-8">
                <h1 className="mb-1 text-[32px] font-medium">
                  {benefits[2].title}
                </h1>
                <p className="text-base font-normal">{benefits[2].subtitle}</p>
              </div>
              <Image
                src={Freebies}
                alt={benefits[2].title}
                className="absolute bottom-0 left-0 m-8"
              />
            </div>

            <div className="relative space-y-1 rounded-[32px] bg-khaki-99 p-8">
              <h1 className="text-[32px] font-medium">{benefits[5].title}</h1>
              <p className="text-base font-normal">{benefits[5].subtitle}</p>
              <Link href="/partner-deals">
                <span className="text-base font-normal text-primary-green">
                  View Offer
                </span>
              </Link>
            </div>

            <div className="grid grid-rows-2 gap-3">
              <div className="relative rounded-[32px] bg-khaki-99 p-8">
                <h1 className="mb-1 text-[32px] font-medium">
                  {benefits[3].title}
                </h1>
                <p className="text-base font-normal">{benefits[3].subtitle}</p>

                <Image
                  src={EventPass}
                  alt={benefits[3].title}
                  className="absolute bottom-0 right-0 m-8"
                />
              </div>
              <div className="relative rounded-[32px] bg-khaki-99 p-8">
                <div className="w-2/3">
                  <h1 className="mb-1 text-[32px] font-medium">
                    {benefits[4].title}
                  </h1>
                  <p className="text-base font-normal">
                    {benefits[4].subtitle}
                  </p>
                </div>
                <Image
                  src={DAO}
                  alt={benefits[4].title}
                  className="absolute bottom-0 right-0 m-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
