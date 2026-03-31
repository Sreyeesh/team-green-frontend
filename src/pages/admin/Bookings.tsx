import { useState, useEffect } from 'react'
import { getAdminBookings, updateAdminBooking } from '../../api/admin'
import type { Booking } from '../../types'
import { formatDate, formatTime } from '../../lib/utils'

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    getAdminBookings().then(setBookings)
  }, [])

  const filtered = dateFilter
    ? bookings.filter((b) => b.datetime.startsWith(dateFilter))
    : bookings

  const handleStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    const updated = await updateAdminBooking(id, status)
    setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)))
  }

  const statusClass = (status: string) => {
    if (status === 'confirmed') return 'text-success border border-success'
    if (status === 'cancelled') return 'text-error border border-error'
    return 'text-gold border border-gold'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading text-text-primary">Bookings</h1>
      </div>

      <div className="mb-6">
        <label className="block text-text-secondary text-sm mb-1">Filter by date</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-bg-surface border border-border-subtle px-4 py-2 text-text-primary text-sm focus:border-gold focus:outline-none transition-colors"
        />
        {dateFilter && (
          <button onClick={() => setDateFilter('')} className="text-gold text-sm ml-3 hover:text-gold-hover transition-colors">
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-text-secondary text-sm">No bookings found.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <div key={b.id} className="bg-bg-surface border border-border-subtle p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-text-primary font-semibold">{b.customer_name}</span>
                  <span className={`text-xs px-2 py-0.5 ${statusClass(b.status)}`}>{b.status}</span>
                </div>
                <p className="text-text-secondary text-sm mt-1">{b.customer_email}</p>
                <div className="flex gap-4 mt-1">
                  <span className="text-text-secondary text-sm">{formatDate(b.datetime)}</span>
                  <span className="text-text-secondary text-sm">{formatTime(b.datetime)}</span>
                  <span className="text-text-secondary text-sm">{b.duration_minutes} min</span>
                </div>
              </div>
              {b.status === 'pending' && (
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleStatus(b.id, 'confirmed')} className="text-success border border-success px-3 py-1 text-xs hover:bg-success/10 transition-colors">
                    Confirm
                  </button>
                  <button onClick={() => handleStatus(b.id, 'cancelled')} className="text-error border border-error px-3 py-1 text-xs hover:bg-error/10 transition-colors">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
