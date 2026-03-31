import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-gold font-heading text-lg font-bold">BookBarber</span>
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <Link to="/admin/login" className="hover:text-text-primary transition-colors">Shop Login</Link>
          <Link to="/admin/register" className="hover:text-text-primary transition-colors">Register Your Shop</Link>
        </div>
        <span className="text-text-secondary text-xs">&copy; {new Date().getFullYear()} BookBarber</span>
      </div>
    </footer>
  )
}
