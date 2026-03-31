import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getShop, getBarbers, getServices } from '../api/shops'
import type { Shop, Barber, Service } from '../types'
import { formatPrice } from '../lib/utils'

/* ──────────────────────────── Data Hook ──────────────────────────── */

function useShopData(slug: string) {
  const [shop, setShop] = useState<Shop | null>(null)
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const [s, b, sv] = await Promise.all([
          getShop(slug),
          getBarbers(slug),
          getServices(slug),
        ])
        if (!cancelled) {
          setShop(s)
          setBarbers(b)
          setServices(sv)
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [slug])

  return { shop, barbers, services, loading, error }
}

/* ──────────────────────────── Helpers ──────────────────────────── */

function groupByCategory(services: Service[]): Record<string, Service[]> {
  const groups: Record<string, Service[]> = {}
  for (const s of services) {
    if (!groups[s.category]) groups[s.category] = []
    groups[s.category].push(s)
  }
  return groups
}

/* ──────────────────────────── SVG Ornaments ──────────────────────────── */

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

function ScrollDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/30" />
      <svg width="32" height="16" viewBox="0 0 32 16" className="text-gold/40">
        <path
          d="M0 8 Q8 0 16 8 Q24 16 32 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/30" />
    </div>
  )
}

/* ──────────────────────────── Loading / Error ──────────────────────────── */

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full border-2 border-gold/30 border-t-gold animate-spin mx-auto" />
        <p className="text-text-secondary font-body text-sm tracking-wide">Loading shop...</p>
      </div>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md px-6">
        <p className="text-gold font-heading text-2xl">Something went wrong</p>
        <p className="text-text-secondary font-body">{message}</p>
        <Link to="/" className="inline-block mt-4 px-6 py-2 border border-gold text-gold text-sm hover:bg-gold hover:text-bg-primary transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

/* ──────────────────────────── Sticky Mobile CTA ──────────────────────────── */

function StickyMobileCTA({ slug }: { slug: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-bg-elevated/95 backdrop-blur-sm border-t border-border-subtle p-4">
      <Link
        to={`/shop/${slug}/book`}
        className="block w-full text-center py-3 bg-gold text-bg-primary font-heading font-semibold text-sm uppercase tracking-wider hover:bg-gold-light transition-colors"
      >
        Book Now
      </Link>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   ShopPage — Vintage Luxe
   Centered layout, ornamental dividers, dotted-leader menu, gold rings
   ══════════════════════════════════════════════════════════════════════ */

export default function ShopPage() {
  const { slug } = useParams<{ slug: string }>()
  const { shop, barbers, services, loading, error } = useShopData(slug ?? '')

  if (loading) return <LoadingSkeleton />
  if (error || !shop) return <ErrorState message={error ?? 'Shop not found'} />

  const grouped = groupByCategory(services)
  const shopSlug = slug ?? ''

  return (
    <div className="min-h-screen bg-bg-primary pb-24 sm:pb-12">
      {/* ── Shop Header ── */}
      <section className="pt-16 pb-12 text-center px-6">
        <div className="max-w-2xl mx-auto">
          {shop.logo_url && (
            <div className="mb-6 inline-block p-1 rounded-full border-2 border-gold/40">
              <img
                src={shop.logo_url}
                alt={shop.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}
          <h1 className="font-heading text-4xl md:text-5xl text-text-primary tracking-wide mb-3">
            {shop.name}
          </h1>
          <OrnamentDivider className="my-6" />
          <p className="text-text-secondary font-body leading-relaxed max-w-lg mx-auto mb-6">
            {shop.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-text-secondary text-sm font-body">
            <span>{shop.address}</span>
            <span className="hidden sm:inline text-gold-muted">|</span>
            <span>{shop.phone}</span>
          </div>
        </div>
      </section>

      <ScrollDivider className="my-8" />

      {/* ── Barbers ── */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] text-gold-muted uppercase tracking-[0.3em] mb-2 font-body">Our Team</p>
          <h2 className="font-heading text-3xl text-text-primary mb-10">Master Barbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className="group border border-border-subtle hover:border-gold/40 bg-bg-surface p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="mb-5 inline-block p-1 rounded-full border-2 border-gold/50 group-hover:border-gold transition-colors duration-300">
                  <img
                    src={barber.photo_url}
                    alt={barber.name}
                    className="w-28 h-28 rounded-full object-cover"
                  />
                </div>
                <h3 className="font-heading text-xl text-text-primary mb-2">{barber.name}</h3>
                <p className="text-text-secondary text-sm font-body leading-relaxed mb-4">{barber.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {barber.specialties.map((s) => (
                    <span key={s} className="text-[10px] uppercase tracking-wider text-gold-muted border border-gold/20 px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollDivider className="my-8" />

      {/* ── Services (Classic Menu) ── */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] text-gold-muted uppercase tracking-[0.3em] mb-2 font-body">What We Offer</p>
          <h2 className="font-heading text-3xl text-text-primary mb-10">Services &amp; Pricing</h2>
          <div className="space-y-10 text-left">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-heading text-lg text-gold text-center mb-6 uppercase tracking-wider">{category}</h3>
                <div className="space-y-4">
                  {items.map((svc) => (
                    <div key={svc.id} className="group">
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-text-primary whitespace-nowrap">{svc.name}</span>
                        <span className="flex-1 border-b border-dotted border-gold/20 translate-y-[-4px]" />
                        <span className="font-heading text-gold whitespace-nowrap">{formatPrice(svc.price)}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-text-secondary text-xs font-body">{svc.description}</p>
                        <span className="text-text-secondary text-xs ml-4 whitespace-nowrap">{svc.duration_minutes} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrnamentDivider className="my-8" />

      {/* ── Book CTA ── */}
      <section className="py-12 text-center px-6">
        <h2 className="font-heading text-2xl text-text-primary mb-4">Ready for a Fresh Look?</h2>
        <p className="text-text-secondary font-body mb-8 max-w-md mx-auto">
          Reserve your chair and let our master barbers take care of the rest.
        </p>
        <Link
          to={`/shop/${shopSlug}/book`}
          className="inline-block px-10 py-4 bg-gold text-bg-primary font-heading text-sm uppercase tracking-[0.15em] hover:bg-gold-light transition-colors duration-200"
        >
          Book Your Appointment
        </Link>
      </section>

      <StickyMobileCTA slug={shopSlug} />
    </div>
  )
}
