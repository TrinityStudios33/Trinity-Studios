import React from 'react';

export const SmokeEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark overlay to ensure matrix is hidden if z-index fails */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Fog Layer 1 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_60%)] animate-pulse duration-[8000ms]"></div>
      
      {/* Moving Smoke Blobs */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-zinc-800/10 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-zinc-700/5 rounded-full blur-[100px] animate-[bounce_15s_infinite]"></div>
      
      {/* Rising Particles (CSS simulated) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
    </div>
  );
};