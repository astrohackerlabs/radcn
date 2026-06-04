import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Button, Field, FieldDescription, FieldError, Input, Label, Textarea } from 'radcn'

export function renderFormFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'server-errors':
      return (
        <form action="/fixtures/form/server-errors" method="get" style="display:grid;gap:16px;max-width:420px" data-radcn-form-recipe>
          <Field invalid>
            <Label for="candidate-form-server-email">Email</Label>
            <Input
              ariaDescribedBy="candidate-form-server-email-error"
              ariaInvalid
              id="candidate-form-server-email"
              name="email"
              value="not-an-email"
            />
            <FieldError id="candidate-form-server-email-error">Use a valid email address.</FieldError>
          </Field>
          <Button name="intent" type="submit" value="retry">Try again</Button>
        </form>
      )
    case 'action-state':
      return (
        <form action="/fixtures/form/action-state" method="get" style="display:grid;gap:16px;max-width:420px" data-radcn-form-recipe>
          <Field>
            <Label for="candidate-form-action-name">Project</Label>
            <Input id="candidate-form-action-name" name="project" value="RadCN" />
            <FieldDescription id="candidate-form-action-state">Last saved value: RadCN</FieldDescription>
          </Field>
          <Button name="intent" type="submit" value="save">Save</Button>
        </form>
      )
    case 'custom-token':
      return (
        <form action="/fixtures/form/custom-token" class="radcn-fixture-custom-field" method="get" style="display:grid;gap:16px;max-width:420px" data-radcn-form-recipe>
          <Field invalid>
            <Label for="candidate-form-custom-message">Message</Label>
            <Textarea
              ariaDescribedBy="candidate-form-custom-message-error"
              ariaInvalid
              id="candidate-form-custom-message"
              name="message"
              value="Too short"
            />
            <FieldError id="candidate-form-custom-message-error">Custom token form error.</FieldError>
          </Field>
          <Button type="submit">Send</Button>
        </form>
      )
    default:
      return (
        <form action="/fixtures/form/native-validation" method="get" style="display:grid;gap:16px;max-width:420px" data-radcn-form-recipe>
          <Field>
            <Label for="candidate-form-native-email">Email</Label>
            <Input
              ariaDescribedBy="candidate-form-native-email-description"
              id="candidate-form-native-email"
              name="email"
              placeholder="name@example.com"
              required
            />
            <FieldDescription id="candidate-form-native-email-description">Native required validation owns this field.</FieldDescription>
          </Field>
          <Button name="intent" type="submit" value="submit">Submit</Button>
        </form>
      )
  }
}
