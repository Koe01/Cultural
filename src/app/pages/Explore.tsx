import Navigation from '../components/Navigation';
import { regions } from '../data/stories';
import { ChevronRight } from 'lucide-react';

export default function Explore() {
  return (
    <div className="min-h-screen bg-[var(--cream)] pb-20" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <header className="pt-8 pb-8 px-6">
        <h1
          className="text-[32px] leading-[1.2] mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          Explore by Region
        </h1>
        <p className="text-[15px] text-[var(--ink-soft)] mt-2">
          Stories organized by their place of origin
        </p>
      </header>

      {/* Map-inspired minimal visual */}
      <div className="mx-6 mb-8 h-[200px] bg-[var(--cream-warm)] rounded-sm border border-[var(--border)] flex items-center justify-center relative overflow-hidden">
        {/* Abstract map lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 390 200">
          <path
            d="M 50 100 Q 100 50, 150 100 T 250 100 T 340 100"
            stroke="var(--olive)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 100 50 L 100 150"
            stroke="var(--terracotta)"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M 200 30 L 200 170"
            stroke="var(--terracotta)"
            strokeWidth="0.5"
            fill="none"
          />
          <circle cx="150" cy="100" r="3" fill="var(--terracotta)" />
          <circle cx="250" cy="100" r="3" fill="var(--olive)" />
          <circle cx="100" cy="100" r="2" fill="var(--indigo-deep)" />
        </svg>
        <p
          className="text-[14px] text-[var(--olive)] relative z-10"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          Stories from across the world
        </p>
      </div>

      {/* Region List */}
      <div className="px-6">
        <div className="space-y-0">
          {regions.map((region, index) => (
            <button
              key={region.id}
              className="w-full text-left py-6 px-2 border-b border-[var(--border)] transition-all hover:bg-[var(--cream-warm)] active:bg-[var(--cream-warm)] active:scale-[0.98] touch-manipulation"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h3
                    className="text-[20px] leading-[1.3] mb-1"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
                  >
                    {region.name}
                  </h3>
                  <p className="text-[13px] text-[var(--ink-soft)] mb-1">
                    {region.description}
                  </p>
                  <span className="text-[12px] text-[var(--olive-muted)]">
                    {region.storyCount} stories collected
                  </span>
                </div>
                <ChevronRight size={18} strokeWidth={1.5} color="var(--olive-muted)" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom spacing note */}
      <div className="px-6 mt-12 pb-4">
        <p className="text-[13px] text-center text-[var(--olive-muted)] italic" style={{ fontFamily: 'var(--font-serif)' }}>
          Each region holds countless untold stories
        </p>
      </div>

      <Navigation current="explore" />
    </div>
  );
}