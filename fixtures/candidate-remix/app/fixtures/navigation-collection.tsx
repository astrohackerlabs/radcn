import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyListItem,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from 'radcn'

export function renderBreadcrumbFixture(fixture: FixtureScenario) {
  let custom = fixture.id === 'custom-separator'

  return (
    <Breadcrumb class={custom ? 'radcn-fixture-custom-breadcrumb' : undefined}>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/fixtures">Fixtures</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator>{custom ? '>' : '/'}</BreadcrumbSeparator>
        {fixture.id === 'collapsed' ? (
          <>
            <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : undefined}
        <BreadcrumbItem><BreadcrumbLink href="/fixtures/breadcrumb">Breadcrumb</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator>{custom ? '>' : '/'}</BreadcrumbSeparator>
        <BreadcrumbItem><BreadcrumbPage>{custom ? 'Custom separator' : 'Default'}</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function renderButtonGroupFixture(fixture: FixtureScenario) {
  if (fixture.id === 'vertical') {
    return (
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    )
  }

  if (fixture.id === 'with-separator') {
    return (
      <ButtonGroup>
        <Button variant="outline">Save</Button>
        <ButtonGroupSeparator />
        <ButtonGroupText>Draft</ButtonGroupText>
        <Button variant="outline">Publish</Button>
      </ButtonGroup>
    )
  }

  return (
    <ButtonGroup>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  )
}

export function renderItemFixture(fixture: FixtureScenario) {
  if (fixture.id === 'variants') {
    return (
      <ItemGroup>
        <Item variant="outline" size="sm">
          <ItemMedia variant="icon">A</ItemMedia>
          <ItemContent>
            <ItemTitle>Outline item</ItemTitle>
            <ItemDescription>Small item with icon media.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="muted" size="xs">
          <ItemMedia variant="default">B</ItemMedia>
          <ItemContent>
            <ItemTitle>Muted item</ItemTitle>
            <ItemDescription>Extra small muted item.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    )
  }

  if (fixture.id === 'grouped') {
    return (
      <ItemGroup>
        <Item variant="outline">
          <ItemHeader>
            <ItemTitle>Storage</ItemTitle>
            <ItemActions><Button size="sm" variant="outline">Manage</Button></ItemActions>
          </ItemHeader>
          <ItemDescription>42 GB used across team projects.</ItemDescription>
          <ItemFooter><span>Updated today</span><span>72%</span></ItemFooter>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemContent>
            <ItemTitle>Bandwidth</ItemTitle>
            <ItemDescription>Normal usage this cycle.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    )
  }

  return (
    <ItemGroup>
      <Item>
        <ItemMedia variant="image">R</ItemMedia>
        <ItemContent>
          <ItemTitle>RadCN project</ItemTitle>
          <ItemDescription>Component port planning and fixture coverage.</ItemDescription>
        </ItemContent>
        <ItemActions><Button size="sm">Open</Button></ItemActions>
      </Item>
    </ItemGroup>
  )
}

export function renderPaginationFixture(fixture: FixtureScenario) {
  let activePage = fixture.id === 'active' ? '3' : '2'
  let customLabels = fixture.id === 'custom-labels'

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="/fixtures/pagination/default" text={customLabels ? 'Back' : 'Previous'} /></PaginationItem>
        <PaginationItem><PaginationLink href="/fixtures/pagination/default">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="/fixtures/pagination/default" isActive={activePage === '2'}>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="/fixtures/pagination/default" isActive={activePage === '3'}>3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationNext href="/fixtures/pagination/default" text={customLabels ? 'Forward' : 'Next'} /></PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function renderTableFixture(fixture: FixtureScenario) {
  let dense = fixture.id === 'dense'
  let footer = fixture.id === 'footer'

  return (
    <Table dense={dense}>
      <TableCaption>Recent component ports.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Component</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Stage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Button</TableCell>
          <TableCell>Pass</TableCell>
          <TableCell>1</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Card</TableCell>
          <TableCell>Pass</TableCell>
          <TableCell>1</TableCell>
        </TableRow>
      </TableBody>
      {footer ? (
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>2</TableCell>
            <TableCell>Stage 1</TableCell>
          </TableRow>
        </TableFooter>
      ) : undefined}
    </Table>
  )
}

export function renderTypographyFixture(fixture: FixtureScenario) {
  if (fixture.id === 'inline') {
    return (
      <div style="display:grid;gap:12px;max-width:620px">
        <TypographyLead>Use typography recipes for documentation copy.</TypographyLead>
        <TypographyLarge>Large text label</TypographyLarge>
        <TypographyP>Install with <TypographyInlineCode>pnpm add radcn</TypographyInlineCode> once packaging exists.</TypographyP>
        <TypographySmall>Small supporting text</TypographySmall>
        <TypographyMuted>Muted metadata text</TypographyMuted>
      </div>
    )
  }

  if (fixture.id === 'custom-token') {
    return (
      <div class="radcn-fixture-custom-typography">
        <TypographyH1>Custom typography</TypographyH1>
        <TypographyMuted>Custom muted token.</TypographyMuted>
      </div>
    )
  }

  return (
    <article style="max-width:640px">
      <TypographyH1>Build interfaces with the web</TypographyH1>
      <TypographyLead>RadCN keeps static documentation surfaces server-rendered.</TypographyLead>
      <TypographyH2>Principles</TypographyH2>
      <TypographyP>Components expose stable hooks while preserving semantic HTML.</TypographyP>
      <TypographyList>
        <TypographyListItem>Use native elements first.</TypographyListItem>
        <TypographyListItem>Keep customization explicit.</TypographyListItem>
      </TypographyList>
      <TypographyBlockquote>Visual parity is a browser-observed contract.</TypographyBlockquote>
    </article>
  )
}
