import { Link, useLocation } from 'react-router-dom'
import { useAdminStore } from '../../store/adminStore'
import { cn } from '../../lib/utils'

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Barbers', path: '/admin/barbers' },
  { label: 'Services', path: '/admin/services' },
  { label: 'Bookings', path: '/admin/bookings' },
]

export default function AdminSidebar() {
  const location = useLocation()
  const shop = useAdminStore((s) => s.shop)
  const logout = useAdminStore((s) => s.logout)

  return (
    <aside className="w-64 bg-bg-surface border-r border-border-subtle min-h-screen hidden lg:flex flex-col">
      <div className="p-6 border-b border-border-subtle">
        <span className="text-gold font-heading text-lg font-bold">BookBarber</span>
        {shop && <p className="text-text-secondary text-sm mt-1 truncate">{shop.name}</p>}
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={cn(
            'block px-4 py-2.5 text-sm transition-colors',
            location.pathname === item.path ? 'text-gold bg-bg-elevated' : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
          )}>{item.label}</Link>
        ))}
      </nav>
      <div className="p-4 border-t border-border-subtle">
        <button onClick={() => { logout(); window.location.href = '/admin/login' }} className="w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:text-error transition-colors">Log Out</button>
      </div>
    </aside>
  )
}
