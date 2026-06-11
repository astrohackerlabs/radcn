import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { setupSearchableListbox } from '../utils/searchable-listbox.ts'

// Combobox + Command shared surfaces as Tailwind utilities (Issue 6, Experiment
// 53). The shared consts are exported here and reused by command.tsx. Two shared
// rules are component-overridden (content bg/fg, item grid-cols), so the shared
// consts carry only the non-conflicting structure and each component adds its own
// bg/fg + grid-cols (Exp-41). The control invalid/disabled propagates via vars the
// combobox root sets and the control reads (Exp-47). Comments here are ASCII; no
// bracketed class-like tokens.
export const sharedControl =
  'flex w-[var(--radcn-combobox-width,14rem)] min-h-[var(--radcn-control-height)] items-center border border-[color:var(--radcn-combobox-control-bc,var(--radcn-combobox-border,var(--radcn-input)))] rounded-md bg-[var(--radcn-combobox-trigger-bg,var(--radcn-background))] text-[var(--radcn-combobox-trigger-fg,var(--radcn-foreground))] shadow-[var(--radcn-combobox-control-shadow,none)] opacity-[var(--radcn-combobox-control-op,1)]'
export const sharedInput =
  'min-w-0 flex-1 border-0 bg-transparent text-inherit px-3 py-2 text-[0.875rem] font-normal leading-none [font-family:var(--radcn-font)] outline-none placeholder:text-muted-foreground'
export const sharedContentStructure =
  'grid overflow-hidden border border-[var(--radcn-combobox-border,var(--radcn-border))] rounded-md shadow-[0_18px_48px_rgb(0_0_0_/_0.16)]'
export const sharedList = 'grid gap-0.5 max-h-56 overflow-y-auto p-1.5'
export const sharedGroup = 'grid gap-0.5'
export const sharedItemStructure =
  'grid min-h-8 items-center gap-2 rounded-[calc(var(--radcn-radius)-0.125rem)] cursor-default px-2 py-1.5 text-[0.875rem] font-normal leading-[1.25] [font-family:var(--radcn-font)] data-[highlighted=true]:bg-[var(--radcn-combobox-highlight-bg,var(--radcn-secondary))] data-[highlighted=true]:text-[var(--radcn-combobox-highlight-fg,var(--radcn-foreground))] data-[disabled=true]:text-muted-foreground data-[disabled=true]:opacity-50'
export const sharedIndicator = 'text-[var(--radcn-combobox-indicator-fg,var(--radcn-primary))]'
export const sharedEmpty =
  'p-5 text-muted-foreground text-center text-[0.875rem] font-normal leading-[1.4] [font-family:var(--radcn-font)]'
export const sharedSeparator = 'h-px my-1 mx-1.5 bg-border'
const comboboxRootClass =
  '[font-family:var(--radcn-font)] data-[invalid=true]:[--radcn-combobox-control-bc:var(--radcn-destructive)] data-[invalid=true]:[--radcn-combobox-control-shadow:0_0_0_3px_color-mix(in_srgb,var(--radcn-destructive)_18%,transparent)] data-[disabled=true]:[--radcn-combobox-control-op:0.5]'
const comboboxTriggerClass =
  'inline-flex w-8 min-h-8 items-center justify-center border-0 bg-transparent text-muted-foreground cursor-pointer text-[0.75rem] font-medium leading-none [font-family:var(--radcn-font)]'
const comboboxContentClass = `${sharedContentStructure} bg-[var(--radcn-combobox-bg,var(--radcn-background))] text-[var(--radcn-combobox-fg,var(--radcn-foreground))] z-[var(--radcn-combobox-z,50)] max-h-[min(var(--radcn-combobox-content-max-height,17rem),var(--radcn-combobox-available-height,17rem))] [transform-origin:var(--radcn-combobox-transform-origin,top_left)] animate-[radcn-select-in_120ms_ease-out] [&[hidden]]:hidden`
const comboboxItemClass = `${sharedItemStructure} grid-cols-[1rem_minmax(0,1fr)_auto]`
const comboboxLabelClass =
  'px-7 pt-1.5 pb-1 text-muted-foreground font-semibold text-[0.75rem] leading-[1.2] [font-family:var(--radcn-font)]'
