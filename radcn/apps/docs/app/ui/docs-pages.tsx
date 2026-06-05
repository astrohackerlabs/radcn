import type { Handle, RemixNode } from 'remix/ui'
import { css } from 'remix/ui'
import { Badge } from 'radcn/badge'
import { Button } from 'radcn/button'

import type { ComponentDoc, ComponentExample } from '../content/components.tsx'
import { componentDocs } from '../content/components.tsx'
import { routes } from '../routes.ts'
import { docsBrand, docsGridBackground } from './brand.ts'
import { Document } from './document.tsx'
import { CopyIcon, MonitorIcon, MoonIcon, SunIcon } from './icons.tsx'
import { RadcnLogo } from './logo.tsx'

export function HomePage() {
  return () => (
    <Document title="RadCN">
      <DocsShell activeSlug="button">
        <Hero />
        <section id="preview" mix={sectionStyle}>
          <SectionHeading
            eyebrow="First component"
            title="The docs render the library, not screenshots of it."
            description="This first slice uses package imports from RadCN so the examples exercise the same component surface a Remix 3 app consumes."
          />
          <ExamplePanel example={componentDocs[0].examples[0]} />
        </section>
      </DocsShell>
    </Document>
  )
}

export function ComponentPage(handle: Handle<{ component: ComponentDoc }>) {
  return () => {
    let { component } = handle.props

    return (
      <Document title={`${component.title} - RadCN`}>
        <DocsShell activeSlug={component.slug}>
          <article mix={articleStyle}>
            <header mix={pageHeaderStyle}>
              <div mix={css({ display: 'grid', gap: '0.75rem' })}>
                <div mix={css({ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' })}>
                  <Badge variant="secondary">{component.category}</Badge>
                  <Badge variant="outline">{component.status}</Badge>
                </div>
                <h1 mix={h1Style}>{component.title}</h1>
                <p mix={leadStyle}>{component.summary}</p>
              </div>
              <div mix={quickInstallStyle}>
                <span mix={eyebrowStyle}>Import</span>
                <code mix={inlineCodeStyle}>{component.importExample}</code>
              </div>
            </header>

            <section id="preview" mix={sectionStyle}>
              <SectionHeading
                eyebrow="Preview"
                title="Live package example"
                description={component.examples[0].description}
              />
              <ExamplePanel example={component.examples[0]} />
            </section>

            <InfoSection id="installation" title="Installation">
              <p mix={paragraphStyle}>
                Add RadCN to the Remix 3 workspace and import components from package subpaths.
              </p>
              <CodeBlock code={`${component.install}\n${component.importExample}`} />
            </InfoSection>

            <InfoSection id="theming" title="Theming">
              <p mix={paragraphStyle}>
                RadCN tokens read the resolved theme from the document. Store the user's
                preference separately, then resolve system preferences to a concrete light or
                dark theme before setting package tokens.
              </p>
              <CodeBlock
                code={`<html data-radcn-theme-mode="system" data-radcn-theme="dark">\n  ...\n</html>`}
              />
            </InfoSection>

            <ListSection id="accessibility" title="Accessibility" items={component.accessibility} />
            <ListSection id="customization" title="Customization" items={component.customization} />
            <ListSection id="remix-3" title="Remix 3 Notes" items={component.divergence} />
          </article>
        </DocsShell>
      </Document>
    )
  }
}

function DocsShell(handle: Handle<{ activeSlug?: string; children: RemixNode }>) {
  return () => {
    let { activeSlug, children } = handle.props
    let groups = groupComponentDocs()
    let installHref = activeSlug
      ? `${routes.component.href({ slug: activeSlug })}#installation`
      : `${routes.component.href({ slug: 'button' })}#installation`

    return (
      <main mix={shellStyle}>
        <header mix={topbarStyle}>
          <a href={routes.home.href()} mix={brandStyle} aria-label="RadCN home" rmx-document="">
            <RadcnLogo label />
          </a>
          <nav aria-label="Primary" mix={topNavStyle}>
            <a href={routes.component.href({ slug: 'button' })} mix={topNavLinkStyle} rmx-document="">
              Components
            </a>
            <a href={installHref} mix={topNavLinkStyle} rmx-document="">
              Install
            </a>
            <div
              aria-label="Theme"
              data-radcn-theme-mode-control
              data-radcn-theme-resolved="light"
              mix={themeModeControlStyle}
              role="radiogroup"
            >
              <button
                aria-checked="true"
                data-active="true"
                data-radcn-theme-mode-option="system"
                mix={themeModeOptionStyle}
                role="radio"
                tabIndex={0}
                type="button"
              >
                <MonitorIcon mix={themeModeIconStyle} />
                System
              </button>
              <button
                aria-checked="false"
                data-active="false"
                data-radcn-theme-mode-option="light"
                mix={themeModeOptionStyle}
                role="radio"
                tabIndex={-1}
                type="button"
              >
                <SunIcon mix={themeModeIconStyle} />
                Light
              </button>
              <button
                aria-checked="false"
                data-active="false"
                data-radcn-theme-mode-option="dark"
                mix={themeModeOptionStyle}
                role="radio"
                tabIndex={-1}
                type="button"
              >
                <MoonIcon mix={themeModeIconStyle} />
                Dark
              </button>
            </div>
          </nav>
        </header>

        <div mix={layoutStyle}>
          <aside mix={sidebarStyle}>
            <div mix={sidebarStickyStyle}>
              <p mix={sidebarLabelStyle}>Components</p>
              <nav aria-label="Component navigation" mix={sidebarNavStyle}>
                {groups.map((group) => (
                  <div key={group.category} mix={sidebarGroupStyle}>
                    <p mix={sidebarGroupLabelStyle}>{group.category}</p>
                    {group.components.map((component) => (
                      <a
                        key={component.slug}
                        href={routes.component.href({ slug: component.slug })}
                        data-active={component.slug === activeSlug ? 'true' : undefined}
                        mix={sidebarLinkStyle}
                        rmx-document=""
                      >
                        <span>{component.title}</span>
                        <span mix={sidebarMetaStyle}>{component.status}</span>
                      </a>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </aside>
          <div mix={contentStyle}>{children}</div>
        </div>
      </main>
    )
  }
}

function Hero() {
  return () => (
    <section mix={heroStyle}>
      <div mix={heroCopyStyle}>
        <Badge variant="outline">Remix 3 component library</Badge>
        <h1 mix={heroTitleStyle}>RadCN brings shadcn-style components to Remix 3.</h1>
        <p mix={leadStyle}>
          A web-first component library for server-rendered interfaces, native controls, and
          explicit browser behavior.
        </p>
        <div mix={heroActionsStyle}>
          <Button href={routes.component.href({ slug: 'button' })} rmxDocument>
            Browse Button
          </Button>
          <Button href="#preview" variant="outline" rmxDocument>
            View preview
          </Button>
        </div>
      </div>
      <div mix={heroPreviewStyle} aria-label="RadCN component preview">
        <div mix={heroLogoDockStyle}>
          <RadcnLogo size="hero" />
          <span mix={stickerStyle}>RADICAL WEB UI</span>
        </div>
        <div mix={previewToolbarStyle}>
          <span />
          <span />
          <span />
        </div>
        <div mix={css({ display: 'grid', gap: '1rem' })}>
          <div mix={css({ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' })}>
            <Button>Deploy</Button>
            <Button variant="secondary">Preview</Button>
          </div>
          <div mix={tokenGridStyle}>
            <span>--radcn-radius</span>
            <strong>0.375rem</strong>
            <span>--radcn-control-height</span>
            <strong>2.25rem</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

function groupComponentDocs() {
  let groups: { category: string; components: ComponentDoc[] }[] = []

  for (let component of componentDocs) {
    let group = groups.find((item) => item.category === component.category)
    if (!group) {
      group = { category: component.category, components: [] }
      groups.push(group)
    }

    group.components.push(component)
  }

  return groups
}

function SectionHeading(
  handle: Handle<{ eyebrow: string; title: string; description?: string }>,
) {
  return () => {
    let { eyebrow, title, description } = handle.props

    return (
      <header mix={sectionHeadingStyle}>
        <span mix={eyebrowStyle}>{eyebrow}</span>
        <h2 mix={h2Style}>{title}</h2>
        {description ? <p mix={paragraphStyle}>{description}</p> : null}
      </header>
    )
  }
}

function ExamplePanel(handle: Handle<{ example: ComponentExample }>) {
  return () => {
    let { example } = handle.props

    return (
      <div mix={examplePanelStyle}>
        <div mix={exampleHeaderStyle}>
          <div>
            <h3 mix={h3Style}>{example.title}</h3>
            <p mix={smallTextStyle}>{example.description}</p>
          </div>
          <Badge variant="secondary">Preview</Badge>
        </div>
        <div mix={examplePreviewStyle}>{example.preview}</div>
        <CodeBlock code={example.source} />
      </div>
    )
  }
}

function InfoSection(handle: Handle<{ id: string; title: string; children: RemixNode }>) {
  return () => {
    let { id, title, children } = handle.props

    return (
      <section id={id} mix={sectionStyle}>
        <h2 mix={h2Style}>{title}</h2>
        {children}
      </section>
    )
  }
}

function ListSection(handle: Handle<{ id: string; title: string; items: string[] }>) {
  return () => {
    let { id, title, items } = handle.props

    return (
      <InfoSection id={id} title={title}>
        <ul mix={listStyle}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </InfoSection>
    )
  }
}

function CodeBlock(handle: Handle<{ code: string }>) {
  return () => {
    let { code } = handle.props

    return (
      <div data-radcn-code-block mix={codeBlockFrameStyle}>
        <div mix={codeBlockActionStyle}>
          <button
            aria-label="Copy code"
            data-radcn-code-copy-button
            mix={codeCopyButtonStyle}
            type="button"
          >
            <CopyIcon mix={codeCopyIconStyle} />
            <span data-radcn-code-copy-label>Copy code</span>
          </button>
        </div>
        <pre mix={codeBlockStyle}>
          <code>{code}</code>
        </pre>
      </div>
    )
  }
}

const shellStyle = css({
  minHeight: '100vh',
  backgroundColor: docsBrand.color.canvas,
  backgroundImage: docsGridBackground,
  backgroundSize: '32px 32px',
  color: docsBrand.color.ink,
  fontFamily: docsBrand.font.sans,
  fontSize: '15px',
  lineHeight: 1.55,
  '& *, & *::before, & *::after': { boxSizing: 'border-box' },
})

const topbarStyle = css({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  display: 'flex',
  minHeight: '4rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  borderBottom: `1px solid ${docsBrand.color.border}`,
  background: docsBrand.color.topbar,
  padding: '0 1.5rem',
  backdropFilter: 'blur(16px)',
})

const brandStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.625rem',
  color: docsBrand.color.ink,
  fontWeight: 700,
  textDecoration: 'none',
})

const topNavStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '0.25rem',
})

const topNavLinkStyle = css({
  borderRadius: docsBrand.radius.sm,
  color: docsBrand.color.inkSoft,
  padding: '0.5rem 0.75rem',
  textDecoration: 'none',
  '&:hover, &:focus-visible': {
    background: docsBrand.color.rail,
    color: docsBrand.color.ink,
    outline: 'none',
  },
})

const themeModeControlStyle = css({
  display: 'inline-flex',
  minHeight: '2.375rem',
  alignItems: 'center',
  gap: '0.125rem',
  border: `1px solid ${docsBrand.color.border}`,
  borderRadius: docsBrand.radius.sm,
  background: docsBrand.color.surface,
  padding: '0.1875rem',
})

const themeModeOptionStyle = css({
  appearance: 'none',
  border: 0,
  borderRadius: docsBrand.radius.xs,
  background: 'transparent',
  color: docsBrand.color.inkSoft,
  cursor: 'pointer',
  font: 'inherit',
  fontSize: '0.875rem',
  fontWeight: 700,
  lineHeight: 1,
  minHeight: '1.875rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.375rem',
  padding: '0.4375rem 0.625rem',
  '&:hover, &:focus-visible': {
    background: docsBrand.color.surfaceRaised,
    color: docsBrand.color.ink,
    outline: `2px solid ${docsBrand.color.accent}`,
    outlineOffset: '2px',
  },
  '&[aria-checked="true"]': {
    background: docsBrand.color.ink,
    color: docsBrand.color.canvas,
    boxShadow: `inset 0 0 0 1px ${docsBrand.color.borderStrong}`,
  },
  '@media (max-width: 520px)': {
    fontSize: '0.75rem',
    paddingInline: '0.4375rem',
  },
})

const themeModeIconStyle = css({
  width: '1rem',
  height: '1rem',
  '@media (max-width: 520px)': {
    width: '0.875rem',
    height: '0.875rem',
  },
})

const layoutStyle = css({
  display: 'grid',
  gridTemplateColumns: '17rem minmax(0, 1fr)',
  minHeight: 'calc(100vh - 4rem)',
  '@media (max-width: 860px)': {
    gridTemplateColumns: '1fr',
  },
})

const sidebarStyle = css({
  borderRight: `1px solid ${docsBrand.color.border}`,
  background: docsBrand.color.rail,
  '@media (max-width: 860px)': {
    borderRight: 0,
    borderBottom: `1px solid ${docsBrand.color.border}`,
  },
})

const sidebarStickyStyle = css({
  position: 'sticky',
  top: '4rem',
  display: 'grid',
  gap: '0.75rem',
  padding: '1.25rem',
  '@media (max-width: 860px)': {
    position: 'static',
  },
})

const sidebarLabelStyle = css({
  margin: 0,
  color: docsBrand.color.muted,
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
})

const sidebarNavStyle = css({
  display: 'grid',
  gap: '0.875rem',
})

const sidebarGroupStyle = css({
  display: 'grid',
  gap: '0.25rem',
})

const sidebarGroupLabelStyle = css({
  margin: '0 0 0.125rem',
  color: docsBrand.color.muted,
  fontSize: '0.6875rem',
  fontWeight: 800,
  textTransform: 'uppercase',
})

const sidebarLinkStyle = css({
  display: 'grid',
  gap: '0.125rem',
  borderRadius: docsBrand.radius.sm,
  color: docsBrand.color.inkSoft,
  padding: '0.625rem 0.75rem',
  textDecoration: 'none',
  '&[data-active="true"], &:hover, &:focus-visible': {
    background: docsBrand.color.surface,
    color: docsBrand.color.ink,
    outline: `1px solid ${docsBrand.color.border}`,
  },
  '&[data-active="true"]': {
    boxShadow: `inset 3px 0 0 ${docsBrand.color.accent}`,
  },
})

const sidebarMetaStyle = css({
  color: docsBrand.color.muted,
  fontSize: '0.75rem',
})

const contentStyle = css({
  minWidth: 0,
  padding: `2rem ${docsBrand.space.pageX} 4rem`,
})

const articleStyle = css({
  display: 'grid',
  maxWidth: '64rem',
  gap: '2rem',
})

const heroStyle = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.05fr) minmax(20rem, 0.95fr)',
  gap: '2rem',
  alignItems: 'center',
  minHeight: 'calc(100vh - 8rem)',
  maxWidth: '72rem',
  '@media (max-width: 980px)': {
    gridTemplateColumns: '1fr',
    minHeight: 'auto',
  },
})

const heroCopyStyle = css({
  display: 'grid',
  gap: '1.25rem',
  alignContent: 'center',
})

const heroTitleStyle = css({
  maxWidth: '13ch',
  margin: 0,
  color: docsBrand.color.ink,
  fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
  letterSpacing: 0,
  lineHeight: 0.95,
})

const heroActionsStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
})

const heroPreviewStyle = css({
  display: 'grid',
  gap: '1rem',
  border: `1px solid ${docsBrand.color.borderStrong}`,
  borderRadius: docsBrand.radius.md,
  background: docsBrand.color.surface,
  padding: '1rem',
  boxShadow: docsBrand.shadow.hard,
})

const heroLogoDockStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  border: `1px solid ${docsBrand.color.border}`,
  borderRadius: docsBrand.radius.sm,
  background:
    `linear-gradient(135deg, ${docsBrand.color.surfaceRaised}, ${docsBrand.color.surface})`,
  padding: '1rem',
  '@media (max-width: 520px)': {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
})

const stickerStyle = css({
  display: 'inline-flex',
  width: 'max-content',
  maxWidth: '100%',
  transform: 'rotate(-2deg)',
  border: `2px solid ${docsBrand.color.ink}`,
  borderRadius: docsBrand.radius.xs,
  background: docsBrand.color.lime,
  color: docsBrand.color.ink,
  padding: '0.25rem 0.5rem',
  fontFamily: docsBrand.font.mono,
  fontSize: '0.75rem',
  fontWeight: 800,
  letterSpacing: 0,
  boxShadow: `3px 3px 0 ${docsBrand.color.ink}`,
})

const previewToolbarStyle = css({
  display: 'flex',
  gap: '0.375rem',
  '& span': {
    width: '0.625rem',
    height: '0.625rem',
    borderRadius: '999px',
    background: docsBrand.color.accent,
  },
  '& span:nth-child(2)': { background: docsBrand.color.yellow },
  '& span:nth-child(3)': { background: docsBrand.color.cyan },
})

const tokenGridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: '0.75rem',
  border: `1px solid ${docsBrand.color.border}`,
  borderRadius: docsBrand.radius.sm,
  background: docsBrand.color.surfaceRaised,
  padding: '1rem',
  color: docsBrand.color.inkSoft,
  fontFamily: docsBrand.font.mono,
  fontSize: '0.8125rem',
  '& strong': {
    color: docsBrand.color.ink,
  },
})

const pageHeaderStyle = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(18rem, 24rem)',
  gap: '2rem',
  alignItems: 'end',
  borderBottom: `1px solid ${docsBrand.color.border}`,
  paddingBottom: '2rem',
  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})

