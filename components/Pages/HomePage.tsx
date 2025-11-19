import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../Sections/Hero';
import { About } from '../Sections/About';
import { Services } from '../Sections/Services';
import { Clients } from '../Sections/Clients';
import { Process } from '../Sections/Process';
import { Contact } from '../Sections/Contact';

export const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if we have a targetId passed via state (from Navbar navigation)
    if (location.state && location.state.targetId) {
      const targetId = location.state.targetId;
      const element = document.querySelector(targetId);
      
      if (element) {
        // Small delay to ensure DOM is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // If no specific target, ensure we start at top
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Services isPreview={true} />
      <Clients />
      <Process />
      <Contact />
    </>
  );
};