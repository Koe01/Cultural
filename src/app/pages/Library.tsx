import { useState } from 'react';
import Navigation from '../components/Navigation';
import ContentCard from '../components/ContentCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { useFavorites, type FavoriteItem } from '../context/FavoritesContext';
import { contentTypeLabels, type ContentType } from '../data/content-types';
import { stories, proverbs } from '../data/stories';
import { idioms } from '../data/idioms';
import { folkPoems } from '../data/folk-poems';
import { folkSongs } from '../data/folk-songs';
import { lullabies } from '../data/lullabies';
import { folkBeliefs } from '../data/folk-beliefs';
import { Heart, Plus, Trash2, FolderOpen } from 'lucide-react';

function resolveItem(fav: FavoriteItem) {
  switch (fav.type) {
    case 'story': {
      const d = stories.find((s) => s.id === fav.id);
      return d ? { type: 'story' as const, data: d } : null;
    }
    case 'proverb': {
      const d = proverbs.find((p) => p.id === fav.id);
      return d ? { type: 'proverb' as const, data: d } : null;
    }
    case 'idiom': {
      const d = idioms.find((i) => i.id === fav.id);
      return d ? { type: 'idiom' as const, data: d } : null;
    }
    case 'folk-poem': {
      const d = folkPoems.find((p) => p.id === fav.id);
      return d ? { type: 'folk-poem' as const, data: d } : null;
    }
    case 'folk-song': {
      const d = folkSongs.find((s) => s.id === fav.id);
      return d ? { type: 'folk-song' as const, data: d } : null;
    }
    case 'lullaby': {
      const d = lullabies.find((l) => l.id === fav.id);
      return d ? { type: 'lullaby' as const, data: d } : null;
    }
    case 'folk-belief': {
      const d = folkBeliefs.find((b) => b.id === fav.id);
      return d ? { type: 'folk-belief' as const, data: d } : null;
    }
  }
}

export default function Library() {
  const { favorites, collections, createCollection, deleteCollection } = useFavorites();
  const [newColName, setNewColName] = useState('');
  const [showNewCol, setShowNewCol] = useState(false);

  // Group favorites by type
  const groupedFavorites = favorites.reduce<Record<ContentType, FavoriteItem[]>>((acc, fav) => {
    if (!acc[fav.type]) acc[fav.type] = [];
    acc[fav.type].push(fav);
    return acc;
  }, {} as Record<ContentType, FavoriteItem[]>);

  const handleCreateCollection = () => {
    if (newColName.trim()) {
      createCollection(newColName.trim());
      setNewColName('');
      setShowNewCol(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-20" style={{ fontFamily: 'var(--font-sans)' }}>
      <header className="pt-8 pb-4 px-6">
        <h1
          className="text-[32px] leading-[1.2] mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          Kütüphanem
        </h1>
        <p className="text-[15px] text-[var(--ink-soft)] mt-1">
          Kaydettikleriniz ve koleksiyonlarınız
        </p>
      </header>

      <Tabs defaultValue="favorites" className="w-full">
        <div className="px-6 mb-4">
          <TabsList className="w-full bg-[var(--cream-warm)] h-auto p-1">
            <TabsTrigger value="favorites" className="text-[14px] px-4 py-2 flex-1 rounded-lg">Favoriler</TabsTrigger>
            <TabsTrigger value="collections" className="text-[14px] px-4 py-2 flex-1 rounded-lg">Koleksiyonlar</TabsTrigger>
          </TabsList>
        </div>

        {/* Favorites tab */}
        <TabsContent value="favorites" className="px-6">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Heart size={48} strokeWidth={1} className="text-[var(--olive-muted)] mb-4" />
              <p
                className="text-[18px] text-[var(--ink)] mb-2"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Henüz favori yok
              </p>
              <p className="text-[14px] text-[var(--ink-soft)] text-center max-w-[240px]">
                İçerikleri okurken yer imi simgesine dokunarak favorilere ekleyebilirsiniz
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {(Object.entries(groupedFavorites) as [ContentType, FavoriteItem[]][]).map(([type, items]) => (
                <div key={type}>
                  <h3 className="text-[12px] uppercase tracking-wider text-[var(--terracotta)] mb-3">
                    {contentTypeLabels[type]}
                  </h3>
                  <div className="space-y-3">
                    {items.map((fav) => {
                      const resolved = resolveItem(fav);
                      if (!resolved) return null;
                      return <ContentCard key={`${fav.type}-${fav.id}`} item={resolved} />;
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Collections tab */}
        <TabsContent value="collections" className="px-6">
          {collections.length === 0 && !showNewCol ? (
            <div className="flex flex-col items-center justify-center py-16">
              <FolderOpen size={48} strokeWidth={1} className="text-[var(--olive-muted)] mb-4" />
              <p
                className="text-[18px] text-[var(--ink)] mb-2"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Henüz koleksiyon yok
              </p>
              <p className="text-[14px] text-[var(--ink-soft)] text-center max-w-[240px] mb-6">
                İçeriklerinizi koleksiyonlarda düzenleyin
              </p>
              <button
                onClick={() => setShowNewCol(true)}
                className="flex items-center gap-2 px-4 py-3 bg-[var(--indigo-deep)] text-white rounded-sm active:scale-95 touch-manipulation"
              >
                <Plus size={18} />
                <span className="text-[14px]">Yeni Koleksiyon</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {collections.map((col) => (
                <div
                  key={col.id}
                  className="bg-white border border-[var(--border)] rounded-sm p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className="text-[17px] leading-[1.3]"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
                    >
                      {col.name}
                    </h3>
                    <button
                      onClick={() => deleteCollection(col.id)}
                      className="p-2 text-[var(--ink-soft)] active:scale-95 touch-manipulation"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                  <p className="text-[13px] text-[var(--olive-muted)]">
                    {col.items.length} öğe
                  </p>
                  {col.items.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {col.items.map((item) => {
                        const resolved = resolveItem(item);
                        if (!resolved) return null;
                        return <ContentCard key={`${item.type}-${item.id}`} item={resolved} variant="compact" />;
                      })}
                    </div>
                  )}
                </div>
              ))}

              {showNewCol ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newColName}
                    onChange={(e) => setNewColName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateCollection()}
                    placeholder="Koleksiyon adı"
                    className="flex-1 px-3 py-3 bg-white border border-[var(--border)] rounded-sm text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--olive)]"
                    autoFocus
                  />
                  <button
                    onClick={handleCreateCollection}
                    className="px-4 py-3 bg-[var(--indigo-deep)] text-white text-[14px] rounded-sm active:scale-95 touch-manipulation"
                  >
                    Oluştur
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewCol(true)}
                  className="w-full flex items-center justify-center gap-2 py-4 border border-dashed border-[var(--border)] rounded-sm text-[var(--indigo-deep)] hover:bg-[var(--cream-warm)] active:scale-[0.98] transition-all touch-manipulation"
                >
                  <Plus size={18} />
                  <span className="text-[14px]">Yeni Koleksiyon</span>
                </button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Navigation current="library" />
    </div>
  );
}
