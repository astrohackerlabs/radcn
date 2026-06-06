import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Button } from 'radcn'
import { DatePicker } from 'radcn/date-picker'

const month = '2026-06-01'
const selected = '2026-06-12'
const range = '2026-06-12..2026-06-18'

function DatePickerExample({
  className,
  defaultOpen,
  disabled,
  mode = 'single',
  name,
  numberOfMonths,
  presets,
  value = selected,
}: {
  className?: string
  defaultOpen?: boolean
  disabled?: boolean
  mode?: 'single' | 'range'
  name?: string
  numberOfMonths?: number
  presets?: { label: string; value: string }[]
  value?: string
}) {
  return (
    <DatePicker
      class={className}
      defaultOpen={defaultOpen}
      defaultValue={value}
      disabled={disabled}
      id="candidate-date-picker"
      mode={mode}
      month={month}
      name={name}
      numberOfMonths={numberOfMonths}
      presets={presets}
    />
  )
}

export function renderDatePickerFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'demo':
      return DatePickerExample({ defaultOpen: true, name: 'date', value: '' })
    case 'with-presets':
      return DatePickerExample({
        defaultOpen: true,
        name: 'preset_date',
        presets: [
          { label: 'Today', value: '2026-06-12' },
          { label: 'Tomorrow', value: '2026-06-13' },
          { label: 'In 3 days', value: '2026-06-15' },
          { label: 'In a week', value: '2026-06-19' },
        ],
        value: '',
      })
    case 'with-range':
      return DatePickerExample({ defaultOpen: true, mode: 'range', name: 'range', numberOfMonths: 2, value: range })
    case 'selected':
      return DatePickerExample({ value: selected })
    case 'form-submit-reset':
      return (
        <form action="/fixtures/date-picker/form-submit-reset" method="get" style="display:grid;gap:12px">
          {DatePickerExample({ name: 'date', value: selected })}
          <div style="display:flex;gap:12px">
            <Button name="intent" type="submit" value="submit">Submit</Button>
            <Button type="reset" variant="outline">Reset</Button>
          </div>
        </form>
      )
    case 'popover':
      return DatePickerExample({ defaultOpen: true, value: selected })
    case 'presets':
      return DatePickerExample({
        defaultOpen: true,
        presets: [
          { label: 'Today', value: '2026-06-12' },
          { label: 'Tomorrow', value: '2026-06-13' },
          { label: 'In 3 days', value: '2026-06-15' },
          { label: 'In a week', value: '2026-06-19' },
        ],
        value: '',
      })
    case 'range':
      return DatePickerExample({ defaultOpen: true, mode: 'range', numberOfMonths: 2, value: range })
    case 'disabled':
      return DatePickerExample({ disabled: true, value: '' })
    case 'custom-token':
      return DatePickerExample({ className: 'radcn-fixture-custom-date-picker', defaultOpen: true, value: selected })
    default:
      return DatePickerExample({ value: '' })
  }
}
