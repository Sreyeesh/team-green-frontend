import { cn } from '../../lib/utils'

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
  onStepClick: (step: number) => void
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 py-6">
      {steps.map((label, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep
        const isClickable = isCompleted
        return (
          <div key={label} className="flex items-center gap-1 sm:gap-2">
            <button
              data-step={stepNum}
              data-active={isActive ? 'true' : 'false'}
              data-completed={isCompleted ? 'true' : 'false'}
              onClick={() => isClickable && onStepClick(stepNum)}
              disabled={!isClickable}
              className={cn(
                'flex items-center gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm transition-colors',
                isActive && 'text-gold',
                isCompleted && 'text-gold-muted cursor-pointer hover:text-gold',
                !isActive && !isCompleted && 'text-text-secondary cursor-default'
              )}
            >
              <span className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors',
                isActive && 'border-gold text-gold',
                isCompleted && 'border-gold-muted bg-gold-muted text-bg-primary',
                !isActive && !isCompleted && 'border-border-subtle text-text-secondary'
              )}>
                {isCompleted ? '✓' : stepNum}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={cn('w-4 sm:w-8 h-px', isCompleted ? 'bg-gold-muted' : 'bg-border-subtle')} />
            )}
          </div>
        )
      })}
    </div>
  )
}
