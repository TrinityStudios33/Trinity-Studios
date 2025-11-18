import React from 'react';
import { ChevronRight, Play } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="inline-block mb-6 px-4 py-1 border border-gold-500/30 rounded-full bg-black/50 backdrop-blur-sm">
          <span className="text-gold-400 text-xs md:text-sm font-display tracking-[0.2em] uppercase">
            O futuro da produção audiovisual
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-cyber font-bold text-white mb-6 leading-tight">
          Produção e tecnologia <br />
          <span className="text-transparent bg-clip-text bg-gold-gradient">que elevam seu projeto</span> <br />
          ao próximo nível
        </h1>

        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-400 font-light leading-relaxed">
          Vídeo, inteligência artificial, pós-produção, identidade visual, trailers, 
          animação e ambientes em 3D criados com ferramentas avançadas.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <a 
            href="https://wa.me/5581999492208"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-gold-500 text-black font-display font-bold uppercase tracking-widest overflow-hidden hover:bg-white transition-colors duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Solicitar Projeto
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </a>
          
          <a 
            href="#servicos"
            className="group px-8 py-4 border border-white/20 text-white font-display font-bold uppercase tracking-widest hover:border-gold-500 hover:text-gold-500 transition-all duration-300 flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm"
          >
            <Play size={18} className="fill-current" />
            Conhecer Serviços
          </a>
        </div>

        {/* Advantages Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center border-t border-white/10 pt-10">
          {['Alta Qualidade', 'Produção com IA', 'Entrega Rápida', 'Estética Unificada', 'Custo Eficiente', 'Equipe Expert'].map((item) => (
            <div key={item} className="flex flex-col items-center justify-center p-2">
               <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mb-3 shadow-[0_0_10px_#D4AF37]"></div>
               <span className="text-gray-400 text-xs md:text-sm uppercase tracking-wider font-display">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};