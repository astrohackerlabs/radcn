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

export function renderDropdownMenuFixture(fixture: FixtureScenario) {
  let custom = fixture.id === 'custom-token'
  let collision = fixture.id === 'collision'

  return (
    <div style={menuStageStyle(collision)}>
      <DropdownMenu defaultOpen id={`candidate-dropdown-menu-${fixture.id}`}>
        <DropdownMenuTrigger>{fixture.id === 'keyboard-typeahead' ? 'Keyboard menu' : 'Open menu'}</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class={custom ? 'radcn-fixture-custom-menu' : undefined} align={collision ? 'end' : 'start'}>
            {dropdownItems(fixture.id)}
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
