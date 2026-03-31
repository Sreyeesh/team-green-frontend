import { useState, useEffect } from 'react'
import type { Slot } from '../../types'
import { getAvailability } from '../../api/shops'
import { cn, formatTime } from '../../lib/utils'

interface TimeSlotPickerProps {
  shopSlug: string
  serviceId: string
  barberId?: string
  selectedSlot: Slot | null
  onSelectSlot: (slot: Slot) => void
}

function getNext7Days(): { date: string; label: string; dayLabel: string }[] {
  const days: { date: string; label: string; dayLabel: string }[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const iso = d.toISOString().split('T')[0]
    const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' })
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    days.push({ date: iso, label, dayLabel })
  }
  return days
}

export default function TimeSlotPicker({ shopSlug, serviceId, barberId, selectedSlot, onSelectSlot }: TimeSlotPickerProps) {
  const days = getNext7Days()
  const [selectedDate, setSelectedDate] = useState(days[0].date)
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getAvailability(shopSlug, {
      service_id: serviceId,
      date: selectedDate,
      barber_id: barberId,
    })
      .then((data) => {
        if (!cancelled) setSlots(data.filter((s) => s.available))
      })
      .catch(() => {
        if (!cancelled) setSlots([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [shopSlug, serviceId, barberId, selectedDate])

  return (
    <div>
      {/* Date selector */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {days.map((d) => (
          <button
            key={d.date}
            onClick={() => setSelectedDate(d.date)}
            className={cn(
              'flex flex-col items-center px-4 py-3 border text-sm shrink-0 transition-all duration-200',
              selectedDate === d.date
                ? 'border-gold text-gold bg-gold/5'
                : 'border-border-subtle text-text-secondary hover:border-gold-muted'
            )}
          >
            <span className="text-xs font-body">{d.dayLabel}</span>
            <span className="font-heading text-base mt-0.5">{d.label}</span>
          </button>
        ))}
      </div>

      {/* Time slots */}
      {loading ? (
        <div className="text-center py-12 text-text-secondary text-sm">Loading available times...</div>
      ) : slots.length === 0 ? (
        <div className="text-center py-12 text-text-secondary text-sm">
          No available slots for this date. Try another day.
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {slots.map((slot) => {
            const isSelected = selectedSlot?.datetime === slot.datetime && selectedSlot?.barber_id === slot.barber_id
            return (
              <button
                key={`${slot.datetime}-${slot.barber_id}`}
                onClick={() => onSelectSlot(slot)}
                className={cn(
                  'px-3 py-2.5 border text-sm transition-all duration-200',
                  isSelected
                    ? 'bg-gold text-bg-primary border-gold'
                    : 'border-border-subtle text-text-secondary hover:border-gold-muted hover:text-text-primary'
                )}
              >
                {formatTime(slot.datetime)}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
