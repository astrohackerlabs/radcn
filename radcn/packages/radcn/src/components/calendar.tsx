import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { addDays, addMonths, dateFromIso, daysInCalendarMonth, fullDateLabel, isBetween, isoDate, monthLabel, sameDay, startOfMonth, weekNumber } from '../utils/date.ts'

// Calendar surfaces as Tailwind utilities (Issue 6, Experiment 58). The day-STATE
// styling propagates via CSS vars (the DAY sets --radcn-cal-day-bg/-fg/-shadow on its
// data-[selected/range-start/range-end/today/outside]; the day-button READS them) —
// a bespoke parent->child cascade onto the migrated button is unreliable (Exp 47).
// range-middle is the day's own bg utility. The style-less weekdays/week/caption-
// dropdowns/month-select/year-select classes are structural hooks (no rule, kept).
// Comments here are ASCII; no bracketed class-like tokens.
const calendarRootClass =
  'inline-grid gap-3 border border-[var(--radcn-calendar-border,var(--radcn-border))] rounded-md bg-[var(--radcn-calendar-bg,var(--radcn-background))] text-[var(--radcn-calendar-fg,var(--radcn-foreground))] p-3 [font-family:var(--radcn-font)]'
const calendarNavClass = 'flex justify-between gap-2'
const calendarNavButtonClass =
  'inline-flex w-8 h-8 items-center justify-center border border-[var(--radcn-calendar-border,var(--radcn-border))] rounded-[calc(var(--radcn-radius)-0.125rem)] bg-transparent text-inherit cursor-pointer'
const calendarMonthsClass = 'flex flex-wrap gap-4'
const calendarMonthClass = 'grid gap-2'
const calendarCaptionClass = 'text-center text-[0.875rem] font-semibold leading-[1.2] [font-family:var(--radcn-font)]'
const calendarGridClass = 'border-separate [border-spacing:0.125rem]'
const calendarWeekCellClass =
  'w-[var(--radcn-calendar-cell-size,2.25rem)] h-6 text-muted-foreground text-center text-[0.75rem] font-medium leading-none [font-family:var(--radcn-font)]'
const calendarDayClass =
  'w-[var(--radcn-calendar-cell-size,2.25rem)] h-[var(--radcn-calendar-cell-size,2.25rem)] p-0 text-center data-[selected=true]:[--radcn-cal-day-bg:var(--radcn-calendar-selected-bg,var(--radcn-primary))] data-[selected=true]:[--radcn-cal-day-fg:var(--radcn-calendar-selected-fg,var(--radcn-primary-foreground))] data-[range-start=true]:[--radcn-cal-day-bg:var(--radcn-calendar-selected-bg,var(--radcn-primary))] data-[range-start=true]:[--radcn-cal-day-fg:var(--radcn-calendar-selected-fg,var(--radcn-primary-foreground))] data-[range-end=true]:[--radcn-cal-day-bg:var(--radcn-calendar-selected-bg,var(--radcn-primary))] data-[range-end=true]:[--radcn-cal-day-fg:var(--radcn-calendar-selected-fg,var(--radcn-primary-foreground))] data-[today=true]:[--radcn-cal-day-shadow:inset_0_0_0_1px_var(--radcn-ring)] data-[outside=true]:[--radcn-cal-day-fg:var(--radcn-muted-foreground)] data-[range-middle=true]:bg-[var(--radcn-calendar-range-bg,var(--radcn-secondary))]'
const calendarDayButtonClass =
  'w-full h-full border-0 rounded-[calc(var(--radcn-radius)-0.125rem)] bg-[var(--radcn-cal-day-bg,transparent)] text-[var(--radcn-cal-day-fg,inherit)] shadow-[var(--radcn-cal-day-shadow,none)] cursor-pointer text-[0.875rem] font-normal leading-none [font-family:var(--radcn-font)] disabled:cursor-not-allowed disabled:opacity-40 data-[focused=true]:outline-2 data-[focused=true]:outline-[var(--radcn-ring)] data-[focused=true]:[outline-offset:2px] focus-visible:outline-2 focus-visible:outline-[var(--radcn-ring)] focus-visible:[outline-offset:2px]'

