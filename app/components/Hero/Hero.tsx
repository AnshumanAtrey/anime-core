'use client';

import Image from 'next/image';
import Button from '../Button/button';
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
      <div className="relative z-20 w-full  ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-28">
          {/* Left Side Content */}
          <div className="w-full md:w-1/4  md:mb-0 flex flex-row justify-between [text-shadow:_10px_10px_25px_rgba(255,0,0,0.8)]">
            <h3 className="text-2xl rotate-90 h-10 w-10 font-bold text-white ">TRENDING</h3>
            <ul className="space-y-3 text-left">
              {['Attack on Titan', 'Demon Slayer', 'Jujutsu Kaisen', 'Chainsaw Man'].map((anime) => (
                <li key={anime} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  {anime}
                </li>
              ))}
            </ul>

          </div>

          {/* Center: Main Title */}
          <div className="w-full md:w-4/4 text-center">
            <h1 className="jacquard-12-regular text-9xl md:text-8xl mb-6 text-white [text-shadow:_10px_10px_25px_rgba(255,0,0,0.8)]">
              ANIME CORE
            </h1>
            <p className="text-xl md:text-2xl text-white mb-10 max-w-lg mx-auto [text-shadow:_10px_10px_25px_rgba(255,0,0,0.8)]">
              Your Ultimate Anime Streaming Experience
            </p>
            <Button onClick={handleExploreClick}>EXPLORE NOW</Button>
          </div>

          {/* Right Side Content */}
          <div className="w-full md:w-1/4   md:mt-0 flex flex-row justify-between [text-shadow:_10px_10px_25px_rgba(255,0,0,0.8)]">
            <ul className="space-y-3 text-right">
              {['Bleach: TYBW Part 3', 'My Hero Academia S7', 'One Piece: Egghead', 'Black Clover: WK'].map((anime) => (
                <li key={anime} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  {anime}
                </li>
              ))}
            </ul>
            <h3 className="text-2xl font-bold h-10 w-10 text-white mb-4 tracking-wider rotate-90">UPCOMING</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
