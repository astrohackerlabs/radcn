import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radcn'

function ProductContent() {
  return (
    <div class="radcn-fixture-navigation-panel">
      <NavigationMenuLink href="/fixtures/button/default">Components</NavigationMenuLink>
      <NavigationMenuLink href="/fixtures/combobox/default">Patterns</NavigationMenuLink>
      <NavigationMenuLink href="/fixtures/select/default">Forms</NavigationMenuLink>
    </div>
  )
}

function NavigationShell({ className, orientation = 'horizontal' }: { className?: string; orientation?: 'horizontal' | 'vertical' }) {
  return (
    <div style="display:grid;gap:12px">
      <NavigationMenu class={className} defaultValue="product" id={`candidate-navigation-menu-${orientation}`} orientation={orientation}>
        <NavigationMenuList>
          <NavigationMenuItem value="product">
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>{ProductContent()}</NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="docs">
            <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div class="radcn-fixture-navigation-panel">
                <NavigationMenuLink href="/fixtures/command/default">Command</NavigationMenuLink>
                <NavigationMenuLink current href="/fixtures/menubar/default">Menubar</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="pricing">
            <NavigationMenuLink href="/fixtures/card/default">Pricing</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem disabled value="disabled">
            <NavigationMenuTrigger disabled>Disabled</NavigationMenuTrigger>
            <NavigationMenuContent>Disabled content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator />
        <NavigationMenuViewport />
      </NavigationMenu>
      <button type="button">After navigation</button>
    </div>
  )
}

export function renderNavigationMenuFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'vertical':
      return NavigationShell({ orientation: 'vertical' })
    case 'links':
    case 'viewport':
    case 'indicator':
      return NavigationShell({})
    case 'disabled':
      return NavigationShell({})
    case 'custom-token':
      return NavigationShell({ className: 'radcn-fixture-custom-navigation-menu' })
    default:
      return NavigationShell({})
  }
}
