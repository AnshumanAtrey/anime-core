'use client';

import Image from 'next/image';

interface AnimeCardProps {
  anime: {
    id: number;
    title: string;
    image: string;
    episodes: number;
    rating: number;
  };
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/20">
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={anime.image}
          alt={anime.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          {anime.rating.toFixed(1)} ★
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-bold mb-1 line-clamp-2">{anime.title}</h3>
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <span>{anime.episodes} Episodes</span>
          <button className="text-red-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 transition-all duration-300 pointer-events-none" />
    </div>
  );
};
