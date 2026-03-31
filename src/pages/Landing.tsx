import { useState } from 'react'
import { Link } from 'react-router-dom'

type DesignOption = 'A' | 'B' | 'C'

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

/* ──────────────────────────── OPTION A: Vintage Luxe ──────────────────────────── */

function OptionA() {
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

/* ──────────────────────────── OPTION B: Modern Classic ──────────────────────────── */

function OptionB() {
  const features = [
    {
      num: '01',
      title: 'Smart Scheduling',
      desc: 'Automated booking with real-time availability. No double-bookings, no phone tag.',
    },
    {
      num: '02',
      title: 'Team Management',
      desc: 'Individual barber profiles, schedules, and performance metrics.',
    },
    {
      num: '03',
      title: 'Analytics',
      desc: 'Understand your business with appointment trends and revenue tracking.',
    },
  ]

  const steps = [
    { num: '01', title: 'Create account', desc: 'Register and configure your shop details.' },
    { num: '02', title: 'Set up services', desc: 'Add your services, barbers, and availability.' },
    { num: '03', title: 'Go live', desc: 'Share your booking page and accept appointments.' },
  ]

  return (
    <div>
      {/* Hero — left aligned */}
      <section className="min-h-[85vh] flex items-center px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-10 h-px bg-gold mb-8" />
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-[1.15] mb-6">
              Booking software
              <br />
              for modern
              <br />
              barbershops
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-md mb-10">
              A clean, reliable platform to manage appointments, barbers, and clients.
              Built for shops that value simplicity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/admin/register"
                className="px-7 py-3 bg-gold text-bg-primary font-body font-medium text-sm hover:bg-gold-hover transition-colors duration-200"
              >
                Start free
              </Link>
              <Link
                to="/shop/the-gentlemans-cut"
                className="px-7 py-3 text-text-secondary font-body text-sm hover:text-text-primary transition-colors duration-200 underline underline-offset-4 decoration-border-subtle hover:decoration-gold-muted"
              >
                See a live demo
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="aspect-[4/3] bg-bg-surface border border-border-subtle rounded-sm relative overflow-hidden">
              {/* Placeholder representation of dashboard */}
              <div className="absolute inset-4 flex flex-col gap-3">
                <div className="h-8 w-1/3 bg-bg-elevated rounded-sm" />
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div className="bg-bg-elevated rounded-sm" />
                  <div className="bg-bg-elevated rounded-sm" />
                  <div className="bg-bg-elevated rounded-sm" />
                </div>
                <div className="h-24 bg-bg-elevated rounded-sm" />
                <div className="flex-1 bg-bg-elevated rounded-sm" />
              </div>
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 sm:px-12 lg:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary font-body mb-3">
              Features
            </p>
            <div className="w-10 h-px bg-gold" />
          </div>
          <div className="grid md:grid-cols-3 gap-x-12 gap-y-10">
            {features.map((f) => (
              <div key={f.num} className="group">
                <p className="text-[11px] text-gold-muted font-body tracking-wider mb-4">
                  {f.num}
                </p>
                <h3 className="font-heading text-xl text-text-primary mb-3">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                <div className="w-0 group-hover:w-8 h-px bg-gold mt-6 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 sm:px-12 lg:px-20 py-24 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary font-body mb-3">
                How it works
              </p>
              <div className="w-10 h-px bg-gold mb-6" />
              <h2 className="font-heading text-3xl text-text-primary leading-snug">
                Three steps to your first booking
              </h2>
            </div>
            <div className="space-y-10">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`flex gap-6 items-start ${i < steps.length - 1 ? 'pb-10 border-b border-border-subtle' : ''}`}
                >
                  <span className="text-3xl font-body font-light text-gold/25 shrink-0 w-12">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg text-text-primary mb-2">{s.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-12 lg:px-20 py-28 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-3">
              Start managing bookings today
            </h2>
            <p className="text-text-secondary">Free to set up. No credit card required.</p>
          </div>
          <Link
            to="/admin/register"
            className="px-8 py-3.5 bg-gold text-bg-primary font-body font-medium text-sm hover:bg-gold-hover transition-colors duration-200 shrink-0"
          >
            Create your shop
          </Link>
        </div>
      </section>
    </div>
  )
}

/* ──────────────────────────── OPTION C: Dark Editorial ──────────────────────────── */

function OptionC() {
  const features = [
    { title: 'Online Booking', desc: 'Clients self-serve 24/7 through a branded page.' },
    { title: 'Barber Profiles', desc: 'Individual pages with bios, skills, and availability.' },
    { title: 'Live Dashboard', desc: 'Revenue, appointments, and client data at a glance.' },
    { title: 'Custom Branding', desc: 'Your shop identity, front and center.' },
  ]

  const steps = [
    { title: 'Register', desc: 'Create your shop account' },
    { title: 'Configure', desc: 'Add services and team' },
    { title: 'Launch', desc: 'Start accepting bookings' },
  ]

  return (
    <div>
      {/* Hero — dramatic typography */}
      <section className="min-h-[95vh] flex items-end px-6 sm:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-[11px] uppercase tracking-[0.3em] text-text-secondary font-body mb-8">
            Barbershop Booking Platform
          </p>
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl xl:text-[9rem] text-text-primary leading-[0.9] mb-8 tracking-tight">
            Book.
            <br />
            <span className="text-text-secondary">Manage.</span>
            <br />
            Grow.
          </h1>
          <div className="flex flex-col sm:flex-row items-start gap-6 mt-12">
            <Link
              to="/admin/register"
              className="px-8 py-3.5 bg-gold text-bg-primary font-body font-semibold text-sm hover:bg-gold-hover transition-colors duration-200"
            >
              Get started
            </Link>
            <Link
              to="/shop/the-gentlemans-cut"
              className="text-gold font-body text-sm hover:text-gold-hover transition-colors duration-200 py-3.5"
            >
              View live demo &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Features — 2x2 bordered grid */}
      <section className="px-6 sm:px-12 lg:px-20 py-24 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl text-text-primary leading-[1.1]">
                What&rsquo;s
                <br />
                included
              </h2>
            </div>
            <div className="grid sm:grid-cols-2">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`p-8 border-border-subtle ${
                    i < 2 ? 'border-b' : ''
                  } ${i % 2 === 0 ? 'sm:border-r' : ''} border-border-subtle`}
                  style={{ borderStyle: 'solid', borderWidth: 0, borderBottomWidth: i < 2 ? 1 : 0, borderRightWidth: i % 2 === 0 ? 1 : 0 }}
                >
                  <h3 className="font-heading text-xl text-text-primary mb-3">{f.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps — horizontal with dividers */}
      <section className="px-6 sm:px-12 lg:px-20 py-24 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl sm:text-5xl text-text-primary mb-16">
            Three steps
          </h2>
          <div className="grid md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={`py-6 md:py-0 md:px-8 ${
                  i > 0 ? 'border-t md:border-t-0 md:border-l border-border-subtle' : ''
                }`}
              >
                <p className="text-7xl sm:text-8xl font-heading text-bg-elevated mb-6">
                  {String(i + 1)}
                </p>
                <h3 className="font-heading text-2xl text-text-primary mb-2">{s.title}</h3>
                <p className="text-text-secondary text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — full width dramatic */}
      <section className="px-6 sm:px-12 lg:px-20 py-32 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-text-primary leading-[0.95] mb-8">
            Your next client
            <br />
            <span className="text-text-secondary">is already searching.</span>
          </h2>
          <Link
            to="/admin/register"
            className="inline-block px-8 py-3.5 bg-gold text-bg-primary font-body font-semibold text-sm hover:bg-gold-hover transition-colors duration-200"
          >
            Register your shop
          </Link>
        </div>
      </section>
    </div>
  )
}

/* ──────────────────────────── Main Export ──────────────────────────── */

export default function Landing() {
  const [design, setDesign] = useState<DesignOption>('A')

  return (
    <>
      <OptionSwitcher current={design} onChange={setDesign} />
      {design === 'A' && <OptionA />}
      {design === 'B' && <OptionB />}
      {design === 'C' && <OptionC />}
    </>
  )
}
