import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export function EducationLogos({ items, logos }) {
  const listRef = useRef(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    if (prefersReducedMotion()) return

    const cards = list.querySelectorAll('.education-item')
    const marks = list.querySelectorAll('.education-item__logo')
    const cleanups = []

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        autoAlpha: 0,
        y: 56,
        scale: 0.88,
        rotate: -2,
        duration: 0.95,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: list,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(marks, {
        autoAlpha: 0,
        y: 28,
        scale: 0.7,
        duration: 0.85,
        stagger: 0.2,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: list,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      marks.forEach((logo, index) => {
        gsap.to(logo, {
          y: -8,
          duration: 2.1 + index * 0.35,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.8 + index * 0.15,
        })
      })

      cards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, { y: -6, scale: 1.02, duration: 0.35, ease: 'power2.out' })
        }
        const onLeave = () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: 'power2.out' })
        }
        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          card.removeEventListener('mouseenter', onEnter)
          card.removeEventListener('mouseleave', onLeave)
        })
      })
    }, list)

    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [items, logos])

  return (
    <div ref={listRef} className="about-grid__education">
      {items.map((item, idx) => (
        <article key={item.institution} className="education-item">
          <span className="education-item__index" aria-hidden="true">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <img
            src={logos[item.institution]}
            alt={`Logo ${item.institution}`}
            className="education-item__logo"
            loading="lazy"
          />
          <div className="education-item__meta">
            <p className="education-item__status">{item.status}</p>
            <p className="education-item__program">{item.program}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
