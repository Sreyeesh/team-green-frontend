import type { Barber, Service, Slot } from '../../types'
import { formatPrice, formatDate, formatTime } from '../../lib/utils'

interface BookingSummaryProps {
  barber: Barber | null
  service: Service | null
  slot: Slot | null
  customerDetails: { name: string; email: string; phone: string } | null
}

function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-muted" />
      <svg width="14" height="14" viewBox="0 0 20 20" className="text-gold-muted">
        <path
          d="M10 0 L12.5 7.5 L20 10 L12.5 12.5 L10 20 L7.5 12.5 L0 10 L7.5 7.5 Z"
          fill="currentColor"
        />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-muted" />
    </div>
  )
}

export default function BookingSummary({ barber, service, slot, customerDetails }: BookingSummaryProps) {
  const hasAny = barber || service || slot

  if (!hasAny) return null

  return (
    <div className="bg-bg-surface border border-border-subtle p-6">
      <h3 className="font-heading text-lg text-gold text-center mb-4">Booking Summary</h3>
      <OrnamentDivider className="mb-5" />

      <div className="space-y-4 text-sm">
        {barber && (
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Barber</p>
            <p className="text-text-primary">{barber.name}</p>
          </div>
        )}

        {service && (
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Service</p>
            <p className="text-text-primary">{service.name}</p>
            <p className="text-gold-muted text-xs mt-0.5">
              {service.duration_minutes} min &middot; {formatPrice(service.price)}
            </p>
          </div>
        )}

        {slot && (
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Date & Time</p>
            <p className="text-text-primary">{formatDate(slot.datetime)}</p>
            <p className="text-gold-muted text-xs mt-0.5">{formatTime(slot.datetime)}</p>
          </div>
        )}

        {customerDetails && (
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Contact</p>
            <p className="text-text-primary">{customerDetails.name}</p>
            <p className="text-gold-muted text-xs mt-0.5">{customerDetails.email}</p>
            <p className="text-gold-muted text-xs">{customerDetails.phone}</p>
          </div>
        )}

        {service && (
          <>
            <OrnamentDivider className="my-4" />
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-xs uppercase tracking-wider">Total</span>
              <span className="font-heading text-xl text-gold">{formatPrice(service.price)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
