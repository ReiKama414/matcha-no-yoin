import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function whenSeen(el: Element, run: () => void) {
  if (!('IntersectionObserver' in window)) {
    run()
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          io.disconnect()
          run()
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  )

  io.observe(el)
  window.setTimeout(() => {
    io.disconnect()
    run()
  }, 9000)
}

export function useLegacyMotion(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    document.body.setAttribute('data-gsap', '1')

    const ease = 'power3.out'
    const ctx = gsap.context(() => {
      gsap.from('h1 span span', {
        yPercent: 70,
        opacity: 0,
        rotate: 5,
        filter: 'blur(12px)',
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        delay: 0.1,
      })

      gsap.from('h1 ~ p, h1 ~ div', {
        y: 26,
        opacity: 0,
        duration: 1,
        ease,
        stagger: 0.12,
        delay: 0.85,
      })

      const play = (
        el: Element,
        from: gsap.TweenVars,
        extra?: gsap.TweenVars,
      ) => {
        gsap.fromTo(
          el,
          from,
          {
            opacity: 1,
            x: 0,
            y: 0,
            yPercent: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease,
            clearProps: 'clipPath,filter',
            ...extra,
          },
        )
      }

      const group = (
        sel: string,
        from: gsap.TweenVars,
        extra?: gsap.TweenVars,
        step = 0,
      ) => {
        gsap.utils.toArray<Element>(sel).forEach((el, i) => {
          whenSeen(el, () => play(el, from, { delay: step * i, ...extra }))
        })
      }

      group('[data-reveal]:not(#season article)', {
        opacity: 0,
        y: 46,
        scale: 0.985,
      })
      group(
        '[data-wipe]',
        { opacity: 0, yPercent: 28, clipPath: 'inset(100% 0% 0% 0%)' },
        { duration: 1.15, ease: 'expo.out' },
      )
      group(
        '[data-shutter]',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { duration: 1.4, ease: 'expo.out' },
      )
      group('#season article', { opacity: 0, y: 56 }, undefined, 0.1)

      gsap.utils.toArray<HTMLElement>('#menu ul').forEach((ul) => {
        whenSeen(ul, () => {
          gsap.fromTo(
            ul.children,
            { opacity: 0, x: -28 },
            { opacity: 1, x: 0, duration: 0.8, ease, stagger: 0.06 },
          )
        })
      })

      const img = document.querySelector('[data-pan]')
      if (img?.parentElement) {
        gsap.set(img, { scale: 1.14 })
        gsap.to(img, {
          yPercent: -7,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }

      const bar = document.querySelector<HTMLElement>('[data-bar]')
      if (bar) {
        const tick = () => {
          const max =
            document.documentElement.scrollHeight - window.innerHeight || 1
          const p = Math.min(
            1,
            Math.max(0, (window.scrollY || document.documentElement.scrollTop) / max),
          )
          bar.style.transformOrigin = 'left center'
          bar.style.transform = `scaleX(${p})`
        }
        window.addEventListener('scroll', tick, { passive: true })
        window.addEventListener('resize', tick)
        tick()
      }

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const end = parseFloat(el.textContent || '0') || 0
        const o = { v: 0 }
        whenSeen(el, () => {
          gsap.to(o, {
            v: end,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = String(Math.round(o.v))
            },
            onComplete: () => {
              el.textContent = String(end)
            },
          })
        })
      })

      ScrollTrigger.refresh()
    })

    return () => {
      document.body.removeAttribute('data-gsap')
      ctx.revert()
    }
  }, [enabled])
}

