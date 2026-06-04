import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Field, FieldDescription, FieldError, Input, Label } from 'radcn'

export function renderFieldFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'input-invalid':
      return (
        <Field invalid>
          <Label for="candidate-email-invalid">Email</Label>
          <Input
            id="candidate-email-invalid"
            ariaInvalid
            ariaDescribedBy="candidate-email-invalid-error"
            name="email"
            value="not-an-email"
          />
          <FieldError id="candidate-email-invalid-error">
            Enter a valid email address.
          </FieldError>
        </Field>
      )
    case 'input-disabled':
      return (
        <Field>
          <Label disabled for="candidate-email-disabled">Email</Label>
          <Input
            id="candidate-email-disabled"
            disabled
            name="email"
            placeholder="name@example.com"
          />
          <FieldDescription>This field is currently unavailable.</FieldDescription>
        </Field>
      )
    case 'required':
      return (
        <Field>
          <Label for="candidate-email-required">Email</Label>
          <Input id="candidate-email-required" name="email" placeholder="name@example.com" required />
          <FieldDescription>Required email address.</FieldDescription>
        </Field>
      )
    case 'custom-error-token':
      return (
        <Field class="radcn-fixture-custom-field" invalid>
          <Label for="candidate-email-custom-error">Email</Label>
          <Input
            id="candidate-email-custom-error"
            ariaInvalid
            ariaDescribedBy="candidate-email-custom-error-message"
            name="email"
            value="not-an-email"
          />
          <FieldError id="candidate-email-custom-error-message">
            Custom token error color.
          </FieldError>
        </Field>
      )
    default:
      return (
        <Field>
          <Label for="candidate-email">Email</Label>
          <Input id="candidate-email" name="email" placeholder="name@example.com" />
          <FieldDescription>Use the email address for your account.</FieldDescription>
        </Field>
      )
  }
}
