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
  ArrowRight,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DecryptedText } from '../UI/DecryptedText';

// --- UNIQUE GEOMETRIC BACKGROUNDS ---
const getServiceBackground = (index: number) => {
  const patterns = [
    // Pattern 0: Sacred Geometry (Circles/Triangles)
    (
      <svg className="absolute -right-16 -bottom-16 w-80 h-80 text-gold-500/5 group-hover:text-gold-500/10 transition-colors duration-700 animate-[spin_60s_linear_infinite]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
         <circle cx="100" cy="100" r="98" strokeDasharray="5 5" />
         <circle cx="100" cy="100" r="70" strokeOpacity="0.5" />
         <path d="M100 10 L178 145 L22 145 Z" strokeOpacity="0.3" />
         <path d="M100 190 L178 55 L22 55 Z" strokeOpacity="0.3" />
         <rect x="70" y="70" width="60" height="60" transform="rotate(45 100 100)" strokeOpacity="0.4" />
         <circle cx="100" cy="100" r="20" />
      </svg>
    ),
    // Pattern 1: Hexagonal Grid
    (
      <svg className="absolute -right-10 -bottom-10 w-96 h-96 text-gold-500/5 group-hover:text-gold-500/10 transition-colors duration-700 animate-[spin_80s_linear_infinite_reverse]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
         <path d="M50 50 L75 25 L125 25 L150 50 L125 75 L75 75 Z" strokeOpacity="0.6" />
         <path d="M50 110 L75 85 L125 85 L150 110 L125 135 L75 135 Z" strokeOpacity="0.4" />
         <path d="M110 150 L135 125 L185 125 L210 150 L185 175 L135 175 Z" strokeOpacity="0.3" />
         <line x1="0" y1="0" x2="200" y2="200" strokeDasharray="10 10" strokeOpacity="0.2" />
         <circle cx="100" cy="100" r="80" strokeDasharray="2 4" />
      </svg>
    ),
    // Pattern 2: Circuit Lines
    (
      <svg className="absolute -right-20 -bottom-20 w-[400px] h-[400px] text-gold-500/5 group-hover:text-gold-500/10 transition-colors duration-700 animate-pulse" style={{ animationDuration: '10s' }} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
         <path d="M0 100 H50 L60 80 L70 120 L80 100 H200" />
         <circle cx="60" cy="80" r="2" fill="currentColor" />
         <circle cx="70" cy="120" r="2" fill="currentColor" />
         <path d="M100 0 V50 L120 60 L80 70 L100 80 V200" strokeOpacity="0.5" />
         <rect x="140" y="140" width="40" height="40" strokeDasharray="4 4" />
      </svg>
    ),
    // Pattern 3: Isometric Cubes
    (
      <svg className="absolute -right-12 -bottom-12 w-80 h-80 text-gold-500/5 group-hover:text-gold-500/10 transition-colors duration-700 animate-[bounce_20s_infinite]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
         <path d="M50 150 L100 175 L150 150 L150 100 L100 75 L50 100 Z" />
         <path d="M50 100 L100 125 L150 100" />
         <path d="M100 125 L100 175" />
         <path d="M100 25 L150 50 L100 75 L50 50 Z" strokeOpacity="0.5" />
         <line x1="100" y1="25" x2="100" y2="0" strokeDasharray="5 5" />
      </svg>
    ),
    // Pattern 4: Radar Concentric
    (
      <svg className="absolute -right-24 -bottom-24 w-[500px] h-[500px] text-gold-500/5 group-hover:text-gold-500/10 transition-colors duration-700" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.3">
         <circle cx="100" cy="100" r="20" />
         <circle cx="100" cy="100" r="40" />
         <circle cx="100" cy="100" r="60" strokeDasharray="10 10" className="animate-[spin_20s_linear_infinite]" />
         <circle cx="100" cy="100" r="80" />
         <circle cx="100" cy="100" r="100" strokeDasharray="20 5" className="animate-[spin_30s_linear_infinite_reverse]" />
         <line x1="100" y1="100" x2="200" y2="100" className="animate-[spin_5s_linear_infinite] origin-center" strokeWidth="1" />
      </svg>
    ),
    // Pattern 5: Matrix Binary
    (
      <svg className="absolute -right-5 -bottom-5 w-full h-full text-gold-500/5 group-hover:text-gold-500/10 transition-colors duration-700 opacity-50" viewBox="0 0 200 200" fill="currentColor" style={{ fontSize: '10px', fontFamily: 'monospace' }}>
         <text x="10" y="20">1 0 1 0</text>
         <text x="160" y="40">0 1 1</text>
         <text x="50" y="80">1 0</text>
         <text x="120" y="150">0 0 1</text>
         <text x="180" y="180">1 0 1</text>
         <rect x="0" y="0" width="200" height="200" fill="url(#grad)" fillOpacity="0.1" />
         <path d="M0 0 L200 200 M200 0 L0 200" stroke="currentColor" strokeWidth="0.2" />
      </svg>
    )
  ];
  
  return patterns[index % patterns.length];
};

