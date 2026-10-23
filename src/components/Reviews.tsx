import { motion } from 'motion/react'
import { useLang } from '../i18n'
import { StarIcon } from './Icons'
import { fadeUp, SectionHead, stagger } from './Reveal'

// PLACEHOLDER reviews: replace with real client quotes (with their permission) before launch,
// then set this to false to remove the "Example" tags.
const isPlaceholder = true

export function Reviews() {
  const { t } = useLang()
  const r = t.reviews
  return (
    <section id="reviews" className="section">
      <div className="container">
        <SectionHead eyebrow={r.eyebrow} title={r.title} />
        <motion.div
          className="reviews"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger(0.1)}
        >
          {r.items.map((item, i) => (
            <motion.figure key={i} className="card review" variants={fadeUp} whileHover={{ y: -4 }}>
              {isPlaceholder && <span className="review__tag">{r.placeholder}</span>}
              <div className="review__stars" aria-label="5/5">
                {Array.from({ length: 5 }, (_, j) => (
                  <StarIcon key={j} width={16} height={16} />
                ))}
              </div>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <strong>{item.name}</strong> · {item.place}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
