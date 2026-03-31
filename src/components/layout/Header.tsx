import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-gold text-xl font-heading font-bold tracking-wide">BookBarber</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/admin/login" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Shop Login</Link>
          <Link to="/admin/register" className="bg-gold hover:bg-gold-hover text-bg-primary px-4 py-2 text-sm font-semibold transition-colors">List Your Shop</Link>
        </nav>
      </div>
    </header>
  )
}
