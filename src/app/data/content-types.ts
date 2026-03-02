export type ContentType = 'story' | 'proverb' | 'idiom' | 'folk-poem' | 'folk-song' | 'lullaby' | 'folk-belief';

export interface SearchableItem {
  id: string;
  type: ContentType;
  title: string;
  secondaryText: string;
  region: string;
  category?: string;
  url: string;
}

export const contentTypeLabels: Record<ContentType, string> = {
  story: 'Hikaye',
  proverb: 'Atasözü',
  idiom: 'Deyim',
  'folk-poem': 'Mani',
  'folk-song': 'Türkü',
  lullaby: 'Ninni',
  'folk-belief': 'Halk İnanışı',
};

import { stories, proverbs } from './stories';
import { idioms } from './idioms';
import { folkPoems } from './folk-poems';
import { folkSongs } from './folk-songs';
import { lullabies } from './lullabies';
import { folkBeliefs } from './folk-beliefs';

export function buildSearchIndex(): SearchableItem[] {
  const items: SearchableItem[] = [];

  stories.forEach((s) => {
    items.push({
      id: s.id,
      type: 'story',
      title: s.title,
      secondaryText: s.excerpt,
      region: s.region,
      category: s.category,
      url: `/story/${s.id}`,
    });
  });

  proverbs.forEach((p) => {
    items.push({
      id: p.id,
      type: 'proverb',
      title: p.text,
      secondaryText: p.meaning,
      region: p.region,
      url: `/proverbs`,
    });
  });

  idioms.forEach((i) => {
    items.push({
      id: i.id,
      type: 'idiom',
      title: i.text,
      secondaryText: i.meaning,
      region: i.region,
      url: `/idiom/${i.id}`,
    });
  });

  folkPoems.forEach((fp) => {
    items.push({
      id: fp.id,
      type: 'folk-poem',
      title: fp.lines[0],
      secondaryText: fp.lines.join(' / '),
      region: fp.region,
      category: fp.theme,
      url: `/folk-poem/${fp.id}`,
    });
  });

  folkSongs.forEach((fs) => {
    items.push({
      id: fs.id,
      type: 'folk-song',
      title: fs.title,
      secondaryText: fs.story,
      region: fs.region,
      category: fs.theme,
      url: `/folk-song/${fs.id}`,
    });
  });

  lullabies.forEach((l) => {
    items.push({
      id: l.id,
      type: 'lullaby',
      title: l.title,
      secondaryText: l.lyrics.split('\n')[0],
      region: l.region,
      url: `/lullaby/${l.id}`,
    });
  });

  folkBeliefs.forEach((fb) => {
    items.push({
      id: fb.id,
      type: 'folk-belief',
      title: fb.belief,
      secondaryText: fb.explanation,
      region: fb.region,
      category: fb.category,
      url: `/folk-belief/${fb.id}`,
    });
  });

  return items;
}
