import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type TabsActivationMode = 'automatic' | 'manual'
export type TabsOrientation = 'horizontal' | 'vertical'

export interface TabsProps {
  activationMode?: TabsActivationMode
  children?: RemixNode
  class?: string
  defaultValue?: string
  orientation?: TabsOrientation
  style?: string
}

export interface TabsListProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface TabsTriggerProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
  value: string
}

export interface TabsContentProps {
  children?: RemixNode
  class?: string
  style?: string
  value: string
}

function getEnabledTabsTriggers(triggers: HTMLButtonElement[]) {
  return triggers.filter((trigger) => trigger.getAttribute('aria-disabled') !== 'true' && !trigger.disabled)
}

function safeTabsValue(value: string | undefined) {
  return String(value || 'tab').replace(/[^a-zA-Z0-9_-]/g, '-')
}

function setupTabs(root: HTMLElement) {
  if (root.dataset.radcnTabsReady === 'true') return

  let list = root.querySelector<HTMLElement>('[data-radcn-tabs-list]')
  if (!list) return

  let triggers = Array.from(list.querySelectorAll<HTMLButtonElement>('[data-radcn-tabs-trigger]'))
  let panels = Array.from(root.querySelectorAll<HTMLElement>('[data-radcn-tabs-content]'))
  let enabledTriggers = getEnabledTabsTriggers(triggers)
  if (enabledTriggers.length === 0) return

  let selectedValue = root.dataset.value || root.dataset.defaultValue || enabledTriggers[0].dataset.value
  if (!enabledTriggers.some((trigger) => trigger.dataset.value === selectedValue)) {
    selectedValue = enabledTriggers[0].dataset.value
  }

  let rootId = root.id || `radcn-tabs-${Math.random().toString(36).slice(2)}`
  root.id = rootId

  function applySelection(value: string | undefined, shouldFocus: boolean) {
    if (!value) return

    selectedValue = value
    root.dataset.value = value

    for (let trigger of triggers) {
      let triggerValue = trigger.dataset.value
      let isDisabled = trigger.getAttribute('aria-disabled') === 'true' || trigger.disabled
      let isSelected = triggerValue === value && !isDisabled
      let triggerId = trigger.id || `${rootId}-trigger-${safeTabsValue(triggerValue)}`
      let panelId = `${rootId}-content-${safeTabsValue(triggerValue)}`

      trigger.id = triggerId
      trigger.setAttribute('role', 'tab')
      trigger.setAttribute('aria-controls', panelId)
      trigger.setAttribute('aria-selected', isSelected ? 'true' : 'false')
      trigger.dataset.state = isSelected ? 'active' : 'inactive'
      trigger.tabIndex = isSelected && !isDisabled ? 0 : -1

      if (isSelected && shouldFocus) trigger.focus()
    }

    for (let panel of panels) {
      let panelValue = panel.dataset.value
      let isSelected = panelValue === value
      let panelId = panel.id || `${rootId}-content-${safeTabsValue(panelValue)}`
      let trigger = triggers.find((item) => item.dataset.value === panelValue)

      panel.id = panelId
      panel.setAttribute('role', 'tabpanel')
      if (trigger) panel.setAttribute('aria-labelledby', trigger.id)
      panel.dataset.state = isSelected ? 'active' : 'inactive'
      panel.hidden = !isSelected
    }
  }

  function moveFrom(current: HTMLButtonElement, direction: number | 'first' | 'last', shouldActivate: boolean) {
    let enabled = getEnabledTabsTriggers(triggers)
    let index = enabled.indexOf(current)
    if (index === -1) return

    let nextIndex =
      direction === 'first'
        ? 0
        : direction === 'last'
          ? enabled.length - 1
          : (index + direction + enabled.length) % enabled.length
    let next = enabled[nextIndex]
    next.focus()
    if (shouldActivate) applySelection(next.dataset.value, false)
  }

  applySelection(selectedValue, false)
  root.dataset.radcnTabsReady = 'true'

  list.addEventListener('click', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return

    let trigger = target.closest<HTMLButtonElement>('[data-radcn-tabs-trigger]')
    if (!trigger || !list.contains(trigger) || trigger.getAttribute('aria-disabled') === 'true' || trigger.disabled) return
    applySelection(trigger.dataset.value, false)
  })

  list.addEventListener('keydown', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return

    let trigger = target.closest<HTMLButtonElement>('[data-radcn-tabs-trigger]')
    if (!trigger || !list.contains(trigger) || trigger.getAttribute('aria-disabled') === 'true' || trigger.disabled) return

    let orientation = root.dataset.orientation || 'horizontal'
    let automatic = root.dataset.activationMode !== 'manual'
    let handled = true

    switch (event.key) {
      case 'ArrowRight':
        if (orientation === 'vertical') handled = false
        else moveFrom(trigger, 1, automatic)
        break
      case 'ArrowLeft':
        if (orientation === 'vertical') handled = false
        else moveFrom(trigger, -1, automatic)
        break
      case 'ArrowDown':
        if (orientation !== 'vertical') handled = false
        else moveFrom(trigger, 1, automatic)
        break
      case 'ArrowUp':
        if (orientation !== 'vertical') handled = false
        else moveFrom(trigger, -1, automatic)
        break
      case 'Home':
        moveFrom(trigger, 'first', automatic)
        break
      case 'End':
        moveFrom(trigger, 'last', automatic)
        break
      case 'Enter':
      case ' ':
        applySelection(trigger.dataset.value, false)
        break
      default:
        handled = false
    }

    if (handled) event.preventDefault()
  })
}

export function enhanceTabs(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-tabs]').forEach(setupTabs)
}

export function Tabs(handle: Handle<TabsProps>) {
  return () => {
    let {
      activationMode = 'automatic',
      children,
      class: className,
      defaultValue,
      orientation = 'horizontal',
      style,
    } = handle.props

    return (
      <div
        class={classes('radcn-tabs', `radcn-tabs--${orientation}`, className)}
        data-activation-mode={activationMode}
        data-default-value={defaultValue}
        data-orientation={orientation}
        data-radcn-tabs
        data-value={defaultValue}
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function TabsList(handle: Handle<TabsListProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-tabs-list', className)} data-radcn-tabs-list role="tablist" style={style}>
        {children}
      </div>
    )
  }
}

export function TabsTrigger(handle: Handle<TabsTriggerProps>) {
  return () => {
    let { children, class: className, disabled, style, value } = handle.props

    return (
      <button
        aria-disabled={disabled ? 'true' : undefined}
        aria-selected="false"
        class={classes('radcn-tabs-trigger', className)}
        data-disabled={disabled ? 'true' : undefined}
        data-radcn-tabs-trigger
        data-state="inactive"
        data-value={value}
        disabled={disabled}
        role="tab"
        style={style}
        tabIndex={-1}
        type="button"
      >
        {children}
      </button>
    )
  }
}

export function TabsContent(handle: Handle<TabsContentProps>) {
  return () => {
    let { children, class: className, style, value } = handle.props

    return (
      <div
        class={classes('radcn-tabs-content', className)}
        data-radcn-tabs-content
        data-state="inactive"
        data-value={value}
        hidden
        role="tabpanel"
        style={style}
        tabIndex={0}
      >
        {children}
      </div>
    )
  }
}
