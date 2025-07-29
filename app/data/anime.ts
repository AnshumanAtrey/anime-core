// Helper function to generate embed URL
const embedUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

// Vinland Saga episodes data
const vinlandEpisodes = [
  { id: '1', title: 'Somewhere Not Here', fileId: '18agzFRBLLENyFPte9MSM6mwFfVZ1TcXX', duration: '24m' },
  { id: '2', title: 'Sword of the War God', fileId: '1C9sp08PAyzUt9E9WlgxMlhfzNH2Eqy0j', duration: '24m' },
  { id: '3', title: 'Troll', fileId: '1n5ITdfWTcBfdmyigVTm2uO7PGxeAxD7V', duration: '24m' },
  { id: '4', title: 'The True Warrior', fileId: '1Q0jB625SDhjVpJxLG3KXNfJUpWfzv-BM', duration: '24m' },
  { id: '5', title: 'The Troll\'s Son Returns', fileId: '1zhZXmtvefTmEUsvz7Vj3I-z2yiQfW6qU', duration: '24m' },
  // Add more episodes as needed
].map(ep => ({
  ...ep,
  embedUrl: embedUrl(ep.fileId),
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
}

export const animeData: AnimeSeries[] = [
  {
    id: '5-centimeters-per-second',
    title: '5 Centimeters Per Second',
    description: 'A story about the delicate nature of love and life, told in three interconnected segments.',
    year: '2007',
    genres: ['Drama', 'Romance', 'Slice of Life'],
    type: 'movie',
    episodes: [{
      id: '1',
      title: '5 Centimeters Per Second',
      fileId: '1vaJq7NFZyww74Tq-lECZRLjC3YU4owva',
      duration: '1h 3m',
      embedUrl: embedUrl('1vaJq7NFZyww74Tq-lECZRLjC3YU4owva'),
      progress: 0
    }]
  },
  {
    id: 'a-silent-voice',
    title: 'A Silent Voice',
    description: 'A young man seeks redemption after bullying a deaf girl in elementary school.',
    year: '2016',
    genres: ['Drama', 'Romance', 'School'],
    type: 'movie',
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
    id: 'your-name',
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
    id: 'vinland-saga',
    title: 'Vinland Saga',
    description: 'A young Viking boy seeks vengeance for his father\'s death in this historical epic.',
    year: '2019',
    genres: ['Action', 'Adventure', 'Drama', 'Historical'],
    type: 'series',
    episodes: vinlandEpisodes
  }
];
