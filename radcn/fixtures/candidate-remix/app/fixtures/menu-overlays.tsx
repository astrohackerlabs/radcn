import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Textarea,
} from 'radcn'

function menuStageStyle(edge = false) {
  return [
    'display:flex',
    edge ? 'justify-content:flex-end;align-items:flex-end' : 'justify-content:center;align-items:center',
    'min-height:150px',
    'width:100%',
  ].join(';')
}

function contextTargetStyle(edge = false) {
  return [
    'display:grid',
    'place-items:center',
    'width:220px',
    'height:120px',
    'border:1px dashed #94a3b8',
    'border-radius:8px',
    'background:#f8fafc',
    'color:#334155',
    'font:500 0.875rem/1.3 var(--radcn-font)',
    edge ? 'margin-left:auto' : '',
  ].join(';')
}

function dropdownItems(scenario: string) {
  let checked = scenario === 'checkbox-radio'
  let custom = scenario === 'custom-token'
  let submenu = scenario === 'submenu'

  return (
    <>
      <DropdownMenuLabel inset={scenario === 'keyboard-typeahead'}>Project</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem textValue="Alpha">Alpha action<DropdownMenuShortcut>⌘A</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem disabled textValue="Beta">Beta disabled</DropdownMenuItem>
        <DropdownMenuItem textValue="Gamma">Gamma action</DropdownMenuItem>
        <DropdownMenuItem variant="destructive" textValue="Delete">Delete project</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      {checked && (
        <>
          <DropdownMenuCheckboxItem checked textValue="Show toolbar">Show toolbar</DropdownMenuCheckboxItem>
          <DropdownMenuRadioGroup value="comfortable">
            <DropdownMenuRadioItem value="compact" textValue="Compact">Compact</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="comfortable" textValue="Comfortable">Comfortable</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </>
      )}
      {submenu && (
        <DropdownMenuSub>
          <DropdownMenuSubTrigger textValue="Share">Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem textValue="Email">Email link</DropdownMenuItem>
            <DropdownMenuItem textValue="Copy">Copy link</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      )}
      {custom && <DropdownMenuItem textValue="Custom">Custom themed item</DropdownMenuItem>}
    </>
  )
}

function dropdownDemoExample() {
  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem textValue="Profile">Profile<DropdownMenuShortcut>Shift+Cmd+P</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem textValue="Billing">Billing<DropdownMenuShortcut>Cmd+B</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem textValue="Settings">Settings<DropdownMenuShortcut>Cmd+S</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem textValue="Keyboard shortcuts">Keyboard shortcuts<DropdownMenuShortcut>Cmd+K</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem textValue="Team">Team</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger textValue="Invite users">Invite users</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem textValue="Email">Email</DropdownMenuItem>
            <DropdownMenuItem textValue="Message">Message</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem textValue="More">More...</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem textValue="New Team">New Team<DropdownMenuShortcut>Cmd+T</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem textValue="GitHub">GitHub</DropdownMenuItem>
      <DropdownMenuItem textValue="Support">Support</DropdownMenuItem>
      <DropdownMenuItem disabled textValue="API">API</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem textValue="Log out">Log out<DropdownMenuShortcut>Shift+Cmd+Q</DropdownMenuShortcut></DropdownMenuItem>
    </>
  )
}

function dropdownCheckboxesExample() {
  return (
    <>
      <DropdownMenuLabel>Appearance</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem checked textValue="Status Bar">Status Bar</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem disabled textValue="Activity Bar">Activity Bar</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem textValue="Panel">Panel</DropdownMenuCheckboxItem>
    </>
  )
}

function dropdownRadioGroupExample() {
  return (
    <>
      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value="bottom">
        <DropdownMenuRadioItem value="top" textValue="Top">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom" textValue="Bottom">Bottom</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right" textValue="Right">Right</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </>
  )
}