interface ServiceCardProps {
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
  targetCategory: string;
  index: number; // Added index for varying backgrounds
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, targetCategory, index }) => {
  const navigate = useNavigate();

  const handleVisualize = () => {
    navigate('/portfolio', { state: { category: targetCategory } });
  };

  return (
    <div className="group relative p-8 bg-white/5 border border-white/5 hover:border-gold-500/50 transition-all duration-500 overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] flex flex-col h-full">
      
      {/* --- UNIQUE ANIMATED GEOMETRIC BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {getServiceBackground(index)}
      </div>

      {/* Hover Glow Background */}
      <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
      
      {/* Dynamic Light Beam Effect */}
      <div className="absolute top-0 -left-[150%] w-[120%] h-full bg-gradient-to-r from-transparent via-gold-500/10 to-transparent -skew-x-12 group-hover:left-[150%] transition-all duration-1000 ease-in-out z-0 pointer-events-none" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="w-12 h-12 mb-6 text-gold-500 group-hover:text-white transition-colors duration-300">
          <Icon size={48} strokeWidth={1} />
        </div>
        
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-4 group-hover:text-gold-400 transition-colors">
          <DecryptedText text={title} speed={30} revealSpeed={1.5} />
        </h3>
        
        <div className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 whitespace-pre-line flex-1">
          {description}
        </div>

        {/* Visualize Button */}
        <div className="mt-6 pt-4 border-t border-white/5 group-hover:border-gold-500/30 transition-colors">
          <button 
            onClick={handleVisualize}
            className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-gray-500 group-hover:text-gold-500 transition-colors hover:underline"
          >
            <Eye size={16} />
            Visualizar Projetos
          </button>
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-gold-500/0 group-hover:border-r-gold-500/50 transition-all duration-300 z-10" />
    </div>
  );
};

interface ServicesProps {
  isPreview?: boolean;
}

export const Services: React.FC<ServicesProps> = ({ isPreview = false }) => {
  const navigate = useNavigate();

  const allServices = [
    {
      icon: Film,
      title: "Produção Audiovisual",
      description: "Filmes institucionais\nComerciais e Vídeos publicitários\nDocumentários\nConteúdos para YouTube\nRoteiros técnicos e narrativos",
      targetCategory: 'Vídeo'
    },
    {
      icon: MonitorPlay,
      title: "Pós Produção e VFX",
      description: "Motion graphics\nVFX avançado\nCorreção de cor (Color Grading)\nEdição cinematográfica\nMixagem e masterização de áudio",
      targetCategory: 'Vídeo'
    },
    {
      icon: Box,
      title: "Universos Digitais & 3D",
      description: "Cinemáticas 3D\nAnimações em alta definição\nVisuals futuristas para storytelling\nDesign de ambientes digitais",
      targetCategory: '3D'
    },
    {
      icon: Gamepad2,
      title: "Desenvolvimento de Jogos",
      description: "Jogos para PC e Android\nCriação em Unreal Engine 5\nAplicativos interativos\nExperiências imersivas",
      targetCategory: '3D'
    },
    {
      icon: Palette,
      title: "Identidade Visual",
      description: "Criação de marca\nManual de identidade\nMateriais de apresentação\nDesign visual para campanhas",
      targetCategory: 'Design'
    },
    {
      icon: Bot,
      title: "Conteúdo com IA",
      description: "Imagens hiper realistas\nVídeos gerados por IA\nVoz sintética profissional\nRoteiros otimizados por IA",
      targetCategory: 'IA'
    },
    {
      icon: Cpu,
      title: "Automação Digital",
      description: "Criação de fluxos automáticos\nSistemas no code\nAutomação para empresas\nOrganização e inteligência operacional",
      targetCategory: 'Todos' 
    },
    {
      icon: Smartphone,
      title: "Gestão e Social Media",
      description: "Planejamento de conteúdo\nEstratégias de engajamento\nEdição contínua de reels e shorts\nGerenciamento profissional de perfis",
      targetCategory: 'Comerciais'
    },
    {
      icon: Camera,
      title: "Fotografia Profissional",
      description: "Ensaio presencial\nRetratos corporativos\nFotografia de produtos\nBook empresarial",
      targetCategory: 'Design'
    },
    {
      icon: Aperture,
      title: "Fotografia com IA",
      description: "Ensaios completos digitais\nAvatares hiper realistas\nCenários personalizados\nEdição avançada de imagens",
      targetCategory: 'IA'
    },
    {
      icon: Code,
      title: "Desenvolvimento Web",
      description: "Sites estáticos cinematográficos\nLanding pages de alta conversão\nPortfólios interativos",
      targetCategory: 'Design'
    },
    {
      icon: Lightbulb,
      title: "Consultoria Criativa",
      description: "Direção artística\nEstratégias de posicionamento\nDesenvolvimento de narrativas\nAnálise de identidade e comunicação",
      targetCategory: 'Todos'
    },
    {
      icon: GraduationCap,
      title: "Cursos Profissionais",
      description: "Produção audiovisual\nInteligência artificial aplicada\nEdição e pós produção\nCriação de conteúdo estratégico\nNarrativa e roteiro",
      targetCategory: 'Todos'
    },
    {
      icon: Images,
      title: "Banco de Imagens",
      description: "Acervo gratuito exclusivo\nAssets em alta resolução\nRecursos para criadores\nBiblioteca Trinity",
      targetCategory: 'Design'
    },
    {
      icon: Users,
      title: "Comunidade & Networking",
      description: "Interaja com criadores\nO networking que você precisa\nTroca de experiências\nJornada compartilhada",
      targetCategory: 'Todos'
    }
  ];

  // Filter services if in preview mode
  const displayedServices = isPreview ? allServices.slice(0, 6) : allServices;

  return (
    <section id="servicos" className={`py-24 bg-zinc-950 relative ${isPreview ? 'scroll-mt-32' : 'pt-32'}`}>
       {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center opacity-0 animate-fade-in-up">
        <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-3">
          <DecryptedText text="O que fazemos" />
        </h2>
        <h3 className="text-3xl md:text-5xl font-cyber font-bold text-white">
          <DecryptedText 
            text={isPreview ? "Nosso Arsenal Criativo" : "Todas as Soluções Trinity"} 
          />
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
              <ServiceCard {...service} index={index} />
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