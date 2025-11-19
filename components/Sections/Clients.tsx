import React from 'react';

const CLIENT_LOGOS = [
  "https://i.postimg.cc/kXJNyKpz/1.png",
  "https://i.postimg.cc/KvG75BH6/2.png",
  "https://i.postimg.cc/PrXbMY7n/3.png",
  "https://i.postimg.cc/65WVhnPs/4.png",
  "https://i.postimg.cc/kXJNyKHm/5.png",
  "https://i.postimg.cc/KvG75BWx/6.png",
  "https://i.postimg.cc/ncFK1BWn/7.png",
  "https://i.postimg.cc/7YH1N0Rx/8.png"
];

export const Clients: React.FC = () => {
  return (
    <section className="py-16 bg-black relative overflow-hidden border-t border-white/5">
      {/* Gradient Masks for fade effect */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-gold-500 text-xs font-display uppercase tracking-[0.3em]">Empresas que confiam na Trinity</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* First Loop */}
        <div className="flex animate-[scroll_30s_linear_infinite] group-hover:[animation-play-state:paused]">
          {CLIENT_LOGOS.map((logo, index) => (
            <div key={`logo-1-${index}`} className="flex items-center justify-center mx-4 md:mx-8">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center p-6 transition-all duration-500 hover:border-gold-500/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <img 
                  src={logo} 
                  alt={`Client ${index + 1}`} 
                  className="max-w-full max-h-full object-contain grayscale opacity-60 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Duplicate Loop for infinite scroll */}
        <div className="flex animate-[scroll_30s_linear_infinite] group-hover:[animation-play-state:paused]" aria-hidden="true">
          {CLIENT_LOGOS.map((logo, index) => (
            <div key={`logo-2-${index}`} className="flex items-center justify-center mx-4 md:mx-8">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center p-6 transition-all duration-500 hover:border-gold-500/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <img 
                  src={logo} 
                  alt={`Client ${index + 1}`} 
                  className="max-w-full max-h-full object-contain grayscale opacity-60 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS Animation for scroll */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};