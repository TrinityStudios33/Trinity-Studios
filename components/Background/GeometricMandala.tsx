import React from 'react';

export const GeometricMandala: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center opacity-30 mix-blend-screen">
      {/* Outer Ring - Slow Clockwise */}
      <svg 
        className="absolute w-[150vw] h-[150vw] md:w-[800px] md:h-[800px] animate-[spin_60s_linear_infinite]" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="98" stroke="#D4AF37" strokeWidth="0.2" strokeOpacity="0.5" />
        <circle cx="100" cy="100" r="85" stroke="#D4AF37" strokeWidth="0.1" strokeDasharray="4 4" />
        <path d="M100 0 L100 200 M0 100 L200 100" stroke="#D4AF37" strokeWidth="0.1" strokeOpacity="0.3" />
        <rect x="30" y="30" width="140" height="140" stroke="#D4AF37" strokeWidth="0.1" strokeOpacity="0.4" transform="rotate(45 100 100)" />
      </svg>

      {/* Middle Ring - Reverse */}
      <svg 
        className="absolute w-[120vw] h-[120vw] md:w-[600px] md:h-[600px] animate-[spin_45s_linear_infinite_reverse]" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="90" stroke="#D4AF37" strokeWidth="0.1" strokeOpacity="0.4" />
        <path d="M100 10 L150 100 L100 190 L50 100 Z" stroke="#D4AF37" strokeWidth="0.2" strokeOpacity="0.3" />
        <circle cx="100" cy="100" r="40" stroke="#D4AF37" strokeWidth="0.1" strokeDasharray="2 2" />
      </svg>

      {/* Inner Ring - Faster Clockwise */}
      <svg 
        className="absolute w-[80vw] h-[80vw] md:w-[400px] md:h-[400px] animate-[spin_30s_linear_infinite]" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="50" y="50" width="100" height="100" stroke="#D4AF37" strokeWidth="0.1" strokeOpacity="0.5" />
        <circle cx="100" cy="100" r="65" stroke="#D4AF37" strokeWidth="0.1" />
      </svg>
      
      {/* Radial Gradient Mask to fade edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]"></div>
    </div>
  );
};