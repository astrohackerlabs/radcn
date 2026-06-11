import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Select content surfaces as Tailwind utilities (Issue 6, Experiment 54). The
// TRIGGER stays bespoke (the .radcn-button-group > .radcn-select-trigger cascade
// couples its radius; a migrated radius would be an unreliable override, Exp 47/51)
// — the component keeps emitting radcn-select-trigger. Everything else migrates.
// Comments here are ASCII; no bracketed class-like tokens.
const selectRootClass = 'inline-block [font-family:var(--radcn-font)]'
const selectValueClass =
  'overflow-hidden text-ellipsis whitespace-nowrap data-[placeholder=true]:text-[var(--radcn-select-placeholder-fg,var(--radcn-muted-foreground))]'
const selectIconClass = 'text-[var(--radcn-select-icon-fg,var(--radcn-muted-foreground))] text-[0.75rem]'
const selectContentClass =
  'z-[var(--radcn-select-z,50)] grid max-h-[min(var(--radcn-select-content-max-height,17rem),var(--radcn-select-available-height,17rem))] min-w-32 overflow-hidden border border-[var(--radcn-select-border,var(--radcn-border))] rounded-md bg-[var(--radcn-select-bg,var(--radcn-background))] text-[var(--radcn-select-fg,var(--radcn-foreground))] shadow-[0_18px_48px_rgb(0_0_0_/_0.16)] [transform-origin:var(--radcn-select-transform-origin,top_left)] animate-[radcn-select-in_120ms_ease-out] motion-reduce:animate-none [&[hidden]]:hidden'
const selectViewportClass =
  'grid gap-0.5 max-h-[min(14rem,var(--radcn-select-available-height,14rem))] overflow-y-auto p-1.5 outline-none'
const selectGroupClass = 'grid gap-0.5'
const selectLabelClass =
  'px-7 pt-1.5 pb-1 text-muted-foreground font-semibold text-[0.75rem] leading-[1.2] [font-family:var(--radcn-font)]'
const selectItemClass =
  'grid min-h-8 grid-cols-[1rem_minmax(0,1fr)] items-center gap-2 rounded-[calc(var(--radcn-radius)-0.125rem)] cursor-default px-2 py-1.5 text-[0.875rem] font-normal leading-[1.25] [font-family:var(--radcn-font)] outline-none data-[highlighted=true]:bg-[var(--radcn-select-highlight-bg,var(--radcn-secondary))] data-[highlighted=true]:text-[var(--radcn-select-highlight-fg,var(--radcn-foreground))] data-[disabled=true]:text-muted-foreground data-[disabled=true]:opacity-50'
const selectItemIndicatorClass = 'inline-flex justify-center text-[var(--radcn-select-indicator-fg,var(--radcn-primary))]'
const selectSeparatorClass = 'h-px my-1 mx-1.5 bg-[var(--radcn-select-separator-bg,var(--radcn-border))]'
const selectScrollButtonClass =
  'flex h-6 items-center justify-center border-0 bg-transparent text-muted-foreground cursor-pointer text-[0.75rem] font-medium leading-none [font-family:var(--radcn-font)] focus-visible:outline-2 focus-visible:outline-[var(--radcn-ring)] focus-visible:[outline-offset:-2px]'

export type SelectAlign = 'start' | 'center' | 'end'
export type SelectPosition = 'item-aligned' | 'popper'
export type SelectSide = 'top' | 'right' | 'bottom' | 'left'
export type SelectSize = 'default' | 'sm'

export interface SelectProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  defaultValue?: string
  disabled?: boolean
  id?: string
  invalid?: boolean
  name?: string
  required?: boolean
  style?: string
  value?: string
}

export interface SelectTriggerProps {
  ariaLabel?: string
  children?: RemixNode
  class?: string
  id?: string
  size?: SelectSize
  style?: string
}

export interface SelectContentProps {
  align?: SelectAlign
  children?: RemixNode
  class?: string
  position?: SelectPosition
  side?: SelectSide
  sideOffset?: number
  style?: string
}

export interface SelectItemProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
  textValue?: string
  value: string
}

export interface SelectPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface SelectValueProps extends SelectPartProps {
  placeholder?: string
}

