import { motion } from 'motion/react'
import { business, whatsappUrl } from '../config'
import { useLang } from '../i18n'
import { CalendarIcon, InstagramIcon, MapPinIcon, WhatsAppIcon } from './Icons'
import { LogoMark, Wordmark } from './Logo'
import { Reveal } from './Reveal'

export function Footer() {
  const { t } = useLang()
  const c = t.contact
  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="cta-band">
          <LogoMark className="cta-band__mark" />
          <div>
            <h2>{c.title}</h2>
            <p>{c.lead}</p>
          </div>
          <motion.a
            className="btn btn--gold btn--lg"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <WhatsAppIcon /> {t.hero.ctaBook}
          </motion.a>
        </Reveal>

        <div className="footer__grid">
          <div className="footer__brand">
            <Wordmark />
            <p>{t.hero.eyebrow}</p>
          </div>
          <div>
            <p className="footer__label">
              <MapPinIcon width={16} height={16} /> {c.address}
            </p>
            <a href={business.mapsUrl} target="_blank" rel="noopener">
              {business.address.street}
              <br />
              {business.address.city}
            </a>
          </div>
          <div>
            <p className="footer__label">
              <CalendarIcon width={16} height={16} /> {c.hours}
            </p>
            <p>{c.days}</p>
          </div>
          <div>
            <p className="footer__label">Contact</p>
            <ul className="footer__links">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener">
                  <WhatsAppIcon width={16} height={16} /> {c.whatsapp}
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/${business.instagram}`} target="_blank" rel="noopener">
                  <InstagramIcon width={16} height={16} /> @{business.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer__legal">
          © {new Date().getFullYear()} {business.name} Barber · {business.barber}. {c.rights}
        </p>
      </div>
    </footer>
  )
}