export type CalendarMode = 'single' | 'range'
export type CalendarCaptionLayout = 'label' | 'dropdown'

export interface CalendarProps {
  captionLayout?: CalendarCaptionLayout
  children?: RemixNode
  class?: string
  defaultMonth?: string
  defaultSelected?: string
  disabledDates?: string
  id?: string
  max?: string
  min?: string
  mode?: CalendarMode
  month?: string
  name?: string
  numberOfMonths?: number
  required?: boolean
  selected?: string
  showOutsideDays?: boolean
  showWeekNumber?: boolean
  style?: string
}

export interface CalendarPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface CalendarNavButtonProps extends CalendarPartProps {
  disabled?: boolean
  label?: string
}

export interface CalendarMonthProps extends CalendarPartProps {
  month?: string
}

export interface CalendarDayProps extends CalendarPartProps {
  date: string
  disabled?: boolean
  outside?: boolean
  rangeEnd?: boolean
  rangeMiddle?: boolean
  rangeStart?: boolean
  selected?: boolean
  today?: boolean
}

function disabledSet(value: string | undefined) {
  return new Set((value || '').split(',').map((item) => item.trim()).filter(Boolean))
}

function monthFor(props: CalendarProps) {
  return startOfMonth(dateFromIso(props.month) || dateFromIso(props.defaultMonth) || dateFromIso(props.defaultSelected) || new Date())
}

function selectedFor(props: CalendarProps) {
  return props.selected || props.defaultSelected || ''
}

function firstRangeValue(value: string) {
  return value.split('..')[0] || value
}

