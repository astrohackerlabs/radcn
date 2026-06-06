import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface ChartSeriesConfig {
  color?: string
  label: string
}

export type ChartConfig = Record<string, ChartSeriesConfig>

export interface ChartSeries {
  color?: string
  label?: string
  name: string
  values: number[]
}

export interface ChartContainerProps {
  ariaDescribedBy?: string
  ariaLabel?: string
  ariaLabelledby?: string
  children?: RemixNode
  class?: string
  config?: ChartConfig
  description?: string
  id?: string
  style?: string
  title?: string
}

export interface ChartBarSeriesProps {
  class?: string
  color?: string
  gridLines?: number
  height?: number
  labels?: string[]
  name?: string
  radius?: number
  series?: ChartSeries[]
  showGrid?: boolean
  showXAxis?: boolean
  values: number[]
  width?: number
}

export interface ChartLineSeriesProps {
  class?: string
  color?: string
  height?: number
  labels?: string[]
  name?: string
  values: number[]
  width?: number
}

export interface ChartLegendProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface ChartLegendItemProps {
  children?: RemixNode
  class?: string
  color?: string
  name?: string
  style?: string
}

export interface ChartTooltipProps {
  children?: RemixNode
  class?: string
  hideLabel?: boolean
  label?: string
  style?: string
}

export type ChartTooltipIndicator = 'dashed' | 'dot' | 'line' | 'none'

export interface ChartTooltipItemProps {
  class?: string
  color?: string
  hideIndicator?: boolean
  indicator?: ChartTooltipIndicator
  label: string
  name?: string
  style?: string
  value: string | number
}

function maxValue(values: number[]) {
  return Math.max(1, ...values.map((value) => (Number.isFinite(value) ? value : 0)))
}

function seriesValues(series: ChartSeries[]) {
  return series.flatMap((item) => item.values)
}

function pointLabel(labels: string[] | undefined, index: number) {
  return labels?.[index] ?? `Item ${index + 1}`
}

function chartVariables(config: ChartConfig | undefined) {
  if (!config) return undefined
  return Object.entries(config)
    .map(([key, item]) => (item.color ? `--radcn-chart-${key}: ${item.color}` : ''))
    .filter(Boolean)
    .join('; ')
}

export function ChartContainer(handle: Handle<ChartContainerProps>) {
  return () => {
    let {
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledby,
      children,
      class: className,
      config,
      description,
      id,
      style,
      title,
    } = handle.props
    let variables = chartVariables(config)
    let mergedStyle = [variables, style].filter(Boolean).join('; ') || undefined

    return (
      <figure
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabelledby ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledby}
        class={classes('radcn-chart', className)}
        data-radcn-chart
        id={id}
        role="img"
        style={mergedStyle}
      >
        {title ? <figcaption class="radcn-chart-title" data-radcn-chart-title>{title}</figcaption> : undefined}
        {description ? <p class="radcn-chart-description" data-radcn-chart-description>{description}</p> : undefined}
        {children}
      </figure>
    )
  }
}

export function ChartBarSeries(handle: Handle<ChartBarSeriesProps>) {
  return () => {
    let {
      class: className,
      color,
      gridLines = 4,
      height = 180,
      labels,
      name = 'Value',
      radius = 4,
      series,
      showGrid = false,
      showXAxis = false,
      values,
      width = 320,
    } = handle.props
    let chartSeries = series?.length ? series : [{ color, name, values }]
    let pointCount = Math.max(0, ...chartSeries.map((item) => item.values.length), labels?.length ?? 0)
    let max = maxValue(seriesValues(chartSeries))
    let paddingX = 24
    let paddingTop = 14
    let paddingBottom = showXAxis ? 34 : 24
    let innerWidth = width - paddingX * 2
    let innerHeight = height - paddingTop - paddingBottom
    let groupGap = 12
    let seriesGap = 4
    let groupWidth = pointCount > 0 ? (innerWidth - groupGap * Math.max(0, pointCount - 1)) / pointCount : 0
    let barWidth = chartSeries.length > 0 ? Math.max(3, (groupWidth - seriesGap * Math.max(0, chartSeries.length - 1)) / chartSeries.length) : 0
    let baseline = height - paddingBottom

    return (
      <svg
        aria-hidden="true"
        class={classes('radcn-chart-svg', className)}
        data-radcn-chart-svg
        data-series={chartSeries.map((item) => item.name).join(' ')}
        viewBox={`0 0 ${width} ${height}`}
      >
        {showGrid
          ? Array.from({ length: gridLines + 1 }, (_, index) => {
              let y = paddingTop + (innerHeight / gridLines) * index
              return (
                <line
                  class="radcn-chart-grid-line"
                  data-radcn-chart-grid
                  key={`grid-${index}`}
                  x1={paddingX}
                  x2={width - paddingX}
                  y1={y}
                  y2={y}
                />
              )
            })
          : undefined}
        <line class="radcn-chart-axis" x1={paddingX} x2={width - paddingX} y1={baseline} y2={baseline} />
        {Array.from({ length: pointCount }, (_, pointIndex) => {
          let groupX = paddingX + pointIndex * (groupWidth + groupGap)
          return (
            <g class="radcn-chart-bar-group" data-label={pointLabel(labels, pointIndex)} data-radcn-chart-bar-group key={`group-${pointIndex}`}>
              {chartSeries.map((item, seriesIndex) => {
                let value = item.values[pointIndex] ?? 0
                let normalized = Math.max(0, value) / max
                let barHeight = normalized * innerHeight
                let x = groupX + seriesIndex * (barWidth + seriesGap)
                let y = baseline - barHeight

                return (
                  <rect
                    aria-label={`${item.label ?? item.name} ${pointLabel(labels, pointIndex)} ${value}`}
                    class="radcn-chart-bar"
                    data-label={pointLabel(labels, pointIndex)}
                    data-radcn-chart-bar
                    data-series={item.name}
                    data-value={value}
                    fill={item.color || `var(--radcn-chart-${item.name}, var(--radcn-primary))`}
                    height={barHeight}
                    key={`${item.name}-${pointIndex}`}
                    rx={radius}
                    width={barWidth}
                    x={x}
                    y={y}
                  />
                )
              })}
              {showXAxis ? (
                <text
                  class="radcn-chart-tick"
                  data-radcn-chart-tick
                  text-anchor="middle"
                  x={groupX + groupWidth / 2}
                  y={height - 10}
                >
                  {pointLabel(labels, pointIndex)}
                </text>
              ) : undefined}
            </g>
          )
        })}
      </svg>
    )
  }
}

