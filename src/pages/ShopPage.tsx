import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getShop, getBarbers, getServices } from '../api/shops'
import type { Shop, Barber, Service } from '../types'
import { formatPrice } from '../lib/utils'

type DesignOption = 'A' | 'B' | 'C'

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

/* ──────────────────────────── Switcher ──────────────────────────── */

function OptionSwitcher({
  current,
  onChange,
}: {
  current: DesignOption
  onChange: (o: DesignOption) => void
}) {
  return (
    <div className="fixed top-20 right-4 z-50 bg-bg-elevated/95 backdrop-blur-sm border border-border-subtle rounded-sm p-4 space-y-2 shadow-xl">
      <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-[0.2em] mb-3">
        Design Option
      </p>
      {(['A', 'B', 'C'] as DesignOption[]).map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition-all duration-200 ${
            current === opt
              ? 'text-gold bg-bg-surface border-l-2 border-gold'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface/50'
          }`}
        >
          {opt === 'A'
            ? 'A — Vintage Luxe'
            : opt === 'B'
              ? 'B — Modern Classic'
              : 'C — Dark Editorial'}
        </button>
      ))}
    </div>
  )
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
   OPTION A — Vintage Luxe
   Centered layout, ornamental dividers, dotted-leader menu, gold rings
   ══════════════════════════════════════════════════════════════════════ */

function OptionA({ shop, barbers, services, slug }: {
  shop: Shop
  barbers: Barber[]
  services: Service[]
  slug: string
}) {
  const grouped = groupByCategory(services)

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
          to={`/shop/${slug}/book`}
          className="inline-block px-10 py-4 bg-gold text-bg-primary font-heading text-sm uppercase tracking-[0.15em] hover:bg-gold-light transition-colors duration-200"
        >
          Book Your Appointment
        </Link>
      </section>

      <StickyMobileCTA slug={slug} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   OPTION B — Modern Classic
   Left-aligned header, horizontal barber scroll, clean minimal services
   ══════════════════════════════════════════════════════════════════════ */

function OptionB({ shop, barbers, services, slug }: {
  shop: Shop
  barbers: Barber[]
  services: Service[]
  slug: string
}) {
  const grouped = groupByCategory(services)

  return (
    <div className="min-h-screen bg-bg-primary pb-24 sm:pb-12">
      {/* ── Shop Header ── */}
      <section className="pt-12 pb-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start gap-6">
          {shop.logo_url && (
            <img
              src={shop.logo_url}
              alt={shop.name}
              className="w-20 h-20 rounded-sm object-cover border border-border-subtle flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary mb-2">{shop.name}</h1>
            <p className="text-text-secondary font-body text-sm leading-relaxed mb-4 max-w-xl">
              {shop.description}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-text-secondary text-xs font-body">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold/60" />
                {shop.address}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold/60" />
                {shop.phone}
              </span>
            </div>
          </div>
          <Link
            to={`/shop/${slug}/book`}
            className="hidden sm:inline-block px-6 py-3 bg-gold text-bg-primary font-heading text-xs uppercase tracking-[0.15em] hover:bg-gold-light transition-colors whitespace-nowrap flex-shrink-0"
          >
            Book Now
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-gold/20 via-gold/10 to-transparent" />
      </div>

      {/* ── Barbers (Horizontal Scroll) ── */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] text-gold-muted uppercase tracking-[0.3em] mb-1 font-body">Team</p>
          <h2 className="font-heading text-2xl text-text-primary mb-6">Our Barbers</h2>
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className="snap-start flex-shrink-0 w-64 bg-bg-surface border border-border-subtle rounded-sm overflow-hidden group hover:border-gold/30 transition-colors duration-200"
              >
                <img
                  src={barber.photo_url}
                  alt={barber.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-heading text-lg text-text-primary mb-1">{barber.name}</h3>
                  <p className="text-text-secondary text-xs font-body leading-relaxed mb-3 line-clamp-2">{barber.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {barber.specialties.map((s) => (
                      <span key={s} className="text-[9px] uppercase tracking-wider text-gold-muted bg-bg-elevated px-2 py-0.5 rounded-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-gold/20 via-gold/10 to-transparent" />
      </div>

      {/* ── Services (Clean List) ── */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] text-gold-muted uppercase tracking-[0.3em] mb-1 font-body">Services</p>
          <h2 className="font-heading text-2xl text-text-primary mb-8">What We Offer</h2>
          <div className="space-y-8">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-gold/50" />
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-body font-medium">{category}</h3>
                </div>
                <div className="space-y-1">
                  {items.map((svc) => (
                    <div
                      key={svc.id}
                      className="flex items-center justify-between py-3 px-4 hover:bg-bg-surface/50 transition-colors rounded-sm group"
                    >
                      <div className="flex-1 min-w-0 mr-4">
                        <div className="flex items-baseline gap-3">
                          <span className="font-body text-text-primary text-sm">{svc.name}</span>
                          <span className="text-text-secondary text-xs">{svc.duration_minutes} min</span>
                        </div>
                        <p className="text-text-secondary text-xs font-body mt-0.5 truncate">{svc.description}</p>
                      </div>
                      <span className="font-heading text-gold text-sm whitespace-nowrap">{formatPrice(svc.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-gold/20 via-gold/10 to-transparent" />
      </div>

      {/* ── Book CTA ── */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 bg-bg-surface border border-border-subtle p-8 rounded-sm">
          <div>
            <h2 className="font-heading text-xl text-text-primary mb-1">Ready to book?</h2>
            <p className="text-text-secondary font-body text-sm">Pick a time that works for you.</p>
          </div>
          <Link
            to={`/shop/${slug}/book`}
            className="px-8 py-3 bg-gold text-bg-primary font-heading text-xs uppercase tracking-[0.15em] hover:bg-gold-light transition-colors whitespace-nowrap"
          >
            Book Your Appointment
          </Link>
        </div>
      </section>

      <StickyMobileCTA slug={slug} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   OPTION C — Dark Editorial
   Dramatic name, grayscale→color barber photos, two-col editorial grid
   ══════════════════════════════════════════════════════════════════════ */

function OptionC({ shop, barbers, services, slug }: {
  shop: Shop
  barbers: Barber[]
  services: Service[]
  slug: string
}) {
  const grouped = groupByCategory(services)

  return (
    <div className="min-h-screen bg-bg-primary pb-24 sm:pb-12">
      {/* ── Shop Header ── */}
      <section className="pt-16 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-text-primary tracking-tight leading-none mb-6">
            {shop.name}
          </h1>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            <p className="text-text-secondary font-body text-sm leading-relaxed max-w-md">
              {shop.description}
            </p>
            <div className="flex flex-col gap-1 text-text-secondary text-xs font-body md:ml-auto">
              <span>{shop.address}</span>
              <span>{shop.phone}</span>
            </div>
            {shop.logo_url && (
              <img
                src={shop.logo_url}
                alt={shop.name}
                className="w-14 h-14 object-cover border border-border-subtle hidden md:block"
              />
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border-subtle" />
      </div>

      {/* ── Barbers (Grid, Grayscale → Color) ── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-10">The Barbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {barbers.map((barber) => (
              <div key={barber.id} className="group cursor-default">
                <div className="aspect-square overflow-hidden bg-bg-surface mb-4">
                  <img
                    src={barber.photo_url}
                    alt={barber.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-heading text-xl text-text-primary mb-1">{barber.name}</h3>
                <p className="text-text-secondary text-xs font-body leading-relaxed mb-3">{barber.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {barber.specialties.map((s) => (
                    <span key={s} className="text-[10px] uppercase tracking-wider text-gold/70 font-body">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border-subtle" />
      </div>

      {/* ── Services (Two-Column Editorial) ── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-10">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-heading text-lg text-gold mb-5 pb-2 border-b border-gold/20">{category}</h3>
                <div className="space-y-4">
                  {items.map((svc) => (
                    <div key={svc.id} className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-body text-text-primary text-sm font-medium">{svc.name}</span>
                          <span className="text-text-secondary text-[10px] uppercase tracking-wider">{svc.duration_minutes}min</span>
                        </div>
                        <p className="text-text-secondary text-xs font-body mt-1 leading-relaxed">{svc.description}</p>
                      </div>
                      <span className="font-heading text-gold text-lg">{formatPrice(svc.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border-subtle" />
      </div>

      {/* ── Book CTA ── */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-text-primary mb-6">
            Your Next Cut<br className="hidden md:block" /> Starts Here
          </h2>
          <Link
            to={`/shop/${slug}/book`}
            className="inline-block px-12 py-4 border-2 border-gold text-gold font-heading text-sm uppercase tracking-[0.2em] hover:bg-gold hover:text-bg-primary transition-all duration-300"
          >
            Book Now
          </Link>
        </div>
      </section>

      <StickyMobileCTA slug={slug} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   Main Export
   ══════════════════════════════════════════════════════════════════════ */

export default function ShopPage() {
  const { slug } = useParams<{ slug: string }>()
  const [option, setOption] = useState<DesignOption>('A')
  const { shop, barbers, services, loading, error } = useShopData(slug ?? '')

  if (loading) return <LoadingSkeleton />
  if (error || !shop) return <ErrorState message={error ?? 'Shop not found'} />

  const props = { shop, barbers, services, slug: slug ?? '' }

  return (
    <>
      <OptionSwitcher current={option} onChange={setOption} />
      {option === 'A' && <OptionA {...props} />}
      {option === 'B' && <OptionB {...props} />}
      {option === 'C' && <OptionC {...props} />}
    </>
  )
}
