import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Toggle, ToggleGroup, ToggleGroupItem } from 'radcn'

const row = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap'

export function renderToggleFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'pressed':
      return <Toggle pressed>Bold</Toggle>
    case 'disabled':
      return <Toggle disabled>Muted</Toggle>
    case 'variants-sizes':
      return (
        <div style={row}>
          <Toggle size="sm">Small</Toggle>
          <Toggle variant="outline">Outline</Toggle>
          <Toggle size="lg" pressed>
            Large
          </Toggle>
        </div>
      )
    case 'custom-token':
      return (
        <Toggle class="radcn-fixture-custom-toggle" pressed variant="outline">
          Custom
        </Toggle>
      )
    default:
      return <Toggle>Bold</Toggle>
  }
}

export function renderToggleGroupFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'multiple':
      return (
        <ToggleGroup defaultValue={['bold', 'underline']} type="multiple">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
    case 'disabled':
      return (
        <ToggleGroup defaultValue="bold" type="single">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem disabled value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
    case 'vertical':
      return (
        <ToggleGroup defaultValue="italic" orientation="vertical" type="single">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
    case 'custom-token':
      return (
        <ToggleGroup class="radcn-fixture-custom-toggle-group" defaultValue="underline" type="single">
          <ToggleGroupItem value="bold" variant="outline">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic" variant="outline">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline" variant="outline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
    default:
      return (
        <ToggleGroup defaultValue="bold" type="single">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
  }
}