function portalHost(scope: HTMLElement | null) {
  let host = scope?.querySelector<HTMLElement>('[data-radcn-portal-root]') || document.querySelector<HTMLElement>('[data-radcn-portal-root]')
  if (host) return host

  host = document.createElement('div')
  host.dataset.radcnPortalRoot = ''
  ;(scope || document.body).append(host)
  return host
}

function clamp(value: number, min: number, max: number) {
  if (max < min) return min
  return Math.min(Math.max(value, min), max)
}

function boundaryRect(anchor: HTMLElement) {
  let stage = anchor.closest<HTMLElement>('[data-fixture-stage]')
  if (stage) return stage.getBoundingClientRect()
  return {
    bottom: window.innerHeight,
    height: window.innerHeight,
    left: 0,
    right: window.innerWidth,
    top: 0,
    width: window.innerWidth,
    x: 0,
    y: 0,
  } as DOMRect
}

function enabledItems(content: HTMLElement) {
  return Array.from(content.querySelectorAll<HTMLElement>('[data-radcn-select-item]')).filter((item) => item.dataset.disabled !== 'true')
}

function itemText(item: HTMLElement) {
  return (item.dataset.text || item.textContent || '').trim()
}

function containsTarget(element: HTMLElement | null, target: EventTarget | null) {
  return target instanceof Node && !!element?.contains(target)
}

function positionContent(trigger: HTMLElement, content: HTMLElement) {
  let side = (content.dataset.side || 'bottom') as SelectSide
  let align = (content.dataset.align || 'start') as SelectAlign
  let position = (content.dataset.position || 'item-aligned') as SelectPosition
  let offset = Number(content.dataset.sideOffset || 4)
  let triggerBox = trigger.getBoundingClientRect()
  let contentBox = content.getBoundingClientRect()
  let boundary = boundaryRect(trigger)
  let gap = 8
  let left = triggerBox.left
  let top = triggerBox.bottom + offset

  if (position === 'popper') {
    if (side === 'top') top = triggerBox.top - contentBox.height - offset
    if (side === 'right') {
      left = triggerBox.right + offset
      top = triggerBox.top
    }
    if (side === 'left') {
      left = triggerBox.left - contentBox.width - offset
      top = triggerBox.top
    }

    if (side === 'top' || side === 'bottom') {
      if (align === 'center') left = triggerBox.left + (triggerBox.width - contentBox.width) / 2
      if (align === 'end') left = triggerBox.right - contentBox.width
    } else {
      if (align === 'center') top = triggerBox.top + (triggerBox.height - contentBox.height) / 2
      if (align === 'end') top = triggerBox.bottom - contentBox.height
    }
  }

  left = clamp(left, boundary.left + gap, boundary.right - contentBox.width - gap)
  top = clamp(top, boundary.top + gap, boundary.bottom - contentBox.height - gap)

  content.style.position = 'fixed'
  content.style.left = `${Math.round(left)}px`
  content.style.top = `${Math.round(top)}px`
  content.style.minWidth = `${Math.round(triggerBox.width)}px`
  content.style.setProperty('--radcn-select-available-height', `${Math.max(0, boundary.height - gap * 2)}px`)
  content.style.setProperty('--radcn-select-available-width', `${Math.max(0, boundary.width - gap * 2)}px`)
  content.style.setProperty('--radcn-select-transform-origin', `${align === 'end' ? 'right' : align === 'center' ? 'center' : 'left'} ${side === 'top' ? 'bottom' : 'top'}`)
}

function scrollViewport(viewport: HTMLElement, direction: 1 | -1) {
  viewport.scrollBy({ top: direction * 48 })
}

