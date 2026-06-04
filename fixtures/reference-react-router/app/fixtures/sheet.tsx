import * as React from "react"

import { cn } from "../lib/utils"

type SheetSide = "top" | "right" | "bottom" | "left"

function sideFromScenario(scenario: string): SheetSide {
  if (scenario === "left" || scenario === "top" || scenario === "bottom") return scenario
  return "right"
}

export function renderSheetFixture(scenario: string) {
  return <ReferenceSheet scenario={scenario} />
}

function ReferenceSheet({ scenario }: { scenario: string }) {
  let [open, setOpen] = React.useState(false)
  let custom = scenario === "custom-token"
  let side = sideFromScenario(scenario)
  let titleId = `reference-sheet-${scenario}-title`
  let descriptionId = `reference-sheet-${scenario}-description`

  React.useEffect(() => {
    if (!open) return
    let previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <button aria-haspopup="dialog" className="reference-sheet-trigger" data-state={open ? "open" : "closed"} onClick={() => setOpen(true)} type="button">
        Open {side} sheet
      </button>
      {open && (
        <div className={cn("reference-sheet-portal", custom && "reference-fixture-custom-sheet")} data-state="open">
          <div className="reference-sheet-overlay" data-state="open" onClick={() => setOpen(false)} />
          <div
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            aria-modal="true"
            className={cn("reference-sheet-content", `reference-sheet-content--${side}`, custom && "reference-fixture-custom-sheet")}
            data-side={side}
            data-state="open"
            role="dialog"
            tabIndex={-1}
          >
            <button aria-label="Close" className="reference-sheet-close" onClick={() => setOpen(false)} type="button">
              <span aria-hidden="true">x</span>
            </button>
            <div className="reference-sheet-header">
              <h2 className="reference-sheet-title" id={titleId}>{custom ? "Custom sheet" : "Team settings"}</h2>
              <p className="reference-sheet-description" id={descriptionId}>
                Adjust project settings from a side panel.
              </p>
            </div>
            <label className="reference-sheet-label">
              Team name
              <input className="reference-sheet-input" defaultValue="Design Systems" />
            </label>
            <div className="reference-sheet-footer">
              <button className="reference-sheet-action" onClick={() => setOpen(false)} type="button">Save changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
