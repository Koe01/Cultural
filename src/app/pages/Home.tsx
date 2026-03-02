import { Link } from 'react-router';
import Navigation from '../components/Navigation';
import DailyContentSection from '../components/DailyContentSection';
import { stories } from '../data/stories';
import { MapPin, Search } from 'lucide-react';

export default function Home() {
  const [heroStory, ...otherStories] = stories;

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-20" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <header className="pt-8 pb-6 px-6">
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="text-[32px] leading-[1.2] mb-2"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
            >
              Archive of<br />Collective Memory
            </h1>
            <p className="text-[15px] text-[var(--ink-soft)] mt-1">
              Stories, myths & wisdom passed through generations
            </p>
          </div>
          <Link to="/search" className="p-2 mt-1 text-[var(--ink-soft)] active:scale-95 transition-transform touch-manipulation">
            <Search size={22} strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      {/* Hero Story */}
      <Link to={`/story/${heroStory.id}`} className="block active:scale-[0.98] transition-transform">
        <article className="mx-6 mb-8 bg-white rounded-sm shadow-sm border border-[var(--border)] overflow-hidden touch-manipulation">
          <div className="p-6 pb-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={13} strokeWidth={1.5} color="var(--terracotta)" />
              <span className="text-[12px] uppercase tracking-wider text-[var(--terracotta)]" style={{ fontFamily: 'var(--font-sans)' }}>
                {heroStory.region}
              </span>
            </div>
            <h2
              className="text-[28px] leading-[1.25] mb-3"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
            >
              {heroStory.title}
            </h2>
            {heroStory.quote && (
              <blockquote
                className="border-l-2 border-[var(--olive)] pl-4 py-2 mb-3"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                <p className="text-[16px] leading-[1.6] text-[var(--ink-soft)]">
                  "{heroStory.quote}"
                </p>
              </blockquote>
            )}
            <p className="text-[15px] leading-[1.7] text-[var(--ink-soft)]">
              {heroStory.excerpt}
            </p>
          </div>
          <div className="h-[1px] bg-[var(--border)] mx-6" />
          <div className="px-6 py-3">
            <span className="text-[13px] text-[var(--olive)]">Read full story →</span>
          </div>
        </article>
      </Link>

      {/* Daily Content */}
      <DailyContentSection />

      {/* Other Stories */}
      <div className="px-6 space-y-6">
        <h3 className="text-[13px] uppercase tracking-wider text-[var(--olive)] mb-4">
          Recent Additions
        </h3>
        
        {otherStories.map((story, index) => (
          <Link key={story.id} to={`/story/${story.id}`} className="block active:opacity-70 transition-opacity touch-manipulation">
            <article className={`${index > 0 ? 'pt-6 border-t border-[var(--border)]' : ''}`}>
              <div className="flex items-start gap-3 mb-2">
                <MapPin size={12} strokeWidth={1.5} color="var(--olive-muted)" className="mt-1 flex-shrink-0" />
                <span className="text-[12px] text-[var(--olive-muted)]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {story.region}
                </span>
              </div>
              <h3
                className="text-[22px] leading-[1.3] mb-2 ml-6"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
              >
                {story.title}
              </h3>
              <p className="text-[14px] leading-[1.6] text-[var(--ink-soft)] ml-6">
                {story.excerpt}
              </p>
            </article>
          </Link>
        ))}
      </div>

      <Navigation current="home" />
    </div>
  );
}