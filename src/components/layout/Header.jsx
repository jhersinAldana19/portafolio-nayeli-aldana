import { useEffect, useState } from 'react'
import { navLinks } from '../../data/nav'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState(navLinks[0].id)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <nav className={`nav-premium ${isScrolled ? 'nav-premium--solid' : ''}`}>
        <div className="font-bold text-xl uppercase tracking-widest">Nayeli Aldana</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12 text-sm font-medium uppercase tracking-widest">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`nav-link ${activeId === link.id ? 'nav-link--active' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden bg-transparent border-none text-inherit cursor-pointer text-sm font-bold tracking-widest"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'CERRAR' : 'MENÚ'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] bg-[#00383a] text-white flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-2xl font-bold uppercase tracking-widest bg-transparent border-none text-white cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
