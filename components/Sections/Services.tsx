import React from 'react';
import { Film, Bot, MonitorPlay, Palette, Megaphone, Box, LucideIcon } from 'lucide-react';
import { VideoGenerator } from '../Features/VideoGenerator';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon }) => (
  <div className="group relative p-8 bg-white/5 border border-white/5 hover:border-gold-500/50 transition-all duration-500 overflow-hidden">
    {/* Hover Glow Background */}
    <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="w-12 h-12 mb-6 text-gold-500 group-hover:text-white transition-colors duration-300">
        <Icon size={48} strokeWidth={1} />
      </div>
      
      <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-4 group-hover:text-gold-400 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
        {description}
      </p>
    </div>

    {/* Corner Accent */}
    <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-gold-500/0 group-hover:border-r-gold-500/50 transition-all duration-300" />
  </div>
);

export const Services: React.FC = () => {
  const services = [
    {
      icon: Film,
      title: "Produção de Vídeo",
      description: "Institucional, comercial, trailers, documentários e roteiros narrativos com qualidade cinematográfica."
    },
    {
      icon: Bot,
      title: "Criação com IA",
      description: "Geração de avatares, narrações sintéticas, personagens virtuais, imagens conceituais e efeitos via IA."
    },
    {
      icon: MonitorPlay,
      title: "Edição e Pós",
      description: "Montagem precisa, correção de cor (color grading), sound design e finalização broadcast."
    },
    {
      icon: Box,
      title: "3D & Unreal Engine",
      description: "Cenários realistas, ambientes virtuais, product viz e cenas cinematográficas renderizadas em tempo real."
    },
    {
      icon: Palette,
      title: "Identidade Visual",
      description: "Design digital, branding, motion graphics e construção de marcas fortes no ambiente digital."
    },
    {
      icon: Megaphone,
      title: "Marketing Criativo",
      description: "Estratégias visuais, roteiros otimizados para YouTube e conteúdo de alta conversão."
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-zinc-950 relative">
       {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-3">O que fazemos</h2>
        <h3 className="text-3xl md:text-5xl font-cyber font-bold text-white">Nosso Arsenal Criativo</h3>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Interactive Lab Section */}
        <div className="relative pt-12 border-t border-white/5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-display uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
              Live Demo
            </div>
            <h3 className="text-2xl md:text-3xl font-cyber font-bold text-white mb-2">
              Experimente o Futuro
            </h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Utilize nossa ferramenta exclusiva powered by Gemini Veo para criar conceitos de vídeo em tempo real.
            </p>
          </div>

          <VideoGenerator />
        </div>
      </div>
    </section>
  );
};