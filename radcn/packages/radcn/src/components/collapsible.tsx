import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Collapsible surfaces as Tailwind utilities (Issue 6, Experiment 36) — the
// single-disclosure sibling of Accordion (same native <details>/<summary>
// pattern). Token-referencing utilities keep the custom-collapsible fixture
// working; the summary marker hides via pseudo-element variants. The parent-
// state→child effects (root [open] → icon rotate; root disabled → trigger) stay
// bespoke rules in tokens.css keyed on the data attributes.
const collapsibleRootClass =
  'block w-[min(100%,28rem)] border border-[var(--radcn-collapsible-border,var(--radcn-border))] rounded-md bg-[var(--radcn-collapsible-bg,var(--radcn-background))] text-[var(--radcn-collapsible-fg,var(--radcn-foreground))] data-[disabled=true]:opacity-50'
const collapsibleTriggerClass =
  "flex w-full items-center justify-between gap-4 px-4 py-3.5 cursor-pointer text-sm font-medium leading-[1.3] list-none outline-none text-left hover:underline hover:underline-offset-4 focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] marker:content-[''] [&::-webkit-details-marker]:hidden"
const collapsibleIconClass = 'shrink-0 text-[var(--radcn-muted-foreground)] text-xs font-semibold leading-none transition-transform'
const collapsibleContentClass =
  'overflow-hidden border-t border-[var(--radcn-collapsible-border,var(--radcn-border))] text-[var(--radcn-collapsible-content-fg,var(--radcn-muted-foreground))] text-sm leading-normal'
const collapsibleContentInnerClass = 'p-4'

export interface CollapsibleProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  open?: boolean
  style?: string
}

export interface CollapsibleTriggerProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
}

export interface CollapsibleContentProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
}

export function Collapsible(handle: Handle<CollapsibleProps>) {
  return () => {
    let { children, class: className, disabled, open, style } = handle.props
    let state = open ? 'open' : 'closed'

    if (disabled) {
      return (
        <div
          class={classes(collapsibleRootClass, className)}
          data-disabled="true"
          data-radcn-collapsible
          data-state={state}
          style={style}
        >
          {children}
        </div>
      )
    }

    return (
      <details
        class={classes(collapsibleRootClass, className)}
        data-radcn-collapsible
        data-state={state}
        open={open}
        style={style}
      >
        {children}
      </details>
    )
  }
}

export function CollapsibleTrigger(handle: Handle<CollapsibleTriggerProps>) {
  return () => {
    let { children, class: className, disabled, style } = handle.props
    let content = (
      <>
        <span data-radcn-collapsible-trigger-text>
          {children}
        </span>
        <span aria-hidden="true" class={collapsibleIconClass} data-radcn-collapsible-icon>
          v
        </span>
      </>
    )

    if (disabled) {
      return (
        <div
          aria-disabled="true"
          class={classes(collapsibleTriggerClass, className)}
          data-disabled="true"
          data-radcn-collapsible-trigger
          role="button"
          style={style}
        >
          {content}
        </div>
      )
    }

    return (
      <summary class={classes(collapsibleTriggerClass, className)} data-radcn-collapsible-trigger style={style}>
        {content}
      </summary>
    )
  }
}

export function CollapsibleContent(handle: Handle<CollapsibleContentProps>) {
  return () => {
    let { children, class: className, disabled, style } = handle.props

    return (
      <div
        hidden={disabled ? true : undefined}
        class={classes(collapsibleContentClass, className)}
        data-radcn-collapsible-content
        style={style}
      >
        <div class={collapsibleContentInnerClass} data-radcn-collapsible-content-inner>
          {children}
        </div>
      </div>
    )
  }
}
