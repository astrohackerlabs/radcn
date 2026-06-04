import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from 'radcn'

const inlineControlStyle = 'display:flex;align-items:center;gap:10px'
const formStyle = 'display:grid;gap:12px;max-width:360px'
const buttonRowStyle = 'display:flex;gap:12px'
const radioRowStyle = 'display:flex;align-items:center;gap:10px'

export function renderCheckboxFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'checked':
      return (
        <div style={inlineControlStyle}>
          <Checkbox checked id="candidate-checkbox-checked" name="notifications" value="email" />
          <Label for="candidate-checkbox-checked">Email notifications</Label>
        </div>
      )
    case 'disabled':
      return (
        <div style={inlineControlStyle}>
          <Checkbox disabled id="candidate-checkbox-disabled" name="notifications" value="push" />
          <Label disabled for="candidate-checkbox-disabled">Push notifications</Label>
        </div>
      )
    case 'invalid':
      return (
        <Field invalid>
          <div style={inlineControlStyle}>
            <Checkbox
              ariaDescribedBy="candidate-checkbox-error"
              ariaInvalid
              id="candidate-checkbox-invalid"
              name="terms"
              required
              value="accepted"
            />
            <Label for="candidate-checkbox-invalid">Accept terms</Label>
          </div>
          <FieldError id="candidate-checkbox-error">Accept the terms to continue.</FieldError>
        </Field>
      )
    case 'indeterminate':
      return (
        <div style={inlineControlStyle}>
          <Checkbox id="candidate-checkbox-mixed" indeterminate name="permissions" value="partial" />
          <Label for="candidate-checkbox-mixed">Some permissions selected</Label>
        </div>
      )
    case 'custom-token':
      return (
        <div style={inlineControlStyle}>
          <Checkbox checked class="radcn-fixture-custom-checkbox" id="candidate-checkbox-custom" name="custom" value="yes" />
          <Label for="candidate-checkbox-custom">Custom checkbox</Label>
        </div>
      )
    case 'form-submit-reset':
      return (
        <form action="/fixtures/checkbox/form-submit-reset" method="get" style={formStyle}>
          <div style={inlineControlStyle}>
            <Checkbox checked id="candidate-checkbox-form" name="agree" value="yes" />
            <Label for="candidate-checkbox-form">Agree to updates</Label>
          </div>
          <div style={buttonRowStyle}>
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    default:
      return (
        <div style={inlineControlStyle}>
          <Checkbox id="candidate-checkbox-default" name="notifications" value="email" />
          <Label for="candidate-checkbox-default">Email notifications</Label>
        </div>
      )
  }
}

