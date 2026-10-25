import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { business, services, whatsappUrl, type ServiceId } from '../config'
import { useLang, type Dict } from '../i18n'
import { DatePicker, firstBookableDay } from './DatePicker'
import { HomeIcon, MapPinIcon, WhatsAppIcon } from './Icons'
import { ease, fadeUp, SectionHead, stagger } from './Reveal'

type Place = 'shop' | 'home'

const longDate = (t: Dict, d: Date) => `${t.days[d.getDay()]} ${d.getDate()} ${t.months[d.getMonth()]}`

export function Booking({ service, setService }: { service: ServiceId; setService: (s: ServiceId) => void }) {
  const { t } = useLang()
  const b = t.booking
  const [place, setPlace] = useState<Place>('shop')
  const [town, setTown] = useState<string>(business.serviceArea[0])
  const [day, setDay] = useState(firstBookableDay)
  const [name, setName] = useState('')

  const svc = services.find((s) => s.id === service)!

  const lines = [
    b.msg.hi,
    '',
    `${b.msg.service}: ${t.services.items[service].name} (€${svc.price})`,
    `${b.msg.location}: ${place === 'shop' ? b.msg.shop : `${b.msg.home} ${town}`}`,
    `${b.msg.day}: ${longDate(t, day)}`,
    ...(name.trim() ? [`${b.msg.name}: ${name.trim()}`] : []),
    '',
    b.msg.outro,
  ]
  const message = lines.join('\n')

  return (
    <section id="book" className="section section--alt">
      <div className="container">
        <SectionHead eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
        <motion.div
          className="booking"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1)}
        >
          <motion.form className="card booking__form" variants={fadeUp} onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend>
                <span className="step">1</span> {b.service}
              </legend>
              <div className="options options--2">
                {services.map((s) => (
                  <label key={s.id} className="option">
                    <input type="radio" name="service" checked={service === s.id} onChange={() => setService(s.id)} />
                    <span className="option__body">
                      <span className="option__title">{t.services.items[s.id].name}</span>
                      <span className="option__sub">€{s.price}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <span className="step">2</span> {b.location}
              </legend>
              <div className="options options--2">
                {(['shop', 'home'] as const).map((p) => (
                  <label key={p} className="option">
                    <input type="radio" name="place" checked={place === p} onChange={() => setPlace(p)} />
                    <span className="option__body">
                      <span className="option__title">
                        {p === 'shop' ? <MapPinIcon width={16} height={16} /> : <HomeIcon width={16} height={16} />}
                        {p === 'shop' ? b.locShop : b.locHome}
                      </span>
                      <span className="option__sub">{p === 'shop' ? b.locShopSub : b.locHomeSub}</span>
                    </span>
                  </label>
                ))}
              </div>
              <AnimatePresence initial={false}>
                {place === 'home' && (
                  <motion.div
                    key="town"
                    className="field-wrap"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <label className="field">
                      <span className="field__label">{b.town}</span>
                      <select value={town} onChange={(e) => setTown(e.target.value)}>
                        {business.serviceArea.map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            </fieldset>

            <fieldset>
              <legend>
                <span className="step">3</span> {b.day}
              </legend>
              <DatePicker value={day} onChange={setDay} />
            </fieldset>

            <label className="field">
              <span className="field__label">
                {b.name} <small>({b.optional})</small>
              </span>
              <input
                type="text"
                autoComplete="given-name"
                placeholder={b.namePlaceholder}
                value={name}
                maxLength={40}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </motion.form>

          <motion.aside className="booking__summary" variants={fadeUp} aria-live="polite">
            <div className="chat">
              <div className="chat__head">
                <span className="chat__avatar">
                  <WhatsAppIcon width={18} height={18} />
                </span>
                <span>
                  <strong>Kevin · {business.name}</strong>
                  <small>{b.summary}</small>
                </span>
              </div>
              <motion.div key={`${service}-${place}-${town}-${day.getTime()}`} className="chat__bubble" initial={{ opacity: 0.6, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                {message}
              </motion.div>
            </div>
            <motion.a
              className="btn btn--gold btn--block btn--lg"
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <WhatsAppIcon /> {b.send}
            </motion.a>
            <p className="booking__note">{b.note}</p>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  )
}
