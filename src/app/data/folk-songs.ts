export interface FolkSong {
  id: string;
  title: string;
  lyrics: string;
  story: string;
  region: string;
  theme: string;
  language: string;
}

export const folkSongs: FolkSong[] = [
  {
    id: 'fs1',
    title: 'Uzun İnce Bir Yoldayım',
    lyrics: `Uzun ince bir yoldayım
Gidiyorum gündüz gece
Bilmiyorum ne haldeyim
Gidiyorum gündüz gece

Dünyaya geldiğim anda
Yürüdüm aynı zamanda
İki kapılı bir handa
Gidiyorum gündüz gece`,
    story: 'Âşık Veysel\'in hayatı ve felsefeyi yansıtan en ünlü eseridir. Kör bir ozan olan Veysel, bu türküde yaşamın geçiciliğini ve insanın dünya üzerindeki yolculuğunu anlatır. Sivas\'ın Sivrialan köyünde doğan Veysel, Türk halk müziğinin en büyük temsilcilerinden biridir.',
    region: 'Sivas, Türkiye',
    theme: 'Yaşam',
    language: 'tr',
  },
  {
    id: 'fs2',
    title: 'Greensleeves',
    lyrics: `Alas, my love, you do me wrong
To cast me off discourteously
For I have loved you well and long
Delighting in your company

Greensleeves was all my joy
Greensleeves was my delight
Greensleeves was my heart of gold
And who but my lady Greensleeves`,
    story: 'One of the most iconic English folk songs, dating back to the Elizabethan era. Often attributed to Henry VIII, though this is disputed. The song speaks of unrequited love and has been adapted countless times across centuries. Its haunting melody has become synonymous with English folk tradition.',
    region: 'England, United Kingdom',
    theme: 'Love',
    language: 'en',
  },
  {
    id: 'fs3',
    title: 'Çökertme',
    lyrics: `Aman aman Çökertme
Koyun gelir otlaktan
Yârim gelir uzaktan

Aman aman Çökertme
Zeybek oynar Çökertme
Efe gelir dağlardan`,
    story: 'Muğla\'nın Bodrum ilçesine bağlı Çökertme köyünün adını taşıyan bu zeybek havası, Ege bölgesinin en tanınmış türkülerindendir. Zeybek kültürünü ve Ege\'nin özgür ruhunu yansıtır.',
    region: 'Muğla, Türkiye',
    theme: 'Dans',
    language: 'tr',
  },
  {
    id: 'fs4',
    title: 'Sakura Sakura',
    lyrics: `Sakura sakura
Yayoi no sora wa
Mi-watasu kagiri
Kasumi ka kumo ka
Nioi zo izuru
Izaya izaya
Mini yukan`,
    story: 'A traditional Japanese folk song celebrating cherry blossoms. The song dates to the Edo period and captures the fleeting beauty of sakura season — a central metaphor in Japanese culture for the transience of life. It is often the first song taught to students learning traditional Japanese instruments.',
    region: 'Kyoto, Japan',
    theme: 'Nature',
    language: 'ja',
  },
  {
    id: 'fs5',
    title: 'La Llorona',
    lyrics: `Todos me dicen el negro, Llorona
Negro pero cariñoso
Todos me dicen el negro, Llorona
Negro pero cariñoso

Yo soy como el chile verde, Llorona
Picante pero sabroso`,
    story: 'A hauntingly beautiful Mexican folk song deeply rooted in the legend of La Llorona — the weeping woman who wanders waterways mourning her lost children. The song blends indigenous Zapotec traditions with Spanish colonial influences and is especially beloved in Oaxaca, where it is performed during Day of the Dead celebrations.',
    region: 'Oaxaca, Mexico',
    theme: 'Legend',
    language: 'es',
  },
];
