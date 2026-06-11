import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
  Input,
  Label,
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
  let demo = fixture.id === 'demo'
  let sideAlign = fixture.id === 'side-align'
  let defaultOpen = fixture.id === 'default-open'

  if (demo) {
    return (
      <div style={anchorStyle()}>
        <Popover id="candidate-popover-demo">
          <PopoverTrigger class="radcn-button radcn-button--outline">Open popover</PopoverTrigger>
          <PopoverPortal>
            <PopoverContent class="w-80 radcn-fixture-popover-demo-content" style="width:20rem;">
              <div data-fixture-popover-form style="display:grid;gap:16px;">
                <div data-fixture-popover-copy style="display:grid;gap:8px;">
                  <h4 style="margin:0;font-size:0.875rem;font-weight:500;line-height:1;">Dimensions</h4>
                  <p style="margin:0;color:var(--radcn-muted-foreground);font-size:0.875rem;">Set the dimensions for the layer.</p>
                </div>
                <div data-fixture-popover-fields style="display:grid;gap:8px;">
                  <div data-fixture-popover-row style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);align-items:center;gap:16px;">
                    <Label for="width">Width</Label>
                    <Input class="col-span-2 h-8" id="width" value="100%" />
                  </div>
                  <div data-fixture-popover-row style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);align-items:center;gap:16px;">
                    <Label for="maxWidth">Max. width</Label>
                    <Input class="col-span-2 h-8" id="maxWidth" value="300px" />
                  </div>
                  <div data-fixture-popover-row style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);align-items:center;gap:16px;">
                    <Label for="height">Height</Label>
                    <Input class="col-span-2 h-8" id="height" value="25px" />
                  </div>
                  <div data-fixture-popover-row style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);align-items:center;gap:16px;">
                    <Label for="maxHeight">Max. height</Label>
                    <Input class="col-span-2 h-8" id="maxHeight" value="none" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </div>
    )
  }

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
  if (fixture.id === 'demo') {
    return (
      <div data-radcn-fixture-tooltip-family="tooltip-demo" style={anchorStyle(false)}>
        <TooltipProvider delayDuration={0}>
          <Tooltip id="candidate-tooltip-demo">
            <TooltipTrigger class="radcn-button radcn-button--outline">Hover</TooltipTrigger>
            <TooltipPortal>
              <TooltipContent sideOffset={0}>
                <p>Add to library</p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

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
  if (fixture.id === 'demo') {
    return (
      <div style={anchorStyle(false)}>
        <HoverCard id="candidate-hover-card-demo">
          <HoverCardTrigger
            class="radcn-button radcn-button--link"
            style="min-height:auto;padding:0;text-decoration:underline;text-underline-offset:0.25rem;"
          >
            @nextjs
          </HoverCardTrigger>
          <HoverCardPortal>
            <HoverCardContent style="--radcn-hover-card-width:20rem;">
              <Avatar>
                <AvatarImage alt="@vercel" src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div
                class="radcn-hover-card-body grid gap-2 text-[0.875rem] font-normal leading-[1.45] [font-family:var(--radcn-font)] [&_p]:m-0 [&_p]:text-muted-foreground"
                data-candidate-hover-card-layout="profile"
                style="display:grid;gap:0.25rem;"
              >
                <h4 style="margin:0;font-size:0.875rem;font-weight:600;line-height:1.2;">@nextjs</h4>
                <p style="margin:0;font-size:0.875rem;line-height:1.4;">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div style="color:var(--radcn-muted-foreground);font-size:0.75rem;line-height:1.35;">
                  Joined December 2021
                </div>
              </div>
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCard>
      </div>
    )
  }

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
            <div class="radcn-hover-card-avatar inline-grid w-11 h-11 place-items-center rounded-[999px] bg-[var(--radcn-hover-card-avatar-bg,var(--radcn-secondary))] text-[var(--radcn-hover-card-avatar-fg,var(--radcn-foreground))] font-bold text-[0.875rem] leading-none [font-family:var(--radcn-font)]" aria-hidden="true">RC</div>
            <div class="radcn-hover-card-body grid gap-2 text-[0.875rem] font-normal leading-[1.45] [font-family:var(--radcn-font)] [&_p]:m-0 [&_p]:text-muted-foreground">
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
