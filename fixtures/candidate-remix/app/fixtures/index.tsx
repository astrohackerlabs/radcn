import type { FixtureScenario } from '../../../scenarios/types.ts'

import { renderAccordionFixture } from './accordion.tsx'
import { renderButtonFixture } from './button.tsx'
import { renderFieldFixture } from './field.tsx'
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
    case 'button':
      return renderButtonFixture(fixture)
    case 'card':
      return renderCardFixture(fixture)
    case 'empty':
      return renderEmptyFixture(fixture)
    case 'field':
      return renderFieldFixture(fixture)
    case 'kbd':
      return renderKbdFixture()
    case 'separator':
      return renderSeparatorFixture()
    case 'skeleton':
      return renderSkeletonFixture()
    case 'spinner':
      return renderSpinnerFixture(fixture)
    case 'textarea':
      return renderTextareaFixture(fixture)
  }
}
