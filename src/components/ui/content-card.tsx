import { memo, useMemo } from 'react';
import Link from 'next/link';
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardDescription, PremiumCardContent } from '@/components/ui/premium-card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const contentCardVariants = cva(
  "flex p-6",
  {
    variants: {
      variant: {
        grid: "h-[320px] flex-col",
        list: "h-auto flex-row gap-6"
      }
    },
    defaultVariants: {
      variant: "grid"
    }
  }
);

interface ContentCardProps extends VariantProps<typeof contentCardVariants> {
  title: string;
  description: string;
  badges: string[];
  href: string;
  metadata?: {
    year?: number;
    companyCount?: number;
    lastUpdated?: string;
  };
}

const ContentCard = memo(function ContentCard({
  title,
  description,
  badges,
  href,
  variant = "grid",
  metadata
}: ContentCardProps) {
  // Memoize badge processing to avoid recalculating on every render
  const { displayBadges, remainingCount } = useMemo(() => {
    const sortedBadges = [...badges].sort((a, b) => a.length - b.length);
    const displayBadges = sortedBadges.slice(0, 3);
    const remainingCount = sortedBadges.length - 3;
    return { displayBadges, remainingCount };
  }, [badges]);

  if (variant === "list") {
    return (
      <Link href={href} className="group block">
        <PremiumCard 
          className={cn(contentCardVariants({ variant }), "group hover:scale-[1.02] transition-transform duration-300")}>
          <div className="flex-shrink-0 w-16 h-16 glass-premium rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/30 to-purple-vivid/20 rounded-md"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] line-clamp-1 flex-1 group-hover:text-primary transition-colors">
                {title}
              </h3>
              {metadata && (
                <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] flex-shrink-0">
                  {metadata.year && <span>{metadata.year}</span>}
                  {metadata.companyCount && <span>{metadata.companyCount} companies</span>}
                </div>
              )}
            </div>
            
            <p className="text-[var(--text-secondary)] line-clamp-2 mb-4">
              {description}
            </p>

            <div className="flex flex-wrap gap-2">
              {displayBadges.map((badge) => (
                <Badge 
                  key={badge} 
                  variant="outline" 
                  className="text-[var(--text-secondary)] border-[var(--border)] hover:border-primary hover:text-primary transition-colors"
                >
                  {badge}
                </Badge>
              ))}
              {remainingCount > 0 && (
                <Badge 
                  variant="outline" 
                  className="text-[var(--text-secondary)] border-[var(--border)] hover:border-primary hover:text-primary transition-colors"
                >
                  +{remainingCount} more
                </Badge>
              )}
            </div>
          </div>
        </PremiumCard>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block">
      <PremiumCard 
        className={cn(contentCardVariants({ variant }), "group")}>
        <div className="flex flex-col h-full">
          <PremiumCardHeader>
            <PremiumCardTitle className="min-h-[3.5rem] mb-3 line-clamp-2">
              {title}
            </PremiumCardTitle>
          </PremiumCardHeader>
          
          <PremiumCardContent>
            <p className={`text-[var(--text-secondary)] mb-auto ${badges.length === 0 ? 'line-clamp-6' : 'line-clamp-4'} min-h-[5rem]`}>
              {description}
            </p>
          </PremiumCardContent>

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
      </PremiumCard>
    </Link>
  );
});

export default ContentCard; 