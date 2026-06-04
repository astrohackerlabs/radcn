import * as React from "react"

import { cn } from "../lib/utils"

function menuStageStyle(edge = false): React.CSSProperties {
  return {
    alignItems: edge ? "flex-end" : "center",
    display: "flex",
    justifyContent: edge ? "flex-end" : "center",
    minHeight: 150,
    width: "100%",
  }
}

function contextTargetStyle(edge = false): React.CSSProperties {
  return {
    background: "#f8fafc",
    border: "1px dashed #94a3b8",
    borderRadius: 8,
    color: "#334155",
    display: "grid",
    font: "500 0.875rem/1.3 var(--font-sans)",
    height: 120,
    marginLeft: edge ? "auto" : undefined,
    placeItems: "center",
    width: 220,
  }
}

function DropdownItems({ scenario }: { scenario: string }) {
  let checked = scenario === "checkbox-radio"
  let submenu = scenario === "submenu"
  let custom = scenario === "custom-token"

  return (
    <>
      <div className="reference-menu-label">Project</div>
      <div role="group">
        <button className="reference-menu-item" role="menuitem" type="button">Alpha action<span className="reference-menu-shortcut">⌘A</span></button>
        <button aria-disabled="true" className="reference-menu-item" data-disabled="true" role="menuitem" type="button">Beta disabled</button>
        <button className="reference-menu-item" role="menuitem" type="button">Gamma action</button>
        <button className="reference-menu-item reference-menu-item--destructive" role="menuitem" type="button">Delete project</button>
      </div>
      <div className="reference-menu-separator" role="separator" />
      {checked && (
        <>
          <button aria-checked="true" className="reference-menu-item" data-state="checked" role="menuitemcheckbox" type="button"><span className="reference-menu-indicator">✓</span>Show toolbar</button>
          <div role="group">
            <button aria-checked="false" className="reference-menu-item" data-state="unchecked" role="menuitemradio" type="button"><span className="reference-menu-indicator">●</span>Compact</button>
            <button aria-checked="true" className="reference-menu-item" data-state="checked" role="menuitemradio" type="button"><span className="reference-menu-indicator">●</span>Comfortable</button>
          </div>
        </>
      )}
      {submenu && (
        <div className="reference-menu-sub">
          <button aria-expanded="true" aria-haspopup="menu" className="reference-menu-item" data-state="open" role="menuitem" type="button">Share<span className="reference-menu-caret">›</span></button>
          <div className="reference-menu-sub-content" data-state="open" role="menu">
            <button className="reference-menu-item" role="menuitem" type="button">Email link</button>
            <button className="reference-menu-item" role="menuitem" type="button">Copy link</button>
          </div>
        </div>
      )}
      {custom && <button className="reference-menu-item" role="menuitem" type="button">Custom themed item</button>}
    </>
  )
}

export function renderDropdownMenuFixture(scenario: string) {
  let custom = scenario === "custom-token"
  let collision = scenario === "collision"

  return (
    <div style={menuStageStyle(collision)}>
      <div className="reference-menu-root">
        <button aria-expanded="true" aria-haspopup="menu" className="reference-menu-trigger" type="button">
          {scenario === "keyboard-typeahead" ? "Keyboard menu" : "Open menu"}
        </button>
        <div className={cn("reference-menu-content", custom && "reference-fixture-custom-menu")} data-state="open" role="menu">
          <DropdownItems scenario={scenario} />
        </div>
      </div>
    </div>
  )
}

function ContextItems({ scenario }: { scenario: string }) {
  let checked = scenario === "checkbox-radio"
  let submenu = scenario === "submenu"
  let custom = scenario === "custom-token"

  return (
    <>
      <div className="reference-menu-label">Canvas</div>
      <button className="reference-menu-item" role="menuitem" type="button">Open canvas<span className="reference-menu-shortcut">↵</span></button>
      <button aria-disabled="true" className="reference-menu-item" data-disabled="true" role="menuitem" type="button">Paste disabled</button>
      <button className="reference-menu-item" role="menuitem" type="button">Rename layer</button>
      <button className="reference-menu-item reference-menu-item--destructive" role="menuitem" type="button">Remove layer</button>
      <div className="reference-menu-separator" role="separator" />
      {checked && (
        <>
          <button aria-checked="true" className="reference-menu-item" data-state="checked" role="menuitemcheckbox" type="button"><span className="reference-menu-indicator">✓</span>Show guides</button>
          <button aria-checked="false" className="reference-menu-item" data-state="unchecked" role="menuitemradio" type="button"><span className="reference-menu-indicator">●</span>Free move</button>
          <button aria-checked="true" className="reference-menu-item" data-state="checked" role="menuitemradio" type="button"><span className="reference-menu-indicator">●</span>Snap to grid</button>
        </>
      )}
      {submenu && (
        <div className="reference-menu-sub">
          <button aria-expanded="true" aria-haspopup="menu" className="reference-menu-item" data-state="open" role="menuitem" type="button">Arrange<span className="reference-menu-caret">›</span></button>
          <div className="reference-menu-sub-content" data-state="open" role="menu">
            <button className="reference-menu-item" role="menuitem" type="button">Bring forward</button>
            <button className="reference-menu-item" role="menuitem" type="button">Send backward</button>
          </div>
        </div>
      )}
      {custom && <button className="reference-menu-item" role="menuitem" type="button">Custom themed item</button>}
    </>
  )
}

export function renderContextMenuFixture(scenario: string) {
  let custom = scenario === "custom-token"
  let collision = scenario === "collision"

  return (
    <div style={menuStageStyle(collision)}>
      <div className="reference-menu-root">
        <div className="reference-context-menu-trigger" role="button" style={contextTargetStyle(collision)} tabIndex={0}>
          {scenario === "keyboard-trigger" ? "Focus and press Context Menu" : "Right click target"}
        </div>
        <div className={cn("reference-menu-content", custom && "reference-fixture-custom-menu")} data-state="open" role="menu">
          <ContextItems scenario={scenario} />
        </div>
      </div>
    </div>
  )
}
