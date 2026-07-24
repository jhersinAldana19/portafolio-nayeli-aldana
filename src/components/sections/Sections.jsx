import { useLayoutEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '../../lib/gsap'
import { sections } from '../../data/sections'
import { Reveal } from '../common/Reveal'
import { AnimatedHeading } from '../common/AnimatedHeading'
import { CertificateShowcase } from '../common/CertificateShowcase'
import { EducationLogos } from '../common/EducationLogos'
import { ExperienceShowcase } from '../common/ExperienceShowcase'
import { Eyebrow } from '../common/Eyebrow'
import { FillButton } from '../common/FillButton'
import heroPhoto from '../../assets/hero-nayeli.jpg'
import logoSenati from '../../assets/logo-senati.png'
import logoUpc from '../../assets/logo-upc.png'

const logos = {
  SENATI: logoSenati,
  UPC: logoUpc,
}

function Hero({ section }) {
  const rootRef = useRef(null)
  const titleRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const title = titleRef.current
    if (!root || !title) return
    if (prefersReducedMotion()) return

    const parallax = root.querySelector('.hero-photo__parallax')
    let split
    let cancelled = false

    const ctx = gsap.context(() => {
      const setup = () => {
        if (cancelled) return

        split?.revert()
        split = SplitText.create(title, {
          type: 'lines,chars',
          linesClass: 'hero-line',
          charsClass: 'hero-char',
          aria: 'auto',
        })

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.from('.hero-anim-eyebrow', { autoAlpha: 0, y: 24, duration: 0.55 })
          .from(
            split.chars,
            {
              yPercent: 120,
              autoAlpha: 0,
              duration: 0.85,
              stagger: 0.028,
              ease: 'power4.out',
            },
            '-=0.15'
          )
          .from('.hero-anim-subtitle', { autoAlpha: 0, y: 28, duration: 0.7 }, '-=0.45')
          .from('.hero-anim-cta', { y: 18, duration: 0.55 }, '-=0.35')
          .from(
            '.hero-photo__reveal',
            { y: 36, scale: 0.96, duration: 1, ease: 'power3.out' },
            '-=0.8'
          )
          .from('.scroll-cue', { autoAlpha: 0, duration: 0.45 }, '-=0.35')

        if (parallax) {
          gsap.to(parallax, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      }

      if (document.fonts?.ready) {
        document.fonts.ready.then(setup)
      } else {
        setup()
      }
    }, root)

    return () => {
      cancelled = true
      split?.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section id={section.id} ref={rootRef} className="section section--hero">
      <div className="hero-grid">
        <div className="section__inner">
          <div className="hero-anim-eyebrow">
            <Eyebrow tone="secondary">{section.eyebrow}</Eyebrow>
          </div>
          <h1 ref={titleRef} className="heading-hero whitespace-pre-line">
            {section.title}
          </h1>
          <p className="subtitle hero-anim-subtitle">{section.subtitle}</p>
          <div className="hero-anim-cta">
            <FillButton href={section.link} variant="on-dark">
              {section.cta}
            </FillButton>
          </div>
        </div>
        <div className="hero-photo">
          <div className="hero-photo__parallax">
            <div className="hero-photo__reveal">
              <img
                src={heroPhoto}
                alt="Retrato de Nayeli Aldana"
                className="hero-photo__img"
                width="640"
                height="800"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Desplazarse a la siguiente sección">
        <span />
      </a>
    </section>
  )
}

function About({ section }) {
  return (
    <section id={section.id} className="section section--about">
      <div className="about-grid">
        <div className="about-grid__text">
          <Reveal>
            <Eyebrow>{section.eyebrow}</Eyebrow>
          </Reveal>
          <AnimatedHeading className="heading-section">{section.title}</AnimatedHeading>
          <Reveal delay={80}>
            <p className="subtitle">{section.subtitle}</p>
          </Reveal>
        </div>
        <EducationLogos items={section.education} logos={logos} />
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section id="credentials" className="section section--credentials">
      <CertificateShowcase />
    </section>
  )
}

function Stats({ section }) {
  return (
    <section id={section.id} className={`section section--stats ${section.reverse ? 'section--reverse' : ''}`}>
      <div className="stats-grid">
        <div className="stats-grid__text">
          <Reveal>
            <Eyebrow>{section.eyebrow}</Eyebrow>
          </Reveal>
          <AnimatedHeading className="heading-section">{section.title}</AnimatedHeading>
          <Reveal delay={80}>
            <p className="subtitle">{section.subtitle}</p>
          </Reveal>
        </div>
        <div className="stats-grid__metrics">
          {section.metrics.map((m, idx) => (
            <Reveal key={m.label} as="div" className="stat" delay={idx * 120}>
              <h3>{m.value}</h3>
              <p>{m.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cta({ section }) {
  return (
    <section id={section.id} className="section section--cta">
      <div className="section__inner section__inner--center">
        <Reveal>
          <Eyebrow>{section.eyebrow}</Eyebrow>
        </Reveal>
        <AnimatedHeading className="heading-section">{section.title}</AnimatedHeading>
        <Reveal delay={80}>
          <p className="subtitle mx-auto">{section.subtitle}</p>
          <div className="mt-cta">
            <FillButton href={section.link} variant="outline">
              {section.cta}
            </FillButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Contact({ section }) {
  return (
    <section id={section.id} className="section section--contact section--surface-primary">
      <div className="section__inner section__inner--center">
        <Reveal>
          <Eyebrow tone="muted">{section.eyebrow}</Eyebrow>
        </Reveal>
        <AnimatedHeading className="heading-section">{section.title}</AnimatedHeading>
        <Reveal delay={80}>
          <p className="subtitle mx-auto">{section.subtitle}</p>
          <div className="mt-cta">
            <FillButton href={section.link} variant="on-dark">
              {section.cta}
            </FillButton>
          </div>
        </Reveal>
      </div>
      <p className="footnote">Nayeli Aldana — {new Date().getFullYear()}</p>
    </section>
  )
}

const renderers = {
  hero: Hero,
  about: About,
  credentials: Credentials,
  experience: ExperienceShowcase,
  stats: Stats,
  cta: Cta,
  contact: Contact,
}

export function Sections() {
  return (
    <>
      {sections.map((section) => {
        const Renderer = renderers[section.kind]
        return <Renderer key={section.id} section={section} />
      })}
    </>
  )
}
