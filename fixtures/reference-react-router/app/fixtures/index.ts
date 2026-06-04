import type { FixtureScenario } from "../../../scenarios/types"

import { renderAccordionFixture } from "./accordion"
import { renderAlertDialogFixture } from "./alert-dialog"
import { renderAvatarFixture } from "./avatar"
import { renderButtonFixture } from "./button"
import { renderCalendarFixture } from "./calendar"
import { renderCarouselFixture } from "./carousel"
import { renderCollapsibleFixture } from "./collapsible"
import { renderComboboxFixture } from "./combobox"
import { renderCommandFixture } from "./command"
import { renderDatePickerFixture } from "./date-picker"
import { renderDialogFixture } from "./dialog"
import { renderDrawerFixture } from "./drawer"
import { renderFieldFixture } from "./field"
import { renderContextMenuFixture, renderDropdownMenuFixture } from "./menu-overlays"
import { renderHoverCardFixture, renderPopoverFixture, renderTooltipFixture } from "./positioned-overlays"
import { renderMenubarFixture } from "./menubar"
import { renderNativeSelectFixture } from "./native-select"
import { renderNavigationMenuFixture } from "./navigation-menu"
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
import { renderSliderFixture } from "./slider"
import { renderScrollAreaFixture } from "./scroll-area"
import { renderSelectFixture } from "./select"
import { renderSheetFixture } from "./sheet"

export function renderReferenceFixture(fixture: FixtureScenario) {
  switch (fixture.component) {
    case "accordion":
      return renderAccordionFixture(fixture.id)
    case "alert":
      return renderAlertFixture(fixture.id)
    case "alert-dialog":
      return renderAlertDialogFixture(fixture.id)
    case "aspect-ratio":
      return renderAspectRatioFixture(fixture.id)
    case "avatar":
      return renderAvatarFixture(fixture.id)
    case "badge":
      return renderBadgeFixture(fixture.id)
    case "breadcrumb":
      return renderBreadcrumbFixture(fixture.id)
    case "button":
      return renderButtonFixture(fixture.id)
    case "button-group":
      return renderButtonGroupFixture(fixture.id)
    case "calendar":
      return renderCalendarFixture(fixture.id)
    case "carousel":
      return renderCarouselFixture(fixture.id)
    case "card":
      return renderCardFixture(fixture.id)
    case "checkbox":
      return renderCheckboxFixture(fixture.id)
    case "collapsible":
      return renderCollapsibleFixture(fixture.id)
    case "combobox":
      return renderComboboxFixture(fixture.id)
    case "command":
      return renderCommandFixture(fixture.id)
    case "context-menu":
      return renderContextMenuFixture(fixture.id)
    case "date-picker":
      return renderDatePickerFixture(fixture.id)
    case "dialog":
      return renderDialogFixture(fixture.id)
    case "drawer":
      return renderDrawerFixture(fixture.id)
    case "dropdown-menu":
      return renderDropdownMenuFixture(fixture.id)
    case "empty":
      return renderEmptyFixture(fixture.id)
    case "field":
      return renderFieldFixture(fixture.id)
    case "hover-card":
      return renderHoverCardFixture(fixture.id)
    case "kbd":
      return renderKbdFixture()
    case "item":
      return renderItemFixture(fixture.id)
    case "menubar":
      return renderMenubarFixture(fixture.id)
    case "pagination":
      return renderPaginationFixture(fixture.id)
    case "navigation-menu":
      return renderNavigationMenuFixture(fixture.id)
    case "popover":
      return renderPopoverFixture(fixture.id)
    case "progress":
      return renderProgressFixture(fixture.id)
    case "radio-group":
      return renderRadioGroupFixture(fixture.id)
    case "scroll-area":
      return renderScrollAreaFixture(fixture.id)
    case "select":
      return renderSelectFixture(fixture.id)
    case "native-select":
      return renderNativeSelectFixture(fixture.id)
    case "separator":
      return renderSeparatorFixture()
    case "sheet":
      return renderSheetFixture(fixture.id)
    case "skeleton":
      return renderSkeletonFixture()
    case "slider":
      return renderSliderFixture(fixture.id)
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
    case "tooltip":
      return renderTooltipFixture(fixture.id)
    case "typography":
      return renderTypographyFixture(fixture.id)
  }
}
