function Checkbox({
  className,
  indeterminate,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { indeterminate?: boolean }) {
  let checked = Boolean(props.defaultChecked)
  let state = indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"

  return (
    <span className={`reference-checkbox-wrapper ${className ?? ""}`} data-state={state}>
      <input
        aria-checked={indeterminate ? "mixed" : undefined}
        className="reference-checkbox-input"
        type="checkbox"
        {...props}
      />
      <span aria-hidden="true" className="reference-checkbox-indicator">
        {indeterminate ? "-" : ""}
      </span>
    </span>
  )
}

function RadioGroup({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { name: string }) {
  return (
    <div className={`reference-radio-group ${className ?? ""}`} role="radiogroup" {...props}>
      {children}
    </div>
  )
}

function RadioGroupItem({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  let state = props.defaultChecked ? "checked" : "unchecked"

  return (
    <span className={`reference-radio-item ${className ?? ""}`} data-state={state}>
      <input className="reference-radio-input" type="radio" {...props} />
      <span aria-hidden="true" className="reference-radio-indicator" />
    </span>
  )
}

function Switch({
  className,
  switchSize = "default",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { switchSize?: "default" | "sm" }) {
  let state = props.defaultChecked ? "checked" : "unchecked"

  return (
    <span className={`reference-switch-wrapper reference-switch-wrapper--${switchSize} ${className ?? ""}`} data-state={state}>
      <input className="reference-switch-input" role="switch" type="checkbox" {...props} />
      <span aria-hidden="true" className="reference-switch-thumb" />
    </span>
  )
}

function Progress({
  ariaLabel = "Upload progress",
  className,
  value,
}: {
  ariaLabel?: string
  className?: string
  value?: number
}) {
  let indeterminate = value === undefined
  let width = value === undefined ? undefined : `${Math.max(0, Math.min(100, value))}%`

  return (
    <span
      className={`reference-progress-wrapper ${indeterminate ? "reference-progress-wrapper--indeterminate" : ""} ${className ?? ""}`}
      data-state={indeterminate ? "indeterminate" : "determinate"}
    >
      <progress aria-label={ariaLabel} className="reference-progress" max={100} value={value} />
      <span aria-hidden="true" className="reference-progress-track">
        <span className="reference-progress-indicator" style={{ width }} />
      </span>
    </span>
  )
}

const inlineControlStyle = { alignItems: "center", display: "flex", gap: 10 }
const formClass = "grid max-w-sm gap-3"
const buttonRowClass = "flex gap-3"
const radioRowStyle = { alignItems: "center", display: "flex", gap: 10 }

export function renderCheckboxFixture(scenario: string) {
  switch (scenario) {
    case "checked":
      return (
        <div style={inlineControlStyle}>
          <Checkbox defaultChecked id="reference-checkbox-checked" name="notifications" value="email" />
          <label className="reference-label" htmlFor="reference-checkbox-checked">Email notifications</label>
        </div>
      )
    case "disabled":
      return (
        <div style={inlineControlStyle}>
          <Checkbox disabled id="reference-checkbox-disabled" name="notifications" value="push" />
          <label className="reference-label" htmlFor="reference-checkbox-disabled">Push notifications</label>
        </div>
      )
    case "invalid":
      return (
        <div className="reference-field">
          <div style={inlineControlStyle}>
            <Checkbox aria-describedby="reference-checkbox-error" aria-invalid="true" id="reference-checkbox-invalid" name="terms" required value="accepted" />
            <label className="reference-label" htmlFor="reference-checkbox-invalid">Accept terms</label>
          </div>
          <p className="reference-field-error" id="reference-checkbox-error">Accept the terms to continue.</p>
        </div>
      )
    case "indeterminate":
      return (
        <div style={inlineControlStyle}>
          <Checkbox id="reference-checkbox-mixed" indeterminate name="permissions" value="partial" />
          <label className="reference-label" htmlFor="reference-checkbox-mixed">Some permissions selected</label>
        </div>
      )
    case "custom-token":
      return (
        <div style={inlineControlStyle}>
          <Checkbox className="reference-fixture-custom-checkbox" defaultChecked id="reference-checkbox-custom" name="custom" value="yes" />
          <label className="reference-label" htmlFor="reference-checkbox-custom">Custom checkbox</label>
        </div>
      )
    case "form-submit-reset":
      return (
        <form action="/fixtures/checkbox/form-submit-reset" className={formClass} method="get">
          <div style={inlineControlStyle}>
            <Checkbox defaultChecked id="reference-checkbox-form" name="agree" value="yes" />
            <label className="reference-label" htmlFor="reference-checkbox-form">Agree to updates</label>
          </div>
          <div className={buttonRowClass}>
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    default:
      return (
        <div style={inlineControlStyle}>
          <Checkbox id="reference-checkbox-default" name="notifications" value="email" />
          <label className="reference-label" htmlFor="reference-checkbox-default">Email notifications</label>
        </div>
      )
  }
}

export function renderRadioGroupFixture(scenario: string) {
  switch (scenario) {
    case "disabled":
      return (
        <RadioGroup aria-disabled="true" name="priority">
          <div style={radioRowStyle}>
            <RadioGroupItem disabled id="reference-radio-disabled-low" name="priority" value="low" />
            <label className="reference-label" htmlFor="reference-radio-disabled-low">Low</label>
          </div>
          <div style={radioRowStyle}>
            <RadioGroupItem defaultChecked disabled id="reference-radio-disabled-high" name="priority" value="high" />
            <label className="reference-label" htmlFor="reference-radio-disabled-high">High</label>
          </div>
        </RadioGroup>
      )
    case "invalid":
      return (
        <div className="reference-field">
          <RadioGroup aria-describedby="reference-radio-error" aria-invalid="true" name="plan">
            <div style={radioRowStyle}>
              <RadioGroupItem aria-invalid="true" id="reference-radio-invalid-basic" name="plan" required value="basic" />
              <label className="reference-label" htmlFor="reference-radio-invalid-basic">Basic</label>
            </div>
            <div style={radioRowStyle}>
              <RadioGroupItem aria-invalid="true" id="reference-radio-invalid-pro" name="plan" required value="pro" />
              <label className="reference-label" htmlFor="reference-radio-invalid-pro">Pro</label>
            </div>
          </RadioGroup>
          <p className="reference-field-error" id="reference-radio-error">Choose a plan.</p>
        </div>
      )
    case "custom-token":
      return (
        <RadioGroup className="reference-fixture-custom-radio" name="theme">
          <div style={radioRowStyle}>
            <RadioGroupItem className="reference-fixture-custom-radio" defaultChecked id="reference-radio-custom-system" name="theme" value="system" />
            <label className="reference-label" htmlFor="reference-radio-custom-system">System</label>
          </div>
          <div style={radioRowStyle}>
            <RadioGroupItem className="reference-fixture-custom-radio" id="reference-radio-custom-light" name="theme" value="light" />
            <label className="reference-label" htmlFor="reference-radio-custom-light">Light</label>
          </div>
        </RadioGroup>
      )
    case "form-submit-reset":
      return (
        <form action="/fixtures/radio-group/form-submit-reset" className={formClass} method="get">
          <RadioGroup name="contact">
            <div style={radioRowStyle}>
              <RadioGroupItem defaultChecked id="reference-radio-form-email" name="contact" value="email" />
              <label className="reference-label" htmlFor="reference-radio-form-email">Email</label>
            </div>
            <div style={radioRowStyle}>
              <RadioGroupItem id="reference-radio-form-sms" name="contact" value="sms" />
              <label className="reference-label" htmlFor="reference-radio-form-sms">SMS</label>
            </div>
          </RadioGroup>
          <div className={buttonRowClass}>
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    default:
      return (
        <RadioGroup name="priority">
          <div style={radioRowStyle}>
            <RadioGroupItem defaultChecked id="reference-radio-default-low" name="priority" value="low" />
            <label className="reference-label" htmlFor="reference-radio-default-low">Low</label>
          </div>
          <div style={radioRowStyle}>
            <RadioGroupItem id="reference-radio-default-high" name="priority" value="high" />
            <label className="reference-label" htmlFor="reference-radio-default-high">High</label>
          </div>
        </RadioGroup>
      )
  }
}

export function renderSwitchFixture(scenario: string) {
  switch (scenario) {
    case "checked":
      return (
        <div style={inlineControlStyle}>
          <Switch defaultChecked id="reference-switch-checked" name="availability" value="online" />
          <label className="reference-label" htmlFor="reference-switch-checked">Available</label>
        </div>
      )
    case "disabled":
      return (
        <div style={inlineControlStyle}>
          <Switch disabled id="reference-switch-disabled" name="availability" value="online" />
          <label className="reference-label" htmlFor="reference-switch-disabled">Available</label>
        </div>
      )
    case "custom-token":
      return (
        <div style={inlineControlStyle}>
          <Switch className="reference-fixture-custom-switch" defaultChecked id="reference-switch-custom" name="availability" switchSize="sm" value="online" />
          <label className="reference-label" htmlFor="reference-switch-custom">Custom switch</label>
        </div>
      )
    case "form-submit-reset":
      return (
        <form action="/fixtures/switch/form-submit-reset" className={formClass} method="get">
          <div style={inlineControlStyle}>
            <Switch defaultChecked id="reference-switch-form" name="dark" value="on" />
            <label className="reference-label" htmlFor="reference-switch-form">Dark mode</label>
          </div>
          <div className={buttonRowClass}>
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    default:
      return (
        <div style={inlineControlStyle}>
          <Switch id="reference-switch-default" name="availability" value="online" />
          <label className="reference-label" htmlFor="reference-switch-default">Available</label>
        </div>
      )
  }
}

export function renderProgressFixture(scenario: string) {
  switch (scenario) {
    case "indeterminate":
      return (
        <div className="reference-field">
          <label className="reference-label">Syncing files</label>
          <Progress ariaLabel="Syncing files" />
          <p className="reference-field-description">Waiting for progress details.</p>
        </div>
      )
    case "custom-token":
      return (
        <div className="reference-field">
          <label className="reference-label">Upload progress</label>
          <Progress className="reference-fixture-custom-progress" value={72} />
          <p className="reference-field-description">Custom progress tokens.</p>
        </div>
      )
    default:
      return (
        <div className="reference-field">
          <label className="reference-label">Upload progress</label>
          <Progress value={48} />
          <p className="reference-field-description">48 percent complete.</p>
        </div>
      )
  }
}
