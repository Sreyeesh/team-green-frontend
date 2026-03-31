import { describe, it, expect } from 'vitest'
import { getShop, getBarbers, getServices, getAvailability } from '../../src/api/shops'

describe('Shop API (mock mode)', () => {
  it('getShop returns shop by slug', async () => {
    const shop = await getShop('the-gentlemans-cut')
    expect(shop).toBeDefined()
    expect(shop.slug).toBe('the-gentlemans-cut')
    expect(shop.name).toBe("The Gentleman's Cut")
    expect(shop.hours).toBeDefined()
  })

  it('getBarbers returns barbers for a shop', async () => {
    const barbers = await getBarbers('the-gentlemans-cut')
    expect(barbers.length).toBeGreaterThan(0)
    expect(barbers[0].name).toBeDefined()
    expect(barbers[0].specialties).toBeInstanceOf(Array)
  })

  it('getServices returns services for a shop', async () => {
    const services = await getServices('the-gentlemans-cut')
    expect(services.length).toBeGreaterThan(0)
    expect(services[0].price).toBeGreaterThan(0)
    expect(services[0].duration_minutes).toBeGreaterThan(0)
    expect(services[0].category).toBeDefined()
  })

  it('getAvailability returns slots for a date', async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().split('T')[0]

    const slots = await getAvailability('the-gentlemans-cut', {
      service_id: 'svc-1',
      date: dateStr,
    })
    expect(slots.length).toBeGreaterThan(0)
    expect(slots[0].datetime).toBeDefined()
    expect(typeof slots[0].available).toBe('boolean')
  })
})
