import React, { useState, useEffect } from 'react';
import { PortfolioItem } from '../../types';
import { PlayCircle, X, Play } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const portfolioData: PortfolioItem[] = [
  { 
    id: 1, 
    title: "Cyberpunk City", 
    category: "3D", 
    imageUrl: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1920&auto=format&fit=crop", 
    videoUrl: "https://vimeo.com/76979871" // The Third & The Seventh (Vimeo - Architectural 3D Masterpiece)
  },
  { 
    id: 2, 
    title: "Neon Brand", 
    category: "Design", 
    imageUrl: "https://picsum.photos/seed/neon/800/600" 
  },
  { 
    id: 3, 
    title: "Future Tech Doc", 
    category: "Documentários", 
    imageUrl: "https://picsum.photos/seed/tech/800/600",
    videoUrl: "https://www.youtube.com/watch?v=qC5KtatMcUw" // Unreal Engine 5 Demo (Official - Safe for Embed)
  },
  { 
    id: 4, 
    title: "AI Avatar Series", 
    category: "IA", 
    imageUrl: "https://picsum.photos/seed/avatar/800/600" 
  },
  { 
    id: 5, 
    title: "Luxury Car Spot", 
    category: "Comerciais", 
    imageUrl: "https://picsum.photos/seed/car/800/600" 
  },
  { 
    id: 6, 
    title: "Abstract Motion", 
    category: "Vídeo", 
    imageUrl: "https://picsum.photos/seed/motion/800/600" 
  },
];

const categories = ['Todos', 'Vídeo', 'IA', '3D', 'Design', 'Documentários', 'Comerciais'];

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const location = useLocation();

  // Auto-select category if passed via navigation state (e.g. from Services page)
  useEffect(() => {
    if (location.state && location.state.category) {
      const targetCategory = location.state.category;
      // Verify if category exists in our list to avoid empty states
      if (categories.includes(targetCategory)) {
        setActiveFilter(targetCategory);
        
        // Smooth scroll to portfolio section to ensure visibility
        const element = document.getElementById('portfolio');
        if (element) {
            setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        }
      }
    }
  }, [location]);

  const filteredItems = activeFilter === 'Todos' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeFilter);

  // Robust helper to convert YouTube/Vimeo links to embed URLs
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('vimeo.com')) {
        // Matches /123456 in vimeo.com/123456 or vimeo.com/channels/staffpicks/123456
        const match = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
        const vimeoId = match ? match[1] : '';
        return vimeoId ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0` : url;
      }
      
      if (url.includes('youtu')) {
        // Robust YouTube ID extraction (covers youtu.be, youtube.com/watch?v=, embed/, etc)
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        const videoId = (match && match[2].length === 11) ? match[2] : null;
        
        return videoId 
          ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` 
          : url;
      }
      
      return url;
    } catch (e) {
      console.error("Error parsing video URL", e);
      return url;
    }
  };

  return (
    <section id="portfolio" className="py-12 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 opacity-0 animate-fade-in-up">
          <div>
            <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-3">Cases de Sucesso</h2>
            <h3 className="text-3xl md:text-5xl font-cyber font-bold text-white">Portfólio Trinity</h3>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1 text-xs font-display uppercase tracking-wider border transition-all duration-300 ${
                  activeFilter === cat 
                    ? 'border-gold-500 text-black bg-gold-500 font-bold' 
                    : 'border-white/20 text-gray-400 hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
                <div 
                key={item.id} 
                onClick={() => item.videoUrl ? setSelectedProject(item) : null}
                className={`group relative aspect-[4/3] overflow-hidden bg-gray-900 ${item.videoUrl ? 'cursor-pointer' : ''}`}
                >
                <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-gold-500 text-xs font-display uppercase tracking-widest mb-2 block">
                    {item.category}
                    </span>
                    <h4 className="text-white text-xl font-bold font-cyber group-hover:text-gold-100 transition-colors">
                    {item.title}
                    </h4>
                </div>

                {/* Play Icon Center (Only if video exists) */}
                {item.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="w-16 h-16 rounded-full bg-gold-500/90 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform">
                        <Play className="text-black fill-current ml-1" size={32} />
                    </div>
                    </div>
                )}
                
                {/* Border reveal */}
                <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/50 transition-colors duration-500 pointer-events-none"></div>
                </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-20 border border-white/5 bg-white/5 rounded-lg">
                <p className="font-display uppercase tracking-widest mb-2">Em Breve</p>
                <p className="text-sm">Novos projetos de {activeFilter} sendo adicionados.</p>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal (Lightbox) */}
      {selectedProject && selectedProject.videoUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-zinc-900 border border-white/10 shadow-2xl rounded-sm overflow-hidden flex flex-col">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:text-gold-500 hover:bg-black transition-colors"
            >
              <X size={24} />
            </button>

            {/* Header inside modal */}
            <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/90 to-transparent z-40 pointer-events-none">
              <h3 className="text-white font-cyber font-bold text-lg drop-shadow-md">{selectedProject.title}</h3>
              <p className="text-gold-500 text-xs font-display uppercase tracking-wider drop-shadow-md">{selectedProject.category}</p>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full pt-[56.25%] bg-black">
              <iframe
                src={getEmbedUrl(selectedProject.videoUrl)}
                className="absolute inset-0 w-full h-full"
                title={selectedProject.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};