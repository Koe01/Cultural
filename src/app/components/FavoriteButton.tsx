import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import type { ContentType } from '../data/content-types';

interface FavoriteButtonProps {
  id: string;
  type: ContentType;
}

export default function FavoriteButton({ id, type }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(id, type);

  return (
    <button
      onClick={() => toggleFavorite(id, type)}
      className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 touch-manipulation transition-colors"
      aria-label={favorited ? 'Favorilerden çıkar' : 'Favorilere ekle'}
    >
      {favorited ? (
        <BookmarkCheck size={20} strokeWidth={1.5} className="text-[var(--terracotta)]" fill="var(--terracotta)" />
      ) : (
        <Bookmark size={20} strokeWidth={1.5} className="text-[var(--ink-soft)]" />
      )}
    </button>
  );
}
