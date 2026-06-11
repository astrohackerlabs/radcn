import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Accordion surfaces as Tailwind utilities (Issue 6, Experiment 35). Native
// <details>/<summary> disclosure. Token-referencing utilities keep the
// custom-accordion fixture working; the summary marker is hidden via Tailwind
// pseudo-element variants. The parent-state→child effects (item [open] → icon
// rotate; item disabled → trigger) stay bespoke rules in tokens.css keyed on the
// data attributes. The style-less marker classes (--single/--multiple/
// item--disabled/trigger--disabled) are dropped.
const accordionRootClass = 'w-[min(100%,36rem)] border-t border-[var(--radcn-accordion-border,var(--radcn-border))]'
const accordionItemClass = 'border-b border-[var(--radcn-accordion-border,var(--radcn-border))] data-[disabled=true]:opacity-50'
const accordionTriggerClass =
  "flex w-full items-start justify-between gap-4 py-4 text-[var(--radcn-accordion-trigger-fg,var(--radcn-foreground))] cursor-pointer text-sm font-medium leading-[1.3] list-none outline-none text-left hover:underline hover:underline-offset-4 focus-visible:rounded-md focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] marker:content-[''] [&::-webkit-details-marker]:hidden"
const accordionIconClass = 'shrink-0 text-[var(--radcn-muted-foreground)] text-xs font-semibold leading-none transition-transform'
const accordionContentClass =
  'overflow-hidden text-[var(--radcn-accordion-content-fg,var(--radcn-muted-foreground))] text-sm leading-normal'
const accordionContentInnerClass = 'pb-4'

export type AccordionType = 'single' | 'multiple'

export interface AccordionProps {
  children?: RemixNode
  class?: string
  collapsible?: boolean
  defaultValue?: string | string[]
  name?: string
  style?: string
  type?: AccordionType
}

export interface AccordionItemProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  name?: string
  open?: boolean
  style?: string
  value: string
}

export interface AccordionTriggerProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
}

export interface AccordionContentProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
}

export function Accordion(handle: Handle<AccordionProps>) {
  return () => {
    let {
      children,
      class: className,
      collapsible,
      defaultValue,
      name,
      style,
      type = 'single',
    } = handle.props
    let values = Array.isArray(defaultValue) ? defaultValue : defaultValue === undefined ? [] : [defaultValue]
    let groupName = type === 'single' ? name ?? 'radcn-accordion' : undefined

    return (
      <div
        class={classes(accordionRootClass, className)}
        data-collapsible={collapsible ? 'true' : undefined}
        data-default-value={values.join(' ')}
        data-radcn-accordion
        data-type={type}
        style={style}
        {...{ 'data-accordion-name': groupName }}
      >
        {children}
      </div>
    )
  }
}

export function AccordionItem(handle: Handle<AccordionItemProps>) {
  return () => {
    let { children, class: className, disabled, name, open, style, value } = handle.props
    let state = open ? 'open' : 'closed'

    if (disabled) {
      return (
        <div
          class={classes(accordionItemClass, className)}
          data-disabled="true"
          data-radcn-accordion-item
          data-state={state}
          data-value={value}
          style={style}
        >
          {children}
        </div>
      )
    }

    return (
      <details
        class={classes(accordionItemClass, className)}
        data-radcn-accordion-item
        data-state={state}
        data-value={value}
        name={name}
        open={open}
        style={style}
      >
        {children}
      </details>
    )
  }
}

export function AccordionTrigger(handle: Handle<AccordionTriggerProps>) {
  return () => {
    let { children, class: className, disabled, style } = handle.props
    let content = (
      <>
        <span data-radcn-accordion-trigger-text>
          {children}
        </span>
        <span aria-hidden="true" class={accordionIconClass} data-radcn-accordion-icon>
          v
        </span>
      </>
    )

    if (disabled) {
      return (
        <div
          aria-disabled="true"
          class={classes(accordionTriggerClass, className)}
          data-disabled="true"
          data-radcn-accordion-trigger
          role="button"
          style={style}
        >
          {content}
        </div>
      )
    }

    return (
      <summary class={classes(accordionTriggerClass, className)} data-radcn-accordion-trigger style={style}>
        {content}
      </summary>
    )
  }
}

export function AccordionContent(handle: Handle<AccordionContentProps>) {
  return () => {
    let { children, class: className, disabled, style } = handle.props

    return (
      <div
        hidden={disabled ? true : undefined}
        class={classes(accordionContentClass, className)}
        data-radcn-accordion-content
        style={style}
      >
        <div class={accordionContentInnerClass} data-radcn-accordion-content-inner>
          {children}
        </div>
      </div>
    )
  }
}
