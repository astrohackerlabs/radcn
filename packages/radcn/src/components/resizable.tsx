import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type ResizableOrientation = 'horizontal' | 'vertical'

export interface ResizablePanelGroupProps {
  children?: RemixNode
  class?: string
  id?: string
  orientation?: ResizableOrientation
  style?: string
}

export interface ResizablePanelProps {
  children?: RemixNode
  class?: string
  defaultSize?: number
  id?: string
  minSize?: number
  style?: string
}

export interface ResizableHandleProps {
  class?: string
  disabled?: boolean
  label?: string
  style?: string
  withHandle?: boolean
}

function clamp(value: number, min = 10, max = 90) {
  return Math.max(min, Math.min(max, value))
}

function setupResizableGroup(group: HTMLElement) {
  if (group.dataset.radcnResizableReady === 'true') return
  let orientation = group.dataset.orientation === 'vertical' ? 'vertical' : 'horizontal'
  let panels = Array.from(group.querySelectorAll<HTMLElement>('[data-radcn-resizable-panel]'))
  let handles = Array.from(group.querySelectorAll<HTMLElement>('[data-radcn-resizable-handle]'))
  if (panels.length === 0) return

  function applySizes(sizes: number[]) {
    let total = sizes.reduce((sum, size) => sum + size, 0) || 100
    panels.forEach((panel, index) => {
      let next = (sizes[index] / total) * 100
      panel.dataset.size = String(Math.round(next))
      panel.style.flexBasis = `${next}%`
    })
    handles.forEach((handle, index) => {
      let previous = panels[index]
      handle.setAttribute('aria-valuenow', previous?.dataset.size || '50')
    })
  }

  function currentSizes() {
    return panels.map((panel) => Number(panel.dataset.size || panel.style.flexBasis.replace('%', '') || '50'))
  }

  function emitChange(index: number, sizes: number[]) {
    group.dispatchEvent(new CustomEvent('radcn-resizable-change', { bubbles: true, detail: { index, sizes } }))
  }

  handles.forEach((handle, index) => {
    if (handle.dataset.disabled === 'true') return
    handle.tabIndex = 0
    handle.setAttribute('aria-orientation', orientation)
    handle.setAttribute('aria-valuemin', '10')
    handle.setAttribute('aria-valuemax', '90')
    handle.setAttribute('aria-valuenow', panels[index]?.dataset.size || '50')

    function resize(delta: number) {
      let sizes = currentSizes()
      let previous = sizes[index]
      let next = sizes[index + 1]
      if (previous === undefined || next === undefined) return
      let total = previous + next
      let nextPrevious = clamp(previous + delta)
      let nextNext = clamp(total - nextPrevious)
      sizes[index] = nextPrevious
      sizes[index + 1] = nextNext
      applySizes(sizes)
      emitChange(index, sizes)
    }

    handle.addEventListener('keydown', (event) => {
      let amount = event.shiftKey ? 10 : 5
      if (event.key === 'Home') {
        event.preventDefault()
        resize(-100)
      } else if (event.key === 'End') {
        event.preventDefault()
        resize(100)
      } else if ((orientation === 'horizontal' && event.key === 'ArrowLeft') || (orientation === 'vertical' && event.key === 'ArrowUp')) {
        event.preventDefault()
        resize(-amount)
      } else if ((orientation === 'horizontal' && event.key === 'ArrowRight') || (orientation === 'vertical' && event.key === 'ArrowDown')) {
        event.preventDefault()
        resize(amount)
      }
    })

    handle.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return
      event.preventDefault()
      handle.setPointerCapture(event.pointerId)
      let start = orientation === 'horizontal' ? event.clientX : event.clientY
      let rect = group.getBoundingClientRect()
      let span = orientation === 'horizontal' ? rect.width : rect.height
      let startSizes = currentSizes()

      function move(moveEvent: PointerEvent) {
        let current = orientation === 'horizontal' ? moveEvent.clientX : moveEvent.clientY
        let delta = ((current - start) / span) * 100
        let previous = startSizes[index]
        let next = startSizes[index + 1]
        if (previous === undefined || next === undefined) return
        let total = previous + next
        let sizes = [...startSizes]
        let nextPrevious = clamp(previous + delta)
        sizes[index] = nextPrevious
        sizes[index + 1] = clamp(total - nextPrevious)
        applySizes(sizes)
        emitChange(index, sizes)
      }

      function up(upEvent: PointerEvent) {
        handle.releasePointerCapture(upEvent.pointerId)
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
      }

      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
    })
  })

  applySizes(currentSizes())
  group.dataset.radcnResizableReady = 'true'
}

export function enhanceResizable(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-resizable-panel-group]').forEach(setupResizableGroup)
}

export function ResizablePanelGroup(handle: Handle<ResizablePanelGroupProps>) {
  return () => {
    let { children, class: className, id, orientation = 'horizontal', style } = handle.props
    return (
      <div class={classes('radcn-resizable-panel-group', `radcn-resizable-panel-group--${orientation}`, className)} data-orientation={orientation} data-radcn-resizable-panel-group id={id} style={style}>
        {children}
      </div>
    )
  }
}

export function ResizablePanel(handle: Handle<ResizablePanelProps>) {
  return () => {
    let { children, class: className, defaultSize = 50, id, minSize = 10, style } = handle.props
    let size = clamp(defaultSize, minSize, 100 - minSize)
    return (
      <div class={classes('radcn-resizable-panel', className)} data-min-size={minSize} data-radcn-resizable-panel data-size={size} id={id} style={[`flex-basis:${size}%`, style].filter(Boolean).join('; ')}>
        {children}
      </div>
    )
  }
}

export function ResizableHandle(handle: Handle<ResizableHandleProps>) {
  return () => {
    let { class: className, disabled, label = 'Resize panels', style, withHandle } = handle.props
    return (
      <div aria-disabled={disabled ? 'true' : undefined} aria-label={label} class={classes('radcn-resizable-handle', className)} data-disabled={disabled ? 'true' : undefined} data-radcn-resizable-handle role="separator" style={style}>
        {withHandle ? <span aria-hidden="true" class="radcn-resizable-handle-grip" data-radcn-resizable-handle-grip>⋮</span> : undefined}
      </div>
    )
  }
}
