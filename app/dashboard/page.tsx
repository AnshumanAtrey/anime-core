'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data
const featuredAnime = [
  { id: 1, title: 'Attack on Titan', image: '/images/attack-on-titan.jpg' },
  { id: 2, title: 'Demon Slayer', image: '/images/demon-slayer.jpg' },
  { id: 3, title: 'Jujutsu Kaisen', image: '/images/jujutsu-kaisen.jpg' },
];

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isLoaded || !isClient) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="text-red-600 font-bold text-2xl">
            ANIME CORE
          </Link>
          <Link href="/dashboard/profile" className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors">
            {user?.firstName?.[0]}
          </Link>
        </div>
      </nav>

      <main className="pt-20 px-4 md:px-12">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center mb-12">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gray-900"></div>
          </div>
          <div className="relative z-20 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome back, {user?.firstName}!</h1>
            <p className="text-lg md:text-xl mb-6">Your anime journey continues here.</p>
            <div className="flex space-x-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded">
                Continue Watching
              </button>
            </div>
          </div>
        </section>

        {/* Featured Anime */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredAnime.map((anime) => (
              <div key={anime.id} className="group">
                <div className="relative aspect-[2/3] rounded overflow-hidden mb-2 bg-gray-800">
                  <div className="absolute inset-0 bg-gray-700"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400">Image</span>
                  </div>
                </div>
                <h3 className="font-medium">{anime.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
