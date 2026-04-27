import React from 'react';

const Hero = () => {
  return (
    <div className="relative border-b-4 border-black overflow-hidden h-[400px] flex items-center justify-center bg-brutal-pink">
      <div 
        className="absolute inset-0 z-0 opacity-80 mix-blend-multiply" 
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          Raw Quality.<br/>No Bullshit.
        </h1>
        <p className="text-2xl md:text-3xl font-bold bg-white text-black inline-block px-4 py-2 border-4 border-black shadow-brutal-lg">
          The ultimate neo-brutalist shopping experience.
        </p>
      </div>
    </div>
  );
};

export default Hero;
