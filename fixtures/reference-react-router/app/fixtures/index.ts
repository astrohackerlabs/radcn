import type { FixtureScenario } from "../../../scenarios/types"

import { renderAccordionFixture } from "./accordion"
import { renderButtonFixture } from "./button"
import { renderFieldFixture } from "./field"
import {
  renderAlertFixture,
  renderAspectRatioFixture,
  renderBadgeFixture,
  renderCardFixture,
  renderEmptyFixture,
  renderKbdFixture,
  renderSeparatorFixture,
  renderSkeletonFixture,
  renderSpinnerFixture,
} from "./static-display"
import { renderTextareaFixture } from "./textarea"

export function renderReferenceFixture(fixture: FixtureScenario) {
  switch (fixture.component) {
    case "accordion":
      return renderAccordionFixture(fixture.id)
    case "alert":
      return renderAlertFixture(fixture.id)
    case "aspect-ratio":
      return renderAspectRatioFixture(fixture.id)
    case "badge":
      return renderBadgeFixture(fixture.id)
    case "button":
      return renderButtonFixture(fixture.id)
    case "card":
      return renderCardFixture(fixture.id)
    case "empty":
      return renderEmptyFixture(fixture.id)
    case "field":
      return renderFieldFixture(fixture.id)
    case "kbd":
      return renderKbdFixture()
    case "separator":
      return renderSeparatorFixture()
    case "skeleton":
      return renderSkeletonFixture()
    case "spinner":
      return renderSpinnerFixture(fixture.id)
    case "textarea":
      return renderTextareaFixture(fixture.id)
  }
}
