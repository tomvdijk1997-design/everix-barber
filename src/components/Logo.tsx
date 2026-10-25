import { useId } from 'react'

const THICK_BLADE = 'M76 12 L124 12 L170 140 L208 226 L196 232 L142 150 Z'

/** The Everix scissors-X mark, recreated as vector. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, '')
  const grad = `${id}-g`
  return (
    <svg className={className} viewBox="0 0 320 352" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#E9D8B4" />
          <stop offset="0.55" stopColor="#CBB088" />
          <stop offset="1" stopColor="#A68C64" />
        </linearGradient>
        <mask id={`${id}-gap`} maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="352">
          <rect width="320" height="352" fill="#fff" />
          <path d={THICK_BLADE} fill="#000" stroke="#000" strokeWidth="12" strokeLinejoin="round" />
        </mask>
        <mask id={`${id}-pivot`} maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="352">
          <rect width="320" height="352" fill="#fff" />
          <circle cx="156" cy="146" r="7" fill="#000" />
        </mask>
      </defs>
      <g fill={`url(#${grad})`}>
        <g mask={`url(#${id}-gap)`}>
          <path d="M200 6 L314 6 L314 9 Q298 12 290 15 L200 15 Z" />
          <path d="M274 13 L291 13 L90 240 L66 227 Z" />
          <ellipse cx="58" cy="284" rx="44" ry="57" transform="rotate(32 58 284)" fill="none" stroke={`url(#${grad})`} strokeWidth="13" />
        </g>
        <g mask={`url(#${id}-pivot)`}>
          <path d="M8 6 L128 6 L128 15 L76 15 Q44 12 8 10 Z" />
          <path d={THICK_BLADE} />
          <ellipse cx="262" cy="284" rx="44" ry="57" transform="rotate(-32 262 284)" fill="none" stroke={`url(#${grad})`} strokeWidth="13" />
        </g>
      </g>
    </svg>
  )
}

export function Wordmark() {
  return (
    <span className="wordmark" role="img" aria-label="Everix">
      <span className="wordmark__text" aria-hidden>
        Everi
      </span>
      <LogoMark className="wordmark__x" />
    </span>
  )
}
