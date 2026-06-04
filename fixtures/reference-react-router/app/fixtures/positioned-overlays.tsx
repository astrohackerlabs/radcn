import * as React from "react"

import { cn } from "../lib/utils"

type Side = "top" | "right" | "bottom" | "left"
type Align = "start" | "center" | "end"

function anchorStyle(edge = false): React.CSSProperties {
  return {
    alignItems: "center",
    display: "flex",
    justifyContent: edge ? "flex-end" : "center",
    minHeight: 120,
    width: "100%",
  }
}

function positionedStyle(side: Side, align: Align): React.CSSProperties {
  let style: React.CSSProperties = { position: "absolute" }
  if (side === "bottom") style = { ...style, left: align === "end" ? "auto" : "50%", right: align === "end" ? 0 : "auto", top: "calc(100% + 8px)", transform: align === "end" ? undefined : "translateX(-50%)" }
  if (side === "top") style = { ...style, bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }
  if (side === "right") style = { ...style, left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
  if (side === "left") style = { ...style, right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
  return style
}

export function renderPopoverFixture(scenario: string) {
  return <ReferencePopover scenario={scenario} />
}

function ReferencePopover({ scenario }: { scenario: string }) {
  let [open, setOpen] = React.useState(scenario === "default-open")
  let custom = scenario === "custom-token"
  let sideAlign = scenario === "side-align"
  let contentId = `reference-popover-${scenario}-content`

  return (
    <div style={anchorStyle(sideAlign)}>
      <div className="reference-positioned-root">
        <button
          aria-controls={contentId}
          aria-expanded={open ? "true" : "false"}
          aria-haspopup="dialog"
          className="reference-popover-trigger"
          data-state={open ? "open" : "closed"}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {scenario === "outside-dismiss" ? "Open dismissible popover" : "Open popover"}
        </button>
        {sideAlign && (
          <span className="reference-popover-anchor" data-popover-anchor-box>
            Anchor
          </span>
        )}
        {open && (
          <div
            className={cn("reference-popover-content", custom && "reference-fixture-custom-popover")}
            data-align={sideAlign ? "end" : "center"}
            data-side={sideAlign ? "left" : "bottom"}
            data-state="open"
            id={contentId}
            style={positionedStyle(sideAlign ? "left" : "bottom", sideAlign ? "end" : "center")}
          >
            <div className="reference-popover-header">
              <h2 className="reference-popover-title">{custom ? "Custom popover" : "Deployment status"}</h2>
              <p className="reference-popover-description">Preview release channels and deployment health.</p>
            </div>
            <button className="reference-overlay-secondary" type="button">View details</button>
            <button className="reference-popover-close" onClick={() => setOpen(false)} type="button">Close</button>
          </div>
        )}
      </div>
    </div>
  )
}

export function renderTooltipFixture(scenario: string) {
  let custom = scenario === "custom-token"
  let side: Side = scenario === "side" ? "right" : "top"
  let contentId = `reference-tooltip-${scenario}-content`

  return (
    <div style={anchorStyle(scenario === "side")}>
      <div className="reference-positioned-root">
        <button aria-describedby={contentId} className="reference-tooltip-trigger" type="button">
          {scenario === "focus" ? "Focus target" : "Hover target"}
        </button>
        <span
          className={cn("reference-tooltip-content", custom && "reference-fixture-custom-tooltip")}
          data-side={side}
          data-state="open"
          id={contentId}
          role="tooltip"
          style={positionedStyle(side, "center")}
        >
          {custom ? "Custom tooltip" : "Tooltip content"}
          <span aria-hidden="true" className="reference-tooltip-arrow" />
        </span>
      </div>
    </div>
  )
}

export function renderHoverCardFixture(scenario: string) {
  let custom = scenario === "custom-token"
  let sideAlign = scenario === "side-align"

  return (
    <div style={anchorStyle(sideAlign)}>
      <div className="reference-positioned-root">
        <button className="reference-hover-card-trigger" type="button">{scenario === "focus" ? "Focus profile" : "Hover profile"}</button>
        <span
          className={cn("reference-hover-card-content", custom && "reference-fixture-custom-hover-card")}
          data-align={sideAlign ? "end" : "center"}
          data-side={sideAlign ? "left" : "bottom"}
          data-state="open"
          style={positionedStyle(sideAlign ? "left" : "bottom", sideAlign ? "end" : "center")}
        >
          <span aria-hidden="true" className="reference-hover-card-avatar">RC</span>
          <span className="reference-hover-card-body">
            <strong>{custom ? "Custom hover card" : "RadCN Library"}</strong>
            <span>Composable Remix 3 components with shadcn-inspired styling.</span>
            <button className="reference-overlay-secondary" type="button">Follow</button>
          </span>
        </span>
      </div>
    </div>
  )
}
