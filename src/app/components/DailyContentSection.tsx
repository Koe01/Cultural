import { Link } from 'react-router';
import { useDailyContent } from '../hooks/useDailyContent';
import { BookOpen, MessageSquareQuote, Languages, PenLine, MapPin } from 'lucide-react';

export default function DailyContentSection() {
  const { dailyStory, dailyProverb, dailyIdiom, dailyFolkPoem } = useDailyContent();

  const cards = [
    {
      label: 'GÜNÜN HİKAYESİ',
      icon: BookOpen,
      text: dailyStory.title,
      region: dailyStory.region,
      url: `/story/${dailyStory.id}`,
      color: 'var(--terracotta)',
    },
    {
      label: 'GÜNÜN ATASÖZÜ',
      icon: MessageSquareQuote,
      text: `"${dailyProverb.text}"`,
      region: dailyProverb.region,
      url: '/proverbs',
      color: 'var(--olive)',
    },
    {
      label: 'GÜNÜN DEYİMİ',
      icon: Languages,
      text: dailyIdiom.text,
      region: dailyIdiom.region,
      url: `/idiom/${dailyIdiom.id}`,
      color: 'var(--indigo-deep)',
    },
    {
      label: 'GÜNÜN MANİSİ',
      icon: PenLine,
      text: dailyFolkPoem.lines[0],
      region: dailyFolkPoem.region,
      url: `/folk-poem/${dailyFolkPoem.id}`,
      color: '#DB7093',
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-[13px] uppercase tracking-wider text-[var(--olive)] mb-4 px-6">
        Günün Seçmeleri
      </h3>
      <div
        className="flex gap-4 px-6 overflow-x-auto pb-2"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.url}
            className="flex-shrink-0 w-[260px] bg-white border border-[var(--border)] rounded-sm overflow-hidden active:scale-[0.97] transition-transform touch-manipulation"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="p-5">
              {/* Top: label + icon */}
              <div className="flex items-center gap-2 mb-4">
                <card.icon size={14} strokeWidth={1.5} color={card.color} />
                <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: card.color }}>
                  {card.label}
                </span>
              </div>

              {/* Text */}
              <p
                className="text-[17px] leading-[1.45] mb-4 line-clamp-2"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
              >
                {card.text}
              </p>

              {/* Region */}
              <div className="flex items-center gap-1">
                <MapPin size={11} strokeWidth={1.5} color="var(--olive-muted)" />
                <span className="text-[11px] text-[var(--olive-muted)]">{card.region}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
