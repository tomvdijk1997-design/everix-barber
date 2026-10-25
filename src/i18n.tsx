import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const nl = {
  nav: {
    services: 'Prijzen',
    locations: 'Locaties',
    about: 'Over Kevin',
    work: 'Werk',
    reviews: 'Reviews',
    faq: 'FAQ',
    book: 'Boek nu',
    menu: 'Menu',
    close: 'Sluiten',
    switchTo: 'Switch to English',
  },
  hero: {
    eyebrow: 'Barber in Vinkeveen · De Ronde Venen',
    titleA: 'Strakke fades.',
    titleB: 'Verzorgde baarden.',
    titleC: 'In de shop of bij jou thuis.',
    lead: 'Kevin Everix knipt al 6 jaar. In zijn eigen barbershop aan de Heulweg of bij jou thuis, overal in De Ronde Venen.',
    ctaBook: 'Boek via WhatsApp',
    ctaPrices: 'Bekijk prijzen',
    stats: [
      { value: '6', label: 'jaar ervaring' },
      { value: '€20', label: 'per knipbeurt' },
      { value: '€0', label: 'extra voor aan huis' },
    ],
  },
  locations: {
    eyebrow: 'Twee manieren',
    title: 'Jij kiest waar je geknipt wordt',
    shop: {
      tag: 'De barbershop',
      title: 'Heulweg 1, Vinkeveen',
      body: 'Een eigen, kleinschalige barbershop met alle aandacht voor jou. Geen drukke wachtrij, gewoon op je afgesproken tijd in de stoel.',
      cta: 'Route plannen',
    },
    home: {
      tag: 'Aan huis',
      title: 'Overal in De Ronde Venen',
      body: 'Geen tijd om weg te gaan? Kevin komt met zijn complete set-up naar je toe. Zelfde kwaliteit, zelfde prijs, geen voorrijkosten.',
      areaLabel: 'Werkgebied',
    },
  },
  services: {
    eyebrow: 'Prijzen',
    title: 'Eerlijke prijzen, geen gedoe',
    lead: 'In de barbershop of aan huis, je betaalt hetzelfde.',
    items: {
      cut: {
        name: 'Knipbeurt',
        desc: 'Fade, taper, klassieke coupe of schaarwerk. Afgestemd op jouw haar en stijl.',
      },
      cutBeard: {
        name: 'Knippen + baard',
        desc: 'Je knipbeurt plus een strak getrimde en gecontourde baard.',
      },
    },
    specialties: 'Specialiteiten',
    specialtyList: ['Skin & low fades', 'Tapers', 'Baard shape-up', 'Klassieke coupes', 'Schaarwerk'],
    paymentTitle: 'Betalen',
    payment: 'Contant of via Tikkie',
    daysTitle: 'Beschikbaar',
    book: 'Boek deze',
  },
  about: {
    eyebrow: 'Over Kevin',
    title: 'Van de salon naar zijn eigen schuur',
    body: [
      'Kevin Everix staat al zes jaar achter de stoel. In die tijd werkte hij in verschillende barbershops en kapsalons, waar hij zowel het strakke barberwerk als het fijnere schaarwerk onder de knie kreeg.',
      'Nu bouwt hij aan iets eigens. Zijn schuur aan de Heulweg in Vinkeveen verbouwde hij tot een kleine barbershop, en wie liever thuis blijft, knipt hij gewoon op locatie.',
      'Naast zijn vaste baan knipt hij op maandag, donderdag en zondag. Dat betekent: weinig klanten per dag en alle tijd voor jou.',
    ],
    signature: 'Kevin Everix',
    role: 'Eigenaar & barber',
    photoNote: 'Foto volgt',
  },
  gallery: {
    eyebrow: 'Werk',
    title: 'Recent in de stoel',
    lead: 'Meer werk op Instagram.',
    items: ['Skin fade', 'Baard shape-up', 'Klassieke side part', 'Textured crop', 'Low taper', 'Fade + baard'],
    placeholder: 'Foto volgt',
    follow: 'Volg op Instagram',
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'Wat klanten zeggen',
    placeholder: 'Voorbeeld',
    items: [
      { quote: 'Strakste fade die ik in tijden heb gehad. Kevin neemt echt de tijd en denkt mee.', name: 'Voorbeeldnaam', place: 'Vinkeveen' },
      { quote: 'Super handig dat hij aan huis komt. Mijn zoon en ik in één keer geknipt, zonder gedoe.', name: 'Voorbeeldnaam', place: 'Mijdrecht' },
      { quote: 'Baard nog nooit zo netjes gehad. Fijne sfeer in de shop ook.', name: 'Voorbeeldnaam', place: 'Wilnis' },
    ],
  },
  booking: {
    eyebrow: 'Afspraak maken',
    title: 'Boek in 3 tikken via WhatsApp',
    lead: 'Kies wat je wilt, waar en wanneer. Je bericht staat meteen klaar in WhatsApp; Kevin bevestigt je tijd.',
    service: 'Wat wil je?',
    location: 'Waar?',
    locShop: 'Barbershop',
    locShopSub: 'Heulweg 1',
    locHome: 'Aan huis',
    locHomeSub: 'De Ronde Venen',
    town: 'Woonplaats',
    day: 'Welke dag?',
    name: 'Je naam',
    optional: 'optioneel',
    namePlaceholder: 'Bijv. Daan',
    send: 'Open WhatsApp',
    note: 'Er wordt niets verstuurd tot jij in WhatsApp op verzenden drukt.',
    prevMonth: 'Vorige maand',
    nextMonth: 'Volgende maand',
    calendarHint: 'Kevin knipt op maandag, donderdag en zondag.',
    summary: 'Samenvatting',
    msg: {
      hi: 'Hoi Kevin! Ik wil graag een afspraak maken.',
      service: 'Behandeling',
      location: 'Locatie',
      day: 'Voorkeursdag',
      name: 'Naam',
      shop: 'Barbershop (Heulweg 1)',
      home: 'Aan huis in',
      outro: 'Welke tijd komt je uit?',
    },
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Veelgestelde vragen',
    items: [
      { q: 'Waar zit de barbershop?', a: 'Aan de Heulweg 1 in Vinkeveen. Na het boeken stuurt Kevin je via WhatsApp nog even waar je precies moet zijn.' },
      { q: 'Kost knippen aan huis meer?', a: 'Nee. Binnen De Ronde Venen betaal je aan huis precies hetzelfde als in de barbershop.' },
      { q: 'In welke plaatsen kom je aan huis?', a: 'Overal in De Ronde Venen: Vinkeveen, Mijdrecht, Wilnis, Abcoude, Baambrugge, De Hoef, Waverveen en Amstelhoek. Twijfel je? Stuur even een berichtje.' },
      { q: 'Op welke dagen kan ik terecht?', a: 'Op maandag, donderdag en zondag. Kevin heeft naast het knippen een vaste baan, daarom werkt hij alleen op afspraak.' },
      { q: 'Hoe kan ik betalen?', a: 'Contant of via een Tikkie. Pinnen is (nog) niet mogelijk.' },
      { q: 'Ik kan toch niet, wat nu?', a: 'Laat het zo snel mogelijk weten via WhatsApp, dan kan iemand anders jouw plek krijgen. Samen prikken jullie een nieuwe datum.' },
    ],
  },
  contact: {
    title: 'Klaar voor een frisse coupe?',
    lead: 'Stuur een berichtje en plan je volgende knipbeurt.',
    days: 'Ma · Do · Zo, op afspraak',
    address: 'Adres',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    hours: 'Openingstijden',
    rights: 'Alle rechten voorbehouden.',
  },
  days: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  daysShort: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  months: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
}

