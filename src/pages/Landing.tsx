import { Link } from 'react-router-dom'

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

function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" className={className}>
      <path
        d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ──────────────────────────── Landing — Vintage Luxe ──────────────────────────── */

export default function Landing() {
  const features = [
    {
      title: 'Online Booking',
      desc: 'Let clients book appointments 24/7 through your personalized booking page.',
    },
    {
      title: 'Staff Management',
      desc: 'Manage your barbers, their schedules, and specialties all in one place.',
    },
    {
      title: 'Client Dashboard',
      desc: 'Track appointments, revenue, and client retention with real-time analytics.',
    },
    {
      title: 'Brand Presence',
      desc: 'A distinguished storefront page that reflects the character of your shop.',
    },
  ]

  const steps = [
    { numeral: 'I', title: 'Register Your Shop', desc: 'Create your account and set up your barbershop profile in minutes.' },
    { numeral: 'II', title: 'Add Your Services', desc: 'Define your cuts, styles, and prices. Assign barbers to each service.' },
    { numeral: 'III', title: 'Accept Bookings', desc: 'Share your link and start receiving appointments immediately.' },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-6">
        {/* Radial glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200,165,90,0.3) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <OrnamentDivider className="mb-8" />
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold-muted font-body mb-6">
            Barbershop Booking Platform
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-text-primary leading-[1.1] mb-6">
            The Art of the
            <span className="block italic text-gold mt-2">Perfect Appointment</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed mb-10">
            A refined booking system crafted for barbershops that take pride in their craft.
            Elegant, simple, powerful.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/admin/register"
              className="px-8 py-3.5 bg-gold text-bg-primary font-body font-semibold text-sm uppercase tracking-wider hover:bg-gold-hover transition-colors duration-300"
            >
              Open Your Shop
            </Link>
            <Link
              to="/shop/the-gentlemans-cut"
              className="px-8 py-3.5 border border-border-subtle text-text-secondary font-body text-sm uppercase tracking-wider hover:border-gold-muted hover:text-text-primary transition-all duration-300"
            >
              View Demo
            </Link>
          </div>
          <OrnamentDivider className="mt-12" />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold-muted mb-4">
            <StarIcon className="inline text-gold-muted mr-2 -mt-0.5" />
            What We Offer
            <StarIcon className="inline text-gold-muted ml-2 -mt-0.5" />
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary">
            Everything Your Shop Needs
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group border border-border-subtle p-8 transition-all duration-300 hover:border-gold-muted/50"
            >
              <h3 className="font-heading text-xl text-text-primary mb-3 group-hover:text-gold transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 bg-bg-surface/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <OrnamentDivider className="mb-6" />
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {steps.map((s) => (
              <div key={s.numeral}>
                <p className="font-heading text-5xl text-gold/30 mb-4">{s.numeral}</p>
                <h3 className="font-heading text-lg text-text-primary mb-3">{s.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 text-center">
        <div
          className="max-w-2xl mx-auto relative"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,165,90,0.08) 0%, transparent 70%)',
          }}
        >
          <OrnamentDivider className="mb-8" />
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Ready to Elevate Your Shop?
          </h2>
          <p className="text-text-secondary mb-10 leading-relaxed">
            Join the barbershops that have already modernized their booking experience.
          </p>
          <Link
            to="/admin/register"
            className="inline-block px-10 py-4 bg-gold text-bg-primary font-body font-semibold text-sm uppercase tracking-wider hover:bg-gold-hover transition-colors duration-300"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  )
}
