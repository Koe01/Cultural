export interface Story {
  id: string;
  title: string;
  region: string;
  category: 'legend' | 'folktale' | 'oral-history' | 'myth';
  excerpt: string;
  content: string;
  quote?: string;
  origin: string;
  language: string;
  relatedStories?: string[];
}

export interface Proverb {
  id: string;
  text: string;
  meaning: string;
  region: string;
  language?: string;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  storyCount: number;
  contentCounts?: Record<string, number>;
}

export const stories: Story[] = [
  {
    id: '1',
    title: 'The Weaver and the Moon',
    region: 'Oaxaca, Mexico',
    category: 'legend',
    origin: 'Zapotec tradition, circa 15th century',
    language: 'en',
    excerpt: 'A story of patience, craft, and celestial longing passed down through generations of artisans.',
    quote: 'The moon watched her weave for thirty nights, until the cloth itself began to glow.',
    content: `In a valley where the mountains meet the clouds, there lived a weaver named Xunxi who created textiles so intricate that travelers came from distant lands to witness her work.

Each thread she pulled carried the memory of her ancestors, and each pattern told a story older than the village itself. But Xunxi was lonely. She worked through the night, her loom the only companion to her thoughts.

One evening, she noticed the moon watching her through the window. Night after night, the moon returned, its light growing brighter as it observed her craft. Xunxi began weaving for the moon, creating patterns that reflected its phases, its mysteries, its silent companionship.

After thirty nights, something miraculous happened. The cloth on her loom began to emit its own light, soft and silver like moonbeams. The moon, moved by her dedication, had woven its own essence into her work.

From that night forward, Xunxi's textiles carried a luminescence that no other weaver could replicate. She was no longer lonely, for the moon had become part of her craft, watching over her and all who wore her creations.`,
    relatedStories: ['2', '3'],
  },
  {
    id: '2',
    title: 'The Bridge of Sighs',
    region: 'Kerala, India',
    category: 'folktale',
    origin: 'Malabari oral tradition',
    language: 'en',
    excerpt: 'When words cannot cross the river, breath builds a bridge.',
    quote: 'Three sighs for sorrow, three for hope, and three for the path between.',
    content: `In a time before written records, two villages stood on opposite banks of a river that could not be crossed during monsoon season. For six months of the year, families were separated, lovers kept apart, and news traveled only through the wind.

An old woman named Lakshmi, whose son lived across the river, would stand at the water's edge each evening and sigh three times—once for each month until the dry season returned. Her sighs carried such longing that they seemed to hover over the water.

One day, a young couple separated by the river heard Lakshmi's sighs and began to add their own—three sighs for their love. Soon, others joined. The villagers created a ritual: three sighs for sorrow, three for hope, and three for the path between.

Legend says that on the final night of monsoon season, if you listen carefully, you can hear the accumulated sighs of generations forming an invisible bridge across the water, carrying messages, love, and memory from one side to the other.`,
    relatedStories: ['1'],
  },
  {
    id: '3',
    title: 'The Last Library',
    region: 'Timbuktu, Mali',
    category: 'oral-history',
    origin: 'Songhay historical account, 16th century',
    language: 'en',
    excerpt: 'Not all libraries are built of stone; some are kept in the hearts of those who refuse to forget.',
    content: `When invaders came to burn the great libraries of Timbuktu, the scholars made a pact. Each would memorize entire manuscripts—not just the words, but the spaces between them, the marginalia, even the stains left by previous readers' fingers.

They scattered across the desert, carrying libraries in their minds. One man held fifty poems. Another, the complete history of three dynasties. A young woman memorized an entire treatise on astronomy, including the precise drawings of constellations.

For years, they lived as ordinary people—merchants, farmers, nomads—but they would gather in secret, reciting their texts to each other to ensure nothing was forgotten. They taught their children, who taught their children, creating a living library that could not be burned.

Centuries later, when it became safe again, they began to write everything down. But by then, the oral transmission had become its own form of preservation, and some families still gather to recite the old texts exactly as their ancestors memorized them, word for word, breath for breath.`,
    relatedStories: ['2'],
  },
  {
    id: '4',
    title: 'The Sound Keeper',
    region: 'Iceland',
    category: 'myth',
    origin: 'Norse-Icelandic folklore',
    language: 'en',
    excerpt: 'In the far north, there are those who collect vanishing sounds before they disappear forever.',
    quote: 'She kept the last echo of her grandmother\'s laughter in a small glass bottle by the window.',
    content: `In the coldest part of Iceland, where glaciers remember things that humans forget, there lived a woman who collected sounds. Not recordings—actual sounds, captured and preserved like rare butterflies.

She had the last creak of a door from a house demolished in 1823. The final toll of a church bell melted down for war. The exact pitch of her grandmother's laughter, kept in a small glass bottle by the window where morning light could warm it.

People thought her strange until sounds began to disappear. First, the songs of birds that had gone extinct. Then, the voices of elders who had passed without leaving recordings. The sound of rain on certain types of roofs no longer built. The particular squeak of leather boots made by a cobbler who had died without apprentices.

She became a keeper of acoustic memory, preserving not just sounds but the contexts around them—the time of day, the weather, the emotions they carried. Her collection was a museum of the audible past, proof that even air can hold history if you know how to listen.`,
  },
  {
    id: '5',
    title: 'The Tea Ceremony of Forgetting',
    region: 'Kyoto, Japan',
    category: 'legend',
    origin: 'Muromachi period tradition',
    language: 'en',
    excerpt: 'Sometimes, the greatest gift is not to remember, but to be released from memory.',
    content: `In a hidden tea house in Kyoto, there is a ceremony that only happens once in a person's lifetime. It is called the Tea of Forgetting, and it is offered to those who carry memories too heavy to bear.

The tea master prepares the tea in absolute silence, using water collected from a stream that flows backward one day each year. The leaves are picked from a tree that grows in the shadow of an ancient temple, never touched by direct sunlight.

As you drink, you are asked to speak aloud the memory you wish to release. The tea master listens without response, without judgment. When the cup is empty, so is the burden. The memory doesn't disappear—it transforms into something that no longer causes pain.

Those who have received this ceremony say it feels like setting down a stone you've carried up a mountain. The memory remains, but it no longer weighs upon your steps. You can choose to visit it, like an old photograph, but it no longer visits you uninvited in the night.`,
  },
];

