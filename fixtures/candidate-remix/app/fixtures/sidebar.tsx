import type { RemixNode } from 'remix/ui'
import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  type SidebarCollapsible,
  type SidebarSide,
  type SidebarVariant,
} from 'radcn'

function SidebarShell({ children, fixture }: { children?: RemixNode; fixture: FixtureScenario }) {
  let side: SidebarSide = fixture.id === 'right' ? 'right' : 'left'
  let variant: SidebarVariant = fixture.id === 'floating' ? 'floating' : fixture.id === 'inset' ? 'inset' : 'sidebar'
  let collapsible: SidebarCollapsible = fixture.id === 'icon-collapsible' ? 'icon' : fixture.id === 'offcanvas' ? 'offcanvas' : 'none'
  let defaultOpen = fixture.id !== 'icon-collapsible' && fixture.id !== 'offcanvas'
  let custom = fixture.id === 'custom-token'

  return (
    <SidebarProvider class={custom ? 'radcn-fixture-custom-sidebar' : undefined} defaultOpen={defaultOpen}>
      <Sidebar collapsible={collapsible} side={side} variant={variant}>
        <SidebarHeader>
          <strong>RadCN</strong>
          <SidebarInput ariaLabel="Search workspace" placeholder="Search" value="Components" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Library</SidebarGroupLabel>
            <SidebarGroupAction ariaLabel="Add item">+</SidebarGroupAction>
            <SidebarGroupContent>{children ?? DefaultMenu()}</SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>v0.0</SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <h2>Application content</h2>
        <p>Sidebar shell fixture.</p>
      </SidebarInset>
    </SidebarProvider>
  )
}

function DefaultMenu() {
  return (
    <SidebarMenu>
      <SidebarMenuItem><SidebarMenuButton href="/fixtures/sidebar/default" isActive>Dashboard</SidebarMenuButton></SidebarMenuItem>
      <SidebarMenuItem><SidebarMenuButton href="/fixtures/sidebar/menu-states">Components</SidebarMenuButton></SidebarMenuItem>
    </SidebarMenu>
  )
}

export function renderSidebarFixture(fixture: FixtureScenario) {
  if (fixture.id === 'menu-states') {
    return SidebarShell({
      fixture,
      children: (
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive>Active item</SidebarMenuButton>
            <SidebarMenuBadge>3</SidebarMenuBadge>
            <SidebarMenuAction ariaLabel="Item actions">⋯</SidebarMenuAction>
          </SidebarMenuItem>
          <SidebarMenuItem><SidebarMenuButton disabled>Disabled item</SidebarMenuButton></SidebarMenuItem>
        </SidebarMenu>
      ),
    })
  }

  if (fixture.id === 'submenu') {
    return SidebarShell({
      fixture,
      children: (
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Components</SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem><SidebarMenuSubButton href="/fixtures/button/default" isActive>Button</SidebarMenuSubButton></SidebarMenuSubItem>
              <SidebarMenuSubItem><SidebarMenuSubButton href="/fixtures/sidebar/default">Sidebar</SidebarMenuSubButton></SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      ),
    })
  }

  if (fixture.id === 'skeleton') {
    return SidebarShell({ fixture, children: <SidebarMenu><SidebarMenuItem><SidebarMenuSkeleton>Loading navigation</SidebarMenuSkeleton></SidebarMenuItem></SidebarMenu> })
  }

  return SidebarShell({ fixture })
}
