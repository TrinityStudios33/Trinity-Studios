import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number; // ms between frame updates
  revealSpeed?: number; // How fast the real text reveals
  useOriginalColor?: boolean; // If false, scrambled text might be a different color
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

export const DecryptedText: React.FC<DecryptedTextProps> = ({ 
  text, 
  className = "", 
  speed = 30,
  revealSpeed = 2.0 // Increased from 0.5 to 2.0 for much faster animation
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Increased threshold from 0.1 to 0.5
        // The animation will only start when 50% of the text is visible in the viewport
        if (entries[0].isIntersecting && !hasAnimated) {
          setIsAnimating(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 } 
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!isAnimating) return;

    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            // If the character is a space, keep it a space
            if (letter === " ") return " ";
            
            // If we've passed this index in the iteration, show the real letter
            if (index < iteration) {
              return text[index];
            }
            
            // Otherwise show a random matrix character
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
        setDisplayText(text); // Ensure final state is clean
      }

      iteration += revealSpeed;
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, text, speed, revealSpeed]);

  return (
    <span ref={elementRef} className={`${className} inline-block`}>
      {displayText}
    </span>
  );
};