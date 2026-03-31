import type { Shop, Barber, Service, Slot } from '../types'
import { USE_MOCK, apiGet, mockDelay } from './client'
import { mockShops, mockBarbers, mockServices, mockSlots } from './mock'

export async function getShop(slug: string): Promise<Shop> {
  if (USE_MOCK) {
    await mockDelay()
    const shop = mockShops.find(s => s.slug === slug)
    if (!shop) throw new Error('Shop not found')
    return shop
  }
  return apiGet<Shop>(`/api/shops/${slug}`)
}

export async function getBarbers(slug: string): Promise<Barber[]> {
  if (USE_MOCK) {
    await mockDelay()
    const shop = mockShops.find(s => s.slug === slug)
    if (!shop) throw new Error('Shop not found')
    return mockBarbers[shop.id] || []
  }
  return apiGet<Barber[]>(`/api/shops/${slug}/barbers`)
}

export async function getServices(slug: string): Promise<Service[]> {
  if (USE_MOCK) {
    await mockDelay()
    const shop = mockShops.find(s => s.slug === slug)
    if (!shop) throw new Error('Shop not found')
    return mockServices[shop.id] || []
  }
  return apiGet<Service[]>(`/api/shops/${slug}/services`)
}

export async function getAvailability(
  slug: string,
  params: { service_id: string; date: string; barber_id?: string }
): Promise<Slot[]> {
  if (USE_MOCK) {
    await mockDelay()
    const shop = mockShops.find(s => s.slug === slug)
    if (!shop) throw new Error('Shop not found')
    const allSlots = mockSlots[shop.id] || []
    return allSlots.filter(slot => {
      const slotDate = slot.datetime.split('T')[0]
      const matchesDate = slotDate === params.date
      const matchesBarber = params.barber_id ? slot.barber_id === params.barber_id : true
      return matchesDate && matchesBarber
    })
  }
  return apiGet<Slot[]>(`/api/shops/${slug}/availability`, {
    service_id: params.service_id,
    date: params.date,
    ...(params.barber_id ? { barber_id: params.barber_id } : {}),
  })
}
