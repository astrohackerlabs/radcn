import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Overlay trigger/close cluster as Tailwind utilities (Issue 6, Experiment 72). Shared
// structure via overlayTriggerBase (border-color a var the visible-border variants set);
// markers kept (button-group cascades + the drawer-content>close cascade + data hooks).
// ASCII comments; no bracketed class-like tokens.
const overlayTriggerBase =
  'inline-flex min-h-[var(--radcn-control-height)] items-center justify-center border border-[var(--radcn-ovl-bc,transparent)] rounded-md cursor-pointer py-2 px-4 font-medium text-[0.875rem] leading-none [font-family:var(--radcn-font)] outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]'
const dropdownTriggerClass =
  `${overlayTriggerBase} bg-[var(--radcn-menu-trigger-bg,var(--radcn-primary))] text-[var(--radcn-menu-trigger-fg,var(--radcn-primary-foreground))]`

import { setupMenuOverlay } from '../utils/menu-overlay.ts'

// DropdownMenu + ContextMenu shared surfaces as Tailwind utilities (Issue 6,
// Experiment 51). The two components shared these rules, so the consts are
// exported here and reused by context-menu.tsx. KEPT bespoke (not these consts):
// the triggers (coupled to the .radcn-button-group cascade) and the family-wide
// radcn-menu-* helper classes + [data-radcn-menu-item][data-disabled] (Menubar
// also emits them) — components keep emitting those classes/attributes. Comments
// here are ASCII; no bracketed class-like tokens.
export const menuRootClass = 'contents [font-family:var(--radcn-font)]'
export const menuPortalClass = 'z-[var(--radcn-menu-z,50)]'
export const menuContentClass =
  'z-[var(--radcn-menu-z,50)] grid min-w-[var(--radcn-menu-width,14rem)] max-h-[min(var(--radcn-menu-max-height,24rem),var(--radcn-menu-available-height,calc(100vh-1rem)))] overflow-auto gap-0.5 border border-[var(--radcn-menu-border,var(--radcn-border))] rounded-md bg-[var(--radcn-menu-bg,var(--radcn-background))] text-[var(--radcn-menu-fg,var(--radcn-foreground))] p-1.5 shadow-[0_18px_48px_rgb(0_0_0_/_0.16)] [transform-origin:var(--radcn-menu-transform-origin,top_left)] animate-[radcn-positioned-overlay-in_120ms_ease-out] [&[hidden]]:hidden'
export const menuGroupClass = 'grid gap-0.5'
export const menuLabelClass =
  'px-2 py-1.5 text-muted-foreground text-[0.75rem] font-semibold leading-[1.2] [font-family:var(--radcn-font)]'
export const menuItemClass =
  'grid min-h-8 grid-cols-[1rem_minmax(0,1fr)_auto] items-center gap-2 border-0 rounded-[calc(var(--radcn-radius)-0.125rem)] bg-transparent text-inherit cursor-default px-2 py-1.5 text-left text-[0.875rem] font-normal leading-[1.25] [font-family:var(--radcn-font)] outline-none data-[highlighted=true]:bg-[var(--radcn-menu-highlight-bg,var(--radcn-secondary))] data-[highlighted=true]:text-[var(--radcn-menu-highlight-fg,var(--radcn-foreground))]'
export const menuShortcutClass =
  'ml-auto text-muted-foreground text-[0.75rem] font-medium leading-none [font-family:var(--radcn-font)]'
export const menuSeparatorClass = 'h-px my-1 -mx-1.5 bg-[var(--radcn-menu-separator-bg,var(--radcn-border))]'
export const menuSubClass = 'contents'
export const menuSubCaretClass =
  'radcn-menu-sub-caret ml-auto text-muted-foreground font-medium text-[0.75rem] leading-none [font-family:var(--radcn-font)]'
export const menuItemIndicatorClass =
  'radcn-menu-item-indicator inline-flex w-4 justify-center text-[var(--radcn-menu-indicator-fg,var(--radcn-primary))]'

