import { useState, useEffect } from 'react'
import { getAdminServices, createAdminService, updateAdminService, deleteAdminService } from '../../api/admin'
import FormModal from '../../components/admin/FormModal'
import type { Service } from '../../types'
import { formatPrice } from '../../lib/utils'

const INPUT_CLASS = 'w-full bg-bg-surface border border-border-subtle px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none transition-colors'

const CATEGORIES = ['Cuts', 'Beard', 'Combos']

interface ServiceForm {
  name: string
  description: string
  duration_minutes: string
  price: string
  category: string
}

const emptyForm: ServiceForm = { name: '', description: '', duration_minutes: '', price: '', category: 'Cuts' }

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState<ServiceForm>(emptyForm)
  const [loading, setLoading] = useState(false)

  const load = () => { getAdminServices().then(setServices) }
  useEffect(load, [])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (s: Service) => {
    setEditing(s)
    setForm({
      name: s.name,
      description: s.description,
      duration_minutes: String(s.duration_minutes),
      price: (s.price / 100).toFixed(2),
      category: s.category,
    })
    setModalOpen(true)
  }

  const close = () => { setModalOpen(false); setEditing(null) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      name: form.name,
      description: form.description,
      duration_minutes: Number(form.duration_minutes),
      price: Math.round(parseFloat(form.price) * 100),
      category: form.category,
    }
    if (editing) {
      const updated = await updateAdminService(editing.id, data)
      setServices((prev) => prev.map((s) => (s.id === editing.id ? updated : s)))
    } else {
      const created = await createAdminService(data)
      setServices((prev) => [...prev, created])
    }
    setLoading(false)
    close()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await deleteAdminService(id)
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    items: services.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0)

  const ungrouped = services.filter((s) => !CATEGORIES.includes(s.category))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading text-text-primary">Manage Services</h1>
        <button onClick={openAdd} className="bg-gold hover:bg-gold-hover text-bg-primary px-4 py-2 text-sm font-semibold transition-colors">
          Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <p className="text-text-secondary text-sm">No services yet. Add your first service to get started.</p>
      ) : (
        <div className="space-y-8">
          {grouped.map((g) => (
            <div key={g.category}>
              <h2 className="text-lg font-heading text-gold mb-3">{g.category}</h2>
              <div className="space-y-3">
                {g.items.map((s) => (
                  <div key={s.id} className="bg-bg-surface border border-border-subtle p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-text-primary font-semibold">{s.name}</h3>
                      {s.description && <p className="text-text-secondary text-sm mt-0.5">{s.description}</p>}
                      <div className="flex gap-4 mt-1">
                        <span className="text-gold text-sm">{formatPrice(s.price)}</span>
                        <span className="text-text-secondary text-sm">{s.duration_minutes} min</span>
                      </div>
                    </div>
                    <div className="flex gap-3 shrink-0 ml-4">
                      <button onClick={() => openEdit(s)} className="text-gold text-sm hover:text-gold-hover transition-colors">Edit</button>
                      <button onClick={() => handleDelete(s.id)} className="text-error text-sm hover:opacity-80 transition-colors">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {ungrouped.length > 0 && (
            <div>
              <h2 className="text-lg font-heading text-gold mb-3">Other</h2>
              <div className="space-y-3">
                {ungrouped.map((s) => (
                  <div key={s.id} className="bg-bg-surface border border-border-subtle p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-text-primary font-semibold">{s.name}</h3>
                      {s.description && <p className="text-text-secondary text-sm mt-0.5">{s.description}</p>}
                      <div className="flex gap-4 mt-1">
                        <span className="text-gold text-sm">{formatPrice(s.price)}</span>
                        <span className="text-text-secondary text-sm">{s.duration_minutes} min</span>
                      </div>
                    </div>
                    <div className="flex gap-3 shrink-0 ml-4">
                      <button onClick={() => openEdit(s)} className="text-gold text-sm hover:text-gold-hover transition-colors">Edit</button>
                      <button onClick={() => handleDelete(s.id)} className="text-error text-sm hover:opacity-80 transition-colors">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <FormModal title={editing ? 'Edit Service' : 'Add Service'} open={modalOpen} onClose={close}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm mb-1">Name</label>
            <input className={INPUT_CLASS} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1">Description</label>
            <textarea className={INPUT_CLASS} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm mb-1">Duration (minutes)</label>
              <input type="number" className={INPUT_CLASS} value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })} required min="1" />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-1">Price ($)</label>
              <input type="number" step="0.01" className={INPUT_CLASS} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required min="0" />
            </div>
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1">Category</label>
            <select className={INPUT_CLASS} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-hover text-bg-primary py-3 text-sm font-semibold transition-colors disabled:opacity-50">
            {loading ? 'Saving...' : editing ? 'Update Service' : 'Create Service'}
          </button>
        </form>
      </FormModal>
    </div>
  )
}
