'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    Typed: any
  }
}

export class TypedUtils {
  static async init(
    element: string | HTMLElement,
    options: {
      strings: string[]
      typeSpeed?: number
      backSpeed?: number
      backDelay?: number
      startDelay?: number
      loop?: boolean
      showCursor?: boolean
      cursorChar?: string
      fadeOut?: boolean
      onComplete?: () => void
    }
  ) {
    if (typeof window === 'undefined') return null

    try {
      const Typed = (await import('typed.js')).default
      const config = {
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        fadeOut: false,
        ...options,
      }

      // Only add onComplete if it's provided and is a function
      if (options.onComplete && typeof options.onComplete === 'function') {
        config.onComplete = options.onComplete
      }

      return new Typed(element, config)
    } catch (error) {
      console.error('Failed to load Typed.js:', error)
      return null
    }
  }

  static async typeHeroText(element: string | HTMLElement, strings: string[]) {
    return this.init(element, {
      strings,
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: '_',
    })
  }

  static async typeSubtitle(element: string | HTMLElement, strings: string[]) {
    return this.init(element, {
      strings,
      typeSpeed: 40,
      backSpeed: 30,
      backDelay: 3000,
      startDelay: 2000,
      loop: true,
      showCursor: false,
    })
  }

  static async typeOnce(
    element: string | HTMLElement,
    text: string,
    options: any = {}
  ) {
    return this.init(element, {
      strings: [text],
      typeSpeed: 50,
      loop: false,
      showCursor: false,
      ...options,
    })
  }

  static async typeNumbers(element: string | HTMLElement, numbers: string[]) {
    return this.init(element, {
      strings: numbers,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 500,
      startDelay: 0,
      loop: true,
      showCursor: false,
    })
  }

  static async typeCode(element: string | HTMLElement, codeStrings: string[]) {
    return this.init(element, {
      strings: codeStrings,
      typeSpeed: 30,
      backSpeed: 20,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      preStringTyped: (arrayPos: number, self: any) => {
        // Add syntax highlighting class
        self.el.style.fontFamily = 'monospace'
        self.el.style.fontSize = '14px'
      },
    })
  }

  static async typeWithCallback(
    element: string | HTMLElement,
    strings: string[],
    onComplete: () => void
  ) {
    return this.init(element, {
      strings,
      typeSpeed: 50,
      backSpeed: 30,
      loop: false,
      showCursor: false,
      onComplete,
    })
  }

  static async typeSteps(element: string | HTMLElement, steps: string[]) {
    return this.init(element, {
      strings: steps,
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 1500,
      startDelay: 300,
      loop: true,
      showCursor: true,
      cursorChar: '▸',
    })
  }
}

// React hook for Typed.js
export function useTyped(
  strings: string[],
  options: any = {},
  dependencies: any[] = []
) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const typedInstance = useRef<any>(null)

  useEffect(() => {
    let isMounted = true
    if (elementRef.current) {
      const initTyped = async () => {
        const typed = await TypedUtils.init(elementRef.current, {
          strings,
          ...options,
        })
        if (isMounted) {
          typedInstance.current = typed
        }
      }
      initTyped()

      return () => {
        isMounted = false
        if (
          typedInstance.current &&
          typeof typedInstance.current.destroy === 'function'
        ) {
          try {
            typedInstance.current.destroy()
          } catch (error) {
            console.warn('Error destroying Typed instance:', error)
          }
        }
      }
    }
  }, dependencies)

  return elementRef
}

// TypedText React component
export function TypedText({
  strings,
  className = '',
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
  showCursor = true,
  cursorChar = '|',
  startDelay = 0,
  backDelay = 1000,
  onComplete,
}: {
  strings: string[]
  className?: string
  typeSpeed?: number
  backSpeed?: number
  loop?: boolean
  showCursor?: boolean
  cursorChar?: string
  startDelay?: number
  backDelay?: number
  onComplete?: () => void
}) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let typedInstance: any
    let isMounted = true

    if (elementRef.current) {
      const initTyped = async () => {
        typedInstance = await TypedUtils.init(elementRef.current, {
          strings,
          typeSpeed,
          backSpeed,
          loop,
          showCursor,
          cursorChar,
          startDelay,
          backDelay,
          onComplete,
        })
      }
      initTyped()

      return () => {
        isMounted = false
        if (typedInstance && typeof typedInstance.destroy === 'function') {
          try {
            typedInstance.destroy()
          } catch (error) {
            console.warn('Error destroying Typed instance:', error)
          }
        }
      }
    }
  }, [
    strings,
    typeSpeed,
    backSpeed,
    loop,
    showCursor,
    cursorChar,
    startDelay,
    backDelay,
    onComplete,
  ])

  return <span ref={elementRef} className={className}></span>
}

// HeroTypedText component with predefined styling
export function HeroTypedText({
  strings,
  className = '',
}: {
  strings: string[]
  className?: string
}) {
  return (
    <TypedText
      strings={strings}
      className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent ${className}`}
      typeSpeed={80}
      backSpeed={50}
      backDelay={2000}
      startDelay={1000}
      cursorChar="_"
    />
  )
}

// NumberCounter component with typed animation
export function NumberCounter({
  finalNumber,
  prefix = '',
  suffix = '',
  className = '',
  startDelay = 0,
}: {
  finalNumber: number
  prefix?: string
  suffix?: string
  className?: string
  startDelay?: number
}) {
  const numbers = []
  const step = Math.ceil(finalNumber / 10)

  for (let i = step; i <= finalNumber; i += step) {
    numbers.push(`${prefix}${i.toLocaleString()}${suffix}`)
  }

  if (
    numbers[numbers.length - 1] !==
    `${prefix}${finalNumber.toLocaleString()}${suffix}`
  ) {
    numbers.push(`${prefix}${finalNumber.toLocaleString()}${suffix}`)
  }

  return (
    <TypedText
      strings={numbers}
      className={className}
      typeSpeed={100}
      backSpeed={100}
      backDelay={500}
      startDelay={startDelay}
      showCursor={false}
      loop={false}
    />
  )
}

export default TypedUtils
