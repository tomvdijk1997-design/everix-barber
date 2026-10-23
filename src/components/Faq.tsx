import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useLang } from '../i18n'
import { PlusIcon } from './Icons'
import { ease, fadeUp, SectionHead, stagger } from './Reveal'

export function Faq() {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="section">
      <div className="container container--narrow">
        <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <motion.ul
          className="faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.06)}
        >
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.li key={i} className={`faq__item ${isOpen ? 'is-open' : ''}`} variants={fadeUp}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <motion.span className="faq__icon" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25, ease }}>
                      <PlusIcon />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className="faq__answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
