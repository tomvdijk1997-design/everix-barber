import { motion } from 'motion/react'
import { business, services } from '../config'
import { useLang } from '../i18n'
import { CalendarIcon, CheckIcon, WalletIcon } from './Icons'
import { fadeUp, SectionHead, stagger } from './Reveal'

export function Services({ onPick }: { onPick: (id: (typeof services)[number]['id']) => void }) {
  const { t } = useLang()
  const s = t.services
  const dayNames = business.bookingDays.map((d) => t.days[d]).join(', ')

  return (
    <section id="services" className="section section--alt">
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
        <motion.div
          className="price-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.1)}
        >
          {services.map((svc, i) => (
            <motion.article key={svc.id} className={`price ${i === 1 ? 'price--featured' : ''}`} variants={fadeUp}>
              <div className="price__head">
                <h3>{s.items[svc.id].name}</h3>
                <span className="price__dots" aria-hidden />
                <p className="price__amount">€{svc.price}</p>
              </div>
              <p className="price__desc">{s.items[svc.id].desc}</p>
              <a className="link-arrow" href="#book" onClick={() => onPick(svc.id)}>
                {s.book} →
              </a>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="info-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.08)}
        >
          <motion.div className="info" variants={fadeUp}>
            <p className="info__label">{s.specialties}</p>
            <ul className="ticks">
              {s.specialtyList.map((x) => (
                <li key={x}>
                  <CheckIcon width={16} height={16} /> {x}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="info" variants={fadeUp}>
            <p className="info__label">
              <WalletIcon width={16} height={16} /> {s.paymentTitle}
            </p>
            <p className="info__value">{s.payment}</p>
          </motion.div>
          <motion.div className="info" variants={fadeUp}>
            <p className="info__label">
              <CalendarIcon width={16} height={16} /> {s.daysTitle}
            </p>
            <p className="info__value info__value--cap">{dayNames}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
