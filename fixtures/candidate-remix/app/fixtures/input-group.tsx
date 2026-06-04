import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Button, Field, FieldDescription, FieldError, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea, Label } from 'radcn'

export function renderInputGroupFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'addons':
      return (
        <Field>
          <Label for="candidate-input-group-addons">Search</Label>
          <InputGroup ariaLabel="Search query">
            <InputGroupAddon>
              <InputGroupText>Search</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput id="candidate-input-group-addons" name="query" placeholder="Packages" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>⌘K</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      )
    case 'buttons':
      return (
        <form action="/fixtures/input-group/buttons" method="get" style="display:grid;gap:12px;max-width:360px">
          <Label for="candidate-input-group-buttons">Repository</Label>
          <InputGroup ariaLabel="Repository search">
            <InputGroupInput id="candidate-input-group-buttons" name="repo" value="radcn" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton name="intent" type="submit" value="search">Go</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      )
    case 'textarea':
      return (
        <Field>
          <Label for="candidate-input-group-textarea">Message</Label>
          <InputGroup ariaLabel="Message">
            <InputGroupAddon align="block-start">
              <InputGroupText>Comment</InputGroupText>
            </InputGroupAddon>
            <InputGroupTextarea id="candidate-input-group-textarea" name="message" rows={4} value="Grouped textarea" />
          </InputGroup>
        </Field>
      )
    case 'disabled-invalid':
      return (
        <div style="display:grid;gap:16px">
          <Field>
            <Label disabled for="candidate-input-group-disabled">Disabled</Label>
            <InputGroup disabled ariaLabel="Disabled input group">
              <InputGroupAddon>
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput disabled id="candidate-input-group-disabled" name="disabled" value="disabled" />
            </InputGroup>
          </Field>
          <Field invalid>
            <Label for="candidate-input-group-invalid">Invalid</Label>
            <InputGroup invalid ariaLabel="Invalid input group">
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                ariaDescribedBy="candidate-input-group-invalid-error"
                ariaInvalid
                id="candidate-input-group-invalid"
                name="url"
                value="not-a-url"
              />
            </InputGroup>
            <FieldError id="candidate-input-group-invalid-error">Enter a valid URL.</FieldError>
          </Field>
        </div>
      )
    case 'form-submit-reset':
      return (
        <form action="/fixtures/input-group/form-submit-reset" method="get" style="display:grid;gap:12px;max-width:360px">
          <Label for="candidate-input-group-form">Workspace</Label>
          <InputGroup ariaLabel="Workspace slug">
            <InputGroupAddon>
              <InputGroupText>radcn.dev/</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput id="candidate-input-group-form" name="workspace" value="design" required />
          </InputGroup>
          <div style="display:flex;gap:12px">
            <Button name="intent" type="submit" value="submit">Submit</Button>
            <Button type="reset" variant="outline">Reset</Button>
          </div>
        </form>
      )
    case 'block-addons':
      return (
        <Field>
          <Label for="candidate-input-group-block">Deploy command</Label>
          <InputGroup ariaLabel="Deploy command">
            <InputGroupAddon align="block-start">
              <InputGroupText>Terminal</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput id="candidate-input-group-block" name="command" value="pnpm deploy" />
            <InputGroupAddon align="block-end">
              <InputGroupText>Runs in production</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      )
    case 'custom-token':
      return (
        <Field>
          <Label for="candidate-input-group-custom">Custom</Label>
          <InputGroup class="radcn-fixture-custom-input-group" ariaLabel="Custom input group">
            <InputGroupAddon>
              <InputGroupText>#</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput id="candidate-input-group-custom" name="tag" value="release" />
          </InputGroup>
        </Field>
      )
    default:
      return (
        <Field>
          <Label for="candidate-input-group-default">Email</Label>
          <InputGroup ariaLabel="Email address">
            <InputGroupInput id="candidate-input-group-default" name="email" placeholder="name@example.com" />
          </InputGroup>
          <FieldDescription>Input group preserves native input behavior.</FieldDescription>
        </Field>
      )
  }
}
