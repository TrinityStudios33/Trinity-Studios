import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Element */}
          <div className="relative order-2 lg:order-1">
             <div className="absolute -inset-1 bg-gold-gradient opacity-20 blur-lg rounded-lg"></div>
             <div className="relative aspect-video bg-gray-900 border border-white/10 rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/studio/800/600')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 border border-gold-500/50 rounded-full flex items-center justify-center backdrop-blur-md">
                        <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse shadow-[0_0_15px_#D4AF37]"></div>
                    </div>
                </div>
             </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-4">
              Sobre a Trinity
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Criamos o inimaginável com precisão digital
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Trinity Studios une criatividade, técnica e inteligência artificial em um ecossistema de produção audiovisual único.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Não somos apenas uma produtora. Somos arquitetos de narrativas visuais. Criamos histórias fortes, imagens impactantes e projetos completos que integram design, edição, animação e tecnologia de ponta para entregar resultados que superam as expectativas do mercado.
            </p>
            <div className="flex gap-4">
                <div className="h-1 w-12 bg-gold-500"></div>
                <div className="h-1 w-2 bg-gray-700"></div>
                <div className="h-1 w-2 bg-gray-700"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};