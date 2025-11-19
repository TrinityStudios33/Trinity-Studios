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
  Gamepad2,
  Images,
  Users,
  LucideIcon,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon }) => (
  <div className="group relative p-8 bg-white/5 border border-white/5 hover:border-gold-500/50 transition-all duration-500 overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
    {/* Hover Glow Background */}
    <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Dynamic Light Beam Effect */}
    <div className="absolute top-0 -left-[150%] w-[120%] h-full bg-gradient-to-r from-transparent via-gold-500/10 to-transparent -skew-x-12 group-hover:left-[150%] transition-all duration-1000 ease-in-out z-0 pointer-events-none" />
    
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

interface ServicesProps {
  isPreview?: boolean;
}

export const Services: React.FC<ServicesProps> = ({ isPreview = false }) => {
  const navigate = useNavigate();

  const allServices = [
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
      icon: Gamepad2,
      title: "Desenvolvimento de Jogos",
      description: "Jogos para PC e Android\nCriação em Unreal Engine 5\nAplicativos interativos\nExperiências imersivas"
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
      icon: Images,
      title: "Banco de Imagens",
      description: "Acervo gratuito exclusivo\nAssets em alta resolução\nRecursos para criadores\nBiblioteca Trinity"
    },
    {
      icon: Users,
      title: "Comunidade & Networking",
      description: "Interaja com criadores\nO networking que você precisa\nTroca de experiências\nJornada compartilhada"
    }
  ];

  // Filter services if in preview mode
  const displayedServices = isPreview ? allServices.slice(0, 6) : allServices;

  return (
    <section id="servicos" className={`py-24 bg-zinc-950 relative ${isPreview ? 'scroll-mt-32' : 'pt-32'}`}>
       {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center opacity-0 animate-fade-in-up">
        <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-3">O que fazemos</h2>
        <h3 className="text-3xl md:text-5xl font-cyber font-bold text-white">
          {isPreview ? "Nosso Arsenal Criativo" : "Todas as Soluções Trinity"}
        </h3>
        {!isPreview && (
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Explore nossa lista completa de serviços projetados para elevar seu projeto ao nível máximo de excelência e tecnologia.
          </p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isPreview ? 'mb-12' : 'mb-20'}`}>
          {displayedServices.map((service, index) => (
            <div key={index} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* Show Button only in Preview Mode */}
        {isPreview && (
          <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={() => navigate('/servicos')}
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-display font-bold uppercase tracking-widest hover:border-gold-500 hover:text-gold-500 transition-all duration-300 bg-black/50 hover:bg-black"
            >
              Todos os nossos serviços
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};