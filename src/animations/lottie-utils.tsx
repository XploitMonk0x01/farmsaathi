'use client'

import { useEffect, useRef } from 'react'
import lottie, { AnimationItem } from 'lottie-web'

interface LottieAnimationProps {
  animationData: any
  className?: string
  loop?: boolean
  autoplay?: boolean
  onComplete?: () => void
  speed?: number
}

export function LottieAnimation({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
  onComplete,
  speed = 1,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (containerRef.current && animationData) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop,
        autoplay,
        animationData,
      })

      animationRef.current.setSpeed(speed)

      if (onComplete) {
        animationRef.current.addEventListener('complete', onComplete)
      }

      return () => {
        if (
          animationRef.current &&
          typeof animationRef.current.destroy === 'function'
        ) {
          try {
            animationRef.current.destroy()
          } catch (error) {
            console.warn('Error destroying Lottie animation:', error)
          }
        }
      }
    }
  }, [animationData, loop, autoplay, onComplete, speed])

  return <div ref={containerRef} className={className} />
}

export class LottieUtils {
  static async loadAnimation(url: string): Promise<any> {
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.error('Failed to load Lottie animation:', error)
      return null
    }
  }

  static createLoadingAnimation(container: HTMLElement) {
    // Simple loading animation data - you can replace with actual Lottie JSON
    const loadingData = {
      v: '5.7.4',
      fr: 30,
      ip: 0,
      op: 60,
      w: 100,
      h: 100,
      nm: 'Loading',
      ddd: 0,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: 'Circle',
          sr: 1,
          ks: {
            o: { a: 0, k: 100 },
            r: {
              a: 1,
              k: [
                {
                  i: { x: [0.833], y: [0.833] },
                  o: { x: [0.167], y: [0.167] },
                  t: 0,
                  s: [0],
                },
                { t: 60, s: [360] },
              ],
            },
            p: { a: 0, k: [50, 50, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: { a: 0, k: [100, 100, 100] },
          },
          ao: 0,
          shapes: [
            {
              ty: 'el',
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [40, 40] },
              d: 1,
              nm: 'Ellipse Path 1',
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.2, 0.6, 1, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 },
              lc: 2,
              lj: 2,
              bm: 0,
              nm: 'Stroke 1',
            },
          ],
          ip: 0,
          op: 60,
          st: 0,
          bm: 0,
        },
      ],
    }

    return lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingData,
    })
  }

  static createFloatingParticles(container: HTMLElement) {
    // Particle animation data - replace with actual Lottie JSON
    const particleData = {
      v: '5.7.4',
      fr: 30,
      ip: 0,
      op: 120,
      w: 800,
      h: 600,
      nm: 'Particles',
      ddd: 0,
      assets: [],
      layers: Array.from({ length: 10 }, (_, i) => ({
        ddd: 0,
        ind: i + 1,
        ty: 4,
        nm: `Particle ${i + 1}`,
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                t: 0,
                s: [0],
              },
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                t: 30,
                s: [100],
              },
              { t: 90, s: [0] },
            ],
          },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [Math.random() * 800, 600, 0],
              },
              { t: 120, s: [Math.random() * 800, -100, 0] },
            ],
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [50, 50, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: 'el',
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [6, 6] },
            d: 1,
            nm: 'Ellipse Path 1',
          },
          {
            ty: 'fl',
            c: { a: 0, k: [1, 1, 1, 1] },
            o: { a: 0, k: 100 },
            r: 1,
            bm: 0,
            nm: 'Fill 1',
          },
        ],
        ip: 0,
        op: 120,
        st: Math.random() * 30,
        bm: 0,
      })),
    }

    return lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: particleData,
    })
  }
}

// Custom hook for Lottie animations
export function useLottieAnimation(
  animationData: any,
  options: {
    loop?: boolean
    autoplay?: boolean
    speed?: number
  } = {}
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (containerRef.current && animationData) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: options.loop ?? true,
        autoplay: options.autoplay ?? true,
        animationData,
      })

      if (options.speed) {
        animationRef.current.setSpeed(options.speed)
      }

      return () => {
        if (
          animationRef.current &&
          typeof animationRef.current.destroy === 'function'
        ) {
          try {
            animationRef.current.destroy()
          } catch (error) {
            console.warn('Error destroying Lottie animation:', error)
          }
        }
      }
    }
  }, [animationData, options.loop, options.autoplay, options.speed])

  return {
    containerRef,
    animation: animationRef.current,
    play: () => animationRef.current?.play(),
    pause: () => animationRef.current?.pause(),
    stop: () => animationRef.current?.stop(),
    setSpeed: (speed: number) => animationRef.current?.setSpeed(speed),
  }
}

export default LottieUtils
