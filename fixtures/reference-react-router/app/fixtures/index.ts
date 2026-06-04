import type { FixtureScenario } from "../../../scenarios/types"

import { renderAccordionFixture } from "./accordion"
import { renderButtonFixture } from "./button"
import { renderFieldFixture } from "./field"
import { renderTextareaFixture } from "./textarea"

export function renderReferenceFixture(fixture: FixtureScenario) {
  switch (fixture.component) {
    case "accordion":
      return renderAccordionFixture(fixture.id)
    case "button":
      return renderButtonFixture(fixture.id)
    case "field":
      return renderFieldFixture(fixture.id)
    case "textarea":
      return renderTextareaFixture(fixture.id)
  }
}