export function enhanceSelect(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-select]').forEach((select) => {
    if (select.dataset.radcnSelectReady === 'true') return

    let selectTrigger = select.querySelector<HTMLElement>('[data-radcn-select-trigger]')
    let selectValue = select.querySelector<HTMLElement>('[data-radcn-select-value]')
    let selectPortal = select.querySelector<HTMLElement>('[data-radcn-select-portal]')
    let selectContent = select.querySelector<HTMLElement>('[data-radcn-select-content]')
    let selectViewport = select.querySelector<HTMLElement>('[data-radcn-select-viewport]') || selectContent
    if (!selectTrigger || !selectValue || !selectPortal || !selectContent || !selectViewport) return

    const triggerEl = selectTrigger
    const valueEl = selectValue
    const portalEl = selectPortal
    const contentEl = selectContent
    const viewportEl = selectViewport

    let selectId = select.id || `radcn-select-${Math.random().toString(36).slice(2)}`
    let hiddenInput = select.querySelector<HTMLInputElement>('[data-radcn-select-input]')
    let initialValue = select.dataset.value || select.dataset.defaultValue || ''
    let selectedValue = initialValue
    let typeahead = ''
    let typeaheadTimer = 0

    select.id = selectId
    contentEl.id = contentEl.id || `${selectId}-content`
    viewportEl.id = viewportEl.id || `${selectId}-viewport`
    triggerEl.setAttribute('role', 'combobox')
    triggerEl.setAttribute('aria-haspopup', 'listbox')
    triggerEl.setAttribute('aria-controls', viewportEl.id)
    triggerEl.setAttribute('aria-expanded', select.dataset.defaultOpen === 'true' ? 'true' : 'false')
    if (select.dataset.disabled === 'true') triggerEl.setAttribute('disabled', '')
    if (select.dataset.invalid === 'true') triggerEl.setAttribute('aria-invalid', 'true')
    viewportEl.setAttribute('role', 'listbox')
    portalEl.dataset.selectId = selectId

    portalHost(select.closest<HTMLElement>('[data-fixture-stage]')).append(portalEl)

    function items() {
      return enabledItems(contentEl)
    }

    function itemByValue(nextValue: string) {
      return items().find((item) => item.dataset.value === nextValue) || null
    }

    function clearHighlight() {
      items().forEach((item) => {
        item.dataset.highlighted = 'false'
      })
      triggerEl.removeAttribute('aria-activedescendant')
    }

    function highlight(item: HTMLElement | null) {
      if (!item) return
      clearHighlight()
      item.dataset.highlighted = 'true'
      item.id = item.id || `${selectId}-item-${item.dataset.value || Math.random().toString(36).slice(2)}`
      triggerEl.setAttribute('aria-activedescendant', item.id)
      item.scrollIntoView({ block: 'nearest' })
    }

    function syncSelected(nextValue: string, updateInput = true) {
      selectedValue = nextValue
      select.dataset.value = selectedValue
      select.dataset.placeholder = selectedValue ? 'false' : 'true'
      triggerEl.dataset.placeholder = selectedValue ? 'false' : 'true'
      valueEl.dataset.placeholder = selectedValue ? 'false' : 'true'
      let selectedItem = itemByValue(selectedValue)

      contentEl.querySelectorAll<HTMLElement>('[data-radcn-select-item]').forEach((item) => {
        let selected = !!selectedValue && item.dataset.value === selectedValue
        item.dataset.selected = selected ? 'true' : 'false'
        item.setAttribute('aria-selected', selected ? 'true' : 'false')
        let indicator = item.querySelector<HTMLElement>('[data-radcn-select-item-indicator]')
        if (indicator) indicator.hidden = !selected
      })

      valueEl.textContent = selectedItem ? itemText(selectedItem) : valueEl.dataset.placeholderText || ''
      if (hiddenInput && updateInput) hiddenInput.value = selectedValue
    }

    function setOpen(state: 'open' | 'closed') {
      select.dataset.state = state
      select.dataset.open = state === 'open' ? 'true' : 'false'
      triggerEl.dataset.state = state
      portalEl.dataset.state = state
      contentEl.dataset.state = state
      triggerEl.setAttribute('aria-expanded', state === 'open' ? 'true' : 'false')
      portalEl.hidden = state !== 'open'
      contentEl.hidden = state !== 'open'
      if (state === 'closed') clearHighlight()
    }

    function updatePosition() {
      if (contentEl.hidden) return
      positionContent(triggerEl, contentEl)
    }

    function open(reason: string) {
      if (select.dataset.disabled === 'true') return
      setOpen('open')
      updatePosition()
      requestAnimationFrame(updatePosition)
      let options = items()
      let selected = itemByValue(selectedValue)
      let target: HTMLElement | null = selected || options[0] || null
      if (reason === 'ArrowUp') target = selected || options.at(-1) || null
      if (reason === 'ArrowDown') target = selected || options[0] || null
      highlight(target || null)
    }

    function close(restoreFocus = true) {
      window.clearTimeout(typeaheadTimer)
      typeahead = ''
      setOpen('closed')
      if (restoreFocus) triggerEl.focus()
    }

    function move(direction: 1 | -1) {
      let options = items()
      if (options.length === 0) return
      let activeId = triggerEl.getAttribute('aria-activedescendant')
      let active = activeId ? document.getElementById(activeId) as HTMLElement | null : null
      let index = active ? options.indexOf(active) : -1
      highlight(options[(index + direction + options.length) % options.length])
    }

    function typeaheadTo(key: string) {
      window.clearTimeout(typeaheadTimer)
      typeahead += key.toLowerCase()
      typeaheadTimer = window.setTimeout(() => {
        typeahead = ''
      }, 700)
      let match = items().find((item) => itemText(item).toLowerCase().startsWith(typeahead))
      if (match) highlight(match)
    }

    function selectItem(item: HTMLElement) {
      if (item.dataset.disabled === 'true') return
      syncSelected(item.dataset.value || '')
      close()
    }

    triggerEl.addEventListener('click', (event) => {
      event.preventDefault()
      if (select.dataset.state === 'open') close(false)
      else open('click')
    })

    triggerEl.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        if (select.dataset.state !== 'open') open(event.key)
        else if (event.key === 'Enter' || event.key === ' ') {
          let activeId = triggerEl.getAttribute('aria-activedescendant')
          let active = activeId ? document.getElementById(activeId) as HTMLElement | null : null
          if (active?.matches('[data-radcn-select-item]')) selectItem(active)
        }
        else if (event.key === 'ArrowDown') move(1)
        else if (event.key === 'ArrowUp') move(-1)
        return
      }

      if (select.dataset.state !== 'open') return

      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      } else if (event.key === 'Tab') {
        close(false)
      } else if (event.key === 'Home') {
        event.preventDefault()
        highlight(items()[0] || null)
      } else if (event.key === 'End') {
        event.preventDefault()
        highlight(items().at(-1) || null)
      } else if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        typeaheadTo(event.key)
      }
    })

    contentEl.addEventListener('click', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let item = target.closest<HTMLElement>('[data-radcn-select-item]')
      if (item) {
        event.preventDefault()
        selectItem(item)
      }
    })

    contentEl.addEventListener('pointermove', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let item = target.closest<HTMLElement>('[data-radcn-select-item]')
      if (item && item.dataset.disabled !== 'true') highlight(item)
    })

    contentEl.querySelectorAll<HTMLElement>('[data-radcn-select-scroll-up-button], [data-radcn-select-scroll-down-button]').forEach((button) => {
      let direction: 1 | -1 = button.hasAttribute('data-radcn-select-scroll-up-button') ? -1 : 1
      button.addEventListener('click', (event) => {
        event.preventDefault()
        scrollViewport(viewportEl, direction)
      })
      button.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        scrollViewport(viewportEl, direction)
      })
    })

    document.addEventListener('pointerdown', (event) => {
      if (select.dataset.state !== 'open') return
      if (containsTarget(triggerEl, event.target) || containsTarget(contentEl, event.target)) return
      close(false)
    })

    hiddenInput?.form?.addEventListener('reset', () => {
      window.setTimeout(() => {
        syncSelected(initialValue)
      })
    })

    syncSelected(initialValue)
    if (select.dataset.defaultOpen === 'true') open('defaultOpen')
    else setOpen('closed')
    select.dataset.radcnSelectReady = 'true'
  })
}

