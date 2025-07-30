'use client';

import SpotlightCard from '../SpotlightCard/SpotlightCard';

const features = [
  {
    title: 'Extensive Library',
    description: 'Access thousands of anime series and movies, from classic to the latest releases.',
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: 'HD Streaming',
    description: 'Watch your favorite anime in stunning HD quality with multiple subtitle options.',
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'No Ads',
    description: 'Enjoy uninterrupted streaming with our premium ad-free experience.',
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Multiple Devices',
    description: 'Watch on your phone, tablet, laptop, or TV with our multi-platform support.',
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const About = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden z-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-7xl font-bold text-white mb-4 relative inline-block jacquard-12-regular [text-shadow:_10px_10px_25px_rgba(255,0,0,0.8)]">
            <span className="relative z-10 px-4  bg-clip-text">
              ABOUT ANIME CORE
            </span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Your ultimate destination for streaming the best anime content from Japan and around the world.
          </p>
        </div>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            
            <div className="relative rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎌</div>
                  <h3 className="text-2xl font-bold text-white mb-4">The Best of Japanese Animation</h3>
                  <p className="text-gray-400">Curated selection of top-rated anime series and movies</p>
                </div>
              </div>
            </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Why Choose Anime Core?</h3>
            <p className="text-gray-400 mb-8">
              At Anime Core, we are passionate about bringing you the best anime experience possible. 
              With a vast library of titles, multiple streaming qualities, and a user-friendly interface, 
              we make it easy to enjoy your favorite shows anytime, anywhere.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <SpotlightCard key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-red-500/50 transition-all duration-300">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-xl p-8 border border-red-900/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
            <p className="text-gray-300 mb-6 max-w-2xl">
              Connect with fellow anime fans, share your favorite shows, and get personalized recommendations 
              based on your watching history.
            </p>
            <button className="relative px-6 py-3 font-bold text-white border-2 border-white/20 bg-transparent hover:bg-white/10 transition-all duration-300 group overflow-hidden">
              <span className="absolute inset-0 border-l-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></span>
              <span className="relative z-10">SIGN UP FOR FREE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
