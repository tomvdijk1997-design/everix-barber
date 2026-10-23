// Business facts in one place. Replace the PLACEHOLDER values before going live.

export const business = {
  name: 'Everix',
  barber: 'Kevin Everix',
  // PLACEHOLDER: international format without "+" or leading zero, e.g. 31612345678
  whatsapp: '31600000000',
  // PLACEHOLDER: Instagram handle without "@"
  instagram: 'everix.barber',
  address: {
    street: 'Heulweg 1',
    postcode: '',
    city: 'Vinkeveen',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Heulweg+1+Vinkeveen',
  yearsExperience: 6,
  // 0 = Sunday … 6 = Saturday
  bookingDays: [1, 4, 0],
  serviceArea: ['Vinkeveen', 'Mijdrecht', 'Wilnis', 'Abcoude', 'Baambrugge', 'De Hoef', 'Waverveen', 'Amstelhoek'],
} as const

export type ServiceId = 'cut' | 'cutBeard'

export const services: { id: ServiceId; price: number }[] = [
  { id: 'cut', price: 20 },
  { id: 'cutBeard', price: 25 },
]

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