const comboboxChipsClass = 'flex flex-wrap gap-1.5 mb-2'
const comboboxChipClass =
  'inline-flex items-center gap-1 rounded-[calc(var(--radcn-radius)-0.125rem)] bg-secondary text-secondary-foreground px-2 py-1 text-[0.75rem] font-medium leading-none [font-family:var(--radcn-font)] [&[hidden]]:hidden'
const comboboxChipRemoveClass = 'border-0 bg-transparent text-inherit cursor-pointer p-0'
export type ComboboxAlign = 'start' | 'center' | 'end'
export type ComboboxSide = 'top' | 'right' | 'bottom' | 'left'

export interface ComboboxProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  defaultValue?: string
  disabled?: boolean
  id?: string
  invalid?: boolean
  multiple?: boolean
  name?: string
  required?: boolean
  style?: string
  value?: string
}

export interface ComboboxInputProps {
  ariaLabel?: string
  class?: string
  disabled?: boolean
  placeholder?: string
  style?: string
}

export interface ComboboxContentProps {
  align?: ComboboxAlign
  children?: RemixNode
  class?: string
  side?: ComboboxSide
  sideOffset?: number
  style?: string
}

export interface ComboboxItemProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  keywords?: string
  style?: string
  textValue?: string
  value: string
}

export interface ComboboxChipProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
  value: string
}

export interface ComboboxPartProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
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

function containsTarget(element: HTMLElement | null, target: EventTarget | null) {
  return target instanceof Node && !!element?.contains(target)
}

function itemText(item: HTMLElement) {
  return (item.dataset.text || item.textContent || '').trim()
}

function positionContent(input: HTMLElement, content: HTMLElement) {
  let side = (content.dataset.side || 'bottom') as ComboboxSide
  let align = (content.dataset.align || 'start') as ComboboxAlign
  let offset = Number(content.dataset.sideOffset || 6)
  let anchor = input.getBoundingClientRect()
  let contentBox = content.getBoundingClientRect()
  let boundary = boundaryRect(input)
  let gap = 8
  let left = anchor.left
  let top = anchor.bottom + offset

  if (side === 'top') top = anchor.top - contentBox.height - offset
  if (side === 'right') {
    left = anchor.right + offset
    top = anchor.top
  }
  if (side === 'left') {
    left = anchor.left - contentBox.width - offset
    top = anchor.top
  }
  if (side === 'top' || side === 'bottom') {
    if (align === 'center') left = anchor.left + (anchor.width - contentBox.width) / 2
    if (align === 'end') left = anchor.right - contentBox.width
  } else {
    if (align === 'center') top = anchor.top + (anchor.height - contentBox.height) / 2
    if (align === 'end') top = anchor.bottom - contentBox.height
  }

  left = clamp(left, boundary.left + gap, boundary.right - contentBox.width - gap)
  top = clamp(top, boundary.top + gap, boundary.bottom - contentBox.height - gap)
  content.style.position = 'fixed'
  content.style.left = `${Math.round(left)}px`
  content.style.top = `${Math.round(top)}px`
  content.style.minWidth = `${Math.round(anchor.width)}px`
  content.style.setProperty('--radcn-combobox-available-height', `${Math.max(0, boundary.height - gap * 2)}px`)
  content.style.setProperty('--radcn-combobox-transform-origin', `${align === 'end' ? 'right' : align === 'center' ? 'center' : 'left'} ${side === 'top' ? 'bottom' : 'top'}`)
}