function calendarCaptionId(props: CalendarProps, offset: number) {
  return props.id ? `${props.id}-caption-${offset}` : undefined
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function yearsFor(month: Date, props: Pick<CalendarProps, 'max' | 'min'>) {
  let min = dateFromIso(props.min)
  let max = dateFromIso(props.max)
  let start = min ? min.getFullYear() : month.getFullYear() - 10
  let end = max ? max.getFullYear() : month.getFullYear() + 10
  return Array.from({ length: end - start + 1 }).map((_, index) => start + index)
}

function captionLayoutFor(props: CalendarProps): CalendarCaptionLayout {
  return props.captionLayout || 'label'
}

function renderCaption(month: Date, props: CalendarProps, offset: number) {
  let id = calendarCaptionId(props, offset)
  if (captionLayoutFor(props) !== 'dropdown') {
    return <div class={calendarCaptionClass} data-radcn-calendar-caption id={id}>{monthLabel(month)}</div>
  }

  return (
    <div class={calendarCaptionClass} data-radcn-calendar-caption id={id}>
      <div class="radcn-calendar-caption-dropdowns" data-radcn-calendar-caption-dropdowns>
        <select aria-label="Month" class="radcn-calendar-month-select" data-month-offset={String(offset)} data-radcn-calendar-month-select value={String(month.getMonth())}>
          {monthNames.map((name, index) => <option selected={index === month.getMonth()} value={String(index)}>{name}</option>)}
        </select>
        <select aria-label="Year" class="radcn-calendar-year-select" data-month-offset={String(offset)} data-radcn-calendar-year-select value={String(month.getFullYear())}>
          {yearsFor(month, props).map((year) => <option selected={year === month.getFullYear()} value={String(year)}>{year}</option>)}
        </select>
      </div>
    </div>
  )
}

function renderMonth(month: Date, props: CalendarProps, offset: number) {
  let selected = selectedFor(props)
  let [rangeStartValue, rangeEndValue] = selected.split('..')
  let selectedDate = dateFromIso(selected)
  let rangeStart = dateFromIso(rangeStartValue)
  let rangeEnd = dateFromIso(rangeEndValue)
  let disabled = disabledSet(props.disabledDates)
  let min = dateFromIso(props.min)
  let max = dateFromIso(props.max)
  let today = new Date()
  let days = daysInCalendarMonth(month, props.showOutsideDays !== false)

  function isDisabled(date: Date, iso: string) {
    if (disabled.has(iso)) return true
    if (min && date < min) return true
    if (max && date > max) return true
    return false
  }

  return (
    <div class={calendarMonthClass} data-month={isoDate(month).slice(0, 7)} data-radcn-calendar-month>
      {renderCaption(month, props, offset)}
      <table aria-labelledby={calendarCaptionId(props, offset)} class={calendarGridClass} data-radcn-calendar-grid role="grid">
        <thead>
          <tr class="radcn-calendar-weekdays" data-radcn-calendar-weekdays>
            {props.showWeekNumber && <th class={calendarWeekCellClass} scope="col">Wk</th>}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <th class={calendarWeekCellClass} data-radcn-calendar-weekday scope="col">{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => {
            let week = days.slice(weekIndex * 7, weekIndex * 7 + 7)
            return (
              <tr class="radcn-calendar-week" data-radcn-calendar-week>
                {props.showWeekNumber && <td class={calendarWeekCellClass} data-radcn-calendar-week-number>{weekNumber(week[0].date)}</td>}
                {week.map((day) => {
                  let selectedSingle = selectedDate ? sameDay(day.date, selectedDate) : false
                  let isRangeStart = !!rangeStart && sameDay(day.date, rangeStart)
                  let isRangeEnd = !!rangeEnd && sameDay(day.date, rangeEnd)
                  let isRangeMiddle = isBetween(day.date, rangeStart, rangeEnd)
                  let dayDisabled = isDisabled(day.date, day.iso)
                  let hidden = props.showOutsideDays === false && day.outside
                  return (
                    <td aria-selected={selectedSingle || isRangeStart || isRangeEnd ? 'true' : undefined} class={calendarDayClass} data-date={day.iso} data-disabled={dayDisabled ? 'true' : undefined} data-outside={day.outside ? 'true' : undefined} data-radcn-calendar-day data-range-end={isRangeEnd ? 'true' : undefined} data-range-middle={isRangeMiddle ? 'true' : undefined} data-range-start={isRangeStart ? 'true' : undefined} data-selected={selectedSingle || isRangeStart || isRangeEnd ? 'true' : undefined} data-today={sameDay(day.date, today) ? 'true' : undefined} role="gridcell">
                      {!hidden && <button aria-label={fullDateLabel(day.date)} class={calendarDayButtonClass} data-date={day.iso} data-disabled={dayDisabled ? 'true' : undefined} data-focused={selectedSingle || isRangeStart ? 'true' : undefined} data-radcn-calendar-day-button disabled={dayDisabled} tabIndex={selectedSingle || isRangeStart || (!selected && !day.outside && weekIndex === 0) ? 0 : -1} type="button">{day.date.getDate()}</button>}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function enhanceCalendar(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-calendar]').forEach((calendar) => {
    if (calendar.dataset.radcnCalendarReady === 'true') return
    let hidden = calendar.querySelector<HTMLInputElement>('[data-radcn-calendar-hidden-input]')
    let mode = calendar.dataset.mode || 'single'
    let selected = calendar.dataset.selected || calendar.dataset.defaultSelected || ''
    let pendingRangeStart = ''
    let month = dateFromIso(calendar.dataset.month || calendar.dataset.defaultMonth || selected) || new Date()
    let showOutsideDays = calendar.dataset.showOutsideDays !== 'false'
    let showWeekNumber = calendar.dataset.showWeekNumber === 'true'
    let captionLayout = calendar.dataset.captionLayout || 'label'
    let disabled = disabledSet(calendar.dataset.disabledDates)
    let min = dateFromIso(calendar.dataset.min)
    let max = dateFromIso(calendar.dataset.max)

    function setDataset(element: HTMLElement, key: string, value: boolean) {
      if (value) {
        element.dataset[key] = 'true'
      } else {
        delete element.dataset[key]
      }
    }

    function setAttribute(element: Element, name: string, value: string | undefined) {
      if (value === undefined) {
        element.removeAttribute(name)
      } else {
        element.setAttribute(name, value)
      }
    }

    function isDisabled(date: Date, iso: string) {
      if (disabled.has(iso)) return true
      if (min && date < min) return true
      if (max && date > max) return true
      return false
    }

    function selectedState(date: Date) {
      let [rangeStartValue, rangeEndValue] = selected.split('..')
      let selectedDate = dateFromIso(selected)
      let rangeStart = dateFromIso(rangeStartValue)
      let rangeEnd = dateFromIso(rangeEndValue)
      return {
        rangeEnd: !!rangeEnd && sameDay(date, rangeEnd),
        rangeMiddle: isBetween(date, rangeStart, rangeEnd),
        rangeStart: !!rangeStart && sameDay(date, rangeStart),
        selected: selectedDate ? sameDay(date, selectedDate) : false,
      }
    }

    function syncCaption(monthElement: HTMLElement, visibleMonth: Date) {
      let caption = monthElement.querySelector<HTMLElement>('[data-radcn-calendar-caption]')
      if (!caption) return
      if (captionLayout !== 'dropdown') {
        caption.textContent = monthLabel(visibleMonth)
        return
      }

      let monthSelect = caption.querySelector<HTMLSelectElement>('[data-radcn-calendar-month-select]')
      let yearSelect = caption.querySelector<HTMLSelectElement>('[data-radcn-calendar-year-select]')
      if (monthSelect) monthSelect.value = String(visibleMonth.getMonth())
      if (yearSelect) {
        let currentYear = String(visibleMonth.getFullYear())
        yearSelect.textContent = ''
        let years = yearsFor(visibleMonth, { max: calendar.dataset.max, min: calendar.dataset.min })
        years.forEach((year) => {
          let option = document.createElement('option')
          option.value = String(year)
          option.textContent = String(year)
          yearSelect.append(option)
        })
        yearSelect.value = currentYear
      }
    }

    function renderVisibleMonths() {
      let today = new Date()
      calendar.dataset.month = isoDate(month).slice(0, 7)
      calendar.querySelectorAll<HTMLElement>('[data-radcn-calendar-month]').forEach((monthElement, offset) => {
        let visibleMonth = addMonths(month, offset)
        let monthIso = isoDate(visibleMonth).slice(0, 7)
        let days = daysInCalendarMonth(visibleMonth, showOutsideDays)
        let caption = monthElement.querySelector<HTMLElement>('[data-radcn-calendar-caption]')
        let body = monthElement.querySelector<HTMLTableSectionElement>('tbody')
        monthElement.dataset.month = monthIso
        syncCaption(monthElement, visibleMonth)
        if (!body) return
        body.textContent = ''
        Array.from({ length: Math.ceil(days.length / 7) }).forEach((_, weekIndex) => {
          let row = document.createElement('tr')
          row.className = 'radcn-calendar-week'
          row.dataset.radcnCalendarWeek = ''
          let week = days.slice(weekIndex * 7, weekIndex * 7 + 7)
          if (showWeekNumber && week[0]) {
            let weekCell = document.createElement('td')
            weekCell.className = 'radcn-calendar-week-number'
            weekCell.dataset.radcnCalendarWeekNumber = ''
            weekCell.textContent = String(weekNumber(week[0].date))
            row.append(weekCell)
          }
          week.forEach((day) => {
            let state = selectedState(day.date)
            let dayDisabled = isDisabled(day.date, day.iso)
            let selectedOrRangeEdge = state.selected || state.rangeStart || state.rangeEnd
            let cell = document.createElement('td')
            cell.className = 'radcn-calendar-day'
            cell.dataset.date = day.iso
            cell.dataset.radcnCalendarDay = ''
            cell.setAttribute('role', 'gridcell')
            setAttribute(cell, 'aria-selected', selectedOrRangeEdge ? 'true' : undefined)
            setDataset(cell, 'disabled', dayDisabled)
            setDataset(cell, 'outside', day.outside)
            setDataset(cell, 'rangeEnd', state.rangeEnd)
            setDataset(cell, 'rangeMiddle', state.rangeMiddle)
            setDataset(cell, 'rangeStart', state.rangeStart)
            setDataset(cell, 'selected', selectedOrRangeEdge)
            setDataset(cell, 'today', sameDay(day.date, today))

            let button = document.createElement('button')
            button.className = 'radcn-calendar-day-button'
            button.dataset.date = day.iso
            button.dataset.radcnCalendarDayButton = ''
            button.setAttribute('aria-label', fullDateLabel(day.date))
            button.disabled = dayDisabled
            button.tabIndex = selectedOrRangeEdge || (!selected && !day.outside && weekIndex === 0) ? 0 : -1
            button.type = 'button'
            button.textContent = String(day.date.getDate())
            setDataset(button, 'disabled', dayDisabled)
            setDataset(button, 'focused', state.selected || state.rangeStart)
            cell.append(button)
            row.append(cell)
          })
          body.append(row)
        })
      })
    }

    function selectedButton() {
      return selected ? calendar.querySelector<HTMLButtonElement>(`[data-radcn-calendar-day-button][data-date="${CSS.escape(selected)}"]`) : null
    }

    function normalizeRange(nextValue: string) {
      if (mode !== 'range') return nextValue
      let [rangeStartValue, rangeEndValue] = selected.split('..')
      if (!pendingRangeStart && rangeStartValue && !rangeEndValue) pendingRangeStart = rangeStartValue
      if (!pendingRangeStart || rangeEndValue) {
        pendingRangeStart = nextValue
        return nextValue
      }

      let start = dateFromIso(pendingRangeStart)
      let end = dateFromIso(nextValue)
      if (start && end && end < start) {
        let value = `${nextValue}..${pendingRangeStart}`
        pendingRangeStart = ''
        return value
      }

      let value = `${pendingRangeStart}..${nextValue}`
      pendingRangeStart = ''
      return value
    }

    function syncSelected(value: string, options: { emit?: boolean; normalize?: boolean } = {}) {
      selected = options.normalize === false ? value : normalizeRange(value)
      calendar.dataset.selected = value
      renderVisibleMonths()
      calendar.dataset.selected = selected
      if (hidden) hidden.value = selected
      if (options.emit !== false) {
        calendar.dispatchEvent(new CustomEvent('radcn-calendar-select', { bubbles: true, detail: { value: selected } }))
      }
    }

    function focusButton(button: HTMLButtonElement | null) {
      if (!button || button.disabled) return
      calendar.querySelectorAll<HTMLButtonElement>('[data-radcn-calendar-day-button]').forEach((candidate) => {
        candidate.tabIndex = candidate === button ? 0 : -1
        candidate.dataset.focused = candidate === button ? 'true' : 'false'
      })
      button.focus()
    }

    function moveFocus(days: number) {
      let active = document.activeElement instanceof HTMLButtonElement ? document.activeElement : selectedButton() || calendar.querySelector<HTMLButtonElement>('[data-radcn-calendar-day-button]')
      if (!active) return
      let date = dateFromIso(active.dataset.date)
      if (!date) return
      let direction = Math.sign(days) || 1
      let step = days
      for (let attempts = 0; attempts < 42; attempts += 1) {
        let next = isoDate(addDays(date, step))
        let nextButton = calendar.querySelector<HTMLButtonElement>(`[data-radcn-calendar-day-button][data-date="${CSS.escape(next)}"]`)
        if (!nextButton) return
        if (!nextButton.disabled) {
          focusButton(nextButton)
          return
        }
        step += direction
      }
    }

    function addFocusMonths(date: Date, months: number) {
      return new Date(date.getFullYear(), date.getMonth() + months, date.getDate())
    }

    function focusVisibleDate(preferred: Date) {
      let preferredIso = isoDate(preferred)
      let button = calendar.querySelector<HTMLButtonElement>(`[data-radcn-calendar-day-button][data-date="${CSS.escape(preferredIso)}"]`)
      if (button && !button.disabled) {
        focusButton(button)
        return
      }
      let replacement = Array.from(calendar.querySelectorAll<HTMLButtonElement>('[data-radcn-calendar-day-button]')).find((candidate) => {
        let cell = candidate.closest<HTMLElement>('[data-radcn-calendar-day]')
        return !candidate.disabled && cell?.dataset.outside !== 'true'
      })
      focusButton(replacement || null)
    }

    calendar.addEventListener('click', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let previous = target.closest<HTMLElement>('[data-radcn-calendar-previous]')
      let next = target.closest<HTMLElement>('[data-radcn-calendar-next]')
      let day = target.closest<HTMLButtonElement>('[data-radcn-calendar-day-button]')
      if (previous || next) {
        event.preventDefault()
        month = addMonths(month, previous ? -1 : 1)
        renderVisibleMonths()
        calendar.dispatchEvent(new CustomEvent('radcn-calendar-month-change', { bubbles: true, detail: { month: calendar.dataset.month } }))
      } else if (day && !day.disabled) {
        event.preventDefault()
        syncSelected(day.dataset.date || '')
      }
    })

    calendar.addEventListener('change', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let monthSelect = target.closest<HTMLSelectElement>('[data-radcn-calendar-month-select]')
      let yearSelect = target.closest<HTMLSelectElement>('[data-radcn-calendar-year-select]')
      let select = monthSelect || yearSelect
      if (!select) return

      event.preventDefault()
      let offset = Number(select.dataset.monthOffset || '0')
      let visibleMonth = addMonths(month, offset)
      let owningCaption = select.closest<HTMLElement>('[data-radcn-calendar-caption]')
      let nextMonthIndex = monthSelect
        ? Number(monthSelect.value)
        : Number(owningCaption?.querySelector<HTMLSelectElement>('[data-radcn-calendar-month-select]')?.value ?? visibleMonth.getMonth())
      let nextYear = yearSelect
        ? Number(yearSelect.value)
        : Number(owningCaption?.querySelector<HTMLSelectElement>('[data-radcn-calendar-year-select]')?.value ?? visibleMonth.getFullYear())
      month = startOfMonth(new Date(nextYear, nextMonthIndex - offset, 1))
      renderVisibleMonths()
      calendar.dispatchEvent(new CustomEvent('radcn-calendar-month-change', { bubbles: true, detail: { month: calendar.dataset.month } }))
    })

    calendar.addEventListener('keydown', (event) => {
      let target = event.target
      if (!(target instanceof HTMLButtonElement) || !target.matches('[data-radcn-calendar-day-button]')) return
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        moveFocus(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        moveFocus(1)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        moveFocus(-7)
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        moveFocus(7)
      } else if (event.key === 'Home') {
        event.preventDefault()
        moveFocus(-(dateFromIso(target.dataset.date)?.getDay() || 0))
      } else if (event.key === 'End') {
        event.preventDefault()
        moveFocus(6 - (dateFromIso(target.dataset.date)?.getDay() || 0))
      } else if (event.key === 'PageUp' || event.key === 'PageDown') {
        event.preventDefault()
        let focusedDate = dateFromIso(target.dataset.date) || month
        let nextFocusedDate = addFocusMonths(focusedDate, event.key === 'PageUp' ? -1 : 1)
        month = addMonths(month, event.key === 'PageUp' ? -1 : 1)
        renderVisibleMonths()
        focusVisibleDate(nextFocusedDate)
        calendar.dispatchEvent(new CustomEvent('radcn-calendar-month-change', { bubbles: true, detail: { month: calendar.dataset.month } }))
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        syncSelected(target.dataset.date || '')
      }
    })

    calendar.addEventListener('radcn-calendar-set-value', (event) => {
      let detail = event instanceof CustomEvent ? event.detail : null
      if (typeof detail?.value !== 'string') return
      pendingRangeStart = ''
      selected = detail.value
      let visible = dateFromIso(firstRangeValue(selected))
      if (visible) month = startOfMonth(visible)
      syncSelected(selected, { emit: false, normalize: false })
    })

    hidden?.form?.addEventListener('reset', () => {
      window.setTimeout(() => syncSelected(calendar.dataset.defaultSelected || ''))
    })

    syncSelected(selected)
    calendar.dataset.radcnCalendarReady = 'true'
  })
}

export function Calendar(handle: Handle<CalendarProps>) {
  return () => {
    let props = handle.props
    let month = monthFor(props)
    let selected = selectedFor(props)
    let numberOfMonths = props.numberOfMonths || 1
    let captionLayout = captionLayoutFor(props)
    return (
      <div aria-label="Calendar" class={classes(calendarRootClass, props.class)} data-caption-layout={captionLayout} data-default-month={props.defaultMonth} data-default-selected={props.defaultSelected} data-disabled-dates={props.disabledDates} data-max={props.max} data-min={props.min} data-mode={props.mode || 'single'} data-month={isoDate(month).slice(0, 7)} data-radcn-calendar data-selected={selected} data-show-outside-days={props.showOutsideDays === false ? 'false' : 'true'} data-show-week-number={props.showWeekNumber ? 'true' : 'false'} id={props.id} style={props.style}>
        {props.name && <input data-radcn-calendar-hidden-input name={props.name} required={props.required} type="hidden" value={selected} />}
        <div class={calendarNavClass} data-radcn-calendar-nav>
          <button aria-label="Previous month" class={calendarNavButtonClass} data-radcn-calendar-previous type="button">‹</button>
          <button aria-label="Next month" class={calendarNavButtonClass} data-radcn-calendar-next type="button">›</button>
        </div>
        <div class={calendarMonthsClass} data-radcn-calendar-months>
          {Array.from({ length: numberOfMonths }).map((_, index) => renderMonth(addMonths(month, index), props, index))}
        </div>
        {props.children}
      </div>
    )
  }
}

export function CalendarMonth(handle: Handle<CalendarMonthProps>) {
  return () => {
    let { children, class: className, month, style } = handle.props
    return <div class={classes(calendarMonthClass, className)} data-month={month} data-radcn-calendar-month style={style}>{children}</div>
  }
}

export function CalendarCaption(handle: Handle<CalendarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(calendarCaptionClass, className)} data-radcn-calendar-caption style={style}>{children}</div>
  }
}

export function CalendarNav(handle: Handle<CalendarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(calendarNavClass, className)} data-radcn-calendar-nav style={style}>{children}</div>
  }
}

export function CalendarPrevious(handle: Handle<CalendarNavButtonProps>) {
  return () => {
    let { children, class: className, disabled, label = 'Previous month', style } = handle.props
    return <button aria-label={label} class={classes(calendarNavButtonClass, className)} data-radcn-calendar-previous disabled={disabled} type="button" style={style}>{children || '‹'}</button>
  }
}

export function CalendarNext(handle: Handle<CalendarNavButtonProps>) {
  return () => {
    let { children, class: className, disabled, label = 'Next month', style } = handle.props
    return <button aria-label={label} class={classes(calendarNavButtonClass, className)} data-radcn-calendar-next disabled={disabled} type="button" style={style}>{children || '›'}</button>
  }
}

export function CalendarGrid(handle: Handle<CalendarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <table class={classes(calendarGridClass, className)} data-radcn-calendar-grid role="grid" style={style}>{children}</table>
  }
}

