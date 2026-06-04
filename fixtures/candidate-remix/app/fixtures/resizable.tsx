import type { FixtureScenario } from '../../../scenarios/types.ts'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'radcn'

function Panel({ children }: { children: string }) {
  return <div class="radcn-fixture-panel">{children}</div>
}

export function renderResizableFixture(fixture: FixtureScenario) {
  let vertical = fixture.id === 'vertical'
  let custom = fixture.id === 'custom-token'
  return (
    <ResizablePanelGroup class={custom ? 'radcn-fixture-custom-resizable' : undefined} orientation={vertical ? 'vertical' : 'horizontal'}>
      <ResizablePanel defaultSize={fixture.id === 'keyboard' ? 40 : 50}>{Panel({ children: 'Navigation' })}</ResizablePanel>
      <ResizableHandle withHandle={fixture.id === 'with-handle' || fixture.id === 'keyboard'} />
      <ResizablePanel defaultSize={fixture.id === 'keyboard' ? 60 : 50}>{Panel({ children: 'Preview' })}</ResizablePanel>
    </ResizablePanelGroup>
  )
}
