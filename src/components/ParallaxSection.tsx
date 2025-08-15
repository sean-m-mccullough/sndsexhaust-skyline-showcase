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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrolled = window.pageYOffset;
      const parallaxElement = sectionRef.current;
      const elementTop = parallaxElement.offsetTop;
      const elementHeight = parallaxElement.offsetHeight;
      const windowHeight = window.innerHeight;

      // Check if element is in viewport with better bounds
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight + windowHeight) {
        const yPos = -(scrolled - elementTop) * speed;
        // Use transform3d for better performance and add will-change
        parallaxElement.style.transform = `translate3d(0, ${yPos}px, 0)`;
        parallaxElement.style.willChange = 'transform';
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
      if (sectionRef.current) {
        sectionRef.current.style.willChange = 'auto';
      }
    };
  }, [speed]);

  return (
    <div 
      ref={sectionRef}
      className={`parallax-container ${className}`}
      id={id}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundAttachment: 'scroll', // Changed from 'fixed' for better mobile support
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: 'hsl(var(--muted))', // Fallback background color
        position: 'relative'
      }}
    >
      {children}
    </div>
  );
};