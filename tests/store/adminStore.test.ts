import { describe, it, expect, beforeEach } from 'vitest'
import { useAdminStore } from '../../src/store/adminStore'

describe('adminStore', () => {
  beforeEach(() => { useAdminStore.getState().logout(); localStorage.clear() })

  it('starts logged out', () => {
    const state = useAdminStore.getState()
    expect(state.token).toBeNull()
    expect(state.shop).toBeNull()
  })

  it('login sets token and shop', () => {
    const shop = { id: '1', slug: 'test', name: 'Test', description: '', logo_url: '', address: '', phone: '', hours: {} }
    useAdminStore.getState().login('jwt-123', shop)
    const state = useAdminStore.getState()
    expect(state.token).toBe('jwt-123')
    expect(state.shop?.name).toBe('Test')
  })

  it('logout clears state', () => {
    const shop = { id: '1', slug: 'test', name: 'Test', description: '', logo_url: '', address: '', phone: '', hours: {} }
    useAdminStore.getState().login('jwt-123', shop)
    useAdminStore.getState().logout()
    expect(useAdminStore.getState().token).toBeNull()
    expect(useAdminStore.getState().shop).toBeNull()
  })
})
