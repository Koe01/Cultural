import { useState } from 'react';
import Navigation from '../components/Navigation';
import { proverbs } from '../data/stories';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Proverbs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const currentProverb = proverbs[currentIndex];

  // Minimum swipe distance (in px) to trigger action
  const minSwipeDistance = 50;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % proverbs.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + proverbs.length) % proverbs.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset end position
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div 
      className="min-h-screen bg-[var(--texture-bg)] pb-20 flex flex-col" 
      style={{ fontFamily: 'var(--font-sans)' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <header className="pt-8 pb-6 px-6">
        <h1
          className="text-[28px] leading-[1.2] mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          Proverbs & Idioms
        </h1>
        <p className="text-[14px] text-[var(--ink-soft)]">
          Wisdom distilled into a single breath
        </p>
      </header>

      {/* Main Proverb Display */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full px-2">
          {/* Decorative element */}
          <div className="w-12 h-[2px] bg-[var(--terracotta)] mb-8 mx-auto" />

          {/* Proverb Text */}
          <blockquote
            className="text-[26px] leading-[1.5] text-center mb-8"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
          >
            "{currentProverb.text}"
          </blockquote>

          {/* Meaning */}
          <div className="bg-white/60 backdrop-blur-sm rounded-sm border border-[var(--border)] p-5 mb-6">
            <p className="text-[15px] leading-[1.7] text-[var(--ink-soft)] text-center">
              {currentProverb.meaning}
            </p>
          </div>

          {/* Region */}
          <p className="text-[13px] text-center text-[var(--olive)] mb-2">
            {currentProverb.region}
          </p>

          {/* Decorative element */}
          <div className="w-8 h-[1px] bg-[var(--olive-muted)] mt-8 mx-auto" />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between mx-auto">
          <button
            onClick={goToPrevious}
            className="w-14 h-14 rounded-full border border-[var(--border)] bg-white flex items-center justify-center text-[var(--ink)] transition-all hover:bg-[var(--cream-warm)] active:scale-95 touch-manipulation"
            aria-label="Previous proverb"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>

          <div className="text-center">
            <span className="text-[13px] text-[var(--olive-muted)]">
              {currentIndex + 1} of {proverbs.length}
            </span>
          </div>

          <button
            onClick={goToNext}
            className="w-14 h-14 rounded-full border border-[var(--border)] bg-white flex items-center justify-center text-[var(--ink)] transition-all hover:bg-[var(--cream-warm)] active:scale-95 touch-manipulation"
            aria-label="Next proverb"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {proverbs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${
                index === currentIndex
                  ? 'w-6 h-1.5 bg-[var(--terracotta)]'
                  : 'w-1.5 h-1.5 bg-[var(--olive-muted)] rounded-full'
              }`}
              aria-label={`Go to proverb ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <Navigation current="more" />
    </div>
  );
}