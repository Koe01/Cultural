import { useState } from 'react';
import Navigation from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export default function Submit() {
  const [formData, setFormData] = useState({
    title: '',
    region: '',
    category: '',
    story: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    alert('Thank you for sharing! Your story will be reviewed by our community.');
    setFormData({ title: '', region: '', category: '', story: '', name: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-24" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div className="sticky top-0 bg-[var(--cream)]/95 backdrop-blur-sm border-b border-[var(--border)] z-10">
        <div className="px-6 py-4 flex items-center">
          <Link to="/" className="text-[var(--ink)] p-2 -ml-2 active:scale-95 touch-manipulation">
            <ArrowLeft size={22} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Heading */}
        <h1
          className="text-[32px] leading-[1.2] mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          Share a Story
        </h1>
        <p className="text-[15px] text-[var(--ink-soft)] mb-8 leading-[1.7]">
          Help preserve the collective memory. Share a story, proverb, or saying from your region or heritage.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Story Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-[14px] mb-2 text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Story Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="The tale as it was told to you"
              className="w-full px-4 py-4 bg-white border border-[var(--border)] rounded-sm text-[16px] text-[var(--ink)] placeholder:text-[var(--olive-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--olive)] touch-manipulation"
              required
            />
          </div>

          {/* Region */}
          <div>
            <label
              htmlFor="region"
              className="block text-[14px] mb-2 text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Region or Origin
            </label>
            <input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Where did this story come from?"
              className="w-full px-4 py-4 bg-white border border-[var(--border)] rounded-sm text-[16px] text-[var(--ink)] placeholder:text-[var(--olive-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--olive)] touch-manipulation"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-[14px] mb-2 text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Type
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-4 bg-white border border-[var(--border)] rounded-sm text-[16px] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--olive)] touch-manipulation"
              required
            >
              <option value="">Bir tür seçin</option>
              <option value="legend">Efsane</option>
              <option value="folktale">Halk Masalı</option>
              <option value="myth">Mit</option>
              <option value="proverb">Atasözü</option>
              <option value="idiom">Deyim</option>
              <option value="oral-history">Sözlü Tarih</option>
              <option value="folk-poem">Mani</option>
              <option value="folk-song">Türkü</option>
              <option value="lullaby">Ninni</option>
              <option value="folk-belief">Halk İnanışı</option>
            </select>
          </div>

          {/* Story Content */}
          <div>
            <label
              htmlFor="story"
              className="block text-[14px] mb-2 text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              The Story
            </label>
            <textarea
              id="story"
              name="story"
              value={formData.story}
              onChange={handleChange}
              placeholder="Tell the story as it was passed to you. Include as much detail as you remember..."
              rows={8}
              className="w-full px-4 py-4 bg-white border border-[var(--border)] rounded-sm text-[16px] leading-[1.7] text-[var(--ink)] placeholder:text-[var(--olive-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--olive)] resize-none touch-manipulation"
              required
            />
          </div>

          {/* Your Name (Optional) */}
          <div>
            <label
              htmlFor="name"
              className="block text-[14px] mb-2 text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Your Name <span className="text-[var(--olive-muted)] italic">(optional)</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="How should we credit you?"
              className="w-full px-4 py-4 bg-white border border-[var(--border)] rounded-sm text-[16px] text-[var(--ink)] placeholder:text-[var(--olive-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--olive)] touch-manipulation"
            />
          </div>

          {/* Decorative Divider */}
          <div className="h-[1px] bg-[var(--border)] my-8" />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-5 bg-[var(--indigo-deep)] text-[var(--cream)] text-[17px] rounded-sm transition-all hover:bg-[var(--ink)] active:bg-[var(--ink-soft)] active:scale-[0.98] touch-manipulation"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Submit Story
          </button>

          {/* Note */}
          <p className="text-[13px] text-center text-[var(--olive-muted)] leading-[1.6] italic" style={{ fontFamily: 'var(--font-serif)' }}>
            All submissions are reviewed to ensure authenticity and respect for cultural traditions.
          </p>
        </form>
      </div>

      <Navigation current="more" />
    </div>
  );
}