export function renderRadioGroupFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'disabled':
      return (
        <RadioGroup name="priority">
          <div style={radioRowStyle}>
            <RadioGroupItem disabled id="candidate-radio-disabled-low" name="priority" value="low" />
            <Label disabled for="candidate-radio-disabled-low">Low</Label>
          </div>
          <div style={radioRowStyle}>
            <RadioGroupItem checked disabled id="candidate-radio-disabled-high" name="priority" value="high" />
            <Label disabled for="candidate-radio-disabled-high">High</Label>
          </div>
        </RadioGroup>
      )
    case 'invalid':
      return (
        <Field invalid>
          <RadioGroup ariaDescribedBy="candidate-radio-error" ariaInvalid name="plan">
            <div style={radioRowStyle}>
              <RadioGroupItem ariaInvalid id="candidate-radio-invalid-basic" name="plan" required value="basic" />
              <Label for="candidate-radio-invalid-basic">Basic</Label>
            </div>
            <div style={radioRowStyle}>
              <RadioGroupItem ariaInvalid id="candidate-radio-invalid-pro" name="plan" required value="pro" />
              <Label for="candidate-radio-invalid-pro">Pro</Label>
            </div>
          </RadioGroup>
          <FieldError id="candidate-radio-error">Choose a plan.</FieldError>
        </Field>
      )
    case 'custom-token':
      return (
        <RadioGroup class="radcn-fixture-custom-radio" name="theme">
          <div style={radioRowStyle}>
            <RadioGroupItem checked class="radcn-fixture-custom-radio" id="candidate-radio-custom-system" name="theme" value="system" />
            <Label for="candidate-radio-custom-system">System</Label>
          </div>
          <div style={radioRowStyle}>
            <RadioGroupItem class="radcn-fixture-custom-radio" id="candidate-radio-custom-light" name="theme" value="light" />
            <Label for="candidate-radio-custom-light">Light</Label>
          </div>
        </RadioGroup>
      )
    case 'form-submit-reset':
      return (
        <form action="/fixtures/radio-group/form-submit-reset" method="get" style={formStyle}>
          <RadioGroup name="contact">
            <div style={radioRowStyle}>
              <RadioGroupItem checked id="candidate-radio-form-email" name="contact" value="email" />
              <Label for="candidate-radio-form-email">Email</Label>
            </div>
            <div style={radioRowStyle}>
              <RadioGroupItem id="candidate-radio-form-sms" name="contact" value="sms" />
              <Label for="candidate-radio-form-sms">SMS</Label>
            </div>
          </RadioGroup>
          <div style={buttonRowStyle}>
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    default:
      return (
        <RadioGroup name="priority">
          <div style={radioRowStyle}>
            <RadioGroupItem checked id="candidate-radio-default-low" name="priority" value="low" />
            <Label for="candidate-radio-default-low">Low</Label>
          </div>
          <div style={radioRowStyle}>
            <RadioGroupItem id="candidate-radio-default-high" name="priority" value="high" />
            <Label for="candidate-radio-default-high">High</Label>
          </div>
        </RadioGroup>
      )
  }
}

export function renderSwitchFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'checked':
      return (
        <div style={inlineControlStyle}>
          <Switch checked id="candidate-switch-checked" name="availability" value="online" />
          <Label for="candidate-switch-checked">Available</Label>
        </div>
      )
    case 'disabled':
      return (
        <div style={inlineControlStyle}>
          <Switch disabled id="candidate-switch-disabled" name="availability" value="online" />
          <Label disabled for="candidate-switch-disabled">Available</Label>
        </div>
      )
    case 'custom-token':
      return (
        <div style={inlineControlStyle}>
          <Switch checked class="radcn-fixture-custom-switch" id="candidate-switch-custom" name="availability" size="sm" value="online" />
          <Label for="candidate-switch-custom">Custom switch</Label>
        </div>
      )
    case 'form-submit-reset':
      return (
        <form action="/fixtures/switch/form-submit-reset" method="get" style={formStyle}>
          <div style={inlineControlStyle}>
            <Switch checked id="candidate-switch-form" name="dark" value="on" />
            <Label for="candidate-switch-form">Dark mode</Label>
          </div>
          <div style={buttonRowStyle}>
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    default:
      return (
        <div style={inlineControlStyle}>
          <Switch id="candidate-switch-default" name="availability" value="online" />
          <Label for="candidate-switch-default">Available</Label>
        </div>
      )
  }
}

export function renderProgressFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'indeterminate':
      return (
        <Field>
          <Label>Syncing files</Label>
          <Progress ariaLabel="Syncing files" />
          <FieldDescription>Waiting for progress details.</FieldDescription>
        </Field>
      )
    case 'custom-token':
      return (
        <Field>
          <Label>Upload progress</Label>
          <Progress ariaLabel="Upload progress" class="radcn-fixture-custom-progress" value={72} />
          <FieldDescription>Custom progress tokens.</FieldDescription>
        </Field>
      )
    default:
      return (
        <Field>
          <Label>Upload progress</Label>
          <Progress ariaLabel="Upload progress" value={48} />
          <FieldDescription>48 percent complete.</FieldDescription>
        </Field>
      )
  }
}
