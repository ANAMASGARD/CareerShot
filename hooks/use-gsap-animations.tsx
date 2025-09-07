"use client"
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Dynamically import ScrollTrigger to avoid SSR issues
let ScrollTrigger: any = null
if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then((module) => {
    ScrollTrigger = module.ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)
  })
}

export const useGSAPAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !ScrollTrigger) return

    const container = containerRef.current
    const mm = gsap.matchMedia()

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Simple fade-in for reduced motion
      gsap.set(container.querySelectorAll('[data-animate]'), { opacity: 1 })
      return
    }

    // GSAP Animations for scroll reveals
    const animateElements = container.querySelectorAll('[data-animate]')
    
    animateElements.forEach((element) => {
      gsap.fromTo(element, 
        {
          y: 48,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          }
        }
      )
    })

    // Parallax effects for background elements
    const parallaxElements = container.querySelectorAll('[data-parallax]')
    
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute('data-parallax') || '0.5'
      
      gsap.to(element, {
        yPercent: -50 * parseFloat(speed),
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    })

    // Navbar transformation on scroll
    const navbar = container.querySelector('[data-navbar]')
    if (navbar) {
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "scrolled", targets: navbar }
      })
    }

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
    }
  }, [])

  return containerRef
}

export const useGSAPReveal = (trigger?: string) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!elementRef.current || !ScrollTrigger) return

    const element = elementRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1 })
      return
    }

    gsap.fromTo(element,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger || element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
    }
  }, [trigger])

  return elementRef
}
