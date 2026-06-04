import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface SliderProps {
  ariaLabel?: string
  class?: string
  defaultValue?: number
  disabled?: boolean
  id?: string
  max?: number
  min?: number
  name?: string
  step?: number
  style?: string
  value?: number
}

function sliderPercent(input: HTMLInputElement) {
  let min = Number(input.min || 0)
  let max = Number(input.max || 100)
  let value = Number(input.value || min)
  if (max <= min) return 0
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
}

function syncSlider(root: HTMLElement, input: HTMLInputElement) {
  if (input.disabled) return
  root.dataset.value = input.value
  root.style.setProperty('--radcn-slider-percent', `${sliderPercent(input)}%`)
}

function setupSlider(root: HTMLElement) {
  if (root.dataset.radcnSliderReady === 'true') return

  let input = root.querySelector<HTMLInputElement>('[data-radcn-slider-input]')
  if (!input) return

  if (!input.disabled) syncSlider(root, input)
  root.dataset.radcnSliderReady = 'true'

  input.addEventListener('input', () => syncSlider(root, input))
  input.form?.addEventListener('reset', () => {
    requestAnimationFrame(() => syncSlider(root, input))
  })
}

export function enhanceSlider(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-slider]').forEach(setupSlider)
}

export function Slider(handle: Handle<SliderProps>) {
  return () => {
    let {
      ariaLabel = 'Slider',
      class: className,
      defaultValue,
      disabled,
      id,
      max = 100,
      min = 0,
      name,
      step = 1,
      style,
      value,
    } = handle.props
    let currentValue = value ?? defaultValue ?? min
    let percent = max <= min ? 0 : Math.max(0, Math.min(100, ((currentValue - min) / (max - min)) * 100))

    return (
      <span
        class={classes('radcn-slider', className)}
        data-disabled={disabled ? 'true' : undefined}
        data-max={String(max)}
        data-min={String(min)}
        data-orientation="horizontal"
        data-radcn-slider
        data-step={String(step)}
        data-value={String(currentValue)}
        style={`--radcn-slider-percent:${percent}%;${style ?? ''}`}
      >
        <input
          aria-label={ariaLabel}
          class="radcn-slider-input"
          data-radcn-slider-input
          defaultValue={value === undefined ? currentValue : undefined}
          disabled={disabled}
          id={id}
          max={max}
          min={min}
          name={name}
          step={step}
          type="range"
          value={value}
        />
        <span aria-hidden="true" class="radcn-slider-track" data-radcn-slider-track>
          <span class="radcn-slider-range" data-radcn-slider-range />
        </span>
        <span aria-hidden="true" class="radcn-slider-thumb" data-radcn-slider-thumb />
      </span>
    )
  }
}
