/**
 * Animation Performance Configuration
 *
 * This file contains performance optimizations and configurations
 * for all animation libraries used in the project.
 */

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance() {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTimer(label: string) {
    this.metrics.set(label, performance.now())
  }

  endTimer(label: string) {
    const startTime = this.metrics.get(label)
    if (startTime) {
      const duration = performance.now() - startTime
      console.log(`${label}: ${duration.toFixed(2)}ms`)
      this.metrics.delete(label)
      return duration
    }
    return 0
  }

  measureFPS(duration: number = 1000) {
    let frames = 0
    let startTime = performance.now()

    const countFrame = () => {
      frames++
      const currentTime = performance.now()

      if (currentTime - startTime < duration) {
        requestAnimationFrame(countFrame)
      } else {
        const fps = Math.round((frames * 1000) / (currentTime - startTime))
        console.log(`FPS: ${fps}`)
      }
    }

    requestAnimationFrame(countFrame)
  }
}

// Lazy loading utilities
export class LazyLoader {
  private static loadedLibraries = new Set<string>()

  static async loadGSAP() {
    if (this.loadedLibraries.has('gsap')) return

    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    const { TextPlugin } = await import('gsap/TextPlugin')

    gsap.registerPlugin(ScrollTrigger, TextPlugin)

    // Performance optimizations
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    })

    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true,
    })

    this.loadedLibraries.add('gsap')
    return gsap
  }

  static async loadAnime() {
    if (this.loadedLibraries.has('anime')) return

    const anime = await import('animejs')
    this.loadedLibraries.add('anime')
    return anime.default
  }

  static async loadLottie() {
    if (this.loadedLibraries.has('lottie')) return

    const lottie = await import('lottie-web')
    this.loadedLibraries.add('lottie')
    return lottie.default
  }

  static async loadThree() {
    if (this.loadedLibraries.has('three')) return

    const THREE = await import('three')
    this.loadedLibraries.add('three')
    return THREE
  }

  static async loadTyped() {
    if (this.loadedLibraries.has('typed')) return

    const Typed = await import('typed.js')
    this.loadedLibraries.add('typed')
    return Typed.default
  }

  static async loadMojs() {
    if (this.loadedLibraries.has('mojs')) return

    const mojs = await import('@mojs/core')
    this.loadedLibraries.add('mojs')
    return mojs
  }

  static async loadScrollReveal() {
    if (this.loadedLibraries.has('scrollreveal')) return

    const ScrollReveal = await import('scrollreveal')
    this.loadedLibraries.add('scrollreveal')
    return ScrollReveal.default
  }

  static async loadPopmotion() {
    if (this.loadedLibraries.has('popmotion')) return

    const popmotion = await import('popmotion')
    this.loadedLibraries.add('popmotion')
    return popmotion
  }
}

// Device and performance detection
export class DeviceOptimizer {
  static isLowEndDevice() {
    // Check for low-end device indicators
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection
    const slowConnection =
      connection &&
      (connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g')
    const limitedRAM =
      (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4
    const oldDevice = /Android [1-4]|iPhone OS [1-9]_|iPad.*OS [1-9]_/i.test(
      navigator.userAgent
    )

    return slowConnection || limitedRAM || oldDevice
  }

  static isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }

  static supportsWebGL() {
    try {
      const canvas = document.createElement('canvas')
      return !!(
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      )
    } catch (e) {
      return false
    }
  }

  static getOptimalSettings() {
    const isLowEnd = this.isLowEndDevice()
    const isMobile = this.isMobile()
    const hasWebGL = this.supportsWebGL()

    return {
      // Reduce particle counts for low-end devices
      particleCount: isLowEnd ? 20 : isMobile ? 50 : 100,

      // Disable complex animations on low-end devices
      enableComplexAnimations: !isLowEnd,

      // Use simpler easing functions on mobile
      easing: isMobile ? 'ease-out' : 'cubic-bezier(0.4, 0, 0.2, 1)',

      // Reduce animation duration on slow devices
      animationSpeed: isLowEnd ? 0.5 : 1,

      // Disable WebGL effects if not supported
      enableWebGL: hasWebGL && !isLowEnd,

      // Reduce blur effects on low-end devices
      enableBlur: !isLowEnd,

      // Enable requestIdleCallback optimizations
      useIdleCallback: 'requestIdleCallback' in window,
    }
  }
}

// Animation queue for performance management
export class AnimationQueue {
  private static instance: AnimationQueue
  private queue: Array<() => void> = []
  private running = false
  private maxConcurrent = 3
  private currentCount = 0

  static getInstance() {
    if (!AnimationQueue.instance) {
      AnimationQueue.instance = new AnimationQueue()
    }
    return AnimationQueue.instance
  }

  add(animation: () => void) {
    this.queue.push(animation)
    this.process()
  }

  private async process() {
    if (this.running || this.currentCount >= this.maxConcurrent) return

    this.running = true

    while (this.queue.length > 0 && this.currentCount < this.maxConcurrent) {
      const animation = this.queue.shift()
      if (animation) {
        this.currentCount++

        // Use requestIdleCallback if available
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            animation()
            this.currentCount--
            this.process()
          })
        } else {
          setTimeout(() => {
            animation()
            this.currentCount--
            this.process()
          }, 0)
        }
      }
    }

    this.running = false
  }
}

// Viewport-based animation trigger
export class ViewportAnimationManager {
  private static observers = new Map<Element, IntersectionObserver>()

  static observe(
    element: Element,
    callback: (isVisible: boolean) => void,
    options: IntersectionObserverInit = {}
  ) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px',
      ...options,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting)
      })
    }, defaultOptions)

    observer.observe(element)
    this.observers.set(element, observer)

    return () => {
      observer.disconnect()
      this.observers.delete(element)
    }
  }

  static cleanup() {
    this.observers.forEach((observer) => {
      observer.disconnect()
    })
    this.observers.clear()
  }
}

// Memory management for animations
export class AnimationMemoryManager {
  private static activeAnimations = new Set<any>()

  static register(animation: any) {
    this.activeAnimations.add(animation)
  }

  static unregister(animation: any) {
    this.activeAnimations.delete(animation)
  }

  static cleanup() {
    this.activeAnimations.forEach((animation) => {
      try {
        if (animation && typeof animation.kill === 'function') animation.kill()
        if (animation && typeof animation.destroy === 'function') animation.destroy()
        if (animation && typeof animation.pause === 'function') animation.pause()
      } catch (error) {
        console.warn('Error cleaning up animation:', error)
      }
    })
    this.activeAnimations.clear()
  }

  static getActiveCount() {
    return this.activeAnimations.size
  }
}

// Export configuration
export const ANIMATION_CONFIG = {
  // Global animation settings
  DURATION: {
    FAST: 0.3,
    NORMAL: 0.6,
    SLOW: 1.2,
  },

  EASING: {
    EASE_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.6, 1)',
    SPRING: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  DELAYS: {
    STAGGER: 0.1,
    SECTION: 0.2,
    SEQUENCE: 0.15,
  },

  THRESHOLDS: {
    VIEWPORT: 0.1,
    LAZY_LOAD: 0.05,
  },
}

export default {
  PerformanceMonitor,
  LazyLoader,
  DeviceOptimizer,
  AnimationQueue,
  ViewportAnimationManager,
  AnimationMemoryManager,
  ANIMATION_CONFIG,
}
