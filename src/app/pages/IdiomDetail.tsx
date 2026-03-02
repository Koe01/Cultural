import { useParams, Link } from 'react-router';
import { ArrowLeft, Share2, MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';
import FavoriteButton from '../components/FavoriteButton';
import CategoryBadge from '../components/CategoryBadge';
import { idioms } from '../data/idioms';

export default function IdiomDetail() {
  const { id } = useParams();
  const idiom = idioms.find((i) => i.id === id);

  if (!idiom) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Deyim bulunamadı</p>
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
            <FavoriteButton id={idiom.id} type="idiom" />
            <button className="text-[var(--ink-soft)] p-2 active:scale-95 touch-manipulation">
              <Share2 size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <article className="w-full mx-auto px-6 py-8">
        {/* Region */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={14} strokeWidth={1.5} color="var(--terracotta)" />
          <span className="text-[12px] uppercase tracking-wider text-[var(--terracotta)]">
            {idiom.region}
          </span>
          <CategoryBadge type="idiom" className="ml-2" />
        </div>

        {/* Idiom text */}
        <h1
          className="text-[32px] leading-[1.25] mb-6"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          {idiom.text}
        </h1>

        <div className="h-[1px] bg-[var(--border)] mb-8" />

        {/* Meaning */}
        <div className="bg-white/60 backdrop-blur-sm rounded-sm border border-[var(--border)] p-6 mb-6">
          <h3 className="text-[12px] uppercase tracking-wider text-[var(--olive)] mb-3">Anlam</h3>
          <p className="text-[16px] leading-[1.7] text-[var(--ink)]">
            {idiom.meaning}
          </p>
        </div>

        {/* Usage */}
        <div className="bg-[var(--cream-warm)] rounded-sm border border-[var(--border)] p-6 mb-6">
          <h3 className="text-[12px] uppercase tracking-wider text-[var(--olive)] mb-3">Kullanım Örneği</h3>
          <p
            className="text-[15px] leading-[1.7] text-[var(--ink-soft)]"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            {idiom.usage}
          </p>
        </div>

        {/* Origin */}
        {idiom.origin && (
          <div className="mt-8">
            <h3 className="text-[12px] uppercase tracking-wider text-[var(--olive)] mb-3">Köken</h3>
            <p className="text-[15px] leading-[1.7] text-[var(--ink-soft)]">
              {idiom.origin}
            </p>
          </div>
        )}
      </article>

      <Navigation current="explore" />
    </div>
  );
}
