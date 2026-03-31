import type { Service } from '../../types'
import { cn, formatPrice } from '../../lib/utils'

interface ServiceCardProps {
  service: Service
  selected: boolean
  onSelect: () => void
}

export default function ServiceCard({ service, selected, onSelect }: ServiceCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'bg-bg-surface border p-6 text-left transition-all duration-300 w-full',
        selected
          ? 'border-gold shadow-[0_0_12px_rgba(200,165,90,0.15)]'
          : 'border-border-subtle hover:border-gold-muted'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg text-text-primary mb-1">{service.name}</h3>
          <p className="text-text-secondary text-sm mb-2 line-clamp-2">{service.description}</p>
          <p className="text-text-secondary text-xs">{service.duration_minutes} min</p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-heading text-xl text-gold">{formatPrice(service.price)}</span>
        </div>
      </div>
    </button>
  )
}
