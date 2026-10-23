import { motion } from 'motion/react'
import { business } from '../config'
import { useLang } from '../i18n'
import { ArrowRightIcon, HomeIcon, MapPinIcon } from './Icons'
import { fadeUp, SectionHead, stagger } from './Reveal'

export function Locations() {
  const { t } = useLang()
  const l = t.locations
  return (
    <section id="locations" className="section">
      <div className="container">
        <SectionHead eyebrow={l.eyebrow} title={l.title} />
        <motion.div
          className="loc-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger(0.12)}
        >
          <motion.article className="card loc-card" variants={fadeUp} whileHover={{ y: -4 }}>
            <div className="loc-card__icon">
              <MapPinIcon width={24} height={24} />
            </div>
            <p className="tag">{l.shop.tag}</p>
            <h3>{l.shop.title}</h3>
            <p>{l.shop.body}</p>
            <a className="link-arrow" href={business.mapsUrl} target="_blank" rel="noopener">
              {l.shop.cta} <ArrowRightIcon width={16} height={16} />
            </a>
          </motion.article>

          <motion.article className="card loc-card" variants={fadeUp} whileHover={{ y: -4 }}>
            <div className="loc-card__icon">
              <HomeIcon width={24} height={24} />
            </div>
            <p className="tag">{l.home.tag}</p>
            <h3>{l.home.title}</h3>
            <p>{l.home.body}</p>
            <p className="loc-card__area-label">{l.home.areaLabel}</p>
            <ul className="chips">
              {business.serviceArea.map((town) => (
                <li key={town}>{town}</li>
              ))}
            </ul>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}
