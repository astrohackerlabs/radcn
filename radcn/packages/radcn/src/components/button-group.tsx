import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// ButtonGroup own surfaces as Tailwind utilities (Issue 6, Experiments 63 and 74).
// The `radcn-button-group` + `--{orientation}` marker classes are kept. Select,
// DropdownMenu, and Popover trigger coupling now emits as scoped descendant utilities;
// Button/Input/InputGroup residual coupling stays in tokens.css for a later cluster.
// Comments here are ASCII; no bracketed class-like tokens.
const buttonGroupOverlayTriggerCouplingClass =
  '[&>.radcn-select]:min-w-0 [&>.radcn-dropdown-menu]:min-w-0 [&>.radcn-popover]:min-w-0 [&>.radcn-select>.radcn-select-trigger]:h-full [&>.radcn-dropdown-menu>.radcn-dropdown-menu-trigger]:h-full [&>.radcn-popover>.radcn-popover-trigger]:h-full data-[orientation=horizontal]:[&>.radcn-select:not(:first-child)>.radcn-select-trigger]:rounded-l-none data-[orientation=horizontal]:[&>.radcn-dropdown-menu:not(:first-child)>.radcn-dropdown-menu-trigger]:rounded-l-none data-[orientation=horizontal]:[&>.radcn-popover:not(:first-child)>.radcn-popover-trigger]:rounded-l-none data-[orientation=horizontal]:[&>.radcn-select:not(:first-child)>.radcn-select-trigger]:-ml-px data-[orientation=horizontal]:[&>.radcn-dropdown-menu:not(:first-child)>.radcn-dropdown-menu-trigger]:-ml-px data-[orientation=horizontal]:[&>.radcn-popover:not(:first-child)>.radcn-popover-trigger]:-ml-px data-[orientation=horizontal]:[&>.radcn-select:not(:last-child)>.radcn-select-trigger]:rounded-r-none data-[orientation=horizontal]:[&>.radcn-dropdown-menu:not(:last-child)>.radcn-dropdown-menu-trigger]:rounded-r-none data-[orientation=horizontal]:[&>.radcn-popover:not(:last-child)>.radcn-popover-trigger]:rounded-r-none data-[orientation=vertical]:[&>.radcn-select:not(:first-child)>.radcn-select-trigger]:rounded-t-none data-[orientation=vertical]:[&>.radcn-dropdown-menu:not(:first-child)>.radcn-dropdown-menu-trigger]:rounded-t-none data-[orientation=vertical]:[&>.radcn-popover:not(:first-child)>.radcn-popover-trigger]:rounded-t-none data-[orientation=vertical]:[&>.radcn-select:not(:first-child)>.radcn-select-trigger]:-mt-px data-[orientation=vertical]:[&>.radcn-dropdown-menu:not(:first-child)>.radcn-dropdown-menu-trigger]:-mt-px data-[orientation=vertical]:[&>.radcn-popover:not(:first-child)>.radcn-popover-trigger]:-mt-px data-[orientation=vertical]:[&>.radcn-select:not(:first-child)>.radcn-select-trigger]:ml-0 data-[orientation=vertical]:[&>.radcn-dropdown-menu:not(:first-child)>.radcn-dropdown-menu-trigger]:ml-0 data-[orientation=vertical]:[&>.radcn-popover:not(:first-child)>.radcn-popover-trigger]:ml-0 data-[orientation=vertical]:[&>.radcn-select:not(:last-child)>.radcn-select-trigger]:rounded-b-none data-[orientation=vertical]:[&>.radcn-dropdown-menu:not(:last-child)>.radcn-dropdown-menu-trigger]:rounded-b-none data-[orientation=vertical]:[&>.radcn-popover:not(:last-child)>.radcn-popover-trigger]:rounded-b-none'
const buttonGroupBaseClass = `flex w-fit items-stretch gap-0 ${buttonGroupOverlayTriggerCouplingClass}`
const buttonGroupTextClass =
  'inline-flex items-center justify-center border border-[var(--radcn-border)] bg-muted px-3 text-muted-foreground text-[0.8125rem] font-medium leading-none [font-family:var(--radcn-font)]'
const buttonGroupSeparatorClass = 'self-stretch bg-[var(--radcn-border)]'

export type ButtonGroupOrientation = 'horizontal' | 'vertical'

export interface ButtonGroupProps {
  ariaLabel?: string
  ariaLabelledby?: string
  children?: RemixNode
  class?: string
  orientation?: ButtonGroupOrientation
  style?: string
}

export interface ButtonGroupPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface ButtonGroupSeparatorProps {
  class?: string
  orientation?: ButtonGroupOrientation
  style?: string
}

export function ButtonGroup(handle: Handle<ButtonGroupProps>) {
  return () => {
    let { ariaLabel, ariaLabelledby, children, class: className, orientation = 'horizontal', style } = handle.props

    return (
      <div
        aria-label={ariaLabelledby ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledby}
        class={classes('radcn-button-group', buttonGroupBaseClass, `radcn-button-group--${orientation}`, className)}
        data-orientation={orientation}
        data-radcn-button-group
        role="group"
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function ButtonGroupText(handle: Handle<ButtonGroupPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-button-group-text', buttonGroupTextClass, className)} data-radcn-button-group-text style={style}>
        {children}
      </div>
    )
  }
}

export function ButtonGroupSeparator(handle: Handle<ButtonGroupSeparatorProps>) {
  return () => {
    let { class: className, orientation = 'vertical', style } = handle.props

    return (
      <div
        class={classes('radcn-button-group-separator', buttonGroupSeparatorClass, `radcn-button-group-separator--${orientation}`, className)}
        data-orientation={orientation}
        data-radcn-button-group-separator
        role="separator"
        aria-orientation={orientation}
        style={style}
      />
    )
  }
}
