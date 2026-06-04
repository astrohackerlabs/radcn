import { renderSonnerFixture } from "./sonner"

export function renderToastFixture(scenario: string) {
  if (scenario === "form-action") {
    return (
      <section className="reference-toast-recipe">
        <form action="/fixtures/toast/form-action" method="get">
          <button className="reference-button" name="intent" type="submit" value="notify">Save changes</button>
        </form>
        {renderSonnerFixture("success")}
      </section>
    )
  }
  if (scenario === "no-js-initial") {
    return (
      <section className="reference-toast-recipe">
        {renderSonnerFixture("dismiss")}
      </section>
    )
  }
  return (
    <section className="reference-toast-recipe">
      <button className="reference-button" type="button">Show toast</button>
      {renderSonnerFixture("default")}
    </section>
  )
}
