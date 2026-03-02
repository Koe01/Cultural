import { Badge } from './ui/badge';
import type { ContentType } from '../data/content-types';
import { contentTypeLabels } from '../data/content-types';

const typeColors: Record<ContentType, string> = {
  story: 'bg-[#C86D5D]/15 text-[#C86D5D] border-[#C86D5D]/20',
  proverb: 'bg-[#8B8F6F]/15 text-[#6B6F4F] border-[#8B8F6F]/20',
  idiom: 'bg-[#4B5563]/15 text-[#4B5563] border-[#4B5563]/20',
  'folk-poem': 'bg-[#DB7093]/15 text-[#DB7093] border-[#DB7093]/20',
  'folk-song': 'bg-[#B8860B]/15 text-[#B8860B] border-[#B8860B]/20',
  lullaby: 'bg-[#6495ED]/15 text-[#4169E1] border-[#6495ED]/20',
  'folk-belief': 'bg-[#9370DB]/15 text-[#7B2D8E] border-[#9370DB]/20',
};

interface CategoryBadgeProps {
  type: ContentType;
  className?: string;
}

export default function CategoryBadge({ type, className = '' }: CategoryBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`text-[10px] font-normal ${typeColors[type]} ${className}`}
    >
      {contentTypeLabels[type]}
    </Badge>
  );
}
