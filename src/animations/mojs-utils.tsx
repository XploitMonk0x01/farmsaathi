'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    mojs: any;
  }
}

export class MojsUtils {
  static async init() {
    if (typeof window !== 'undefined' && !window.mojs) {
      try {
        const mojs = await import('@mojs/core');
        window.mojs = mojs;
        return mojs;
      } catch (error) {
        console.error('Failed to load Mo.js:', error);
        return null;
      }
    }
    return window.mojs;
  }

  static async createBurst(x: number, y: number, options: any = {}) {
    const mojs = await this.init();
    if (!mojs) return null;

    return new mojs.Burst({
      left: x,
      top: y,
      radius: { 4: 32 },
      angle: { 0: 180 },
      count: 8,
      timeline: { delay: 300 },
      children: {
        shape: 'circle',
        radius: { 6: 0 },
        fill: options.color || '#ff6b6b',
        scale: { 1: 0, easing: 'quad.out' },
        pathScale: 'rand(.5, 1)',
        degreeShift: 'rand(-360, 360)',
        duration: 600,
        isShowEnd: false
      }
    });
  }

  static async createConfetti(container: HTMLElement, options: any = {}) {
    const mojs = await this.init();
    if (!mojs) return null;

    const colors = options.colors || ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    const burst = new mojs.Burst({
      parent: container,
      count: 20,
      top: '50%',
      left: '50%',
      radius: { 50: 150 },
      angle: { 0: 360 },
      children: {
        shape: 'circle',
        radius: { 6: 0 },
        fill: colors,
        scale: { 1: 0, easing: 'quad.out' },
        pathScale: 'rand(.5, 1.25)',
        degreeShift: 'rand(-360, 360)',
        duration: 1000,
        isShowEnd: false
      }
    });

    return burst;
  }

  static async createRipple(x: number, y: number, options: any = {}) {
    const mojs = await this.init();
    if (!mojs) return null;

    return new mojs.Shape({
      left: x,
      top: y,
      stroke: options.color || '#ff6b6b',
      strokeWidth: { 15: 0 },
      fill: 'transparent',
      scale: { 0: 1.5 },
      radius: 25,
      duration: 400,
      isShowEnd: false
    });
  }

  static async createButtonClick(element: HTMLElement, options: any = {}) {
    const mojs = await this.init();
    if (!mojs) return null;

    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const burst = await this.createBurst(x, y, {
      color: options.color || '#4ecdc4'
    });

    element.addEventListener('click', () => {
      if (burst) {
        burst.replay();
      }
    });

    return burst;
  }

  static async createHeartBurst(x: number, y: number) {
    const mojs = await this.init();
    if (!mojs) return null;

    return new mojs.Burst({
      left: x,
      top: y,
      radius: { 4: 25 },
      angle: 45,
      count: 14,
      timeline: { delay: 700, repeat: 999 },
      children: {
        shape: 'polygon',
        points: 5,
        fill: ['deeppink', 'hotpink', 'pink'],
        radius: 'rand(8, 25)',
        scale: { 1: 0 },
        pathScale: 'rand(.5, 1)',
        degreeShift: 'rand(-360, 360)',
        duration: 'rand(600, 1000)',
        isShowEnd: false,
        easing: 'quint.out'
      }
    });
  }

  static async createLoadingSpinner(container: HTMLElement) {
    const mojs = await this.init();
    if (!mojs) return null;

    const spinner = new mojs.Shape({
      parent: container,
      shape: 'circle',
      stroke: '#4ecdc4',
      strokeWidth: 4,
      fill: 'transparent',
      radius: 20,
      strokeDasharray: '31.416 31.416',
      strokeDashoffset: { 0: '-62.832' },
      duration: 2000,
      easing: 'linear.none',
      isShowEnd: false
    }).then({
      strokeDashoffset: { '-62.832': '-125.664' },
      duration: 2000,
      easing: 'linear.none'
    });

    const timeline = new mojs.Timeline({ repeat: 999 });
    timeline.add(spinner);

    return { spinner, timeline };
  }

