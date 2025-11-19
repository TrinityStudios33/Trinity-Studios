import React, { useEffect } from 'react';
import { Portfolio } from '../Sections/Portfolio';

export const PortfolioPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-black">
      <Portfolio />
    </div>
  );
};