import React from 'react';

// --- ÁREA DE CONFIGURAÇÃO DA FOTO ---
// Cole o link direto da sua foto aqui dentro das aspas.
// Exemplo Google Drive (convertido): "https://drive.google.com/uc?export=view&id=SEU_ID"
// Exemplo Postimages/Imgur: "https://i.postimg.cc/xyz/kevin.png"
// Se deixar vazio ou o link falhar, usará a imagem padrão.
const LINK_DA_FOTO = "https://i.postimg.cc/Sxc1MwZV/kevin.png"; 
// ------------------------------------

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black pointer-events-none" />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-900/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Founder Image / Visual Element */}
          <div className="relative order-2 lg:order-1 flex justify-center">
             {/* Glow Effect */}
             <div className="absolute top-10 inset-x-10 bottom-0 bg-gold-500/20 blur-3xl rounded-full opacity-40 pointer-events-none"></div>
             
             {/* Image Card */}
             <div className="relative w-full max-w-sm md:max-w-md">
                {/* Frame Border */}
                <div className="absolute inset-0 border border-gold-500/30 rounded-2xl translate-x-4 translate-y-4 z-0"></div>
                
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 z-10 shadow-2xl shadow-black/50 group">
                    <img 
                      src={LINK_DA_FOTO}
                      onError={(e) => {
                        // Fallback image if the link is broken or empty
                        e.currentTarget.src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop";
                        e.currentTarget.onerror = null;
                      }}
                      alt="Kevin Marques - Founder" 
                      className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110 mask-image-gradient"
                    />
                    
                    {/* Gradient Overlay for Blending (Simulates background removal at bottom) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-100 h-full top-1/3"></div>

                    {/* Name Tag */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-center z-20">
                        <div className="inline-block px-4 py-1 mb-2 border border-gold-500/30 rounded-full bg-black/50 backdrop-blur-sm">
                            <span className="text-gold-500 text-[10px] md:text-xs font-display tracking-[0.3em] uppercase">
                                Fundador & Diretor
                            </span>
                        </div>
                        <h3 className="text-2xl font-cyber font-bold text-white uppercase tracking-wider">
                            Kevin Marques
                        </h3>
                    </div>
                </div>
             </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-4">
              Nossa História
            </h2>
            <h3 className="text-3xl md:text-4xl font-cyber font-bold text-white mb-6">
              Da visão à realidade
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              A trajetória da Trinity Studios nasce da visão criativa de Kevin Marques, que iniciou sua jornada no audiovisual em 2018 ao fundar a antiga JKSTUDIOS. Desde o começo, o foco sempre esteve na construção de experiências visuais e sonoras capazes de envolver, emocionar e contar histórias com personalidade própria.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              O trabalho começou com canais no YouTube e a criação de cenários em 3D. Aos poucos, a demanda por qualidade e inovação cresceu, abrindo espaço para trilhas sonoras originais, composições musicais, produções completas de vídeo e trabalhos voltados para redes sociais. Cada projeto se tornou uma oportunidade de elevar o nível, expandir horizontes e explorar novas possibilidades criativas.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Com o tempo, o nome evoluiu e a marca se tornou Trinity Studios, representando uma nova fase, mais madura e tecnológica, sem perder a essência artística que deu início a tudo. Hoje, a empresa conta com uma equipe completa, preparada e equipada com as melhores ferramentas do mercado.
            </p>
            
            {/* Signature / Tech Element */}
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