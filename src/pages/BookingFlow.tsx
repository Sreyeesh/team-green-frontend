import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Barber, Service } from '../types'
import { getBarbers, getServices } from '../api/shops'
import { createBooking } from '../api/bookings'
import { useBookingStore } from '../store/bookingStore'
import { cn } from '../lib/utils'
import StepIndicator from '../components/booking/StepIndicator'
import BarberCard from '../components/booking/BarberCard'
import ServiceCard from '../components/booking/ServiceCard'
import TimeSlotPicker from '../components/booking/TimeSlotPicker'
import CustomerForm from '../components/booking/CustomerForm'
import BookingSummary from '../components/booking/BookingSummary'

const STEPS = ['Barber', 'Service', 'Time', 'Details', 'Confirm']

function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-muted" />
      <svg width="20" height="20" viewBox="0 0 20 20" className="text-gold-muted">
        <path
          d="M10 0 L12.5 7.5 L20 10 L12.5 12.5 L10 20 L7.5 12.5 L0 10 L7.5 7.5 Z"
          fill="currentColor"
        />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-muted" />
    </div>
  )
}

export default function BookingFlow() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const store = useBookingStore()
  const {
    currentStep, selectedBarber, selectedService, selectedSlot, customerDetails,
    setShop, setBarber, setService, setSlot, setCustomerDetails, setStep, reset,
  } = store

  const [barbers, setBarbers] = useState<Barber[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize shop and load data
  useEffect(() => {
    if (!slug) return
    setShop(slug)
    reset()

    Promise.all([getBarbers(slug), getServices(slug)])
      .then(([b, s]) => {
        setBarbers(b)
        setServices(s)
      })
      .catch(() => setError('Failed to load shop data.'))
      .finally(() => setLoading(false))
  }, [slug, setShop, reset])

  function goNext() {
    setStep(currentStep + 1)
  }

  function goBack() {
    if (currentStep > 1) setStep(currentStep - 1)
  }

  async function handleConfirm() {
    if (!slug || !selectedService || !selectedSlot || !customerDetails) return
    setSubmitting(true)
    setError(null)
    try {
      const booking = await createBooking({
        shop_slug: slug,
        barber_id: selectedSlot.barber_id,
        service_id: selectedService.id,
        datetime: selectedSlot.datetime,
        customer_name: customerDetails.name,
        customer_email: customerDetails.email,
        customer_phone: customerDetails.phone,
      })
      reset()
      navigate(`/shop/${slug}/booking/${booking.id}`)
    } catch {
      setError('Failed to create booking. Please try again.')
      setSubmitting(false)
    }
  }

  // Group services by category
  const servicesByCategory = services.reduce<Record<string, Service[]>>((acc, svc) => {
    const cat = svc.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(svc)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-text-secondary text-sm">Loading...</p>
      </div>
    )
  }

  if (error && !barbers.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-error text-sm">{error}</p>
      </div>
    )
  }

  const showSidebar = currentStep >= 2

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-muted mb-3">Book Your Appointment</p>
        <h1 className="font-heading text-3xl sm:text-4xl text-text-primary">Reserve Your Chair</h1>
      </div>

      <OrnamentDivider className="mb-2" />

      <StepIndicator steps={STEPS} currentStep={currentStep} onStepClick={setStep} />

      <div className={cn('flex gap-8', showSidebar && 'lg:flex-row flex-col')}>
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Back button */}
          {currentStep > 1 && (
            <button
              onClick={goBack}
              className="text-text-secondary text-sm hover:text-gold-muted transition-colors mb-6 flex items-center gap-2"
            >
              <span>&larr;</span> Back
            </button>
          )}

          {/* Step 1: Pick Barber */}
          {currentStep === 1 && (
            <div>
              <h2 className="font-heading text-2xl text-text-primary mb-2">Choose Your Barber</h2>
              <p className="text-text-secondary text-sm mb-6">Select a barber or let us match you with someone available.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <BarberCard
                  barber={null}
                  selected={selectedBarber === null}
                  onSelect={() => { setBarber(null); goNext() }}
                  isAnyOption
                />
                {barbers.map((b) => (
                  <BarberCard
                    key={b.id}
                    barber={b}
                    selected={selectedBarber?.id === b.id}
                    onSelect={() => { setBarber(b); goNext() }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Pick Service */}
          {currentStep === 2 && (
            <div>
              <h2 className="font-heading text-2xl text-text-primary mb-2">Select a Service</h2>
              <p className="text-text-secondary text-sm mb-6">Choose the service that suits you best.</p>
              {Object.entries(servicesByCategory).map(([category, svcs]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold-muted mb-3">{category}</h3>
                  <div className="space-y-3">
                    {svcs.map((svc) => (
                      <ServiceCard
                        key={svc.id}
                        service={svc}
                        selected={selectedService?.id === svc.id}
                        onSelect={() => { setService(svc); goNext() }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Pick Time */}
          {currentStep === 3 && slug && selectedService && (
            <div>
              <h2 className="font-heading text-2xl text-text-primary mb-2">Pick a Time</h2>
              <p className="text-text-secondary text-sm mb-6">Choose a date and time that works for you.</p>
              <TimeSlotPicker
                shopSlug={slug}
                serviceId={selectedService.id}
                barberId={selectedBarber?.id}
                selectedSlot={selectedSlot}
                onSelectSlot={(slot) => { setSlot(slot); goNext() }}
              />
            </div>
          )}

          {/* Step 4: Customer Details */}
          {currentStep === 4 && (
            <div>
              <h2 className="font-heading text-2xl text-text-primary mb-2">Your Details</h2>
              <p className="text-text-secondary text-sm mb-6">Tell us how to reach you.</p>
              <div className="max-w-md">
                <CustomerForm
                  initialValues={customerDetails ?? undefined}
                  onSubmit={(details) => { setCustomerDetails(details); goNext() }}
                />
              </div>
            </div>
          )}

          {/* Step 5: Confirm */}
          {currentStep === 5 && (
            <div>
              <h2 className="font-heading text-2xl text-text-primary mb-2">Confirm Your Booking</h2>
              <p className="text-text-secondary text-sm mb-6">Review the details below and confirm.</p>

              {/* Inline summary for mobile / single-column */}
              <div className="lg:hidden mb-6">
                <BookingSummary
                  barber={selectedBarber}
                  service={selectedService}
                  slot={selectedSlot}
                  customerDetails={customerDetails}
                />
              </div>

              {error && (
                <div className="bg-bg-surface border border-error/30 px-4 py-3 mb-6">
                  <p className="text-error text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleConfirm}
                disabled={submitting}
                className={cn(
                  'w-full max-w-md py-3.5 bg-gold hover:bg-gold-hover text-bg-primary font-body font-semibold text-sm uppercase tracking-wider transition-colors duration-300 hover:shadow-[0_0_20px_rgba(200,165,90,0.3)]',
                  submitting && 'opacity-50 cursor-not-allowed'
                )}
              >
                {submitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar summary (desktop, steps 2+) */}
        {showSidebar && (
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8">
              <BookingSummary
                barber={selectedBarber}
                service={selectedService}
                slot={selectedSlot}
                customerDetails={customerDetails}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
