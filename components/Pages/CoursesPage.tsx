import React, { useEffect } from 'react';
import { DecryptedText } from '../UI/DecryptedText';
import { Users, BookOpen, PlayCircle, Cpu, Video, Rocket, ArrowRight, MessageCircle, Music, Mic, Clapperboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COURSES = [
  {
    id: 1,
    title: "Trinity AI Masterclass",
    desc: "Domine a criação de roteiros, vídeos virais, imagens e conteúdo massivo para redes sociais usando as IAs mais influentes do mercado.",
    level: "Avançado",
    duration: "40h",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Unreal Engine 5: Universo",
    desc: "Realismo, arquitetura, criação de jogos completos e animação. Faça seus próprios filmes e curtas cinematográficos com a Unreal.",
    level: "Intermediário",
    duration: "60h",
    icon: Video,
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416ef12?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Edição & VFX Cinematic",
    desc: "Aprenda o fluxo de trabalho de Hollywood. Color Grading, Sound Design e Efeitos Visuais no After Effects e DaVinci Resolve.",
    level: "Iniciante",
    duration: "35h",
    icon: PlayCircle,
    image: "https://images.unsplash.com/photo-1535016120720-40c6874c3b13?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Business Criativo",
    desc: "Como precificar, fechar contratos e escalar sua agência ou carreira freelancer no mercado audiovisual.",
    level: "Todos",
    duration: "15h",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Produção Musical Pro",
    desc: "Do beat à masterização. Domine DAWs, mixagem e teoria musical para produzir faixas profissionais.",
    level: "Intermediário",
    duration: "45h",
    icon: Music,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Música com I.A.",
    desc: "Crie trilhas sonoras, vozes sintéticas e composições complexas usando inteligência artificial generativa.",
    level: "Todos",
    duration: "20h",
    icon: Mic,
    image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Produção de Videoclipes",
    desc: "Direção de arte, iluminação criativa e edição rítmica. Crie clipes musicais com estética de cinema.",
    level: "Intermediário",
    duration: "30h",
    icon: Clapperboard,
    image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop"
  }
];

export const CoursesPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-gold-900/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 opacity-0 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-display uppercase tracking-widest mb-6">
            <BookOpen size={14} />
            <span><DecryptedText text="Trinity Academy" /></span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-cyber font-bold text-white mb-6">
            Domine a <span className="text-transparent bg-clip-text bg-gold-gradient"><DecryptedText text="Nova Era da Criação" /></span>
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Formações práticas e imersivas para quem quer liderar o mercado de audiovisual e tecnologia.
          </p>
        </div>

        {/* COMMUNITY CTA SECTION */}
        <div className="mb-24 relative rounded-2xl overflow-hidden border border-gold-500/30 group opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
            
            <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                    <h3 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-2">Comunidade Exclusiva</h3>
                    <h2 className="text-3xl md:text-4xl font-cyber font-bold text-white mb-4">Junte-se ao Ecossistema</h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        Não aprenda sozinho. Entre para a nossa comunidade no Discord e WhatsApp. 
                        Acesse networking com outros criadores, receba assets gratuitos toda semana, 
                        tire dúvidas com instrutores e participe de desafios práticos.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 font-display tracking-wider">
                        <span className="flex items-center gap-2"><Users size={16} className="text-gold-500" /> +5.000 Membros</span>
                        <span className="flex items-center gap-2"><MessageCircle size={16} className="text-gold-500" /> Suporte Diário</span>
                    </div>
                </div>
                
                <a 
                  href="https://discord.gg/trinitystudios" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-8 py-4 bg-gold-500 text-black font-display font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2"
                >
                   <Users size={20} />
                   Fazer parte da Comunidade
                </a>
            </div>
        </div>

        {/* COURSES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, index) => (
                <div key={course.id} onClick={() => navigate(`/curso/${course.id}`)} className="group relative bg-zinc-900 border border-white/10 rounded-sm overflow-hidden hover:border-gold-500/50 transition-all duration-500 cursor-pointer opacity-0 animate-fade-in-up" style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}>
                    {/* Image Header */}
                    <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10"></div>
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 left-4 z-20">
                            <span className="px-3 py-1 bg-black/80 border border-gold-500/30 text-gold-500 text-[10px] font-display uppercase tracking-widest backdrop-blur-md">
                                {course.level}
                            </span>
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-cyber font-bold text-white group-hover:text-gold-500 transition-colors">
                                <DecryptedText text={course.title} speed={30} revealSpeed={1.0} />
                            </h3>
                            <course.icon className="text-gray-600 group-hover:text-gold-500 transition-colors" />
                        </div>
                        
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 min-h-[60px]">
                            {course.desc}
                        </p>
                        
                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                            <span className="text-xs font-display text-gray-500 uppercase tracking-wider">
                                Duração: <span className="text-white">{course.duration}</span>
                            </span>
                            <button className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-widest text-gold-500 hover:text-white transition-colors group/btn">
                                Ver Detalhes <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};