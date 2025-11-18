import React, { useState } from 'react';
import { PortfolioItem } from '../../types';
import { PlayCircle } from 'lucide-react';

const portfolioData: PortfolioItem[] = [
  { id: 1, title: "Cyberpunk City", category: "3D", imageUrl: "https://picsum.photos/seed/cyber/800/600" },
  { id: 2, title: "Neon Brand", category: "Design", imageUrl: "https://picsum.photos/seed/neon/800/600" },
  { id: 3, title: "Future Tech Doc", category: "Documentários", imageUrl: "https://picsum.photos/seed/tech/800/600" },
  { id: 4, title: "AI Avatar Series", category: "IA", imageUrl: "https://picsum.photos/seed/avatar/800/600" },
  { id: 5, title: "Luxury Car Spot", category: "Comerciais", imageUrl: "https://picsum.photos/seed/car/800/600" },
  { id: 6, title: "Abstract Motion", category: "Vídeo", imageUrl: "https://picsum.photos/seed/motion/800/600" },
];

const categories = ['Todos', 'Vídeo', 'IA', '3D', 'Design', 'Documentários', 'Comerciais'];

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredItems = activeFilter === 'Todos' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-3">Cases de Sucesso</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white">Portfólio Trinity</h3>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-gray-900">
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
                <h4 className="text-white text-xl font-bold font-serif group-hover:text-gold-100 transition-colors">
                  {item.title}
                </h4>
              </div>

              {/* Play Icon Center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="text-gold-500 w-16 h-16 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]" strokeWidth={1} />
              </div>
              
              {/* Border reveal */}
              <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/50 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};