function Field({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="reference-form-field">
      <label className="reference-label" htmlFor="reference-input-group-control">{label}</label>
      {children}
    </div>
  )
}

function InputGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reference-input-group ${className}`} role="group">{children}</div>
}

function Addon({ align = "inline-start", children }: { align?: string; children: React.ReactNode }) {
  return <div className={`reference-input-group-addon reference-input-group-addon--${align}`} data-align={align} role="group">{children}</div>
}

function Control(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="reference-input-group-input" id="reference-input-group-control" {...props} />
}

export function renderInputGroupFixture(scenario: string) {
  switch (scenario) {
    case "addons":
      return (
        <Field label="Search">
          <InputGroup>
            <Addon>Search</Addon>
            <Control name="query" placeholder="Packages" />
            <Addon align="inline-end">⌘K</Addon>
          </InputGroup>
        </Field>
      )
    case "buttons":
      return (
        <form action="/fixtures/input-group/buttons" className="reference-form-field" method="get">
          <label className="reference-label" htmlFor="reference-input-group-control">Repository</label>
          <InputGroup>
            <Control name="repo" defaultValue="radcn" />
            <Addon align="inline-end"><button className="reference-input-group-button" name="intent" type="submit" value="search">Go</button></Addon>
          </InputGroup>
        </form>
      )
    case "textarea":
      return (
        <Field label="Message">
          <InputGroup>
            <Addon align="block-start">Comment</Addon>
            <textarea className="reference-input-group-textarea" id="reference-input-group-control" name="message" defaultValue="Grouped textarea" rows={4} />
          </InputGroup>
        </Field>
      )
    case "disabled-invalid":
      return (
        <div className="reference-stack">
          <Field label="Disabled">
            <InputGroup className="reference-input-group-disabled">
              <Addon>@</Addon>
              <Control disabled name="disabled" defaultValue="disabled" />
            </InputGroup>
          </Field>
          <Field label="Invalid">
            <InputGroup className="reference-input-group-invalid">
              <Addon>https://</Addon>
              <Control aria-describedby="reference-input-group-error" aria-invalid="true" name="url" defaultValue="not-a-url" />
            </InputGroup>
            <p className="reference-field-error" id="reference-input-group-error">Enter a valid URL.</p>
          </Field>
        </div>
      )
    case "form-submit-reset":
      return (
        <form action="/fixtures/input-group/form-submit-reset" className="reference-form-field" method="get">
          <label className="reference-label" htmlFor="reference-input-group-control">Workspace</label>
          <InputGroup>
            <Addon>radcn.dev/</Addon>
            <Control name="workspace" defaultValue="design" required />
          </InputGroup>
          <div className="reference-actions">
            <button className="reference-button" name="intent" type="submit" value="submit">Submit</button>
            <button className="reference-button reference-button-outline" type="reset">Reset</button>
          </div>
        </form>
      )
    case "block-addons":
      return (
        <Field label="Deploy command">
          <InputGroup>
            <Addon align="block-start">Terminal</Addon>
            <Control name="command" defaultValue="pnpm deploy" />
            <Addon align="block-end">Runs in production</Addon>
          </InputGroup>
        </Field>
      )
    case "custom-token":
      return (
        <Field label="Custom">
          <InputGroup className="reference-fixture-custom-input-group">
            <Addon>#</Addon>
            <Control name="tag" defaultValue="release" />
          </InputGroup>
        </Field>
      )
    default:
      return (
        <Field label="Email">
          <InputGroup>
            <Control name="email" placeholder="name@example.com" />
          </InputGroup>
          <p className="reference-field-description">Input group preserves native input behavior.</p>
        </Field>
      )
  }
}
