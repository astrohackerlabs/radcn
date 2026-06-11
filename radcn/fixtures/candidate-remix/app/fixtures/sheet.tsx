import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Button,
  Input,
  Label,
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

const sheetSides = ['top', 'right', 'bottom', 'left'] as const
const sheetExampleContentStyle = 'display:grid;gap:24px;padding:24px;'

function sideFromScenario(id: string): SheetSide {
  if (id === 'left' || id === 'top' || id === 'bottom') return id
  return 'right'
}

function ProfileFields({ prefix }: { prefix: string }) {
  return (
    <div data-sheet-profile-form style="display:grid;gap:12px;padding:16px 0;">
      <div style="display:grid;gap:6px;">
        <Label for={`${prefix}-name`}>Name</Label>
        <Input data-sheet-profile-input id={`${prefix}-name`} value="Pedro Duarte" />
      </div>
      <div style="display:grid;gap:6px;">
        <Label for={`${prefix}-username`}>Username</Label>
        <Input data-sheet-profile-input id={`${prefix}-username`} value="@peduarte" />
      </div>
    </div>
  )
}

function SheetDemoFixture() {
  return (
    <Sheet id="candidate-sheet-demo">
      <SheetTrigger class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">Open</SheetTrigger>
      <SheetPortal>
        <SheetOverlay />
        <SheetContent side="right" style={sheetExampleContentStyle}>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
          </SheetHeader>
          {ProfileFields({ prefix: 'sheet-demo' })}
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}

function SheetSideFixture() {
  return (
    <div data-sheet-side-grid style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-width:320px;">
      {sheetSides.map((side) => (
        <Sheet id={`candidate-sheet-side-${side}`}>
          <SheetTrigger class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">{side}</SheetTrigger>
          <SheetPortal>
            <SheetOverlay />
            <SheetContent side={side} style={sheetExampleContentStyle}>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
              </SheetHeader>
              {ProfileFields({ prefix: `sheet-side-${side}` })}
              <SheetFooter>
                <SheetClose class="radcn-button inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 bg-[var(--radcn-button-bg,var(--radcn-primary))] text-[var(--radcn-button-fg,var(--radcn-primary-foreground))]">Save changes</SheetClose>
              </SheetFooter>
            </SheetContent>
          </SheetPortal>
        </Sheet>
      ))}
    </div>
  )
}

export function renderSheetFixture(fixture: FixtureScenario) {
  if (fixture.id === 'demo') return SheetDemoFixture()
  if (fixture.id === 'side') return SheetSideFixture()

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
