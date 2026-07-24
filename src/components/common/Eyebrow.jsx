export function Eyebrow({ children, tone = 'accent' }) {
  return <p className={`eyebrow eyebrow--${tone}`}>{children}</p>
}
