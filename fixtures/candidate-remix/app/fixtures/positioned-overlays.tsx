import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from 'radcn'

function anchorStyle(edge = false) {
  return [
    'display:flex',
    edge ? 'justify-content:flex-end' : 'justify-content:center',
    'align-items:center',
    'min-height:120px',
    'width:100%',
  ].join(';')
}

export function renderPopoverFixture(fixture: FixtureScenario) {
  let custom = fixture.id === 'custom-token'
  let sideAlign = fixture.id === 'side-align'
  let defaultOpen = fixture.id === 'default-open'

  return (
    <div style={anchorStyle(sideAlign)}>
      <Popover defaultOpen={defaultOpen} id={`candidate-popover-${fixture.id}`}>
        <PopoverTrigger>{fixture.id === 'outside-dismiss' ? 'Open dismissible popover' : 'Open popover'}</PopoverTrigger>
        {sideAlign && (
          <PopoverAnchor>
            <span
              data-popover-anchor-box
              style="display:inline-flex;width:56px;height:32px;align-items:center;justify-content:center;margin-left:160px;border:1px dashed #7c3aed;border-radius:6px;color:#6d28d9;font:600 0.75rem/1 var(--radcn-font)"
            >
              Anchor
            </span>
          </PopoverAnchor>
        )}
        <PopoverPortal>
          <PopoverContent
            align={sideAlign ? 'end' : 'center'}
            class={custom ? 'radcn-fixture-custom-popover' : undefined}
            side={sideAlign ? 'left' : 'bottom'}
            sideOffset={8}
          >
            <PopoverHeader>
              <PopoverTitle>{custom ? 'Custom popover' : 'Deployment status'}</PopoverTitle>
              <PopoverDescription>Preview release channels and deployment health.</PopoverDescription>
            </PopoverHeader>
            <button class="radcn-button radcn-button--secondary" data-popover-focus type="button">View details</button>
            <PopoverClose>Close</PopoverClose>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </div>
  )
}

export function renderTooltipFixture(fixture: FixtureScenario) {
  let custom = fixture.id === 'custom-token'
  let side = fixture.id === 'side' ? 'right' as const : 'top' as const
  let delay = fixture.id === 'delay' ? 160 : 0

  return (
    <div style={anchorStyle(fixture.id === 'side')}>
      <TooltipProvider delayDuration={delay}>
        <Tooltip defaultOpen id={`candidate-tooltip-${fixture.id}`}>
          <TooltipTrigger>{fixture.id === 'focus' ? 'Focus target' : 'Hover target'}</TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class={custom ? 'radcn-fixture-custom-tooltip' : undefined} side={side} sideOffset={6}>
              {custom ? 'Custom tooltip' : 'Tooltip content'}
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export function renderHoverCardFixture(fixture: FixtureScenario) {
  let custom = fixture.id === 'custom-token'
  let sideAlign = fixture.id === 'side-align'
  let delay = fixture.id === 'delay' ? 180 : 0

  return (
    <div style={anchorStyle(sideAlign)}>
      <HoverCard closeDelay={120} defaultOpen id={`candidate-hover-card-${fixture.id}`} openDelay={delay}>
        <HoverCardTrigger>{fixture.id === 'focus' ? 'Focus profile' : 'Hover profile'}</HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent
            align={sideAlign ? 'end' : 'center'}
            class={custom ? 'radcn-fixture-custom-hover-card' : undefined}
            side={sideAlign ? 'left' : 'bottom'}
            sideOffset={8}
          >
            <div class="radcn-hover-card-avatar" aria-hidden="true">RC</div>
            <div class="radcn-hover-card-body">
              <strong>{custom ? 'Custom hover card' : 'RadCN Library'}</strong>
              <p>Composable Remix 3 components with shadcn-inspired styling.</p>
              <button class="radcn-button radcn-button--outline" data-hover-card-action type="button">Follow</button>
            </div>
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>
    </div>
  )
}
