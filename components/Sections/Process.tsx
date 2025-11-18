import React from 'react';
import { Search, Lightbulb, Film, Settings, Package } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    { icon: Search, title: "Descoberta", desc: "Entendimento profundo dos objetivos." },
    { icon: Lightbulb, title: "Conceito", desc: "Roteirização e direção criativa." },
    { icon: Film, title: "Produção", desc: "Captação, geração IA ou modelagem." },
    { icon: Settings, title: "Pós-Produção", desc: "Edição, VFX e sound design." },
    { icon: Package, title: "Entrega", desc: "Formatos finais otimizados." },
  ];

  return (
    <section id="processo" className="py-24 bg-zinc-950 relative overflow-hidden">
       {/* Background Grid Line */}
       <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
           <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-3">Workflow</h2>
           <h3 className="text-3xl md:text-5xl font-serif font-bold text-white">Processo de Criação</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4">
          {steps.map((item, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-full bg-black border border-gold-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 group-hover:border-gold-500 group-hover:scale-110 transition-all duration-300">
                <item.icon className="text-gold-500 w-8 h-8" />
              </div>
              
              {/* Number Background */}
              <span className="absolute top-0 text-6xl font-display font-bold text-white/5 -z-10 select-none transform -translate-y-4">
                0{index + 1}
              </span>

              <h4 className="text-white font-bold font-display uppercase tracking-wider mb-2">
                {item.title}
              </h4>
              <p className="text-gray-400 text-sm max-w-[200px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};