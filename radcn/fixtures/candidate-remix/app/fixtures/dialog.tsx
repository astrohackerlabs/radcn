import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from 'radcn'

function renderDialogDemoFixture() {
  return (
    <Dialog id="candidate-dialog-demo">
      <DialogTrigger class="radcn-button radcn-button--outline">Open Dialog</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent class="radcn-fixture-dialog-demo-content" style="width:min(100%,425px);">
          <form action="/fixtures/dialog/demo" method="post" data-dialog-demo-form>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div style="display:grid;gap:1rem;">
              <div style="display:grid;gap:0.5rem;">
                <Label for="candidate-dialog-demo-name">Name</Label>
                <Input id="candidate-dialog-demo-name" name="name" value="Pedro Duarte" />
              </div>
              <div style="display:grid;gap:0.5rem;">
                <Label for="candidate-dialog-demo-username">Username</Label>
                <Input id="candidate-dialog-demo-username" name="username" value="@peduarte" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose class="radcn-button radcn-button--outline">Cancel</DialogClose>
              <button class="radcn-button radcn-button--default" data-dialog-demo-submit type="submit">Save changes</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

function renderDialogCloseButtonDemoFixture() {
  return (
    <Dialog id="candidate-dialog-close-button-demo">
      <DialogTrigger class="radcn-button radcn-button--outline">Share</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent class="radcn-fixture-dialog-close-button-content" style="width:min(100%,448px);">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
          </DialogHeader>
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <div style="display:grid;flex:1;gap:0.5rem;">
              <Label class="radcn-sr-only" for="candidate-dialog-share-link">Link</Label>
              <Input id="candidate-dialog-share-link" readOnly value="https://ui.shadcn.com/docs/installation" />
            </div>
          </div>
          <DialogFooter class="radcn-fixture-dialog-footer-start" style="justify-content:flex-start;">
            <DialogClose class="radcn-button radcn-button--secondary">Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export function renderDialogFixture(fixture: FixtureScenario) {
  if (fixture.id === 'demo') return renderDialogDemoFixture()
  if (fixture.id === 'close-button-demo') return renderDialogCloseButtonDemoFixture()

  let defaultOpen = fixture.id === 'default-open'
  let custom = fixture.id === 'custom-token'
  let label = fixture.id === 'outside-dismiss' ? 'Open dismissible dialog' : 'Open dialog'

  return (
    <Dialog defaultOpen={defaultOpen} id={`candidate-dialog-${fixture.id}`}>
      <DialogTrigger>{label}</DialogTrigger>
      <DialogPortal class={custom ? 'radcn-fixture-custom-dialog' : undefined}>
        <DialogOverlay />
        <DialogContent class={custom ? 'radcn-fixture-custom-dialog' : undefined} showCloseButton={fixture.id !== 'close-button'}>
          <DialogHeader>
            <DialogTitle>{custom ? 'Custom dialog' : 'Project settings'}</DialogTitle>
            <DialogDescription>Update project details and close the modal when finished.</DialogDescription>
          </DialogHeader>
          <label style="display:grid;gap:6px;font:500 0.875rem/1.2 var(--radcn-font)">
            Project name
            <input class="radcn-input" data-dialog-name-input value="RadCN" />
          </label>
          <DialogFooter>
            <DialogClose>Save changes</DialogClose>
            {fixture.id === 'close-button' && <DialogClose ariaLabel="Cancel">Cancel</DialogClose>}
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
