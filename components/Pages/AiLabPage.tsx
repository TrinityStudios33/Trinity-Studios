import React, { useEffect } from 'react';
import { VideoGenerator } from '../Features/VideoGenerator';
import { Sparkles } from 'lucide-react';
import { DecryptedText } from '../UI/DecryptedText';

export const AiLabPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-black relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gold-900/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16 opacity-0 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-display uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            <span><DecryptedText text="Intelligence Playground" /></span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-cyber font-bold text-white mb-6">
            Trinity <span className="text-transparent bg-clip-text bg-gold-gradient"><DecryptedText text="AI Lab" /></span>
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Explore o poder da criação generativa. Utilize nossas ferramentas de inteligência artificial para criar roteiros, visualizar conceitos, sintetizar vozes neurais e compor trilhas sonoras em tempo real.
          </p>
        </div>

        {/* The Lab Component */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <VideoGenerator />
        </div>

      </div>
    </div>
  );
};