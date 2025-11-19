import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MatrixBackground from './components/Background/MatrixBackground';
import { Navbar } from './components/Navigation/Navbar';
import { HomePage } from './components/Pages/HomePage';
import { PortfolioPage } from './components/Pages/PortfolioPage';
import { Footer } from './components/Layout/Footer';
import { ChatWidget } from './components/Features/ChatWidget';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="bg-black min-h-screen text-white selection:bg-gold-500 selection:text-black">
        <MatrixBackground />
        
        <Navbar />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </HashRouter>
  );
};

export default App;