const quickInstallStyle = css({
  display: 'grid',
  gap: '0.5rem',
  border: `1px solid ${docsBrand.color.border}`,
  borderRadius: docsBrand.radius.md,
  background: docsBrand.color.surface,
  padding: '1rem',
})

const sectionStyle = css({
  display: 'grid',
  gap: '1rem',
  maxWidth: '64rem',
  scrollMarginTop: '5rem',
})

const sectionHeadingStyle = css({
  display: 'grid',
  gap: '0.5rem',
  maxWidth: '42rem',
})

const eyebrowStyle = css({
  color: docsBrand.color.accentDeep,
  fontSize: '0.75rem',
  fontWeight: 800,
  textTransform: 'uppercase',
})

const h1Style = css({
  margin: 0,
  color: docsBrand.color.ink,
  fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
  letterSpacing: 0,
  lineHeight: 1,
})

const h2Style = css({
  margin: 0,
  color: docsBrand.color.ink,
  fontSize: '1.5rem',
  letterSpacing: 0,
  lineHeight: 1.15,
})

const h3Style = css({
  margin: 0,
  color: docsBrand.color.ink,
  fontSize: '1rem',
  letterSpacing: 0,
  lineHeight: 1.25,
})

const leadStyle = css({
  maxWidth: '42rem',
  margin: 0,
  color: docsBrand.color.inkSoft,
  fontSize: '1.125rem',
})

