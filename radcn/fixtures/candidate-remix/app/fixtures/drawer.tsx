import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from 'radcn'
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
import { Button, Input, Label } from 'radcn'
import type { DrawerDirection } from 'radcn'

const moveGoalData = [400, 300, 200, 300, 200, 278, 189, 239, 300, 200, 278, 189, 349]

function MoveGoalBars() {
  return (
    <div
      aria-label="Daily activity goal history"
      data-drawer-goal-chart
      role="img"
      style="display:flex;align-items:end;gap:0.25rem;height:120px;padding:0.75rem 0;"
    >
      {moveGoalData.map((value) => (
        <span
          data-drawer-goal-bar
          data-goal={String(value)}
          style={`display:block;flex:1;min-width:0;border-radius:999px;background:#020617;height:${Math.max(24, Math.round(value / 4))}px;opacity:${value < 220 ? '0.42' : '0.8'};`}
        />
      ))}
    </div>
  )
}

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

function renderDrawerDemoFixture() {
  return (
    <div style="display:grid;place-items:center;min-height:220px">
      <Drawer defaultOpen direction="bottom" id="candidate-drawer-demo">
        <DrawerTrigger class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">Open Drawer</DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent class="radcn-fixture-drawer-demo-content" direction="bottom" showHandle>
            <div data-drawer-demo-layout style="margin:0 auto;width:100%;max-width:24rem;">
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>Set your daily activity goal.</DrawerDescription>
              </DrawerHeader>
              <div style="display:grid;gap:1rem;padding:0 1rem;">
                <div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:1rem;">
                  <Button ariaLabel="Decrease" size="icon" variant="outline">-</Button>
                  <div style="text-align:center;">
                    <div data-drawer-goal-value style="font-size:3rem;font-weight:700;line-height:1;">350</div>
                    <div>Calories/day</div>
                  </div>
                  <Button ariaLabel="Increase" size="icon" variant="outline">+</Button>
                </div>
                <div data-drawer-goal-bounds style="display:flex;gap:0.5rem;justify-content:center;">
                  <Button ariaLabel="Decrease at minimum" disabled size="icon-sm" variant="outline">-</Button>
                  <Button ariaLabel="Increase at maximum" disabled size="icon-sm" variant="outline">+</Button>
                </div>
                {MoveGoalBars()}
              </div>
              <DrawerFooter>
                <Button type="submit">Submit</Button>
                <DrawerClose class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">Cancel</DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  )
}

function ProfileForm({ idPrefix, padded = false }: { idPrefix: string; padded?: boolean }) {
  return (
    <form data-drawer-dialog-form={idPrefix} method="post" style={`display:grid;gap:1rem;${padded ? 'padding:0 1rem;' : ''}`}>
      <div style="display:grid;gap:0.5rem;">
        <Label for={`${idPrefix}-email`}>Email</Label>
        <Input id={`${idPrefix}-email`} name="email" type="email" value="shadcn@example.com" />
      </div>
      <div style="display:grid;gap:0.5rem;">
        <Label for={`${idPrefix}-username`}>Username</Label>
        <Input id={`${idPrefix}-username`} name="username" value="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}

function renderDrawerDialogDemoFixture() {
  return (
    <div style="display:grid;gap:1rem;place-items:center;min-height:240px">
      <div data-drawer-dialog-branch="desktop">
        <Dialog id="candidate-drawer-dialog-desktop">
          <DialogTrigger class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">Edit Profile</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent class="radcn-fixture-drawer-dialog-desktop-content" style="width:min(100%,425px);">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
              </DialogHeader>
              {ProfileForm({ idPrefix: 'drawer-dialog-desktop' })}
              <DialogFooter>
                <DialogClose class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">Cancel</DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>

      <div data-drawer-dialog-branch="mobile">
        <Drawer direction="bottom" id="candidate-drawer-dialog-mobile">
          <DrawerTrigger class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">Edit Profile</DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent class="radcn-fixture-drawer-dialog-mobile-content" direction="bottom" showHandle>
              <DrawerHeader style="text-align:left;">
                <DrawerTitle>Edit profile</DrawerTitle>
                <DrawerDescription>Make changes to your profile here. Click save when you're done.</DrawerDescription>
              </DrawerHeader>
              {ProfileForm({ idPrefix: 'drawer-dialog-mobile', padded: true })}
              <DrawerFooter>
                <DrawerClose class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">Cancel</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>
    </div>
  )
}

export function renderDrawerFixture(fixture: FixtureScenario) {
  if (fixture.id === 'demo') return renderDrawerDemoFixture()
  if (fixture.id === 'dialog-demo') return renderDrawerDialogDemoFixture()

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
