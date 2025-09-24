'use client'

import { useEffect, useRef } from 'react'
import { spring, keyframes, timeline, animate } from 'popmotion'

export class PopmotionUtils {
  static createSpringAnimation(
    element: HTMLElement,
    options: {
      from?: any
      to?: any
      stiffness?: number
      damping?: number
      mass?: number
    } = {}
  ) {
    const {
      from = { x: 0, y: 0 },
      to = { x: 100, y: 100 },
      stiffness = 500,
      damping = 25,
      mass = 1,
    } = options

    return spring({
      from,
      to,
      stiffness,
      damping,
      mass,
    }).start((v) => {
      element.style.transform = `translate(${v.x}px, ${v.y}px)`
    })
  }

  static createBounceEffect(
    element: HTMLElement,
    options: {
      scale?: number
      duration?: number
    } = {}
  ) {
    const { scale = 1.2, duration = 300 } = options

    return keyframes({
      values: [1, scale, 1],
      duration,
    }).start((v) => {
      element.style.transform = `scale(${v})`
    })
  }

  static createDraggable(
    element: HTMLElement,
    options: {
      onDrag?: (info: any) => void
      onDragEnd?: (info: any) => void
      bounds?: { top?: number; left?: number; right?: number; bottom?: number }
    } = {}
  ) {
    let isDragging = false
    let startPos = { x: 0, y: 0 }
    let currentPos = { x: 0, y: 0 }

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      startPos = { x: e.clientX - currentPos.x, y: e.clientY - currentPos.y }
      element.style.cursor = 'grabbing'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      let newX = e.clientX - startPos.x
      let newY = e.clientY - startPos.y

      // Apply bounds if specified
      if (options.bounds) {
        if (options.bounds.left !== undefined)
          newX = Math.max(options.bounds.left, newX)
        if (options.bounds.right !== undefined)
          newX = Math.min(options.bounds.right, newX)
        if (options.bounds.top !== undefined)
          newY = Math.max(options.bounds.top, newY)
        if (options.bounds.bottom !== undefined)
          newY = Math.min(options.bounds.bottom, newY)
      }

      currentPos = { x: newX, y: newY }
      element.style.transform = `translate(${currentPos.x}px, ${currentPos.y}px)`

      if (options.onDrag) {
        options.onDrag({ x: currentPos.x, y: currentPos.y })
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false
        element.style.cursor = 'grab'

        if (options.onDragEnd) {
          options.onDragEnd({ x: currentPos.x, y: currentPos.y })
        }
      }
    }

    element.style.cursor = 'grab'
    element.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      element.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }

  static createScrollAnimation(
    element: HTMLElement,
    options: {
      offset?: [number, number]
      target?: HTMLElement
      onUpdate?: (progress: number) => void
    } = {}
  ) {
    // Simplified scroll animation using Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const progress = entry.isIntersecting ? 1 : 0
        if (options.onUpdate) {
          options.onUpdate(progress)
        }
      })
    })

    observer.observe(element)
    return { stop: () => observer.disconnect() }
  }

  static createInViewAnimation(
    element: HTMLElement,
    options: {
      onEnter?: () => void
      onExit?: () => void
      margin?: string
      amount?: number
    } = {}
  ) {
    const { margin = '0px' } = options

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && options.onEnter) {
            options.onEnter()
          } else if (!entry.isIntersecting && options.onExit) {
            options.onExit()
          }
        })
      },
      { rootMargin: margin }
    )

    observer.observe(element)
    return { stop: () => observer.disconnect() }
  }

  static createPhysicsAnimation(
    element: HTMLElement,
    options: {
      velocity?: number
      friction?: number
      to?: number
      from?: number
      property?: string
    } = {}
  ) {
    const {
      velocity = 100,
      friction = 0.8,
      to = 100,
      from = 0,
      property = 'x',
    } = options

    let currentVelocity = velocity
    let currentValue = from
    let isAnimating = true

    const animate = () => {
      if (!isAnimating) return

      currentValue += currentVelocity
      currentVelocity *= friction

      if (Math.abs(currentVelocity) < 0.1) {
        currentValue = to
        isAnimating = false
      }

      if (property === 'x') {
        element.style.transform = `translateX(${currentValue}px)`
      } else if (property === 'y') {
        element.style.transform = `translateY(${currentValue}px)`
      } else if (property === 'scale') {
        element.style.transform = `scale(${currentValue})`
      } else if (property === 'rotation') {
        element.style.transform = `rotate(${currentValue}deg)`
      }

      if (isAnimating) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      isAnimating = false
    }
  }

  static createElasticAnimation(
    element: HTMLElement,
    options: {
      from?: any
      to?: any
      duration?: number
      ease?: string
    } = {}
  ) {
    const { from = { scale: 0 }, to = { scale: 1 }, duration = 800 } = options

    return animate({
      from,
      to,
      duration,
      ease: [0.68, -0.55, 0.265, 1.55], // Elastic ease
      onUpdate: (v) => {
        if (v.scale !== undefined) {
          element.style.transform = `scale(${v.scale})`
        }
        if (v.x !== undefined || v.y !== undefined) {
          element.style.transform = `translate(${v.x || 0}px, ${v.y || 0}px)`
        }
        if (v.opacity !== undefined) {
          element.style.opacity = v.opacity.toString()
        }
      },
    })
  }

  static createMagnetEffect(
    element: HTMLElement,
    options: {
      strength?: number
      distance?: number
    } = {}
  ) {
    const { strength = 0.3, distance = 100 } = options
    let isHovering = false

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance < 100) {
        const force = ((100 - distance) / 100) * strength
        const x = deltaX * force
        const y = deltaY * force

        spring({
          from: { x: 0, y: 0 },
          to: { x, y },
          stiffness: 300,
          damping: 20,
        }).start((v) => {
          element.style.transform = `translate(${v.x}px, ${v.y}px)`
        })
      }
    }

    const handleMouseEnter = () => {
      isHovering = true
    }

    const handleMouseLeave = () => {
      isHovering = false
      spring({
        from: { x: 0, y: 0 },
        to: { x: 0, y: 0 },
        stiffness: 300,
        damping: 20,
      }).start((v) => {
        element.style.transform = `translate(${v.x}px, ${v.y}px)`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }
}

// React hooks for Popmotion
export function useSpringAnimation(dependency: any, options: any = {}) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      return PopmotionUtils.createSpringAnimation(elementRef.current, options)
    }
  }, [dependency])

  return elementRef
}

export function useDraggable(options: any = {}) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      return PopmotionUtils.createDraggable(elementRef.current, options)
    }
  }, [])

  return elementRef
}

export function useInViewAnimation(options: any = {}) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      return PopmotionUtils.createInViewAnimation(elementRef.current, options)
    }
  }, [])

  return elementRef
}

export default PopmotionUtils
