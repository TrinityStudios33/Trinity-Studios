import React from 'react';
import { 
  Film, 
  MonitorPlay, 
  Box, 
  Palette, 
  Bot, 
  Cpu, 
  Smartphone, 
  Camera, 
  Aperture, 
  Code, 
  Lightbulb, 
  GraduationCap, 
  UserCheck, 
  LucideIcon 
} from 'lucide-react';
import { VideoGenerator } from '../Features/VideoGenerator';

interface ServiceCardProps {
  title: string;
  description: React.ReactNode;
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
      
      <div className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 whitespace-pre-line">
        {description}
      </div>
    </div>

    {/* Corner Accent */}
    <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-gold-500/0 group-hover:border-r-gold-500/50 transition-all duration-300" />
  </div>
);

export const Services: React.FC = () => {
  const services = [
    {
      icon: Film,
      title: "Produção Audiovisual",
      description: "Filmes institucionais\nComerciais e Vídeos publicitários\nDocumentários\nConteúdos para YouTube\nRoteiros técnicos e narrativos"
    },
    {
      icon: MonitorPlay,
      title: "Pós Produção e VFX",
      description: "Motion graphics\nVFX avançado\nCorreção de cor (Color Grading)\nEdição cinematográfica\nMixagem e masterização de áudio"
    },
    {
      icon: Box,
      title: "Universos Digitais & 3D",
      description: "Cinemáticas 3D\nAnimações em alta definição\nVisuals futuristas para storytelling\nDesign de ambientes digitais"
    },
    {
      icon: Palette,
      title: "Identidade Visual",
      description: "Criação de marca\nManual de identidade\nMateriais de apresentação\nDesign visual para campanhas"
    },
    {
      icon: Bot,
      title: "Conteúdo com IA",
      description: "Imagens hiper realistas\nVídeos gerados por IA\nVoz sintética profissional\nRoteiros otimizados por IA"
    },
    {
      icon: Cpu,
      title: "Automação Digital",
      description: "Criação de fluxos automáticos\nSistemas no code\nAutomação para empresas\nOrganização e inteligência operacional"
    },
    {
      icon: Smartphone,
      title: "Gestão e Social Media",
      description: "Planejamento de conteúdo\nEstratégias de engajamento\nEdição contínua de reels e shorts\nGerenciamento profissional de perfis"
    },
    {
      icon: Camera,
      title: "Fotografia Profissional",
      description: "Ensaio presencial\nRetratos corporativos\nFotografia de produtos\nBook empresarial"
    },
    {
      icon: Aperture,
      title: "Fotografia com IA",
      description: "Ensaios completos digitais\nAvatares hiper realistas\nCenários personalizados\nEdição avançada de imagens"
    },
    {
      icon: Code,
      title: "Desenvolvimento Web",
      description: "Sites estáticos cinematográficos\nLanding pages de alta conversão\nPortfólios interativos"
    },
    {
      icon: Lightbulb,
      title: "Consultoria Criativa",
      description: "Direção artística\nEstratégias de posicionamento\nDesenvolvimento de narrativas\nAnálise de identidade e comunicação"
    },
    {
      icon: GraduationCap,
      title: "Cursos Profissionais",
      description: "Produção audiovisual\nInteligência artificial aplicada\nEdição e pós produção\nCriação de conteúdo estratégico\nNarrativa e roteiro"
    },
    {
      icon: UserCheck,
      title: "Mentorias Individuais",
      description: "Mentoria para criadores\nMentoria para empresas\nMentoria técnica em IA\nAcompanhamento de projetos\nEstruturação de negócios digitais"
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