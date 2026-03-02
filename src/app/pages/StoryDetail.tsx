import { useParams, Link } from 'react-router';
import { ArrowLeft, Share2, MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';
import FavoriteButton from '../components/FavoriteButton';
import { stories } from '../data/stories';

export default function StoryDetail() {
  const { id } = useParams();
  const story = stories.find((s) => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Story not found</p>
      </div>
    );
  }

  const relatedStories = story.relatedStories
    ? stories.filter((s) => story.relatedStories?.includes(s.id))
    : [];

  return (
    <div className="min-h-screen bg-[var(--texture-bg)] pb-24" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Header with Back Button */}
      <div className="sticky top-0 bg-[var(--cream)]/95 backdrop-blur-sm border-b border-[var(--border)] z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-[var(--ink)] p-2 -ml-2 active:scale-95 touch-manipulation">
            <ArrowLeft size={22} strokeWidth={1.5} />
          </Link>
          <div className="flex items-center gap-2">
            <FavoriteButton id={story.id} type="story" />
            <button className="text-[var(--ink-soft)] p-2 active:scale-95 touch-manipulation">
              <Share2 size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <article className="w-full mx-auto px-6 py-8">
        {/* Region */}
        <div className="flex items-center gap-2 mb-6">
          <MapPin size={14} strokeWidth={1.5} color="var(--terracotta)" />
          <span className="text-[12px] uppercase tracking-wider text-[var(--terracotta)]">
            {story.region}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-[36px] leading-[1.2] mb-4"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          {story.title}
        </h1>

        {/* Origin */}
        <p className="text-[13px] text-[var(--olive-muted)] mb-8 italic" style={{ fontFamily: 'var(--font-serif)' }}>
          {story.origin}
        </p>

        {/* Divider */}
        <div className="h-[1px] bg-[var(--border)] mb-8" />

        {/* Body Text with Drop Cap */}
        <div className="space-y-4">
          {story.content.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className={`text-[16px] leading-[1.75] text-[var(--ink)] ${
                index === 0 ? 'first-letter:text-[56px] first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:leading-[48px] first-letter:text-[var(--terracotta)]' : ''
              }`}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Pull Quote */}
        {story.quote && (
          <blockquote className="my-12 px-6 py-8 bg-[var(--cream-warm)] border-l-[3px] border-[var(--terracotta)]">
            <p
              className="text-[20px] leading-[1.6] text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              "{story.quote}"
            </p>
          </blockquote>
        )}

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <h3
              className="text-[18px] mb-6"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
            >
              Related from this region
            </h3>
            <div className="space-y-5">
              {relatedStories.map((related) => (
                <Link key={related.id} to={`/story/${related.id}`} className="block active:opacity-70 transition-opacity touch-manipulation">
                  <div className="flex flex-col gap-2">
                    <h4
                      className="text-[18px] leading-[1.3]"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
                    >
                      {related.title}
                    </h4>
                    <p className="text-[14px] text-[var(--ink-soft)] line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Navigation />
    </div>
  );
}