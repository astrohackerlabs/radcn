import type { Handle } from 'remix/ui'
import { createElement, css } from 'remix/ui'
import Copy from 'lucide-static/dist/esm/icons/copy.mjs'
import Monitor from 'lucide-static/dist/esm/icons/monitor.mjs'
import Moon from 'lucide-static/dist/esm/icons/moon.mjs'
import Sun from 'lucide-static/dist/esm/icons/sun.mjs'

type IconSize = number | string

export interface DocsIconProps {
  className?: string
  decorative?: boolean
  label?: string
  mix?: unknown
  size?: IconSize
  strokeWidth?: number
  style?: Record<string, number | string | undefined>
}

export const docsIconStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 auto',
  width: '1em',
  height: '1em',
  color: 'currentColor',
  lineHeight: 1,
  '& svg': {
    display: 'block',
    width: '100%',
    height: '100%',
    flex: '0 0 auto',
  },
})

export const CopyIcon = createLucideIcon(Copy)
export const MonitorIcon = createLucideIcon(Monitor)
export const MoonIcon = createLucideIcon(Moon)
export const SunIcon = createLucideIcon(Sun)

function createLucideIcon(svg: string) {
  return function DocsIcon(handle: Handle<DocsIconProps>) {
    return () => {
      let {
        className,
        decorative = true,
        label,
        mix,
        size,
        strokeWidth,
        style,
      } = handle.props
      let accessible = !decorative && label

      return createElement('span', {
        'aria-hidden': accessible ? undefined : 'true',
        'aria-label': accessible ? label : undefined,
        className,
        innerHTML: prepareLucideSvg(svg, strokeWidth),
        mix: [docsIconStyle, mix],
        role: accessible ? 'img' : undefined,
        style: size
          ? {
              ...style,
              width: formatIconSize(size),
              height: formatIconSize(size),
            }
          : style,
      })
    }
  }
}

function prepareLucideSvg(svg: string, strokeWidth?: number) {
  let prepared = svg
    .trim()
    .replace('<svg', '<svg aria-hidden="true" focusable="false"')
    .replace(/<\/script/gi, '<\\/script')

  return strokeWidth === undefined
    ? prepared
    : prepared.replace(/stroke-width="[^"]+"/, `stroke-width="${strokeWidth}"`)
}

function formatIconSize(size: IconSize) {
  return typeof size === 'number' ? `${size}px` : size
}
