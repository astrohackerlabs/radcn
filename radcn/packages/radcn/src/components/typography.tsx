import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Typography surfaces as Tailwind utilities (Issue 6, Experiment 42). Eleven
// self-contained text styles; the shared `font-family: var(--radcn-font)` is
// baked into each via [font-family:var(--radcn-font)] (except inline-code, which
// is monospace; list-item is style-less). Margins use LONGHAND (mt-/mb-/mx-/my-)
// to avoid the Exp-41 shorthand-vs-longhand conflict. The h1 size + muted color
// read --radcn-typography-* tokens (the custom-typography fixture).
// h1 font-size reads a token via an arbitrary-property font-size utility (the
// same form used for font-family below). A bare text- arbitrary value with a
// var is ambiguous (Tailwind defaults it to color and drops the font-size); the
// arbitrary-property form is unambiguous. NOTE: @source scans this file, so any
// bracketed class-like token written in a comment becomes a real (often junk)
// generated utility — keep comments free of such tokens.
const typographyH1Class =
  'mt-0 mx-0 mb-4 [font-size:var(--radcn-typography-h1-size,2rem)] font-bold leading-[1.1] [font-family:var(--radcn-font)]'
const typographyH2Class =
  'mt-8 mx-0 mb-4 border-b border-border pb-2 text-2xl font-semibold leading-[1.2] [font-family:var(--radcn-font)]'
const typographyH3Class = 'mt-6 mx-0 mb-3 text-xl font-semibold [font-family:var(--radcn-font)]'
const typographyH4Class = 'mt-4 mx-0 mb-2 text-base font-semibold [font-family:var(--radcn-font)]'
const typographyPClass = 'mt-0 mx-0 mb-4 text-foreground text-base leading-[1.75] [font-family:var(--radcn-font)]'
const typographyListClass = 'mt-0 mx-0 mb-4 text-foreground text-base leading-[1.75] pl-6 [font-family:var(--radcn-font)]'
const typographyBlockquoteClass =
  'my-4 mx-0 border-l-2 border-border pl-4 text-muted-foreground italic [font-family:var(--radcn-font)]'
const typographyInlineCodeClass =
  'rounded-[calc(var(--radcn-radius)-0.125rem)] bg-secondary px-1 py-0.5 font-mono text-[0.875em] font-semibold leading-[1.4]'
const typographyLeadClass = 'text-muted-foreground text-xl leading-[1.6] [font-family:var(--radcn-font)]'
const typographyLargeClass = 'text-lg font-semibold [font-family:var(--radcn-font)]'
const typographySmallClass = 'text-sm font-medium [font-family:var(--radcn-font)]'
const typographyMutedClass =
  'text-[var(--radcn-typography-muted,var(--radcn-muted-foreground))] text-sm [font-family:var(--radcn-font)]'

export interface TypographyProps {
  children?: RemixNode
  class?: string
  style?: string
}

export function TypographyH1(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <h1 class={classes(typographyH1Class, className)} data-radcn-typography-h1 style={style}>{children}</h1>
  }
}

export function TypographyH2(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <h2 class={classes(typographyH2Class, className)} data-radcn-typography-h2 style={style}>{children}</h2>
  }
}

export function TypographyH3(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <h3 class={classes(typographyH3Class, className)} data-radcn-typography-h3 style={style}>{children}</h3>
  }
}

export function TypographyH4(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <h4 class={classes(typographyH4Class, className)} data-radcn-typography-h4 style={style}>{children}</h4>
  }
}

export function TypographyP(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <p class={classes(typographyPClass, className)} data-radcn-typography-p style={style}>{children}</p>
  }
}

export function TypographyBlockquote(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <blockquote class={classes(typographyBlockquoteClass, className)} data-radcn-typography-blockquote style={style}>{children}</blockquote>
  }
}

export function TypographyList(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <ul class={classes(typographyListClass, className)} data-radcn-typography-list style={style}>{children}</ul>
  }
}

export function TypographyListItem(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <li class={classes(className)} data-radcn-typography-list-item style={style}>{children}</li>
  }
}

export function TypographyInlineCode(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <code class={classes(typographyInlineCodeClass, className)} data-radcn-typography-inline-code style={style}>{children}</code>
  }
}

export function TypographyLead(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <p class={classes(typographyLeadClass, className)} data-radcn-typography-lead style={style}>{children}</p>
  }
}

export function TypographyLarge(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(typographyLargeClass, className)} data-radcn-typography-large style={style}>{children}</div>
  }
}

export function TypographySmall(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <small class={classes(typographySmallClass, className)} data-radcn-typography-small style={style}>{children}</small>
  }
}

export function TypographyMuted(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <p class={classes(typographyMutedClass, className)} data-radcn-typography-muted style={style}>{children}</p>
  }
}
