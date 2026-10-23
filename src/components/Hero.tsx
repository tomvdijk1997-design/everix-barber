import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useLang } from '../i18n'
import { ArrowRightIcon, WhatsAppIcon } from './Icons'
import { LogoMark } from './Logo'
import { ease, fadeUp, stagger } from './Reveal'

function Medallion() {
  return (
    <div className="medallion">
      <div className="medallion__glow" aria-hidden />
      <motion.div
        className="medallion__disc"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
      >
        <motion.div
          initial={{ rotate: -25, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.5 }}
        >
          <LogoMark className="medallion__mark" title="Everix logo" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export function Hero() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="hero">
      <div className="container hero__grid">
        <motion.div className="hero__copy" initial="hidden" animate="visible" variants={stagger(0.1, 0.15)}>
          <motion.p className="eyebrow" variants={fadeUp}>
            {t.hero.eyebrow}
          </motion.p>
          <h1 className="hero__title">
            <motion.span variants={fadeUp}>{t.hero.titleA}</motion.span>
            <motion.span variants={fadeUp}>{t.hero.titleB}</motion.span>
            <motion.em variants={fadeUp}>{t.hero.titleC}</motion.em>
          </h1>
          <motion.p className="hero__lead" variants={fadeUp}>
            {t.hero.lead}
          </motion.p>
          <motion.div className="hero__ctas" variants={fadeUp}>
            <motion.a
              className="btn btn--gold"
              href="#book"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <WhatsAppIcon /> {t.hero.ctaBook}
            </motion.a>
            <motion.a className="btn btn--ghost" href="#services" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              {t.hero.ctaPrices} <ArrowRightIcon width={18} height={18} />
            </motion.a>
          </motion.div>
          <motion.dl className="hero__stats" variants={stagger(0.08)}>
            {t.hero.stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div className="hero__visual" style={{ y, opacity: fade }}>
          <Medallion />
        </motion.div>
      </div>
      <motion.a
        href="#locations"
        className="hero__scroll"
        aria-label="Scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6, ease }}
      >
        <span />
      </motion.a>
    </section>
  )
}
