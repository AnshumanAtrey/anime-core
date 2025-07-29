'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Fullscreen } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { animeData } from '../../data/anime';

export default function WatchPage() {
  const searchParams = useSearchParams();
  const animeId = searchParams.get('animeId');
  const episodeId = searchParams.get('episodeId') || '1';
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  let controlsTimeout: NodeJS.Timeout;

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

  // Player controls for iframe
  const togglePlay = () => {
    // Play/pause handled by iframe controls
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    // Mute/unmute handled by iframe controls
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Auto-hide controls
  const resetControlsTimer = () => {
    clearTimeout(controlsTimeout);
    setShowControls(true);
    controlsTimeout = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    resetControlsTimer();
    return () => clearTimeout(controlsTimeout);
  }, []);

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
        onMouseLeave={() => setShowControls(false)}
        onClick={togglePlay}
      >
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

        {/* Controls Overlay */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Bar */}
          <div 
            className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-red-600 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="text-white hover:text-gray-300">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button onClick={toggleMute} className="text-white hover:text-gray-300">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div className="text-sm text-gray-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            <div>
              <button 
                onClick={() => document.fullscreenElement 
                  ? document.exitFullscreen() 
                  : document.documentElement.requestFullscreen()
                }
                className="text-white hover:text-gray-300"
              >
                <Fullscreen className="w-5 h-5" />
              </button>
            </div>
          </div>
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
