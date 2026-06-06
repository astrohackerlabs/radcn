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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
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
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  Separator,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
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

function DropdownContent({ label = 'More actions' }: { label?: string }) {
  return (
    <>
      <DropdownMenuTrigger ariaLabel={label} class="radcn-button radcn-button--outline radcn-button--default">More</DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
            <DropdownMenuItem>Mark as Read</DropdownMenuItem>
            <DropdownMenuItem>Share Conversation</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">Delete Conversation</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </>
  )
}

function CurrencySelect() {
  return (
    <Select defaultValue="usd" id="candidate-button-group-currency" name="currency">
      <SelectTrigger ariaLabel="Currency" id="candidate-button-group-currency-trigger">
        <SelectValue placeholder="Currency">USD</SelectValue>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            <SelectItem value="usd">USD US Dollar</SelectItem>
            <SelectItem value="eur">EUR Euro</SelectItem>
            <SelectItem value="gbp">GBP British Pound</SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

export function renderButtonGroupFixture(fixture: FixtureScenario) {
  if (fixture.id === 'demo') {
    return (
      <ButtonGroup ariaLabel="Message actions" class="radcn-button-group--clustered">
        <ButtonGroup>
          <Button ariaLabel="Go back" size="icon" variant="outline">←</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Report</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Snooze</Button>
          <DropdownMenu defaultOpen>
            <DropdownMenuTrigger ariaLabel="More options" class="radcn-button radcn-button--outline radcn-button--icon">•••</DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Snooze</DropdownMenuItem>
                  <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Label As</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value="personal">
                        <DropdownMenuRadioItem value="personal">Personal</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Trash</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </ButtonGroup>
      </ButtonGroup>
    )
  }

  if (fixture.id === 'dropdown') {
    return (
      <ButtonGroup>
        <Button variant="outline">Follow</Button>
        <DropdownMenu defaultOpen>
          {DropdownContent({ label: 'Conversation actions' })}
        </DropdownMenu>
      </ButtonGroup>
    )
  }

  if (fixture.id === 'input') {
    return (
      <ButtonGroup>
        <Input id="candidate-button-group-search" name="search" placeholder="Search..." value="radcn" />
        <Button ariaLabel="Search" variant="outline">⌕</Button>
      </ButtonGroup>
    )
  }

  if (fixture.id === 'input-group') {
    return (
      <ButtonGroup class="radcn-fixture-button-group-pill">
        <ButtonGroup>
          <Button ariaLabel="Add attachment" size="icon" variant="outline">+</Button>
        </ButtonGroup>
        <ButtonGroup>
          <InputGroup disabled>
            <InputGroupInput disabled name="message" placeholder="Record and send audio..." />
            <InputGroupAddon align="inline-end">
              <Tooltip defaultOpen>
                <TooltipTrigger ariaLabel="Voice Mode" class="radcn-input-group-button radcn-input-group-button--icon-xs" style="background: var(--radcn-muted); color: var(--radcn-foreground);">≋</TooltipTrigger>
                <TooltipPortal><TooltipContent>Voice Mode</TooltipContent></TooltipPortal>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </ButtonGroup>
      </ButtonGroup>
    )
  }

  if (fixture.id === 'nested') {
    return (
      <ButtonGroup ariaLabel="Pagination controls" class="radcn-button-group--clustered">
        <ButtonGroup>
          <Button size="sm" variant="outline">1</Button>
          <Button size="sm" variant="outline">2</Button>
          <Button size="sm" variant="outline">3</Button>
          <Button size="sm" variant="outline">4</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button ariaLabel="Previous" size="icon-sm" variant="outline">←</Button>
          <Button ariaLabel="Next" size="icon-sm" variant="outline">→</Button>
        </ButtonGroup>
      </ButtonGroup>
    )
  }

  if (fixture.id === 'orientation') {
    return (
      <ButtonGroup ariaLabel="Media controls" orientation="vertical">
        <Button ariaLabel="Increase" size="icon" variant="outline">+</Button>
        <Button ariaLabel="Decrease" size="icon" variant="outline">−</Button>
      </ButtonGroup>
    )
  }

  if (fixture.id === 'popover') {
    return (
      <ButtonGroup>
        <Button variant="outline">Copilot</Button>
        <Popover defaultOpen>
          <PopoverTrigger ariaLabel="Open Popover" class="radcn-button radcn-button--outline radcn-button--icon">⌄</PopoverTrigger>
          <PopoverPortal>
            <PopoverContent align="end">
              <PopoverTitle>Agent Tasks</PopoverTitle>
              <Separator />
              <Textarea name="task" placeholder="Describe your task in natural language." value="Review the ButtonGroup examples." />
              <PopoverDescription>Start a new task with Copilot using app-owned state.</PopoverDescription>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </ButtonGroup>
    )
  }

  if (fixture.id === 'select') {
    return (
      <ButtonGroup>
        <ButtonGroup>
          {CurrencySelect()}
          <Input id="candidate-button-group-amount" name="amount" placeholder="10.00" value="10.00" />
        </ButtonGroup>
        <ButtonGroup>
          <Button ariaLabel="Send" size="icon" variant="outline">→</Button>
        </ButtonGroup>
      </ButtonGroup>
    )
  }

  if (fixture.id === 'separator') {
    return (
      <ButtonGroup>
        <Button size="sm" variant="secondary">Copy</Button>
        <ButtonGroupSeparator />
        <Button size="sm" variant="secondary">Paste</Button>
      </ButtonGroup>
    )
  }

  if (fixture.id === 'size') {
    return (
      <div style="display:grid;gap:18px">
        <ButtonGroup>
          <Button size="sm" variant="outline">Small</Button>
          <Button size="sm" variant="outline">Button</Button>
          <Button ariaLabel="Add small" size="icon-sm" variant="outline">+</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Default</Button>
          <Button variant="outline">Button</Button>
          <Button ariaLabel="Add default" size="icon" variant="outline">+</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="lg" variant="outline">Large</Button>
          <Button size="lg" variant="outline">Button</Button>
          <Button ariaLabel="Add large" size="icon-lg" variant="outline">+</Button>
        </ButtonGroup>
      </div>
    )
  }

  if (fixture.id === 'split') {
    return (
      <ButtonGroup>
        <Button variant="secondary">Button</Button>
        <ButtonGroupSeparator />
        <Button ariaLabel="Add" size="icon" variant="secondary">+</Button>
      </ButtonGroup>
    )
  }

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
  if (fixture.id === 'table') {
    return (
      <article style="max-width:640px">
        <TypographyH2>Release status</TypographyH2>
        <TypographyP>Use RadCN table primitives when prose needs structured comparison.</TypographyP>
        <Table>
          <TableCaption>Typography table example.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Component</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Typography</TableCell>
              <TableCell>Covered</TableCell>
              <TableCell>Docs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Table</TableCell>
              <TableCell>Composed</TableCell>
              <TableCell>Package</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </article>
    )
  }

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
