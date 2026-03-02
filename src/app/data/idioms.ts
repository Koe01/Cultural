export interface Idiom {
  id: string;
  text: string;
  meaning: string;
  usage: string;
  origin?: string;
  region: string;
  language: string;
}

export const idioms: Idiom[] = [
  {
    id: 'i1',
    text: 'Taşıma su ile değirmen dönmez',
    meaning: 'Başkalarının sürekli yardımıyla bir iş yürütülemez; kendi kaynaklarınız olmalıdır.',
    usage: '"Her seferinde komşudan borç alarak geçinemezsin, taşıma su ile değirmen dönmez."',
    origin: 'Anadolu kırsal yaşamından doğan, değirmencilik geleneğine dayanan bir söz.',
    region: 'Anadolu, Türkiye',
    language: 'tr',
  },
  {
    id: 'i2',
    text: 'Nazar değmek',
    meaning: 'Kıskançlık veya hayranlıktan kaynaklanan kötü enerjiye maruz kalmak.',
    usage: '"Çocuk hastalandı, nazar değmiş olmasın."',
    origin: 'Orta Asya ve Anadolu halk inancından gelen kadim bir kavram.',
    region: 'Anadolu, Türkiye',
    language: 'tr',
  },
  {
    id: 'i3',
    text: 'Break a leg',
    meaning: 'Good luck — used especially before a performance.',
    usage: '"You\'re going on stage tonight? Break a leg!"',
    origin: 'Theatrical superstition — saying "good luck" was considered bad luck.',
    region: 'England, United Kingdom',
    language: 'en',
  },
  {
    id: 'i4',
    text: 'Avoir le cafard',
    meaning: 'To feel down or depressed — literally "to have the cockroach."',
    usage: '"Depuis qu\'il est parti, j\'ai le cafard."',
    origin: 'Popularized by Charles Baudelaire in his poetry collection "Les Fleurs du mal."',
    region: 'France',
    language: 'fr',
  },
  {
    id: 'i5',
    text: '猿も木から落ちる (Saru mo ki kara ochiru)',
    meaning: 'Even monkeys fall from trees — even experts can make mistakes.',
    usage: 'Used to console someone who failed at something they are usually good at.',
    origin: 'Japanese proverb rooted in observation of nature.',
    region: 'Kyoto, Japan',
    language: 'ja',
  },
  {
    id: 'i6',
    text: 'Echar agua al mar',
    meaning: 'To throw water into the sea — to do something pointless.',
    usage: '"Intentar convencerlo es echar agua al mar."',
    origin: 'Spanish idiom reflecting the futility of unnecessary action.',
    region: 'Oaxaca, Mexico',
    language: 'es',
  },
  {
    id: 'i7',
    text: 'Dolu kavanoza arı üşüşür',
    meaning: 'Bees swarm to a full jar — people are attracted to wealth and abundance.',
    usage: '"Zengin olunca herkes dost oldu, dolu kavanoza arı üşüşür."',
    region: 'Karadeniz, Türkiye',
    language: 'tr',
  },
  {
    id: 'i8',
    text: 'Ins Fettnäpfchen treten',
    meaning: 'To step into the fat dish — to accidentally say something offensive or embarrassing.',
    usage: '"Er ist wieder ins Fettnäpfchen getreten, als er nach ihrem Alter fragte."',
    origin: 'From the old German custom of keeping a dish of fat by the door for greasing boots.',
    region: 'Bavaria, Germany',
    language: 'de',
  },
];
