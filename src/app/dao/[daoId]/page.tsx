import React from 'react'
import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import DAODetail from './daoDetail'
import { getDaoById } from '@/utils/supabase/getDaobyId'
import { DAOResponse, OptionsResponse } from '@/types/dao'
import DAOBreadcrumb from '@/components/breadcrumbs/daoBreadrumbs'
import DaoBadge from '@/components/badge/daoBadge'
import calculateDayDifference from '@/utils/calculateDayDifference'
import { getDaoOptions } from '@/utils/supabase/getDaoOptions'
import Footer from '@/components/footer'

type Params = Promise<{ daoId: string }>

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { daoId } = await params

  const dao: DAOResponse = await getDaoById(Number(daoId))

  return {
    title: dao.dao_name || 'DAO',
    description: `Vote for ${dao.dao_name}`,
  }
}

export const dynamic = 'force-dynamic'

export default async function DAODetailPage({ params }: { params: Params }) {
  const { daoId } = await params

  const dao: DAOResponse = await getDaoById(Number(daoId))
  const options: OptionsResponse[] = await getDaoOptions(Number(daoId))

  const breadcrumbs = [
    {
      index: 1,
      page: 'Home',
      link: '/',
    },
    {
      index: 2,
      page: 'DAO',
      link: '/dao',
    },
    {
      index: 3,
      page: dao.dao_name,
      link: `/dao/${daoId}`,
    },
  ]

  return (
    <>
      <Navbar />
      <main className="mx-auto my-16 w-[calc(100%-32px)] max-w-[912px] space-y-12 tablet:my-32">
        <header className="space-y-8">
          <DAOBreadcrumb items={breadcrumbs} />
          <div className="space-y-2">
            <DaoBadge daoType={dao.dao_type} />
            <h1 className="text-3xl font-medium tablet:text-5xl">
              {dao.dao_name}
            </h1>
            <div className="flex justify-between text-sm tablet:text-base">
              <p>
                Voting ends in {calculateDayDifference(dao.end_date)}
                {calculateDayDifference(dao.end_date) > 1 ? ' days' : ' day'}
              </p>
              <p className="text-neutral-40">
                Created{' '}
                {calculateDayDifference(dao.start_date) > 0
                  ? calculateDayDifference(dao.start_date)
                  : ''}
                {calculateDayDifference(dao.start_date) > 0
                  ? ' days ago'
                  : ' today'}
              </p>
            </div>
          </div>
        </header>

        <>
          <DAODetail daoId={Number(daoId)} daoDetail={dao} options={options} />
        </>
      </main>
      <Footer />
    </>
  )
}
