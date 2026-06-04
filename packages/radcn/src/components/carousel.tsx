import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type CarouselOrientation = 'horizontal' | 'vertical'

export interface CarouselProps {
  ariaLabel?: string
  ariaLabelledby?: string
  children?: RemixNode
  class?: string
  defaultIndex?: number
  id?: string
  loop?: boolean
  orientation?: CarouselOrientation
  slideCount?: number
  style?: string
}

export interface CarouselContentProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface CarouselItemProps {
  ariaLabel?: string
  ariaLabelledby?: string
  children?: RemixNode
  class?: string
  index?: number
  selected?: boolean
  style?: string
}

export interface CarouselControlProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  label?: string
  style?: string
}

function safeIndex(value: number | undefined) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0
  return Math.max(0, Math.floor(value))
}

function setupCarousel(root: HTMLElement) {
  if (root.dataset.radcnCarouselReady === 'true') return

  let viewport = root.querySelector<HTMLElement>('[data-radcn-carousel-content]')
  let items = Array.from(root.querySelectorAll<HTMLElement>('[data-radcn-carousel-item]'))
  let previous = root.querySelector<HTMLButtonElement>('[data-radcn-carousel-previous]')
  let next = root.querySelector<HTMLButtonElement>('[data-radcn-carousel-next]')
  if (!viewport || items.length === 0) return
  let viewportElement = viewport

  let orientation = root.dataset.orientation === 'vertical' ? 'vertical' : 'horizontal'
  let loop = root.dataset.loop === 'true'
  let index = Math.min(safeIndex(Number(root.dataset.index || root.dataset.defaultIndex || '0')), items.length - 1)
  let scrollFrame = 0

  function canGoPrevious() {
    return loop || index > 0
  }

  function canGoNext() {
    return loop || index < items.length - 1
  }

  function scrollToIndex(value: number, behavior: ScrollBehavior = 'auto', shouldFocus = false) {
    let nextIndex = value
    if (loop) {
      nextIndex = (nextIndex + items.length) % items.length
    } else {
      nextIndex = Math.max(0, Math.min(nextIndex, items.length - 1))
    }

    let item = items[nextIndex]
    if (!item) return
    let left = orientation === 'horizontal' ? item.offsetLeft : viewportElement.scrollLeft
    let top = orientation === 'vertical' ? item.offsetTop : viewportElement.scrollTop
    viewportElement.scrollTo({ left, top, behavior })
    applyIndex(nextIndex, value > index ? 'next' : value < index ? 'previous' : root.dataset.motion || 'idle')
    if (shouldFocus) item.focus()
  }

  function nearestIndex() {
    let current = orientation === 'horizontal' ? viewportElement.scrollLeft : viewportElement.scrollTop
    let nearest = 0
    let distance = Number.POSITIVE_INFINITY
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      let item = items[itemIndex]
      let position = orientation === 'horizontal' ? item.offsetLeft : item.offsetTop
      let nextDistance = Math.abs(position - current)
      if (nextDistance < distance) {
        nearest = itemIndex
        distance = nextDistance
      }
    }
    return nearest
  }

  function applyIndex(value: number, motion: string) {
    index = Math.max(0, Math.min(value, items.length - 1))
    root.dataset.index = String(index)
    root.dataset.current = String(index + 1)
    root.dataset.count = String(items.length)
    root.dataset.canPrevious = canGoPrevious() ? 'true' : 'false'
    root.dataset.canNext = canGoNext() ? 'true' : 'false'
    root.dataset.motion = motion

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      let item = items[itemIndex]
      let selected = itemIndex === index
      item.dataset.index = String(itemIndex)
      item.dataset.selected = selected ? 'true' : 'false'
      item.setAttribute('aria-label', item.getAttribute('aria-label') || `Slide ${itemIndex + 1} of ${items.length}`)
      item.tabIndex = selected ? 0 : -1
    }

    if (previous && previous.dataset.disabledOverride !== 'true') {
      previous.disabled = !canGoPrevious()
      previous.dataset.disabled = previous.disabled ? 'true' : 'false'
    }
    if (next && next.dataset.disabledOverride !== 'true') {
      next.disabled = !canGoNext()
      next.dataset.disabled = next.disabled ? 'true' : 'false'
    }

    root.dispatchEvent(new CustomEvent('radcn-carousel-select', { bubbles: true, detail: { index, current: index + 1 } }))
  }

  function move(delta: number, behavior: ScrollBehavior = 'auto', shouldFocus = false) {
    scrollToIndex(index + delta, behavior, shouldFocus)
  }

  root.addEventListener('click', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return
    if (target.closest('[data-radcn-carousel-previous]')) {
      event.preventDefault()
      move(-1)
    } else if (target.closest('[data-radcn-carousel-next]')) {
      event.preventDefault()
      move(1)
    }
  })

  root.addEventListener('keydown', (event) => {
    let handled = true
    if (event.key === 'Home') {
      scrollToIndex(0, 'auto', true)
    } else if (event.key === 'End') {
      scrollToIndex(items.length - 1, 'auto', true)
    } else if (orientation === 'horizontal' && event.key === 'ArrowLeft') {
      move(-1, 'smooth', true)
    } else if (orientation === 'horizontal' && event.key === 'ArrowRight') {
      move(1, 'smooth', true)
    } else if (orientation === 'vertical' && event.key === 'ArrowUp') {
      move(-1, 'smooth', true)
    } else if (orientation === 'vertical' && event.key === 'ArrowDown') {
      move(1, 'smooth', true)
    } else {
      handled = false
    }
    if (handled) event.preventDefault()
  })

  viewportElement.addEventListener('scroll', () => {
    if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
    scrollFrame = window.requestAnimationFrame(() => {
      let nextIndex = nearestIndex()
      let motion = nextIndex > index ? 'next' : nextIndex < index ? 'previous' : 'idle'
      applyIndex(nextIndex, motion)
      root.dispatchEvent(new CustomEvent('radcn-carousel-scroll', { bubbles: true, detail: { index: nextIndex, current: nextIndex + 1 } }))
    })
  })

  applyIndex(index, 'idle')
  scrollToIndex(index)
  root.dataset.radcnCarouselReady = 'true'
}

