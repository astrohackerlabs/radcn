function Field({ children, description, error, label }: { children: React.ReactNode; description?: string; error?: string; label: string }) {
  return (
    <div className="reference-form-field">
      <label className="reference-label" htmlFor="reference-input-otp-control">{label}</label>
      {children}
      {description && <p className="reference-field-description">{description}</p>}
      {error && <p className="reference-field-error" id="reference-input-otp-error">{error}</p>}
    </div>
  )
}

function Slots({ invalid, value = "", count = 6, separated = false }: { count?: number; invalid?: boolean; separated?: boolean; value?: string }) {
  let slots = Array.from({ length: count }, (_, index) => (
    <div className="reference-input-otp-slot" data-filled={value[index] ? "true" : "false"} key={index}>
      {value[index] || ""}
    </div>
  ))
  if (!separated) return <div className={`reference-input-otp ${invalid ? "reference-input-otp-invalid" : ""}`}>{slots}</div>
  return (
    <div className={`reference-input-otp ${invalid ? "reference-input-otp-invalid" : ""}`}>
      {slots.slice(0, 3)}
      <div className="reference-input-otp-separator" role="separator">-</div>
      {slots.slice(3)}
    </div>
  )
}

export function renderInputOTPFixture(scenario: string) {
  switch (scenario) {
    case "separator":
      return <Field label="Code"><Slots separated value="123456" /></Field>
    case "digits-only":
      return <Field label="Digits"><Slots /></Field>
    case "alphanumeric":
      return <Field label="Alphanumeric" description="Letters and numbers are accepted."><Slots separated /></Field>
    case "four-digits":
      return <Field label="PIN"><Slots count={4} /></Field>
    case "disabled":
      return <Field label="Disabled"><div className="reference-input-otp-disabled"><Slots separated value="123456" /></div></Field>
    case "invalid":
      return <Field label="Code" error="Enter the six-character code."><Slots invalid value="123" /></Field>
    case "form-submit-reset":
      return (
        <form action="/fixtures/input-otp/form-submit-reset" className="reference-form-field" method="get">
          <label className="reference-label" htmlFor="reference-input-otp-control">Code</label>
          <input className="reference-sr-input" defaultValue="123456" id="reference-input-otp-control" name="code" pattern="[0-9]*" required />
          <Slots separated value="123456" />
          <div className="reference-actions">
            <button className="reference-button" name="intent" type="submit" value="submit">Submit</button>
            <button className="reference-button reference-button-outline" type="reset">Reset</button>
          </div>
        </form>
      )
    case "paste":
      return <Field label="Paste Code"><Slots /></Field>
    case "custom-token":
      return <Field label="Custom"><div className="reference-fixture-custom-input-otp"><Slots separated value="654321" /></div></Field>
    default:
      return <Field label="Code" description="Enter the six-character code."><Slots /></Field>
  }
}
