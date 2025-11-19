import React, { useEffect } from 'react';
import { Services } from '../Sections/Services';

export const ServicesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Services isPreview={false} />
    </div>
  );
};