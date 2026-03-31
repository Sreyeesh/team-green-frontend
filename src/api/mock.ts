import type { Shop, Barber, Service, Slot, Booking } from '../types'

export const mockShops: Shop[] = [
  {
    id: 'shop-1',
    slug: 'the-gentlemans-cut',
    name: "The Gentleman's Cut",
    description: 'Classic barbershop experience with a modern twist. Premium grooming since 2018.',
    logo_url: 'https://placehold.co/200x200/1A1A1A/C8A55A?text=GC',
    address: '123 Main Street, Downtown, NY 10001',
    phone: '(212) 555-0147',
    hours: {
      mon: { open: '09:00', close: '19:00' },
      tue: { open: '09:00', close: '19:00' },
      wed: { open: '09:00', close: '19:00' },
      thu: { open: '09:00', close: '20:00' },
      fri: { open: '09:00', close: '20:00' },
      sat: { open: '08:00', close: '18:00' },
      sun: { open: '10:00', close: '16:00' },
    },
  },
  {
    id: 'shop-2',
    slug: 'urban-edge',
    name: 'Urban Edge Barbershop',
    description: 'Where street style meets precision cuts. Bold looks, sharp fades.',
    logo_url: 'https://placehold.co/200x200/1A1A1A/C8A55A?text=UE',
    address: '456 Broadway, SoHo, NY 10012',
    phone: '(212) 555-0298',
    hours: {
      mon: { open: '10:00', close: '20:00' },
      tue: { open: '10:00', close: '20:00' },
      wed: { open: '10:00', close: '20:00' },
      thu: { open: '10:00', close: '21:00' },
      fri: { open: '10:00', close: '21:00' },
      sat: { open: '09:00', close: '19:00' },
      sun: { open: '11:00', close: '17:00' },
    },
  },
]

export const mockBarbers: Record<string, Barber[]> = {
  'shop-1': [
    { id: 'barber-1', name: 'James Morrison', photo_url: 'https://placehold.co/300x300/242424/C8A55A?text=JM', bio: '15 years of experience. Master of classic cuts and hot towel shaves.', specialties: ['Classic Cuts', 'Hot Towel Shave', 'Beard Sculpting'] },
    { id: 'barber-2', name: 'Marcus Chen', photo_url: 'https://placehold.co/300x300/242424/C8A55A?text=MC', bio: 'Precision fade specialist. Known for clean lines and attention to detail.', specialties: ['Fades', 'Line-ups', 'Modern Styles'] },
    { id: 'barber-3', name: 'Anthony Russo', photo_url: 'https://placehold.co/300x300/242424/C8A55A?text=AR', bio: 'Old-school techniques with new-school flair. Every cut tells a story.', specialties: ['Scissor Cuts', 'Beard Trims', 'Classic Styles'] },
  ],
  'shop-2': [
    { id: 'barber-4', name: 'Devon Williams', photo_url: 'https://placehold.co/300x300/242424/C8A55A?text=DW', bio: 'Creative cuts and bold designs. Pushing boundaries one client at a time.', specialties: ['Creative Designs', 'Skin Fades', 'Color'] },
    { id: 'barber-5', name: 'Kai Nakamura', photo_url: 'https://placehold.co/300x300/242424/C8A55A?text=KN', bio: 'Texture expert. Specializing in all hair types and modern techniques.', specialties: ['Textured Cuts', 'Asian Hair', 'Perms'] },
    { id: 'barber-6', name: 'Rico Santos', photo_url: 'https://placehold.co/300x300/242424/C8A55A?text=RS', bio: 'Sharp fades, clean beards. Your look, elevated.', specialties: ['Fades', 'Beard Grooming', 'Kids Cuts'] },
    { id: 'barber-7', name: 'Elijah Brooks', photo_url: 'https://placehold.co/300x300/242424/C8A55A?text=EB', bio: 'From classic to contemporary. Versatile styles for the modern man.', specialties: ['Versatile Styles', 'Razor Work', 'Styling'] },
  ],
}

export const mockServices: Record<string, Service[]> = {
  'shop-1': [
    { id: 'svc-1', name: 'Classic Haircut', description: 'Traditional cut with clippers and scissors, finished with styling.', duration_minutes: 30, price: 3500, category: 'Cuts' },
    { id: 'svc-2', name: 'Buzz Cut', description: 'Clean all-over clipper cut at your preferred length.', duration_minutes: 20, price: 2000, category: 'Cuts' },
    { id: 'svc-3', name: 'Fade', description: 'Precision fade — low, mid, or high. Blended to perfection.', duration_minutes: 35, price: 4000, category: 'Cuts' },
    { id: 'svc-4', name: 'Beard Trim', description: 'Shape and trim your beard with precision detailing.', duration_minutes: 20, price: 2000, category: 'Beard' },
    { id: 'svc-5', name: 'Hot Towel Shave', description: 'Luxurious straight razor shave with hot towel treatment.', duration_minutes: 30, price: 3500, category: 'Beard' },
    { id: 'svc-6', name: 'Haircut + Beard Combo', description: 'Full haircut plus beard trim and shaping.', duration_minutes: 50, price: 5000, category: 'Combos' },
  ],
  'shop-2': [
    { id: 'svc-7', name: 'Skin Fade', description: 'Zero-guard fade blended seamlessly into length on top.', duration_minutes: 40, price: 4500, category: 'Cuts' },
    { id: 'svc-8', name: 'Textured Crop', description: 'Modern textured top with clean sides.', duration_minutes: 35, price: 4000, category: 'Cuts' },
    { id: 'svc-9', name: 'Design Cut', description: 'Custom design shaved into your cut. Bring your vision.', duration_minutes: 50, price: 5500, category: 'Cuts' },
    { id: 'svc-10', name: 'Beard Sculpt', description: 'Detailed beard shaping with razor-clean edges.', duration_minutes: 25, price: 2500, category: 'Beard' },
    { id: 'svc-11', name: 'The Full Treatment', description: 'Haircut, beard sculpt, hot towel, and styling.', duration_minutes: 60, price: 6500, category: 'Combos' },
    { id: 'svc-12', name: 'Kids Cut (Under 12)', description: 'Haircut for kids. Patient and fun.', duration_minutes: 25, price: 2200, category: 'Cuts' },
  ],
}

function generateSlots(shopId: string): Slot[] {
  const barbers = mockBarbers[shopId] || []
  const slots: Slot[] = []
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = new Date()
    date.setDate(date.getDate() + dayOffset)
    for (const barber of barbers) {
      for (let hour = 9; hour < 18; hour++) {
        for (const minutes of [0, 30]) {
          const dt = new Date(date)
          dt.setHours(hour, minutes, 0, 0)
          slots.push({ datetime: dt.toISOString(), barber_id: barber.id, available: Math.random() > 0.3 })
        }
      }
    }
  }
  return slots
}

export const mockSlots: Record<string, Slot[]> = {
  'shop-1': generateSlots('shop-1'),
  'shop-2': generateSlots('shop-2'),
}

export const mockBookings: Booking[] = []

let bookingCounter = 0

export function addMockBooking(booking: Omit<Booking, 'id' | 'status'>): Booking {
  bookingCounter++
  const newBooking: Booking = { ...booking, id: `booking-${bookingCounter}`, status: 'pending' }
  mockBookings.push(newBooking)
  return newBooking
}
