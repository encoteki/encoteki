import NavBar from '@/components/navbar'
import Hero from './hero'
import NFTCollection from './nftCollection'
import Benefit from './benefit'
import About from './about'
import Roadmap from './roadmap'
import Faq from './faq'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />

      <main className="h-auto bg-white">
        <div className="relative z-10 mx-auto w-[calc(100%-32px)] tablet:w-[calc(100%-64px)] desktop:max-w-[1440px]">
          <section
            id="collection"
            className="pb-10 pt-20 tablet:pb-[60px] tablet:pt-[120px]"
          >
            <NFTCollection />
          </section>
          <section id="benefit" className="py-10 tablet:py-[60px]">
            <Benefit />
          </section>
          <section id="about" className="py-10 tablet:py-[60px]">
            <About />
          </section>
          <section id="roadmap" className="py-10 tablet:py-[60px]">
            <Roadmap />
          </section>
          <section id="faq" className="pt-10 tablet:pt-[60px]">
            <Faq />
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
