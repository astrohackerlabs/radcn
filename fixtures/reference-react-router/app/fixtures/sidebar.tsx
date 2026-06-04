function DefaultMenu() {
  return (
    <ul className="reference-sidebar-menu">
      <li><a className="reference-sidebar-menu-button" data-active="true" href="/fixtures/sidebar/default">Dashboard</a></li>
      <li><a className="reference-sidebar-menu-button" href="/fixtures/sidebar/menu-states">Components</a></li>
    </ul>
  )
}

function Shell({ children, scenario }: { children?: React.ReactNode; scenario: string }) {
  let side = scenario === "right" ? "right" : "left"
  let variant = scenario === "floating" ? "floating" : scenario === "inset" ? "inset" : "sidebar"
  let state = scenario === "icon-collapsible" || scenario === "offcanvas" ? "collapsed" : "expanded"
  return (
    <div className={`reference-sidebar-provider ${scenario === "custom-token" ? "reference-fixture-custom-sidebar" : ""}`} data-state={state}>
      <aside className={`reference-sidebar reference-sidebar--${variant}`} data-side={side} data-state={state} data-variant={variant}>
        <div className="reference-sidebar-header"><strong>RadCN</strong><input aria-label="Search workspace" value="Components" readOnly /></div>
        <div className="reference-sidebar-content"><div className="reference-sidebar-group"><div className="reference-sidebar-group-label">Library</div>{children ?? <DefaultMenu />}</div></div>
        <div className="reference-sidebar-footer">v0.0</div>
      </aside>
      <main className="reference-sidebar-inset"><button>☰</button><h2>Application content</h2><p>Sidebar shell fixture.</p></main>
    </div>
  )
}

export function renderSidebarFixture(scenario: string) {
  if (scenario === "menu-states") {
    return <Shell scenario={scenario}><ul className="reference-sidebar-menu"><li><button className="reference-sidebar-menu-button" data-active="true">Active item</button><span className="reference-sidebar-badge">3</span><button className="reference-sidebar-action">⋯</button></li><li><button className="reference-sidebar-menu-button" disabled>Disabled item</button></li></ul></Shell>
  }
  if (scenario === "submenu") {
    return <Shell scenario={scenario}><ul className="reference-sidebar-menu"><li><button className="reference-sidebar-menu-button">Components</button><ul className="reference-sidebar-sub"><li><a data-active="true" href="/fixtures/button/default">Button</a></li><li><a href="/fixtures/sidebar/default">Sidebar</a></li></ul></li></ul></Shell>
  }
  if (scenario === "skeleton") {
    return <Shell scenario={scenario}><div className="reference-sidebar-skeleton">Loading navigation</div></Shell>
  }
  return <Shell scenario={scenario} />
}