export function enhanceCarousel(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-carousel]').forEach(setupCarousel)
}

export function Carousel(handle: Handle<CarouselProps>) {
  return () => {
    let {
      ariaLabel = 'Carousel',
      ariaLabelledby,
      children,
      class: className,
      defaultIndex = 0,
      id,
      loop = false,
      orientation = 'horizontal',
      slideCount,
      style,
    } = handle.props
    let index = safeIndex(defaultIndex)

    return (
      <div
        aria-label={ariaLabelledby ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-roledescription="carousel"
        class={classes('radcn-carousel', `radcn-carousel--${orientation}`, className)}
        data-count={slideCount}
        data-default-index={index}
        data-index={index}
        data-loop={loop ? 'true' : 'false'}
        data-orientation={orientation}
        data-radcn-carousel
        id={id}
        role="region"
        style={style}
        tabIndex={0}
      >
        {children}
      </div>
    )
  }
}

export function CarouselContent(handle: Handle<CarouselContentProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-carousel-content', className)} data-radcn-carousel-content style={style}>
        <div class="radcn-carousel-track" data-radcn-carousel-track>
          {children}
        </div>
      </div>
    )
  }
}

export function CarouselItem(handle: Handle<CarouselItemProps>) {
  return () => {
    let { ariaLabel, ariaLabelledby, children, class: className, index, selected = false, style } = handle.props

    return (
      <div
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-roledescription="slide"
        class={classes('radcn-carousel-item', className)}
        data-index={index}
        data-radcn-carousel-item
        data-selected={selected ? 'true' : 'false'}
        role="group"
        style={style}
        tabIndex={selected ? 0 : -1}
      >
        {children}
      </div>
    )
  }
}

export function CarouselPrevious(handle: Handle<CarouselControlProps>) {
  return () => {
    let { children, class: className, disabled, label = 'Previous slide', style } = handle.props

    return (
      <button
        aria-label={label}
        class={classes('radcn-carousel-previous', className)}
        data-disabled={disabled ? 'true' : undefined}
        data-disabled-override={disabled ? 'true' : undefined}
        data-radcn-carousel-previous
        disabled={disabled}
        style={style}
        type="button"
      >
        {children || '‹'}
      </button>
    )
  }
}

export function CarouselNext(handle: Handle<CarouselControlProps>) {
  return () => {
    let { children, class: className, disabled, label = 'Next slide', style } = handle.props

    return (
      <button
        aria-label={label}
        class={classes('radcn-carousel-next', className)}
        data-disabled={disabled ? 'true' : undefined}
        data-disabled-override={disabled ? 'true' : undefined}
        data-radcn-carousel-next
        disabled={disabled}
        style={style}
        type="button"
      >
        {children || '›'}
      </button>
    )
  }
}
