import { describe, it, expect } from 'vitest'
import { formatPrice, formatDate, formatTime, cn } from '../../src/lib/utils'

describe('formatPrice', () => {
  it('formats cents to dollar string', () => {
    expect(formatPrice(2500)).toBe('$25.00')
    expect(formatPrice(1050)).toBe('$10.50')
    expect(formatPrice(0)).toBe('$0.00')
    expect(formatPrice(99)).toBe('$0.99')
  })
})

describe('formatDate', () => {
  it('formats ISO string to readable date', () => {
    expect(formatDate('2026-04-15T10:00:00Z')).toBe('Apr 15, 2026')
  })
})

describe('formatTime', () => {
  it('formats ISO string to 12-hour time', () => {
    expect(formatTime('2026-04-15T10:00:00Z')).toMatch(/10:00\s?AM/)
    expect(formatTime('2026-04-15T14:30:00Z')).toMatch(/2:30\s?PM/)
  })
})

describe('cn', () => {
  it('joins class names and filters falsy values', () => {
    expect(cn('a', 'b')).toBe('a b')
    expect(cn('a', false && 'b', 'c')).toBe('a c')
    expect(cn('a', undefined, null, '', 'b')).toBe('a b')
  })
})
