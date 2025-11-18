import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Image Logo from URL */}
      <img 
        src="https://i.postimg.cc/XXSmM32P/logo-sem-fundo.png" 
        alt="Trinity Studios Logo" 
        className="h-full w-auto object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
      />
      
      {/* Text Logo */}
      <div className="flex flex-col leading-none tracking-widest uppercase font-cyber">
        <span className="text-white font-bold text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">Trinity</span>
        <span className="text-gold-500 font-medium text-xs md:text-sm tracking-[0.3em]">Studios</span>
      </div>
    </div>
  );
};