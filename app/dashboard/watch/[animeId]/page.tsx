'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

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
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Google Drive video URL (replace with your actual video ID)
  const videoUrl = `https://drive.google.com/uc?export=download&id=YOUR_GOOGLE_DRIVE_VIDEO_ID`;

  // Player controls
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) video.play();
    else video.pause();
    setIsPlaying(!video.paused);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) setCurrentTime(video.currentTime);
  };

  // Format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <Link 
        href="/dashboard" 
        className="fixed top-4 left-4 z-50 bg-black/70 hover:bg-black/90 p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>

      {/* Video Player */}
      <div className="relative w-full h-screen bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain"
          autoPlay
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onClick={togglePlay}
        />

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-600 rounded-full mb-4">
            <div 
              className="h-full bg-red-600 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="hover:bg-white/20 p-2 rounded-full">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleMute} className="hover:bg-white/20 p-2 rounded-full">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button className="hover:bg-white/20 p-2 rounded-full">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

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