const paragraphStyle = css({
  margin: 0,
  color: docsBrand.color.inkSoft,
})

const smallTextStyle = css({
  margin: '0.25rem 0 0',
  color: docsBrand.color.muted,
  fontSize: '0.875rem',
})

const inlineCodeStyle = css({
  overflowWrap: 'anywhere',
  color: docsBrand.color.ink,
  fontFamily: docsBrand.font.mono,
  fontSize: '0.875rem',
})

const examplePanelStyle = css({
  display: 'grid',
  overflow: 'hidden',
  border: `1px solid ${docsBrand.color.border}`,
  borderRadius: docsBrand.radius.md,
  background: docsBrand.color.surface,
})

const exampleHeaderStyle = css({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  gap: '1rem',
  borderBottom: `1px solid ${docsBrand.color.border}`,
  padding: '1rem',
})

const examplePreviewStyle = css({
  minHeight: '12rem',
  display: 'grid',
  placeItems: 'center',
  padding: '2rem',
  background: docsBrand.color.surface,
})

const codeBlockFrameStyle = css({
  position: 'relative',
  borderTop: `1px solid ${docsBrand.color.border}`,
  background: docsBrand.color.code,
})

const codeBlockActionStyle = css({
  position: 'absolute',
  top: '0.625rem',
  right: '0.625rem',
  zIndex: 1,
})

