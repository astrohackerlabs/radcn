import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Kbd,
  KbdGroup,
  Progress,
  Separator,
  Skeleton,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from 'radcn'

export function renderAlertFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'destructive':
      return (
        <Alert variant="destructive">
          <AlertTitle>Unable to save changes</AlertTitle>
          <AlertDescription>Review the highlighted fields and try again.</AlertDescription>
        </Alert>
      )
    case 'custom-token':
      return (
        <Alert class="radcn-fixture-custom-alert">
          <AlertTitle>Custom alert token</AlertTitle>
          <AlertDescription>This alert uses fixture-level CSS variables.</AlertDescription>
        </Alert>
      )
    default:
      return (
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>RadCN static primitives render without client state.</AlertDescription>
          <AlertAction>
            <Button size="sm" variant="outline">Review</Button>
          </AlertAction>
        </Alert>
      )
  }
}

export function renderAspectRatioFixture(fixture: FixtureScenario) {
  let isSquare = fixture.id === 'custom-ratio'

  return (
    <AspectRatio ratio={isSquare ? '1 / 1' : '16 / 9'} style={isSquare ? 'width:240px' : 'width:420px'}>
      <div class="radcn-fixture-aspect-media">
        <span>{isSquare ? '1:1' : '16:9'}</span>
      </div>
    </AspectRatio>
  )
}

export function renderBadgeFixture(fixture: FixtureScenario) {
  if (fixture.id === 'custom-class') {
    return <Badge class="radcn-fixture-custom-badge">Custom Badge</Badge>
  }

  if (fixture.id === 'demo') {
    return (
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center" data-radcn-badge-demo>
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge
          class="radcn-fixture-custom-badge"
          style="background:#2563eb;color:white"
          variant="secondary"
        >
          <span aria-hidden="true" data-radcn-badge-icon>✓</span>
          Verified
        </Badge>
        <Badge
          class="radcn-fixture-count-badge"
          style="border-radius:999px;min-width:20px;height:20px;padding:0 4px"
        >
          8
        </Badge>
        <Badge
          class="radcn-fixture-count-badge"
          style="border-radius:999px;min-width:20px;height:20px;padding:0 4px"
          variant="destructive"
        >
          99
        </Badge>
        <Badge
          class="radcn-fixture-count-badge"
          style="border-radius:999px;min-width:20px;height:20px;padding:0 4px"
          variant="outline"
        >
          20+
        </Badge>
      </div>
    )
  }

  if (fixture.id === 'destructive') {
    return <Badge variant="destructive">Destructive</Badge>
  }

  if (fixture.id === 'outline') {
    return <Badge variant="outline">Outline</Badge>
  }

  if (fixture.id === 'secondary') {
    return <Badge variant="secondary">Secondary</Badge>
  }

  return (
    <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge href="/fixtures/badge/variants" variant="link">Link</Badge>
    </div>
  )
}

export function renderCardFixture(fixture: FixtureScenario) {
  let custom = fixture.id === 'custom-token'
  let compact = fixture.id === 'compact'

  return (
    <Card class={custom ? 'radcn-fixture-custom-card' : undefined} size={compact ? 'sm' : 'default'}>
      <CardHeader>
        <div>
          <CardTitle>{compact ? 'Compact plan' : 'Team workspace'}</CardTitle>
          <CardDescription>{compact ? 'Dense spacing for summaries.' : 'Usage and billing summary.'}</CardDescription>
        </div>
        <CardAction>
          <Badge variant="outline">{custom ? 'Custom' : 'Live'}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p style="margin:0">12 active members and 4 pending invites.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Open workspace</Button>
      </CardFooter>
    </Card>
  )
}

