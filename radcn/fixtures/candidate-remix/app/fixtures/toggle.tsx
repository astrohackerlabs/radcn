import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Toggle, ToggleGroup, ToggleGroupItem } from 'radcn'

const row = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap'

function glyph(label: string, style?: string) {
  return <span aria-hidden="true" class="radcn-toggle-group-icon" style={style}>{label}</span>
}

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
    case 'demo':
      return (
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold">{glyph('B')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic">{glyph('I')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline">{glyph('U')}</ToggleGroupItem>
        </ToggleGroup>
      )
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
        <ToggleGroup disabled defaultValue={['bold']} type="multiple">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold">{glyph('B')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic">{glyph('I')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline">{glyph('U')}</ToggleGroupItem>
        </ToggleGroup>
      )
    case 'disabled-item':
      return (
        <ToggleGroup defaultValue="bold" type="single">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem disabled value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
    case 'lg':
      return (
        <ToggleGroup size="lg" type="multiple">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold">{glyph('B')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic">{glyph('I')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline">{glyph('U')}</ToggleGroupItem>
        </ToggleGroup>
      )
    case 'outline':
      return (
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold">{glyph('B')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic">{glyph('I')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline">{glyph('U')}</ToggleGroupItem>
        </ToggleGroup>
      )
    case 'sm':
      return (
        <ToggleGroup size="sm" type="single">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold">{glyph('B')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic">{glyph('I')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline">{glyph('U')}</ToggleGroupItem>
        </ToggleGroup>
      )
    case 'spacing':
      return (
        <ToggleGroup defaultValue={['star']} size="sm" spacing={2} type="multiple" variant="outline">
          <ToggleGroupItem
            ariaLabel="Toggle star"
            class="radcn-fixture-toggle-group-star"
            value="star"
          >
            {glyph('S', '--radcn-toggle-icon-on-fg:#ca8a04')} Star
          </ToggleGroupItem>
          <ToggleGroupItem
            ariaLabel="Toggle heart"
            class="radcn-fixture-toggle-group-heart"
            value="heart"
          >
            {glyph('H', '--radcn-toggle-icon-on-fg:#dc2626')} Heart
          </ToggleGroupItem>
          <ToggleGroupItem
            ariaLabel="Toggle bookmark"
            class="radcn-fixture-toggle-group-bookmark"
            value="bookmark"
          >
            {glyph('B', '--radcn-toggle-icon-on-fg:#2563eb')} Bookmark
          </ToggleGroupItem>
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
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold">{glyph('B')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic">{glyph('I')}</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline">{glyph('U')}</ToggleGroupItem>
        </ToggleGroup>
      )
  }
}