function dropdownDialogExample() {
  return (
    <div data-fixture-dropdown-dialog-example style="display:grid;gap:1rem">
      <DropdownMenu id="candidate-dropdown-menu-dialog-menu">
        <DropdownMenuTrigger ariaLabel="Open menu" class="radcn-button radcn-button--outline radcn-button--icon-sm">...</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="end" style="width:10rem">
            <DropdownMenuLabel>File Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem class="fixture-dropdown-dialog-new" textValue="New File">New File...</DropdownMenuItem>
              <DropdownMenuItem class="fixture-dropdown-dialog-share" textValue="Share">Share...</DropdownMenuItem>
              <DropdownMenuItem disabled textValue="Download">Download</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <Dialog id="candidate-dropdown-menu-new-dialog">
        <DialogTrigger class="fixture-dropdown-dialog-new-trigger" style="display:none">Open new file dialog</DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription>Provide a name for your new file.</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel for="candidate-dropdown-menu-filename">File Name</FieldLabel>
                <Input id="candidate-dropdown-menu-filename" name="filename" placeholder="document.txt" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose class="radcn-button radcn-button--outline">Cancel</DialogClose>
              <button class="radcn-button" type="submit">Create</button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
      <Dialog id="candidate-dropdown-menu-share-dialog">
        <DialogTrigger class="fixture-dropdown-dialog-share-trigger" style="display:none">Open share dialog</DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Share File</DialogTitle>
              <DialogDescription>Anyone with the link will be able to view this file.</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel for="candidate-dropdown-menu-email">Email Address</FieldLabel>
                <Input id="candidate-dropdown-menu-email" name="email" placeholder="shadcn@vercel.com" type="email" />
              </Field>
              <Field>
                <FieldLabel for="candidate-dropdown-menu-message">Message (Optional)</FieldLabel>
                <Textarea id="candidate-dropdown-menu-message" name="message" placeholder="Check out this file" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose class="radcn-button radcn-button--outline">Cancel</DialogClose>
              <button class="radcn-button" type="submit">Send Invite</button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

export function renderDropdownMenuFixture(fixture: FixtureScenario) {
  let custom = fixture.id === 'custom-token'
  let collision = fixture.id === 'collision'

  if (fixture.id === 'dialog') {
    return <div style={menuStageStyle()}>{dropdownDialogExample()}</div>
  }

  let namedContent = fixture.id === 'demo'
    ? dropdownDemoExample()
    : fixture.id === 'checkboxes'
      ? dropdownCheckboxesExample()
      : fixture.id === 'radio-group'
        ? dropdownRadioGroupExample()
        : dropdownItems(fixture.id)

  return (
    <div style={menuStageStyle(collision)}>
      <DropdownMenu defaultOpen id={`candidate-dropdown-menu-${fixture.id}`}>
        <DropdownMenuTrigger>{fixture.id === 'keyboard-typeahead' ? 'Keyboard menu' : 'Open menu'}</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class={custom ? 'radcn-fixture-custom-menu' : undefined} align={collision ? 'end' : 'start'}>
            {namedContent}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  )
}

function contextItems(scenario: string) {
  let checked = scenario === 'checkbox-radio'
  let custom = scenario === 'custom-token'
  let submenu = scenario === 'submenu'

  return (
    <>
      <ContextMenuLabel>Canvas</ContextMenuLabel>
      <ContextMenuGroup>
        <ContextMenuItem textValue="Open">Open canvas<ContextMenuShortcut>↵</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem disabled textValue="Paste">Paste disabled</ContextMenuItem>
        <ContextMenuItem textValue="Rename">Rename layer</ContextMenuItem>
        <ContextMenuItem variant="destructive" textValue="Remove">Remove layer</ContextMenuItem>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      {checked && (
        <>
          <ContextMenuCheckboxItem checked textValue="Show guides">Show guides</ContextMenuCheckboxItem>
          <ContextMenuRadioGroup value="snap">
            <ContextMenuRadioItem value="free" textValue="Free">Free move</ContextMenuRadioItem>
            <ContextMenuRadioItem value="snap" textValue="Snap">Snap to grid</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </>
      )}
      {submenu && (
        <ContextMenuSub>
          <ContextMenuSubTrigger textValue="Arrange">Arrange</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem textValue="Forward">Bring forward</ContextMenuItem>
            <ContextMenuItem textValue="Backward">Send backward</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      )}
      {custom && <ContextMenuItem textValue="Custom">Custom themed item</ContextMenuItem>}
    </>
  )
}

export function renderContextMenuFixture(fixture: FixtureScenario) {
  let custom = fixture.id === 'custom-token'
  let collision = fixture.id === 'collision'

  return (
    <div style={menuStageStyle(collision)}>
      <ContextMenu defaultOpen id={`candidate-context-menu-${fixture.id}`}>
        <ContextMenuTrigger>
          <div data-context-target style={contextTargetStyle(collision)}>
            {fixture.id === 'keyboard-trigger' ? 'Focus and press Context Menu' : 'Right click target'}
          </div>
        </ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuContent class={custom ? 'radcn-fixture-custom-menu' : undefined}>
            {contextItems(fixture.id)}
          </ContextMenuContent>
        </ContextMenuPortal>
      </ContextMenu>
    </div>
  )
}
