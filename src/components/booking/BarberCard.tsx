import type { Barber } from '../../types'
import { cn } from '../../lib/utils'

interface BarberCardProps {
  barber: Barber | null
  selected: boolean
  onSelect: () => void
  isAnyOption?: boolean
}

export default function BarberCard({ barber, selected, onSelect, isAnyOption }: BarberCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'bg-bg-surface border p-6 text-left transition-all duration-300 flex flex-col items-center gap-4',
        selected
          ? 'border-gold shadow-[0_0_12px_rgba(200,165,90,0.15)]'
          : 'border-border-subtle hover:border-gold-muted'
      )}
    >
      {isAnyOption ? (
        <div className={cn(
          'w-20 h-20 rounded-full border-2 flex items-center justify-center transition-colors',
          selected ? 'border-gold' : 'border-border-subtle'
        )}>
          <span className="text-2xl text-text-secondary">?</span>
        </div>
      ) : barber ? (
        <div className={cn(
          'w-20 h-20 rounded-full border-2 overflow-hidden transition-colors',
          selected ? 'border-gold' : 'border-border-subtle'
        )}>
          <img
            src={barber.photo_url}
            alt={barber.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      <div className="text-center">
        <h3 className="font-heading text-lg text-text-primary mb-1">
          {isAnyOption ? 'Any Available' : barber?.name}
        </h3>
        {isAnyOption ? (
          <p className="text-text-secondary text-sm">
            We'll match you with the first available barber.
          </p>
        ) : barber ? (
          <>
            <p className="text-text-secondary text-sm mb-3 line-clamp-2">{barber.bio}</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {barber.specialties.map((s) => (
                <span
                  key={s}
                  className="text-[10px] uppercase tracking-wider text-gold-muted border border-border-subtle px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </button>
  )
}
