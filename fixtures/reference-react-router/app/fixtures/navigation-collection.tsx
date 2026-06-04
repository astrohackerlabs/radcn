import { cn } from "../lib/utils"

function MiniButton({ children }: { children: React.ReactNode }) {
  return <button className="reference-mini-button">{children}</button>
}

export function renderBreadcrumbFixture(scenario: string) {
  let custom = scenario === "custom-separator"

  return (
    <nav aria-label="breadcrumb" className={cn("reference-breadcrumb", custom && "reference-fixture-custom-breadcrumb")}>
      <ol className="reference-breadcrumb-list">
        <li className="reference-breadcrumb-item"><a className="reference-breadcrumb-link" href="/fixtures">Fixtures</a></li>
        <li aria-hidden="true" className="reference-breadcrumb-separator" role="presentation">{custom ? ">" : "/"}</li>
        {scenario === "collapsed" ? (
          <>
            <li className="reference-breadcrumb-item"><span aria-hidden="true" className="reference-breadcrumb-ellipsis" role="presentation">...<span className="sr-only">More</span></span></li>
            <li aria-hidden="true" className="reference-breadcrumb-separator" role="presentation">/</li>
          </>
        ) : null}
        <li className="reference-breadcrumb-item"><a className="reference-breadcrumb-link" href="/fixtures/breadcrumb">Breadcrumb</a></li>
        <li aria-hidden="true" className="reference-breadcrumb-separator" role="presentation">{custom ? ">" : "/"}</li>
        <li className="reference-breadcrumb-item"><span aria-current="page" aria-disabled="true" className="reference-breadcrumb-page" role="link">{custom ? "Custom separator" : "Default"}</span></li>
      </ol>
    </nav>
  )
}

export function renderButtonGroupFixture(scenario: string) {
  if (scenario === "vertical") {
    return (
      <div className="reference-button-group reference-button-group--vertical" data-orientation="vertical" role="group">
        <MiniButton>Top</MiniButton>
        <MiniButton>Middle</MiniButton>
        <MiniButton>Bottom</MiniButton>
      </div>
    )
  }

  if (scenario === "with-separator") {
    return (
      <div className="reference-button-group" data-orientation="horizontal" role="group">
        <MiniButton>Save</MiniButton>
        <div aria-orientation="vertical" className="reference-button-group-separator" role="separator" />
        <div className="reference-button-group-text">Draft</div>
        <MiniButton>Publish</MiniButton>
      </div>
    )
  }

  return (
    <div className="reference-button-group" data-orientation="horizontal" role="group">
      <MiniButton>Day</MiniButton>
      <MiniButton>Week</MiniButton>
      <MiniButton>Month</MiniButton>
    </div>
  )
}

export function renderItemFixture(scenario: string) {
  if (scenario === "variants") {
    return (
      <div className="reference-item-group" role="list">
        <div className="reference-item reference-item--outline reference-item--sm" data-size="sm" data-variant="outline" role="listitem">
          <div className="reference-item-media reference-item-media--icon" data-variant="icon">A</div>
          <div className="reference-item-content"><div className="reference-item-title">Outline item</div><p className="reference-item-description">Small item with icon media.</p></div>
        </div>
        <div className="reference-item reference-item--muted reference-item--xs" data-size="xs" data-variant="muted" role="listitem">
          <div className="reference-item-media" data-variant="default">B</div>
          <div className="reference-item-content"><div className="reference-item-title">Muted item</div><p className="reference-item-description">Extra small muted item.</p></div>
        </div>
      </div>
    )
  }

  if (scenario === "grouped") {
    return (
      <div className="reference-item-group" role="list">
        <div className="reference-item reference-item--outline" data-variant="outline" role="listitem">
          <div className="reference-item-header"><div className="reference-item-title">Storage</div><div className="reference-item-actions"><MiniButton>Manage</MiniButton></div></div>
          <p className="reference-item-description">42 GB used across team projects.</p>
          <div className="reference-item-footer"><span>Updated today</span><span>72%</span></div>
        </div>
        <div className="reference-item-separator" role="separator" />
        <div className="reference-item" data-variant="default" role="listitem">
          <div className="reference-item-content"><div className="reference-item-title">Bandwidth</div><p className="reference-item-description">Normal usage this cycle.</p></div>
        </div>
      </div>
    )
  }

  return (
    <div className="reference-item-group" role="list">
      <div className="reference-item" data-variant="default" role="listitem">
        <div className="reference-item-media" data-variant="image">R</div>
        <div className="reference-item-content"><div className="reference-item-title">RadCN project</div><p className="reference-item-description">Component port planning and fixture coverage.</p></div>
        <div className="reference-item-actions"><MiniButton>Open</MiniButton></div>
      </div>
    </div>
  )
}

