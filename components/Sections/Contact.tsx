import React from 'react';
import { MessageCircle, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contato" className="py-24 bg-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-3">Comece Agora</h2>
          <h3 className="text-3xl md:text-5xl font-cyber font-bold text-white mb-6">Materialize sua Visão</h3>
          <p className="text-gray-400 max-w-lg mx-auto">
            Estamos prontos para levar seu projeto ao próximo nível. Preencha o formulário ou fale diretamente conosco.
          </p>

          {/* Direct Contact Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <a 
              href="https://wa.me/5581999492208"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-900/20 border border-green-500/30 hover:bg-green-900/40 hover:border-green-400 text-green-400 font-display uppercase tracking-widest text-sm font-bold rounded-sm transition-all group shadow-[0_0_20px_rgba(74,222,128,0.1)] hover:shadow-[0_0_30px_rgba(74,222,128,0.2)]"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Conversar no WhatsApp
              <span className="flex h-2 w-2 relative ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </a>
            <span className="text-gray-600 text-xs tracking-widest font-display">(81) 9 9949-2208</span>
          </div>
        </div>

        <form className="space-y-6 bg-white/5 p-8 md:p-12 border border-white/10 backdrop-blur-sm rounded-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-display uppercase tracking-widest text-gold-500">Nome</label>
              <input 
                type="text" 
                className="w-full bg-black/50 border border-white/10 focus:border-gold-500 text-white px-4 py-3 outline-none transition-colors"
                placeholder="Seu nome"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-display uppercase tracking-widest text-gold-500">E-mail</label>
              <input 
                type="email" 
                className="w-full bg-black/50 border border-white/10 focus:border-gold-500 text-white px-4 py-3 outline-none transition-colors"
                placeholder="seu@email.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-xs font-display uppercase tracking-widest text-gold-500">Telefone</label>
               <input 
                  type="tel" 
                  className="w-full bg-black/50 border border-white/10 focus:border-gold-500 text-white px-4 py-3 outline-none transition-colors"
                  placeholder="(00) 00000-0000"
                />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-display uppercase tracking-widest text-gold-500">Tipo de Projeto</label>
               <select className="w-full bg-black/50 border border-white/10 focus:border-gold-500 text-gray-300 px-4 py-3 outline-none transition-colors">
                  <option>Produção de Vídeo</option>
                  <option>Inteligência Artificial</option>
                  <option>Identidade Visual</option>
                  <option>Animação 3D</option>
                  <option>Outro</option>
               </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-display uppercase tracking-widest text-gold-500">Mensagem</label>
            <textarea 
              rows={4} 
              className="w-full bg-black/50 border border-white/10 focus:border-gold-500 text-white px-4 py-3 outline-none transition-colors resize-none"
              placeholder="Descreva seu projeto..."
            ></textarea>
          </div>

          <button 
            type="button" 
            className="w-full py-4 bg-gradient-to-r from-yellow-600 via-gold-500 to-yellow-600 text-black font-bold font-display uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] mt-4"
          >
            Enviar Mensagem
          </button>
        </form>

        {/* Location Info */}
        <div className="border-t border-white/10 pt-8 text-center">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="p-3 bg-gold-500/10 rounded-full text-gold-500 mb-2">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-gold-500 text-xs font-display uppercase tracking-widest mb-2">Sede</p>
              <p className="text-white font-light">
                Rua Joaquim Nabuco N19, Paratibe, Paulista, PE 53413-525
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};