import { describe, it, expect, beforeEach } from 'vitest'
import { useBookingStore } from '../../src/store/bookingStore'

describe('bookingStore', () => {
  beforeEach(() => { useBookingStore.getState().reset() })

  it('starts with default state', () => {
    const state = useBookingStore.getState()
    expect(state.currentStep).toBe(1)
    expect(state.selectedBarber).toBeNull()
    expect(state.selectedService).toBeNull()
    expect(state.selectedSlot).toBeNull()
    expect(state.customerDetails).toBeNull()
  })

  it('sets barber', () => {
    const barber = { id: 'b1', name: 'Test', photo_url: '', bio: '', specialties: [] }
    useBookingStore.getState().setBarber(barber)
    expect(useBookingStore.getState().selectedBarber).toEqual(barber)
  })

  it('sets service', () => {
    const service = { id: 's1', name: 'Cut', description: '', duration_minutes: 30, price: 2500, category: 'Cuts' }
    useBookingStore.getState().setService(service)
    expect(useBookingStore.getState().selectedService).toEqual(service)
  })

  it('sets step', () => {
    useBookingStore.getState().setStep(3)
    expect(useBookingStore.getState().currentStep).toBe(3)
  })

  it('reset clears all state', () => {
    useBookingStore.getState().setStep(4)
    useBookingStore.getState().setBarber({ id: 'b1', name: 'Test', photo_url: '', bio: '', specialties: [] })
    useBookingStore.getState().reset()
    expect(useBookingStore.getState().currentStep).toBe(1)
    expect(useBookingStore.getState().selectedBarber).toBeNull()
  })
})
