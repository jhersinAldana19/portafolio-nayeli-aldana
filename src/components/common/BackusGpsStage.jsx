import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import logoBackus from '../../assets/logo-backus.png'

export function BackusGpsStage({ media, imageSrc }) {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from('.gps-stage__panel', {
        autoAlpha: 0,
        y: 28,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to('.gps-stage__pulse', {
        scale: 1.35,
        opacity: 0.35,
        duration: 1.1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="gps-stage">
      <div className="gps-stage__panel">
        <img src={imageSrc} alt={media.alt} className="gps-stage__img" loading="lazy" />

        <div className="gps-stage__top">
          <img src={logoBackus} alt="Backus" className="gps-stage__brand" />
          <span className="gps-stage__live">
            <span className="gps-stage__pulse" aria-hidden="true" />
            En vivo
          </span>
        </div>
      </div>

      <p className="gps-stage__caption">
        <span className="gps-stage__kicker">{media.kicker}</span>
        {media.caption}
      </p>
    </div>
  )
}
