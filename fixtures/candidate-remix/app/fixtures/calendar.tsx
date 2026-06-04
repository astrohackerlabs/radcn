import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Calendar } from 'radcn'

const month = '2026-06-01'
const selected = '2026-06-12'

export function renderCalendarFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
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