export function enhanceCombobox(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-combobox]').forEach((combobox) => {
    if (combobox.dataset.radcnComboboxReady === 'true') return
    let input = combobox.querySelector<HTMLInputElement>('[data-radcn-combobox-input]')
    let portal = combobox.querySelector<HTMLElement>('[data-radcn-combobox-portal]')
    let content = combobox.querySelector<HTMLElement>('[data-radcn-combobox-content]')
    let list = combobox.querySelector<HTMLElement>('[data-radcn-combobox-list]')
    if (!input || !portal || !content || !list) return
    const inputEl = input
    const portalEl = portal
    const contentEl = content
    const listEl = list

    let comboboxId = combobox.id || `radcn-combobox-${Math.random().toString(36).slice(2)}`
    let hiddenInput = combobox.querySelector<HTMLInputElement>('[data-radcn-combobox-hidden-input]')
    let trigger = combobox.querySelector<HTMLButtonElement>('[data-radcn-combobox-trigger]')
    let clear = combobox.querySelector<HTMLButtonElement>('[data-radcn-combobox-clear]')
    let initialValue = combobox.dataset.value || combobox.dataset.defaultValue || ''
    let selectedValues = initialValue ? initialValue.split(',').filter(Boolean) : []
    let multiple = combobox.dataset.multiple === 'true'
    let suppressFocusOpen = false

    combobox.id = comboboxId
    listEl.id = listEl.id || `${comboboxId}-list`
    contentEl.id = contentEl.id || `${comboboxId}-content`
    inputEl.setAttribute('role', 'combobox')
    inputEl.setAttribute('aria-autocomplete', 'list')
    inputEl.setAttribute('aria-expanded', combobox.dataset.defaultOpen === 'true' ? 'true' : 'false')
    inputEl.setAttribute('aria-controls', listEl.id)
    if (combobox.dataset.invalid === 'true') inputEl.setAttribute('aria-invalid', 'true')
    if (combobox.dataset.disabled === 'true') inputEl.disabled = true
    listEl.setAttribute('role', 'listbox')
    portalHost(combobox.closest<HTMLElement>('[data-fixture-stage]')).append(portalEl)

    let searchable = setupSearchableListbox({
      emptySelector: '[data-radcn-combobox-empty]',
      groupSelector: '[data-radcn-combobox-group]',
      input: inputEl,
      itemSelector: '[data-radcn-combobox-item]',
      list: listEl,
      root: combobox,
    })

    function itemByValue(value: string) {
      return listEl.querySelector<HTMLElement>(`[data-radcn-combobox-item][data-value="${CSS.escape(value)}"]`)
    }

    function syncSelected(updateInput = true) {
      let serialized = selectedValues.join(',')
      combobox.dataset.value = serialized
      combobox.dataset.placeholder = serialized ? 'false' : 'true'
      inputEl.dataset.placeholder = serialized ? 'false' : 'true'
      listEl.querySelectorAll<HTMLElement>('[data-radcn-combobox-item]').forEach((item) => {
        let selected = selectedValues.includes(item.dataset.value || '')
        item.dataset.selected = selected ? 'true' : 'false'
        item.setAttribute('aria-selected', selected ? 'true' : 'false')
        let indicator = item.querySelector<HTMLElement>('[data-radcn-combobox-item-indicator]')
        if (indicator) indicator.hidden = !selected
      })
      combobox.querySelectorAll<HTMLElement>('[data-radcn-combobox-chip]').forEach((chip) => {
        chip.hidden = !selectedValues.includes(chip.dataset.value || '')
      })
      if (hiddenInput) hiddenInput.value = serialized
      if (!multiple && updateInput) {
        let item = selectedValues[0] ? itemByValue(selectedValues[0]) : null
        inputEl.value = item ? itemText(item) : ''
      }
    }

    function setOpen(state: 'open' | 'closed') {
      combobox.dataset.state = state
      combobox.dataset.open = state === 'open' ? 'true' : 'false'
      inputEl.dataset.state = state
      portalEl.dataset.state = state
      contentEl.dataset.state = state
      trigger?.setAttribute('aria-expanded', state === 'open' ? 'true' : 'false')
      inputEl.setAttribute('aria-expanded', state === 'open' ? 'true' : 'false')
      portalEl.hidden = state !== 'open'
      contentEl.hidden = state !== 'open'
      if (state === 'closed') inputEl.removeAttribute('aria-activedescendant')
    }

    function updatePosition() {
      if (contentEl.hidden) return
      positionContent(inputEl, contentEl)
    }

    function open(query = '') {
      if (combobox.dataset.disabled === 'true') return
      setOpen('open')
      searchable.filter(query)
      updatePosition()
      requestAnimationFrame(updatePosition)
    }

    function close() {
      setOpen('closed')
    }

    function selectItem(item: HTMLElement) {
      if (item.dataset.disabled === 'true') return
      let value = item.dataset.value || ''
      if (multiple) {
        selectedValues = selectedValues.includes(value) ? selectedValues.filter((itemValue) => itemValue !== value) : [...selectedValues, value]
        syncSelected(false)
        inputEl.value = ''
        searchable.filter('')
      } else {
        selectedValues = value ? [value] : []
        syncSelected()
        close()
      }
    }

    trigger?.addEventListener('pointerdown', (event) => {
      event.preventDefault()
      let wasOpen = combobox.dataset.state === 'open'
      suppressFocusOpen = true
      inputEl.focus()
      suppressFocusOpen = false
      if (wasOpen) close()
      else open()
    })

    trigger?.addEventListener('click', (event) => {
      event.preventDefault()
      inputEl.focus()
    })

    clear?.addEventListener('click', (event) => {
      event.preventDefault()
      selectedValues = []
      inputEl.value = ''
      syncSelected()
      searchable.filter('')
      close()
      inputEl.focus()
    })

    combobox.addEventListener('click', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let remove = target.closest<HTMLElement>('[data-radcn-combobox-chip-remove]')
      let chip = remove?.closest<HTMLElement>('[data-radcn-combobox-chip]')
      if (!chip || chip.dataset.disabled === 'true') return
      event.preventDefault()
      selectedValues = selectedValues.filter((itemValue) => itemValue !== chip.dataset.value)
      syncSelected(false)
      inputEl.focus()
    })

    inputEl.addEventListener('input', () => {
      open(inputEl.value)
      searchable.filter(inputEl.value)
    })

    inputEl.addEventListener('focus', () => {
      if (suppressFocusOpen) return
      if (combobox.dataset.defaultOpen === 'true') open()
    })

    inputEl.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        if (combobox.dataset.state !== 'open') open()
        else searchable.move(event.key === 'ArrowDown' ? 1 : -1)
      } else if (event.key === 'Home' && combobox.dataset.state === 'open') {
        event.preventDefault()
        searchable.highlight(searchable.visibleItems()[0] || null)
      } else if (event.key === 'End' && combobox.dataset.state === 'open') {
        event.preventDefault()
        searchable.highlight(searchable.visibleItems().at(-1) || null)
      } else if (event.key === 'Enter' && combobox.dataset.state === 'open') {
        event.preventDefault()
        let active = searchable.activeItem()
        if (active) selectItem(active)
      } else if (event.key === 'Escape') {
        event.preventDefault()
        if (combobox.dataset.state === 'open') close()
        else if (inputEl.value) {
          inputEl.value = ''
          searchable.filter('')
        }
      } else if (event.key === 'Tab') {
        close()
      }
    })

    contentEl.addEventListener('click', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let item = target.closest<HTMLElement>('[data-radcn-combobox-item]')
      if (item) {
        event.preventDefault()
        selectItem(item)
      }
    })

    contentEl.addEventListener('pointermove', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let item = target.closest<HTMLElement>('[data-radcn-combobox-item]')
      if (item && item.dataset.disabled !== 'true') searchable.highlight(item)
    })

    document.addEventListener('pointerdown', (event) => {
      if (combobox.dataset.state !== 'open') return
      if (containsTarget(combobox, event.target) || containsTarget(contentEl, event.target)) return
      close()
    })

    hiddenInput?.form?.addEventListener('reset', () => {
      window.setTimeout(() => {
        selectedValues = initialValue ? initialValue.split(',').filter(Boolean) : []
        syncSelected()
        searchable.filter(inputEl.value)
      })
    })

    syncSelected()
    searchable.filter(inputEl.value)
    if (combobox.dataset.defaultOpen === 'true') open()
    else setOpen('closed')
    combobox.dataset.radcnComboboxReady = 'true'
  })
}

