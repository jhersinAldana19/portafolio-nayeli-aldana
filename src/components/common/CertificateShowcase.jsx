import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import constanciaImg from '../../assets/constancia-egreso/constancia-egreso.webp'
import constanciaPdf from '../../assets/constancia-egreso/constancia-egreso.pdf'
import { Reveal } from './Reveal'
import { AnimatedHeading } from './AnimatedHeading'
import { Eyebrow } from './Eyebrow'
import { FillButton } from './FillButton'

export function CertificateShowcase() {
  const stageRef = useRef(null)
  const docRef = useRef(null)
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    const stage = stageRef.current
    const doc = docRef.current
    if (!stage || !doc) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        doc,
        { autoAlpha: 0, y: 60, rotate: -8, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: -2.5,
          scale: 1,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stage,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, stage)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <div ref={stageRef} className="certificate">
        <div className="certificate__copy">
          <Reveal>
            <Eyebrow tone="secondary">Constancia de egreso</Eyebrow>
          </Reveal>
          <AnimatedHeading className="heading-section">Formación acreditada</AnimatedHeading>
          <Reveal delay={80}>
            <p className="subtitle">
              Constancia oficial de egreso de SENATI en Administración Industrial. Puedes verla aquí o
              descargarla en PDF.
            </p>
            <div className="certificate__actions">
              <FillButton as="button" variant="solid" onClick={() => setOpen(true)}>
                Ver constancia
              </FillButton>
              <FillButton
                href={constanciaPdf}
                download="Constancia-Egreso-Nayeli-Aldana-SENATI.pdf"
                variant="outline"
              >
                Descargar PDF
              </FillButton>
            </div>
          </Reveal>
        </div>

        <button
          type="button"
          className="certificate__doc"
          ref={docRef}
          onClick={() => setOpen(true)}
          aria-label="Ampliar constancia de egreso"
        >
          <span className="certificate__seal" aria-hidden="true">
            SENATI
          </span>
          <img
            src={constanciaImg}
            alt="Constancia de egreso de Nayeli Aldana — SENATI, Administración Industrial"
            className="certificate__img"
            loading="lazy"
          />
          <span className="certificate__hint">Clic para ampliar</span>
        </button>
      </div>

      {open && (
        <div
          className="certificate-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Constancia de egreso"
          onClick={() => setOpen(false)}
        >
          <div className="certificate-lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <div className="certificate-lightbox__bar">
              <p>Constancia de egreso · SENATI</p>
              <div className="certificate-lightbox__tools">
                <a
                  href={constanciaPdf}
                  download="Constancia-Egreso-Nayeli-Aldana-SENATI.pdf"
                  className="certificate-lightbox__download"
                >
                  Descargar PDF
                </a>
                <button
                  type="button"
                  className="certificate-lightbox__close"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                >
                  Cerrar
                </button>
              </div>
            </div>
            <img
              src={constanciaImg}
              alt="Constancia de egreso ampliada"
              className="certificate-lightbox__img"
            />
          </div>
        </div>
      )}
    </>
  )
}
