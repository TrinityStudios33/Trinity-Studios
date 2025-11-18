import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Representation of Triangle + Ankh based on description */}
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Inverted Triangle Background */}
        <path 
          d="M10 10 L90 10 L50 90 Z" 
          stroke="url(#goldGradient)" 
          strokeWidth="4" 
          fill="rgba(0,0,0,0.5)"
        />
        
        {/* Ankh Symbol Overlay */}
        <path 
          d="M50 25 C42 25 42 38 50 38 C58 38 58 25 50 25 M50 38 L50 80 M35 50 L65 50" 
          stroke="url(#goldGradient)" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Metallic Gradient Definition */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDD835" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#896605" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Text Logo */}
      <div className="flex flex-col leading-none tracking-widest uppercase font-serif">
        <span className="text-white font-bold text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">Trinity</span>
        <span className="text-gold-500 font-medium text-xs md:text-sm tracking-[0.3em]">Studios</span>
      </div>
    </div>
  );
};