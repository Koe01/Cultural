import { stories, proverbs } from '../data/stories';
import { idioms } from '../data/idioms';
import { folkPoems } from '../data/folk-poems';

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getDailyItem<T>(items: T[]): T {
  const dayOfYear = getDayOfYear();
  return items[dayOfYear % items.length];
}

export function useDailyContent() {
  return {
    dailyStory: getDailyItem(stories),
    dailyProverb: getDailyItem(proverbs),
    dailyIdiom: getDailyItem(idioms),
    dailyFolkPoem: getDailyItem(folkPoems),
  };
}