export function renderEmptyFixture(fixture: FixtureScenario) {
  if (fixture.id === 'avatar') {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Avatar size="lg">
              <AvatarImage alt="Riley Chen" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='24' fill='%230f766e'/%3E%3Ctext x='24' y='29' text-anchor='middle' font-size='16' fill='white' font-family='Arial'%3ERC%3C/text%3E%3C/svg%3E" width={48} height={48} />
              <AvatarFallback>RC</AvatarFallback>
            </Avatar>
          </EmptyMedia>
          <EmptyTitle>Riley is offline</EmptyTitle>
          <EmptyDescription>Leave a message and Riley will see it when they return.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent><Button size="sm">Leave Message</Button></EmptyContent>
      </Empty>
    )
  }

  if (fixture.id === 'avatar-group') {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <AvatarGroup ariaLabel="Invited members">
              <Avatar><AvatarFallback>AD</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>GH</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>LP</AvatarFallback></Avatar>
              <AvatarGroupCount>+2</AvatarGroupCount>
            </AvatarGroup>
          </EmptyMedia>
          <EmptyTitle>Invite your team</EmptyTitle>
          <EmptyDescription>Start collaborating by inviting teammates into this workspace.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent><Button size="sm">Invite Members</Button></EmptyContent>
      </Empty>
    )
  }

  if (fixture.id === 'background') {
    return (
      <Empty
        class="radcn-fixture-empty-background"
        style="min-height:18rem;background:var(--radcn-muted);border-color:transparent"
      >
        <EmptyHeader>
          <EmptyMedia variant="icon">!</EmptyMedia>
          <EmptyTitle>No notifications</EmptyTitle>
          <EmptyDescription>Refresh to check for new deployment alerts.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent><Button size="sm" variant="outline">Refresh</Button></EmptyContent>
      </Empty>
    )
  }

  if (fixture.id === 'demo') {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">+</EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>Create a project or import an existing workspace to populate this dashboard.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem">
          <Button size="sm">Create Project</Button>
          <Button size="sm" variant="outline">Import Project</Button>
          <Button href="/fixtures/empty/demo" size="sm" variant="link">Learn More</Button>
        </EmptyContent>
      </Empty>
    )
  }

  if (fixture.id === 'icon-grid') {
    let items = [
      ['M', 'No messages', 'Messages from collaborators appear here.'],
      ['F', 'No favorites', 'Save pages to revisit them quickly.'],
      ['L', 'No likes', 'Liked releases will show up here.'],
      ['B', 'No bookmarks', 'Bookmark components as you review them.'],
    ]

    return (
      <div style="display:grid;gap:1rem;grid-template-columns:repeat(2,minmax(12rem,1fr));width:min(100%,42rem)">
        {items.map(([glyph, title, description]) => (
          <Empty style="min-height:13rem;width:100%;padding:1.25rem">
            <EmptyHeader>
              <EmptyMedia variant="icon">{glyph}</EmptyMedia>
              <EmptyTitle>{title}</EmptyTitle>
              <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ))}
      </div>
    )
  }

  if (fixture.id === 'input-group') {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">?</EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            Search the docs or <a href="/fixtures/empty/input-group">contact support</a>.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent style="width:min(100%,24rem)">
          <InputGroup ariaLabel="Search documentation">
            <InputGroupAddon align="inline-start">S</InputGroupAddon>
            <InputGroupInput name="q" placeholder="Search documentation" />
            <InputGroupAddon align="inline-end"><Kbd>/</Kbd></InputGroupAddon>
          </InputGroup>
        </EmptyContent>
      </Empty>
    )
  }

  if (fixture.id === 'outline') {
    return (
      <Empty
        class="radcn-fixture-empty-outline"
        style="border-style:dashed;border-color:color-mix(in srgb,var(--radcn-border) 80%,var(--radcn-primary))"
      >
        <EmptyHeader>
          <EmptyMedia variant="icon">C</EmptyMedia>
          <EmptyTitle>No files uploaded</EmptyTitle>
          <EmptyDescription>Upload files to make this cloud workspace useful.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent><Button size="sm" variant="outline">Upload Files</Button></EmptyContent>
      </Empty>
    )
  }

  let icon = fixture.id === 'icon'

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={icon ? 'icon' : 'default'}>{icon ? '+' : '0'}</EmptyMedia>
        <EmptyTitle>{icon ? 'No integrations' : 'No projects yet'}</EmptyTitle>
        <EmptyDescription>{icon ? 'Connect a service to get started.' : 'Create a project to populate this space.'}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">{icon ? 'Connect service' : 'Create project'}</Button>
      </EmptyContent>
    </Empty>
  )
}

