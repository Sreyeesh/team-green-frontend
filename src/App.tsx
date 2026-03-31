import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Landing from './pages/Landing'
import ShopPage from './pages/ShopPage'
import BookingFlow from './pages/BookingFlow'
import BookingConfirm from './pages/BookingConfirm'
import AdminLogin from './pages/AdminLogin'
import AdminRegister from './pages/AdminRegister'
import ProtectedRoute from './components/layout/ProtectedRoute'
import AdminSidebar from './components/layout/AdminSidebar'
import Dashboard from './pages/admin/Dashboard'
import AdminBarbers from './pages/admin/Barbers'
import AdminServices from './pages/admin/Services'
import AdminBookings from './pages/admin/Bookings'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
        <Route path="/shop/:slug" element={<PublicLayout><ShopPage /></PublicLayout>} />
        <Route path="/shop/:slug/book" element={<PublicLayout><BookingFlow /></PublicLayout>} />
        <Route path="/shop/:slug/booking/:id" element={<PublicLayout><BookingConfirm /></PublicLayout>} />
        <Route path="/admin/login" element={<PublicLayout><AdminLogin /></PublicLayout>} />
        <Route path="/admin/register" element={<PublicLayout><AdminRegister /></PublicLayout>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/barbers" element={<ProtectedRoute><AdminLayout><AdminBarbers /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminLayout><AdminServices /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><AdminLayout><AdminBookings /></AdminLayout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
