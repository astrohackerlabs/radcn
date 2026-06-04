function NativeSelect({
  children,
  className,
  selectSize = "default",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { className?: string; selectSize?: "default" | "sm" }) {
  return (
    <div className={`reference-native-select-wrapper ${className ?? ""}`} data-size={selectSize}>
      <select className="reference-native-select" {...props}>
        {children}
      </select>
      <span aria-hidden="true" className="reference-native-select-icon">v</span>
    </div>
  )
}

function statusOptions() {
  return (
    <>
      <option value="">Select status</option>
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="done">Done</option>
      <option value="cancelled">Cancelled</option>
    </>
  )
}

export function renderNativeSelectFixture(scenario: string) {
  switch (scenario) {
    case "groups":
      return (
        <div className="reference-field">
          <label className="reference-label" htmlFor="reference-department">Department</label>
          <NativeSelect id="reference-department" name="department">
            <option value="">Select department</option>
            <optgroup label="Engineering">
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="devops">DevOps</option>
            </optgroup>
            <optgroup label="Sales">
              <option value="sales-rep">Sales Rep</option>
              <option value="account-manager">Account Manager</option>
            </optgroup>
          </NativeSelect>
        </div>
      )
    case "disabled":
      return (
        <div className="reference-field">
          <label className="reference-label" htmlFor="reference-priority">Priority</label>
          <NativeSelect disabled id="reference-priority" name="priority">
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
          </NativeSelect>
        </div>
      )
    case "invalid":
      return (
        <div className="reference-field">
          <label className="reference-label" htmlFor="reference-role">Role</label>
          <NativeSelect aria-describedby="reference-role-error" aria-invalid="true" defaultValue="" id="reference-role" name="role">
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </NativeSelect>
          <p className="reference-field-error" id="reference-role-error">Choose a role.</p>
        </div>
      )
    case "sizes":
      return (
        <div className="flex flex-wrap items-center gap-4">
          <NativeSelect defaultValue="todo" id="reference-size-default" name="defaultSize">{statusOptions()}</NativeSelect>
          <NativeSelect defaultValue="done" id="reference-size-sm" name="smallSize" selectSize="sm">{statusOptions()}</NativeSelect>
        </div>
      )
    case "custom-token":
      return (
        <div className="reference-field">
          <label className="reference-label" htmlFor="reference-custom-select">Status</label>
          <NativeSelect className="reference-fixture-custom-native-select" defaultValue="done" id="reference-custom-select" name="status">
            {statusOptions()}
          </NativeSelect>
        </div>
      )
    case "form-submit-reset":
      return (
        <form action="/fixtures/native-select/form-submit-reset" className="grid max-w-sm gap-3" method="get">
          <label className="reference-label" htmlFor="reference-form-status">Status</label>
          <NativeSelect defaultValue="todo" id="reference-form-status" name="status">{statusOptions()}</NativeSelect>
          <div className="flex gap-3">
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    case "required-validation":
      return (
        <form action="/fixtures/native-select/required-validation" className="grid max-w-sm gap-3" method="get">
          <label className="reference-label" htmlFor="reference-required-status">Status</label>
          <NativeSelect defaultValue="" id="reference-required-status" name="status" required>
            <option value="">Select status</option>
            <option value="todo">Todo</option>
            <option value="done">Done</option>
          </NativeSelect>
          <p className="reference-field-description">Choose a status before submitting.</p>
          <button type="submit">Submit</button>
        </form>
      )
    default:
      return (
        <div className="reference-field">
          <label className="reference-label" htmlFor="reference-status">Status</label>
          <NativeSelect defaultValue="todo" id="reference-status" name="status">{statusOptions()}</NativeSelect>
          <p className="reference-field-description">Choose the current project status.</p>
        </div>
      )
  }
}
