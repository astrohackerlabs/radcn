import * as React from "react"

import { cn } from "../lib/utils"

function body(scenario: string) {
  if (scenario === "scrollable-content") {
    return (
      <div className="reference-drawer-scroll-body">
        {Array.from({ length: 10 }, (_, index) => (
          <p key={index}>Drawer paragraph {index + 1} keeps content scrolling inside the panel.</p>
        ))}
      </div>
    )
  }

  return (
    <div className="reference-drawer-body">
      <p>Tune the panel behavior without leaving the current page context.</p>
      <button type="button">Focusable action</button>
    </div>
  )
}

function DrawerPanel({
  custom,
  direction = "bottom",
  scenario,
}: {
  custom?: boolean
  direction?: "top" | "right" | "bottom" | "left"
  scenario: string
}) {
  let showHandle = direction === "bottom" && scenario !== "directions"

  return (
    <div className="reference-drawer-root">
      <button aria-expanded="true" aria-haspopup="dialog" className="reference-drawer-trigger" type="button">
        {direction === "bottom" ? "Open drawer" : `Open ${direction}`}
      </button>
      <div className="reference-drawer-portal">
        <div className="reference-drawer-overlay" />
        <div
          aria-describedby={`reference-drawer-${scenario}-${direction}-description`}
          aria-labelledby={`reference-drawer-${scenario}-${direction}-title`}
          aria-modal="true"
          className={cn("reference-drawer-content", custom && "reference-fixture-custom-drawer")}
          data-direction={direction}
          data-state="open"
          role="dialog"
        >
          {showHandle && <div aria-hidden="true" className="reference-drawer-handle" />}
          <div className="reference-drawer-header">
            <h2 id={`reference-drawer-${scenario}-${direction}-title`}>
              {scenario === "scrollable-content" ? "Scrollable drawer" : "Move goal"}
            </h2>
            <p id={`reference-drawer-${scenario}-${direction}-description`}>
              Set the panel policy for this workflow.
            </p>
          </div>
          {body(scenario)}
          <div className="reference-drawer-footer">
            <button type="button">Submit</button>
            <button type="button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function renderDrawerFixture(scenario: string) {
  if (scenario === "directions") {
    return (
      <div style={{ alignItems: "center", display: "flex", justifyContent: "center", minHeight: 180 }}>
        <DrawerPanel direction="bottom" scenario={scenario} />
      </div>
    )
  }

  return (
    <div style={{ display: "grid", minHeight: 180, placeItems: "center" }}>
      <DrawerPanel
        custom={scenario === "custom-token"}
        direction={scenario === "gesture-dismiss" ? "right" : "bottom"}
        scenario={scenario}
      />
    </div>
  )
}
