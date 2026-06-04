import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type ItemVariant = 'default' | 'outline' | 'muted'
export type ItemSize = 'default' | 'sm' | 'xs'
export type ItemMediaVariant = 'default' | 'icon' | 'image'

export interface ItemGroupProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface ItemProps {
  children?: RemixNode
  class?: string
  size?: ItemSize
  style?: string
  variant?: ItemVariant
}

export interface ItemPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface ItemMediaProps extends ItemPartProps {
  variant?: ItemMediaVariant
}

export function ItemGroup(handle: Handle<ItemGroupProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-item-group', className)} data-radcn-item-group role="list" style={style}>
        {children}
      </div>
    )
  }
}

export function Item(handle: Handle<ItemProps>) {
  return () => {
    let { children, class: className, size = 'default', style, variant = 'default' } = handle.props

    return (
      <div
        class={classes('radcn-item', `radcn-item--${variant}`, `radcn-item--${size}`, className)}
        data-radcn-item
        data-size={size}
        data-variant={variant}
        role="listitem"
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function ItemMedia(handle: Handle<ItemMediaProps>) {
  return () => {
    let { children, class: className, style, variant = 'default' } = handle.props

    return (
      <div
        class={classes('radcn-item-media', `radcn-item-media--${variant}`, className)}
        data-radcn-item-media
        data-variant={variant}
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function ItemContent(handle: Handle<ItemPartProps>) {
  return () => itemPart('radcn-item-content', 'data-radcn-item-content', handle.props)
}

export function ItemTitle(handle: Handle<ItemPartProps>) {
  return () => itemPart('radcn-item-title', 'data-radcn-item-title', handle.props)
}

export function ItemDescription(handle: Handle<ItemPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <p class={classes('radcn-item-description', className)} data-radcn-item-description style={style}>
        {children}
      </p>
    )
  }
}

export function ItemActions(handle: Handle<ItemPartProps>) {
  return () => itemPart('radcn-item-actions', 'data-radcn-item-actions', handle.props)
}

export function ItemHeader(handle: Handle<ItemPartProps>) {
  return () => itemPart('radcn-item-header', 'data-radcn-item-header', handle.props)
}

export function ItemFooter(handle: Handle<ItemPartProps>) {
  return () => itemPart('radcn-item-footer', 'data-radcn-item-footer', handle.props)
}

export function ItemSeparator(handle: Handle<ItemPartProps>) {
  return () => {
    let { class: className, style } = handle.props

    return <div class={classes('radcn-item-separator', className)} data-radcn-item-separator role="separator" style={style} />
  }
}

function itemPart(className: string, dataAttribute: string, props: ItemPartProps) {
  let { children, class: extraClass, style } = props

  return (
    <div class={classes(className, extraClass)} {...{ [dataAttribute]: true }} style={style}>
      {children}
    </div>
  )
}
