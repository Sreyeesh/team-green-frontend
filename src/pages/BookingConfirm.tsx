import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Booking } from '../types'
import { getBooking } from '../api/bookings'
import { formatDate, formatTime } from '../lib/utils'

export default function BookingConfirm() {
  const { slug, id } = useParams<{ slug: string; id: string }>()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getBooking(id).then(setBooking).finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-gold animate-pulse font-heading text-2xl">Loading...</div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="max-w-md mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-heading text-text-primary">Booking not found</h1>
        <Link to={`/shop/${slug}`} className="text-gold hover:text-gold-hover text-sm mt-4 inline-block">Back to shop</Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      {/* Success checkmark */}
      <div className="w-20 h-20 rounded-full border-2 border-success mx-auto flex items-center justify-center mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-success">
          <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="text-3xl font-heading text-text-primary">Booking Confirmed!</h1>
      <p className="text-text-secondary mt-2">Your appointment has been booked successfully.</p>

      <div className="bg-bg-surface border border-border-subtle p-6 mt-8 text-left">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Booking ID</span>
            <span className="text-gold font-mono">{booking.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Date & Time</span>
            <span className="text-text-primary">{formatDate(booking.datetime)} at {formatTime(booking.datetime)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Name</span>
            <span className="text-text-primary">{booking.customer_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Email</span>
            <span className="text-text-primary">{booking.customer_email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Status</span>
            <span className="text-gold capitalize">{booking.status}</span>
          </div>
        </div>
      </div>

      <p className="text-text-secondary text-sm mt-6">
        A confirmation will be sent to <span className="text-text-primary">{booking.customer_email}</span>
      </p>

      <Link to={`/shop/${slug}`} className="inline-block mt-8 bg-gold hover:bg-gold-hover text-bg-primary px-6 py-3 text-sm font-semibold transition-colors hover:shadow-[0_0_20px_rgba(200,165,90,0.3)]">
        Book Another Appointment
      </Link>
    </div>
  )
}
