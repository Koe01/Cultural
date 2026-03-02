import { Link } from 'react-router';
import { BookOpen, Compass, Search, Heart, MoreHorizontal } from 'lucide-react';

interface NavigationProps {
  current?: 'home' | 'explore' | 'search' | 'library' | 'more';
}

export default function Navigation({ current = 'home' }: NavigationProps) {
  const links = [
    { to: '/', icon: BookOpen, label: 'Ana Sayfa', id: 'home' },
    { to: '/explore', icon: Compass, label: 'Keşfet', id: 'explore' },
    { to: '/search', icon: Search, label: 'Ara', id: 'search' },
    { to: '/library', icon: Heart, label: 'Kütüphanem', id: 'library' },
    { to: '/more', icon: MoreHorizontal, label: 'Daha Fazla', id: 'more' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--cream)] border-t border-[var(--border)] z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex justify-around items-center py-2 px-1 w-full max-w-full">
        {links.map(({ to, icon: Icon, label, id }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-1 py-2 px-2 min-h-[56px] min-w-[56px] justify-center transition-colors active:scale-95 ${
              current === id ? 'text-[var(--terracotta)]' : 'text-[var(--ink-soft)]'
            }`}
          >
            <Icon size={22} strokeWidth={1.5} />
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-sans)' }}>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
