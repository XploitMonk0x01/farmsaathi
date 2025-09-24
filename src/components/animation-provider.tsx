'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'

interface AnimationContextType {
  reducedMotion: boolean
  setReducedMotion: (value: boolean) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
)

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
}

interface AnimationProviderProps {
  children: React.ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    // Initialize animation libraries
    const initializeAnimations = async () => {
      try {
        // Preload GSAP
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        if (typeof window !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger)

          // Set GSAP defaults for better performance
          gsap.defaults({
            duration: 0.8,
            ease: 'power2.out',
          })

          // Configure ScrollTrigger for better performance
          ScrollTrigger.config({
            autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
            ignoreMobileResize: true,
          })
        }

        // Preload other animation libraries
        await Promise.all(
          [
            import('animejs'),
            import('popmotion'),
            // Initialize AnimeUtils
            import('@/animations/anime-utils').then(({ AnimeUtils }) =>
              AnimeUtils.init()
            ),
            // Lazy load heavy libraries
            typeof window !== 'undefined' && import('lottie-web'),
            typeof window !== 'undefined' && import('three'),
          ].filter(Boolean)
        )

        setIsLoading(false)
      } catch (error) {
        console.error('Failed to initialize animations:', error)
        setIsLoading(false)
      }
    }

    // Initialize with a small delay to avoid blocking initial render
    const timer = setTimeout(initializeAnimations, 100)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      clearTimeout(timer)
    }
  }, [])

  // Motion configuration based on user preferences
  const motionConfig = {
    transition: reducedMotion
      ? { duration: 0 }
      : { type: 'spring', stiffness: 300, damping: 30 },
    reducedMotion: reducedMotion ? 'always' : ('never' as const),
  }

  const value = {
    reducedMotion,
    setReducedMotion,
    isLoading,
    setIsLoading,
  }

  return (
    <AnimationContext.Provider value={value}>
      <MotionConfig {...motionConfig}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
        >
          {children}
        </motion.div>
      </MotionConfig>
    </AnimationContext.Provider>
  )
}

// Performance optimization hook
export function useOptimizedAnimation() {
  const { reducedMotion } = useAnimation()

  return {
    // Return simplified animations when reduced motion is preferred
    fadeIn: reducedMotion
      ? { opacity: 1 }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
        },

    scaleIn: reducedMotion
      ? { scale: 1 }
      : {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.5 },
        },

    slideIn: reducedMotion
      ? { x: 0 }
      : {
          initial: { x: -50, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          transition: { duration: 0.6 },
        },
  }
}

// Intersection Observer hook for better performance
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [hasBeenVisible, options])

  return { isVisible, hasBeenVisible }
}

export default AnimationProvider
