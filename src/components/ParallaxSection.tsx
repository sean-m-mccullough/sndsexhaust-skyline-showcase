import React, { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  speed?: number;
  className?: string;
  id?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  backgroundImage,
  speed = 0.5,
  className = '',
  id
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!backgroundRef.current || !sectionRef.current) return;

      const scrolled = window.pageYOffset;
      const sectionElement = sectionRef.current;
      const backgroundElement = backgroundRef.current;
      const elementTop = sectionElement.offsetTop;
      const elementHeight = sectionElement.offsetHeight;
      const windowHeight = window.innerHeight;

      // Check if element is in viewport
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = (scrolled - elementTop) * speed;
        // Only transform the background, not the content
        backgroundElement.style.transform = `translate3d(0, ${yPos}px, 0)`;
        backgroundElement.style.willChange = 'transform';
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
        setTimeout(() => { ticking = false; }, 16); // ~60fps
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    return () => {
      window.removeEventListener('scroll', requestTick);
      if (backgroundRef.current) {
        backgroundRef.current.style.willChange = 'auto';
      }
    };
  }, [speed]);

  return (
    <div 
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      id={id}
    >
      {/* Background layer that moves with parallax */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundColor: 'hsl(var(--muted))',
          transform: 'scale(1.1)', // Scale up to prevent gaps during parallax
        }}
      />
      
      {/* Content layer that stays in place */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};