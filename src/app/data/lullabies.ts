export interface Lullaby {
  id: string;
  title: string;
  lyrics: string;
  meaning?: string;
  region: string;
  language: string;
}

export const lullabies: Lullaby[] = [
  {
    id: 'l1',
    title: 'Dandini Dandini Dastana',
    lyrics: `Dandini dandini dastana
Danalar girmiş bostana
Kov bostancı danayı
Yemesin lahanayı

Dandini dandini danalı
Oğlum büyük hanımlı
Kızım büyük beyli mi
Uyusun da büyüsün`,
    meaning: 'Anadolu\'nun en bilinen ninnilerinden biridir. Basit ve tekrarlayan melodisi bebeği sakinleştirirken, sözleri kırsal yaşamın sıcak görüntülerini çizer. Annelerin bebeklerine güzel bir gelecek diledikleri bu ninni, nesiller boyu aktarılmıştır.',
    region: 'Anadolu, Türkiye',
    language: 'tr',
  },
  {
    id: 'l2',
    title: 'Twinkle Twinkle Little Star',
    lyrics: `Twinkle, twinkle, little star
How I wonder what you are
Up above the world so high
Like a diamond in the sky

When the blazing sun is gone
When he nothing shines upon
Then you show your little light
Twinkle, twinkle, all the night`,
    meaning: 'Based on Jane Taylor\'s 1806 poem "The Star," this lullaby has been translated into dozens of languages. Its melody was adapted from a French song "Ah! vous dirai-je, maman" and later used by Mozart in his famous variations. It represents the universal human wonder at the night sky.',
    region: 'England, United Kingdom',
    language: 'en',
  },
  {
    id: 'l3',
    title: 'Nana, Nana',
    lyrics: `Nana, nana, nana, nana
Mi niño tiene sueño
Bendito sea, bendito sea

A la nana, nana, nana
A la nanita nana
Duérmete lucerito
De la mañana`,
    meaning: 'A traditional Spanish-language lullaby widely sung across Latin America. The word "nana" itself is derived from the repeated soothing sounds mothers make. This version from Oaxaca blends indigenous musical scales with Spanish lyrical tradition.',
    region: 'Oaxaca, Mexico',
    language: 'es',
  },
  {
    id: 'l4',
    title: 'Uyusun Da Büyüsün',
    lyrics: `Uyusun da büyüsün
Ninni yavrum ninni
Tıpış tıpış yürüsün
Ninni yavrum ninni

Ay dede gel gel
Yıldız dede gel gel
Bebeğimi uyut da
Güzel rüya ver gel`,
    meaning: 'Karadeniz bölgesine ait bu ninni, annenin bebeğine büyümesi için dua ettiği, ay ve yıldızlardan yardım istediği şiirsel bir dilekçedir. Karadeniz melodilerinin kendine özgü tınısını taşır.',
    region: 'Karadeniz, Türkiye',
    language: 'tr',
  },
  {
    id: 'l5',
    title: 'Edo Komoriuta',
    lyrics: `Nen nen kororiyo okororiyo
Bōya wa yoi ko da nenne shina
Bōya no omori wa doko e itta
Ano yama koete sato e itta

Sato no miyage ni nani morota
Denden taiko ni shō no fue`,
    meaning: 'A traditional Edo-period Japanese lullaby. The lyrics tell of a nursemaid who has gone beyond the mountains to her hometown, bringing back a drum and a bamboo flute as gifts. It reflects the historical practice of young girls from rural areas working as nursemaids in cities.',
    region: 'Kyoto, Japan',
    language: 'ja',
  },
];
