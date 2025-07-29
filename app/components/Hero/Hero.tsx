'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/dashboard');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className=" inset-0 h-full z-20 ">
        <Image
          src="/bg.gif"
          alt="Anime Core Background"
          fill
          className="object-cover opacity-90"
          priority
        />

      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-20" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl px-8 ">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Side Content */}
          <div className="w-full md:w-1/4 text-left mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">TRENDING</h3>
            <ul className="space-y-3">
              {['Attack on Titan', 'Demon Slayer', 'Jujutsu Kaisen', 'Chainsaw Man'].map((anime) => (
                <li key={anime} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  {anime}
                </li>
              ))}
            </ul>

          </div>

          {/* Center: Main Title */}
          <div className="w-full md:w-2/4 text-center">
            <h1 className="jacquard-12-regular text-6xl md:text-8xl mb-6 text-white [text-shadow:_0_0_15px_rgba(255,0,0,0.8)]">
              ANIME CORE
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-lg mx-auto [text-shadow:_0_0_10px_rgba(0,0,0,0.8)]">
              Your Ultimate Anime Streaming Experience
            </p>
                        <button
              onClick={handleExploreClick}
              className="relative px-8 py-3 font-bold text-white border-2 border-white/20 bg-transparent hover:bg-white/10 transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 border-l-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></span>
              <span className="relative z-10">EXPLORE NOW</span>
            </button>
          </div>

          {/* Right Side Content */}
          <div className="w-full md:w-1/4 text-right mt-8 md:mt-0">
            <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">UPCOMING</h3>
            <ul className="space-y-3">
              {['Bleach: TYBW Part 3', 'My Hero Academia S7', 'One Piece: Egghead', 'Black Clover: WK'].map((anime) => (
                <li key={anime} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  {anime}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
