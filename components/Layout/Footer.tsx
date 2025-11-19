import React from 'react';
import { Logo } from '../UI/Logo';
import { Instagram, Linkedin, Youtube, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-50 bg-zinc-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Logo className="h-12 mb-6" />
            <p className="text-gray-500 text-sm text-center md:text-left leading-relaxed max-w-xs">
              Criatividade, técnica e inteligência artificial em um ecossistema de produção único.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h4 className="text-gold-500 font-display text-sm uppercase tracking-widest mb-2">Contato & Localização</h4>
            
            <a 
              href="https://wa.me/5581999492208" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group"
            >
              <div className="p-2 border border-white/10 rounded-full group-hover:border-green-500/50 group-hover:bg-green-500/10 transition-all">
                <Phone size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Whatsapp</span>
                <span className="font-sans text-sm text-white group-hover:text-green-400 transition-colors">(81) 9 9949-2208</span>
              </div>
            </a>

            <div className="flex items-start gap-3 text-gray-400 group">
               <div className="p-2 border border-white/10 rounded-full mt-1 group-hover:border-gold-500/50 group-hover:bg-gold-500/10 transition-all">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Endereço</span>
                <span className="font-sans text-sm max-w-[220px] leading-relaxed text-white">
                  Rua Joaquim Nabuco N19, Paratibe,<br/> Paulista, PE 53413-525
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Socials & Email */}
          <div className="flex flex-col items-center md:items-end">
             <div className="text-center md:text-right mb-6">
                <h4 className="text-gold-500 font-display text-sm uppercase tracking-widest mb-4">Conecte-se</h4>
                <div className="flex space-x-4 justify-center md:justify-end">
                    <a href="#" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-gold-500 transition-all"><Instagram size={20} /></a>
                    <a href="#" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-gold-500 transition-all"><Linkedin size={20} /></a>
                    <a href="#" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-gold-500 transition-all"><Youtube size={20} /></a>
                    <a href="#" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-gold-500 transition-all"><Twitter size={20} /></a>
                </div>
             </div>

             <a href="mailto:comercial@trinitystudios.com" className="flex items-center gap-2 text-gray-400 hover:text-gold-500 transition-colors font-display tracking-wide text-sm border border-white/10 px-4 py-2 rounded-full hover:border-gold-500/50">
                <Mail size={16} />
                comercial@trinitystudios.com
             </a>
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