export type Dict = typeof nl

const en: Dict = {
  nav: {
    services: 'Prices',
    locations: 'Locations',
    about: 'About Kevin',
    work: 'Work',
    reviews: 'Reviews',
    faq: 'FAQ',
    book: 'Book now',
    menu: 'Menu',
    close: 'Close',
    switchTo: 'Wissel naar Nederlands',
  },
  hero: {
    eyebrow: 'Barber in Vinkeveen · De Ronde Venen',
    titleA: 'Sharp fades.',
    titleB: 'Groomed beards.',
    titleC: 'In the shop or at your home.',
    lead: 'Kevin Everix has been cutting hair for 6 years. In his own barbershop on the Heulweg, or at your home anywhere in De Ronde Venen.',
    ctaBook: 'Book via WhatsApp',
    ctaPrices: 'See prices',
    stats: [
      { value: '6', label: 'years experience' },
      { value: '€20', label: 'per haircut' },
      { value: '€0', label: 'extra for home visits' },
    ],
  },
  locations: {
    eyebrow: 'Two ways',
    title: 'You choose where you get your cut',
    shop: {
      tag: 'The barbershop',
      title: 'Heulweg 1, Vinkeveen',
      body: 'A small, private barbershop with full attention for you. No busy queue, just in the chair at your booked time.',
      cta: 'Get directions',
    },
    home: {
      tag: 'Home visit',
      title: 'Anywhere in De Ronde Venen',
      body: 'No time to go out? Kevin brings his complete setup to you. Same quality, same price, no travel fee.',
      areaLabel: 'Service area',
    },
  },
  services: {
    eyebrow: 'Prices',
    title: 'Honest prices, no fuss',
    lead: 'In the barbershop or at home, you pay the same.',
    items: {
      cut: {
        name: 'Haircut',
        desc: 'Fade, taper, classic cut or scissor work. Tailored to your hair and style.',
      },
      cutBeard: {
        name: 'Haircut + beard',
        desc: 'Your haircut plus a sharply trimmed and lined-up beard.',
      },
    },
    specialties: 'Specialties',
    specialtyList: ['Skin & low fades', 'Tapers', 'Beard shape-up', 'Classic cuts', 'Scissor work'],
    paymentTitle: 'Payment',
    payment: 'Cash or Tikkie',
    daysTitle: 'Available',
    book: 'Book this',
  },
  about: {
    eyebrow: 'About Kevin',
    title: 'From the salon to his own shed',
    body: [
      'Kevin Everix has been behind the chair for six years. In that time he worked in several barbershops and hair salons, mastering both sharp barber work and finer scissor work.',
      'Now he is building something of his own. He turned his shed on the Heulweg in Vinkeveen into a small barbershop, and if you would rather stay home, he simply comes to you.',
      'Next to his regular job he cuts on Mondays, Thursdays and Sundays. That means few clients per day and plenty of time for you.',
    ],
    signature: 'Kevin Everix',
    role: 'Owner & barber',
    photoNote: 'Photo coming soon',
  },
  gallery: {
    eyebrow: 'Work',
    title: 'Recently in the chair',
    lead: 'More work on Instagram.',
    items: ['Skin fade', 'Beard shape-up', 'Classic side part', 'Textured crop', 'Low taper', 'Fade + beard'],
    placeholder: 'Photo coming soon',
    follow: 'Follow on Instagram',
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'What clients say',
    placeholder: 'Example',
    items: [
      { quote: 'Sharpest fade I have had in ages. Kevin really takes his time and thinks along.', name: 'Example name', place: 'Vinkeveen' },
      { quote: 'So convenient that he comes to your home. My son and I both got a cut in one go.', name: 'Example name', place: 'Mijdrecht' },
      { quote: 'Never had my beard this clean. Great atmosphere in the shop too.', name: 'Example name', place: 'Wilnis' },
    ],
  },
  booking: {
    eyebrow: 'Book an appointment',
    title: 'Book in 3 taps via WhatsApp',
    lead: 'Pick what, where and when. Your message is ready in WhatsApp right away; Kevin confirms your time.',
    service: 'What would you like?',
    location: 'Where?',
    locShop: 'Barbershop',
    locShopSub: 'Heulweg 1',
    locHome: 'Home visit',
    locHomeSub: 'De Ronde Venen',
    town: 'Town',
    day: 'Which day?',
    name: 'Your name',
    optional: 'optional',
    namePlaceholder: 'E.g. Daan',
    send: 'Open WhatsApp',
    note: 'Nothing is sent until you press send in WhatsApp.',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    calendarHint: 'Kevin cuts on Mondays, Thursdays and Sundays.',
    summary: 'Summary',
    msg: {
      hi: 'Hi Kevin! I would like to book an appointment.',
      service: 'Service',
      location: 'Location',
      day: 'Preferred day',
      name: 'Name',
      shop: 'Barbershop (Heulweg 1)',
      home: 'Home visit in',
      outro: 'What time works for you?',
    },
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    items: [
      { q: 'Where is the barbershop?', a: 'At Heulweg 1 in Vinkeveen. After booking, Kevin will tell you via WhatsApp exactly where to go.' },
      { q: 'Does a home visit cost extra?', a: 'No. Within De Ronde Venen a home visit costs exactly the same as a cut in the barbershop.' },
      { q: 'Which towns do you visit?', a: 'All of De Ronde Venen: Vinkeveen, Mijdrecht, Wilnis, Abcoude, Baambrugge, De Hoef, Waverveen and Amstelhoek. Not sure? Just send a message.' },
      { q: 'On which days can I book?', a: 'Mondays, Thursdays and Sundays. Kevin has a regular job next to barbering, so it is by appointment only.' },
      { q: 'How can I pay?', a: 'Cash or via Tikkie. Card payments are not available (yet).' },
      { q: 'I can’t make it after all, now what?', a: 'Let Kevin know via WhatsApp as soon as possible so someone else can take your spot, and pick a new date together.' },
    ],
  },
  contact: {
    title: 'Ready for a fresh cut?',
    lead: 'Send a message and plan your next haircut.',
    days: 'Mon · Thu · Sun, by appointment',
    address: 'Address',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    hours: 'Opening hours',
    rights: 'All rights reserved.',
  },
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

export type Lang = 'nl' | 'en'
const dicts: Record<Lang, Dict> = { nl, en }
const STORAGE_KEY = 'everix-lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'nl' || saved === 'en') return saved
  } catch {
    // storage unavailable: fall back to Dutch
  }
  return 'nl'
}

const LangContext = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void } | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang])

  return <LangContext.Provider value={{ lang, t: dicts[lang], setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
