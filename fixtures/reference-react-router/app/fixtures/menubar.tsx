import { cn } from "../lib/utils"

function ReferenceMenubar({ className, orientation = "horizontal", submenu = false }: { className?: string; orientation?: "horizontal" | "vertical"; submenu?: boolean }) {
  return (
    <div className={cn("reference-menubar", orientation === "vertical" && "reference-menubar--vertical", className)} role="menubar" aria-orientation={orientation}>
      <button className="reference-menubar-trigger" role="menuitem" aria-haspopup="menu" aria-expanded="true">File</button>
      <button className="reference-menubar-trigger" role="menuitem" aria-haspopup="menu" aria-expanded="false">View</button>
      <button className="reference-menubar-trigger" role="menuitem" aria-haspopup="menu" aria-expanded="false">Help</button>
      <div className="reference-menubar-content" role="menu">
        <div className="reference-menubar-label">File</div>
        <button className="reference-menubar-item" role="menuitem">New Tab<span className="reference-menubar-shortcut">Cmd+T</span></button>
        <button className="reference-menubar-item" role="menuitem">New Window</button>
        <button className="reference-menubar-item" role="menuitem" aria-disabled="true" data-disabled="true">Import disabled</button>
        <div className="reference-menubar-separator" role="separator" />
        <button className="reference-menubar-checkbox-item" role="menuitemcheckbox" aria-checked="true"><span className="reference-menubar-indicator">✓</span>Show Sidebar</button>
        <button className="reference-menubar-radio-item" role="menuitemradio" aria-checked="true"><span className="reference-menubar-indicator">●</span>Comfortable</button>
        {submenu && <button className="reference-menubar-item" role="menuitem" aria-haspopup="menu" aria-expanded="false">Resources<span className="reference-menubar-caret">›</span></button>}
      </div>
    </div>
  )
}

export function renderMenubarFixture(id: string) {
  switch (id) {
    case "vertical":
      return <ReferenceMenubar orientation="vertical" />
    case "submenu":
    case "keyboard-typeahead":
      return <ReferenceMenubar submenu />
    case "custom-token":
      return <ReferenceMenubar className="reference-fixture-custom-menubar" />
    default:
      return <ReferenceMenubar />
  }
}
