import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '../UI/Logo';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string, isAnchor: boolean) => {
    e.preventDefault();
    setIsOpen(false);

    if (isAnchor) {
      // If it's the home route (check for both empty string and slash in HashRouter)
      if (location.pathname === '/' || location.pathname === '') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home and pass the target ID in state to trigger scroll after load
        navigate('/', { state: { targetId: target } });
      }
    } else {
      // Route navigation (e.g. /portfolio, /ai-lab, /servicos)
      navigate(target);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#inicio', isAnchor: true },
    { name: 'Sobre', href: '#sobre', isAnchor: true },
    { name: 'Serviços', href: '/servicos', isAnchor: false },
    { name: 'Portfólio', href: '/portfolio', isAnchor: false },
    { name: 'AI Lab', href: '/ai-lab', isAnchor: false },
    { name: 'Processo', href: '#processo', isAnchor: true },
    { name: 'Contato', href: '#contato', isAnchor: true },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Anchor to Top */}
          <a 
            href="#inicio" 
            onClick={(e) => handleNavClick(e, '#inicio', true)}
            className="flex-shrink-0 cursor-pointer"
          >
            <Logo className="h-10 md:h-12" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isAnchor)}
                className="text-sm font-display tracking-widest uppercase text-gray-300 hover:text-gold-500 transition-colors duration-300 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            
            {/* CTA - Direct WhatsApp Link */}
            <a 
              href="https://wa.me/5581999492208"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-display font-bold uppercase tracking-widest border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all duration-300"
            >
              Solicitar Projeto
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gold-500 hover:text-white transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-gold-500/30 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isAnchor)}
                className="block px-3 py-2 text-base font-display uppercase tracking-wider text-gray-300 hover:text-gold-500 hover:bg-white/5 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/5581999492208"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-display font-bold uppercase tracking-wider text-gold-500 hover:bg-white/5"
            >
              Solicitar Projeto
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};