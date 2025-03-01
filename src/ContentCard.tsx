// src/components/ContentCard.tsx
import Link from 'next/link'

interface ContentCardProps {
  title: string
  type: string
  path: string
  slug: string
  description: string
}

export default function ContentCard({
  title,
  type,
  path,
  slug,
  description,
}: ContentCardProps) {
  return (
    <Link href={`/${path}/${slug}`}>
      <div className="block bg-[var(--card)] rounded-xl 
        border border-[var(--border)] hover:border-[var(--card-hover-border)] 
        hover:bg-[var(--card-hover-background)] transition-all duration-200 
        shadow-sm overflow-hidden">
        <div className="p-4">
          <span className="inline-block px-2 py-1 rounded-full text-xs
            bg-[var(--accent)]/10 text-[var(--accent)] mb-2">
            {type}
          </span>
          
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            {title}
          </h3>
          
          <p className="text-sm text-[var(--text-secondary)]">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}