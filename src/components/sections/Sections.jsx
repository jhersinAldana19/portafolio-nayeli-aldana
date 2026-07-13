import { sections } from '../../data/sections'
import { Reveal } from '../common/Reveal'
import heroPhoto from '../../assets/hero-nayeli.webp'

function Eyebrow({ children, dark }) {
  return <p className={`eyebrow ${dark ? 'eyebrow--dark' : ''}`}>{children}</p>
}

function Hero({ section }) {
  return (
    <section id={section.id} className="section section--hero">
      <div className="hero-grid">
        <Reveal className="section__inner">
          <Eyebrow dark>{section.eyebrow}</Eyebrow>
          <h1 className="heading-hero whitespace-pre-line">{section.title}</h1>
          <p className="subtitle subtitle--dark">{section.subtitle}</p>
          <a href={section.link} className="cta cta--light">{section.cta}</a>
        </Reveal>
        <Reveal className="hero-photo" delay={150}>
          <img
            src={heroPhoto}
            alt="Retrato de Nayeli Aldana"
            className="hero-photo__img"
            width="640"
            height="800"
            loading="eager"
            fetchPriority="high"
          />
        </Reveal>
      </div>
      <a href="#strategy" className="scroll-cue" aria-label="Desplazarse a la siguiente sección">
        <span />
      </a>
    </section>
  )
}

function Stats({ section }) {
  return (
    <section id={section.id} className={`section section--stats ${section.reverse ? 'section--reverse' : ''}`}>
      <div className="stats-grid">
        <Reveal className="stats-grid__text">
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <h2 className="heading-section">{section.title}</h2>
          <p className="subtitle">{section.subtitle}</p>
        </Reveal>
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
      <Reveal as="div" className="section__inner section__inner--center">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <h2 className="heading-section">{section.title}</h2>
        <p className="subtitle mx-auto">{section.subtitle}</p>
        <a href={section.link} className="cta cta--outline">{section.cta}</a>
      </Reveal>
    </section>
  )
}

function Contact({ section }) {
  return (
    <section id={section.id} className="section section--contact">
      <Reveal as="div" className="section__inner section__inner--center">
        <Eyebrow dark>{section.eyebrow}</Eyebrow>
        <h2 className="heading-section heading-section--dark">{section.title}</h2>
        <p className="subtitle subtitle--dark mx-auto">{section.subtitle}</p>
        <a href={section.link} className="cta cta--light">{section.cta}</a>
      </Reveal>
      <p className="footnote">Nayeli Aldana — {new Date().getFullYear()}</p>
    </section>
  )
}

const renderers = {
  hero: Hero,
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
