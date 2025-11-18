import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contato" className="py-24 bg-black relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-gold-500 font-display text-sm uppercase tracking-[0.3em] mb-3">Comece Agora</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Materialize sua Visão</h3>
          <p className="text-gray-400">Preencha o formulário abaixo e entraremos em contato brevemente.</p>
        </div>

        <form className="space-y-6 bg-white/5 p-8 md:p-12 border border-white/10 backdrop-blur-sm rounded-sm">
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

      </div>
    </section>
  );
};