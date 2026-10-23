import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { useLang } from '../i18n'
import { WhatsAppIcon } from './Icons'

/** Sticky booking button on small screens, shown once the hero is scrolled past. */
export function MobileCta() {
  const { t } = useLang()
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const book = document.getElementById('book')
    const inBooking = book ? book.getBoundingClientRect().top < window.innerHeight && book.getBoundingClientRect().bottom > 0 : false
    setShow(y > window.innerHeight * 0.7 && !inBooking)
  })
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#book"
          className="mobile-cta btn btn--gold"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        >
          <WhatsAppIcon /> {t.hero.ctaBook}
        </motion.a>
      )}
    </AnimatePresence>
  )
}
