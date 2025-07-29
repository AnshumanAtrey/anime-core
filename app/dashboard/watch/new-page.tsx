'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { animeData } from '../../data/anime';

export default function WatchPage() {
  const searchParams = useSearchParams();
  const animeId = searchParams.get('animeId');
  const episodeId = searchParams.get('episodeId') || '1';

  const anime = animeData.find(a => a.id === animeId);
  const episode = anime?.episodes.find(e => e.id === episodeId);
  
  if (!anime || !episode) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
          <Link href="/dashboard" className="text-red-500 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute top-4 left-4 z-20">
        <Link 
          href={anime.type === 'movie' ? '/dashboard' : `/dashboard/anime/${anime.id}`}
          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      <div className="w-full h-screen flex items-center justify-center">
        <iframe
          src={episode.embedUrl}
          width="100%"
          height="100%"
          allow="autoplay"
          className="border-0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