export const proverbs: Proverb[] = [
  {
    id: 'p1',
    text: 'The mouth that eats salt should drink water',
    meaning: 'One should take responsibility for the consequences of their actions',
    region: 'Igbo, Nigeria',
  },
  {
    id: 'p2',
    text: 'A bridge is repaired while you stand on it',
    meaning: 'Sometimes you must solve problems while still experiencing them',
    region: 'Korean Peninsula',
  },
  {
    id: 'p3',
    text: 'The river may forget the boat, but the boat never forgets the river',
    meaning: 'Those who have been helped remember the helper, even if the helper forgets',
    region: 'Mekong Delta, Vietnam',
  },
  {
    id: 'p4',
    text: 'An old broom knows the corners of the house',
    meaning: 'Experience reveals what is hidden to newcomers',
    region: 'Yucatán, Mexico',
  },
  {
    id: 'p5',
    text: 'The shadow does not measure the tree',
    meaning: 'Appearances can be deceiving; external judgments miss internal truth',
    region: 'Amhara, Ethiopia',
  },
  {
    id: 'p6',
    text: 'A needle\'s eye can let in the light that reaches the heart',
    meaning: 'Small openings can lead to great understanding',
    region: 'Sufi tradition, Persia',
  },
  {
    id: 'p7',
    text: 'The stone in the water does not know how hot the one in the sun is',
    meaning: 'We cannot fully understand experiences we have not lived',
    region: 'Akan, Ghana',
  },
  {
    id: 'p8',
    text: 'Yesterday\'s rain falls through today\'s roof',
    meaning: 'Past neglect manifests in present problems',
    region: 'Tamil Nadu, India',
  },
];

export const regions: Region[] = [
  { id: 'oaxaca', name: 'Oaxaca, Mexico', description: 'Indigenous Zapotec and Mixtec traditions', storyCount: 12 },
  { id: 'kerala', name: 'Kerala, India', description: 'Malabari oral histories and folk wisdom', storyCount: 8 },
  { id: 'mali', name: 'Timbuktu, Mali', description: 'Songhay and Tuareg narratives', storyCount: 15 },
  { id: 'iceland', name: 'Iceland', description: 'Norse-Icelandic mythology and contemporary folklore', storyCount: 6 },
  { id: 'kyoto', name: 'Kyoto, Japan', description: 'Zen traditions and temple legends', storyCount: 11 },
  { id: 'ghana', name: 'Akan regions, Ghana', description: 'Ashanti wisdom and Anansi tales', storyCount: 19 },
  { id: 'vietnam', name: 'Mekong Delta, Vietnam', description: 'River folklore and agricultural proverbs', storyCount: 7 },
  { id: 'ethiopia', name: 'Amhara, Ethiopia', description: 'Highland wisdom and ancient sayings', storyCount: 9 },
];