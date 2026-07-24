import { useLayoutEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '../../lib/gsap'

export function AnimatedHeading({ as: Tag = 'h2', className = '', children }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    let split
    const ctx = gsap.context(() => {
      const run = () => {
        split?.revert()
        split = SplitText.create(el, {
          type: 'lines',
          linesClass: 'split-line',
          aria: 'auto',
        })

        gsap.from(split.lines, {
          yPercent: 110,
          autoAlpha: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      if (document.fonts?.ready) {
        document.fonts.ready.then(run)
      } else {
        run()
      }
    }, el)

    return () => {
      split?.revert()
      ctx.revert()
    }
  }, [children])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
