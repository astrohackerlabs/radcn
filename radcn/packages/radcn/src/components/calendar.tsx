import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { addDays, addMonths, dateFromIso, daysInCalendarMonth, fullDateLabel, isBetween, isoDate, monthLabel, sameDay, startOfMonth, weekNumber } from '../utils/date.ts'

export type CalendarMode = 'single' | 'range'

export interface CalendarProps {
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
    <div class="radcn-calendar-month" data-month={isoDate(month).slice(0, 7)} data-radcn-calendar-month>
      <div class="radcn-calendar-caption" data-radcn-calendar-caption id={calendarCaptionId(props, offset)}>{monthLabel(month)}</div>
      <table aria-labelledby={calendarCaptionId(props, offset)} class="radcn-calendar-grid" data-radcn-calendar-grid role="grid">
        <thead>
          <tr class="radcn-calendar-weekdays" data-radcn-calendar-weekdays>
            {props.showWeekNumber && <th class="radcn-calendar-week-number-header" scope="col">Wk</th>}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <th class="radcn-calendar-weekday" data-radcn-calendar-weekday scope="col">{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => {
            let week = days.slice(weekIndex * 7, weekIndex * 7 + 7)
            return (
              <tr class="radcn-calendar-week" data-radcn-calendar-week>
                {props.showWeekNumber && <td class="radcn-calendar-week-number" data-radcn-calendar-week-number>{weekNumber(week[0].date)}</td>}
                {week.map((day) => {
                  let selectedSingle = selectedDate ? sameDay(day.date, selectedDate) : false
                  let isRangeStart = !!rangeStart && sameDay(day.date, rangeStart)
                  let isRangeEnd = !!rangeEnd && sameDay(day.date, rangeEnd)
                  let isRangeMiddle = isBetween(day.date, rangeStart, rangeEnd)
                  let dayDisabled = isDisabled(day.date, day.iso)
                  let hidden = props.showOutsideDays === false && day.outside
                  return (
                    <td aria-selected={selectedSingle || isRangeStart || isRangeEnd ? 'true' : undefined} class="radcn-calendar-day" data-date={day.iso} data-disabled={dayDisabled ? 'true' : undefined} data-outside={day.outside ? 'true' : undefined} data-radcn-calendar-day data-range-end={isRangeEnd ? 'true' : undefined} data-range-middle={isRangeMiddle ? 'true' : undefined} data-range-start={isRangeStart ? 'true' : undefined} data-selected={selectedSingle || isRangeStart || isRangeEnd ? 'true' : undefined} data-today={sameDay(day.date, today) ? 'true' : undefined} role="gridcell">
                      {!hidden && <button aria-label={fullDateLabel(day.date)} class="radcn-calendar-day-button" data-date={day.iso} data-disabled={dayDisabled ? 'true' : undefined} data-focused={selectedSingle || isRangeStart ? 'true' : undefined} data-radcn-calendar-day-button disabled={dayDisabled} tabIndex={selectedSingle || isRangeStart || (!selected && !day.outside && weekIndex === 0) ? 0 : -1} type="button">{day.date.getDate()}</button>}
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
        if (caption) caption.textContent = monthLabel(visibleMonth)
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
    return (
      <div aria-label="Calendar" class={classes('radcn-calendar', props.class)} data-default-month={props.defaultMonth} data-default-selected={props.defaultSelected} data-disabled-dates={props.disabledDates} data-max={props.max} data-min={props.min} data-mode={props.mode || 'single'} data-month={isoDate(month).slice(0, 7)} data-radcn-calendar data-selected={selected} data-show-outside-days={props.showOutsideDays === false ? 'false' : 'true'} data-show-week-number={props.showWeekNumber ? 'true' : 'false'} id={props.id} style={props.style}>
        {props.name && <input data-radcn-calendar-hidden-input name={props.name} required={props.required} type="hidden" value={selected} />}
        <div class="radcn-calendar-nav" data-radcn-calendar-nav>
          <button aria-label="Previous month" class="radcn-calendar-previous" data-radcn-calendar-previous type="button">‹</button>
          <button aria-label="Next month" class="radcn-calendar-next" data-radcn-calendar-next type="button">›</button>
        </div>
        <div class="radcn-calendar-months" data-radcn-calendar-months>
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
    return <div class={classes('radcn-calendar-month', className)} data-month={month} data-radcn-calendar-month style={style}>{children}</div>
  }
}

export function CalendarCaption(handle: Handle<CalendarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes('radcn-calendar-caption', className)} data-radcn-calendar-caption style={style}>{children}</div>
  }
}

export function CalendarNav(handle: Handle<CalendarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes('radcn-calendar-nav', className)} data-radcn-calendar-nav style={style}>{children}</div>
  }
}

export function CalendarPrevious(handle: Handle<CalendarNavButtonProps>) {
  return () => {
    let { children, class: className, disabled, label = 'Previous month', style } = handle.props
    return <button aria-label={label} class={classes('radcn-calendar-previous', className)} data-radcn-calendar-previous disabled={disabled} type="button" style={style}>{children || '‹'}</button>
  }
}

export function CalendarNext(handle: Handle<CalendarNavButtonProps>) {
  return () => {
    let { children, class: className, disabled, label = 'Next month', style } = handle.props
    return <button aria-label={label} class={classes('radcn-calendar-next', className)} data-radcn-calendar-next disabled={disabled} type="button" style={style}>{children || '›'}</button>
  }
}

export function CalendarGrid(handle: Handle<CalendarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <table class={classes('radcn-calendar-grid', className)} data-radcn-calendar-grid role="grid" style={style}>{children}</table>
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
    return <td aria-selected={selected ? 'true' : undefined} class={classes('radcn-calendar-day', className)} data-date={date} data-disabled={disabled ? 'true' : undefined} data-outside={outside ? 'true' : undefined} data-radcn-calendar-day data-range-end={rangeEnd ? 'true' : undefined} data-range-middle={rangeMiddle ? 'true' : undefined} data-range-start={rangeStart ? 'true' : undefined} data-selected={selected ? 'true' : undefined} data-today={today ? 'true' : undefined} role="gridcell" style={style}>{children}</td>
  }
}

export function CalendarDayButton(handle: Handle<CalendarDayProps>) {
  return () => {
    let { children, class: className, date, disabled, style } = handle.props
    let parsed = dateFromIso(date)
    return <button aria-label={parsed ? fullDateLabel(parsed) : date} class={classes('radcn-calendar-day-button', className)} data-date={date} data-disabled={disabled ? 'true' : undefined} data-radcn-calendar-day-button disabled={disabled} type="button" style={style}>{children || parsed?.getDate() || date}</button>
  }
}
