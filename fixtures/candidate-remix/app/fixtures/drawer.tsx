import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from 'radcn'
import type { DrawerDirection } from 'radcn'

function drawerBody(scenario: string) {
  if (scenario === 'scrollable-content') {
    return (
      <div data-drawer-scroll-body style="max-height:180px;overflow-y:auto;padding:0 1rem">
        {Array.from({ length: 10 }, (_, index) => (
          <p style="margin:0 0 0.75rem;color:#475569;line-height:1.5">
            Drawer paragraph {index + 1} keeps content scrolling inside the panel.
          </p>
        ))}
      </div>
    )
  }

  return (
    <div style="display:grid;gap:0.75rem;padding:0 1rem;color:#475569;line-height:1.5">
      <p style="margin:0">Tune the panel behavior without leaving the current page context.</p>
      <button data-drawer-secondary-action type="button">Focusable action</button>
    </div>
  )
}

function drawerPanel(scenario: string, direction: 'top' | 'right' | 'bottom' | 'left' = 'bottom') {
  let custom = scenario === 'custom-token'
  let scrollable = scenario === 'scrollable-content'

  return (
    <>
      <DrawerTrigger>{direction === 'bottom' ? 'Open drawer' : `Open ${direction}`}</DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent
          class={custom ? 'radcn-fixture-custom-drawer' : undefined}
          direction={direction}
          showCloseButton={scenario === 'close-actions'}
          showHandle={(direction === 'bottom' && scenario !== 'directions') || scenario === 'gesture-dismiss'}
        >
          <DrawerHeader>
            <DrawerTitle>{scrollable ? 'Scrollable drawer' : 'Move goal'}</DrawerTitle>
            <DrawerDescription>Set the panel policy for this workflow.</DrawerDescription>
          </DrawerHeader>
          {drawerBody(scenario)}
          <DrawerFooter>
            <button data-drawer-primary-action type="button">Submit</button>
            <DrawerClose>Cancel</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </>
  )
}

export function renderDrawerFixture(fixture: FixtureScenario) {
  if (fixture.id === 'directions') {
    return (
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;justify-content:center;min-height:180px">
        {(['bottom', 'right', 'top', 'left'] as const).map((direction, index) => (
          <Drawer defaultOpen={index === 0} direction={direction} id={`candidate-drawer-${direction}`}>
            {drawerPanel(fixture.id, direction)}
          </Drawer>
        ))}
      </div>
    )
  }

  let direction: DrawerDirection = fixture.id === 'gesture-dismiss' ? 'right' : 'bottom'

  return (
    <div style="display:grid;place-items:center;min-height:180px">
      <Drawer defaultOpen direction={direction} id={`candidate-drawer-${fixture.id}`}>
        {drawerPanel(fixture.id, direction)}
      </Drawer>
    </div>
  )
}
