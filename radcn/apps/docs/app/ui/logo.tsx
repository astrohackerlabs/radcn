import type { Handle } from 'remix/ui'
import { css } from 'remix/ui'

import { docsBrand } from './brand.ts'
import { docsImage } from './images.ts'

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
        <img
          alt=""
          aria-hidden="true"
          height={isHero ? 400 : 64}
          mix={isHero ? heroMarkStyle : navMarkStyle}
          src={docsImage(isHero ? '/images/radcn-1-400.webp' : '/images/radcn-1-64.webp')}
          width={isHero ? 400 : 64}
        />
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
  objectFit: 'contain',
  filter: docsBrand.shadow.logoNav,
})

const heroMarkStyle = css({
  display: 'block',
  width: 'min(100%, 13rem)',
  height: 'auto',
  objectFit: 'contain',
  filter: docsBrand.shadow.logoHero,
})

const logoLabelStyle = css({
  color: docsBrand.color.ink,
  fontWeight: 800,
  letterSpacing: 0,
})
