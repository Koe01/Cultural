import { Link } from 'react-router';
import { MapPin } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import type { ContentType } from '../data/content-types';
import type { Story } from '../data/stories';
import type { Idiom } from '../data/idioms';
import type { FolkPoem } from '../data/folk-poems';
import type { FolkSong } from '../data/folk-songs';
import type { Lullaby } from '../data/lullabies';
import type { FolkBelief } from '../data/folk-beliefs';
import type { Proverb } from '../data/stories';

type ContentItem =
  | { type: 'story'; data: Story }
  | { type: 'proverb'; data: Proverb }
  | { type: 'idiom'; data: Idiom }
  | { type: 'folk-poem'; data: FolkPoem }
  | { type: 'folk-song'; data: FolkSong }
  | { type: 'lullaby'; data: Lullaby }
  | { type: 'folk-belief'; data: FolkBelief };

interface ContentCardProps {
  item: ContentItem;
  variant?: 'compact' | 'full';
}

function getUrl(item: ContentItem): string {
  switch (item.type) {
    case 'story': return `/story/${item.data.id}`;
    case 'proverb': return `/proverbs`;
    case 'idiom': return `/idiom/${item.data.id}`;
    case 'folk-poem': return `/folk-poem/${item.data.id}`;
    case 'folk-song': return `/folk-song/${item.data.id}`;
    case 'lullaby': return `/lullaby/${item.data.id}`;
    case 'folk-belief': return `/folk-belief/${item.data.id}`;
  }
}

export default function ContentCard({ item, variant = 'compact' }: ContentCardProps) {
  const url = getUrl(item);

  return (
    <Link
      to={url}
      className="block bg-white border border-[var(--border)] rounded-sm overflow-hidden active:scale-[0.98] transition-transform touch-manipulation"
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <CategoryBadge type={item.type} />
          <div className="flex items-center gap-1 ml-auto">
            <MapPin size={11} strokeWidth={1.5} color="var(--olive-muted)" />
            <span className="text-[11px] text-[var(--olive-muted)]">{item.data.region}</span>
          </div>
        </div>

        {item.type === 'story' && (
          <>
            <h3
              className="text-[18px] leading-[1.3] mb-2"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
            >
              {item.data.title}
            </h3>
            {variant === 'full' && (
              <p className="text-[14px] leading-[1.6] text-[var(--ink-soft)] line-clamp-2">
                {item.data.excerpt}
              </p>
            )}
          </>
        )}

        {item.type === 'proverb' && (
          <>
            <blockquote
              className="text-[17px] leading-[1.5] mb-2"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
            >
              "{item.data.text}"
            </blockquote>
            {variant === 'full' && (
              <p className="text-[13px] text-[var(--ink-soft)]">{item.data.meaning}</p>
            )}
          </>
        )}

        {item.type === 'idiom' && (
          <>
            <h3
              className="text-[17px] leading-[1.3] mb-1"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
            >
              {item.data.text}
            </h3>
            <p className="text-[13px] text-[var(--ink-soft)] line-clamp-2">{item.data.meaning}</p>
            {variant === 'full' && (
              <p className="text-[12px] text-[var(--olive-muted)] mt-1 italic">{item.data.usage}</p>
            )}
          </>
        )}

        {item.type === 'folk-poem' && (
          <div className="text-center">
            {item.data.lines.map((line, i) => (
              <p
                key={i}
                className="text-[15px] leading-[1.8] text-[var(--ink)]"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {item.type === 'folk-song' && (
          <>
            <h3
              className="text-[18px] leading-[1.3] mb-1"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
            >
              {item.data.title}
            </h3>
            {item.data.theme && (
              <span className="text-[12px] text-[var(--olive)]">{item.data.theme}</span>
            )}
          </>
        )}

        {item.type === 'lullaby' && (
          <>
            <h3
              className="text-[18px] leading-[1.3] mb-1"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
            >
              {item.data.title}
            </h3>
            <p className="text-[13px] text-[var(--ink-soft)] italic line-clamp-1">
              {item.data.lyrics.split('\n')[0]}
            </p>
          </>
        )}

        {item.type === 'folk-belief' && (
          <>
            <p
              className="text-[15px] leading-[1.5] mb-1"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
            >
              {item.data.belief}
            </p>
            {variant === 'full' && (
              <p className="text-[13px] text-[var(--ink-soft)] line-clamp-2">{item.data.explanation}</p>
            )}
          </>
        )}
      </div>
    </Link>
  );
}
