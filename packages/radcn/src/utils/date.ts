export interface CalendarDay {
  date: Date
  iso: string
  outside: boolean
}

const dayMs = 24 * 60 * 60 * 1000

export function dateFromIso(value: string | undefined) {
  if (!value) return null
  let match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  let year = Number(match[1])
  let month = Number(match[2]) - 1
  let day = Number(match[3])
  let date = new Date(year, month, day)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) return null
  return date
}

export function isoDate(date: Date) {
  let year = date.getFullYear()
  let month = String(date.getMonth() + 1).padStart(2, '0')
  let day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

export function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1)
}

export function monthLabel(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function fullDateLabel(date: Date) {
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })
}

export function sameDay(left: Date, right: Date) {
  return isoDate(left) === isoDate(right)
}

export function isBetween(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false
  let time = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  let startTime = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
  let endTime = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
  return time > Math.min(startTime, endTime) && time < Math.max(startTime, endTime)
}

export function daysInCalendarMonth(month: Date, showOutsideDays = true): CalendarDay[] {
  let first = startOfMonth(month)
  let start = addDays(first, -first.getDay())
  let days: CalendarDay[] = []
  for (let index = 0; index < 42; index += 1) {
    let date = addDays(start, index)
    days.push({
      date,
      iso: isoDate(date),
      outside: date.getMonth() !== first.getMonth(),
    })
  }
  return showOutsideDays ? days : days.filter((day) => !day.outside)
}

export function weekNumber(date: Date) {
  let start = new Date(date.getFullYear(), 0, 1)
  return Math.ceil(((date.getTime() - start.getTime()) / dayMs + start.getDay() + 1) / 7)
}
