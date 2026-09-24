import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useMatchaMotion(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    document.body.setAttribute('data-gsap', '1')

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      const reveal = (selector: string, vars: gsap.TweenVars) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
          gsap.set(element, { autoAlpha: 0, ...vars })
          gsap.to(element, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.15,
            ease: 'power3.out',
            clearProps: 'clipPath',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          })
        })
      }

      const hero = gsap.timeline({ defaults: { ease: 'power3.out' } })
      hero
        .set('[data-hero-copy], [data-hero-image]', { autoAlpha: 1 })
        .from('[data-hero-image]', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.4, ease: 'expo.inOut' })
        .from('[data-hero-image] img', { scale: 1.08, duration: 1.8, ease: 'power2.out' }, '<.15')
        .from('.hero-title-wrap', { y: 35, opacity: 0, duration: 1.1 }, '-=.9')
        .from('.hero-kicker', { opacity: 0, duration: .7 }, '-=.65')
        .from('.hero-note', { y: 18, opacity: 0, duration: .9 }, '-=.55')

      reveal('[data-reveal]', { y: 28 })
      reveal('[data-title-reveal]', { y: 42, clipPath: 'inset(0% 0% 100% 0%)' })
      reveal('[data-image-reveal]', { clipPath: 'inset(0% 0% 100% 0%)' })

      gsap.utils.toArray<HTMLElement>('[data-product]').forEach((product, index) => {
        const image = product.querySelector('.product-image')
        const copy = product.querySelector('.product-copy')
        const direction = index % 2 ? 24 : -24
        gsap.set(product, { autoAlpha: 1 })
        gsap.from(image, {
          clipPath: index % 2 ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)',
          duration: 1.25,
          ease: 'expo.out',
          scrollTrigger: { trigger: product, start: 'top 78%', once: true },
        })
        gsap.from(copy, {
          x: direction,
          opacity: 0,
          duration: 1,
          delay: .18,
          ease: 'power3.out',
          scrollTrigger: { trigger: product, start: 'top 78%', once: true },
        })
      })

      const menuRows = gsap.utils.toArray<HTMLElement>('[data-menu-row]')
      gsap.set(menuRows, { autoAlpha: 0 })
      ScrollTrigger.create({
        trigger: '.menu-list',
        start: 'top 82%',
        once: true,
        onEnter: () => gsap.to(menuRows, { autoAlpha: 1, duration: .6, stagger: .045, ease: 'power2.out' }),
      })

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((element) => {
        const end = Number(element.textContent) || 0
        const state = { value: 0 }
        ScrollTrigger.create({
          trigger: element,
          start: 'top 90%',
          once: true,
          onEnter: () => gsap.to(state, {
            value: end,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => { element.textContent = String(Math.round(state.value)) },
          }),
        })
      })

      gsap.to('[data-bar]', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: .15 },
      })

      mm.add('(min-width: 701px)', () => {
        gsap.to('[data-parallax]', {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: '.hero-figure', start: 'top bottom', end: 'bottom top', scrub: .6 },
        })
        gsap.fromTo('[data-craft-parallax]', { yPercent: -5 }, {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.craft', start: 'top bottom', end: 'bottom top', scrub: .7 },
        })
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => mm.revert()
    })

    return () => {
      ctx.revert()
      document.body.removeAttribute('data-gsap')
    }
  }, [enabled])
}
