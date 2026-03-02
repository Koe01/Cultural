import { useParams, Link } from 'react-router';
import { ArrowLeft, Share2, MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';
import FavoriteButton from '../components/FavoriteButton';
import CategoryBadge from '../components/CategoryBadge';
import { folkBeliefs } from '../data/folk-beliefs';

export default function FolkBeliefDetail() {
  const { id } = useParams();
  const belief = folkBeliefs.find((b) => b.id === id);

  if (!belief) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>İnanış bulunamadı</p>
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
            <FavoriteButton id={belief.id} type="folk-belief" />
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
            {belief.region}
          </span>
          <CategoryBadge type="folk-belief" className="ml-2" />
        </div>

        {/* Category badge */}
        <div className="mb-6">
          <span className="text-[12px] uppercase tracking-wider text-[var(--olive)]">{belief.category}</span>
        </div>

        {/* Belief text */}
        <h1
          className="text-[28px] leading-[1.35] mb-8"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          {belief.belief}
        </h1>

        <div className="h-[1px] bg-[var(--border)] mb-8" />

        {/* Explanation */}
        <div className="bg-white/60 backdrop-blur-sm rounded-sm border border-[var(--border)] p-6">
          <h3 className="text-[12px] uppercase tracking-wider text-[var(--olive)] mb-3">Açıklama</h3>
          <p className="text-[16px] leading-[1.75] text-[var(--ink)]">
            {belief.explanation}
          </p>
        </div>
      </article>

      <Navigation current="explore" />
    </div>
  );
}
