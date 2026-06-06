import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Field, Label, Slider } from 'radcn'

const formStyle = 'display:grid;gap:12px;max-width:360px'
const buttonRowStyle = 'display:flex;gap:12px'

export function renderSliderFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'demo':
      return (
        <div data-radcn-fixture-slider-family="slider-demo" data-radcn-fixture-slider-width="60" style="width:100%;">
          <Slider
            ariaLabel="Slider"
            class="w-[60%]"
            defaultValue={50}
            id="candidate-slider-demo"
            max={100}
            name="slider-demo"
            step={1}
            style="width:60%;"
          />
        </div>
      )
    case 'value':
      return (
        <Field>
          <Label for="candidate-slider-value">Volume</Label>
          <Slider defaultValue={72} id="candidate-slider-value" name="volume" />
        </Field>
      )
    case 'disabled':
      return (
        <Field>
          <Label disabled for="candidate-slider-disabled">Locked volume</Label>
          <Slider defaultValue={40} disabled id="candidate-slider-disabled" name="volume" />
        </Field>
      )
    case 'step':
      return (
        <Field>
          <Label for="candidate-slider-step">Brightness</Label>
          <Slider defaultValue={30} id="candidate-slider-step" max={50} min={10} name="brightness" step={5} />
        </Field>
      )
    case 'custom-token':
      return (
        <Field>
          <Label for="candidate-slider-custom">Custom slider</Label>
          <Slider class="radcn-fixture-custom-slider" defaultValue={65} id="candidate-slider-custom" name="custom" />
        </Field>
      )
    case 'form-submit-reset':
      return (
        <form action="/fixtures/slider/form-submit-reset" method="get" style={formStyle}>
          <Field>
            <Label for="candidate-slider-form">Volume</Label>
            <Slider defaultValue={25} id="candidate-slider-form" name="volume" />
          </Field>
          <div style={buttonRowStyle}>
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    default:
      return (
        <Field>
          <Label for="candidate-slider-default">Volume</Label>
          <Slider defaultValue={50} id="candidate-slider-default" name="volume" />
        </Field>
      )
  }
}