export type DropdownMenuAlign = 'start' | 'center' | 'end'
export type DropdownMenuSide = 'top' | 'right' | 'bottom' | 'left'
export type DropdownMenuItemVariant = 'default' | 'destructive'

export interface DropdownMenuProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  id?: string
  style?: string
}

export interface DropdownMenuPartProps {
  children?: RemixNode
  class?: string
  inset?: boolean
  style?: string
}

export interface DropdownMenuTriggerProps extends DropdownMenuPartProps {
  ariaLabel?: string
}

export interface DropdownMenuContentProps extends DropdownMenuPartProps {
  align?: DropdownMenuAlign
  side?: DropdownMenuSide
  sideOffset?: number
}

export interface DropdownMenuItemProps extends DropdownMenuPartProps {
  disabled?: boolean
  textValue?: string
  variant?: DropdownMenuItemVariant
}

export interface DropdownMenuCheckboxItemProps extends DropdownMenuItemProps {
  checked?: boolean
}

export interface DropdownMenuRadioGroupProps extends DropdownMenuPartProps {
  value?: string
}

export interface DropdownMenuRadioItemProps extends DropdownMenuItemProps {
  value: string
}

export function enhanceDropdownMenu(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-dropdown-menu]').forEach((menu) => {
    setupMenuOverlay(menu, {
      align: 'start',
      contentSelector: '[data-radcn-dropdown-menu-content]',
      itemSelector: '[data-radcn-menu-item]',
      kind: 'dropdown',
      portalSelector: '[data-radcn-dropdown-menu-portal]',
      readyDataKey: 'radcnDropdownMenuReady',
      rootSelector: '[data-radcn-dropdown-menu]',
      side: 'bottom',
      sideOffset: 4,
      subContentSelector: '[data-radcn-dropdown-menu-sub-content]',
      subTriggerSelector: '[data-radcn-dropdown-menu-sub-trigger]',
      triggerSelector: '[data-radcn-dropdown-menu-trigger]',
    })
  })
}

export function DropdownMenu(handle: Handle<DropdownMenuProps>) {
  return () => {
    let { children, class: className, defaultOpen, id, style } = handle.props

    return (
      <div class={classes(menuRootClass, className)} data-default-open={defaultOpen ? 'true' : undefined} data-radcn-dropdown-menu data-state={defaultOpen ? 'open' : 'closed'} id={id} style={style}>
        {children}
      </div>
    )
  }
}

export function DropdownMenuTrigger(handle: Handle<DropdownMenuTriggerProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return <button aria-label={ariaLabel} class={classes('radcn-dropdown-menu-trigger', dropdownTriggerClass, className)} data-radcn-dropdown-menu-trigger data-state="closed" type="button" style={style}>{children}</button>
  }
}

export function DropdownMenuPortal(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(menuPortalClass, className)} data-radcn-dropdown-menu-portal data-state="closed" hidden style={style}>{children}</div>
  }
}

export function DropdownMenuContent(handle: Handle<DropdownMenuContentProps>) {
  return () => {
    let { align = 'start', children, class: className, side = 'bottom', sideOffset = 4, style } = handle.props

    return (
      <div class={classes(menuContentClass, className)} data-align={align} data-radcn-dropdown-menu-content data-side={side} data-side-offset={String(sideOffset)} data-state="closed" hidden style={style}>
        {children}
      </div>
    )
  }
}

export function DropdownMenuGroup(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(menuGroupClass, className)} data-radcn-dropdown-menu-group data-radcn-menu-group role="group" style={style}>{children}</div>
  }
}

export function DropdownMenuLabel(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, inset, style } = handle.props

    return <div class={classes(menuLabelClass, inset && 'radcn-menu-label--inset', className)} data-inset={inset ? 'true' : undefined} data-radcn-dropdown-menu-label data-radcn-menu-label style={style}>{children}</div>
  }
}

