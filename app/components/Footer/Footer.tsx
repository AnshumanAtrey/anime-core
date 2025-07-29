'use client';

import { useEffect, useState } from 'react';

const Footer = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setIsScrolled(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      className="fixed bottom-0 left-0 w-full bg-black text-[#ffffff] transition-transform duration-500 ease-in-out z-10" // Changed -z-1 to z-10
      style={{
        height: '40vh',
        textShadow: '10px 10px 25px rgba(255, 0, 0, 0.5)',
        transform: isScrolled ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <h2
          className={`font-bold jacquard-12-regular text-center transition-all duration-500 ease-in-out whitespace-nowrap ${isScrolled ? 'scale-100 opacity-100' : 'scale-125 opacity-25'}`} // Removed -z-1 from here
          style={{ fontSize: '15vw', lineHeight: '1' }}
        >
          ANIME CORE
        </h2>
      </div>
    </footer>
  );
};

export default Footer;