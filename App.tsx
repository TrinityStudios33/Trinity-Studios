import React from 'react';
import MatrixBackground from './components/Background/MatrixBackground';
import { Navbar } from './components/Navigation/Navbar';
import { Hero } from './components/Sections/Hero';
import { About } from './components/Sections/About';
import { Services } from './components/Sections/Services';
import { Portfolio } from './components/Sections/Portfolio';
import { Process } from './components/Sections/Process';
import { Contact } from './components/Sections/Contact';
import { Footer } from './components/Layout/Footer';
import { ChatWidget } from './components/Features/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-gold-500 selection:text-black">
      <MatrixBackground />
      
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Contact />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;