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

function MenubarDemo() {
  return (
    <div data-candidate-menubar-family="menubar-demo">
      <Menubar id="candidate-menubar-demo">
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarPortal>
            <MenubarContent sideOffset={8}>
              <MenubarItem textValue="New Tab">New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
              <MenubarItem textValue="New Window">New Window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
              <MenubarItem disabled textValue="New Incognito Window">New Incognito Window</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger textValue="Share">Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem textValue="Email link">Email link</MenubarItem>
                  <MenubarItem textValue="Messages">Messages</MenubarItem>
                  <MenubarItem textValue="Notes">Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem textValue="Print...">Print... <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
        <MenubarMenu value="edit">
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarPortal>
            <MenubarContent sideOffset={8}>
              <MenubarItem textValue="Undo">Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
              <MenubarItem textValue="Redo">Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger textValue="Find">Find</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem textValue="Search the web">Search the web</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem textValue="Find...">Find...</MenubarItem>
                  <MenubarItem textValue="Find Next">Find Next</MenubarItem>
                  <MenubarItem textValue="Find Previous">Find Previous</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem textValue="Cut">Cut</MenubarItem>
              <MenubarItem textValue="Copy">Copy</MenubarItem>
              <MenubarItem textValue="Paste">Paste</MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
        <MenubarMenu value="view">
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarPortal>
            <MenubarContent sideOffset={8}>
              <MenubarCheckboxItem textValue="Always Show Bookmarks Bar">Always Show Bookmarks Bar</MenubarCheckboxItem>
              <MenubarCheckboxItem checked textValue="Always Show Full URLs">Always Show Full URLs</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset textValue="Reload">Reload <MenubarShortcut>⌘R</MenubarShortcut></MenubarItem>
              <MenubarItem disabled inset textValue="Force Reload">Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset textValue="Toggle Fullscreen">Toggle Fullscreen</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset textValue="Hide Sidebar">Hide Sidebar</MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
        <MenubarMenu value="profiles">
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarPortal>
            <MenubarContent sideOffset={8}>
              <MenubarRadioGroup value="benoit">
                <MenubarRadioItem value="andy" textValue="Andy">Andy</MenubarRadioItem>
                <MenubarRadioItem value="benoit" textValue="Benoit">Benoit</MenubarRadioItem>
                <MenubarRadioItem value="Luis" textValue="Luis">Luis</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem inset textValue="Edit...">Edit...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset textValue="Add Profile...">Add Profile...</MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
      </Menubar>
    </div>
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
    case 'demo':
      return MenubarDemo()
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
