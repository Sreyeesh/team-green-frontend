import { create } from 'zustand'
import type { Barber, Service, Slot } from '../types'

interface BookingState {
  shopSlug: string | null
  selectedBarber: Barber | null
  selectedService: Service | null
  selectedSlot: Slot | null
  customerDetails: { name: string; email: string; phone: string } | null
  currentStep: number
  setShop: (slug: string) => void
  setBarber: (barber: Barber | null) => void
  setService: (service: Service) => void
  setSlot: (slot: Slot) => void
  setCustomerDetails: (details: { name: string; email: string; phone: string }) => void
  setStep: (step: number) => void
  reset: () => void
}

const initialState = {
  shopSlug: null,
  selectedBarber: null,
  selectedService: null,
  selectedSlot: null,
  customerDetails: null,
  currentStep: 1,
}

export const useBookingStore = create<BookingState>()((set) => ({
  ...initialState,
  setShop: (slug) => set({ shopSlug: slug }),
  setBarber: (barber) => set({ selectedBarber: barber }),
  setService: (service) => set({ selectedService: service }),
  setSlot: (slot) => set({ selectedSlot: slot }),
  setCustomerDetails: (details) => set({ customerDetails: details }),
  setStep: (step) => set({ currentStep: step }),
  reset: () => set(initialState),
}))
