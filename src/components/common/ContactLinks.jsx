function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path
        d="M7.5 3.8h3.2l1.2 3.2-2 1.4a12.5 12.5 0 0 0 5.7 5.7l1.4-2 3.2 1.2v3.2a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 3.5 6a2 2 0 0 1 2-2.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V16M8 8v.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M12 16v-3.2a2 2 0 0 1 4 0V16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CvIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path
        d="M12 3v12m0 0 4-4m-4 4-4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const ICONS = {
  mail: MailIcon,
  phone: PhoneIcon,
  linkedin: LinkedInIcon,
  download: CvIcon,
}

export function ContactLinks({ channels, cvHref }) {
  return (
    <ul className="contact-links">
      {channels.map((channel) => {
        const isCv = channel.href === 'cv'
        const Icon = ICONS[channel.icon] || MailIcon
        const href = isCv ? cvHref : channel.href

        return (
          <li key={channel.label} className="contact-links__item">
            <a
              href={href}
              className="contact-links__anchor"
              download={channel.download}
              target={!isCv && href.startsWith('http') ? '_blank' : undefined}
              rel={!isCv && href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={`${channel.label}: ${channel.detail}`}
            >
              <span className="contact-links__icon">
                <Icon />
              </span>
              <span className="contact-links__text">
                <span className="contact-links__label">{channel.label}</span>
                <span className="contact-links__detail">{channel.detail}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
