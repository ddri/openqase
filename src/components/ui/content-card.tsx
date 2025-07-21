import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  title: string;
  description: string;
  badges: string[];
  href: string;
}

export default function ContentCard({
  title,
  description,
  badges,
  href
}: ContentCardProps) {
  // Sort badges by length for better visual hierarchy - can be done server-side
  const sortedBadges = [...badges].sort((a, b) => a.length - b.length);
  const displayBadges = sortedBadges.slice(0, 3);
  const remainingCount = sortedBadges.length - 3;

  return (
    <Link href={href} className="group block">
      <Card className={cn(
        "h-[320px] card-link-hover-effect",
        "flex flex-col p-6"
      )}>
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] min-h-[3.5rem] mb-3 line-clamp-2">
            {title}
          </h3>
          
          <p className={`text-[var(--text-secondary)] mb-auto ${badges.length === 0 ? 'line-clamp-6' : 'line-clamp-4'} min-h-[5rem]`}>
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {displayBadges.map((badge) => (
              <Badge 
                key={badge} 
                variant="outline" 
                className="text-[var(--text-secondary)] border-[var(--border)]"
              >
                {badge}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge 
                variant="outline" 
                className="text-[var(--text-secondary)] border-[var(--border)]"
              >
                +{remainingCount} more
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
} 