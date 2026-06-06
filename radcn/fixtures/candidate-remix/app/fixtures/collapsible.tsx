import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'radcn'

const demoCss = `
.radcn-fixture-collapsible-demo [data-radcn-collapsible-icon] {
  display: none;
}

.radcn-fixture-collapsible-demo [data-radcn-collapsible-trigger-text] {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
}

.radcn-fixture-collapsible-demo-header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.radcn-fixture-collapsible-demo [data-radcn-collapsible-content-inner] {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
}
`

const demoRootStyle =
  'display:flex;width:350px;max-width:100%;flex-direction:column;gap:0.5rem;border:0;background:transparent;color:var(--radcn-foreground);'
const demoTriggerStyle = 'display:flex;width:350px;max-width:100%;flex-direction:column;gap:0.5rem;padding:0;'
const demoHeaderStyle =
  'display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:0;padding-inline:1rem;'
const demoHeadingStyle = 'margin:0;font-size:0.875rem;font-weight:600;line-height:1.25rem;'
const demoIconButtonStyle =
  'width:2rem;min-height:2rem;height:2rem;flex:0 0 auto;justify-content:center;gap:0;padding:0;border-radius:calc(var(--radcn-radius) - 0.125rem);'
const demoContentStyle = 'display:flex;flex-direction:column;gap:0.5rem;border-top:0;color:inherit;'
const demoRowStyle =
  'border:1px solid var(--radcn-border);border-radius:calc(var(--radcn-radius) - 0.125rem);padding:0.5rem 1rem;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-size:0.875rem;line-height:1.25rem;'

function RepositoryRow({ ariaHidden, children }: { ariaHidden?: boolean; children: string }) {
  return (
    <div
      aria-hidden={ariaHidden ? 'true' : undefined}
      class="rounded-md border px-4 py-2 font-mono text-sm"
      data-collapsible-demo-row
      style={demoRowStyle}
    >
      {children}
    </div>
  )
}

export function renderCollapsibleFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'demo':
      return (
        <div data-collapsible-example="demo">
          <style>{demoCss}</style>
          <Collapsible class="flex w-[350px] flex-col gap-2 radcn-fixture-collapsible-demo" style={demoRootStyle}>
            <CollapsibleTrigger
              class="flex w-[350px] flex-col gap-2 radcn-fixture-collapsible-demo-trigger"
              style={demoTriggerStyle}
            >
              <span class="flex items-center justify-between gap-4 px-4 radcn-fixture-collapsible-demo-header" data-collapsible-demo-header style={demoHeaderStyle}>
                <h4 aria-hidden="true" style={demoHeadingStyle}>@peduarte starred 3 repositories</h4>
                <span
                  class="radcn-button radcn-button--ghost radcn-button--icon size-8"
                  data-fixture-collapsible-demo-icon-button
                  style={demoIconButtonStyle}
                >
                  <span class="radcn-sr-only">Toggle</span>
                  <span aria-hidden="true" data-fixture-collapsible-demo-icon style="font-size:1rem;line-height:1;">
                    ⇵
                  </span>
                </span>
              </span>
              {RepositoryRow({ ariaHidden: true, children: '@radix-ui/primitives' })}
            </CollapsibleTrigger>
            <CollapsibleContent class="flex flex-col gap-2" style={demoContentStyle}>
              {RepositoryRow({ children: '@radix-ui/colors' })}
              {RepositoryRow({ children: '@stitches/react' })}
            </CollapsibleContent>
          </Collapsible>
        </div>
      )
    case 'open':
      return (
        <Collapsible open>
          <CollapsibleTrigger>Release notes</CollapsibleTrigger>
          <CollapsibleContent>Version 3 includes native disclosure support.</CollapsibleContent>
        </Collapsible>
      )
    case 'disabled':
      return (
        <Collapsible disabled>
          <CollapsibleTrigger disabled>Locked details</CollapsibleTrigger>
          <CollapsibleContent disabled>Disabled content is not exposed.</CollapsibleContent>
        </Collapsible>
      )
    case 'custom-token':
      return (
        <Collapsible class="radcn-fixture-custom-collapsible" open>
          <CollapsibleTrigger>Custom collapsible</CollapsibleTrigger>
          <CollapsibleContent>Custom tokens style this disclosure.</CollapsibleContent>
        </Collapsible>
      )
    default:
      return (
        <Collapsible>
          <CollapsibleTrigger>Release notes</CollapsibleTrigger>
          <CollapsibleContent>Version 3 includes native disclosure support.</CollapsibleContent>
        </Collapsible>
      )
  }
}
