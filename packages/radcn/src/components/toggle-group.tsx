import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import type { ToggleSize, ToggleVariant } from './toggle.tsx'

export type ToggleGroupOrientation = 'horizontal' | 'vertical'
export type ToggleGroupType = 'single' | 'multiple'

export interface ToggleGroupProps {
  children?: RemixNode
  class?: string
  defaultValue?: string | string[]
  orientation?: ToggleGroupOrientation
  style?: string
  type?: ToggleGroupType
}

export interface ToggleGroupItemProps {
  ariaLabel?: string
  children?: RemixNode
  class?: string
  disabled?: boolean
  size?: ToggleSize
  style?: string
  value: string
  variant?: ToggleVariant
}

function groupValues(root: HTMLElement) {
  return new Set((root.dataset.value || '').split(' ').filter(Boolean))
}

function writeGroupValues(root: HTMLElement, values: Set<string>) {
  root.dataset.value = Array.from(values).join(' ')
}

function enabledGroupItems(items: HTMLButtonElement[]) {
  return items.filter((item) => item.getAttribute('aria-disabled') !== 'true' && !item.disabled)
}

function applyGroupState(root: HTMLElement, items: HTMLButtonElement[], values: Set<string>, focusValue?: string) {
  writeGroupValues(root, values)
  let enabled = enabledGroupItems(items)
  let selectedEnabled = enabled.find((item) => values.has(item.dataset.value || ''))
  let rovingItem = selectedEnabled || enabled[0]

  for (let item of items) {
    let value = item.dataset.value || ''
    let pressed = values.has(value)
    let disabled = item.getAttribute('aria-disabled') === 'true' || item.disabled

    item.setAttribute('aria-pressed', pressed ? 'true' : 'false')
    item.dataset.state = pressed ? 'on' : 'off'
    item.tabIndex = !disabled && item === rovingItem ? 0 : -1

    if (focusValue === value && !disabled) item.focus()
  }
}

function setupToggleGroup(root: HTMLElement) {
  if (root.dataset.radcnToggleGroupReady === 'true') return

  let items = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-radcn-toggle-group-item]'))
  let values = groupValues(root)
  applyGroupState(root, items, values)
  root.dataset.radcnToggleGroupReady = 'true'

  function toggleItem(item: HTMLButtonElement) {
    if (item.disabled || item.getAttribute('aria-disabled') === 'true') return

    let value = item.dataset.value || ''
    let type = root.dataset.type || 'single'
    let next = new Set(groupValues(root))

    if (type === 'single') {
      if (next.has(value)) next.clear()
      else {
        next.clear()
        next.add(value)
      }
    } else if (next.has(value)) {
      next.delete(value)
    } else {
      next.add(value)
    }

    applyGroupState(root, items, next, value)
  }

  function moveItem(current: HTMLButtonElement, direction: number | 'first' | 'last') {
    let enabled = enabledGroupItems(items)
    let index = enabled.indexOf(current)
    if (index === -1) return
    let nextIndex =
      direction === 'first'
        ? 0
        : direction === 'last'
          ? enabled.length - 1
          : (index + direction + enabled.length) % enabled.length
    enabled[nextIndex].focus()
  }

  root.addEventListener('click', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return

    let item = target.closest<HTMLButtonElement>('[data-radcn-toggle-group-item]')
    if (!item || !root.contains(item)) return
    toggleItem(item)
  })

  root.addEventListener('keydown', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return

    let item = target.closest<HTMLButtonElement>('[data-radcn-toggle-group-item]')
    if (!item || !root.contains(item)) return

    let orientation = root.dataset.orientation || 'horizontal'
    let handled = true

    switch (event.key) {
      case 'ArrowRight':
        if (orientation === 'vertical') handled = false
        else moveItem(item, 1)
        break
      case 'ArrowLeft':
        if (orientation === 'vertical') handled = false
        else moveItem(item, -1)
        break
      case 'ArrowDown':
        if (orientation !== 'vertical') handled = false
        else moveItem(item, 1)
        break
      case 'ArrowUp':
        if (orientation !== 'vertical') handled = false
        else moveItem(item, -1)
        break
      case 'Home':
        moveItem(item, 'first')
        break
      case 'End':
        moveItem(item, 'last')
        break
      case 'Enter':
      case ' ':
        toggleItem(item)
        break
      default:
        handled = false
    }

    if (handled) event.preventDefault()
  })
}

export function enhanceToggleGroup(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-toggle-group]').forEach(setupToggleGroup)
}

export function ToggleGroup(handle: Handle<ToggleGroupProps>) {
  return () => {
    let {
      children,
      class: className,
      defaultValue,
      orientation = 'horizontal',
      style,
      type = 'single',
    } = handle.props
    let values = Array.isArray(defaultValue) ? defaultValue : defaultValue === undefined ? [] : [defaultValue]

    return (
      <div
        class={classes('radcn-toggle-group', `radcn-toggle-group--${orientation}`, className)}
        data-default-value={values.join(' ')}
        data-orientation={orientation}
        data-radcn-toggle-group
        data-type={type}
        data-value={values.join(' ')}
        role="group"
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function ToggleGroupItem(handle: Handle<ToggleGroupItemProps>) {
  return () => {
    let {
      ariaLabel,
      children,
      class: className,
      disabled,
      size = 'default',
      style,
      value,
      variant = 'default',
    } = handle.props

    return (
      <button
        aria-disabled={disabled ? 'true' : undefined}
        aria-label={ariaLabel}
        aria-pressed="false"
        class={classes('radcn-toggle', 'radcn-toggle-group-item', `radcn-toggle--${variant}`, `radcn-toggle--${size}`, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-radcn-toggle-group-item
        data-state="off"
        data-value={value}
        data-variant={variant}
        disabled={disabled}
        style={style}
        tabIndex={-1}
        type="button"
      >
        {children}
      </button>
    )
  }
}
