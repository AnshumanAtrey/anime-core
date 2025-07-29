'use client';

import { AnimeCard } from './AnimeCard';

const animeList = [
  {
    id: 1,
    title: 'Attack on Titan',
    image: '/thumbnails/attack-on-titan.jpg',
    episodes: 75,
    rating: 4.9,
  },
  {
    id: 2,
    title: 'Demon Slayer',
    image: '/thumbnails/demon-slayer.jpg',
    episodes: 55,
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Jujutsu Kaisen',
    image: '/thumbnails/jujustu-kaisen.jpg',
    episodes: 47,
    rating: 4.9,
  },
  {
    id: 4,
    title: 'Chainsaw Man',
    image: '/thumbnails/chainsaw-man.jpg',
    episodes: 12,
    rating: 4.7,
  },
  {
    id: 5,
    title: 'Spy x Family',
    image: '/thumbnails/spy-x-family.jpg',
    episodes: 25,
    rating: 4.8,
  },
];

const AnimeList = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden z-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-white mb-12 text-center relative [text-shadow:_0_0_15px_rgba(255,0,0,0.8)]">
          <span className="relative z-10 px-4 bg-clip-text jacquard-12-regular">
            TRENDING NOW
          </span>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="relative px-8 py-3 font-bold text-white border-2 border-white/20 bg-transparent hover:bg-white/10 transition-all duration-300 group overflow-hidden">
            <span className="absolute inset-0 border-l-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></span>
            <span className="relative z-10">VIEW ALL ANIME</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnimeList;
