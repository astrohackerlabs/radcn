export function renderFormFixture(scenario: string) {
  switch (scenario) {
    case "server-errors":
      return (
        <form action="/fixtures/form/server-errors" className="reference-form-field" method="get">
          <label className="reference-label" htmlFor="reference-form-email">Email</label>
          <input
            aria-describedby="reference-form-email-error"
            aria-invalid="true"
            className="reference-input"
            defaultValue="not-an-email"
            id="reference-form-email"
            name="email"
          />
          <p className="reference-field-error" id="reference-form-email-error">Use a valid email address.</p>
          <button className="reference-button" name="intent" type="submit" value="retry">Try again</button>
        </form>
      )
    case "action-state":
      return (
        <form action="/fixtures/form/action-state" className="reference-form-field" method="get">
          <label className="reference-label" htmlFor="reference-form-project">Project</label>
          <input className="reference-input" defaultValue="RadCN" id="reference-form-project" name="project" />
          <p className="reference-field-description" id="reference-form-action-state">Last saved value: RadCN</p>
          <button className="reference-button" name="intent" type="submit" value="save">Save</button>
        </form>
      )
    case "custom-token":
      return (
        <form action="/fixtures/form/custom-token" className="reference-form-field reference-fixture-custom-field" method="get">
          <label className="reference-label" htmlFor="reference-form-message">Message</label>
          <textarea
            aria-describedby="reference-form-message-error"
            aria-invalid="true"
            className="reference-input reference-textarea"
            defaultValue="Too short"
            id="reference-form-message"
            name="message"
          />
          <p className="reference-field-error" id="reference-form-message-error">Custom token form error.</p>
          <button className="reference-button" type="submit">Send</button>
        </form>
      )
    default:
      return (
        <form action="/fixtures/form/native-validation" className="reference-form-field" method="get">
          <label className="reference-label" htmlFor="reference-form-native-email">Email</label>
          <input
            aria-describedby="reference-form-native-email-description"
            className="reference-input"
            id="reference-form-native-email"
            name="email"
            placeholder="name@example.com"
            required
          />
          <p className="reference-field-description" id="reference-form-native-email-description">Native required validation owns this field.</p>
          <button className="reference-button" name="intent" type="submit" value="submit">Submit</button>
        </form>
      )
  }
}