const codeCopyButtonStyle = css({
  appearance: 'none',
  display: 'inline-flex',
  minHeight: '2rem',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.375rem',
  border: `1px solid ${docsBrand.color.border}`,
  borderRadius: docsBrand.radius.sm,
  background: docsBrand.color.surface,
  color: docsBrand.color.inkSoft,
  cursor: 'pointer',
  font: 'inherit',
  fontSize: '0.75rem',
  fontWeight: 800,
  lineHeight: 1,
  padding: '0.375rem 0.5rem',
  '&:hover, &:focus-visible': {
    background: docsBrand.color.surfaceRaised,
    color: docsBrand.color.ink,
    outline: `2px solid ${docsBrand.color.accent}`,
    outlineOffset: '2px',
  },
  '&[data-copy-state="copied"], &[data-copy-state="failed"]': {
    background: docsBrand.color.surfaceRaised,
    color: docsBrand.color.accentDeep,
  },
})

const codeCopyIconStyle = css({
  width: '1rem',
  height: '1rem',
})

const codeBlockStyle = css({
  margin: 0,
  overflow: 'auto',
  background: docsBrand.color.code,
  color: docsBrand.color.codeText,
  padding: '3.25rem 1rem 1rem',
  fontFamily: docsBrand.font.mono,
  fontSize: '0.8125rem',
  lineHeight: 1.6,
})

const listStyle = css({
  display: 'grid',
  gap: '0.75rem',
  margin: 0,
  paddingLeft: '1.25rem',
  color: docsBrand.color.inkSoft,
})
