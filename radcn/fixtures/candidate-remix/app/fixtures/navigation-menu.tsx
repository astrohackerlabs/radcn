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

const navigationMenuComponents = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description: 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

function ProductContent() {
  return (
    <div class="radcn-fixture-navigation-panel">
      <NavigationMenuLink href="/fixtures/button/default">Components</NavigationMenuLink>
      <NavigationMenuLink href="/fixtures/combobox/default">Patterns</NavigationMenuLink>
      <NavigationMenuLink href="/fixtures/select/default">Forms</NavigationMenuLink>
    </div>
  )
}

function NavigationDemoListItem({ children, href, title }: { children: string; href: string; title: string }) {
  return (
    <NavigationMenuLink href={href}>
      <div style="font-weight:600;line-height:1">{title}</div>
      <p style="margin:0.25rem 0 0;color:var(--radcn-muted-foreground);line-height:1.35">{children}</p>
    </NavigationMenuLink>
  )
}

function NavigationMenuDemo() {
  return (
    <div data-candidate-navigation-menu-family="navigation-menu-demo">
      <NavigationMenu defaultValue="home" id="candidate-navigation-menu-demo">
        <NavigationMenuList class="flex-wrap">
          <NavigationMenuItem value="home">
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div style="display:grid;gap:0.75rem;width:min(100%,32rem);grid-template-columns:minmax(0,0.75fr) minmax(0,1fr)">
                <NavigationMenuLink href="/">
                  <div style="display:flex;min-height:10rem;flex-direction:column;justify-content:flex-end;border-radius:var(--radcn-radius);background:var(--radcn-muted);padding:1rem;text-decoration:none">
                    <div style="margin-bottom:0.5rem;font-size:1.125rem;font-weight:500">shadcn/ui</div>
                    <p style="margin:0;color:var(--radcn-muted-foreground);font-size:0.875rem;line-height:1.25">Beautifully designed components built with Tailwind CSS.</p>
                  </div>
                </NavigationMenuLink>
                <div class="radcn-fixture-navigation-panel">
                  {NavigationDemoListItem({
                    href: '/docs',
                    title: 'Introduction',
                    children: 'Re-usable components built using Radix UI and Tailwind CSS.',
                  })}
                  {NavigationDemoListItem({
                    href: '/docs/installation',
                    title: 'Installation',
                    children: 'How to install dependencies and structure your app.',
                  })}
                  {NavigationDemoListItem({
                    href: '/docs/primitives/typography',
                    title: 'Typography',
                    children: 'Styles for headings, paragraphs, lists...etc',
                  })}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="components">
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div style="display:grid;gap:0.5rem;width:min(100%,38rem);grid-template-columns:repeat(2,minmax(0,1fr))">
                {navigationMenuComponents.map((component) =>
                  NavigationDemoListItem({
                    href: component.href,
                    title: component.title,
                    children: component.description,
                  }),
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="docs">
            <NavigationMenuLink class="radcn-candidate-navigation-menu-trigger-link" href="/docs">Docs</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem class="radcn-candidate-navigation-menu-desktop-only" value="list">
            <NavigationMenuTrigger>List</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div class="radcn-fixture-navigation-panel" style="width:19rem">
                {NavigationDemoListItem({
                  href: '#',
                  title: 'Components',
                  children: 'Browse all components in the library.',
                })}
                {NavigationDemoListItem({
                  href: '#',
                  title: 'Documentation',
                  children: 'Learn how to use the library.',
                })}
                {NavigationDemoListItem({
                  href: '#',
                  title: 'Blog',
                  children: 'Read our latest blog posts.',
                })}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem class="radcn-candidate-navigation-menu-desktop-only" value="simple">
            <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div class="radcn-fixture-navigation-panel" style="width:13rem">
                <NavigationMenuLink href="#">Components</NavigationMenuLink>
                <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
                <NavigationMenuLink href="#">Blocks</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem class="radcn-candidate-navigation-menu-desktop-only" value="with-icon">
            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div class="radcn-fixture-navigation-panel" style="width:13rem">
                <NavigationMenuLink href="#" style="flex-direction:row;align-items:center;justify-content:flex-start;gap:0.5rem">
                  <span aria-hidden="true" data-candidate-navigation-menu-icon="help">?</span>
                  Backlog
                </NavigationMenuLink>
                <NavigationMenuLink href="#" style="flex-direction:row;align-items:center;justify-content:flex-start;gap:0.5rem">
                  <span aria-hidden="true" data-candidate-navigation-menu-icon="circle">o</span>
                  To Do
                </NavigationMenuLink>
                <NavigationMenuLink href="#" style="flex-direction:row;align-items:center;justify-content:flex-start;gap:0.5rem">
                  <span aria-hidden="true" data-candidate-navigation-menu-icon="check">✓</span>
                  Done
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator />
        <NavigationMenuViewport />
      </NavigationMenu>
      <button type="button">After navigation</button>
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
    case 'demo':
      return NavigationMenuDemo()
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
