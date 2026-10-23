import { motion } from 'motion/react'
import { business } from '../config'
import { useLang } from '../i18n'
import { LogoMark } from './Logo'
import { fadeUp, Reveal, stagger } from './Reveal'

export function About() {
  const { t } = useLang()
  const a = t.about
  return (
    <section id="about" className="section">
      <div className="container about">
        <Reveal className="about__photo">
          {/* PLACEHOLDER: replace with a portrait of Kevin, e.g. <img src="/kevin.webp" alt="Kevin Everix" /> */}
          <div className="photo-placeholder">
            <LogoMark className="photo-placeholder__mark" />
            <span>{a.photoNote}</span>
          </div>
          <div className="about__badge">
            <strong>{business.yearsExperience}</strong>
            <span>{t.hero.stats[0].label}</span>
          </div>
        </Reveal>
        <motion.div
          className="about__copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.1)}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            {a.eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp}>{a.title}</motion.h2>
          {a.body.map((p) => (
            <motion.p key={p.slice(0, 20)} variants={fadeUp}>
              {p}
            </motion.p>
          ))}
          <motion.div className="signature" variants={fadeUp}>
            <span className="signature__name">{a.signature}</span>
            <span className="signature__role">{a.role}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
