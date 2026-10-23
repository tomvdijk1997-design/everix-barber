import { MotionConfig } from 'motion/react'
import { useState } from 'react'
import { About } from './components/About'
import { Booking } from './components/Booking'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Locations } from './components/Locations'
import { MobileCta } from './components/MobileCta'
import { Reviews } from './components/Reviews'
import { Services } from './components/Services'
import type { ServiceId } from './config'
import { LangProvider } from './i18n'

export default function App() {
  const [service, setService] = useState<ServiceId>('cut')
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Hero />
          <Locations />
          <Services onPick={setService} />
          <About />
          <Gallery />
          <Reviews />
          <Booking service={service} setService={setService} />
          <Faq />
        </main>
        <Footer />
        <MobileCta />
      </LangProvider>
    </MotionConfig>
  )
}
