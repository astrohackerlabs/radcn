import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Button, Calendar, Popover, PopoverContent, PopoverPortal, PopoverTrigger } from 'radcn'

const month = '2026-06-01'
const selected = '2026-06-12'

function DatePickerRecipe({ className, defaultOpen, disabled, name, value = selected }: { className?: string; defaultOpen?: boolean; disabled?: boolean; name?: string; value?: string }) {
  return (
    <div class={className} data-radcn-date-picker-recipe data-value={value}>
      {name && <input data-radcn-date-picker-hidden-input name={name} type="hidden" value={value} />}
      <Popover defaultOpen={defaultOpen} id="candidate-date-picker-popover">
        <PopoverTrigger><Button disabled={disabled} type="button">{value || 'Pick a date'}</Button></PopoverTrigger>
        <PopoverPortal>
          <PopoverContent>
            <Calendar defaultMonth={month} defaultSelected={value} />
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </div>
  )
}

export function renderDatePickerFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'selected':
      return DatePickerRecipe({ value: selected })
    case 'form-submit-reset':
      return (
        <form action="/fixtures/date-picker/form-submit-reset" method="get" style="display:grid;gap:12px">
          {DatePickerRecipe({ name: 'date', value: selected })}
          <div style="display:flex;gap:12px">
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    case 'popover':
      return DatePickerRecipe({ defaultOpen: true, value: selected })
    case 'disabled':
      return DatePickerRecipe({ disabled: true, value: '' })
    case 'custom-token':
      return DatePickerRecipe({ className: 'radcn-fixture-custom-date-picker', defaultOpen: true, value: selected })
    default:
      return DatePickerRecipe({ value: '' })
  }
}
