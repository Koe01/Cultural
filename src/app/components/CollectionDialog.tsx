import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { useFavorites } from '../context/FavoritesContext';
import type { ContentType } from '../data/content-types';
import { Plus, Check } from 'lucide-react';

interface CollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string;
  itemType: ContentType;
}

export default function CollectionDialog({ open, onOpenChange, itemId, itemType }: CollectionDialogProps) {
  const { collections, createCollection, addToCollection, removeFromCollection } = useFavorites();
  const [newName, setNewName] = useState('');
  const [showNewInput, setShowNewInput] = useState(false);

  const handleCreate = () => {
    if (newName.trim()) {
      createCollection(newName.trim());
      setNewName('');
      setShowNewInput(false);
    }
  };

  const isInCollection = (collectionId: string) => {
    const col = collections.find((c) => c.id === collectionId);
    return col?.items.some((i) => i.id === itemId && i.type === itemType) ?? false;
  };

  const toggleCollection = (collectionId: string) => {
    if (isInCollection(collectionId)) {
      removeFromCollection(collectionId, itemId);
    } else {
      addToCollection(collectionId, itemId, itemType);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[var(--cream)] max-w-[340px]">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'var(--font-serif)' }}>Koleksiyona Ekle</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {collections.length === 0 && !showNewInput && (
            <p className="text-[14px] text-[var(--ink-soft)] text-center py-4">
              Henüz koleksiyon yok
            </p>
          )}
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => toggleCollection(col.id)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-sm hover:bg-[var(--cream-warm)] active:scale-[0.98] transition-all touch-manipulation text-left"
            >
              <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                isInCollection(col.id) ? 'bg-[var(--terracotta)] border-[var(--terracotta)]' : 'border-[var(--border)]'
              }`}>
                {isInCollection(col.id) && <Check size={14} color="white" />}
              </div>
              <span className="text-[15px] text-[var(--ink)]">{col.name}</span>
              <span className="text-[12px] text-[var(--olive-muted)] ml-auto">{col.items.length}</span>
            </button>
          ))}
        </div>

        {showNewInput ? (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              placeholder="Koleksiyon adı"
              className="flex-1 px-3 py-2 bg-white border border-[var(--border)] rounded-sm text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--olive)]"
              autoFocus
            />
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-[var(--indigo-deep)] text-white text-[14px] rounded-sm active:scale-95 touch-manipulation"
            >
              Ekle
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowNewInput(true)}
            className="w-full flex items-center gap-2 px-3 py-3 text-[var(--indigo-deep)] hover:bg-[var(--cream-warm)] rounded-sm transition-all touch-manipulation"
          >
            <Plus size={18} />
            <span className="text-[14px]">Yeni Koleksiyon Oluştur</span>
          </button>
        )}

        <DialogFooter>
          <button
            onClick={() => onOpenChange(false)}
            className="w-full py-3 bg-[var(--indigo-deep)] text-white text-[15px] rounded-sm active:scale-[0.98] touch-manipulation"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Tamam
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
