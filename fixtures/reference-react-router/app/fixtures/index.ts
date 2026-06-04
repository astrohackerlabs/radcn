import type { FixtureScenario } from "../../../scenarios/types"

import { renderAccordionFixture } from "./accordion"
import { renderButtonFixture } from "./button"
import { renderCollapsibleFixture } from "./collapsible"
import { renderFieldFixture } from "./field"
import { renderNativeSelectFixture } from "./native-select"
import {
  renderCheckboxFixture,
  renderProgressFixture,
  renderRadioGroupFixture,
  renderSwitchFixture,
} from "./native-state"
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
import { renderTabsFixture } from "./tabs"
import { renderToggleFixture, renderToggleGroupFixture } from "./toggle"

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
    case "checkbox":
      return renderCheckboxFixture(fixture.id)
    case "collapsible":
      return renderCollapsibleFixture(fixture.id)
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
    case "progress":
      return renderProgressFixture(fixture.id)
    case "radio-group":
      return renderRadioGroupFixture(fixture.id)
    case "native-select":
      return renderNativeSelectFixture(fixture.id)
    case "separator":
      return renderSeparatorFixture()
    case "skeleton":
      return renderSkeletonFixture()
    case "spinner":
      return renderSpinnerFixture(fixture.id)
    case "switch":
      return renderSwitchFixture(fixture.id)
    case "table":
      return renderTableFixture(fixture.id)
    case "tabs":
      return renderTabsFixture(fixture.id)
    case "textarea":
      return renderTextareaFixture(fixture.id)
    case "toggle":
      return renderToggleFixture(fixture.id)
    case "toggle-group":
      return renderToggleGroupFixture(fixture.id)
    case "typography":
      return renderTypographyFixture(fixture.id)
  }
}
