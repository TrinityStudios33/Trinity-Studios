import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { SmokeEffect } from '../Background/SmokeEffect';
import { FractalFormulas } from '../Background/FractalFormulas';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Produção de Vídeo',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Olá Trinity Studios! 🚀

Me chamo *${formData.name}*.
Gostaria de falar sobre um projeto de: *${formData.projectType}*.

*Mensagem:*
${formData.message}

--------------------------------
*Meus Contatos:*
📞 Telefone: ${formData.phone}
📧 Email: ${formData.email}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5581999492208?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="py-24 relative scroll-mt-32 z-20 bg-black overflow-hidden">
      {/* Smoke Background Overlay */}
      <SmokeEffect />
      
      {/* Geometric Formulas Overlay */}
      <FractalFormulas />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12 opacity-0 animate-fade-in-up">
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

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 md:p-12 border border-white/10 backdrop-blur-sm rounded-sm mb-12 shadow-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-display uppercase tracking-widest text-gold-500">Nome</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/10 focus:border-gold-500 text-white px-4 py-3 outline-none transition-colors"
                placeholder="Seu nome"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-display uppercase tracking-widest text-gold-500">E-mail</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/10 focus:border-gold-500 text-white px-4 py-3 outline-none transition-colors"
                  placeholder="(00) 00000-0000"
                />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-display uppercase tracking-widest text-gold-500">Tipo de Projeto</label>
               <select 
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 focus:border-gold-500 text-gray-300 px-4 py-3 outline-none transition-colors"
               >
                  <option>Produção de Vídeo</option>
                  <option>Arquitetura</option>
                  <option>Animação 3D</option>
                  <option>Animação 2D</option>
                  <option>Criação de Músicas</option>
                  <option>Narração</option>
                  <option>Jingles</option>
                  <option>Criação de Site</option>
                  <option>Automação</option>
                  <option>Consultoria</option>
                  <option>Fotografia</option>
                  <option>Social Media</option>
                  <option>Cursos e Mentorias</option>
                  <option>Outro</option>
               </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-display uppercase tracking-widest text-gold-500">Mensagem</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4} 
              className="w-full bg-black/50 border border-white/10 focus:border-gold-500 text-white px-4 py-3 outline-none transition-colors resize-none"
              placeholder="Descreva seu projeto..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-yellow-600 via-gold-500 to-yellow-600 text-black font-bold font-display uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] mt-4"
          >
            Enviar Mensagem
          </button>
        </form>

      </div>
    </section>
  );
};