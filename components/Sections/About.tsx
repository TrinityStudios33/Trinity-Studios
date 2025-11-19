import React, { useState, useEffect, useRef } from 'react';
import { GeometricMandala } from '../Background/GeometricMandala';
import { DecryptedText } from '../UI/DecryptedText';
import { TypewriterText } from '../UI/TypewriterText';

// --- GALERIA DE TRANSFORMAÇÃO ---
const KEVIN_VARIANTS = [
  "https://i.postimg.cc/qvsnNwwg/kevin.png", // Original
  "https://i.postimg.cc/bwxbZgTM/00a7d3f3-1c17-42c7-a7c5-105c75069b51.jpg",
  "https://i.postimg.cc/4x6tYP5S/176fb377-806b-4365-b189-6641c98bd6f5.jpg",
  "https://i.postimg.cc/2SQv1GwX/37e4bcd2-0906-4e2b-aad3-516aaab8ad66.jpg",
  "https://i.postimg.cc/K8PL1fNw/7fb14f70-469b-4513-ad4a-5dd95bb08e7d.jpg",
  "https://i.postimg.cc/bwxbZggh/8152370a-00c9-472b-8f2b-cc2a35d498d7.jpg",
  "https://i.postimg.cc/CxGDR770/a800308b-4f1c-4b6c-bf9e-55a118114e75.jpg",
  "https://i.postimg.cc/6prR8cc9/af457bb8-a406-4b05-aef9-9e2776fa4f7a-min.webp",
  "https://i.postimg.cc/pLf8mCCL/be5b687d-2f51-418a-931f-84327a161fc8.png"
];

