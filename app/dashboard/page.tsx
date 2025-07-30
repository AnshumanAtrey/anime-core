'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { animeData, type AnimeSeries } from '../data/anime';
import Image from 'next/image';
import Footer from '../components/Footer/Footer'; // Import the Footer component

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [currentAnimeIndex, setCurrentAnimeIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimeIndex((prevIndex) => 
        prevIndex === animeData.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentAnimeIndex((prevIndex) =>
      prevIndex === 0 ? animeData.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentAnimeIndex((prevIndex) =>
      prevIndex === animeData.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!isLoaded || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const currentAnime = animeData[currentAnimeIndex];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b-2 border-gray-800 bg-[#00000056]  p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
          <Link href="/" className="text-white font-bold text-6xl jacquard-12-regular [text-shadow:_10px_10px_25px_rgba(255,0,0,0.8)]">
            ANIME CORE
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="hover:text-gray-300 text-2xl transition-colors ">Home</Link>
            <Link 
              href="/dashboard/profile" 
              className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              {user?.firstName?.[0]}
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20 px-4 md:px-4 max-w-full mx-auto z-10">
        {/* Hero Section */}
        <section className=" h-[70vh] w-full flex items-center mb-44 ">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0  to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
            <Image
              src="/thumbnails/guts-amoled-3840x2160-18716.jpg"
              alt="Dashboard Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-20 max-w-2xl px-24 pt-28 [text-shadow:_10px_10px_25px_rgba(25,0,0,0.8)]">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-900 text-transparent bg-clip-text">Welcome back, {user?.firstName}!</h1>
            <p className="text-lg md:text-xl mb-6 text-gray-300">Your anime journey continues here.</p>
            <div className="flex space-x-4">
              <Link 
                href="/dashboard/watch?animeId=1&episodeId=1" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded flex items-center space-x-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Watch Now</span>
              </Link>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded transition-colors">
                My List
              </button>
            </div>
          </div>
        </section>

        {/* Movies */}
        <section className="mb-16 w-full px-24">
          <h2 className="text-2xl font-bold mb-4 text-white">Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {animeData.filter(anime => anime.type === 'movie').map((anime: AnimeSeries) => (
              <Link 
                key={anime.id} 
                href={`/dashboard/watch?animeId=${anime.id}&episodeId=1`}
                className="group"
              >
                <div className="relative aspect-[2/3] rounded overflow-hidden mb-2 bg-gray-800 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={anime.thumbnail}
                    alt={anime.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center opacity-0">
                    <Play className="w-12 h-12 text-white/50 group-hover:text-red-500 transition-colors" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <h3 className="font-bold text-white">{anime.title}</h3>
                      <p className="text-sm text-gray-300">{anime.year} • {anime.genres.join(' • ')}</p>
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-sm md:text-base">{anime.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* TV Series */}
        <section className="mb-16 px-24">
          <h2 className="text-xl font-bold mb-4">TV Series</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {animeData.filter(anime => anime.type === 'series').map((anime: AnimeSeries) => (
              <Link 
                key={anime.id} 
                href={`/dashboard/anime/${anime.id}`}
                className="group"
              >
                <div className="relative aspect-[2/3] rounded overflow-hidden mb-2 bg-gray-800 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={anime.thumbnail}
                    alt={anime.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center opacity-0">
                    <Play className="w-12 h-12 text-white/50 group-hover:text-red-500 transition-colors" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <h3 className="font-bold text-white">{anime.title}</h3>
                      <p className="text-sm text-gray-300">{anime.year} • {anime.episodes.length} Episodes</p>
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-sm md:text-base">{anime.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      <div>
        {/* New Ranked Section */}
        <section className="mt-16 mb-16px px-12 bg-gradient-to-t from-red-950 to-black z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {['Top Airing', 'Most Popular', 'Most Favorite', 'Latest Completed'].map((category) => (
              <div key={category} >
                <h3 className="text-xl font-bold mb-4 text-red-800">{category}</h3>
                <div className="space-y-4">
                  {animeData
                    .slice()
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5)
                    .map((anime) => (
                      <Link key={anime.id} href={`/dashboard/watch?animeId=${anime.id}&episodeId=1`} className="group flex items-center space-x-4">
                        <div className="relative w-20 h-28 rounded overflow-hidden flex-shrink-0 [box-shadow:0_0_10px_rgba(0,0,0)]">
                          <Image
                            src={anime.thumbnail}
                            alt={anime.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold group-hover:text-red-500 transition-colors">{anime.title}</h4>
                          <p className="text-sm text-gray-400">{anime.type === 'movie' ? 'Movie' : `${anime.episodes.length} Episodes`}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Dynamic Anime Carousel */}
        <section className="mb-72 px-24 py-12 relative bg-gradient-to-b from-red-950 to-black z-20 ">
          <div className="flex gap-8 items-center bg-gradient-to-r from-red-950/20 to-black/20 rounded-lg overflow-hidden relative [box-shadow:0_0_10px_rgba(0,0,0)]">
            {/* Left side - Image */}
            <div className="relative w-1/2 h-[500px]">
              <Image
                src={currentAnime.thumbnail}
                alt={currentAnime.title}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
            </div>

            {/* Right side - Content */}
            <div className="w-1/2 p-8">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-900 text-transparent bg-clip-text">
                {currentAnime.title}
              </h2>
              <p className="text-lg mb-6 text-gray-300 line-clamp-4">
                {currentAnime.description}
              </p>
              <div className="flex flex-col gap-4 text-gray-300">
                <div className="flex gap-4 items-center">
                  <span className="text-red-500">{currentAnime.year}</span>
                  <span>{currentAnime.type === 'movie' ? 'Movie' : 'TV Series'}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentAnime.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-red-950/30 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/dashboard/${currentAnime.type === 'movie' ? 'watch' : 'anime'}/${currentAnime.id}`}
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full mt-4 hover:bg-red-700 transition-colors w-fit"
                >
                  <Play className="w-5 h-5" />
                  {currentAnime.type === 'movie' ? 'Watch Now' : 'View Episodes'}
                </Link>
              </div>
            </div>

            {/* Navigation Buttons - Updated positioning */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
              <button
                onClick={handlePrevSlide}
                className="ml-4 bg-red-600/80 hover:bg-red-700 p-2 rounded-full pointer-events-auto"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextSlide}
                className="mr-4 bg-red-600/80 hover:bg-red-700 p-2 rounded-full pointer-events-auto"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}