export function renderPaginationFixture(scenario: string) {
  let activePage = scenario === "active" ? "3" : "2"
  let customLabels = scenario === "custom-labels"

  return (
    <nav aria-label="pagination" className="reference-pagination" role="navigation">
      <ul className="reference-pagination-content">
        <li className="reference-pagination-item"><a aria-label="Go to previous page" className="reference-pagination-link reference-pagination-previous" href="/fixtures/pagination/default"><span aria-hidden="true">&lt;</span><span>{customLabels ? "Back" : "Previous"}</span></a></li>
        <li className="reference-pagination-item"><a className="reference-pagination-link" href="/fixtures/pagination/default">1</a></li>
        <li className="reference-pagination-item"><a aria-current={activePage === "2" ? "page" : undefined} className={cn("reference-pagination-link", activePage === "2" && "reference-pagination-link--active")} data-active={activePage === "2" ? "true" : undefined} href="/fixtures/pagination/default">2</a></li>
        <li className="reference-pagination-item"><a aria-current={activePage === "3" ? "page" : undefined} className={cn("reference-pagination-link", activePage === "3" && "reference-pagination-link--active")} data-active={activePage === "3" ? "true" : undefined} href="/fixtures/pagination/default">3</a></li>
        <li className="reference-pagination-item"><span aria-hidden="true" className="reference-pagination-ellipsis">...<span className="sr-only">More pages</span></span></li>
        <li className="reference-pagination-item"><a aria-label="Go to next page" className="reference-pagination-link reference-pagination-next" href="/fixtures/pagination/default"><span>{customLabels ? "Forward" : "Next"}</span><span aria-hidden="true">&gt;</span></a></li>
      </ul>
    </nav>
  )
}

export function renderTableFixture(scenario: string) {
  let dense = scenario === "dense"
  let footer = scenario === "footer"

  return (
    <div className="reference-table-container">
      <table className={cn("reference-table", dense && "reference-table--dense")} data-dense={dense ? "true" : undefined}>
        <caption className="reference-table-caption">Recent component ports.</caption>
        <thead className="reference-table-header"><tr className="reference-table-row"><th className="reference-table-head" scope="col">Component</th><th className="reference-table-head" scope="col">Status</th><th className="reference-table-head" scope="col">Stage</th></tr></thead>
        <tbody className="reference-table-body"><tr className="reference-table-row"><td className="reference-table-cell">Button</td><td className="reference-table-cell">Pass</td><td className="reference-table-cell">1</td></tr><tr className="reference-table-row"><td className="reference-table-cell">Card</td><td className="reference-table-cell">Pass</td><td className="reference-table-cell">1</td></tr></tbody>
        {footer ? <tfoot className="reference-table-footer"><tr className="reference-table-row"><td className="reference-table-cell">Total</td><td className="reference-table-cell">2</td><td className="reference-table-cell">Stage 1</td></tr></tfoot> : null}
      </table>
    </div>
  )
}

export function renderTypographyFixture(scenario: string) {
  if (scenario === "inline") {
    return (
      <div className="grid max-w-2xl gap-3">
        <p className="reference-typography-lead">Use typography recipes for documentation copy.</p>
        <div className="reference-typography-large">Large text label</div>
        <p className="reference-typography-p">Install with <code className="reference-typography-inline-code">pnpm add radcn</code> once packaging exists.</p>
        <small className="reference-typography-small">Small supporting text</small>
        <p className="reference-typography-muted">Muted metadata text</p>
      </div>
    )
  }

  if (scenario === "custom-token") {
    return <div className="reference-fixture-custom-typography"><h1 className="reference-typography-h1">Custom typography</h1><p className="reference-typography-muted">Custom muted token.</p></div>
  }

  return (
    <article className="max-w-2xl">
      <h1 className="reference-typography-h1">Build interfaces with the web</h1>
      <p className="reference-typography-lead">RadCN keeps static documentation surfaces server-rendered.</p>
      <h2 className="reference-typography-h2">Principles</h2>
      <p className="reference-typography-p">Components expose stable hooks while preserving semantic HTML.</p>
      <ul className="reference-typography-list"><li>Use native elements first.</li><li>Keep customization explicit.</li></ul>
      <blockquote className="reference-typography-blockquote">Visual parity is a browser-observed contract.</blockquote>
    </article>
  )
}
