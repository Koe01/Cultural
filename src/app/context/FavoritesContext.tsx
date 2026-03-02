import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ContentType } from '../data/content-types';

export interface FavoriteItem {
  id: string;
  type: ContentType;
  addedAt: number;
}

export interface Collection {
  id: string;
  name: string;
  items: FavoriteItem[];
  createdAt: number;
}

interface UserData {
  favorites: FavoriteItem[];
  collections: Collection[];
}

interface FavoritesContextValue {
  favorites: FavoriteItem[];
  collections: Collection[];
  isFavorite: (id: string, type: ContentType) => boolean;
  toggleFavorite: (id: string, type: ContentType) => void;
  createCollection: (name: string) => void;
  deleteCollection: (id: string) => void;
  addToCollection: (collectionId: string, itemId: string, type: ContentType) => void;
  removeFromCollection: (collectionId: string, itemId: string) => void;
}

const STORAGE_KEY = 'cultural-user-data';

function loadData(): UserData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { favorites: [], collections: [] };
}

function saveData(data: UserData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<UserData>(loadData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const isFavorite = (id: string, type: ContentType) => {
    return data.favorites.some((f) => f.id === id && f.type === type);
  };

  const toggleFavorite = (id: string, type: ContentType) => {
    setData((prev) => {
      const exists = prev.favorites.some((f) => f.id === id && f.type === type);
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter((f) => !(f.id === id && f.type === type))
          : [...prev.favorites, { id, type, addedAt: Date.now() }],
      };
    });
  };

  const createCollection = (name: string) => {
    setData((prev) => ({
      ...prev,
      collections: [
        ...prev.collections,
        { id: `col-${Date.now()}`, name, items: [], createdAt: Date.now() },
      ],
    }));
  };

  const deleteCollection = (id: string) => {
    setData((prev) => ({
      ...prev,
      collections: prev.collections.filter((c) => c.id !== id),
    }));
  };

  const addToCollection = (collectionId: string, itemId: string, type: ContentType) => {
    setData((prev) => ({
      ...prev,
      collections: prev.collections.map((c) =>
        c.id === collectionId && !c.items.some((i) => i.id === itemId && i.type === type)
          ? { ...c, items: [...c.items, { id: itemId, type, addedAt: Date.now() }] }
          : c
      ),
    }));
  };

  const removeFromCollection = (collectionId: string, itemId: string) => {
    setData((prev) => ({
      ...prev,
      collections: prev.collections.map((c) =>
        c.id === collectionId
          ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
          : c
      ),
    }));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: data.favorites,
        collections: data.collections,
        isFavorite,
        toggleFavorite,
        createCollection,
        deleteCollection,
        addToCollection,
        removeFromCollection,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
