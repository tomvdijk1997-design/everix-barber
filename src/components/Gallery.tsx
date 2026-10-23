import { motion } from 'motion/react'
import { business } from '../config'
import { useLang } from '../i18n'
import { InstagramIcon } from './Icons'
import { LogoMark } from './Logo'
import { fadeUp, SectionHead, stagger } from './Reveal'

// PLACEHOLDER: add real photos (WebP, ~1200px) to /public/gallery and set `src` per item.
const photos: (string | null)[] = [null, null, null, null, null, null]

export function Gallery() {
  const { t } = useLang()
  const g = t.gallery
  return (
    <section id="work" className="section section--alt">
      <div className="container">
        <SectionHead eyebrow={g.eyebrow} title={g.title} lead={g.lead} />
        <motion.ul
          className="gallery"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.07)}
        >
          {g.items.map((label, i) => (
            <motion.li key={label} className={`gallery__item gallery__item--${i}`} variants={fadeUp}>
              <motion.figure whileHover="hover" initial="rest" animate="rest">
                {photos[i] ? (
                  <motion.img src={photos[i]!} alt={label} loading="lazy" variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }} />
                ) : (
                  <motion.div className="gallery__ph" variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}>
                    <LogoMark className="gallery__ph-mark" />
                    <span>{g.placeholder}</span>
                  </motion.div>
                )}
                <figcaption>{label}</figcaption>
              </motion.figure>
            </motion.li>
          ))}
        </motion.ul>
        <div className="center">
          <a className="btn btn--ghost" href={`https://instagram.com/${business.instagram}`} target="_blank" rel="noopener">
            <InstagramIcon /> {g.follow}
          </a>
        </div>
      </div>
    </section>
  )
}
