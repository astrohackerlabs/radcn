import * as React from "react"

import { cn } from "../lib/utils"

export function renderAlertDialogFixture(scenario: string) {
  return <ReferenceAlertDialog scenario={scenario} />
}

function ReferenceAlertDialog({ scenario }: { scenario: string }) {
  let [open, setOpen] = React.useState(scenario === "default-open")
  let small = scenario === "small"
  let custom = scenario === "custom-token"
  let titleId = `reference-alert-dialog-${scenario}-title`
  let descriptionId = `reference-alert-dialog-${scenario}-description`

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
      <button aria-haspopup="dialog" className="reference-alert-dialog-trigger" data-state={open ? "open" : "closed"} onClick={() => setOpen(true)} type="button">
        Delete project
      </button>
      {open && (
        <div className={cn("reference-alert-dialog-portal", custom && "reference-fixture-custom-alert-dialog")} data-state="open">
          <div className="reference-alert-dialog-overlay" data-state="open" />
          <div
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            aria-modal="true"
            className={cn("reference-alert-dialog-content", small && "reference-alert-dialog-content--sm", custom && "reference-fixture-custom-alert-dialog")}
            data-size={small ? "sm" : "default"}
            data-state="open"
            role="alertdialog"
            tabIndex={-1}
          >
            <div className="reference-alert-dialog-media">!</div>
            <div className="reference-alert-dialog-header">
              <h2 className="reference-alert-dialog-title" id={titleId}>{custom ? "Custom destructive action" : "Delete project?"}</h2>
              <p className="reference-alert-dialog-description" id={descriptionId}>
                This action cannot be undone. The project and deployments will be removed.
              </p>
            </div>
            <div className="reference-alert-dialog-footer">
              <button className="reference-alert-dialog-action" onClick={() => setOpen(false)} type="button">Delete</button>
              <button className="reference-alert-dialog-cancel" onClick={() => setOpen(false)} type="button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