export function Select(handle: Handle<SelectProps>) {
  return () => {
    let { children, class: className, defaultOpen, defaultValue, disabled, id, invalid, name, required, style, value } = handle.props
    let initialValue = value ?? defaultValue ?? ''

    return (
      <div
        class={classes(selectRootClass, className)}
        data-default-open={defaultOpen ? 'true' : undefined}
        data-default-value={defaultValue}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={invalid ? 'true' : undefined}
        data-name={name}
        data-open={defaultOpen ? 'true' : 'false'}
        data-placeholder={initialValue ? 'false' : 'true'}
        data-radcn-select
        data-required={required ? 'true' : undefined}
        data-state={defaultOpen ? 'open' : 'closed'}
        data-value={initialValue}
        id={id}
        style={style}
      >
        {name && <input data-radcn-select-input name={name} required={required} type="hidden" value={initialValue} />}
        {children}
      </div>
    )
  }
}

export function SelectTrigger(handle: Handle<SelectTriggerProps>) {
  return () => {
    let { ariaLabel, children, class: className, id, size = 'default', style } = handle.props

    return (
      <button
        aria-label={ariaLabel}
        class={classes('radcn-select-trigger', className)}
        data-radcn-select-trigger
        data-size={size}
        data-state="closed"
        id={id}
        type="button"
        style={style}
      >
        {children}
        <span aria-hidden="true" class={selectIconClass} data-radcn-select-icon>v</span>
      </button>
    )
  }
}

