import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Button, Field, FieldDescription, FieldError, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, Label, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'radcn'

function SixSlots() {
  return (
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTPGroup>
  )
}

function SeparatedSlots() {
  return (
    <>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </>
  )
}

function PairedSeparatedSlots() {
  return (
    <>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </>
  )
}

export function renderInputOTPFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'demo':
      return (
        <Field>
          <Label for="candidate-input-otp-demo">One-time code</Label>
          <InputOTP id="candidate-input-otp-demo" ariaLabel="One-time code" maxLength={6} value="123456">
            {SeparatedSlots()}
          </InputOTP>
        </Field>
      )
    case 'pattern':
      return (
        <Field>
          <Label for="candidate-input-otp-pattern">Alphanumeric code</Label>
          <InputOTP id="candidate-input-otp-pattern" ariaLabel="Alphanumeric code" maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            {SixSlots()}
          </InputOTP>
          <FieldDescription>Letters and numbers are accepted.</FieldDescription>
        </Field>
      )
    case 'separator-2-2-2':
      return (
        <Field>
          <Label for="candidate-input-otp-separator-2-2-2">Separated code</Label>
          <InputOTP id="candidate-input-otp-separator-2-2-2" ariaLabel="Separated one-time code" maxLength={6} value="123456">
            {PairedSeparatedSlots()}
          </InputOTP>
        </Field>
      )
    case 'controlled':
      return (
        <div data-fixture-input-otp-controlled>
          <Field>
            <Label for="candidate-input-otp-controlled">Controlled code</Label>
            <InputOTP id="candidate-input-otp-controlled" ariaLabel="Controlled one-time code" maxLength={6}>
              {SixSlots()}
            </InputOTP>
            <FieldDescription class="fixture-input-otp-controlled-output">Enter your one-time password.</FieldDescription>
          </Field>
        </div>
      )
    case 'separator':
      return (
        <Field>
          <Label for="candidate-input-otp-separator">Code</Label>
          <InputOTP id="candidate-input-otp-separator" ariaLabel="One-time code" maxLength={6} value="123456">
            {SeparatedSlots()}
          </InputOTP>
        </Field>
      )
    case 'digits-only':
      return (
        <Field>
          <Label for="candidate-input-otp-digits">Digits</Label>
          <InputOTP id="candidate-input-otp-digits" ariaLabel="Digits only code" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
            {SixSlots()}
          </InputOTP>
        </Field>
      )
    case 'alphanumeric':
      return (
        <Field>
          <Label for="candidate-input-otp-alphanumeric">Alphanumeric</Label>
          <InputOTP
            id="candidate-input-otp-alphanumeric"
            ariaDescribedBy="candidate-input-otp-alphanumeric-description"
            ariaLabel="Alphanumeric code"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            {SeparatedSlots()}
          </InputOTP>
          <FieldDescription id="candidate-input-otp-alphanumeric-description">Letters and numbers are accepted.</FieldDescription>
        </Field>
      )
    case 'four-digits':
      return (
        <Field>
          <Label for="candidate-input-otp-four">PIN</Label>
          <InputOTP id="candidate-input-otp-four" ariaLabel="Four digit PIN" maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </Field>
      )
    case 'disabled':
      return (
        <Field>
          <Label disabled for="candidate-input-otp-disabled">Disabled</Label>
          <InputOTP disabled id="candidate-input-otp-disabled" ariaLabel="Disabled code" maxLength={6} value="123456">
            {SeparatedSlots()}
          </InputOTP>
        </Field>
      )
    case 'invalid':
      return (
        <Field invalid>
          <Label for="candidate-input-otp-invalid">Code</Label>
          <InputOTP
            ariaDescribedBy="candidate-input-otp-invalid-error"
            ariaInvalid
            ariaLabel="Invalid one-time code"
            id="candidate-input-otp-invalid"
            maxLength={6}
            value="123"
          >
            {SixSlots()}
          </InputOTP>
          <FieldError id="candidate-input-otp-invalid-error">Enter the six-character code.</FieldError>
        </Field>
      )
    case 'form-submit-reset':
      return (
        <form action="/fixtures/input-otp/form-submit-reset" method="get" style="display:grid;gap:12px;max-width:360px">
          <Label for="candidate-input-otp-form">Code</Label>
          <InputOTP id="candidate-input-otp-form" ariaLabel="Verification code" maxLength={6} name="code" pattern={REGEXP_ONLY_DIGITS} required value="123456">
            {SeparatedSlots()}
          </InputOTP>
          <div style="display:flex;gap:12px">
            <Button name="intent" type="submit" value="submit">Submit</Button>
            <Button type="reset" variant="outline">Reset</Button>
          </div>
        </form>
      )
    case 'paste':
      return (
        <Field>
          <Label for="candidate-input-otp-paste">Paste Code</Label>
          <InputOTP id="candidate-input-otp-paste" ariaLabel="Paste one-time code" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
            {SixSlots()}
          </InputOTP>
        </Field>
      )
    case 'custom-token':
      return (
        <Field>
          <Label for="candidate-input-otp-custom">Custom</Label>
          <InputOTP containerClass="radcn-fixture-custom-input-otp" id="candidate-input-otp-custom" ariaLabel="Custom code" maxLength={6} value="654321">
            {SeparatedSlots()}
          </InputOTP>
        </Field>
      )
    default:
      return (
        <Field>
          <Label for="candidate-input-otp-default">Code</Label>
          <InputOTP id="candidate-input-otp-default" ariaLabel="One-time code" maxLength={6}>
            {SixSlots()}
          </InputOTP>
          <FieldDescription>Enter the six-character code.</FieldDescription>
        </Field>
      )
  }
}
