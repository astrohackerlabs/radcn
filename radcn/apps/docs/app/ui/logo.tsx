import type { Handle } from 'remix/ui'
import { css } from 'remix/ui'

import { docsBrand } from './brand.ts'

export interface RadcnLogoProps {
  label?: boolean
  size?: 'nav' | 'hero'
}

export function RadcnLogo(handle: Handle<RadcnLogoProps>) {
  return () => {
    let { label = false, size = 'nav' } = handle.props
    let isHero = size === 'hero'

    return (
      <span data-radcn-logo mix={label ? logoWithLabelStyle : logoOnlyStyle}>
        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          mix={isHero ? heroMarkStyle : navMarkStyle}
        >
          <rect x="13" y="10" width="38" height="42" rx="7" fill={docsBrand.color.ink} />
          <path d="M24 10h16l-3-7H27z" fill={docsBrand.color.accent} />
          <path
            d="M19 31h26"
            stroke={docsBrand.color.cyan}
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path d="M19 31h12l-4 9h-8z" fill={docsBrand.color.ink} />
          <path d="M33 31h12v9h-8z" fill={docsBrand.color.ink} />
          <path
            d="M25 48h14"
            stroke={docsBrand.color.surface}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="22" cy="20" r="3" fill={docsBrand.color.lime} />
          <circle cx="42" cy="20" r="3" fill={docsBrand.color.yellow} />
          <path
            d="M11 25h-5M58 25h-5"
            stroke={docsBrand.color.ink}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        {label ? <span mix={logoLabelStyle}>RadCN</span> : null}
      </span>
    )
  }
}

const logoOnlyStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
})

const logoWithLabelStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.625rem',
})

const navMarkStyle = css({
  display: 'block',
  width: '2.25rem',
  height: '2.25rem',
  filter: docsBrand.shadow.logoNav,
})

const heroMarkStyle = css({
  display: 'block',
  width: 'min(100%, 13rem)',
  height: 'auto',
  filter: docsBrand.shadow.logoHero,
})

const logoLabelStyle = css({
  color: docsBrand.color.ink,
  fontWeight: 800,
  letterSpacing: 0,
})