// --- COMPONENTE DE TRANSIÇÃO MATRIX ---
const MatrixTransitionOverlay: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops above canvas
    for(let i=0; i<columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    let animationFrameId: number;
    let opacity = 0;

    const draw = () => {
      // If active, ramp up opacity. If not, fade out.
      if (isActive && opacity < 1) opacity += 0.05;
      if (!isActive && opacity > 0) opacity -= 0.05;

      if (opacity <= 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (isActive) animationFrameId = requestAnimationFrame(draw);
          return;
      }

      // Semi-transparent black background to create trails
      ctx.fillStyle = `rgba(0, 0, 0, 0.1)`; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font styles
      ctx.font = `bold ${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Random coloring logic for "Digital Rain" look
        const isWhite = Math.random() > 0.95;
        const isBrightGreen = Math.random() > 0.8;
        
        if (isWhite) ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        else if (isBrightGreen) ctx.fillStyle = `rgba(0, 255, 70, ${opacity})`;
        else ctx.fillStyle = `rgba(0, 140, 40, ${opacity})`; // Darker matrix green

        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move drop
        // Speed depends on opacity (chaos increases speed)
        drops[i] += isActive ? 2 : 1;

        // Reset drops to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
    />
  );
};

export const About: React.FC = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);

  useEffect(() => {
    // Preload images
    KEVIN_VARIANTS.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      // PHASE 1: Start Matrix Rain, Fade Out Image
      setIsTransitioning(true);
      
      setTimeout(() => {
          setImageOpacity(0); // Dissolve image into the code
      }, 200);

      // PHASE 2: Swap Image Source (while invisible)
      setTimeout(() => {
        setCurrentImgIndex(prev => (prev + 1) % KEVIN_VARIANTS.length);
      }, 1000);

      // PHASE 3: Fade In New Image, Stop Matrix Rain
      setTimeout(() => {
        setImageOpacity(1); // Reconstruct image
        setIsTransitioning(false);
      }, 1500);

    }, 4000); // Total cycle time

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="sobre" className="py-24 bg-black relative overflow-hidden scroll-mt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black pointer-events-none" />
      
      {/* Animated Geometric Background */}
      <GeometricMandala />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Founder Image / Visual Element */}
          <div className="relative order-2 lg:order-1 flex justify-center opacity-0 animate-fade-in-left" style={{ animationDelay: '0.3s' }}>
             {/* Glow Effect */}
             <div className={`absolute top-10 inset-x-10 bottom-0 bg-gold-500/20 blur-3xl rounded-full opacity-40 pointer-events-none transition-all duration-1000 ${isTransitioning ? 'opacity-60 bg-green-500/30 scale-105' : 'scale-100'}`}></div>
             
             {/* Image Card */}
             <div className="relative w-full max-w-sm md:max-w-md group perspective-1000">
                {/* Frame Border */}
                <div className="absolute inset-0 border border-gold-500/30 rounded-2xl translate-x-4 translate-y-4 z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 z-10 shadow-2xl shadow-black/50 min-h-[400px]">
                    
                    {/* THE MATRIX CANVAS OVERLAY */}
                    <MatrixTransitionOverlay isActive={isTransitioning} />

                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-30"></div>

                    {/* The Image with Dynamic Opacity for smooth dissolve */}
                    <img 
                      src={KEVIN_VARIANTS[currentImgIndex]}
                      alt="Kevin Marques - Founder" 
                      style={{ opacity: imageOpacity }}
                      className={`w-full h-auto object-cover transition-all duration-700 ease-in-out
                        ${isTransitioning 
                          ? 'scale-105 contrast-125 blur-[2px]' // Slight distortion during dissolve
                          : 'scale-100 blur-0'
                        } 
                      `}
                    />
                    
                    {/* Nameplate */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-center z-40 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
                        <div className="inline-block px-4 py-1 mb-2 border border-gold-500/30 rounded-full bg-black/50 backdrop-blur-sm">
                            <span className="text-gold-500 text-[10px] md:text-xs font-display tracking-[0.3em] uppercase flex items-center gap-2 justify-center">
                                {isTransitioning ? (
                                   <span className="font-mono text-green-500 tracking-widest animate-pulse">DECODING...</span>
                                ) : "Fundador & Diretor"}
                            </span>
                        </div>
                        <h3 className="text-2xl font-cyber font-bold text-white uppercase tracking-wider drop-shadow-lg">
                            Kevin Marques
                        </h3>
                    </div>
                </div>
             </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 opacity-0 animate-fade-in-right" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-4">
              <DecryptedText text="Nossa História" />
            </h2>
            <h3 className="text-3xl md:text-4xl font-cyber font-bold text-white mb-6">
              <DecryptedText text="Da visão à realidade" />
            </h3>
            
            {/* TYPEWRITER EFFECT PARAGRAPHS */}
            <TypewriterText 
              text="A trajetória da Trinity Studios nasce da visão criativa de Kevin Marques, que iniciou sua jornada no audiovisual em 2018 ao fundar a antiga JKSTUDIOS. Desde o começo, o foco sempre esteve na construção de experiências visuais e sonoras capazes de envolver, emocionar e contar histórias com personalidade própria."
              className="text-gray-300 text-lg leading-relaxed mb-6"
              speed={15}
            />

            <TypewriterText 
              text="O trabalho começou com canais no YouTube e a criação de cenários em 3D. Aos poucos, a demanda por qualidade e inovação cresceu, abrindo espaço para trilhas sonoras originais, composições musicais, produções completas de vídeo e trabalhos voltados para redes sociais. Cada projeto se tornou uma oportunidade de elevar o nível, expandir horizontes e explorar novas possibilidades criativas."
              className="text-gray-400 leading-relaxed mb-6"
              speed={10}
            />

            <TypewriterText 
              text="Com o tempo, o nome evoluiu e a marca se tornou Trinity Studios, representando uma nova fase, mais madura e tecnológica, sem perder a essência artística que deu início a tudo. Hoje, a empresa conta com uma equipe completa, preparada e equipada com as melhores ferramentas do mercado."
              className="text-gray-400 leading-relaxed mb-8"
              speed={10}
            />
            
            <div className="flex items-center gap-4 opacity-80">
                <div className="h-px w-12 bg-gold-500"></div>
                <span className="font-cyber text-xs text-gold-500 tracking-widest">TRINITY ORIGINAL</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};