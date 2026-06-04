import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from 'radcn'

function FileMenu() {
  return (
    <MenubarMenu value="file">
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarPortal>
        <MenubarContent>
          <MenubarLabel>File</MenubarLabel>
          <MenubarItem textValue="New tab">New Tab<MenubarShortcut>Cmd+T</MenubarShortcut></MenubarItem>
          <MenubarItem textValue="New window">New Window</MenubarItem>
          <MenubarItem disabled textValue="Import">Import disabled</MenubarItem>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>
  )
}

function ViewMenu() {
  return (
    <MenubarMenu value="view">
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarPortal>
        <MenubarContent>
          <MenubarCheckboxItem checked textValue="Show sidebar">Show Sidebar</MenubarCheckboxItem>
          <MenubarCheckboxItem textValue="Show status bar">Show Status Bar</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="comfortable">
            <MenubarRadioItem value="compact" textValue="Compact">Compact</MenubarRadioItem>
            <MenubarRadioItem value="comfortable" textValue="Comfortable">Comfortable</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>
  )
}

function HelpMenu({ submenu = false }: { submenu?: boolean }) {
  return (
    <MenubarMenu value="help">
      <MenubarTrigger>Help</MenubarTrigger>
      <MenubarPortal>
        <MenubarContent>
          <MenubarItem textValue="Documentation">Documentation</MenubarItem>
          {submenu && (
            <MenubarSub>
              <MenubarSubTrigger textValue="Resources">Resources</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem textValue="API Reference">API Reference</MenubarItem>
                <MenubarItem textValue="Examples">Examples</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          )}
          <MenubarItem textValue="Search">Search Help</MenubarItem>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>
  )
}

function MenubarShell({ className, orientation = 'horizontal', submenu = false }: { className?: string; orientation?: 'horizontal' | 'vertical'; submenu?: boolean }) {
  return (
    <Menubar class={className} id={`candidate-menubar-${orientation}`} orientation={orientation}>
      {FileMenu()}
      {ViewMenu()}
      {HelpMenu({ submenu })}
    </Menubar>
  )
}

export function renderMenubarFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'vertical':
      return MenubarShell({ orientation: 'vertical' })
    case 'checkbox-radio':
      return MenubarShell({})
    case 'submenu':
      return MenubarShell({ submenu: true })
    case 'keyboard-typeahead':
      return MenubarShell({ submenu: true })
    case 'disabled':
      return (
        <Menubar id="candidate-menubar-disabled">
          {FileMenu()}
          <MenubarMenu disabled value="edit">
            <MenubarTrigger disabled>Edit disabled</MenubarTrigger>
            <MenubarPortal><MenubarContent><MenubarItem>Undo</MenubarItem></MenubarContent></MenubarPortal>
          </MenubarMenu>
          {HelpMenu({})}
        </Menubar>
      )
    case 'custom-token':
      return MenubarShell({ className: 'radcn-fixture-custom-menubar' })
    default:
      return MenubarShell({})
  }
}
