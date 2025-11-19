import React, { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let columns: number = 0;
    let drops: number[] = [];
    
    const fontSize = 14;
    const chars = "01010123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const initMatrix = () => {
      // Set canvas size to window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Calculate columns
      const newColumns = Math.floor(canvas.width / fontSize);
      
      // If columns increased, extend the drops array
      // If decreased, slice it (or just reset to be safe and simple)
      if (newColumns !== columns) {
        columns = newColumns;
        drops = new Array(columns).fill(1).map(() => Math.random() * -100); // Start at random heights off-screen
      }
    };

    // Initialize
    initMatrix();
    
    // Handle resize
    window.addEventListener('resize', initMatrix);

    const draw = () => {
      // Dark fade to clear trails faster (0.1 = trails last a bit, 0.2 = trails vanish fast)
      // Using 0.1 for a dark, clean look
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Very subtle text opacity
        const isBright = Math.random() > 0.99;
        ctx.fillStyle = isBright ? '#D4AF37' : 'rgba(212, 175, 55, 0.15)';

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', initMatrix);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default MatrixBackground;