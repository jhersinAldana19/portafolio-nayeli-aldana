import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export function FillButton({
  as = 'a',
  href,
  onClick,
  children,
  className = '',
  variant = 'solid',
  type = 'button',
  download,
  ...rest
}) {
  const rootRef = useRef(null)
  const fillRef = useRef(null)
  const tweenRef = useRef(null)
  const Tag = as

  useLayoutEffect(() => {
    const fill = fillRef.current
    if (!fill) return

    gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' })

    if (prefersReducedMotion()) return undefined

    tweenRef.current = gsap.to(fill, {
      scaleX: 1,
      duration: 0.45,
      ease: 'power3.inOut',
      paused: true,
    })

    return () => {
      tweenRef.current?.kill()
      tweenRef.current = null
    }
  }, [variant])

  const play = () => {
    if (prefersReducedMotion()) return
    tweenRef.current?.play()
  }

  const reverse = () => {
    if (prefersReducedMotion()) return
    tweenRef.current?.reverse()
  }

  const sharedProps = {
    ref: rootRef,
    className: `btn-fill btn-fill--${variant} ${className}`.trim(),
    onMouseEnter: play,
    onMouseLeave: reverse,
    onFocus: play,
    onBlur: reverse,
    ...rest,
  }

  if (Tag === 'button') {
    return (
      <button type={type} onClick={onClick} {...sharedProps}>
        <span ref={fillRef} className="btn-fill__ink" aria-hidden="true" />
        <span className="btn-fill__label">{children}</span>
      </button>
    )
  }

  return (
    <a href={href} download={download} onClick={onClick} {...sharedProps}>
      <span ref={fillRef} className="btn-fill__ink" aria-hidden="true" />
      <span className="btn-fill__label">{children}</span>
    </a>
  )
}
