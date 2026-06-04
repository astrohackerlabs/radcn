import { cn } from "../lib/utils"

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const days = Array.from({ length: 35 }, (_, index) => index + 1)

function ReferenceCalendar({ className, range, selected = 12, twoMonths = false }: { className?: string; range?: boolean; selected?: number; twoMonths?: boolean }) {
  let month = (
    <div className="reference-calendar-month">
      <div className="reference-calendar-caption">June 2026</div>
      <table className="reference-calendar-grid" role="grid">
        <thead><tr>{weekdays.map((day) => <th key={day}>{day}</th>)}</tr></thead>
        <tbody>
          {Array.from({ length: 5 }, (_, week) => (
            <tr key={week}>
              {days.slice(week * 7, week * 7 + 7).map((day) => (
                <td key={day} className="reference-calendar-day" data-selected={day === selected ? "true" : undefined} data-range-start={range && day === 10 ? "true" : undefined} data-range-middle={range && day > 10 && day < 15 ? "true" : undefined} data-range-end={range && day === 15 ? "true" : undefined} role="gridcell">
                  <button className="reference-calendar-day-button" disabled={day === 11}>{day}</button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return <div className={cn("reference-calendar", className)}><div className="reference-calendar-nav"><button>‹</button><button>›</button></div><div className="reference-calendar-months">{month}{twoMonths && month}</div></div>
}

export function renderCalendarFixture(id: string) {
  switch (id) {
    case "range":
      return <ReferenceCalendar range selected={10} />
    case "two-months":
      return <ReferenceCalendar selected={12} twoMonths />
    case "custom-token":
      return <ReferenceCalendar className="reference-fixture-custom-calendar" selected={12} />
    default:
      return <ReferenceCalendar selected={id === "selected" || id === "month-navigation" || id === "disabled" ? 12 : 0} />
  }
}
