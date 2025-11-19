import React from 'react';

export const FractalFormulas: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      {/* Rotating Geometrics */}
      <svg className="absolute top-10 left-10 w-96 h-96 opacity-10 animate-[spin_120s_linear_infinite]" viewBox="0 0 500 500">
        <circle cx="250" cy="250" r="200" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="10 5" />
        <polygon points="250,50 423,350 77,350" fill="none" stroke="#D4AF37" strokeWidth="1" />
        <circle cx="250" cy="250" r="100" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
      </svg>

      <svg className="absolute bottom-20 right-20 w-[500px] h-[500px] opacity-10 animate-[spin_180s_linear_infinite_reverse]" viewBox="0 0 500 500">
        <path d="M250 0 L500 250 L250 500 L0 250 Z" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
        <rect x="125" y="125" width="250" height="250" fill="none" stroke="#D4AF37" strokeWidth="0.5" transform="rotate(45 250 250)" />
      </svg>

      {/* Floating Formulas */}
      <div className="absolute top-1/3 left-1/4 text-gold-500/10 font-mono text-sm animate-pulse duration-[5000ms]">
        ∫ e^x dx = e^x + C
      </div>
      <div className="absolute bottom-1/3 right-1/3 text-gold-500/10 font-mono text-sm animate-pulse duration-[7000ms]">
        E = mc²
      </div>
      <div className="absolute top-1/4 right-10 text-gold-500/10 font-mono text-xs">
        e^(iπ) + 1 = 0
      </div>
      <div className="absolute bottom-10 left-20 text-gold-500/10 font-mono text-xs">
        φ = (1 + √5) / 2
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
    </div>
  );
};