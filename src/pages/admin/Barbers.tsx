import { useState, useEffect } from 'react'
import { getAdminBarbers, createAdminBarber, updateAdminBarber, deleteAdminBarber } from '../../api/admin'
import FormModal from '../../components/admin/FormModal'
import type { Barber } from '../../types'

const INPUT_CLASS = 'w-full bg-bg-surface border border-border-subtle px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none transition-colors'

interface BarberForm {
  name: string
  bio: string
  specialties: string
  photo_url: string
}

const emptyForm: BarberForm = { name: '', bio: '', specialties: '', photo_url: '' }

export default function AdminBarbers() {
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Barber | null>(null)
  const [form, setForm] = useState<BarberForm>(emptyForm)
  const [loading, setLoading] = useState(false)

  const load = () => { getAdminBarbers().then(setBarbers) }
  useEffect(load, [])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (b: Barber) => {
    setEditing(b)
    setForm({ name: b.name, bio: b.bio, specialties: b.specialties.join(', '), photo_url: b.photo_url })
    setModalOpen(true)
  }

  const close = () => { setModalOpen(false); setEditing(null) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      name: form.name,
      bio: form.bio,
      specialties: form.specialties.split(',').map((s) => s.trim()).filter(Boolean),
      photo_url: form.photo_url,
    }
    if (editing) {
      const updated = await updateAdminBarber(editing.id, data)
      setBarbers((prev) => prev.map((b) => (b.id === editing.id ? updated : b)))
    } else {
      const created = await createAdminBarber(data)
      setBarbers((prev) => [...prev, created])
    }
    setLoading(false)
    close()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this barber?')) return
    await deleteAdminBarber(id)
    setBarbers((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading text-text-primary">Manage Barbers</h1>
        <button onClick={openAdd} className="bg-gold hover:bg-gold-hover text-bg-primary px-4 py-2 text-sm font-semibold transition-colors">
          Add Barber
        </button>
      </div>

      {barbers.length === 0 ? (
        <p className="text-text-secondary text-sm">No barbers yet. Add your first barber to get started.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {barbers.map((b) => (
            <div key={b.id} className="bg-bg-surface border border-border-subtle p-5">
              {b.photo_url && (
                <img src={b.photo_url} alt={b.name} className="w-16 h-16 rounded-full object-cover mb-3" />
              )}
              <h3 className="text-text-primary font-heading text-lg">{b.name}</h3>
              {b.bio && <p className="text-text-secondary text-sm mt-1 line-clamp-2">{b.bio}</p>}
              {b.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {b.specialties.map((s) => (
                    <span key={s} className="text-gold-muted text-xs border border-border-subtle px-2 py-0.5">{s}</span>
                  ))}
                </div>
              )}
              <div className="flex gap-3 mt-4">
                <button onClick={() => openEdit(b)} className="text-gold text-sm hover:text-gold-hover transition-colors">Edit</button>
                <button onClick={() => handleDelete(b.id)} className="text-error text-sm hover:opacity-80 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal title={editing ? 'Edit Barber' : 'Add Barber'} open={modalOpen} onClose={close}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm mb-1">Name</label>
            <input className={INPUT_CLASS} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1">Bio</label>
            <textarea className={INPUT_CLASS} rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1">Specialties (comma-separated)</label>
            <input className={INPUT_CLASS} value={form.specialties} onChange={(e) => setForm({ ...form, specialties: e.target.value })} placeholder="Fades, Beard trims, Hot towel" />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1">Photo URL</label>
            <input className={INPUT_CLASS} value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} placeholder="https://..." />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-hover text-bg-primary py-3 text-sm font-semibold transition-colors disabled:opacity-50">
            {loading ? 'Saving...' : editing ? 'Update Barber' : 'Create Barber'}
          </button>
        </form>
      </FormModal>
    </div>
  )
}
