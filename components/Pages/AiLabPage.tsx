import React, { useEffect } from 'react';
import { VideoGenerator } from '../Features/VideoGenerator';
import { Sparkles, Rocket, ArrowRight } from 'lucide-react';
import { DecryptedText } from '../UI/DecryptedText';
import { useNavigate } from 'react-router-dom';

export const AiLabPage: React.FC = () => {
  const navigate = useNavigate();

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

        {/* FUTURE & COURSES CTA SECTION */}
        <div className="mt-24 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative rounded-xl overflow-hidden border border-gold-500/30 bg-zinc-900/50 p-8 md:p-16 text-center">
                {/* Background FX */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 transition-transform duration-1000 hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 text-gold-500 mb-4 animate-pulse">
                        <Rocket size={20} />
                        <span className="font-display uppercase tracking-widest text-sm">O Futuro é Agora</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-cyber font-bold text-white mb-6">
                        Isso é apenas <span className="text-transparent bg-clip-text bg-gold-gradient">1% das Possibilidades</span>
                    </h2>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        O Trinity Lab é apenas uma versão de testes (Beta) para você visualizar o potencial da tecnologia. 
                        Quer aprender a construir essas ferramentas, dominar a Engenharia de Prompt, criar automações complexas e monetizar com IA no mercado real?
                    </p>
                    
                    <button 
                        onClick={() => navigate('/cursos')}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-black font-display font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                    >
                        Domine essas Ferramentas
                        <ArrowRight size={20} />
                    </button>
                    
                    <p className="mt-6 text-xs text-gray-500 font-display uppercase tracking-widest">
                        Conheça nossos cursos de IA, Unreal Engine e Programação Visual
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};