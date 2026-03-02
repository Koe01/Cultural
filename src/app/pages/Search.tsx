import { useNavigate } from 'react-router';
import Navigation from '../components/Navigation';
import { useSearch } from '../hooks/useSearch';
import { contentTypeLabels, type ContentType } from '../data/content-types';
import { Badge } from '../components/ui/badge';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '../components/ui/command';
import { MapPin } from 'lucide-react';
import CategoryBadge from '../components/CategoryBadge';

const allTypes: ContentType[] = ['story', 'proverb', 'idiom', 'folk-poem', 'folk-song', 'lullaby', 'folk-belief'];

export default function Search() {
  const navigate = useNavigate();
  const { query, setQuery, selectedTypes, toggleType, groupedResults, totalCount } = useSearch();

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-20" style={{ fontFamily: 'var(--font-sans)' }}>
      <header className="pt-8 pb-4 px-6">
        <h1
          className="text-[32px] leading-[1.2] mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          Ara
        </h1>
        <p className="text-[15px] text-[var(--ink-soft)] mt-1">
          Hikaye, atasözü, deyim ve daha fazlası
        </p>
      </header>

      <Command className="bg-transparent" shouldFilter={false}>
        <div className="px-6 mb-4">
          <div className="bg-white border border-[var(--border)] rounded-sm overflow-hidden">
            <CommandInput
              placeholder="Hikaye, atasözü, deyim ara..."
              value={query}
              onValueChange={setQuery}
              className="text-[16px]"
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="px-6 mb-4 overflow-x-auto">
          <div className="flex gap-2 flex-nowrap pb-1">
            {allTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className="touch-manipulation flex-shrink-0"
              >
                <Badge
                  variant={selectedTypes.includes(type) ? 'default' : 'outline'}
                  className="text-[13px] py-1.5 px-3 cursor-pointer whitespace-nowrap"
                >
                  {contentTypeLabels[type]}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="px-6 mb-2">
          <span className="text-[12px] text-[var(--olive-muted)]">
            {totalCount} sonuç
          </span>
        </div>

        <CommandList className="max-h-none px-6 overflow-visible">
          <CommandEmpty className="py-12">
            <div className="text-center">
              <p className="text-[16px] text-[var(--ink-soft)] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                Sonuç bulunamadı
              </p>
              <p className="text-[13px] text-[var(--olive-muted)]">
                Farklı bir arama terimi deneyin
              </p>
            </div>
          </CommandEmpty>

          {groupedResults.map(([type, items]) => (
            <CommandGroup
              key={type}
              heading={contentTypeLabels[type]}
              className="mb-4 [&_[cmdk-group-heading]]:text-[var(--terracotta)] [&_[cmdk-group-heading]]:text-[12px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:font-normal"
            >
              {items.map((item) => (
                <CommandItem
                  key={`${item.type}-${item.id}`}
                  value={`${item.title} ${item.secondaryText}`}
                  onSelect={() => navigate(item.url)}
                  className="py-3 px-3 mb-1 bg-white border border-[var(--border)] rounded-sm cursor-pointer active:scale-[0.98] transition-transform data-[selected=true]:bg-[var(--cream-warm)]"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CategoryBadge type={item.type} />
                    </div>
                    <p
                      className="text-[15px] leading-[1.4] text-[var(--ink)] truncate"
                      style={{ fontFamily: type === 'folk-poem' ? 'var(--font-serif)' : 'var(--font-sans)' }}
                    >
                      {item.title}
                    </p>
                    <p className="text-[13px] text-[var(--ink-soft)] truncate mt-0.5">
                      {item.secondaryText}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={11} strokeWidth={1.5} color="var(--olive-muted)" />
                      <span className="text-[11px] text-[var(--olive-muted)]">{item.region}</span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>

      <Navigation current="search" />
    </div>
  );
}
