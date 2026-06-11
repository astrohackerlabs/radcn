import type { FixtureScenario } from '../../../scenarios/types.ts'
import type { RemixNode } from 'remix/ui'
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPortal,
  ComboboxSeparator,
  ComboboxTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Label,
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from 'radcn'

const items = [
  ['react', 'React'],
  ['remix', 'Remix'],
  ['svelte', 'Svelte'],
  ['vue', 'Vue'],
] as const

const frameworkItems = [
  ['next.js', 'Next.js'],
  ['sveltekit', 'SvelteKit'],
  ['nuxt.js', 'Nuxt.js'],
  ['remix', 'Remix'],
  ['astro', 'Astro'],
] as const

const labelItems = [
  'feature',
  'bug',
  'enhancement',
  'documentation',
  'design',
  'question',
  'maintenance',
] as const

const statusItems = [
  ['backlog', 'Backlog'],
  ['todo', 'Todo'],
  ['in-progress', 'In Progress'],
  ['done', 'Done'],
  ['canceled', 'Canceled'],
] as const

function ComboboxShell({
  children,
  className,
  defaultOpen,
  defaultValue,
  disabled,
  id = 'candidate-combobox',
  invalid,
  multiple,
  name = 'framework',
  placeholder = 'Search framework',
  side = 'bottom',
  align = 'start',
}: {
  align?: 'start' | 'center' | 'end'
  children?: RemixNode
  className?: string
  defaultOpen?: boolean
  defaultValue?: string
  disabled?: boolean
  id?: string
  invalid?: boolean
  multiple?: boolean
  name?: string
  placeholder?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  return (
    <div style="display:grid;gap:8px;max-width:380px">
      <Label for={`${id}-input`} disabled={disabled}>Framework</Label>
      <Combobox class={className} defaultOpen={defaultOpen} defaultValue={defaultValue} disabled={disabled} id={id} invalid={invalid} multiple={multiple} name={name}>
        {multiple && (
          <ComboboxChips>
            <ComboboxChip value="react">React <ComboboxChipRemove /></ComboboxChip>
            <ComboboxChip value="remix">Remix <ComboboxChipRemove /></ComboboxChip>
            <ComboboxChip value="svelte">Svelte <ComboboxChipRemove /></ComboboxChip>
          </ComboboxChips>
        )}
        <div class="radcn-combobox-control">
          <ComboboxInput ariaLabel="Framework" disabled={disabled} placeholder={placeholder} />
          <ComboboxClear />
          <ComboboxTrigger />
        </div>
        <ComboboxPortal>
          <ComboboxContent align={align} class={className} side={side}>
            <ComboboxList>
              {children || items.map(([value, label]) => <ComboboxItem keywords={`${label} javascript`} textValue={label} value={value}>{label}</ComboboxItem>)}
              <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </ComboboxPortal>
      </Combobox>
    </div>
  )
}

function groupedItems() {
  return (
    <>
      <ComboboxGroup>
        <ComboboxLabel>Libraries</ComboboxLabel>
        <ComboboxItem textValue="React" value="react">React</ComboboxItem>
        <ComboboxItem textValue="Remix" value="remix">Remix</ComboboxItem>
      </ComboboxGroup>
      <ComboboxSeparator />
      <ComboboxGroup>
        <ComboboxLabel>Meta frameworks</ComboboxLabel>
        <ComboboxItem textValue="Astro" value="astro">Astro</ComboboxItem>
        <ComboboxItem disabled textValue="Beta disabled" value="beta">Beta disabled</ComboboxItem>
        <ComboboxItem textValue="SvelteKit" value="sveltekit">SvelteKit</ComboboxItem>
      </ComboboxGroup>
    </>
  )
}

function statusCommand(owner: string, placeholder = 'Filter status...') {
  return (
    <div data-fixture-combobox-command-owner={owner} data-fixture-combobox-status-command>
      <Command>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {statusItems.map(([value, label]) => <CommandItem value={value}>{label}</CommandItem>)}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

function ComboboxDemoExample() {
  return (
    <div data-fixture-combobox-example="combobox-demo" data-fixture-combobox-owner="combobox-demo" style="display:grid;gap:8px;max-width:380px">
      <Label for="candidate-combobox-demo-input">Framework</Label>
      <Combobox defaultValue="remix" id="candidate-combobox-demo" name="framework">
        <div class="radcn-combobox-control">
          <ComboboxInput ariaLabel="Framework" placeholder="Search framework..." />
          <ComboboxClear />
          <ComboboxTrigger>v</ComboboxTrigger>
        </div>
        <ComboboxPortal>
          <ComboboxContent>
            <ComboboxList>
              <ComboboxGroup>
                {frameworkItems.map(([value, label]) => <ComboboxItem keywords={`${label} framework`} textValue={label} value={value}>{label}</ComboboxItem>)}
              </ComboboxGroup>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </ComboboxPortal>
      </Combobox>
      <output data-fixture-combobox-label>Remix</output>
    </div>
  )
}

function ComboboxDropdownMenuExample() {
  return (
    <div data-fixture-combobox-example="combobox-dropdown-menu" data-fixture-combobox-owner="combobox-dropdown-menu" style="display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;max-width:520px;border:1px solid var(--radcn-border);border-radius:8px;padding:12px">
      <p style="margin:0;display:flex;align-items:center;gap:8px">
        <span data-fixture-combobox-label style="border-radius:8px;background:var(--radcn-primary);color:var(--radcn-primary-foreground);padding:4px 8px;font-size:12px">feature</span>
        <span style="color:var(--radcn-muted-foreground)">Create a new project</span>
      </p>
      <DropdownMenu id="candidate-combobox-dropdown-menu">
        <DropdownMenuTrigger ariaLabel="Project actions" class="radcn-button radcn-button--ghost radcn-button--icon-sm inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 bg-transparent text-foreground [--radcn-btn-w:2rem] [--radcn-btn-mh:2rem] [--radcn-btn-px:0] [--radcn-btn-py:0]">...</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Assign to...</DropdownMenuItem>
              <DropdownMenuItem>Set due date...</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Apply label</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <div data-fixture-combobox-command-owner="combobox-dropdown-menu" data-fixture-combobox-label-command>
                    <Command>
                      <CommandInput placeholder="Filter label..." />
                      <CommandList>
                        <CommandEmpty>No label found.</CommandEmpty>
                        <CommandGroup>
                          {labelItems.map((label) => <CommandItem value={label}>{label}</CommandItem>)}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete<DropdownMenuShortcut>Cmd+Del</DropdownMenuShortcut></DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  )
}

function ComboboxPopoverExample() {
  return (
    <div data-fixture-combobox-example="combobox-popover" data-fixture-combobox-owner="combobox-popover" style="display:flex;align-items:center;gap:16px">
      <span style="color:var(--radcn-muted-foreground)">Status</span>
      <Popover id="candidate-combobox-popover">
        <PopoverTrigger class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground"><span data-fixture-combobox-label>+ Set status</span></PopoverTrigger>
        <PopoverPortal>
          <PopoverContent align="start" side="right">
            {statusCommand('combobox-popover', 'Change status...')}
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </div>
  )
}

function ComboboxResponsiveExample() {
  return (
    <div data-fixture-combobox-example="combobox-responsive" data-fixture-combobox-owner="combobox-responsive" style="display:grid;gap:14px">
      <div data-fixture-combobox-responsive-branch="desktop" style="display:block">
        <Popover id="candidate-combobox-responsive-popover">
          <PopoverTrigger class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground"><span data-fixture-combobox-label>+ Set status</span></PopoverTrigger>
          <PopoverPortal>
            <PopoverContent align="start">
              {statusCommand('combobox-responsive')}
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </div>
      <div data-fixture-combobox-responsive-branch="mobile" style="display:none">
        <Drawer id="candidate-combobox-responsive-drawer">
          <DrawerTrigger><span data-fixture-combobox-label>+ Set status</span></DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent>
              <Combobox id="candidate-combobox-responsive-mobile" name="status">
                <div class="radcn-combobox-control">
                  <ComboboxInput ariaLabel="Mobile status" placeholder="Filter status..." />
                  <ComboboxTrigger>v</ComboboxTrigger>
                </div>
                <ComboboxPortal>
                  <ComboboxContent>
                    <ComboboxList>
                      {statusItems.map(([value, label]) => <ComboboxItem textValue={label} value={value}>{label}</ComboboxItem>)}
                      <ComboboxEmpty>No results found.</ComboboxEmpty>
                    </ComboboxList>
                  </ComboboxContent>
                </ComboboxPortal>
              </Combobox>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>
      <style>{'@media (max-width: 767px){[data-fixture-combobox-responsive-branch="desktop"]{display:none!important}[data-fixture-combobox-responsive-branch="mobile"]{display:block!important}}'}</style>
    </div>
  )
}

export function renderComboboxFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'demo':
      return ComboboxDemoExample()
    case 'dropdown-menu':
      return ComboboxDropdownMenuExample()
    case 'popover':
      return ComboboxPopoverExample()
    case 'responsive':
      return ComboboxResponsiveExample()
    case 'filtering':
      return ComboboxShell({ defaultOpen: true, defaultValue: 'react', id: 'candidate-combobox-filtering' })
    case 'placeholder':
      return ComboboxShell({ id: 'candidate-combobox-placeholder', placeholder: 'Pick a framework' })
    case 'groups':
      return ComboboxShell({ children: groupedItems(), defaultOpen: true, defaultValue: 'remix', id: 'candidate-combobox-groups' })
    case 'disabled-invalid':
      return <div style="display:grid;gap:18px">{ComboboxShell({ defaultValue: 'react', disabled: true, id: 'candidate-combobox-disabled' })}{ComboboxShell({ id: 'candidate-combobox-invalid', invalid: true })}</div>
    case 'clearable':
      return ComboboxShell({ defaultOpen: true, defaultValue: 'svelte', id: 'candidate-combobox-clearable' })
    case 'chips-multiple':
      return ComboboxShell({ defaultOpen: true, defaultValue: 'react,remix', id: 'candidate-combobox-chips', multiple: true, name: 'frameworks' })
    case 'form-submit-reset':
      return (
        <form action="/fixtures/combobox/form-submit-reset" method="get" style="display:grid;gap:12px;max-width:380px">
          {ComboboxShell({ defaultValue: 'react', id: 'candidate-combobox-form', name: 'framework' })}
          <div style="display:flex;gap:12px">
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    case 'popper-placement':
      return <div style="display:flex;justify-content:flex-end;width:100%;padding-top:80px">{ComboboxShell({ align: 'end', defaultOpen: true, defaultValue: 'vue', id: 'candidate-combobox-popper', side: 'right' })}</div>
    case 'custom-token':
      return ComboboxShell({ className: 'radcn-fixture-custom-combobox', defaultOpen: true, defaultValue: 'remix', id: 'candidate-combobox-custom' })
    default:
      return ComboboxShell({ defaultOpen: true, defaultValue: 'remix', id: 'candidate-combobox-default' })
  }
}
