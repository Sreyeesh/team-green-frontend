import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/admin'
import { useAdminStore } from '../store/adminStore'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const adminLogin = useAdminStore((s) => s.login)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login(email, password)
      adminLogin(res.token, res.shop)
      navigate('/admin/dashboard')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-bg-surface border border-border-subtle px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none transition-colors'

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-heading text-text-primary text-center mb-2">Welcome Back</h1>
        <p className="text-text-secondary text-sm text-center mb-8">Sign in to manage your shop</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-text-secondary text-sm mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" required />
          </div>
          <div>
            <label className="text-text-secondary text-sm mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" required />
          </div>
          {error && <p className="text-error text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-hover text-bg-primary py-3 text-sm font-semibold transition-colors disabled:opacity-50 hover:shadow-[0_0_20px_rgba(200,165,90,0.3)]">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-text-secondary text-sm text-center mt-6">
          Don&apos;t have a shop?{' '}
          <Link to="/admin/register" className="text-gold hover:text-gold-hover transition-colors">Register here</Link>
        </p>
      </div>
    </div>
  )
}
