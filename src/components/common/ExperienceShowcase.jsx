import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { Reveal } from './Reveal'
import { AnimatedHeading } from './AnimatedHeading'
import { Eyebrow } from './Eyebrow'
import logoBackus from '../../assets/logo-backus.png'

export function ExperienceShowcase({ section }) {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.from('.experience__logo', {
        autoAlpha: 0,
        y: 28,
        scale: 0.86,
        duration: 0.8,
        ease: 'back.out(1.5)',
      })
        .from('.experience__line', { scaleX: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.25')
        .from(
          '.experience__signal',
          {
            autoAlpha: 0,
            y: 28,
            scale: 0.92,
            stagger: 0.07,
            duration: 0.55,
          },
          '-=0.45'
        )

      gsap.to('.experience__logo', {
        y: -6,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id={section.id} ref={rootRef} className="section section--experience">
      <div className="experience">
        <div className="experience__brand">
          <img
            src={logoBackus}
            alt={`Logo ${section.company}`}
            className="experience__logo"
            loading="lazy"
          />
        </div>

        <div className="experience__copy">
          <Reveal>
            <Eyebrow>{section.eyebrow}</Eyebrow>
          </Reveal>
          <AnimatedHeading className="heading-section">{section.title}</AnimatedHeading>

          <Reveal delay={60}>
            <p className="experience__company">
              {section.company}
              <span aria-hidden="true"> · </span>
              {section.employment}
            </p>
            <div className="experience__timeline" aria-label="Periodo laboral">
              <span>{section.period}</span>
              <span className="experience__line" aria-hidden="true" />
              <span>
                {section.duration}
                <span aria-hidden="true"> · </span>
                {section.location}
              </span>
            </div>
            <p className="subtitle experience__summary">{section.summary}</p>
          </Reveal>
        </div>

        <div className="experience__radar" aria-label="Capacidades operativas">
          <p className="experience__radar-label">Radar operativo</p>
          <ul className="experience__signals">
            {section.signals.map((signal) => (
              <li key={signal.label} className="experience__signal">
                <strong>{signal.label}</strong>
                <span>{signal.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