export function renderKbdFixture(fixture: FixtureScenario) {
  if (fixture.id === 'button') {
    return (
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <Button size="sm" variant="outline">Save <Kbd>⏎</Kbd></Button>
        <Button size="sm" variant="outline">Cancel <Kbd>Esc</Kbd></Button>
      </div>
    )
  }

  if (fixture.id === 'demo') {
    return (
      <div style="display:grid;gap:12px">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⌃</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>B</Kbd>
        </KbdGroup>
      </div>
    )
  }

  if (fixture.id === 'group') {
    return (
      <div data-radcn-fixture-kbd-prose style="display:flex;flex-wrap:wrap;gap:0.35rem;align-items:center;color:var(--radcn-muted-foreground)">
        Use <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>B</Kbd></KbdGroup> for bold and{' '}
        <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>K</Kbd></KbdGroup> for links.
      </div>
    )
  }

  if (fixture.id === 'input-group') {
    return (
      <InputGroup ariaLabel="Search documentation" style="width:min(100%, 360px)">
        <InputGroupAddon align="inline-start">
          <span aria-hidden="true" data-radcn-fixture-search-icon>S</span>
        </InputGroupAddon>
        <InputGroupInput name="q" placeholder="Search documentation" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    )
  }

  if (fixture.id === 'tooltip') {
    return (
      <ButtonGroup ariaLabel="Kbd tooltip shortcuts">
        <Tooltip defaultOpen>
          <TooltipTrigger class="radcn-button radcn-button--outline radcn-button--sm" ariaLabel="Save command">Save</TooltipTrigger>
          <TooltipPortal><TooltipContent>Save draft <Kbd>S</Kbd></TooltipContent></TooltipPortal>
        </Tooltip>
        <Tooltip defaultOpen>
          <TooltipTrigger class="radcn-button radcn-button--outline radcn-button--sm" ariaLabel="Print command">Print</TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>
              Print page <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>P</Kbd></KbdGroup>
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </ButtonGroup>
    )
  }

  return (
    <KbdGroup>
      <Kbd>Cmd</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  )
}

export function renderSeparatorFixture() {
  return (
    <div style="display:flex;gap:24px;align-items:stretch;height:96px">
      <div style="display:grid;gap:12px;align-content:start;width:260px">
        <span>General</span>
        <Separator decorative={false} orientation="horizontal" />
        <span>Notifications</span>
      </div>
      <Separator decorative={false} orientation="vertical" />
      <div style="display:grid;gap:12px;align-content:start">
        <span>Security</span>
        <span>Billing</span>
      </div>
    </div>
  )
}

export function renderSkeletonFixture() {
  return (
    <div style="display:grid;gap:12px;width:320px">
      <Skeleton style="width:56px;height:56px;border-radius:999px" />
      <Skeleton style="width:100%;height:18px" />
      <Skeleton style="width:72%;height:18px" />
    </div>
  )
}

