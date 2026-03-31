import { useState } from 'react'
import type { FormEvent } from 'react'

interface CustomerFormProps {
  initialValues?: { name: string; email: string; phone: string }
  onSubmit: (details: { name: string; email: string; phone: string }) => void
}

const inputClass =
  'w-full bg-bg-surface border border-border-subtle px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none transition-colors'

export default function CustomerForm({ initialValues, onSubmit }: CustomerFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [phone, setPhone] = useState(initialValues?.phone ?? '')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email format'
    if (!phone.trim()) errs.phone = 'Phone is required'
    return errs
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="customer-name" className="block text-text-secondary text-xs uppercase tracking-wider mb-2">
          Full Name
        </label>
        <input
          id="customer-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Smith"
          className={inputClass}
        />
        {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="customer-email" className="block text-text-secondary text-xs uppercase tracking-wider mb-2">
          Email Address
        </label>
        <input
          id="customer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className={inputClass}
        />
        {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="customer-phone" className="block text-text-secondary text-xs uppercase tracking-wider mb-2">
          Phone Number
        </label>
        <input
          id="customer-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
          className={inputClass}
        />
        {errors.phone && <p className="text-error text-xs mt-1">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gold hover:bg-gold-hover text-bg-primary font-body font-semibold text-sm uppercase tracking-wider transition-colors duration-300 hover:shadow-[0_0_20px_rgba(200,165,90,0.3)]"
      >
        Continue to Review
      </button>
    </form>
  )
}
