import Image from 'next/image'

import Partner1 from '@/assets/partners/logoipsum-1.svg'
import Partner2 from '@/assets/partners/logoipsum-2.svg'
import Partner3 from '@/assets/partners/logoipsum-3.svg'
import Partner4 from '@/assets/partners/logoipsum-4.svg'
import Partner5 from '@/assets/partners/logoipsum-5.svg'
import NavBar from '@/components/navbar'
import { Modal, ModalBody, ModalTrigger } from '@/components/ui/animated-modal'
import Footer from '@/components/footer'

export default function Partners() {
  const partners = [
    {
      name: 'Partner 1',
      deals: 'Diskon hingga Rp. 50,000',
      desc: 'Promo untuk berbagai barang menarik seperti kopi dan makanan',
      image: Partner1,
    },
    {
      name: 'Partner 2',
      deals: 'Diskon hingga Rp. 50,000',
      desc: 'Promo untuk berbagai barang menarik seperti kopi dan makanan',
      image: Partner2,
    },
    {
      name: 'Partner 3',
      deals: 'Diskon hingga Rp. 50,000',
      desc: 'Promo untuk berbagai barang menarik seperti kopi dan makanan',
      image: Partner3,
    },
    {
      name: 'Partner 4',
      deals: 'Diskon hingga Rp. 50,000',
      desc: 'Promo untuk berbagai barang menarik seperti kopi dan makanan',
      image: Partner4,
    },
    {
      name: 'Partner 5',
      deals: 'Diskon hingga Rp. 50,000',
      desc: 'Promo untuk berbagai barang menarik seperti kopi dan makanan',
      image: Partner5,
    },
    {
      name: 'Partner 6',
      deals: 'Diskon hingga Rp. 50,000',
      desc: 'Promo untuk berbagai barang menarik seperti kopi dan makanan',
      image: Partner1,
    },
  ]
  return (
    <>
      <NavBar />

      {/* Mobile & Tablet View */}
      <div className="mx-auto w-[calc(100%-32px)] max-w-[450px] py-[72px] desktop:hidden">
        <main className="flex flex-col gap-8 desktop:hidden">
          <header className="desktop:space-y-4">
            <h2 className="text-[32px] font-medium">Partner Deals</h2>
            <h5 className="text-base font-normal">
              Enjoy exclusive deals only for Encoteki holders.
            </h5>
          </header>

          <section className="flex flex-col gap-4">
            {partners.map((item, index) => (
              <Modal key={index}>
                <ModalTrigger className="mx-auto flex items-center gap-4 rounded-2xl bg-white p-4">
                  <div className="flex h-[154px] flex-1 items-center justify-center">
                    <Image src={item.image} alt="alt" width={100} />
                  </div>

                  <div className="flex flex-[2] flex-col gap-1 text-left text-black">
                    <p className="text-md font-normal">{item.name}</p>
                    <p className="text-lg font-medium">{item.deals}</p>
                    <p className="text-sm font-normal text-neutral-40">
                      {item.desc}
                    </p>
                  </div>
                </ModalTrigger>
                <ModalBody className="bg-white p-4">
                  <header>Deal info</header>
                  <main className="flex h-[300px] w-full items-center justify-center">
                    <PartnerDealsDetail />
                  </main>
                </ModalBody>
              </Modal>
            ))}
          </section>
        </main>
      </div>

      {/* Desktop View */}
      <div className="mx-auto hidden desktop:block desktop:w-[913px] desktop:py-24">
        <main className="flex flex-col gap-12">
          <header className="desktop:space-y-4">
            <h2 className="text-[48px] font-medium">Partner Deals</h2>
            <h5 className="text-lg font-normal">
              Enjoy exclusive deals only for Encoteki holders.
            </h5>
          </header>

          <div className="grid grid-cols-2 gap-4">
            {partners.map((item, index) => (
              <Modal key={index}>
                <ModalTrigger className="flex items-center bg-white desktop:w-[450px] desktop:gap-4 desktop:rounded-2xl desktop:p-4">
                  <div className="flex h-[154px] flex-1 items-center justify-center">
                    <Image src={item.image} alt="alt" width={100} />
                  </div>

                  <div className="flex flex-[2] flex-col gap-1 text-left text-black">
                    <p className="text-md font-normal">{item.name}</p>
                    <p className="text-lg font-medium">{item.deals}</p>
                    <p className="text-sm font-normal text-neutral-40">
                      {item.desc}
                    </p>
                  </div>
                </ModalTrigger>
                <ModalBody className="bg-white p-4">
                  <header>Deal info</header>
                  <main className="flex h-[300px] w-full items-center justify-center">
                    <PartnerDealsDetail />
                  </main>
                </ModalBody>
              </Modal>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  )
}

function PartnerDealsDetail() {
  return <div className="">Deal Soon!</div>
}
