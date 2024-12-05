import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effects'
import Image from 'next/image'
import HeroImage from '@/assets/hero-image.svg'
import EncotekiLogo from '@/assets/encoteki-icon.png'
import { InfiniteMovingImages } from '@/components/ui/infinite-moving-images'

export default function Hero() {
  const heading = [
    {
      text: 'Mint',
    },
    {
      text: 'with',
    },
    {
      text: 'Encoteki.',
      className: 'text-primary-green',
    },
  ]
  const desc =
    'Mint, earn, and make a difference. Our animal-themed NFTs fuel non-profit projects that aim to build a better world through technology and community-driven sustainability.'

  const mediasWording = 'As seen on various medias'

  const medias = [
    {
      path: '/assets/medias/altcoinbuzz.png',
    },
    {
      path: '/assets/medias/coindeskindonesia.jpg',
    },
    {
      path: '/assets/medias/coinvestasi.png',
    },
    {
      path: '/assets/medias/icryptomedia.png',
    },
    {
      path: '/assets/medias/jelajahcoin.png',
    },
    {
      path: '/assets/medias/karirlab.png',
    },
    {
      path: '/assets/medias/republika.png',
    },
    {
      path: '/assets/medias/satechainmedia.png',
    },
    {
      path: '/assets/medias/thelocalenablers.png',
    },
    {
      path: '/assets/medias/wartaekonomi.png',
    },
    {
      path: '/assets/medias/yahoofinance.png',
    },
    {
      path: '/assets/medias/vivacoid.webp',
    },
  ]

  return (
    <section className="m-auto mt-[72px] w-[calc(100%-32px)] tablet:w-[calc(100%-64px)] desktop:max-w-[1440px]">
      <div className="m-auto text-center desktop:w-[786px]">
        <Image
          src={EncotekiLogo}
          alt={'Encoteki'}
          width={46}
          className="block tablet:hidden"
        />
        <TypewriterEffectSmooth words={heading} />

        <span className="font-inter text-base font-normal tablet:text-lg">
          {desc}
        </span>
      </div>

      <Image
        src={HeroImage}
        alt={'The Satwas Band'}
        className="m-auto my-10 w-full desktop:w-[959px] desktop:py-12"
      />
      <div className="font-inter text-center text-base font-normal desktop:pt-2 desktop:text-lg">
        {mediasWording}
      </div>
      <div className="antialiase relative flex flex-col items-center justify-center overflow-hidden rounded-md desktop:pb-6">
        <InfiniteMovingImages items={medias} direction="right" speed="normal" />
      </div>
    </section>
  )
}
