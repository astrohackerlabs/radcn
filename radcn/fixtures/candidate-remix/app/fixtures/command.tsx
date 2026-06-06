import type { FixtureScenario } from '../../../scenarios/types.ts'
import type { RemixNode } from 'remix/ui'
import { Kbd, KbdGroup } from 'radcn'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from 'radcn'

function CommandExampleIcon({ label }: { label: string }) {
  return <span aria-hidden="true" data-fixture-command-icon={label}>{label.slice(0, 1)}</span>
}

function CommandExampleLabel({ icon, children }: { children: RemixNode; icon: string }) {
  return <span data-fixture-command-row-content style="display:inline-flex;align-items:center;gap:0.5rem;min-width:0;">{CommandExampleIcon({ label: icon })}<span>{children}</span></span>
}

function commandExampleItems({ dialog = false }: { dialog?: boolean } = {}) {
  return (
    <>
      <CommandGroup heading="Suggestions" id={dialog ? 'candidate-command-dialog-suggestions' : 'candidate-command-demo-suggestions'}>
        <CommandItem value="calendar">{CommandExampleLabel({ icon: 'Calendar', children: 'Calendar' })}</CommandItem>
        <CommandItem value="search-emoji">{CommandExampleLabel({ icon: 'Smile', children: 'Search Emoji' })}</CommandItem>
        <CommandItem disabled={!dialog} value="calculator">{CommandExampleLabel({ icon: 'Calculator', children: 'Calculator' })}</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings" id={dialog ? 'candidate-command-dialog-settings' : 'candidate-command-demo-settings'}>
        <CommandItem value="profile">{CommandExampleLabel({ icon: 'User', children: 'Profile' })}<CommandShortcut>⌘P</CommandShortcut></CommandItem>
        <CommandItem value="billing">{CommandExampleLabel({ icon: 'CreditCard', children: 'Billing' })}<CommandShortcut>⌘B</CommandShortcut></CommandItem>
        <CommandItem value="settings">{CommandExampleLabel({ icon: 'Settings', children: 'Settings' })}<CommandShortcut>⌘S</CommandShortcut></CommandItem>
      </CommandGroup>
    </>
  )
}

function CommandShell({
  children,
  className,
  defaultQuery,
  dialog,
  id = 'candidate-command',
}: {
  children?: RemixNode
  className?: string
  defaultQuery?: string
  dialog?: boolean
  id?: string
}) {
  let command = (
    <Command class={className} id={id}>
      <CommandInput ariaLabel="Command" defaultValue={defaultQuery} placeholder="Type a command or search..." />
      <CommandList>
        {children || commandItems()}
        <CommandEmpty>No command found.</CommandEmpty>
      </CommandList>
    </Command>
  )

  if (dialog) {
    return <CommandDialog defaultOpen title="Command Palette" description="Search for an action.">{command}</CommandDialog>
  }

  return <div data-default-query={defaultQuery} style="width:min(100%,420px)">{command}</div>
}

function commandItems() {
  return (
    <>
      <CommandGroup>
        <CommandItem value="open-file">Open File<CommandShortcut>Cmd+O</CommandShortcut></CommandItem>
        <CommandItem value="save-file">Save File<CommandShortcut>Cmd+S</CommandShortcut></CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup>
        <CommandItem disabled value="deploy">Deploy disabled</CommandItem>
        <CommandItem value="settings">Settings<CommandShortcut>Cmd+,</CommandShortcut></CommandItem>
      </CommandGroup>
    </>
  )
}

export function renderCommandFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'filtering':
      return CommandShell({ defaultQuery: 'set', id: 'candidate-command-filtering' })
    case 'empty':
      return CommandShell({ defaultQuery: 'zzzz', id: 'candidate-command-empty' })
    case 'groups':
      return CommandShell({ id: 'candidate-command-groups' })
    case 'disabled':
      return CommandShell({ id: 'candidate-command-disabled' })
    case 'shortcuts':
      return CommandShell({ id: 'candidate-command-shortcuts' })
    case 'checked':
      return CommandShell({ children: <CommandItem checked value="settings">Settings</CommandItem>, id: 'candidate-command-checked' })
    case 'dialog':
      return CommandShell({ dialog: true, id: 'candidate-command-dialog' })
    case 'demo':
      return CommandShell({
        children: commandExampleItems(),
        className: 'radcn-fixture-command-demo',
        id: 'candidate-command-demo',
      })
    case 'dialog-demo':
      return (
        <div data-fixture-command-dialog-shortcut="true">
          <p data-fixture-command-dialog-guidance style="margin:0 0 0.75rem;color:var(--radcn-muted-foreground);font-size:0.875rem;">
            Press <KbdGroup><Kbd>⌘</Kbd><Kbd>J</Kbd></KbdGroup>
          </p>
          <CommandDialog title="Command Palette" description="Search for a command to run...">
            <Command id="candidate-command-dialog-demo">
              <CommandInput ariaLabel="Command dialog" placeholder="Type a command or search..." />
              <CommandList>
                {commandExampleItems({ dialog: true })}
                <CommandEmpty>No results found.</CommandEmpty>
              </CommandList>
            </Command>
          </CommandDialog>
        </div>
      )
    case 'custom-token':
      return CommandShell({ className: 'radcn-fixture-custom-command', id: 'candidate-command-custom' })
    default:
      return CommandShell({ id: 'candidate-command-default' })
  }
}
