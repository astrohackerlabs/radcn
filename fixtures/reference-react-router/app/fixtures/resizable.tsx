function Panel({ children }: { children: string }) {
  return <div className="reference-fixture-panel">{children}</div>
}

export function renderResizableFixture(scenario: string) {
  let vertical = scenario === "vertical"
  let custom = scenario === "custom-token"
  return (
    <div className={`reference-resizable reference-resizable--${vertical ? "vertical" : "horizontal"} ${custom ? "reference-fixture-custom-resizable" : ""}`}>
      <div className="reference-resizable-panel" style={{ flexBasis: scenario === "keyboard" ? "40%" : "50%" }}><Panel>Navigation</Panel></div>
      <div aria-orientation={vertical ? "vertical" : "horizontal"} aria-valuemax={90} aria-valuemin={10} aria-valuenow={scenario === "keyboard" ? 40 : 50} className="reference-resizable-handle" role="separator">{scenario === "with-handle" || scenario === "keyboard" ? <span>⋮</span> : null}</div>
      <div className="reference-resizable-panel" style={{ flexBasis: scenario === "keyboard" ? "60%" : "50%" }}><Panel>Preview</Panel></div>
    </div>
  )
}
