export interface FolkBelief {
  id: string;
  belief: string;
  explanation: string;
  category: string;
  region: string;
  language: string;
}

export const folkBeliefs: FolkBelief[] = [
  {
    id: 'fb1',
    belief: 'Nazar boncuğu kötü bakışlardan korur',
    explanation: 'Mavi cam boncuktan yapılan nazar boncuğu, kıskançlık veya hayranlıktan kaynaklanan "kötü göz"e karşı koruma sağladığına inanılır. Evlerin, arabaların ve bebeklerin üzerine asılır. Bu inanç Orta Asya\'dan Anadolu\'ya kadar geniş bir coğrafyada yaşar.',
    category: 'Koruma',
    region: 'Anadolu, Türkiye',
    language: 'tr',
  },
  {
    id: 'fb2',
    belief: 'Gece tırnak kesilmez',
    explanation: 'Karanlıkta tırnak kesmenin uğursuzluk getireceğine inanılır. Bu inanışın kökeni, aydınlatmanın yetersiz olduğu dönemlerde karanlıkta kesici alet kullanmanın tehlikeli olmasına dayanır.',
    category: 'Batıl İnanç',
    region: 'Anadolu, Türkiye',
    language: 'tr',
  },
  {
    id: 'fb3',
    belief: 'Breaking a mirror brings seven years of bad luck',
    explanation: 'This belief dates back to ancient Rome, where mirrors were thought to reflect a piece of the soul. Since the Romans believed the soul renewed itself every seven years, a broken mirror meant a damaged soul for that duration. The superstition spread throughout Europe and persists today.',
    category: 'Superstition',
    region: 'England, United Kingdom',
    language: 'en',
  },
  {
    id: 'fb4',
    belief: 'Kedi, özellikle kara kedi evden çıkarılmaz',
    explanation: 'Türk kültüründe kediler kutsal sayılır. Hz. Muhammed\'in kedisini çok sevdiği rivayeti nedeniyle kedilere zarar vermek günah kabul edilir. Kara kedinin uğur getirdiğine ve evi koruduğuna inanılır.',
    category: 'Hayvan İnancı',
    region: 'İstanbul, Türkiye',
    language: 'tr',
  },
  {
    id: 'fb5',
    belief: 'Placing shoes upside down brings bad luck',
    explanation: 'In many Middle Eastern and Central Asian cultures, shoes placed upside down are believed to invite misfortune. This stems from the association of the sole of the shoe with dirt and disrespect, and the belief that an inverted shoe disrespects the heavens above.',
    category: 'Superstition',
    region: 'Sufi tradition, Persia',
    language: 'en',
  },
  {
    id: 'fb6',
    belief: '四 (shi/four) is an unlucky number',
    explanation: 'In Japanese (and Chinese) culture, the number four is considered extremely unlucky because its pronunciation is identical to the word for "death" (死). Many buildings skip the 4th floor, gifts are never given in sets of four, and hospital rooms avoid the number.',
    category: 'Number Belief',
    region: 'Kyoto, Japan',
    language: 'en',
  },
  {
    id: 'fb7',
    belief: 'Eşikte oturulmaz',
    explanation: 'Kapı eşiğinde oturmak veya eşikte durup konuşmak uğursuzluk getirir. Eşik, ev ile dış dünya arasındaki sınır olarak kabul edilir; bu sınırda kalmak ne içeride ne dışarıda olmak anlamına gelir, kararsızlık ve talihsizlik simgesidir.',
    category: 'Batıl İnanç',
    region: 'Anadolu, Türkiye',
    language: 'tr',
  },
  {
    id: 'fb8',
    belief: 'Whistling at night summons snakes (or spirits)',
    explanation: 'Found across cultures from West Africa to Turkey to Hawaii, the belief that whistling after dark attracts supernatural beings or dangerous creatures. In Turkish culture, it is said to summon djinn. In Hawaiian tradition, it calls the Night Marchers — spirits of ancient warriors.',
    category: 'Supernatural',
    region: 'Akan regions, Ghana',
    language: 'en',
  },
];
