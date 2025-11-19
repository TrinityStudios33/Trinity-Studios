import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DecryptedText } from '../UI/DecryptedText';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  BarChart, 
  Cpu, 
  Video, 
  Music, 
  Mic, 
  Layers, 
  Globe, 
  PlayCircle 
} from 'lucide-react';

// --- COURSE DATABASE ---
const COURSE_DATA: Record<string, any> = {
  '1': {
    title: "Trinity AI Masterclass",
    subtitle: "Domine a Nova Era da Criação de Conteúdo",
    description: "Um treinamento completo focado em criar roteiros, vídeos virais, imagens hiper-realistas e conteúdo massivo para as plataformas mais influentes do mercado (TikTok, Instagram, YouTube). Aprenda a usar a IA não apenas como ferramenta, mas como sua equipe de produção completa.",
    duration: "40 Horas",
    level: "Avançado",
    tools: ["Midjourney", "Runway Gen-2", "Gemini Advanced", "ElevenLabs", "Luma Dream Machine"],
    modules: [
      "Engenharia de Prompt Avançada",
      "Criação de Roteiros Virais com LLMs",
      "Geração de Vídeo AI (Text-to-Video)",
      "Deepfake e Avatares Digitais (Ética e Técnica)",
      "Automação de Canais Dark",
      "Monetização de Conteúdo IA"
    ],
    target: "Criadores de conteúdo, Social Media Managers e Empreendedores Digitais.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
  },
  '2': {
    title: "Unreal Engine 5: Universo Total",
    subtitle: "De Jogos a Filmes Cinematográficos",
    description: "O curso definitivo de Unreal Engine 5. Aprenda a criar desde ambientes arquitetônicos ultra-realistas até jogos completos e mecânicas complexas. Além disso, um módulo exclusivo focado em Cinematics: crie seus próprios filmes e curtas de animação com qualidade Hollywoodiana em tempo real.",
    duration: "60 Horas",
    level: "Intermediário ao Avançado",
    tools: ["Unreal Engine 5.3", "Quixel Megascans", "Metahuman Creator", "Blender", "DaVinci Resolve"],
    modules: [
      "Fundamentos da UE5 e Interface",
      "Lumen e Nanite: Iluminação Realista",
      "Criação de Cenários e Level Design",
      "Blueprints: Programação Visual para Jogos",
      "Sequencer: Direção de Fotografia Virtual",
      "Renderização de Curtas Metragens",
      "Otimização para Games PC/Console"
    ],
    target: "Game Devs, Arquitetos, Cineastas e Artistas 3D.",
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416ef12?q=80&w=1000&auto=format&fit=crop"
  },
  '3': {
    title: "Edição & VFX Cinematic",
    subtitle: "A Arte da Pós-Produção",
    description: "Transforme vídeos brutos em obras de arte. Aprenda o fluxo de trabalho de cinema: Corte narrativo, Color Grading profissional, Sound Design imersivo e Efeitos Visuais (VFX) que explodem cabeças.",
    duration: "35 Horas",
    level: "Iniciante ao Intermediário",
    tools: ["Adobe Premiere", "After Effects", "DaVinci Resolve", "Audition"],
    modules: [
      "Narrativa e Ritmo de Edição",
      "Color Grading: Teoria das Cores e LUTs",
      "Composição e VFX no After Effects",
      "Rotoscopia e Tracking",
      "Sound Design e Mixagem",
      "Finalização e Exportação para Cinema/Web"
    ],
    target: "Editores de Vídeo, Videomakers e YouTubers.",
    image: "https://images.unsplash.com/photo-1535016120720-40c6874c3b13?q=80&w=1000&auto=format&fit=crop"
  },
  '4': {
    title: "Business Criativo",
    subtitle: "Viver de Arte é Possível",
    description: "Pare de ser apenas um artista e torne-se uma empresa. Aprenda a precificar, fechar contratos de alto valor, negociar com clientes grandes e escalar sua carreira freelancer ou agência.",
    duration: "15 Horas",
    level: "Todos os Níveis",
    tools: ["Notion", "Excel/Sheets", "CRM", "Contratos Jurídicos"],
    modules: [
      "Posicionamento de Marca Pessoal",
      "Precificação Estratégica",
      "Técnicas de Vendas e Negociação",
      "Contratos e Proteção Jurídica",
      "Gestão de Projetos e Prazos",
      "Escalando para Agência"
    ],
    target: "Freelancers e Donos de Agência.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
  },
  '5': {
    title: "Produção Musical Pro",
    subtitle: "Do Beat à Masterização",
    description: "Domine a arte de produzir música. Aprenda teoria musical aplicada, beatmaking, gravação, mixagem e masterização para lançar faixas com qualidade de estúdio.",
    duration: "45 Horas",
    level: "Intermediário",
    tools: ["Ableton Live", "FL Studio", "Logic Pro", "Plugins VST"],
    modules: [
      "Teoria Musical para Produtores",
      "Beatmaking e Ritmo",
      "Síntese Sonora e Sound Design",
      "Gravação de Voz e Instrumentos",
      "Mixagem Avançada",
      "Masterização para Streaming"
    ],
    target: "Músicos, DJs e Produtores.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop"
  },
  '6': {
    title: "Música com I.A.",
    subtitle: "O Futuro da Composição",
    description: "Aprenda a criar trilhas sonoras completas, vozes sintéticas cantadas e composições complexas usando Inteligência Artificial. Otimize seu fluxo de trabalho musical.",
    duration: "20 Horas",
    level: "Todos os Níveis",
    tools: ["Suno AI", "Udio", "Google MusicLM", "RVC (Voice Cloning)"],
    modules: [
      "Geração de Melodias com IA",
      "Clonagem de Voz para Música (AI Covers)",
      "Letras e Composição com LLMs",
      "Separando Stems com IA",
      "Copyright e Ética na Música IA"
    ],
    target: "Produtores Curiosos e Criadores de Conteúdo.",
    image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1000&auto=format&fit=crop"
  },
  '7': {
    title: "Produção de Videoclipes",
    subtitle: "Visual Music Mastery",
    description: "Especialize-se na estética dos videoclipes. Aprenda direção de arte, iluminação criativa, operação de câmera dinâmica e edição rítmica focada em música.",
    duration: "30 Horas",
    level: "Intermediário",
    tools: ["Câmeras Cinema Line", "Luzes RGB", "Premiere Pro"],
    modules: [
      "Pré-produção e Tratamento de Roteiro",
      "Direção de Arte e Figurino",
      "Iluminação Criativa para Clipes",
      "Movimentos de Câmera e Gimbal",
      "Edição Rítmica e Sync",
      "Efeitos Especiais para Clipes"
    ],
    target: "Videomakers e Diretores.",
    image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop"
  }
};

