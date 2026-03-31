import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Shop } from '../types'

interface AdminState {
  token: string | null
  shop: Shop | null
  login: (token: string, shop: Shop) => void
  logout: () => void
  updateShop: (shop: Shop) => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      token: null,
      shop: null,
      login: (token, shop) => {
        localStorage.setItem('admin_token', token)
        set({ token, shop })
      },
      logout: () => {
        localStorage.removeItem('admin_token')
        set({ token: null, shop: null })
      },
      updateShop: (shop) => set({ shop }),
    }),
    { name: 'admin-store' }
  )
)
