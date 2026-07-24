import { useEffect, useState } from 'react'
import { navLinks } from '../../data/nav'
import { FillButton } from '../common/FillButton'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [activeId, setActiveId] = useState(navLinks[0].id)

  const mainLinks = navLinks.filter((link) => link.id !== 'contact')
  const contactLink = navLinks.find((link) => link.id === 'contact')

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY

      if (isOpen) {
        setIsHidden(false)
      } else if (y < 64) {
        setIsHidden(false)
      } else if (delta > 6) {
        setIsHidden(true)
      } else if (delta < -6) {
        setIsHidden(false)
      }

      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isOpen])

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <>
      <nav className={`nav-premium ${isHidden ? 'nav-premium--hidden' : ''}`}>
        <div className="nav-brand">Nayeli Aldana</div>

        <div className="nav-desktop hidden md:flex">
          {mainLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`nav-link ${activeId === link.id ? 'nav-link--active' : ''}`}
            >
              {link.label}
            </button>
          ))}
          {contactLink && (
            <FillButton
              as="button"
              variant="nav"
              className={activeId === contactLink.id ? 'is-active' : ''}
              onClick={() => scrollTo(contactLink.id)}
            >
              {contactLink.label}
            </FillButton>
          )}
        </div>

        <button
          className="md:hidden bg-transparent border-none text-inherit cursor-pointer text-sm font-bold tracking-widest"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'CERRAR' : 'MENÚ'}
        </button>
      </nav>

      {isOpen && (
        <div className="nav-mobile md:hidden">
          {navLinks.map((link) =>
            link.id === 'contact' ? (
              <FillButton
                key={link.id}
                as="button"
                variant="solid"
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </FillButton>
            ) : (
              <button key={link.id} onClick={() => scrollTo(link.id)}>
                {link.label}
              </button>
            )
          )}
        </div>
      )}
    </>
  )
}
