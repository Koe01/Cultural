export interface FolkPoem {
  id: string;
  lines: [string, string, string, string];
  theme: string;
  region: string;
  language: string;
}

export const folkPoems: FolkPoem[] = [
  {
    id: 'fp1',
    lines: [
      'A gül dalda bitmez mi',
      'Yar yolunu gütmez mi',
      'Sevda bir ateş değil mi',
      'Yüreğimiütmez mi',
    ],
    theme: 'Aşk',
    region: 'Ege, Türkiye',
    language: 'tr',
  },
  {
    id: 'fp2',
    lines: [
      'Dağların karı erir',
      'Seller olur akar gider',
      'Gurbette kalan garip',
      'Yüreği yanar gider',
    ],
    theme: 'Gurbet',
    region: 'Doğu Anadolu, Türkiye',
    language: 'tr',
  },
  {
    id: 'fp3',
    lines: [
      'Bahçelerde saz olur',
      'Gül açılır yaz olur',
      'Ben yârime gül demem',
      'Gülün ömrü az olur',
    ],
    theme: 'Aşk',
    region: 'Anadolu, Türkiye',
    language: 'tr',
  },
  {
    id: 'fp4',
    lines: [
      'Cherry blossoms fall',
      'On the sleeping village pond',
      'Ripples reach no shore',
      'Yet the moon still watches on',
    ],
    theme: 'Nature',
    region: 'Kyoto, Japan',
    language: 'en',
  },
  {
    id: 'fp5',
    lines: [
      'The river bends south',
      'Where the old woman washes',
      'Stories from her hands',
      'Flow faster than the current',
    ],
    theme: 'Wisdom',
    region: 'Mekong Delta, Vietnam',
    language: 'en',
  },
  {
    id: 'fp6',
    lines: [
      'Armut dalda sallanır',
      'Yârim nerde bulunur',
      'Gurbet elde garip garip',
      'Ağlar gözüm bulanır',
    ],
    theme: 'Gurbet',
    region: 'Karadeniz, Türkiye',
    language: 'tr',
  },
  {
    id: 'fp7',
    lines: [
      'Dust settles on the drum',
      'That once called the village home',
      'Now only the wind',
      'Remembers the dancer\'s feet',
    ],
    theme: 'Memory',
    region: 'Akan regions, Ghana',
    language: 'en',
  },
  {
    id: 'fp8',
    lines: [
      'El sol se esconde',
      'Detrás de la montaña',
      'Pero mi amor',
      'No conoce la distancia',
    ],
    theme: 'Aşk',
    region: 'Oaxaca, Mexico',
    language: 'es',
  },
];
