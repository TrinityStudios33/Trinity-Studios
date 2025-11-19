import React from 'react';

const CLIENT_LOGOS = [
  "https://i.postimg.cc/JhPwn48S/1.png",
  "https://i.postimg.cc/vBBJ6F8X/2.png",
  "https://i.postimg.cc/k440t3Mh/3.png",
  "https://i.postimg.cc/C113fTMv/4.png",
  "https://i.postimg.cc/nzzyQbVS/5.png",
  "https://i.postimg.cc/bJJ72cY4/6.png",
  "https://i.postimg.cc/1ttkNh5Z/7.png",
  "https://i.postimg.cc/Y995mKqK/8.png"
];

export const Clients: React.FC = () => {
  return (
    <section className="py-16 bg-black relative overflow-hidden border-t border-white/5">
      {/* Gradient Masks for fade effect */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 mb-8 text-center opacity-0 animate-fade-in-up">
        <p className="text-gold-500 text-xs font-display uppercase tracking-[0.3em] animate-fade-in-up">Empresas que já trabalharam conosco</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* First Loop */}
        <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
          {CLIENT_LOGOS.map((logo, index) => (
            <div key={`logo-1-${index}`} className="flex items-center justify-center mx-4 md:mx-8">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center p-2 transition-all duration-500 hover:border-gold-500/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <img 
                  src={logo} 
                  alt={`Client ${index + 1}`} 
                  className="w-full h-full object-contain opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Duplicate Loop for infinite scroll */}
        <div className="flex animate-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
          {CLIENT_LOGOS.map((logo, index) => (
            <div key={`logo-2-${index}`} className="flex items-center justify-center mx-4 md:mx-8">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center p-2 transition-all duration-500 hover:border-gold-500/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <img 
                  src={logo} 
                  alt={`Client ${index + 1}`} 
                  className="w-full h-full object-contain opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};