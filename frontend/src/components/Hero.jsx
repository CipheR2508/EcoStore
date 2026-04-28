import React from 'react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden h-[500px] flex items-center justify-center bg-zinc-900 text-white">
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay transition-transform duration-700 hover:scale-105" 
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-300 mb-4 bg-white/10 px-4 py-1 rounded-full backdrop-blur-md">
          Premium Essentials, Delivered Fast
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
          Buy Better.<br/>Live Smarter.
        </h1>
        <p className="text-lg md:text-xl font-light text-zinc-300 max-w-2xl mx-auto mb-8">
          Elevate your lifestyle with our curated collection of high-quality products. Minimalist design, maximum impact.
        </p>
        <button className="bg-white text-black px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded-none hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl">
          Shop the Collection
        </button>
      </div>
    </div>
  );
};

export default Hero;
