import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from 'radcn'
import type { SheetSide } from 'radcn'

function sideFromScenario(id: string): SheetSide {
  if (id === 'left' || id === 'top' || id === 'bottom') return id
  return 'right'
}

export function renderSheetFixture(fixture: FixtureScenario) {
  let custom = fixture.id === 'custom-token'
  let side = sideFromScenario(fixture.id)

  return (
    <Sheet id={`candidate-sheet-${fixture.id}`}>
      <SheetTrigger>Open {side} sheet</SheetTrigger>
      <SheetPortal class={custom ? 'radcn-fixture-custom-sheet' : undefined}>
        <SheetOverlay />
        <SheetContent class={custom ? 'radcn-fixture-custom-sheet' : undefined} side={side}>
          <SheetHeader>
            <SheetTitle>{custom ? 'Custom sheet' : 'Team settings'}</SheetTitle>
            <SheetDescription>Adjust project settings from a side panel.</SheetDescription>
          </SheetHeader>
          <label style="display:grid;gap:6px;font:500 0.875rem/1.2 var(--radcn-font)">
            Team name
            <input class="radcn-input" data-sheet-name-input value="Design Systems" />
          </label>
          <SheetFooter>
            <SheetClose>Save changes</SheetClose>
          </SheetFooter>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}
