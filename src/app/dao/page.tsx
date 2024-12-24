import DaoBadge from '@/components/badge/daoBadge'
import DAOBreadcrumb from '@/components/breadcrumbs/daoBreadrumbs'
import Footer from '@/components/footer'
import NavBar from '@/components/navbar'
import { DAOResponse } from '@/types/dao'
import calculateDayDifference from '@/utils/calculateDayDifference'
import { getDAOs } from '@/utils/supabase/getDaos'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import EmptyBox from '@/assets/dao/empty-box.svg'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Encoteki DAO',
  description: 'Encoteki DAO',
}

export default async function DAO() {
  const daos: DAOResponse[] = await getDAOs()

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
  ]

  return (
    <>
      <NavBar />

      <main className="mx-auto my-16 w-[calc(100%-32px)] max-w-[912px] space-y-12 tablet:my-32">
        <header className="space-y-8">
          <DAOBreadcrumb items={breadcrumbs} />
          <div className="space-y-[18px]">
            <h1 className="text-3xl font-medium tablet:text-5xl">
              Encoteki DAO
            </h1>
            <p className="text-base tablet:text-lg">
              Encoteki governs the Encoteki DAO. Owning an NFT allows you to
              vote on our proposals, with the results determining the direction
              of Encoteki’s future initiatives.
            </p>
          </div>
        </header>
        <section className="h-[calc((142px*3)+(32px*3))]">
          {daos.length > 0 ? (
            <div className="flex flex-col gap-4 tablet:gap-8">
              {daos.map((dao, index) => {
                return (
                  <Link key={index} href={`/dao/${dao.dao_id}`}>
                    <div className="w-full space-y-1 rounded-2xl border border-white bg-white p-4 transition duration-500 hover:border-primary-green tablet:rounded-[32px] tablet:p-6">
                      <DaoBadge daoType={dao.dao_type} />
                      <h2 className="text-lg font-medium tablet:text-2xl">
                        {dao.dao_name}
                      </h2>
                      <div className="flex justify-between text-sm tablet:text-base">
                        <p>
                          Voting ends in {calculateDayDifference(dao.end_date)}
                          {calculateDayDifference(dao.end_date) > 1
                            ? ' days'
                            : ' day'}
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
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="h-auto w-[calc(100%-64px)] max-w-[377px] space-y-3 text-center">
                <Image
                  src={EmptyBox}
                  alt="empty"
                  className="mx-auto size-[164px] tablet:size-[256px]"
                />
                <p className="text-xl font-medium tablet:text-2xl">
                  No proposals available
                </p>
                <p className="text-base text-neutral-30 tablet:text-lg">
                  Proposals you can vote for will appear here. Check back later!
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
