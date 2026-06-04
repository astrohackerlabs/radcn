import type { FixtureScenario } from "../../../scenarios/types"

import { renderAccordionFixture } from "./accordion"
import { renderButtonFixture } from "./button"
import { renderFieldFixture } from "./field"
import { renderNativeSelectFixture } from "./native-select"
import {
  renderBreadcrumbFixture,
  renderButtonGroupFixture,
  renderItemFixture,
  renderPaginationFixture,
  renderTableFixture,
  renderTypographyFixture,
} from "./navigation-collection"
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
    case "breadcrumb":
      return renderBreadcrumbFixture(fixture.id)
    case "button":
      return renderButtonFixture(fixture.id)
    case "button-group":
      return renderButtonGroupFixture(fixture.id)
    case "card":
      return renderCardFixture(fixture.id)
    case "empty":
      return renderEmptyFixture(fixture.id)
    case "field":
      return renderFieldFixture(fixture.id)
    case "kbd":
      return renderKbdFixture()
    case "item":
      return renderItemFixture(fixture.id)
    case "pagination":
      return renderPaginationFixture(fixture.id)
    case "native-select":
      return renderNativeSelectFixture(fixture.id)
    case "separator":
      return renderSeparatorFixture()
    case "skeleton":
      return renderSkeletonFixture()
    case "spinner":
      return renderSpinnerFixture(fixture.id)
    case "table":
      return renderTableFixture(fixture.id)
    case "textarea":
      return renderTextareaFixture(fixture.id)
    case "typography":
      return renderTypographyFixture(fixture.id)
  }
}