export function Combobox(handle: Handle<ComboboxProps>) {
  return () => {
    let { children, class: className, defaultOpen, defaultValue, disabled, id, invalid, multiple, name, required, style, value } = handle.props
    let initialValue = value ?? defaultValue ?? ''
    return (
      <div class={classes(comboboxRootClass, className)} data-default-open={defaultOpen ? 'true' : undefined} data-default-value={defaultValue} data-disabled={disabled ? 'true' : undefined} data-invalid={invalid ? 'true' : undefined} data-multiple={multiple ? 'true' : undefined} data-open={defaultOpen ? 'true' : 'false'} data-placeholder={initialValue ? 'false' : 'true'} data-radcn-combobox data-required={required ? 'true' : undefined} data-state={defaultOpen ? 'open' : 'closed'} data-value={initialValue} id={id} style={style}>
        {name && <input data-radcn-combobox-hidden-input name={name} required={required} type="hidden" value={initialValue} />}
        {children}
      </div>
    )
  }
}

export function ComboboxValue(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <span class={classes(className)} data-radcn-combobox-value style={style}>{children}</span>
  }
}

export function ComboboxInput(handle: Handle<ComboboxInputProps>) {
  return () => {
    let { ariaLabel, class: className, disabled, placeholder = 'Search...', style } = handle.props
    return <input aria-label={ariaLabel} class={classes(sharedInput, className)} data-disabled={disabled ? 'true' : undefined} data-radcn-combobox-input disabled={disabled} placeholder={placeholder} style={style} />
  }
}

