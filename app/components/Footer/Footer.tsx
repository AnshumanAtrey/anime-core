'use client';

import { useEffect, useState } from 'react';

const Footer = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Start revealing when user scrolls to the bottom 20% of the page
      if (scrollPosition > documentHeight * 0.8) {
        setIsRevealed(true);
      } else {
        setIsRevealed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div 
        className={`bg-gradient-to-t from-black to-transparent pt-12 pb-4 transition-all duration-500 ${
          isRevealed ? 'opacity-100' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="jacquard-12-regular text-4xl text-white mb-2">
            ANIME CORE
          </h2>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Anime Core. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
