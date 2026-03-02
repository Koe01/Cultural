import { Link } from 'react-router';
import { BookOpen, Compass, MessageSquareQuote, PenLine } from 'lucide-react';

interface NavigationProps {
  current?: 'home' | 'explore' | 'proverbs' | 'submit';
}

export default function Navigation({ current = 'home' }: NavigationProps) {
  const links = [
    { to: '/', icon: BookOpen, label: 'Stories', id: 'home' },
    { to: '/explore', icon: Compass, label: 'Explore', id: 'explore' },
    { to: '/proverbs', icon: MessageSquareQuote, label: 'Proverbs', id: 'proverbs' },
    { to: '/submit', icon: PenLine, label: 'Submit', id: 'submit' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--cream)] border-t border-[var(--border)] z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex justify-around items-center py-2 px-2 w-full max-w-full">
        {links.map(({ to, icon: Icon, label, id }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-1 py-2 px-4 min-h-[56px] min-w-[64px] justify-center transition-colors active:scale-95 ${
              current === id ? 'text-[var(--terracotta)]' : 'text-[var(--ink-soft)]'
            }`}
          >
            <Icon size={22} strokeWidth={1.5} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)' }}>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
