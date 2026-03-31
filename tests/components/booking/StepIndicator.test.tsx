import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StepIndicator from '../../../src/components/booking/StepIndicator'

describe('StepIndicator', () => {
  const steps = ['Barber', 'Service', 'Time', 'Details', 'Confirm']

  it('renders all step labels', () => {
    render(<StepIndicator steps={steps} currentStep={1} onStepClick={() => {}} />)
    steps.forEach((label) => {
      expect(screen.getByText(label)).toBeDefined()
    })
  })

  it('marks current step as active', () => {
    render(<StepIndicator steps={steps} currentStep={3} onStepClick={() => {}} />)
    const timeStep = screen.getByText('Time').closest('[data-step]')
    expect(timeStep?.getAttribute('data-active')).toBe('true')
  })

  it('marks completed steps', () => {
    render(<StepIndicator steps={steps} currentStep={3} onStepClick={() => {}} />)
    const barberStep = screen.getByText('Barber').closest('[data-step]')
    expect(barberStep?.getAttribute('data-completed')).toBe('true')
  })
})
