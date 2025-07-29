'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Play } from 'lucide-react';

// Mock episode data
const episodes = [
  { id: 1, title: 'Episode 1', duration: '24:30' },
  { id: 2, title: 'Episode 2', duration: '23:45' },
  { id: 3, title: 'Episode 3', duration: '24:15' },
];

export default function AnimePlayer() {
  const searchParams = useSearchParams();
  const animeId = searchParams.get('animeId');
  const episodeId = searchParams.get('episodeId') || '1';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <Link 
        href="/dashboard" 
        className="fixed top-4 left-4 z-50 bg-black/70 hover:bg-black/90 p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>
      
      {/* Episode List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Episodes</h2>
        <div className="space-y-2">
          {episodes.map((episode) => (
            <Link 
              key={episode.id}
              href={`/dashboard/watch?animeId=${animeId}&episodeId=${episode.id}`}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                episodeId === episode.id.toString() ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div className="w-24 h-16 bg-gray-700 rounded mr-4 flex items-center justify-center">
                <Play className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <h3 className="font-medium">{episode.title}</h3>
                <p className="text-sm text-gray-400">{episode.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