export function renderSpinnerFixture(fixture: FixtureScenario) {
  if (fixture.id === 'badge') {
    return (
      <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        <Badge><Spinner ariaLabel="Syncing" /> Syncing</Badge>
        <Badge variant="secondary"><Spinner ariaLabel="Updating" /> Updating</Badge>
        <Badge variant="outline"><Spinner ariaLabel="Processing" /> Processing</Badge>
      </div>
    )
  }

  if (fixture.id === 'basic') {
    return <Spinner />
  }

  if (fixture.id === 'button') {
    return (
      <div style="display:grid;gap:12px;align-items:start;width:220px">
        <Button disabled size="sm"><Spinner ariaLabel="Loading" /> Loading...</Button>
        <Button disabled size="sm" variant="outline"><Spinner ariaLabel="Please wait" /> Please wait</Button>
        <Button disabled size="sm" variant="secondary"><Spinner ariaLabel="Processing" /> Processing</Button>
      </div>
    )
  }

  if (fixture.id === 'color') {
    return (
      <div style="display:flex;gap:18px;align-items:center">
        <Spinner ariaLabel="Red loading" style="--radcn-spinner-size:1.5rem;--radcn-spinner-color:#dc2626" />
        <Spinner ariaLabel="Green loading" style="--radcn-spinner-size:1.5rem;--radcn-spinner-color:#16a34a" />
        <Spinner ariaLabel="Blue loading" style="--radcn-spinner-size:1.5rem;--radcn-spinner-color:#2563eb" />
        <Spinner ariaLabel="Yellow loading" style="--radcn-spinner-size:1.5rem;--radcn-spinner-color:#ca8a04" />
        <Spinner ariaLabel="Purple loading" style="--radcn-spinner-size:1.5rem;--radcn-spinner-color:#9333ea" />
      </div>
    )
  }

  if (fixture.id === 'custom') {
    return (
      <svg
        aria-label="Custom loading"
        data-radcn-custom-spinner
        fill="none"
        role="status"
        style="width:1.5rem;height:1.5rem;animation:radcn-spin 1s linear infinite;color:#0f766e"
        viewBox="0 0 24 24"
      >
        <path d="M12 3a9 9 0 1 0 9 9" stroke="currentColor" stroke-linecap="round" stroke-width="4" />
      </svg>
    )
  }

  if (fixture.id === 'demo') {
    return (
      <ItemGroup>
        <Item variant="muted">
          <ItemMedia><Spinner ariaLabel="Processing payment" /></ItemMedia>
          <ItemContent><ItemTitle>Processing payment...</ItemTitle></ItemContent>
          <ItemContent class="radcn-fixture-spinner-meta"><ItemTitle>$100.00</ItemTitle></ItemContent>
        </Item>
      </ItemGroup>
    )
  }

  if (fixture.id === 'empty') {
    return (
      <Empty style="width:min(100%, 32rem)">
        <EmptyHeader>
          <EmptyMedia variant="icon"><Spinner ariaLabel="Processing request" /></EmptyMedia>
          <EmptyTitle>Processing your request</EmptyTitle>
          <EmptyDescription>Please wait while we process your request. Do not refresh the page.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent><Button size="sm" variant="outline">Cancel</Button></EmptyContent>
      </Empty>
    )
  }

  if (fixture.id === 'input-group') {
    return (
      <div style="display:grid;gap:12px;width:min(100%, 420px)">
        <InputGroup disabled ariaLabel="Searching">
          <InputGroupInput disabled name="search" placeholder="Searching..." />
          <InputGroupAddon align="inline-end"><Spinner ariaLabel="Searching" /></InputGroupAddon>
        </InputGroup>
        <InputGroup disabled ariaLabel="Validating message">
          <InputGroupTextarea disabled name="message" placeholder="Send a message..." rows={3} />
          <InputGroupAddon align="block-end">
            <Spinner ariaLabel="Validating" />
            <InputGroupText>Validating...</InputGroupText>
            <InputGroupButton ariaLabel="Send message" size="icon-xs" variant="default">^</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    )
  }

  if (fixture.id === 'item') {
    return (
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon"><Spinner ariaLabel="Downloading" /></ItemMedia>
          <ItemContent>
            <ItemTitle>Downloading...</ItemTitle>
            <ItemDescription>129 MB / 1000 MB</ItemDescription>
          </ItemContent>
          <ItemActions><Button size="sm" variant="outline">Cancel</Button></ItemActions>
          <ItemFooter><Progress ariaLabel="Download progress" value={75} /></ItemFooter>
        </Item>
      </ItemGroup>
    )
  }

  if (fixture.id === 'size') {
    return (
      <div style="display:flex;gap:18px;align-items:center">
        <Spinner ariaLabel="Small loading" style="--radcn-spinner-size:0.75rem" />
        <Spinner ariaLabel="Default loading" style="--radcn-spinner-size:1rem" />
        <Spinner ariaLabel="Medium loading" style="--radcn-spinner-size:1.5rem" />
        <Spinner ariaLabel="Large loading" style="--radcn-spinner-size:2rem" />
      </div>
    )
  }

  if (fixture.id === 'custom-size') {
    return <Spinner class="radcn-fixture-custom-spinner" ariaLabel="Loading report" />
  }

  return <Spinner />
}
