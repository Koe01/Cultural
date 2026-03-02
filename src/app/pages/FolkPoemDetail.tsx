import { useParams, Link } from 'react-router';
import { ArrowLeft, Share2, MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';
import FavoriteButton from '../components/FavoriteButton';
import CategoryBadge from '../components/CategoryBadge';
import { folkPoems } from '../data/folk-poems';

export default function FolkPoemDetail() {
  const { id } = useParams();
  const poem = folkPoems.find((p) => p.id === id);

  if (!poem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Mani bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--texture-bg)] pb-24" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Sticky Header */}
      <div className="sticky top-0 bg-[var(--cream)]/95 backdrop-blur-sm border-b border-[var(--border)] z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link to="/explore" className="text-[var(--ink)] p-2 -ml-2 active:scale-95 touch-manipulation">
            <ArrowLeft size={22} strokeWidth={1.5} />
          </Link>
          <div className="flex items-center gap-2">
            <FavoriteButton id={poem.id} type="folk-poem" />
            <button className="text-[var(--ink-soft)] p-2 active:scale-95 touch-manipulation">
              <Share2 size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <article className="w-full mx-auto px-6 py-8">
        {/* Region & Badge */}
        <div className="flex items-center gap-2 mb-6">
          <MapPin size={14} strokeWidth={1.5} color="var(--terracotta)" />
          <span className="text-[12px] uppercase tracking-wider text-[var(--terracotta)]">
            {poem.region}
          </span>
          <CategoryBadge type="folk-poem" className="ml-2" />
        </div>

        {/* Theme */}
        <p className="text-[13px] text-[var(--olive)] mb-8 uppercase tracking-wider">{poem.theme}</p>

        <div className="h-[1px] bg-[var(--border)] mb-12" />

        {/* Poem Lines - centered, large, serif, italic */}
        <div className="text-center py-8">
          <div className="w-12 h-[2px] bg-[var(--terracotta)] mb-10 mx-auto" />
          {poem.lines.map((line, i) => (
            <p
              key={i}
              className="text-[24px] leading-[2] text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              {line}
            </p>
          ))}
          <div className="w-8 h-[1px] bg-[var(--olive-muted)] mt-10 mx-auto" />
        </div>
      </article>

      <Navigation current="explore" />
    </div>
  );
}
