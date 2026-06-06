import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Button, Spinner } from 'radcn'

const arrowIcon = (
  <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16">
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
)

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
    case 'link-variant':
      return <Button variant="link">Link</Button>
    case 'with-icon':
      return (
        <Button size="sm" variant="outline">
          {arrowIcon}
          New Branch
        </Button>
      )
    case 'loading':
      return (
        <Button disabled size="sm" variant="outline">
          <Spinner ariaLabel="Submitting" />
          Submit
        </Button>
      )
    case 'icon-only':
      return (
        <Button ariaLabel="Submit" size="icon" variant="outline">
          {arrowIcon}
        </Button>
      )
    case 'rounded':
      return (
        <Button ariaLabel="Upload" class="radcn-fixture-rounded-button" size="icon" variant="outline">
          {arrowIcon}
        </Button>
      )
    case 'sizes':
      return (
        <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button ariaLabel="Submit small" size="icon-sm" variant="outline">{arrowIcon}</Button>
          <Button ariaLabel="Submit" size="icon" variant="outline">{arrowIcon}</Button>
          <Button ariaLabel="Submit large" size="icon-lg" variant="outline">{arrowIcon}</Button>
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