export function DropdownMenuItem(handle: Handle<DropdownMenuItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue, variant = 'default' } = handle.props

    return <button aria-disabled={disabled ? 'true' : undefined} class={classes(menuItemClass, `radcn-menu-item--${variant}`, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-dropdown-menu-item data-radcn-menu-item data-text={textValue} data-variant={variant} role="menuitem" style={style} tabIndex={-1} type="button">{children}</button>
  }
}

export function DropdownMenuCheckboxItem(handle: Handle<DropdownMenuCheckboxItemProps>) {
  return () => {
    let { checked, children, class: className, disabled, inset, style, textValue } = handle.props

    return (
      <button aria-checked={checked ? 'true' : 'false'} aria-disabled={disabled ? 'true' : undefined} class={classes(menuItemClass, inset && 'radcn-menu-item--inset', className)} data-checked={checked ? 'true' : 'false'} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-dropdown-menu-checkbox-item data-radcn-menu-checkbox-item="true" data-radcn-menu-item data-state={checked ? 'checked' : 'unchecked'} data-text={textValue} role="menuitemcheckbox" style={style} tabIndex={-1} type="button">
        <span class={menuItemIndicatorClass} data-radcn-menu-item-indicator hidden={!checked}>✓</span>
        {children}
      </button>
    )
  }
}

export function DropdownMenuRadioGroup(handle: Handle<DropdownMenuRadioGroupProps>) {
  return () => {
    let { children, class: className, style, value } = handle.props

    return <div class={classes(menuGroupClass, className)} data-radcn-dropdown-menu-radio-group data-radcn-menu-radio-group data-value={value} role="group" style={style}>{children}</div>
  }
}

export function DropdownMenuRadioItem(handle: Handle<DropdownMenuRadioItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue, value } = handle.props

    return (
      <button aria-checked="false" aria-disabled={disabled ? 'true' : undefined} class={classes(menuItemClass, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-dropdown-menu-radio-item data-radcn-menu-item data-radcn-menu-radio-item="true" data-state="unchecked" data-text={textValue} data-value={value} role="menuitemradio" style={style} tabIndex={-1} type="button">
        <span class={menuItemIndicatorClass} data-radcn-menu-item-indicator hidden>●</span>
        {children}
      </button>
    )
  }
}

export function DropdownMenuSeparator(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { class: className, style } = handle.props

    return <div class={classes(menuSeparatorClass, className)} data-radcn-dropdown-menu-separator data-radcn-menu-separator role="separator" style={style} />
  }
}

export function DropdownMenuShortcut(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <span class={classes(menuShortcutClass, className)} data-radcn-dropdown-menu-shortcut data-radcn-menu-shortcut style={style}>{children}</span>
  }
}

export function DropdownMenuSub(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(menuSubClass, className)} data-radcn-dropdown-menu-sub data-radcn-menu-sub style={style}>{children}</div>
  }
}

export function DropdownMenuSubTrigger(handle: Handle<DropdownMenuItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue } = handle.props
    let id = `radcn-dropdown-sub-${Math.random().toString(36).slice(2)}`

    return <button aria-controls={id} aria-disabled={disabled ? 'true' : undefined} aria-expanded="false" aria-haspopup="menu" class={classes(menuItemClass, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-dropdown-menu-sub-trigger data-radcn-menu-item data-radcn-menu-sub-trigger="true" data-state="closed" data-text={textValue} role="menuitem" style={style} tabIndex={-1} type="button">{children}<span class={menuSubCaretClass} aria-hidden="true">›</span></button>
  }
}

export function DropdownMenuSubContent(handle: Handle<DropdownMenuContentProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(menuContentClass, className)} data-radcn-dropdown-menu-sub-content data-radcn-menu-sub-content data-state="closed" hidden role="menu" style={style}>{children}</div>
  }
}
