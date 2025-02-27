// src/components/PathCard.tsx
import Link from 'next/link'

interface PathCardProps {
  title: string
  path: string
  description: string
}

export default function PathCard({ title, path, description }: PathCardProps) {
  return (
    <Link href={`/paths/${path}`}>
      <div className="group block bg-[var(--card)] rounded-xl 
        border border-[var(--border)] hover:border-[var(--card-hover-border)] 
        hover:bg-[var(--card-hover-background)] transition-all duration-200 
        shadow-sm overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-[var(--surface-secondary)]">
          {/* Add icon or illustration here if needed */}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 
            group-hover:text-[var(--accent)] transition-colors">
            {title}
          </h3>
          <p className="text-[var(--text-secondary)]">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}