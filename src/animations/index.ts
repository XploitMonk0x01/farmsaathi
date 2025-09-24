'use client'

import { useEffect, useRef } from 'react'
import { GSAPUtils } from './gsap-utils'
import { AnimeUtils } from './anime-utils'
import { PopmotionUtils } from './popmotion-utils'
import { ScrollRevealUtils } from './scrollreveal-utils'
import { TypedUtils } from './typed-utils'
import { MojsUtils } from './mojs-utils'

// Combined animation hooks for easy use
export function useGSAPAnimation(
  animation:
    | 'fadeInUp'
    | 'slideInLeft'
    | 'slideInRight'
    | 'scaleInBounce'
    | 'stagger',
  options: any = {},
  dependencies: any[] = []
) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      switch (animation) {
        case 'fadeInUp':
          GSAPUtils.fadeInUp(elementRef.current, options)
          break
        case 'slideInLeft':
          GSAPUtils.slideInFromLeft(elementRef.current, options)
          break
        case 'slideInRight':
          GSAPUtils.slideInFromRight(elementRef.current, options)
          break
        case 'scaleInBounce':
          GSAPUtils.scaleInBounce(elementRef.current, options)
          break
        case 'stagger':
          GSAPUtils.staggerFadeIn([elementRef.current], options)
          break
      }
    }
  }, dependencies)

  return elementRef
}

export function useButtonAnimation(
  type: 'hover' | 'magnetic' | 'elastic' = 'hover'
) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      let cleanup: (() => void) | undefined

      const setupAnimation = async () => {
        switch (type) {
          case 'hover':
            cleanup = await AnimeUtils.buttonHover(buttonRef.current!)
            break
          case 'magnetic':
            cleanup = GSAPUtils.magneticEffect(buttonRef.current!)
            break
          case 'elastic':
            await AnimeUtils.elasticScale(buttonRef.current!)
            break
        }
      }
      
      setupAnimation()

      return () => {
        if (cleanup) cleanup()
      }
    }
  }, [type])

  return buttonRef
}

export function useCardAnimation(
  animation: 'hover' | 'reveal' | 'flip' = 'hover'
) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      const element = cardRef.current

      switch (animation) {
        case 'hover':
          element.addEventListener('mouseenter', () => {
            AnimeUtils.elasticScale(element, { scale: 1.02 }).catch(console.error)
          })
          break
        case 'reveal':
          GSAPUtils.fadeInUp(element, { delay: 0.2 })
          break
        case 'flip':
          element.addEventListener('click', () => {
            AnimeUtils.cardFlip(element).catch(console.error)
          })
          break
      }
    }
  }, [animation])

  return cardRef
}

export function useIconAnimation(
  animation: 'pulse' | 'float' | 'rotate' = 'pulse'
) {
  const iconRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (iconRef.current) {
      const setupAnimation = async () => {
        switch (animation) {
          case 'pulse':
            await AnimeUtils.iconPulse(iconRef.current!)
            break
          case 'float':
            await AnimeUtils.floatingElements([iconRef.current!])
            break
          case 'rotate':
            GSAPUtils.createScrollTimeline()
            break
        }
      }
      
      setupAnimation().catch(console.error)
    }
  }, [animation])

  return iconRef
}

export function useNumberCounter(
  finalNumber: number,
  options: {
    duration?: number
    prefix?: string
    suffix?: string
    trigger?: boolean
  } = {}
) {
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (numberRef.current && options.trigger !== false) {
      AnimeUtils.numberCount(numberRef.current, 0, finalNumber, {
        duration: options.duration || 2000,
      }).catch(console.error)
    }
  }, [finalNumber, options.trigger, options.duration])

  return numberRef
}

export function useParallax(speed: number = 0.5) {
  const parallaxRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (parallaxRef.current) {
      GSAPUtils.parallaxScroll(parallaxRef.current, speed)
    }
  }, [speed])

  return parallaxRef
}

export function useClickEffect(
  effect: 'burst' | 'ripple' | 'confetti' = 'burst'
) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current

      const handleClick = async (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        switch (effect) {
          case 'burst':
            const burst = await MojsUtils.createBurst(e.clientX, e.clientY)
            if (burst) burst.play()
            break
          case 'ripple':
            AnimeUtils.rippleEffect(element, x, y).catch(console.error)
            break
          case 'confetti':
            const confetti = await MojsUtils.createConfetti(element)
            if (confetti) confetti.play()
            break
        }
      }

      element.addEventListener('click', handleClick)
      return () => element.removeEventListener('click', handleClick)
    }
  }, [effect])

  return elementRef
}

export function useTextReveal(
  text: string,
  animation: 'typed' | 'gsap' | 'mojs' = 'typed'
) {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (textRef.current) {
      switch (animation) {
        case 'typed':
          TypedUtils.typeOnce(textRef.current, text)
          break
        case 'gsap':
          GSAPUtils.fadeInUp(textRef.current)
          break
        case 'mojs':
          MojsUtils.createTextReveal(textRef.current)
          break
      }
    }
  }, [text, animation])

  return textRef
}

export function useScrollAnimation(
  trigger: string | HTMLElement,
  animation: any,
  options: any = {}
) {
  useEffect(() => {
    ScrollRevealUtils.revealElements(
      typeof trigger === 'string' ? trigger : '.scroll-reveal',
      {
        ...animation,
        ...options,
      }
    )
  }, [trigger, animation, options])
}

// Advanced combined animations
export function useAdvancedHero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      // Combine multiple animations for hero section
      GSAPUtils.fadeInUp(heroRef.current, {
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Add parallax background
      const bg = heroRef.current.querySelector('.hero-background')
      if (bg) {
        GSAPUtils.parallaxScroll(bg, 0.3)
      }

      // Add floating particles
      MojsUtils.createFloatingBubbles(heroRef.current, 8)
    }
  }, [])

  return heroRef
}

export function useAdvancedCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      const element = cardRef.current

      // Initial reveal animation
      GSAPUtils.fadeInUp(element)

      // Hover effects
      let hoverCleanup: (() => void) | undefined
      AnimeUtils.buttonHover(element).then(cleanup => {
        hoverCleanup = cleanup
      }).catch(console.error)

      // Magnetic effect
      const magneticCleanup = GSAPUtils.magneticEffect(element, 0.2)

      // Click burst effect
      MojsUtils.createButtonClick(element)

      return () => {
        if (hoverCleanup) hoverCleanup()
        if (magneticCleanup) magneticCleanup()
      }
    }
  }, [])

  return cardRef
}

export function useAdvancedButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      const element = buttonRef.current

      // Hover animation
      let hoverCleanup: (() => void) | undefined
      AnimeUtils.buttonHover(element).then(cleanup => {
        hoverCleanup = cleanup
      }).catch(console.error)

      // Click effects
      element.addEventListener('click', (e) => {
        // Elastic animation
        AnimeUtils.elasticScale(element).catch(console.error)

        // Burst effect
        const rect = element.getBoundingClientRect()
        MojsUtils.createBurst(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        ).then((burst) => burst?.play())
      })

      return hoverCleanup
    }
  }, [])

  return buttonRef
}

// Performance utilities
export function useIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(callback)
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px',
          ...options,
        }
      )

      observer.observe(elementRef.current)

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }
  }, [callback, options])

  return elementRef
}

// Re-export useThreeScene from three-utils
export { useThreeScene } from './three-utils'

export {
  GSAPUtils,
  AnimeUtils,
  PopmotionUtils,
  ScrollRevealUtils,
  TypedUtils,
  MojsUtils,
}