export function SelectValue(handle: Handle<SelectValueProps>) {
  return () => {
    let { children, class: className, placeholder = 'Select an option', style } = handle.props

    return <span class={classes(selectValueClass, className)} data-placeholder-text={placeholder} data-radcn-select-value style={style}>{children || placeholder}</span>
  }
}

export function SelectPortal(handle: Handle<SelectPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('[&[hidden]]:hidden', className)} data-radcn-select-portal data-state="closed" hidden style={style}>{children}</div>
  }
}

export function SelectContent(handle: Handle<SelectContentProps>) {
  return () => {
    let { align = 'start', children, class: className, position = 'item-aligned', side = 'bottom', sideOffset = 4, style } = handle.props

    return (
      <div
        class={classes(selectContentClass, className)}
        data-align={align}
        data-position={position}
        data-radcn-select-content
        data-side={side}
        data-side-offset={String(sideOffset)}
        data-state="closed"
        hidden
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function SelectViewport(handle: Handle<SelectPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(selectViewportClass, className)} data-radcn-select-viewport style={style}>{children}</div>
  }
}

export function SelectGroup(handle: Handle<SelectPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(selectGroupClass, className)} data-radcn-select-group role="group" style={style}>{children}</div>
  }
}

export function SelectLabel(handle: Handle<SelectPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(selectLabelClass, className)} data-radcn-select-label style={style}>{children}</div>
  }
}

export function SelectItem(handle: Handle<SelectItemProps>) {
  return () => {
    let { children, class: className, disabled, style, textValue, value } = handle.props

    return (
      <div
        aria-disabled={disabled ? 'true' : undefined}
        aria-selected="false"
        class={classes(selectItemClass, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-highlighted="false"
        data-radcn-select-item
        data-selected="false"
        data-text={textValue}
        data-value={value}
        role="option"
        style={style}
      >
        <span class={selectItemIndicatorClass} data-radcn-select-item-indicator hidden>✓</span>
        <span data-radcn-select-item-text>{children}</span>
      </div>
    )
  }
}

export function SelectItemIndicator(handle: Handle<SelectPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <span class={classes(selectItemIndicatorClass, className)} data-radcn-select-item-indicator hidden style={style}>{children || '✓'}</span>
  }
}

export function SelectSeparator(handle: Handle<SelectPartProps>) {
  return () => {
    let { class: className, style } = handle.props

    return <div class={classes(selectSeparatorClass, className)} data-radcn-select-separator role="separator" style={style} />
  }
}

export function SelectScrollUpButton(handle: Handle<SelectPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <button class={classes(selectScrollButtonClass, 'radcn-select-scroll-button--up', className)} data-radcn-select-scroll-up-button type="button" style={style}>{children || '^'}</button>
  }
}

export function SelectScrollDownButton(handle: Handle<SelectPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <button class={classes(selectScrollButtonClass, 'radcn-select-scroll-button--down', className)} data-radcn-select-scroll-down-button type="button" style={style}>{children || 'v'}</button>
  }
}
