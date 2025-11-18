import React from 'react';
import { Logo } from '../UI/Logo';
import { Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start">
            <Logo className="h-12 mb-6" />
            <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
              Criatividade, técnica e inteligência artificial em um ecossistema de produção único.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
             <a href="mailto:contato@trinitystudios.com" className="text-white text-lg hover:text-gold-500 transition-colors mb-4 font-display tracking-wide">
                comercial@trinitystudios.com
             </a>
             <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-gray-500 hover:text-gold-500 transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-gray-500 hover:text-gold-500 transition-colors"><Youtube size={20} /></a>
                <a href="#" className="text-gray-500 hover:text-gold-500 transition-colors"><Twitter size={20} /></a>
             </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-600 text-xs uppercase tracking-widest font-display">
            © {new Date().getFullYear()} Trinity Studios. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};