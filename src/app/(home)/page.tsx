import NavBar from '@/components/navbar'
import Hero from './hero'
import NFTCollection from './nftCollection'
import Benefit from './benefit'
import About from './about'
import Roadmap from './roadmap'
import Faq from './faq'
import Footer from '@/components/footer'
import Family from './family'
import FadeInSection from '@/components/ui/FadeInSection'

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
            <FadeInSection>
              <NFTCollection />
            </FadeInSection>
          </section>
          <section id="benefit" className="py-10 tablet:py-[60px]">
            <FadeInSection>
              <Benefit />
            </FadeInSection>
          </section>
          <section id="about" className="py-10 tablet:py-[60px]">
            <FadeInSection>
              <About />
            </FadeInSection>
          </section>
          <section id="roadmap" className="py-10 tablet:py-[60px]">
            <FadeInSection>
              <Roadmap />
            </FadeInSection>
          </section>

          <section id="faq" className="pt-10 tablet:pt-[60px]">
            <Faq />
          </section>
        </div>
      </main>
      <section id="about" className="w-full bg-khaki-90 py-10 tablet:py-[60px]">
        <Family />
      </section>

      <Footer />
    </>
  )
}
