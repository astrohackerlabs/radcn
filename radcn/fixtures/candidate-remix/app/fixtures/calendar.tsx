import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Calendar } from 'radcn'

const month = '2026-06-01'
const selected = '2026-06-12'

export function renderCalendarFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'demo':
      return (
        <Calendar
          captionLayout="dropdown"
          class="radcn-fixture-custom-calendar"
          defaultMonth={month}
          defaultSelected={selected}
          max="2030-12-31"
          min="2020-01-01"
          name="calendar-demo"
        />
      )
    case 'hijri-intentional-divergence':
      return (
        <div data-radcn-calendar-hijri-divergence>
          <h2>calendar-hijri is an intentional RadCN divergence</h2>
          <p>Persian and Hijri rendering is app-owned alternate-calendar work.</p>
          <p>RadCN does not depend on react-day-picker/persian, next/font, or lucide-react.</p>
        </div>
      )
    case 'selected':
      return <Calendar defaultMonth={month} defaultSelected={selected} name="date" />
    case 'outside-days':
      return <Calendar defaultMonth={month} showOutsideDays />
    case 'disabled':
      return <Calendar defaultMonth={month} defaultSelected={selected} disabledDates="2026-06-10,2026-06-11" min="2026-06-05" max="2026-06-25" />
    case 'month-navigation':
      return <Calendar defaultMonth={month} selected={selected} />
    case 'range':
      return <Calendar defaultMonth={month} defaultSelected="2026-06-10..2026-06-15" mode="range" />
    case 'two-months':
      return <Calendar defaultMonth={month} defaultSelected={selected} numberOfMonths={2} />
    case 'custom-token':
      return <Calendar class="radcn-fixture-custom-calendar" defaultMonth={month} defaultSelected={selected} />
    default:
      return <Calendar defaultMonth={month} />
  }
}
