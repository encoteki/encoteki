// 'use client'

import Image from 'next/image'
// import SDGBadge from '@/components/badge/sdgBadge'
import ExternalRedirectionBtn from '@/components/button/defaultButton'
import GrayLine from '@/components/lines/grayLine'
import { ModalBody } from '@/components/ui/animated-modal'
import { PartnerResponse } from '@/types/supabase'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { useEffect, useState } from 'react'

// interface SDGType {
//   name: string
//   number: number
// }

export default function PartnerDetailsModal({
  partner,
}: {
  partner: PartnerResponse
}) {
  // const supabase = createClientComponentClient()
  // const [sdgs, setSdgs] = useState<[]>([])

  // useEffect(() => {
  //   const getSDGs = async () => {
  //     const { data, error } = await supabase
  //       .from('mapping_partner_sdg')
  //       .select('sdg_id')
  //       .eq('partner_id', partner.id)

  //     if (error) {
  //       console.error('Error Get mapping SDGs:', error.message)
  //       return
  //     }
  //     if (data) {
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       const tempSdg: any[] = []
  //       for (const item of data) {
  //         const { data: sdgtemp, error } = await supabase
  //           .from('sdg')
  //           .select('*')
  //           .eq('id', item.sdg_id)

  //         if (error) {
  //           console.error('Error Get SDG:', error.message)
  //           return
  //         }

  //         tempSdg.push(sdgtemp)
  //       }
  //       setSdgs(tempSdg)
  //     }
  //   }

  //   getSDGs()

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <>
      {/* Modal */}
      <ModalBody className="bg-white">
        <header className="p-4 text-base">Deal info</header>
        <GrayLine />

        {/* Desktop View */}
        <div className="hidden w-full gap-8 p-6 desktop:flex">
          <article className="h-[100px] w-3/5 space-y-4">
            <h3 className="text-2xl font-medium">{partner.deals}</h3>
            <ul className="ml-4 list-disc">
              <li>Details coming soon</li>
            </ul>
          </article>

          <section className="h-auto w-2/5 space-y-4">
            {/* Partner Logo */}
            <div className="size-24 rounded-2xl bg-white drop-shadow-lg">
              <Image
                src={partner.image_url}
                alt="alt"
                width={100}
                height={100}
              />
            </div>

            {/* About Partner */}
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <p className="text-lg">{partner.name}</p>
                <p className="text-sm text-neutral-40">{partner.subtopic}</p>
              </div>
              <ExternalRedirectionBtn
                wording={'See store'}
                url={partner.partner_url}
              />
            </div>
            <GrayLine />

            {/* SDG */}
            <div className="space-y-3">
              <p className="text-sm text-neutral-30">
                This brand supports these SGDs
              </p>
              <div className="flex w-full flex-wrap gap-2">
                {/* {sdgs.map((sdg, index) => {
                  return (
                    <div key={index}>
                      <SDGBadge
                        wording={sdg.name}
                        bgColor={'#FAD1D6'}
                        textColor={'#5C0A14'}
                      />
                    </div>
                  )
                })} */}
              </div>
            </div>
          </section>
        </div>

        {/* Mobile/Tablet View */}
        <div className="flex h-full w-full flex-col gap-8 p-6 desktop:hidden">
          <section className="h-auto w-full space-y-6">
            {/* About Partner */}
            <div className="flex gap-4">
              {/* Partner Logo */}
              <div className="size-20 w-1/4 rounded-2xl bg-white drop-shadow-lg">
                <Image
                  src={partner.image_url}
                  alt="alt"
                  width={80}
                  height={80}
                />
              </div>
              {/* Partner Info */}
              <div className="flex w-3/4 flex-col gap-4">
                <div className="space-y-1">
                  <p className="text-sm">{partner.name}</p>
                  <p className="text-base font-medium">{partner.deals}</p>
                  <p className="text-sm text-neutral-40">{partner.subtopic}</p>
                </div>
              </div>
            </div>

            {/* SDG */}
            <div className="space-y-3">
              <p className="text-sm text-neutral-30">
                This brand supports these SGDs
              </p>
              <div className="flex w-full flex-wrap gap-2">
                {/* {sdgs.map((sdg, index) => {
                  return (
                    <div key={index}>
                      <SDGBadge
                        wording={sdg.name}
                        bgColor={'#FAD1D6'}
                        textColor={'#5C0A14'}
                      />
                    </div>
                  )
                })} */}
              </div>
            </div>

            <article className="h-auto space-y-4">
              <ul className="ml-4 list-disc">
                <li className="text-sm text-neutral-30">Details coming soon</li>
              </ul>
            </article>
          </section>

          <ExternalRedirectionBtn
            wording={'See store'}
            url={partner.partner_url}
            classname="w-full absolute bottom-6"
          />
        </div>
      </ModalBody>
    </>
  )
}
