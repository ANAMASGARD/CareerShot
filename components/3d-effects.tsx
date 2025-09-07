"use client"
import React, { useEffect, useRef } from 'react'

interface FloatingOrbsProps {
  className?: string
}

export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const orbs = container.querySelectorAll('.floating-orb')
    
    // Animate orbs with CSS transforms for better performance
    orbs.forEach((orb, index) => {
      const element = orb as HTMLElement
      const duration = 4000 + (index * 1000) // Stagger animation timing
      const delay = index * 500
      
      element.style.animationDuration = `${duration}ms`
      element.style.animationDelay = `${delay}ms`
    })
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Large gradient orbs */}
      <div className="floating-orb absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-float-slow" />
      <div className="floating-orb absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-violet-400/20 to-pink-500/20 rounded-full blur-3xl animate-float-reverse" />
      <div className="floating-orb absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/25 to-blue-500/25 rounded-full blur-2xl animate-float-delayed" />
      
      {/* Smaller accent orbs */}
      <div className="floating-orb absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-400/40 to-purple-500/40 rounded-full blur-xl animate-float-fast" />
      <div className="floating-orb absolute bottom-32 right-1/4 w-24 h-24 bg-gradient-to-tr from-pink-400/35 to-rose-500/35 rounded-full blur-lg animate-float-reverse-fast" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay" />
      
      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />
    </div>
  )
}

interface ParticlesProps {
  className?: string
  count?: number
}

export const Particles: React.FC<ParticlesProps> = ({ className = '', count = 50 }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const particles = Array.from({ length: count }, (_, i) => {
      const particle = document.createElement('div')
      particle.className = 'absolute w-1 h-1 bg-white/20 dark:bg-white/10 rounded-full'
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 3}s`
      particle.style.animationDuration = `${3 + Math.random() * 2}s`
      particle.classList.add('animate-twinkle')
      
      container.appendChild(particle)
      return particle
    })

    return () => {
      particles.forEach(particle => particle.remove())
    }
  }, [count])

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}

// 3D CSS Transform component
interface CSS3DElementProps {
  children: React.ReactNode
  className?: string
  rotateX?: number
  rotateY?: number
  rotateZ?: number
  translateZ?: number
}

export const CSS3DElement: React.FC<CSS3DElementProps> = ({
  children,
  className = '',
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  translateZ = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height
      
      const rotY = deltaX * 10 // Max 10 degrees
      const rotX = deltaY * -10 // Inverted for natural feel
      
      element.style.transform = `
        perspective(1000px) 
        rotateX(${rotX + rotateX}deg) 
        rotateY(${rotY + rotateY}deg) 
        rotateZ(${rotateZ}deg) 
        translateZ(${translateZ}px)
      `
    }

    const handleMouseLeave = () => {
      element.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        rotateZ(${rotateZ}deg) 
        translateZ(${translateZ}px)
      `
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [rotateX, rotateY, rotateZ, translateZ])

  return (
    <div 
      ref={elementRef}
      className={`transform-gpu transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateZ(${translateZ}px)`
      }}
    >
      {children}
    </div>
  )
}
