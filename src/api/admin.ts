import type { Shop, Barber, Service, Booking, RegisterRequest, LoginResponse } from '../types'
import { USE_MOCK, apiGet, apiPost, apiPut, apiDelete, mockDelay } from './client'
import { mockShops, mockBarbers, mockServices, mockBookings } from './mock'

export async function register(data: RegisterRequest): Promise<LoginResponse> {
  if (USE_MOCK) { await mockDelay(); return { token: 'mock-jwt-token', shop: mockShops[0] } }
  return apiPost<LoginResponse>('/api/auth/register/', data)
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  if (USE_MOCK) { await mockDelay(); return { token: 'mock-jwt-token', shop: mockShops[0] } }
  return apiPost<LoginResponse>('/api/auth/login/', { email, password })
}

export async function getAdminShop(): Promise<Shop> {
  if (USE_MOCK) { await mockDelay(); return mockShops[0] }
  return apiGet<Shop>('/api/admin/shop/')
}

export async function updateAdminShop(data: Partial<Shop>): Promise<Shop> {
  if (USE_MOCK) { await mockDelay(); return { ...mockShops[0], ...data } }
  return apiPut<Shop>('/api/admin/shop/', data)
}

export async function getAdminBarbers(): Promise<Barber[]> {
  if (USE_MOCK) { await mockDelay(); return mockBarbers['shop-1'] || [] }
  return apiGet<Barber[]>('/api/admin/barbers/')
}

export async function createAdminBarber(data: Omit<Barber, 'id'>): Promise<Barber> {
  if (USE_MOCK) { await mockDelay(); return { ...data, id: `barber-${Date.now()}` } }
  return apiPost<Barber>('/api/admin/barbers/', data)
}

export async function updateAdminBarber(id: string, data: Partial<Barber>): Promise<Barber> {
  if (USE_MOCK) { await mockDelay(); const b = (mockBarbers['shop-1'] || []).find(b => b.id === id); if (!b) throw new Error('Not found'); return { ...b, ...data } }
  return apiPut<Barber>(`/api/admin/barbers/${id}/`, data)
}

export async function deleteAdminBarber(id: string): Promise<void> {
  if (USE_MOCK) { await mockDelay(); return }
  return apiDelete(`/api/admin/barbers/${id}/`)
}

export async function getAdminServices(): Promise<Service[]> {
  if (USE_MOCK) { await mockDelay(); return mockServices['shop-1'] || [] }
  return apiGet<Service[]>('/api/admin/services/')
}

export async function createAdminService(data: Omit<Service, 'id'>): Promise<Service> {
  if (USE_MOCK) { await mockDelay(); return { ...data, id: `svc-${Date.now()}` } }
  return apiPost<Service>('/api/admin/services/', data)
}

export async function updateAdminService(id: string, data: Partial<Service>): Promise<Service> {
  if (USE_MOCK) { await mockDelay(); const s = (mockServices['shop-1'] || []).find(s => s.id === id); if (!s) throw new Error('Not found'); return { ...s, ...data } }
  return apiPut<Service>(`/api/admin/services/${id}/`, data)
}

export async function deleteAdminService(id: string): Promise<void> {
  if (USE_MOCK) { await mockDelay(); return }
  return apiDelete(`/api/admin/services/${id}/`)
}

export async function getAdminBookings(params?: { date?: string; status?: string }): Promise<Booking[]> {
  if (USE_MOCK) {
    await mockDelay()
    let bookings = [...mockBookings]
    if (params?.date) bookings = bookings.filter(b => b.datetime.startsWith(params.date!))
    if (params?.status) bookings = bookings.filter(b => b.status === params.status)
    return bookings
  }
  const qp: Record<string, string> = {}
  if (params?.date) qp.date = params.date
  if (params?.status) qp.status = params.status
  return apiGet<Booking[]>('/api/admin/bookings/', qp)
}

export async function updateAdminBooking(id: string, status: 'confirmed' | 'cancelled'): Promise<Booking> {
  if (USE_MOCK) { await mockDelay(); const b = mockBookings.find(b => b.id === id); if (!b) throw new Error('Not found'); b.status = status; return b }
  return apiPut<Booking>(`/api/admin/bookings/${id}/`, { status })
}
