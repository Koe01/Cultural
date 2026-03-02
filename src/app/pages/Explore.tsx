import Navigation from '../components/Navigation';
import ContentCard from '../components/ContentCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { regions, stories, proverbs } from '../data/stories';
import { idioms } from '../data/idioms';
import { folkPoems } from '../data/folk-poems';
import { folkSongs } from '../data/folk-songs';
import { lullabies } from '../data/lullabies';
import { folkBeliefs } from '../data/folk-beliefs';
import { ChevronRight } from 'lucide-react';

export default function Explore() {
  return (
    <div className="min-h-screen bg-[var(--cream)] pb-20" style={{ fontFamily: 'var(--font-sans)' }}>
      <header className="pt-8 pb-4 px-6">
        <h1
          className="text-[32px] leading-[1.2] mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
        >
          Keşfet
        </h1>
        <p className="text-[15px] text-[var(--ink-soft)] mt-1">
          Kültürel mirası kategorilere göre keşfedin
        </p>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <div className="px-6 mb-4">
          <TabsList className="w-full overflow-x-auto flex-nowrap justify-start bg-[var(--cream-warm)] h-auto p-1 gap-1">
            <TabsTrigger value="all" className="text-[13px] px-3 py-2 flex-shrink-0 rounded-lg">Tümü</TabsTrigger>
            <TabsTrigger value="stories" className="text-[13px] px-3 py-2 flex-shrink-0 rounded-lg">Hikayeler</TabsTrigger>
            <TabsTrigger value="proverbs" className="text-[13px] px-3 py-2 flex-shrink-0 rounded-lg">Atasözleri</TabsTrigger>
            <TabsTrigger value="idioms" className="text-[13px] px-3 py-2 flex-shrink-0 rounded-lg">Deyimler</TabsTrigger>
            <TabsTrigger value="folk-poems" className="text-[13px] px-3 py-2 flex-shrink-0 rounded-lg">Maniler</TabsTrigger>
            <TabsTrigger value="folk-songs" className="text-[13px] px-3 py-2 flex-shrink-0 rounded-lg">Türküler</TabsTrigger>
            <TabsTrigger value="lullabies" className="text-[13px] px-3 py-2 flex-shrink-0 rounded-lg">Ninniler</TabsTrigger>
            <TabsTrigger value="folk-beliefs" className="text-[13px] px-3 py-2 flex-shrink-0 rounded-lg">İnanışlar</TabsTrigger>
          </TabsList>
        </div>

        {/* All - Map + Regions */}
        <TabsContent value="all" className="px-6">
          {/* Map visual */}
          <div className="mb-6 h-[180px] bg-[var(--cream-warm)] rounded-sm border border-[var(--border)] flex items-center justify-center relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 390 180">
              <path d="M 50 90 Q 100 40, 150 90 T 250 90 T 340 90" stroke="var(--olive)" strokeWidth="1" fill="none" />
              <path d="M 100 40 L 100 140" stroke="var(--terracotta)" strokeWidth="0.5" fill="none" />
              <path d="M 200 25 L 200 155" stroke="var(--terracotta)" strokeWidth="0.5" fill="none" />
              <circle cx="150" cy="90" r="3" fill="var(--terracotta)" />
              <circle cx="250" cy="90" r="3" fill="var(--olive)" />
              <circle cx="100" cy="90" r="2" fill="var(--indigo-deep)" />
            </svg>
            <p
              className="text-[14px] text-[var(--olive)] relative z-10"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              Dünya genelinden hikayeler
            </p>
          </div>

          {/* Region list */}
          <div className="space-y-0">
            {regions.map((region) => (
              <button
                key={region.id}
                className="w-full text-left py-5 px-2 border-b border-[var(--border)] transition-all hover:bg-[var(--cream-warm)] active:bg-[var(--cream-warm)] active:scale-[0.98] touch-manipulation"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className="text-[18px] leading-[1.3] mb-1"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
                    >
                      {region.name}
                    </h3>
                    <p className="text-[13px] text-[var(--ink-soft)] mb-1">
                      {region.description}
                    </p>
                    <span className="text-[12px] text-[var(--olive-muted)]">
                      {region.storyCount} hikaye
                    </span>
                  </div>
                  <ChevronRight size={18} strokeWidth={1.5} color="var(--olive-muted)" />
                </div>
              </button>
            ))}
          </div>
        </TabsContent>

        {/* Stories */}
        <TabsContent value="stories" className="px-6">
          <div className="space-y-3">
            {stories.map((story) => (
              <ContentCard key={story.id} item={{ type: 'story', data: story }} variant="full" />
            ))}
          </div>
        </TabsContent>

        {/* Proverbs */}
        <TabsContent value="proverbs" className="px-6">
          <div className="space-y-3">
            {proverbs.map((proverb) => (
              <ContentCard key={proverb.id} item={{ type: 'proverb', data: proverb }} variant="full" />
            ))}
          </div>
        </TabsContent>

        {/* Idioms */}
        <TabsContent value="idioms" className="px-6">
          <div className="space-y-3">
            {idioms.map((idiom) => (
              <ContentCard key={idiom.id} item={{ type: 'idiom', data: idiom }} variant="full" />
            ))}
          </div>
        </TabsContent>

        {/* Folk Poems */}
        <TabsContent value="folk-poems" className="px-6">
          <div className="space-y-3">
            {folkPoems.map((poem) => (
              <ContentCard key={poem.id} item={{ type: 'folk-poem', data: poem }} variant="full" />
            ))}
          </div>
        </TabsContent>

        {/* Folk Songs */}
        <TabsContent value="folk-songs" className="px-6">
          <div className="space-y-3">
            {folkSongs.map((song) => (
              <ContentCard key={song.id} item={{ type: 'folk-song', data: song }} variant="full" />
            ))}
          </div>
        </TabsContent>

        {/* Lullabies */}
        <TabsContent value="lullabies" className="px-6">
          <div className="space-y-3">
            {lullabies.map((lullaby) => (
              <ContentCard key={lullaby.id} item={{ type: 'lullaby', data: lullaby }} variant="full" />
            ))}
          </div>
        </TabsContent>

        {/* Folk Beliefs */}
        <TabsContent value="folk-beliefs" className="px-6">
          <div className="space-y-3">
            {folkBeliefs.map((belief) => (
              <ContentCard key={belief.id} item={{ type: 'folk-belief', data: belief }} variant="full" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="px-6 mt-12 pb-4">
        <p className="text-[13px] text-center text-[var(--olive-muted)] italic" style={{ fontFamily: 'var(--font-serif)' }}>
          Her bölge, sayısız anlatılmamış hikaye barındırır
        </p>
      </div>

      <Navigation current="explore" />
    </div>
  );
}
