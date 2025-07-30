'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { animeData } from '../../data/anime';

export default function WatchPageClient() {
  const searchParams = useSearchParams();
  const animeId = searchParams.get('animeId');
  const episodeId = searchParams.get('episodeId') || '1';

  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Auto-hide controls
  const resetControlsTimer = useCallback(() => {
    clearTimeout(controlsTimeoutRef.current);
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    resetControlsTimer();
    return () => {
      clearTimeout(controlsTimeoutRef.current);
    };
  }, [resetControlsTimer]);

  // Find the anime and episode
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

  const videoUrl = episode.embedUrl;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link 
          href={anime.type === 'movie' ? '/dashboard' : `/dashboard/anime/${anime.id}`}
          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      {/* Video Player */}
      <div 
        className="relative w-full h-screen bg-black"
        onMouseMove={resetControlsTimer}
        onMouseLeave={() => setShowControls(false)}>
        <div className="w-full h-full flex items-center justify-center bg-black">
        <iframe
          src={videoUrl}
          width="100%"
          height="100%"
          allow="autoplay"
          className="border-0"
          allowFullScreen
        />
      </div>

      

        {/* Title Overlay */}
        <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-xl font-bold">{anime.title}</h1>
          {anime.type === 'series' && <p className="text-gray-300">Episode {episode.id}: {episode.title}</p>}
        </div>
      </div>
    </div>
  );
}
