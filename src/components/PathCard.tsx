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
      <div className="group block bg-card-background rounded-xl 
        border border-card-border hover:border-card-hoverBorder 
        hover:bg-card-hoverBackground transition-all duration-200 
        shadow-sm overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-surface-secondary">
          {/* Add icon or illustration here if needed */}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-2 
            group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-text-secondary">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}