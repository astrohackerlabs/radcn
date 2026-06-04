import { cn } from "../lib/utils"

function Alert({
  children,
  className,
  variant = "default",
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" }) {
  return (
    <div
      className={cn("reference-alert", `reference-alert--${variant}`, className)}
      data-variant={variant}
      role="alert"
    >
      {children}
    </div>
  )
}

function Badge({
  children,
  className,
  href,
  variant = "default",
}: React.HTMLAttributes<HTMLSpanElement> & { href?: string; variant?: string }) {
  let classNames = cn("reference-badge", `reference-badge--${variant}`, className)

  if (href) {
    return (
      <a className={classNames} data-variant={variant} href={href}>
        {children}
      </a>
    )
  }

  return (
    <span className={classNames} data-variant={variant}>
      {children}
    </span>
  )
}

function Button({ children }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="reference-mini-button">{children}</button>
}

export function renderAlertFixture(scenario: string) {
  switch (scenario) {
    case "destructive":
      return (
        <Alert variant="destructive">
          <div className="reference-alert-title">Unable to save changes</div>
          <div className="reference-alert-description">Review the highlighted fields and try again.</div>
        </Alert>
      )
    case "custom-token":
      return (
        <Alert className="reference-fixture-custom-alert">
          <div className="reference-alert-title">Custom alert token</div>
          <div className="reference-alert-description">This alert uses fixture-level CSS variables.</div>
        </Alert>
      )
    default:
      return (
        <Alert>
          <div className="reference-alert-title">Heads up</div>
          <div className="reference-alert-description">RadCN static primitives render without client state.</div>
          <div className="reference-alert-action">
            <Button>Review</Button>
          </div>
        </Alert>
      )
  }
}

export function renderAspectRatioFixture(scenario: string) {
  let isSquare = scenario === "custom-ratio"

  return (
    <div
      className="reference-aspect-ratio"
      style={{ aspectRatio: isSquare ? "1 / 1" : "16 / 9", width: isSquare ? "240px" : "420px" }}
    >
      <div className="reference-fixture-aspect-media">
        <span>{isSquare ? "1:1" : "16:9"}</span>
      </div>
    </div>
  )
}

export function renderBadgeFixture(scenario: string) {
  if (scenario === "custom-class") {
    return <Badge className="reference-fixture-custom-badge">Custom Badge</Badge>
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge href="/fixtures/badge/variants" variant="link">
        Link
      </Badge>
    </div>
  )
}

export function renderCardFixture(scenario: string) {
  let custom = scenario === "custom-token"
  let compact = scenario === "compact"

  return (
    <div className={cn("reference-card", compact && "reference-card--sm", custom && "reference-fixture-custom-card")}>
      <div className="reference-card-header">
        <div>
          <div className="reference-card-title">{compact ? "Compact plan" : "Team workspace"}</div>
          <div className="reference-card-description">{compact ? "Dense spacing for summaries." : "Usage and billing summary."}</div>
        </div>
        <div className="reference-card-action">
          <Badge variant="outline">{custom ? "Custom" : "Live"}</Badge>
        </div>
      </div>
      <div className="reference-card-content">
        <p className="m-0">12 active members and 4 pending invites.</p>
      </div>
      <div className="reference-card-footer">
        <Button>Open workspace</Button>
      </div>
    </div>
  )
}

export function renderEmptyFixture(scenario: string) {
  let icon = scenario === "icon"

  return (
    <div className="reference-empty">
      <div className="reference-empty-header">
        <div className={cn("reference-empty-media", icon && "reference-empty-media--icon")}>{icon ? "+" : "0"}</div>
        <div className="reference-empty-title">{icon ? "No integrations" : "No projects yet"}</div>
        <div className="reference-empty-description">
          {icon ? "Connect a service to get started." : "Create a project to populate this space."}
        </div>
      </div>
      <div className="reference-empty-content">
        <Button>{icon ? "Connect service" : "Create project"}</Button>
      </div>
    </div>
  )
}

export function renderKbdFixture() {
  return (
    <div className="reference-kbd-group">
      <kbd className="reference-kbd">Cmd</kbd>
      <kbd className="reference-kbd">K</kbd>
    </div>
  )
}

export function renderSeparatorFixture() {
  return (
    <div className="flex h-24 items-stretch gap-6">
      <div className="grid w-64 content-start gap-3">
        <span>General</span>
        <div aria-orientation="horizontal" className="reference-separator reference-separator--horizontal" role="separator" />
        <span>Notifications</span>
      </div>
      <div aria-orientation="vertical" className="reference-separator reference-separator--vertical" role="separator" />
      <div className="grid content-start gap-3">
        <span>Security</span>
        <span>Billing</span>
      </div>
    </div>
  )
}

export function renderSkeletonFixture() {
  return (
    <div className="grid w-80 gap-3">
      <div aria-hidden="true" className="reference-skeleton rounded-full" style={{ height: "56px", width: "56px" }} />
      <div aria-hidden="true" className="reference-skeleton" style={{ height: "18px", width: "100%" }} />
      <div aria-hidden="true" className="reference-skeleton" style={{ height: "18px", width: "72%" }} />
    </div>
  )
}

export function renderSpinnerFixture(scenario: string) {
  let custom = scenario === "custom-size"

  return (
    <svg
      aria-label={custom ? "Loading report" : "Loading"}
      className={cn("reference-spinner", custom && "reference-fixture-custom-spinner")}
      fill="none"
      role="status"
      viewBox="0 0 24 24"
    >
      <circle className="reference-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="reference-spinner-head" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
    </svg>
  )
}
