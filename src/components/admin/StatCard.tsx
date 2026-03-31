interface StatCardProps {
  label: string
  value: string | number
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-bg-surface border border-border-subtle p-5">
      <p className="text-text-secondary text-sm">{label}</p>
      <p className="text-gold font-heading text-3xl mt-1">{value}</p>
    </div>
  )
}
