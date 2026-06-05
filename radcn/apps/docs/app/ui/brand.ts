export const docsBrand = {
  color: {
    canvas: '#fbfcfe',
    canvasGrid: '#e6ebf2',
    surface: '#ffffff',
    surfaceRaised: '#f8fafc',
    rail: '#f1f5f9',
    ink: '#0b1020',
    inkSoft: '#334155',
    muted: '#64748b',
    border: '#d8dee8',
    borderStrong: '#0b1020',
    accent: '#ff2d20',
    accentDeep: '#b91512',
    cyan: '#00c8ff',
    lime: '#b6ff00',
    yellow: '#ffd84d',
    code: '#080d1a',
    codeText: '#e8f0ff',
    topbar: 'rgb(251 252 254 / 0.94)',
  },
  font: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"SF Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
  },
  radius: {
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
  },
  space: {
    nav: '4rem',
    pageX: 'clamp(1rem, 4vw, 4rem)',
  },
  shadow: {
    raised: '0 24px 60px rgb(11 16 32 / 0.14)',
    hard: '6px 6px 0 #0b1020',
    logoNav: 'drop-shadow(3px 3px 0 rgb(11 16 32 / 0.18))',
    logoHero: 'drop-shadow(8px 8px 0 rgb(11 16 32 / 0.2))',
  },
}

export const docsGridBackground =
  `linear-gradient(${docsBrand.color.canvasGrid} 1px, transparent 1px), ` +
  `linear-gradient(90deg, ${docsBrand.color.canvasGrid} 1px, transparent 1px)`
