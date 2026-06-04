type ToastType = "default" | "success" | "info" | "warning" | "error" | "loading"

interface Toast {
  actionLabel?: string
  actionUrl?: string
  description: string
  title: string
  type: ToastType
}

function icon(type: ToastType) {
  if (type === "success") return "✓"
  if (type === "info") return "i"
  if (type === "warning") return "!"
  if (type === "error") return "×"
  if (type === "loading") return "…"
  return "•"
}

function role(type: ToastType) {
  return type === "error" || type === "warning" ? "alert" : "status"
}

function ReferenceToaster({ custom = false, toasts }: { custom?: boolean; toasts: Toast[] }) {
  return (
    <section aria-label="Notifications" className={`reference-toaster ${custom ? "reference-fixture-custom-toaster" : ""}`} role="region">
      <ol className="reference-toaster-list">
        {toasts.map((toast, index) => (
          <li aria-live={toast.type === "error" || toast.type === "warning" ? "assertive" : "polite"} className={`reference-toast reference-toast--${toast.type}`} data-state="open" data-type={toast.type} key={index} role={role(toast.type)} tabIndex={-1}>
            <span aria-hidden="true" className="reference-toast-icon">{icon(toast.type)}</span>
            <div className="reference-toast-body">
              <div className="reference-toast-title">{toast.title}</div>
              <div className="reference-toast-description">{toast.description}</div>
            </div>
            {toast.actionLabel ? <a className="reference-toast-action" href={toast.actionUrl || "#"}>{toast.actionLabel}</a> : null}
            <button aria-label="Dismiss notification" className="reference-toast-dismiss" type="button">×</button>
          </li>
        ))}
      </ol>
    </section>
  )
}

function payload(type: ToastType, title: string, description: string): Toast {
  return { description, title, type }
}

export function renderSonnerFixture(scenario: string) {
  if (scenario === "success") {
    return <ReferenceToaster toasts={[payload("success", "Project published", "The latest RadCN preview is live.")]} />
  }
  if (scenario === "error") {
    return <ReferenceToaster toasts={[payload("error", "Build failed", "Fix the notification fixture before shipping.")]} />
  }
  if (scenario === "loading") {
    return <ReferenceToaster toasts={[payload("loading", "Syncing changes", "This notification stays open until work completes.")]} />
  }
  if (scenario === "action") {
    return <ReferenceToaster toasts={[{ actionLabel: "Undo", actionUrl: "/fixtures/sonner/action?undo=1", description: "The page can offer one focused follow-up.", title: "Item archived", type: "default" }]} />
  }
  if (scenario === "dismiss") {
    return <ReferenceToaster toasts={[payload("info", "Dismiss me", "Use the close button or Escape while focused.")]} />
  }
  if (scenario === "stack") {
    return <ReferenceToaster toasts={[payload("success", "Saved", "Settings were stored."), payload("info", "Review queued", "A teammate was notified."), payload("warning", "Deploy paused", "Manual approval is required.")]} />
  }
  if (scenario === "custom-token") {
    return <ReferenceToaster custom toasts={[payload("success", "Custom tokens", "Notification colors come from public variables.")]} />
  }
  return <ReferenceToaster toasts={[payload("default", "Notification ready", "RadCN renders initial toasts without Sonner.")]} />
}
