interface FormModalProps {
  title: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function FormModal({ title, open, onClose, children }: FormModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-bg-elevated border border-border-subtle p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading text-text-primary">{title}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors text-xl">&times;</button>
        </div>
        {children}
      </div>
    </div>
  )
}
