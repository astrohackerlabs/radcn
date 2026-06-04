import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  AspectRatio,
  Badge,
  Button,
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
  Kbd,
  KbdGroup,
  Separator,
  Skeleton,
  Spinner,
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

export function renderKbdFixture() {
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
  if (fixture.id === 'custom-size') {
    return <Spinner class="radcn-fixture-custom-spinner" ariaLabel="Loading report" />
  }

  return <Spinner />
}
