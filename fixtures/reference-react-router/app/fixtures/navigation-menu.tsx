import { cn } from "../lib/utils"

function ReferenceNavigationMenu({ className, orientation = "horizontal" }: { className?: string; orientation?: "horizontal" | "vertical" }) {
  return (
    <nav aria-label="Main navigation" className={cn("reference-navigation-menu", orientation === "vertical" && "reference-navigation-menu--vertical", className)} data-orientation={orientation}>
      <ul className="reference-navigation-menu-list">
        <li className="reference-navigation-menu-item" data-state="open">
          <button className="reference-navigation-menu-trigger" aria-expanded="true">Product</button>
          <div className="reference-navigation-menu-content">
            <a className="reference-navigation-menu-link" href="/fixtures/button/default">Components</a>
            <a className="reference-navigation-menu-link" href="/fixtures/combobox/default">Patterns</a>
            <a className="reference-navigation-menu-link" href="/fixtures/select/default">Forms</a>
          </div>
        </li>
        <li className="reference-navigation-menu-item" data-state="closed">
          <button className="reference-navigation-menu-trigger" aria-expanded="false">Docs</button>
        </li>
        <li className="reference-navigation-menu-item">
          <a className="reference-navigation-menu-link" href="/fixtures/card/default">Pricing</a>
        </li>
        <li className="reference-navigation-menu-item" data-disabled="true">
          <button className="reference-navigation-menu-trigger" aria-disabled="true">Disabled</button>
        </li>
      </ul>
      <div className="reference-navigation-menu-indicator" aria-hidden="true" />
      <div className="reference-navigation-menu-viewport" aria-hidden="true" />
    </nav>
  )
}

export function renderNavigationMenuFixture(id: string) {
  switch (id) {
    case "vertical":
      return <ReferenceNavigationMenu orientation="vertical" />
    case "custom-token":
      return <ReferenceNavigationMenu className="reference-fixture-custom-navigation-menu" />
    default:
      return <ReferenceNavigationMenu />
  }
}
