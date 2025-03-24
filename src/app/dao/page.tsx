import DAOBreadcrumb from '@/components/breadcrumbs/daoBreadrumbs'
import Footer from '@/components/footer'
import NavBar from '@/components/navbar'
import { Metadata } from 'next'
import DAOList from './daoList'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Encoteki DAO',
  description: 'Encoteki DAO',
}

export default async function DAO() {
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
          <DAOList />
        </section>
      </main>
      <Footer />
    </>
  )
}