export function CalendarWeekdays(handle: Handle<CalendarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <tr class={classes('radcn-calendar-weekdays', className)} data-radcn-calendar-weekdays style={style}>{children}</tr>
  }
}

export function CalendarWeek(handle: Handle<CalendarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <tr class={classes('radcn-calendar-week', className)} data-radcn-calendar-week style={style}>{children}</tr>
  }
}

export function CalendarDay(handle: Handle<CalendarDayProps>) {
  return () => {
    let { children, class: className, date, disabled, outside, rangeEnd, rangeMiddle, rangeStart, selected, style, today } = handle.props
    return <td aria-selected={selected ? 'true' : undefined} class={classes(calendarDayClass, className)} data-date={date} data-disabled={disabled ? 'true' : undefined} data-outside={outside ? 'true' : undefined} data-radcn-calendar-day data-range-end={rangeEnd ? 'true' : undefined} data-range-middle={rangeMiddle ? 'true' : undefined} data-range-start={rangeStart ? 'true' : undefined} data-selected={selected ? 'true' : undefined} data-today={today ? 'true' : undefined} role="gridcell" style={style}>{children}</td>
  }
}

export function CalendarDayButton(handle: Handle<CalendarDayProps>) {
  return () => {
    let { children, class: className, date, disabled, style } = handle.props
    let parsed = dateFromIso(date)
    return <button aria-label={parsed ? fullDateLabel(parsed) : date} class={classes(calendarDayButtonClass, className)} data-date={date} data-disabled={disabled ? 'true' : undefined} data-radcn-calendar-day-button disabled={disabled} type="button" style={style}>{children || parsed?.getDate() || date}</button>
  }
}
