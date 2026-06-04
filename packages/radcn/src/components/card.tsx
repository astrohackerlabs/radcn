import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type CardSize = 'default' | 'sm'

export interface CardProps {
  children?: RemixNode
  class?: string
  size?: CardSize
  style?: string
}

export interface CardPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export function Card(handle: Handle<CardProps>) {
  return () => {
    let { children, class: className, size = 'default', style } = handle.props

    return (
      <div class={classes('radcn-card', `radcn-card--${size}`, className)} data-radcn-card data-size={size} style={style}>
        {children}
      </div>
    )
  }
}

export function CardHeader(handle: Handle<CardPartProps>) {
  return () => cardPart('radcn-card-header', 'data-radcn-card-header', handle.props)
}

export function CardTitle(handle: Handle<CardPartProps>) {
  return () => cardPart('radcn-card-title', 'data-radcn-card-title', handle.props)
}

export function CardDescription(handle: Handle<CardPartProps>) {
  return () => cardPart('radcn-card-description', 'data-radcn-card-description', handle.props)
}

export function CardAction(handle: Handle<CardPartProps>) {
  return () => cardPart('radcn-card-action', 'data-radcn-card-action', handle.props)
}

export function CardContent(handle: Handle<CardPartProps>) {
  return () => cardPart('radcn-card-content', 'data-radcn-card-content', handle.props)
}

export function CardFooter(handle: Handle<CardPartProps>) {
  return () => cardPart('radcn-card-footer', 'data-radcn-card-footer', handle.props)
}

function cardPart(className: string, dataAttribute: string, props: CardPartProps) {
  let { children, class: extraClass, style } = props

  return (
    <div class={classes(className, extraClass)} {...{ [dataAttribute]: true }} style={style}>
      {children}
    </div>
  )
}
