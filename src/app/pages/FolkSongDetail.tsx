import { useParams, Link } from 'react-router';
import { ArrowLeft, Share2, MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';
import FavoriteButton from '../components/FavoriteButton';
import CategoryBadge from '../components/CategoryBadge';
import { folkSongs } from '../data/folk-songs';

export default function FolkSongDetail() {
  const { id } = useParams();
  const song = folkSongs.find((s) => s.id === id);

  if (!song) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Türkü bulunamadı</p>
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
            <FavoriteButton id={song.id} type="folk-song" />
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
            {song.region}
          </span>
          <CategoryBadge type="folk-song" className="ml-2" />
        </div>

        {/* Title */}
        <h1
          className="text-[36px] leading-[1.2] mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          {song.title}
        </h1>

        {/* Theme */}
        <p className="text-[13px] text-[var(--olive)] mb-8">{song.theme}</p>

        <div className="h-[1px] bg-[var(--border)] mb-8" />

        {/* Lyrics */}
        <div className="mb-10">
          <h3 className="text-[12px] uppercase tracking-wider text-[var(--olive)] mb-4">Sözler</h3>
          <div className="bg-white/60 backdrop-blur-sm rounded-sm border border-[var(--border)] p-6">
            {song.lyrics.split('\n').map((line, i) => (
              <p
                key={i}
                className={`text-[16px] leading-[2] text-[var(--ink)] ${line.trim() === '' ? 'h-4' : ''}`}
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Story behind the song */}
        <div>
          <h3 className="text-[12px] uppercase tracking-wider text-[var(--olive)] mb-4">Türkünün Hikayesi</h3>
          <p className="text-[15px] leading-[1.75] text-[var(--ink)]" style={{ fontFamily: 'var(--font-sans)' }}>
            {song.story}
          </p>
        </div>
      </article>

      <Navigation current="explore" />
    </div>
  );
}
