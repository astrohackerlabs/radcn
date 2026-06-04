import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Field, FieldDescription, Label, Textarea } from 'radcn'

export function renderTextareaFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'disabled':
      return (
        <Field>
          <Label disabled for="candidate-message-disabled">Message</Label>
          <Textarea
            disabled
            id="candidate-message-disabled"
            name="message"
            value="Disabled textarea content"
          />
          <FieldDescription>This textarea is disabled for the fixture.</FieldDescription>
        </Field>
      )
    default:
      return (
        <Field>
          <Label for="candidate-message">Message</Label>
          <Textarea id="candidate-message" name="message" placeholder="Write a message" />
          <FieldDescription>Use a stable message for the fixture.</FieldDescription>
        </Field>
      )
  }
}
