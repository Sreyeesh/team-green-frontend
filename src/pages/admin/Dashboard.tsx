import { useState, useEffect } from 'react'
import { useAdminStore } from '../../store/adminStore'
import { getAdminBarbers, getAdminBookings } from '../../api/admin'
import StatCard from '../../components/admin/StatCard'
import type { Booking, Barber } from '../../types'
import { formatTime } from '../../lib/utils'

export default function Dashboard() {
  const shop = useAdminStore((s) => s.shop)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])

  useEffect(() => {
    getAdminBookings().then(setBookings)
    getAdminBarbers().then(setBarbers)
  }, [])

  const today = new Date().toISOString().split('T')[0]
  const todaysBookings = bookings.filter((b) => b.datetime.startsWith(today))
  const upcomingBookings = bookings.filter((b) => b.status !== 'cancelled')

  return (
    <div>
      <h1 className="text-2xl font-heading text-text-primary mb-1">Dashboard</h1>
      {shop && <p className="text-text-secondary text-sm mb-8">{shop.name}</p>}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Today's Bookings" value={todaysBookings.length} />
        <StatCard label="Total Upcoming" value={upcomingBookings.length} />
        <StatCard label="Barbers" value={barbers.length} />
      </div>
      <h2 className="text-xl font-heading text-text-primary mb-4">Today&apos;s Schedule</h2>
      {todaysBookings.length === 0 ? (
        <p className="text-text-secondary text-sm">No bookings for today.</p>
      ) : (
        <div className="space-y-3">
          {todaysBookings.map((b) => (
            <div key={b.id} className="bg-bg-surface border border-border-subtle p-4 flex items-center justify-between">
              <div>
                <span className="text-text-primary font-semibold">{b.customer_name}</span>
                <span className="text-text-secondary text-sm ml-3">{formatTime(b.datetime)}</span>
              </div>
              <span className={`text-xs px-2 py-1 ${
                b.status === 'confirmed' ? 'text-success border border-success' :
                b.status === 'cancelled' ? 'text-error border border-error' :
                'text-gold border border-gold'
              }`}>{b.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
