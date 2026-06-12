import type { Handle, RemixNode } from 'remix/ui'

import { Calendar, type CalendarMode } from './calendar.tsx'
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from './popover.tsx'
import { classes } from '../utils/classes.ts'

// DatePicker surfaces as Tailwind utilities (Issue 6, Experiments 57 and 74).
// Root/icon/preset-select plus trigger/content overrides emit utilities; comments here
// are ASCII.
const datePickerRootClass =
  'inline-grid w-[min(100%,var(--radcn-date-picker-width,18rem))] gap-2 text-foreground [font-family:var(--radcn-font)]'
const datePickerTriggerClass = 'w-full justify-start'
const datePickerContentClass = 'w-auto p-2'
const datePickerIconClass = 'text-muted-foreground text-[0.75rem] font-semibold leading-none [font-family:var(--radcn-font)]'
const datePickerPresetSelectClass =
  'w-full h-[var(--radcn-control-height)] mb-2 border border-[var(--radcn-input)] rounded-md bg-background text-foreground px-3 py-0 text-[0.875rem] leading-[1.35] [font-family:var(--radcn-font)]'
import { addDays, dateFromIso, isoDate } from '../utils/date.ts'

export interface DatePickerPreset {
  label: string
  offsetDays?: number
  value?: string
}

export interface DatePickerProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  defaultValue?: string
  disabled?: boolean
  id?: string
  max?: string
  min?: string
  mode?: CalendarMode
  month?: string
  name?: string
  numberOfMonths?: number
  placeholder?: string
  presets?: DatePickerPreset[]
  required?: boolean
  style?: string
  value?: string
}

function firstRangeValue(value: string) {
  return value.split('..')[0] || value
}

function formatDate(value: string) {
  let date = dateFromIso(value)
  return date ? date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : value
}

function formatDatePickerValue(value: string, placeholder: string) {
  if (!value) return placeholder
  let [from, to] = value.split('..')
  if (to) return `${formatDate(from)} - ${formatDate(to)}`
  return formatDate(from)
}

function presetValue(preset: DatePickerPreset) {
  if (preset.value) return preset.value
  if (typeof preset.offsetDays === 'number') return isoDate(addDays(new Date(), preset.offsetDays))
  return ''
}

export function enhanceDatePicker(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-date-picker]').forEach((datePicker) => {
    if (datePicker.dataset.radcnDatePickerReady === 'true') return

    let hidden = datePicker.querySelector<HTMLInputElement>('[data-radcn-date-picker-hidden-input]')
    let label = datePicker.querySelector<HTMLElement>('[data-radcn-date-picker-label]')
    let calendar = datePicker.querySelector<HTMLElement>('[data-radcn-calendar]')
    let presetSelect = datePicker.querySelector<HTMLSelectElement>('[data-radcn-date-picker-preset-select]')
    let defaultValue = datePicker.dataset.defaultValue || ''
    let mode = datePicker.dataset.mode || 'single'
    let placeholder = datePicker.dataset.placeholder || 'Pick a date'
    let disabled = datePicker.dataset.disabled === 'true'
    let value = datePicker.dataset.value || defaultValue

    function closePopover() {
      let popover = datePicker.querySelector<HTMLElement>('[data-radcn-popover]')
      if (!popover) return
      let trigger = popover.querySelector<HTMLElement>('[data-radcn-popover-trigger]')
      let portal = document.querySelector<HTMLElement>(`[data-radcn-popover-portal][data-overlay-id="${CSS.escape(popover.id)}"]`)
      let content = portal?.querySelector<HTMLElement>('[data-radcn-popover-content]')

      popover.dataset.state = 'closed'
      popover.dataset.open = 'false'
      if (trigger) {
        trigger.dataset.state = 'closed'
        trigger.setAttribute('aria-expanded', 'false')
      }
      if (portal) {
        portal.dataset.state = 'closed'
        portal.hidden = true
      }
      if (content) {
        content.dataset.state = 'closed'
        content.hidden = true
      }
    }

    function sync(nextValue: string) {
      value = nextValue
      datePicker.dataset.value = value
      if (hidden) hidden.value = value
      if (label) label.textContent = formatDatePickerValue(value, placeholder)
      if (presetSelect) presetSelect.value = value
      calendar?.dispatchEvent(new CustomEvent('radcn-calendar-set-value', { bubbles: true, detail: { value } }))
      datePicker.dispatchEvent(new CustomEvent('radcn-date-picker-change', { bubbles: true, detail: { value } }))
    }

    calendar?.addEventListener('radcn-calendar-select', (event) => {
      if (disabled) return
      let detail = event instanceof CustomEvent ? event.detail : null
      if (detail?.value) {
        sync(detail.value)
        if (mode !== 'range' || String(detail.value).includes('..')) closePopover()
      }
    })

    presetSelect?.addEventListener('change', () => {
      if (disabled) return
      sync(presetSelect.value)
    })

    hidden?.form?.addEventListener('reset', () => {
      window.setTimeout(() => sync(defaultValue))
    })

    sync(value)
    datePicker.dataset.radcnDatePickerReady = 'true'
  })
}

export function DatePicker(handle: Handle<DatePickerProps>) {
  return () => {
    let {
      children,
      class: className,
      defaultOpen,
      defaultValue,
      disabled,
      id,
      max,
      min,
      mode = 'single',
      month,
      name,
      numberOfMonths = mode === 'range' ? 2 : 1,
      placeholder = 'Pick a date',
      presets = [],
      required,
      style,
      value,
    } = handle.props
    let selected = value ?? defaultValue ?? ''
    let calendarMonth = month ?? firstRangeValue(selected)

    return (
      <div
        class={classes(datePickerRootClass, className)}
        data-default-value={defaultValue ?? ''}
        data-disabled={disabled ? 'true' : undefined}
        data-mode={mode}
        data-placeholder={placeholder}
        data-radcn-date-picker
        data-value={selected}
        id={id}
        style={style}
      >
        {name && <input data-radcn-date-picker-hidden-input name={name} required={required} type="hidden" value={selected} />}
        <Popover defaultOpen={defaultOpen} id={id ? `${id}-popover` : undefined}>
          <PopoverTrigger class={classes('radcn-button radcn-button--outline radcn-button--default', datePickerTriggerClass)} disabled={disabled}>
            <span aria-hidden="true" class={datePickerIconClass} data-radcn-date-picker-icon>[]</span>
            <span data-radcn-date-picker-label>{formatDatePickerValue(selected, placeholder)}</span>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent class={datePickerContentClass}>
              {presets.length > 0 && (
                <select class={datePickerPresetSelectClass} data-radcn-date-picker-preset-select disabled={disabled}>
                  <option value="">Select</option>
                  {presets.map((preset) => {
                    let optionValue = presetValue(preset)
                    return <option selected={optionValue === selected} value={optionValue}>{preset.label}</option>
                  })}
                </select>
              )}
              <Calendar
                defaultMonth={calendarMonth}
                defaultSelected={selected}
                max={max}
                min={min}
                mode={mode}
                numberOfMonths={numberOfMonths}
                selected={selected}
              />
              {children}
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </div>
    )
  }
}
