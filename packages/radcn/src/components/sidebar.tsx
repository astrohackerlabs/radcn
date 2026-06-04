import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type SidebarSide = 'left' | 'right'
export type SidebarVariant = 'sidebar' | 'floating' | 'inset'
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none'
export type SidebarState = 'expanded' | 'collapsed'

export interface SidebarProviderProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  id?: string
  shortcut?: string
  style?: string
}

export interface SidebarProps {
  children?: RemixNode
  class?: string
  collapsible?: SidebarCollapsible
  side?: SidebarSide
  style?: string
  variant?: SidebarVariant
}

export interface SidebarPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface SidebarButtonProps extends SidebarPartProps {
  ariaLabel?: string
  disabled?: boolean
  href?: string
  isActive?: boolean
  size?: 'sm' | 'default' | 'lg'
  tooltip?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'outline'
}

export interface SidebarInputProps {
  ariaLabel?: string
  class?: string
  disabled?: boolean
  id?: string
  name?: string
  placeholder?: string
  style?: string
  value?: string
}

function setupSidebarProvider(provider: HTMLElement) {
  if (provider.dataset.radcnSidebarReady === 'true') return
  let shortcut = (provider.dataset.shortcut || 'b').toLowerCase()

  function setState(state: SidebarState, emit = false) {
    provider.dataset.state = state
    provider.querySelectorAll<HTMLElement>('[data-radcn-sidebar]').forEach((sidebar) => {
      sidebar.dataset.state = state
      sidebar.dataset.collapsible = state === 'collapsed' ? sidebar.dataset.collapsibleMode || '' : ''
    })
    if (emit) {
      provider.dispatchEvent(new CustomEvent('radcn-sidebar-change', { bubbles: true, detail: { state } }))
    }
  }

  function toggle() {
    setState(provider.dataset.state === 'collapsed' ? 'expanded' : 'collapsed', true)
  }

  provider.addEventListener('click', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return
    if (target.closest('[data-radcn-sidebar-trigger], [data-radcn-sidebar-rail]')) {
      event.preventDefault()
      toggle()
    }
  })

  window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === shortcut && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      toggle()
    }
  })

  setState(provider.dataset.state === 'collapsed' ? 'collapsed' : 'expanded')
  provider.dataset.radcnSidebarReady = 'true'
}

export function enhanceSidebar(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-sidebar-provider]').forEach(setupSidebarProvider)
}

export function SidebarProvider(handle: Handle<SidebarProviderProps>) {
  return () => {
    let { children, class: className, defaultOpen = true, id, shortcut = 'b', style } = handle.props
    let state = defaultOpen ? 'expanded' : 'collapsed'
    return (
      <div class={classes('radcn-sidebar-provider', className)} data-radcn-sidebar-provider data-shortcut={shortcut} data-state={state} id={id} style={style}>
        {children}
      </div>
    )
  }
}

export function Sidebar(handle: Handle<SidebarProps>) {
  return () => {
    let { children, class: className, collapsible = 'offcanvas', side = 'left', style, variant = 'sidebar' } = handle.props
    return (
      <aside class={classes('radcn-sidebar', `radcn-sidebar--${variant}`, className)} data-collapsible-mode={collapsible} data-radcn-sidebar data-side={side} data-variant={variant} style={style}>
        <div class="radcn-sidebar-inner" data-radcn-sidebar-inner>{children}</div>
      </aside>
    )
  }
}

export function SidebarTrigger(handle: Handle<SidebarButtonProps>) {
  return () => {
    let { ariaLabel = 'Toggle Sidebar', children = '☰', class: className, disabled, style, type = 'button' } = handle.props
    return <button aria-label={ariaLabel} class={classes('radcn-sidebar-trigger', className)} data-radcn-sidebar-trigger disabled={disabled} style={style} type={type}>{children}</button>
  }
}

export function SidebarRail(handle: Handle<SidebarPartProps>) {
  return () => {
    let { class: className, style } = handle.props
    return <button aria-label="Toggle Sidebar" class={classes('radcn-sidebar-rail', className)} data-radcn-sidebar-rail style={style} type="button" />
  }
}

export function SidebarInset(handle: Handle<SidebarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <main class={classes('radcn-sidebar-inset', className)} data-radcn-sidebar-inset style={style}>{children}</main>
  }
}

function part(tag: 'div' | 'header' | 'footer' | 'nav' | 'ul' | 'li', base: string, data: string, handle: Handle<SidebarPartProps>) {
  let { children, class: className, style } = handle.props
  let props = { class: classes(base, className), [`data-radcn-${data}`]: '', style }
  if (tag === 'header') return <header {...props}>{children}</header>
  if (tag === 'footer') return <footer {...props}>{children}</footer>
  if (tag === 'nav') return <nav {...props}>{children}</nav>
  if (tag === 'ul') return <ul {...props}>{children}</ul>
  if (tag === 'li') return <li {...props}>{children}</li>
  return <div {...props}>{children}</div>
}

