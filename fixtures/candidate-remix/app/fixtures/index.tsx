import type { FixtureScenario } from '../../../scenarios/types.ts'

import { renderAccordionFixture } from './accordion.tsx'
import { renderButtonFixture } from './button.tsx'
import { renderCollapsibleFixture } from './collapsible.tsx'
import { renderFieldFixture } from './field.tsx'
import { renderNativeSelectFixture } from './native-select.tsx'
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

export function renderCandidateFixture(fixture: FixtureScenario) {
  switch (fixture.component) {
    case 'accordion':
      return renderAccordionFixture(fixture)
    case 'alert':
      return renderAlertFixture(fixture)
    case 'aspect-ratio':
      return renderAspectRatioFixture(fixture)
    case 'badge':
      return renderBadgeFixture(fixture)
    case 'breadcrumb':
      return renderBreadcrumbFixture(fixture)
    case 'button':
      return renderButtonFixture(fixture)
    case 'button-group':
      return renderButtonGroupFixture(fixture)
    case 'card':
      return renderCardFixture(fixture)
    case 'checkbox':
      return renderCheckboxFixture(fixture)
    case 'collapsible':
      return renderCollapsibleFixture(fixture)
    case 'empty':
      return renderEmptyFixture(fixture)
    case 'field':
      return renderFieldFixture(fixture)
    case 'kbd':
      return renderKbdFixture()
    case 'item':
      return renderItemFixture(fixture)
    case 'pagination':
      return renderPaginationFixture(fixture)
    case 'progress':
      return renderProgressFixture(fixture)
    case 'radio-group':
      return renderRadioGroupFixture(fixture)
    case 'native-select':
      return renderNativeSelectFixture(fixture)
    case 'separator':
      return renderSeparatorFixture()
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
    case 'typography':
      return renderTypographyFixture(fixture)
  }
}
