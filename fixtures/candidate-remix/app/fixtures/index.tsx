import type { FixtureScenario } from '../../../scenarios/types.ts'

import { renderAccordionFixture } from './accordion.tsx'
import { renderButtonFixture } from './button.tsx'
import { renderFieldFixture } from './field.tsx'
import { renderTextareaFixture } from './textarea.tsx'

export function renderCandidateFixture(fixture: FixtureScenario) {
  switch (fixture.component) {
    case 'accordion':
      return renderAccordionFixture(fixture)
    case 'button':
      return renderButtonFixture(fixture)
    case 'field':
      return renderFieldFixture(fixture)
    case 'textarea':
      return renderTextareaFixture(fixture)
  }
}