export function SidebarHeader(handle: Handle<SidebarPartProps>) { return () => part('header', 'radcn-sidebar-header', 'sidebar-header', handle) }
export function SidebarFooter(handle: Handle<SidebarPartProps>) { return () => part('footer', 'radcn-sidebar-footer', 'sidebar-footer', handle) }
export function SidebarContent(handle: Handle<SidebarPartProps>) { return () => part('div', 'radcn-sidebar-content', 'sidebar-content', handle) }
export function SidebarGroup(handle: Handle<SidebarPartProps>) { return () => part('div', 'radcn-sidebar-group', 'sidebar-group', handle) }
export function SidebarGroupLabel(handle: Handle<SidebarPartProps>) { return () => part('div', 'radcn-sidebar-group-label', 'sidebar-group-label', handle) }
export function SidebarGroupAction(handle: Handle<SidebarButtonProps>) {
  return () => {
    let { ariaLabel, children = '+', class: className, disabled, style, type = 'button' } = handle.props
    return <button aria-label={ariaLabel} class={classes('radcn-sidebar-group-action', className)} data-radcn-sidebar-group-action disabled={disabled} style={style} type={type}>{children}</button>
  }
}
export function SidebarGroupContent(handle: Handle<SidebarPartProps>) { return () => part('div', 'radcn-sidebar-group-content', 'sidebar-group-content', handle) }
export function SidebarMenu(handle: Handle<SidebarPartProps>) { return () => part('ul', 'radcn-sidebar-menu', 'sidebar-menu', handle) }
export function SidebarMenuItem(handle: Handle<SidebarPartProps>) { return () => part('li', 'radcn-sidebar-menu-item', 'sidebar-menu-item', handle) }
export function SidebarMenuSub(handle: Handle<SidebarPartProps>) { return () => part('ul', 'radcn-sidebar-menu-sub', 'sidebar-menu-sub', handle) }
export function SidebarMenuSubItem(handle: Handle<SidebarPartProps>) { return () => part('li', 'radcn-sidebar-menu-sub-item', 'sidebar-menu-sub-item', handle) }

export function SidebarMenuButton(handle: Handle<SidebarButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, disabled, href, isActive, size = 'default', style, tooltip, type = 'button', variant = 'default' } = handle.props
    let classValue = classes('radcn-sidebar-menu-button', `radcn-sidebar-menu-button--${variant}`, `radcn-sidebar-menu-button--${size}`, className)
    if (href) {
      return <a aria-label={ariaLabel} aria-disabled={disabled ? 'true' : undefined} class={classValue} data-active={isActive ? 'true' : 'false'} data-radcn-sidebar-menu-button data-size={size} data-tooltip={tooltip} data-variant={variant} href={href} style={style}>{children}</a>
    }
    return <button aria-label={ariaLabel} class={classValue} data-active={isActive ? 'true' : 'false'} data-radcn-sidebar-menu-button data-size={size} data-tooltip={tooltip} data-variant={variant} disabled={disabled} style={style} type={type}>{children}</button>
  }
}

export function SidebarMenuAction(handle: Handle<SidebarButtonProps>) {
  return () => {
    let { ariaLabel, children = '⋯', class: className, disabled, style, type = 'button' } = handle.props
    return <button aria-label={ariaLabel} class={classes('radcn-sidebar-menu-action', className)} data-radcn-sidebar-menu-action disabled={disabled} style={style} type={type}>{children}</button>
  }
}

export function SidebarMenuBadge(handle: Handle<SidebarPartProps>) { return () => part('div', 'radcn-sidebar-menu-badge', 'sidebar-menu-badge', handle) }
export function SidebarMenuSkeleton(handle: Handle<SidebarPartProps>) { return () => part('div', 'radcn-sidebar-menu-skeleton', 'sidebar-menu-skeleton', handle) }
export function SidebarMenuSubButton(handle: Handle<SidebarButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, disabled, href, isActive, size = 'default', style, tooltip, type = 'button', variant = 'default' } = handle.props
    let classValue = classes('radcn-sidebar-menu-sub-button', `radcn-sidebar-menu-sub-button--${size}`, className)
    if (href) {
      return <a aria-label={ariaLabel} aria-disabled={disabled ? 'true' : undefined} class={classValue} data-active={isActive ? 'true' : 'false'} data-radcn-sidebar-menu-sub-button data-size={size} data-tooltip={tooltip} data-variant={variant} href={href} style={style}>{children}</a>
    }
    return <button aria-label={ariaLabel} class={classValue} data-active={isActive ? 'true' : 'false'} data-radcn-sidebar-menu-sub-button data-size={size} data-tooltip={tooltip} data-variant={variant} disabled={disabled} style={style} type={type}>{children}</button>
  }
}
export function SidebarInput(handle: Handle<SidebarInputProps>) {
  return () => {
    let { ariaLabel, class: className, disabled, id, name, placeholder, style, value } = handle.props
    return <input aria-label={ariaLabel} class={classes('radcn-sidebar-input', className)} data-radcn-sidebar-input disabled={disabled} id={id} name={name} placeholder={placeholder} style={style} value={value} />
  }
}
export function SidebarSeparator(handle: Handle<SidebarPartProps>) { return () => <div class={classes('radcn-sidebar-separator', handle.props.class)} data-radcn-sidebar-separator role="separator" style={handle.props.style} /> }
