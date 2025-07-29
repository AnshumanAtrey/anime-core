// Helper function to generate embed URL
const embedUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

// Vinland Saga episodes data
const vinlandEpisodeTitles = [
  'Somewhere Not Here',
  'Sword',
  'Troll',
  'A True Warrior',
  'The Troll\'s Son',
  'The Journey Begins',
  'Normanni',
  'Beyond the Edge of the Sea',
  'The Battle of London Bridge',
  'Ragnarok',
  'A Gamble',
  'The Land on the Far Bank',
  'Child of a Hero',
  'The Light of Dawn',
  'After Yule',
  'History of Beasts',
  'Servant',
  'Out of the Cradle',
  'United Front',
  'Crown',
  'Reunion',
  'Lone Wolf',
  'Miscalculation',
  'End of the Prologue'
];

const vinlandFileIds = [
  '18agzFRBLLENyFPte9MSM6mwFfVZ1TcXX',
  '1C9sp08PAyzUt9E9WlgxMlhfzNH2Eqy0j',
  '1n5ITdfWTcBfdmyigVTm2uO7PGxeAxD7V',
  '1Q0jB625SDhjVpJxLG3KXNfJUpWfzv-BM',
  '1zhZXmtvefTmEUsvz7Vj3I-z2yiQfW6qU',
  '1MBNuVQDXn_4bHvDB40s0y9WPK1BDr349',
  '15Y3DwhQLoYciP3swa6v-Lv82Htj7A7vF',
  '15-Lm3wInDYq6REI31J-BgaRo-Y1KIuQN',
  '1l5yFaPlQ16FHxLrgxl4zHmBCIK0ZXnz0',
  '1LxNJXZ3VdTRLWMYoa-E0wNI7qL9z1ziU',
  '1V9yaFzba1zzFXkne6q5nHiTXtKB6XfGJ',
  '1U4X9ZRVoWbkzuENb7NbUdtROOSjs7zVM',
  '1ISYJo42lG5cmrWSra_uq2vTKOsrbzzHn',
  '1ncGiDeu2pFAfbou_OoG-bOtsBbzILvHN',
  '1VqsFOfzujyLVoX20cX3SACUq7B3yFewR',
  '1t2Dzepml6uTQ5f8Bx4ilKlriuIePjNmO',
  '19d1f_2MZewyNbVR7tHTUgXPnUsPb2bqM',
  '1rF9w6hrY9uwLrzMK1UhI8Zh9u-_VzMR6',
  '1j0ZFv14hJR6Y-83uSvXDq_1cuF6cTFRD',
  '1zJH0zRfAaLe2i0g-a3VS8D2TavOBlokG',
  '1bh6exGRFxQnYpwAM57YextzFk1UJqkxf',
  '1TQkhXuC-DbITROmwpCfV9YH8JXaOVc8s',
  '1gL9Z3OV1QUa6LASmVRX8sh2LidmStjIu',
  '1ds_Q_WFz_ymMlcqZUwks0fulf0nUmQV8'
];

const vinlandEpisodes = vinlandEpisodeTitles.map((title, index) => ({
  id: `${index + 1}`,
  title: title,
  fileId: vinlandFileIds[index],
  duration: '24m',
  embedUrl: embedUrl(vinlandFileIds[index]),
  progress: 0
}));

export interface Episode {
  id: string;
  title: string;
  fileId: string;
  duration?: string;
  progress?: number;
  embedUrl: string;
}

export interface AnimeSeries {
  id: string;
  title: string;
  description: string;
  year: string;
  genres: string[];
  type: 'movie' | 'series';
  episodes: Episode[];
  thumbnail: string;
}