export function ChartLineSeries(handle: Handle<ChartLineSeriesProps>) {
  return () => {
    let { class: className, color, height = 180, labels, name = 'Value', values, width = 320 } = handle.props
    let max = maxValue(values)
    let padding = 24
    let innerWidth = width - padding * 2
    let innerHeight = height - padding * 2
    let step = values.length > 1 ? innerWidth / (values.length - 1) : 0
    let points = values.map((value, index) => {
      let x = padding + step * index
      let y = height - padding - (Math.max(0, value) / max) * innerHeight
      return { label: pointLabel(labels, index), value, x, y }
    })
    let pointString = points.map((point) => `${point.x},${point.y}`).join(' ')

    return (
      <svg
        aria-hidden="true"
        class={classes('radcn-chart-svg', className)}
        data-radcn-chart-svg
        data-series={name}
        viewBox={`0 0 ${width} ${height}`}
      >
        <line class="radcn-chart-axis" x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} />
        <polyline
          class="radcn-chart-line"
          data-radcn-chart-line
          fill="none"
          points={pointString}
          stroke={color || `var(--radcn-chart-${name}, var(--radcn-primary))`}
        />
        {points.map((point, index) => (
          <circle
            aria-label={`${point.label} ${point.value}`}
            class="radcn-chart-point"
            cx={point.x}
            cy={point.y}
            data-label={point.label}
            data-radcn-chart-point
            data-value={point.value}
            fill={color || `var(--radcn-chart-${name}, var(--radcn-primary))`}
            key={index}
            r="4"
          />
        ))}
      </svg>
    )
  }
}

export function ChartLegend(handle: Handle<ChartLegendProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-chart-legend', className)} data-radcn-chart-legend style={style}>{children}</div>
  }
}

export function ChartLegendItem(handle: Handle<ChartLegendItemProps>) {
  return () => {
    let { children, class: className, color, name, style } = handle.props
    let mergedStyle = [color ? `--radcn-chart-item-color: ${color}` : undefined, style].filter(Boolean).join('; ') || undefined

    return (
      <span class={classes('radcn-chart-legend-item', className)} data-name={name} data-radcn-chart-legend-item style={mergedStyle}>
        <span aria-hidden="true" class="radcn-chart-legend-swatch" data-radcn-chart-legend-swatch />
        {children ?? name}
      </span>
    )
  }
}

export function ChartTooltip(handle: Handle<ChartTooltipProps>) {
  return () => {
    let { children, class: className, hideLabel = false, label, style } = handle.props

    return (
      <div class={classes('radcn-chart-tooltip', className)} data-radcn-chart-tooltip data-hide-label={hideLabel ? 'true' : undefined} style={style}>
        {label && !hideLabel ? <div class="radcn-chart-tooltip-label" data-radcn-chart-tooltip-label>{label}</div> : undefined}
        {children}
      </div>
    )
  }
}

export function ChartTooltipItem(handle: Handle<ChartTooltipItemProps>) {
  return () => {
    let { class: className, color, hideIndicator = false, indicator = 'dot', label, name, style, value } = handle.props
    let resolvedIndicator = hideIndicator ? 'none' : indicator
    let mergedStyle = [color ? `--radcn-chart-item-color: ${color}` : undefined, style].filter(Boolean).join('; ') || undefined

    return (
      <div
        class={classes('radcn-chart-tooltip-item', className)}
        data-indicator={resolvedIndicator}
        data-name={name}
        data-radcn-chart-tooltip-item
        style={mergedStyle}
      >
        {resolvedIndicator !== 'none' ? (
          <span
            aria-hidden="true"
            class={classes('radcn-chart-tooltip-swatch', `radcn-chart-tooltip-swatch--${resolvedIndicator}`)}
            data-radcn-chart-tooltip-swatch
          />
        ) : undefined}
        <span data-radcn-chart-tooltip-name>{label}</span>
        <span data-radcn-chart-tooltip-value>{value}</span>
      </div>
    )
  }
}
