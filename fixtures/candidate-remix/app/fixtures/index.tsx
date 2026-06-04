import type { FixtureScenario } from '../../../scenarios/types.ts'

import { renderAccordionFixture } from './accordion.tsx'
import { renderAlertDialogFixture } from './alert-dialog.tsx'
import { renderAvatarFixture } from './avatar.tsx'
import { renderButtonFixture } from './button.tsx'
import { renderCalendarFixture } from './calendar.tsx'
import { renderCarouselFixture } from './carousel.tsx'
import { renderCollapsibleFixture } from './collapsible.tsx'
import { renderComboboxFixture } from './combobox.tsx'
import { renderCommandFixture } from './command.tsx'
import { renderDatePickerFixture } from './date-picker.tsx'
import { renderDialogFixture } from './dialog.tsx'
import { renderDrawerFixture } from './drawer.tsx'
import { renderFieldFixture } from './field.tsx'
import { renderContextMenuFixture, renderDropdownMenuFixture } from './menu-overlays.tsx'
import { renderHoverCardFixture, renderPopoverFixture, renderTooltipFixture } from './positioned-overlays.tsx'
import { renderMenubarFixture } from './menubar.tsx'
import { renderNativeSelectFixture } from './native-select.tsx'
import { renderNavigationMenuFixture } from './navigation-menu.tsx'
import {
  renderCheckboxFixture,
  renderProgressFixture,
  renderRadioGroupFixture,
  renderSwitchFixture,
} from './native-state.tsx'
import {
  renderBreadcrumbFixture,
  renderButtonGroupFixture,
  renderItemFixture,
  renderPaginationFixture,
  renderTableFixture,
  renderTypographyFixture,
} from './navigation-collection.tsx'
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
} from './static-display.tsx'
import { renderTextareaFixture } from './textarea.tsx'
import { renderTabsFixture } from './tabs.tsx'
import { renderToggleFixture, renderToggleGroupFixture } from './toggle.tsx'
import { renderSliderFixture } from './slider.tsx'
import { renderScrollAreaFixture } from './scroll-area.tsx'
import { renderSelectFixture } from './select.tsx'
import { renderSheetFixture } from './sheet.tsx'

export function renderCandidateFixture(fixture: FixtureScenario) {
  switch (fixture.component) {
    case 'accordion':
      return renderAccordionFixture(fixture)
    case 'alert':
      return renderAlertFixture(fixture)
    case 'alert-dialog':
      return renderAlertDialogFixture(fixture)
    case 'aspect-ratio':
      return renderAspectRatioFixture(fixture)
    case 'avatar':
      return renderAvatarFixture(fixture)
    case 'badge':
      return renderBadgeFixture(fixture)
    case 'breadcrumb':
      return renderBreadcrumbFixture(fixture)
    case 'button':
      return renderButtonFixture(fixture)
    case 'button-group':
      return renderButtonGroupFixture(fixture)
    case 'calendar':
      return renderCalendarFixture(fixture)
    case 'carousel':
      return renderCarouselFixture(fixture)
    case 'card':
      return renderCardFixture(fixture)
    case 'checkbox':
      return renderCheckboxFixture(fixture)
    case 'collapsible':
      return renderCollapsibleFixture(fixture)
    case 'combobox':
      return renderComboboxFixture(fixture)
    case 'command':
      return renderCommandFixture(fixture)
    case 'context-menu':
      return renderContextMenuFixture(fixture)
    case 'date-picker':
      return renderDatePickerFixture(fixture)
    case 'dialog':
      return renderDialogFixture(fixture)
    case 'drawer':
      return renderDrawerFixture(fixture)
    case 'dropdown-menu':
      return renderDropdownMenuFixture(fixture)
    case 'empty':
      return renderEmptyFixture(fixture)
    case 'field':
      return renderFieldFixture(fixture)
    case 'hover-card':
      return renderHoverCardFixture(fixture)
    case 'kbd':
      return renderKbdFixture()
    case 'item':
      return renderItemFixture(fixture)
    case 'menubar':
      return renderMenubarFixture(fixture)
    case 'pagination':
      return renderPaginationFixture(fixture)
    case 'navigation-menu':
      return renderNavigationMenuFixture(fixture)
    case 'popover':
      return renderPopoverFixture(fixture)
    case 'progress':
      return renderProgressFixture(fixture)
    case 'radio-group':
      return renderRadioGroupFixture(fixture)
    case 'scroll-area':
      return renderScrollAreaFixture(fixture)
    case 'select':
      return renderSelectFixture(fixture)
    case 'native-select':
      return renderNativeSelectFixture(fixture)
    case 'separator':
      return renderSeparatorFixture()
    case 'sheet':
      return renderSheetFixture(fixture)
    case 'skeleton':
      return renderSkeletonFixture()
    case 'slider':
      return renderSliderFixture(fixture)
    case 'spinner':
      return renderSpinnerFixture(fixture)
    case 'switch':
      return renderSwitchFixture(fixture)
    case 'table':
      return renderTableFixture(fixture)
    case 'tabs':
      return renderTabsFixture(fixture)
    case 'textarea':
      return renderTextareaFixture(fixture)
    case 'toggle':
      return renderToggleFixture(fixture)
    case 'toggle-group':
      return renderToggleGroupFixture(fixture)
    case 'tooltip':
      return renderTooltipFixture(fixture)
    case 'typography':
      return renderTypographyFixture(fixture)
  }
}