export const animeData: AnimeSeries[] = [
  
  {
    id: 'a-silent-voice',
    title: 'A Silent Voice',
    description: 'A young man seeks redemption after bullying a deaf girl in elementary school.',
    year: '2016',
    genres: ['Drama', 'Romance', 'School'],
    type: 'movie',
    thumbnail: '/thumbnails/shoya-ishida-shouko-3840x2160-16220.jpg',
    episodes: [{
      id: '1',
      title: 'A Silent Voice',
      fileId: '1Z2LhZLi5AA4AMVPGk5uxyCsFsSdpCtWu',
      duration: '2h 10m',
      embedUrl: embedUrl('1Z2LhZLi5AA4AMVPGk5uxyCsFsSdpCtWu'),
      progress: 0
    }]
  },
  {
    id: 'garden-of-words',
    title: 'The Garden of Words',
    description: 'A 15-year-old boy and 27-year-old woman form an unlikely friendship in a beautiful garden.',
    year: '2013',
    genres: ['Drama', 'Romance', 'Slice of Life'],
    thumbnail: '/thumbnails/mobile-the-garden-of-words-2lu2kxbh3gvapp97.jpg',
    type: 'movie',
    episodes: [{
      id: '1',
      title: 'The Garden of Words',
      fileId: '1GClTf3GsEw2gT_djMrawIu5AKVG7ktSk',
      duration: '46m',
      embedUrl: embedUrl('1GClTf3GsEw2gT_djMrawIu5AKVG7ktSk'),
      progress: 0
    }]
  },
  {
    id: '5_cm_per_sec',
    thumbnail: '/thumbnails/5_Centimeters_Per_Second.jpg',
    title: '5 Centimeters Per Second',
    description: 'A tale of two people, Tono Takaki and Shinohara Akari, who were close friends but gradually grow farther and farther apart as time moves on.',
    year: '2007',
    genres: ['Drama', 'Romance', 'Slice of Life'],
    type: 'movie',
    episodes: [{
      id: '1',
      title: '5 Centimeters Per Second',
      fileId: '1-placeholder-file-id-for-5_cm_per_sec',
      duration: '1h 3m',
      embedUrl: embedUrl('1vaJq7NFZyww74Tq-lECZRLjC3YU4owva'),
      progress: 0
    }]
  },
  {
    id: 'your-name',
    thumbnail: '/thumbnails/Your.jpg',
    title: 'Your Name',
    description: 'Two teenagers discover they are swapping bodies and form a deep connection.',
    year: '2016',
    genres: ['Romance', 'Supernatural', 'Drama'],
    type: 'movie',
    episodes: [{
      id: '1',
      title: 'Your Name',
      fileId: '1dinu7tSm-dw6EmCCFQST-eoFgzR_2N7R',
      duration: '1h 46m',
      embedUrl: embedUrl('1dinu7tSm-dw6EmCCFQST-eoFgzR_2N7R'),
      progress: 0
    }]
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    description: 'Humanity fights for survival against giant humanoid Titans.',
    year: '2013',
    genres: ['Action', 'Drama', 'Fantasy'],
    type: 'series',
    thumbnail: '/thumbnails/attack-on-titan-3840x2160-10339.jpg',
    episodes: [] // Add episodes as needed
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    description: 'A young boy becomes a demon slayer after his family is slaughtered.',
    year: '2019',
    genres: ['Action', 'Supernatural', 'Historical'],
    type: 'series',
    thumbnail: '/thumbnails/demon-slayer-3840x2160-22988.jpg',
    episodes: []
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    description: 'A boy becomes a jujutsu sorcerer to contain a powerful curse.',
    year: '2020',
    genres: ['Action', 'Supernatural', 'Horror'],
    type: 'series',
    thumbnail: '/thumbnails/satoru-gojo-jjk-3840x2160-19527.png',
    episodes: []
  },
  {
    id: 'spy-x-family',
    title: 'Spy x Family',
    description: 'A spy forms a fake family for a mission, unaware they all have secrets.',
    year: '2022',
    genres: ['Action', 'Comedy', 'Slice of Life'],
    type: 'series',
    thumbnail: '/thumbnails/spy-x-family-loid-3840x2160-11194.png',
    episodes: []
  },
  {
    id: 'chainsaw-man',
    title: 'Chainsaw Man',
    description: 'A poor young man gains devil powers and joins a devil hunting organization.',
    year: '2022',
    genres: ['Action', 'Horror', 'Supernatural'],
    type: 'series',
    thumbnail: '/thumbnails/denji-chainsaw-man-manga-series-3840x2160-8869.jpg',
    episodes: []
  },
  {
    id: 'vinland-saga',
    title: 'Vinland Saga',
    description: 'A young Viking boy seeks vengeance for his father\'s death in this historical epic.',
    year: '2019',
    genres: ['Action', 'Adventure', 'Drama', 'Historical'],
    type: 'series',
    episodes: vinlandEpisodes,
    thumbnail: '/thumbnails/vinland-saga-3840x2160-14817.jpg'
  }
];
