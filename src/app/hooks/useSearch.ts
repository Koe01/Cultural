import { useMemo, useState } from 'react';
import { buildSearchIndex, type ContentType, type SearchableItem } from '../data/content-types';

interface UseSearchOptions {
  types?: ContentType[];
  regions?: string[];
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>([]);

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  const results = useMemo(() => {
    let filtered = searchIndex;

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((item) => selectedTypes.includes(item.type));
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.secondaryText.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [searchIndex, query, selectedTypes]);

  const groupedResults = useMemo(() => {
    const groups: Record<ContentType, SearchableItem[]> = {
      story: [],
      proverb: [],
      idiom: [],
      'folk-poem': [],
      'folk-song': [],
      lullaby: [],
      'folk-belief': [],
    };

    results.forEach((item) => {
      groups[item.type].push(item);
    });

    return Object.entries(groups).filter(([_, items]) => items.length > 0) as [ContentType, SearchableItem[]][];
  }, [results]);

  const toggleType = (type: ContentType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return {
    query,
    setQuery,
    selectedTypes,
    setSelectedTypes,
    toggleType,
    results,
    groupedResults,
    totalCount: results.length,
  };
}
