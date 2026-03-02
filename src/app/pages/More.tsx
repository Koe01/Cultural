import { Link } from 'react-router';
import Navigation from '../components/Navigation';
import { PenLine, MessageSquareQuote, Info, ChevronRight } from 'lucide-react';

export default function More() {
  const menuItems = [
    { to: '/submit', icon: PenLine, label: 'Hikaye Paylaş', description: 'Kültürel mirasınızı paylaşın' },
    { to: '/proverbs', icon: MessageSquareQuote, label: 'Atasözleri Carousel', description: 'Atasözlerini keşfedin' },
  ];

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-20" style={{ fontFamily: 'var(--font-sans)' }}>
      <header className="pt-8 pb-6 px-6">
        <h1
          className="text-[32px] leading-[1.2] mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          Daha Fazla
        </h1>
        <p className="text-[15px] text-[var(--ink-soft)] mt-1">
          Ek özellikler ve ayarlar
        </p>
      </header>

      <div className="px-6">
        <div className="space-y-0">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-4 py-5 border-b border-[var(--border)] active:bg-[var(--cream-warm)] active:scale-[0.98] transition-all touch-manipulation"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--cream-warm)] flex items-center justify-center flex-shrink-0">
                <item.icon size={20} strokeWidth={1.5} color="var(--indigo-deep)" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-[17px] leading-[1.3]"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
                >
                  {item.label}
                </h3>
                <p className="text-[13px] text-[var(--ink-soft)] mt-0.5">
                  {item.description}
                </p>
              </div>
              <ChevronRight size={18} strokeWidth={1.5} color="var(--olive-muted)" />
            </Link>
          ))}

          {/* About placeholder */}
          <div className="flex items-center gap-4 py-5 border-b border-[var(--border)] opacity-60">
            <div className="w-10 h-10 rounded-full bg-[var(--cream-warm)] flex items-center justify-center flex-shrink-0">
              <Info size={20} strokeWidth={1.5} color="var(--indigo-deep)" />
            </div>
            <div className="flex-1">
              <h3
                className="text-[17px] leading-[1.3]"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
              >
                Hakkında
              </h3>
              <p className="text-[13px] text-[var(--ink-soft)] mt-0.5">
                Yakında
              </p>
            </div>
            <ChevronRight size={18} strokeWidth={1.5} color="var(--olive-muted)" />
          </div>
        </div>
      </div>

      <div className="px-6 mt-12 pb-4">
        <p className="text-[13px] text-center text-[var(--olive-muted)] italic" style={{ fontFamily: 'var(--font-serif)' }}>
          Kültürel miras, paylaştıkça yaşar
        </p>
      </div>

      <Navigation current="more" />
    </div>
  );
}