export const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = id ? COURSE_DATA[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
           <h2 className="text-2xl font-cyber mb-4">Curso não encontrado</h2>
           <button onClick={() => navigate('/cursos')} className="text-gold-500 hover:underline">Voltar para Cursos</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Hero Image Background */}
      <div className="h-[60vh] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        
        <div className="absolute top-24 left-0 w-full z-20 px-4 sm:px-6 lg:px-8">
             <button 
                onClick={() => navigate('/cursos')}
                className="flex items-center gap-2 text-white/70 hover:text-gold-500 transition-colors mb-8 group"
             >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Voltar para Cursos
             </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20 px-4 sm:px-6 lg:px-8 pb-12">
             <div className="max-w-7xl mx-auto">
                 <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold-500/50 rounded-full bg-black/50 backdrop-blur-md text-gold-500 text-xs font-display uppercase tracking-widest mb-4">
                    <DecryptedText text={course.level} />
                 </div>
                 <h1 className="text-4xl md:text-6xl font-cyber font-bold text-white mb-2">{course.title}</h1>
                 <h2 className="text-xl md:text-2xl font-light text-gray-300">{course.subtitle}</h2>
             </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Description */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-gold-500 font-display uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                        <Globe size={16} /> Sobre o Curso
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                        {course.description}
                    </p>
                </div>

                {/* Modules */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-gold-500 font-display uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                        <Layers size={16} /> Conteúdo Programático
                    </h3>
                    <div className="bg-zinc-900/50 border border-white/10 rounded-sm p-6 space-y-4">
                        {course.modules.map((mod: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-4 p-4 bg-black/40 rounded-sm hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-gold-500">
                                <span className="flex-shrink-0 w-8 h-8 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500 font-bold text-sm">
                                    {idx + 1}
                                </span>
                                <div>
                                    <h4 className="text-white font-medium">{mod}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Sidebar Info */}
            <div className="space-y-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                
                {/* Info Card */}
                <div className="bg-zinc-900 border border-gold-500/20 p-8 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.5)] sticky top-24">
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                        <span className="text-gray-400 flex items-center gap-2"><Clock size={18} /> Duração</span>
                        <span className="text-white font-bold">{course.duration}</span>
                    </div>
                    
                    <div className="mb-8">
                         <h4 className="text-gold-500 font-display uppercase tracking-widest text-xs mb-4">Ferramentas Inclusas</h4>
                         <div className="flex flex-wrap gap-2">
                             {course.tools.map((tool: string) => (
                                 <span key={tool} className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-gray-300 rounded-sm">
                                     {tool}
                                 </span>
                             ))}
                         </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-gold-500 font-display uppercase tracking-widest text-xs mb-2">Para quem é?</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{course.target}</p>
                    </div>

                    <button className="w-full py-4 bg-gold-500 text-black font-bold font-display uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-4">
                        Inscrever-se Agora
                    </button>
                    <p className="text-center text-xs text-gray-500">Vagas limitadas para a próxima turma.</p>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};