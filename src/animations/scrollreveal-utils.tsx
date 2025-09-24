'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    ScrollReveal: any;
  }
}

export class ScrollRevealUtils {
  static init() {
    if (typeof window !== 'undefined' && !window.ScrollReveal) {
      return import('scrollreveal').then((module) => {
        window.ScrollReveal = module.default;
        return window.ScrollReveal();
      });
    }
    return Promise.resolve(window.ScrollReveal?.());
  }

  static async revealElements(selector: string, options: any = {}) {
    const sr = await this.init();
    if (sr) {
      sr.reveal(selector, {
        origin: 'bottom',
        distance: '50px',
        duration: 800,
        delay: 200,
        easing: 'ease-out',
        scale: 0.9,
        opacity: 0,
        reset: false,
        ...options
      });
    }
  }

  static async revealFromLeft(selector: string, options: any = {}) {
    return this.revealElements(selector, {
      origin: 'left',
      distance: '100px',
      duration: 1000,
      ...options
    });
  }

  static async revealFromRight(selector: string, options: any = {}) {
    return this.revealElements(selector, {
      origin: 'right',
      distance: '100px',
      duration: 1000,
      ...options
    });
  }

  static async revealFromTop(selector: string, options: any = {}) {
    return this.revealElements(selector, {
      origin: 'top',
      distance: '100px',
      duration: 1000,
      ...options
    });
  }

  static async revealScale(selector: string, options: any = {}) {
    return this.revealElements(selector, {
      origin: 'bottom',
      distance: '0px',
      scale: 0.7,
      duration: 800,
      ...options
    });
  }

  static async revealStagger(selector: string, options: any = {}) {
    return this.revealElements(selector, {
      origin: 'bottom',
      distance: '30px',
      duration: 600,
      delay: 100,
      interval: 150,
      ...options
    });
  }

  static async revealCards(selector: string, options: any = {}) {
    return this.revealElements(selector, {
      origin: 'bottom',
      distance: '60px',
      duration: 800,
      delay: 200,
      interval: 200,
      scale: 0.95,
      ...options
    });
  }

  static async revealImages(selector: string, options: any = {}) {
    return this.revealElements(selector, {
      origin: 'bottom',
      distance: '40px',
      duration: 1000,
      scale: 1.1,
      ...options
    });
  }

  static async revealHero(selector: string, options: any = {}) {
    return this.revealElements(selector, {
      origin: 'top',
      distance: '80px',
      duration: 1200,
      delay: 300,
      scale: 0.9,
      ...options
    });
  }

  static async revealSequence(selectors: string[], baseDelay: number = 200) {
    const sr = await this.init();
    if (!sr) return;

    selectors.forEach((selector, index) => {
      sr.reveal(selector, {
        origin: 'bottom',
        distance: '50px',
        duration: 800,
        delay: baseDelay + (index * 150),
        easing: 'ease-out',
        scale: 0.9,
        opacity: 0
      });
    });
  }

  static async cleanup() {
    if (typeof window !== 'undefined' && window.ScrollReveal) {
      window.ScrollReveal.clean();
    }
  }
}

// React hook for ScrollReveal
export function useScrollReveal(selector: string, options: any = {}, dependencies: any[] = []) {
  useEffect(() => {
    ScrollRevealUtils.revealElements(selector, options);
    
    return () => {
      // Cleanup on unmount
      ScrollRevealUtils.cleanup();
    };
  }, dependencies);
}

// Custom React component for ScrollReveal
export function ScrollRevealContainer({ 
  children, 
  animation = 'fadeInUp', 
  delay = 200,
  duration = 800,
  className = ''
}: {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeInScale' | 'slideInUp';
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;
      
      const animationConfigs = {
        fadeInUp: { origin: 'bottom', distance: '50px' },
        fadeInLeft: { origin: 'left', distance: '100px' },
        fadeInRight: { origin: 'right', distance: '100px' },
        fadeInScale: { origin: 'bottom', distance: '0px', scale: 0.8 },
        slideInUp: { origin: 'bottom', distance: '80px', scale: 0.95 }
      };

      ScrollRevealUtils.init().then((sr) => {
        if (sr) {
          sr.reveal(element, {
            ...animationConfigs[animation],
            duration,
            delay,
            easing: 'ease-out',
            opacity: 0,
            reset: false
          });
        }
      });
    }
  }, [animation, delay, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export default ScrollRevealUtils;