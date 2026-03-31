import type { Booking, CreateBookingRequest } from '../types'
import { USE_MOCK, apiGet, apiPost, mockDelay } from './client'
import { mockBookings, addMockBooking, mockShops } from './mock'

export async function createBooking(data: CreateBookingRequest): Promise<Booking> {
  if (USE_MOCK) {
    await mockDelay()
    const shop = mockShops.find(s => s.slug === data.shop_slug)
    if (!shop) throw new Error('Shop not found')
    return addMockBooking({
      shop_id: shop.id,
      barber_id: data.barber_id,
      service_id: data.service_id,
      datetime: data.datetime,
      duration_minutes: 30,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
    })
  }
  return apiPost<Booking>('/api/bookings', data)
}

export async function getBooking(id: string): Promise<Booking> {
  if (USE_MOCK) {
    await mockDelay()
    const booking = mockBookings.find(b => b.id === id)
    if (!booking) throw new Error('Booking not found')
    return booking
  }
  return apiGet<Booking>(`/api/bookings/${id}`)
}
