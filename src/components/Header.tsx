import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { whatsappUrl } from '../config'
import { useLang } from '../i18n'
import { CloseIcon, MenuIcon, WhatsAppIcon } from './Icons'
import { Wordmark } from './Logo'
import { ease } from './Reveal'

const links = ['locations', 'services', 'about', 'work', 'reviews', 'faq'] as const

export function LangToggle() {
  const { lang, setLang, t } = useLang()
  return (
    <div className="lang" role="group" aria-label={t.nav.switchTo}>
      {(['nl', 'en'] as const).map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} className="lang__btn">
          {lang === l && <motion.span layoutId="lang-pill" className="lang__pill" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
          <span className="lang__label">{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // the burger menu only exists below the desktop breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1040px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        className={`header ${scrolled || open ? 'header--scrolled' : ''}`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="container header__inner">
          <a href="#top" className="header__brand" aria-label="Everix Barber – home">
            <Wordmark />
          </a>
          <nav className="header__nav" aria-label="Main">
            {links.map((k) => (
              <a key={k} href={`#${k}`}>
                {t.nav[k]}
              </a>
            ))}
          </nav>
          <div className="header__actions">
            <LangToggle />
            <a className="btn btn--gold btn--sm header__cta" href="#book">
              <WhatsAppIcon width={18} height={18} />
              {t.nav.book}
            </a>
            <button
              type="button"
              className="icon-btn header__burger"
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.3, ease }}
          >
            <motion.nav
              aria-label="Mobile"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {links.map((k) => (
                <motion.a
                  key={k}
                  href={`#${k}`}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                >
                  {t.nav[k]}
                </motion.a>
              ))}
            </motion.nav>
            <a className="btn btn--gold btn--block" href={whatsappUrl()} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
              <WhatsAppIcon /> {t.hero.ctaBook}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