  static async createTextReveal(element: HTMLElement, options: any = {}) {
    const mojs = await this.init();
    if (!mojs) return null;

    const text = element.textContent || '';
    element.innerHTML = text.split('').map(char => 
      `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    const chars = element.querySelectorAll('span');
    
    const timeline = new mojs.Timeline();

    chars.forEach((char, i) => {
      const shape = new mojs.Tween({
        duration: 500,
        delay: i * 50,
        onUpdate: (progress: number) => {
          (char as HTMLElement).style.transform = `translateY(${(1 - progress) * 20}px)`;
          (char as HTMLElement).style.opacity = progress.toString();
        }
      });
      timeline.add(shape);
    });

    return timeline;
  }

  static async createMagicWand(x: number, y: number) {
    const mojs = await this.init();
    if (!mojs) return null;

    const burst1 = new mojs.Burst({
      left: x, top: y,
      radius: { 4: 19 },
      angle: 45,
      count: 14,
      children: {
        shape: 'line',
        radius: 3,
        scale: { 1: 0 },
        stroke: ['#FFE217', '#B7EC8F', '#4CDAFC', '#ff6b6b'],
        strokeWidth: 2,
        degreeShift: 'rand(-90, 90)',
        duration: 700,
        delay: 200,
        easing: 'quad.out',
        isShowEnd: false
      }
    });

    const burst2 = new mojs.Burst({
      left: x, top: y,
      radius: { 4: 12 },
      angle: 75,
      count: 6,
      children: {
        shape: 'circle',
        fill: 'white',
        opacity: 0.8,
        radius: { 3: 0 },
        degreeShift: 'rand(-30, 30)',
        duration: 500,
        easing: 'quad.out',
        isShowEnd: false
      }
    });

    const timeline = new mojs.Timeline();
    timeline.add(burst1, burst2);

    return timeline;
  }

  static async createFloatingBubbles(container: HTMLElement, count: number = 5) {
    const mojs = await this.init();
    if (!mojs) return null;

    const bubbles = [];

    for (let i = 0; i < count; i++) {
      const bubble = new mojs.Shape({
        parent: container,
        shape: 'circle',
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.3)',
        strokeWidth: 1,
        radius: `rand(10, 30)`,
        x: `rand(-100, 100)`,
        y: { 100: -100 },
        duration: `rand(3000, 6000)`,
        repeat: 999,
        delay: `rand(0, 2000)`,
        easing: 'linear.none',
        isShowEnd: false
      });
      bubbles.push(bubble);
    }

    return bubbles;
  }
}

// React hook for Mo.js animations
export function useMojsAnimation(
  animationFn: (element: HTMLElement) => Promise<any>,
  dependencies: any[] = []
) {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (elementRef.current) {
      animationFn(elementRef.current).then((animation) => {
        animationRef.current = animation;
      });

      return () => {
        if (animationRef.current && animationRef.current.stop) {
          animationRef.current.stop();
        }
      };
    }
  }, dependencies);

  return elementRef;
}

// ClickBurst component
export function ClickBurst({ 
  children,
  color = '#4ecdc4',
  className = ''
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      MojsUtils.createButtonClick(elementRef.current, { color });
    }
  }, [color]);

  return (
    <div ref={elementRef} className={className} style={{ position: 'relative' }}>
      {children}
    </div>
  );
}

// Confetti component
export function ConfettiEffect({ 
  trigger = false,
  colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']
}: {
  trigger?: boolean;
  colors?: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger && containerRef.current) {
      MojsUtils.createConfetti(containerRef.current, { colors }).then((burst) => {
        if (burst) {
          burst.play();
        }
      });
    }
  }, [trigger, colors]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ overflow: 'hidden' }}
    />
  );
}

export default MojsUtils;