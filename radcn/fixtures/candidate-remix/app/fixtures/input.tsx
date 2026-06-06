import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Button, Input, Label } from 'radcn'

export function renderInputFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'disabled':
      return <Input disabled name="email" placeholder="Email" type="email" />
    case 'file':
      return (
        <div style="display:grid;gap:12px;width:min(100%,320px)">
          <Label for="candidate-input-file-picture">Picture</Label>
          <Input id="candidate-input-file-picture" name="picture" type="file" />
        </div>
      )
    case 'with-button':
      return (
        <form action="/fixtures/input/with-button" method="get" style="display:flex;gap:8px;width:min(100%,420px)">
          <Input id="candidate-input-subscribe" name="email" placeholder="Email" type="email" />
          <Button name="intent" type="submit" value="subscribe" variant="outline">Subscribe</Button>
        </form>
      )
    case 'with-label':
      return (
        <div style="display:grid;gap:12px;width:min(100%,320px)">
          <Label for="candidate-input-label-email">Email</Label>
          <Input id="candidate-input-label-email" name="email" placeholder="Email" type="email" />
        </div>
      )
    case 'with-text':
      return (
        <div style="display:grid;gap:12px;width:min(100%,320px)">
          <Label for="candidate-input-text-email">Email</Label>
          <Input
            ariaDescribedBy="candidate-input-text-description"
            id="candidate-input-text-email"
            name="email"
            placeholder="Email"
            type="email"
          />
          <p id="candidate-input-text-description" style="margin:0;color:var(--radcn-muted-foreground);font:400 0.8125rem/1.4 var(--radcn-font)">
            Enter the email address connected to this workspace.
          </p>
        </div>
      )
    default:
      return <Input name="email" placeholder="Email" type="email" />
  }
}
