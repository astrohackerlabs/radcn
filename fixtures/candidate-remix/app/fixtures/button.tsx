import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Button } from 'radcn'

export function renderButtonFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'variants':
      return (
        <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      )
    case 'disabled':
      return (
        <div style="display:flex;gap:12px;align-items:center">
          <Button disabled>Disabled</Button>
          <Button ariaDisabled variant="outline">Aria Disabled</Button>
        </div>
      )
    case 'as-child-or-link':
      return <Button href="/fixtures/button/default">Link Button</Button>
    case 'sizes':
      return (
        <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button ariaDisabled size="icon">+</Button>
        </div>
      )
    case 'custom-class':
      return <Button class="radcn-fixture-custom-button">Custom Button</Button>
    case 'form-submit':
      return (
        <form action="/fixtures/button/form-submit" method="get" style="display:grid;gap:12px;max-width:360px">
          <label for="candidate-button-form-value">Value</label>
          <input id="candidate-button-form-value" name="value" value="initial" />
          <div style="display:flex;gap:12px">
            <Button name="intent" type="submit" value="submit">Submit</Button>
            <Button type="reset" variant="outline">Reset</Button>
          </div>
        </form>
      )
    default:
      return <Button>Button</Button>
  }
}