export function ComboboxTrigger(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, disabled, style } = handle.props
    return <button class={classes(comboboxTriggerClass, className)} data-radcn-combobox-trigger disabled={disabled} type="button" style={style}>{children || 'v'}</button>
  }
}

export function ComboboxClear(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, disabled, style } = handle.props
    return <button class={classes(comboboxTriggerClass, className)} data-radcn-combobox-clear disabled={disabled} type="button" style={style}>{children || 'x'}</button>
  }
}

export function ComboboxPortal(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes('[&[hidden]]:hidden', className)} data-radcn-combobox-portal data-state="closed" hidden style={style}>{children}</div>
  }
}

export function ComboboxContent(handle: Handle<ComboboxContentProps>) {
  return () => {
    let { align = 'start', children, class: className, side = 'bottom', sideOffset = 6, style } = handle.props
    return <div class={classes(comboboxContentClass, className)} data-align={align} data-radcn-combobox-content data-side={side} data-side-offset={String(sideOffset)} data-state="closed" hidden style={style}>{children}</div>
  }
}

export function ComboboxList(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(sharedList, className)} data-radcn-combobox-list style={style}>{children}</div>
  }
}

export function ComboboxItem(handle: Handle<ComboboxItemProps>) {
  return () => {
    let { children, class: className, disabled, keywords, style, textValue, value } = handle.props
    return <div aria-disabled={disabled ? 'true' : undefined} aria-selected="false" class={classes(comboboxItemClass, className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-keywords={keywords} data-radcn-combobox-item data-selected="false" data-text={textValue} data-value={value} role="option" style={style}><span class={sharedIndicator} data-radcn-combobox-item-indicator hidden>✓</span><span data-radcn-combobox-item-text>{children}</span></div>
  }
}

export function ComboboxItemIndicator(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <span class={classes(sharedIndicator, className)} data-radcn-combobox-item-indicator hidden style={style}>{children || '✓'}</span>
  }
}

export function ComboboxGroup(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(sharedGroup, className)} data-radcn-combobox-group role="group" style={style}>{children}</div>
  }
}

export function ComboboxLabel(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(comboboxLabelClass, className)} data-radcn-combobox-label style={style}>{children}</div>
  }
}

export function ComboboxCollection(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(className)} data-radcn-combobox-collection style={style}>{children}</div>
  }
}

export function ComboboxEmpty(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(sharedEmpty, className)} data-empty="false" data-radcn-combobox-empty hidden style={style}>{children || 'No results found.'}</div>
  }
}

export function ComboboxSeparator(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { class: className, style } = handle.props
    return <div class={classes(sharedSeparator, className)} data-radcn-combobox-separator role="separator" style={style} />
  }
}

export function ComboboxChips(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(comboboxChipsClass, className)} data-radcn-combobox-chips style={style}>{children}</div>
  }
}

export function ComboboxChip(handle: Handle<ComboboxChipProps>) {
  return () => {
    let { children, class: className, disabled, style, value } = handle.props
    return <span class={classes(comboboxChipClass, className)} data-disabled={disabled ? 'true' : undefined} data-radcn-combobox-chip data-value={value} hidden style={style}>{children || value}</span>
  }
}

export function ComboboxChipRemove(handle: Handle<ComboboxPartProps>) {
  return () => {
    let { children, class: className, disabled, style } = handle.props
    return <button class={classes(comboboxChipRemoveClass, className)} data-radcn-combobox-chip-remove disabled={disabled} type="button" style={style}>{children || 'x'}</button>
  }
}
