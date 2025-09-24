'use client'

export class AnimeUtils {
  private static anime: any = null

  private static async loadAnime() {
    if (!this.anime) {
      try {
        // Try different import methods
        this.anime = (await import('animejs')).default
      } catch (error) {
        try {
          // Fallback to require
          this.anime = require('animejs')
        } catch (requireError) {
          console.warn('Failed to load animejs:', error, requireError)
          return null
        }
      }
    }
    return this.anime
  }

  static async init() {
    return await this.loadAnime()
  }

  static async buttonHover(element: string | Element) {
    const anime = await this.loadAnime()
    if (!anime) return

    const el =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    const handleMouseEnter = () => {
      anime({
        targets: el,
        scale: [1, 1.05],
        duration: 300,
        easing: 'easeOutCubic',
        complete: function () {
          if (anime) {
            anime({
              targets: el,
              scale: [1.05, 1.02],
              duration: 200,
              easing: 'easeOutCubic',
            })
          }
        },
      })
    }

    const handleMouseLeave = () => {
      anime({
        targets: el,
        scale: [1.02, 1],
        duration: 300,
        easing: 'easeOutCubic',
      })
    }

    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  static async iconPulse(element: string | Element) {
    const anime = await this.loadAnime()
    if (!anime) return

    const el =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    return anime({
      targets: el,
      scale: [1, 1.2, 1],
      duration: 600,
      loop: 3,
      easing: 'easeInOutSine',
    })
  }

  static async elasticScale(
    element: string | Element,
    options: {
      scale?: number
      duration?: number
    } = {}
  ) {
    const anime = await this.loadAnime()
    if (!anime) return

    const el =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    return anime({
      targets: el,
      scale: [1, options.scale || 1.1, 1],
      duration: options.duration || 800,
      easing: 'easeOutElastic(1, .8)',
    })
  }

  static async rippleEffect(
    element: string | Element,
    options: {
      color?: string
      duration?: number
    } = {}
  ) {
    const anime = await this.loadAnime()
    if (!anime) return

    const el =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    return anime({
      targets: el,
      scale: [0, 1],
      opacity: [1, 0],
      duration: options.duration || 600,
      easing: 'easeOutExpo',
    })
  }

  static async cardAnimation(element: string | Element) {
    const anime = await this.loadAnime()
    if (!anime) return

    const el =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    return anime({
      targets: el,
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
    })
  }

  static async slideInFromLeft(
    element: string | Element,
    options: {
      distance?: number
      duration?: number
      delay?: number
    } = {}
  ) {
    const anime = await this.loadAnime()
    if (!anime) return

    const el =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    return anime({
      targets: el,
      translateX: [-(options.distance || 100), 0],
      opacity: [0, 1],
      duration: options.duration || 600,
      delay: options.delay || 0,
      easing: 'easeOutExpo',
    })
  }

  static async slideInFromRight(
    element: string | Element,
    options: {
      distance?: number
      duration?: number
      delay?: number
    } = {}
  ) {
    const anime = await this.loadAnime()
    if (!anime) return

    const el =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    return anime({
      targets: el,
      translateX: [options.distance || 100, 0],
      opacity: [0, 1],
      duration: options.duration || 600,
      delay: options.delay || 0,
      easing: 'easeOutExpo',
    })
  }

  static async fadeInUp(
    element: string | Element,
    options: {
      distance?: number
      duration?: number
      delay?: number
    } = {}
  ) {
    const anime = await this.loadAnime()
    if (!anime) return

    const el =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    return anime({
      targets: el,
      translateY: [options.distance || 50, 0],
      opacity: [0, 1],
      duration: options.duration || 600,
      delay: options.delay || 0,
      easing: 'easeOutExpo',
    })
  }

  static async staggerFadeIn(
    elements: string | Element[],
    options: {
      stagger?: number
      duration?: number
      delay?: number
    } = {}
  ) {
    const anime = await this.loadAnime()
    if (!anime) return

    const targets =
      typeof elements === 'string'
        ? document.querySelectorAll(elements)
        : elements

    if (!targets || targets.length === 0) return

    return anime({
      targets: targets,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: options.duration || 600,
      delay: anime.stagger(options.stagger || 100, {
        start: options.delay || 0,
      }),
      easing: 'easeOutExpo',
    })
  }

  static async rotateIn(
    element: string | Element,
    options: {
      rotation?: number
      duration?: number
      delay?: number
    } = {}
  ) {
    const anime = await this.loadAnime()
    if (!anime) return

    const el =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    return anime({
      targets: el,
      rotate: [options.rotation || 180, 0],
      scale: [0, 1],
      opacity: [0, 1],
      duration: options.duration || 800,
      delay: options.delay || 0,
      easing: 'easeOutBack',
    })
  }

  static async bounceIn(
    element: string | Element,
    options: {
      scale?: number
      duration?: number
      delay?: number
    } = {}
  ) {
    const anime = await this.loadAnime()
    if (!anime) return

    const el =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    return anime({
      targets: el,
      scale: [0, options.scale || 1],
      opacity: [0, 1],
      duration: options.duration || 600,
      delay: options.delay || 0,
      easing: 'easeOutBounce',
    })
  }

  static async floatingElements(
    elements: string | Element[],
    options: {
      translateY?: number
      duration?: number
      delay?: number
      loop?: boolean
    } = {}
  ) {
    const anime = await this.loadAnime()
    if (!anime) return

    const els =
      typeof elements === 'string'
        ? Array.from(document.querySelectorAll(elements))
        : elements
    if (!els.length) return

    return anime({
      targets: els,
      translateY: [0, options.translateY || -10, 0],
      duration: options.duration || 3000,
      delay: anime.stagger(options.delay || 200),
      easing: 'easeInOutSine',
      loop: options.loop !== false,
      direction: 'alternate',
    })
  }
}
