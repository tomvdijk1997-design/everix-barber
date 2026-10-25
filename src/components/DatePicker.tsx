import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { business } from '../config'
import { useLang } from '../i18n'
import { ArrowRightIcon } from './Icons'
import { ease } from './Reveal'

/** How far ahead clients can book. */
export const MONTHS_AHEAD = 3

export const startOfToday = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

const lastBookableDay = (today: Date) => new Date(today.getFullYear(), today.getMonth() + MONTHS_AHEAD, today.getDate())

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export function isBookable(d: Date, today = startOfToday()) {
  return d >= today && d <= lastBookableDay(today) && (business.bookingDays as readonly number[]).includes(d.getDay())
}

export function firstBookableDay() {
  const d = startOfToday()
  while (!isBookable(d)) d.setDate(d.getDate() + 1)
  return d
}

export function DatePicker({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
  const { lang, t } = useLang()
  const locale = lang === 'nl' ? 'nl-NL' : 'en-GB'
  const today = startOfToday()
  const last = lastBookableDay(today)
  const [view, setView] = useState(() => new Date(value.getFullYear(), value.getMonth(), 1))
  const [direction, setDirection] = useState(1)

  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1)
  const canNext = view < new Date(last.getFullYear(), last.getMonth(), 1)
  const go = (step: number) => {
    setDirection(step)
    setView((v) => new Date(v.getFullYear(), v.getMonth() + step, 1))
  }

  // Monday-first grid
  const offset = (view.getDay() + 6) % 7
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ]
  const weekdays = [1, 2, 3, 4, 5, 6, 0].map((d) => t.daysShort[d])
  const title = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(view)
  const fullDate = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="cal">
      <div className="cal__head">
        <button type="button" className="cal__nav" onClick={() => go(-1)} disabled={!canPrev} aria-label={t.booking.prevMonth}>
          <ArrowRightIcon width={18} height={18} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.p
            key={title}
            className="cal__title"
            aria-live="polite"
            custom={direction}
            initial={{ opacity: 0, y: direction * 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction * -8 }}
            transition={{ duration: 0.2, ease }}
          >
            {title}
          </motion.p>
        </AnimatePresence>
        <button type="button" className="cal__nav" onClick={() => go(1)} disabled={!canNext} aria-label={t.booking.nextMonth}>
          <ArrowRightIcon width={18} height={18} />
        </button>
      </div>

      <div className="cal__grid cal__weekdays" aria-hidden>
        {weekdays.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <div className="cal__viewport">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={title}
            className="cal__grid"
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.25, ease }}
          >
            {cells.map((d, i) => {
              if (!d) return <span key={`blank-${i}`} />
              const ok = isBookable(d, today)
              const selected = sameDay(d, value)
              return (
                <button
                  key={d.getDate()}
                  type="button"
                  className={`cal__day ${selected ? 'is-selected' : ''} ${sameDay(d, today) ? 'is-today' : ''}`}
                  disabled={!ok}
                  aria-pressed={selected}
                  aria-label={fullDate.format(d)}
                  onClick={() => onChange(d)}
                >
                  {selected && <motion.span layoutId="cal-selected" className="cal__pill" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
                  <span className="cal__num">{d.getDate()}</span>
                </button>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="cal__hint">{t.booking.calendarHint}</p>
    </div>
  )
}
