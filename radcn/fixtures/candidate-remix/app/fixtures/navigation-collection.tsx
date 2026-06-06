import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
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

function SlashGlyph() {
  return <span aria-hidden="true" class="radcn-breadcrumb-glyph">/</span>
}

function ChevronGlyph() {
  return <span aria-hidden="true" class="radcn-breadcrumb-glyph">⌄</span>
}

function BreadcrumbDropdownMenu({ label, trigger }: { label?: string; trigger: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger ariaLabel={label} class="radcn-breadcrumb-trigger">
        {trigger === 'ellipsis' ? <BreadcrumbEllipsis /> : <>{trigger}{ChevronGlyph()}</>}
        {trigger === 'ellipsis' ? <span class="radcn-sr-only">Toggle menu</span> : undefined}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Documentation</DropdownMenuItem>
          <DropdownMenuItem>Themes</DropdownMenuItem>
          <DropdownMenuItem>GitHub</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

function renderBreadcrumbLinkExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function renderBreadcrumbEllipsisExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="/docs/components">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function renderBreadcrumbSeparatorExample(customClass = false) {
  return (
    <Breadcrumb class={customClass ? 'radcn-fixture-custom-breadcrumb' : undefined}>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator>{SlashGlyph()}</BreadcrumbSeparator>
        <BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator>{SlashGlyph()}</BreadcrumbSeparator>
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function renderBreadcrumbDemoExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>{BreadcrumbDropdownMenu({ label: 'Toggle menu', trigger: 'ellipsis' })}</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="/docs/components">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function renderBreadcrumbDropdownExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator>{SlashGlyph()}</BreadcrumbSeparator>
        <BreadcrumbItem>{BreadcrumbDropdownMenu({ trigger: 'Components' })}</BreadcrumbItem>
        <BreadcrumbSeparator>{SlashGlyph()}</BreadcrumbSeparator>
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function renderResponsiveBreadcrumbExample() {
  let hiddenItems = (
    <>
      <a class="radcn-breadcrumb-link" href="#">Documentation</a>
      <a class="radcn-breadcrumb-link" href="#">Build Your Application</a>
    </>
  )

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <span class="radcn-breadcrumb-responsive-desktop">
            {BreadcrumbDropdownMenu({ label: 'Toggle menu', trigger: 'ellipsis' })}
          </span>
          <span class="radcn-breadcrumb-responsive-mobile">
            <Drawer>
              <DrawerTrigger ariaLabel="Toggle Menu" class="radcn-breadcrumb-trigger"><BreadcrumbEllipsis /></DrawerTrigger>
              <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Navigate to</DrawerTitle>
                    <DrawerDescription>Select a page to navigate to.</DrawerDescription>
                  </DrawerHeader>
                  <div class="radcn-breadcrumb-drawer-links">{hiddenItems}</div>
                  <DrawerFooter>
                    <DrawerClose class="radcn-button radcn-button--outline radcn-button--default">Close</DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </DrawerPortal>
            </Drawer>
          </span>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink class="radcn-breadcrumb-truncate" href="#">Data Fetching</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbPage class="radcn-breadcrumb-truncate">Caching and Revalidating</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function renderBreadcrumbFixture(fixture: FixtureScenario) {
  if (fixture.id === 'demo') return renderBreadcrumbDemoExample()
  if (fixture.id === 'dropdown') return renderBreadcrumbDropdownExample()
  if (fixture.id === 'ellipsis' || fixture.id === 'collapsed') return renderBreadcrumbEllipsisExample()
  if (fixture.id === 'link' || fixture.id === 'default') return renderBreadcrumbLinkExample()
  if (fixture.id === 'responsive') return renderResponsiveBreadcrumbExample()
  if (fixture.id === 'separator') return renderBreadcrumbSeparatorExample()
  if (fixture.id === 'custom-separator') return renderBreadcrumbSeparatorExample(true)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/fixtures">Fixtures</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="/fixtures/breadcrumb">Breadcrumb</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Default</BreadcrumbPage></BreadcrumbItem>
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

const itemImageDataUri = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 160 120%22%3E%3Crect width=%22160%22 height=%22120%22 fill=%22%230f172a%22/%3E%3Ccircle cx=%22116%22 cy=%2236%22 r=%2220%22 fill=%22%2322c55e%22/%3E%3Cpath d=%22M0 104 48 62 78 86 106 48 160 112v8H0z%22 fill=%22%23f8fafc%22/%3E%3C/svg%3E'

export function renderItemFixture(fixture: FixtureScenario) {
  if (fixture.id === 'avatar') {
    return (
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia>
            <Avatar>
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Ada Radley</ItemTitle>
            <ItemDescription>Design systems lead</ItemDescription>
          </ItemContent>
          <ItemActions><Button ariaLabel="Invite Ada Radley" size="icon-sm" variant="outline">+</Button></ItemActions>
        </Item>
        <Item variant="outline">
          <ItemMedia>
            <AvatarGroup ariaLabel="Review team">
              <Avatar size="sm"><AvatarFallback>RC</AvatarFallback></Avatar>
              <Avatar size="sm"><AvatarFallback>UI</AvatarFallback></Avatar>
              <AvatarGroupCount>+2</AvatarGroupCount>
            </AvatarGroup>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Review team</ItemTitle>
            <ItemDescription>Stacked avatars inside item media.</ItemDescription>
          </ItemContent>
          <ItemActions><Button size="sm" variant="outline">Invite</Button></ItemActions>
        </Item>
      </ItemGroup>
    )
  }

  if (fixture.id === 'demo') {
    return (
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">R</ItemMedia>
          <ItemContent>
            <ItemTitle>RadCN workspace</ItemTitle>
            <ItemDescription>Basic item with content and action.</ItemDescription>
          </ItemContent>
          <ItemActions><Button size="sm" variant="outline">Open</Button></ItemActions>
        </Item>
        <Item href="/fixtures/item/demo" size="sm" variant="outline">
          <ItemMedia variant="icon">OK</ItemMedia>
          <ItemContent>
            <ItemTitle>Verified profile</ItemTitle>
            <ItemDescription>Explicit href replaces slot-based links.</ItemDescription>
          </ItemContent>
          <ItemActions><span aria-hidden="true">&gt;</span></ItemActions>
        </Item>
      </ItemGroup>
    )
  }

  if (fixture.id === 'dropdown') {
    return (
      <DropdownMenu defaultOpen id="candidate-item-dropdown">
        <DropdownMenuTrigger ariaLabel="Open team menu" class="radcn-button radcn-button--outline radcn-button--default">Teams</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem textValue="RadCN Core">
                <Item size="sm">
                  <ItemMedia><Avatar size="sm"><AvatarFallback>RC</AvatarFallback></Avatar></ItemMedia>
                  <ItemContent>
                    <ItemTitle>RadCN Core</ItemTitle>
                    <ItemDescription>Package parity work.</ItemDescription>
                  </ItemContent>
                </Item>
              </DropdownMenuItem>
              <DropdownMenuItem textValue="Docs Studio">
                <Item size="sm">
                  <ItemMedia><Avatar size="sm"><AvatarFallback>DS</AvatarFallback></Avatar></ItemMedia>
                  <ItemContent>
                    <ItemTitle>Docs Studio</ItemTitle>
                    <ItemDescription>Example coverage.</ItemDescription>
                  </ItemContent>
                </Item>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    )
  }

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

  if (fixture.id === 'group') {
    return (
      <ItemGroup>
        <Item>
          <ItemMedia><Avatar><AvatarFallback>AL</AvatarFallback></Avatar></ItemMedia>
          <ItemContent>
            <ItemTitle>Alex Lee</ItemTitle>
            <ItemDescription>Owns accessible fixtures.</ItemDescription>
          </ItemContent>
          <ItemActions><Button ariaLabel="Message Alex Lee" size="icon-sm" variant="outline">M</Button></ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia><Avatar><AvatarFallback>MJ</AvatarFallback></Avatar></ItemMedia>
          <ItemContent>
            <ItemTitle>Mira Jones</ItemTitle>
            <ItemDescription>Owns documentation examples.</ItemDescription>
          </ItemContent>
          <ItemActions><Button ariaLabel="Message Mira Jones" size="icon-sm" variant="outline">M</Button></ItemActions>
        </Item>
      </ItemGroup>
    )
  }

  if (fixture.id === 'header') {
    return (
      <div style="display: grid; width: min(100%, 38rem); grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem;">
        <Item variant="outline">
          <ItemHeader><img alt="RadCN terrain" src={itemImageDataUri} /></ItemHeader>
          <ItemContent>
            <ItemTitle>Image card</ItemTitle>
            <ItemDescription>Native static image in an item header.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemHeader><img alt="RadCN release" src={itemImageDataUri} /></ItemHeader>
          <ItemContent>
            <ItemTitle>Release note</ItemTitle>
            <ItemDescription>No Next Image dependency required.</ItemDescription>
          </ItemContent>
        </Item>
      </div>
    )
  }

  if (fixture.id === 'icon') {
    return (
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">!</ItemMedia>
          <ItemContent>
            <ItemTitle>Security alert</ItemTitle>
            <ItemDescription>Icon media composes with review actions.</ItemDescription>
          </ItemContent>
          <ItemActions><Button size="sm" variant="outline">Review</Button></ItemActions>
        </Item>
      </ItemGroup>
    )
  }

  if (fixture.id === 'image') {
    return (
      <ItemGroup>
        <Item href="/fixtures/item/image" variant="outline">
          <ItemMedia variant="image"><img alt="Track cover" src={itemImageDataUri} /></ItemMedia>
          <ItemContent>
            <ItemTitle>Neon server</ItemTitle>
            <ItemDescription>RadCN Ensemble</ItemDescription>
          </ItemContent>
          <ItemContent class="radcn-fixture-item-meta">
            <ItemTitle>3:42</ItemTitle>
            <ItemDescription>Duration</ItemDescription>
          </ItemContent>
        </Item>
        <Item href="/fixtures/item/image-b" variant="outline">
          <ItemMedia variant="image"><img alt="Second track cover" src={itemImageDataUri} /></ItemMedia>
          <ItemContent>
            <ItemTitle>Static routes</ItemTitle>
            <ItemDescription>Fixture Quartet</ItemDescription>
          </ItemContent>
          <ItemContent class="radcn-fixture-item-meta">
            <ItemTitle>4:08</ItemTitle>
            <ItemDescription>Duration</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    )
  }

  if (fixture.id === 'link') {
    return (
      <ItemGroup>
        <Item href="/fixtures/item/link" variant="outline">
          <ItemMedia variant="icon">IN</ItemMedia>
          <ItemContent>
            <ItemTitle>Visit docs</ItemTitle>
            <ItemDescription>Internal link-like item row.</ItemDescription>
          </ItemContent>
        </Item>
        <Item href="https://example.com/radcn" rel="noreferrer" target="_blank" variant="outline">
          <ItemMedia variant="icon">EX</ItemMedia>
          <ItemContent>
            <ItemTitle>External reference</ItemTitle>
            <ItemDescription>External anchor attributes stay native.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    )
  }

  if (fixture.id === 'size') {
    return (
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">D</ItemMedia>
          <ItemContent>
            <ItemTitle>Default size</ItemTitle>
            <ItemDescription>Default item spacing.</ItemDescription>
          </ItemContent>
        </Item>
        <Item size="sm" variant="outline">
          <ItemMedia variant="icon">S</ItemMedia>
          <ItemContent>
            <ItemTitle>Small size</ItemTitle>
            <ItemDescription>Compact item spacing.</ItemDescription>
          </ItemContent>
        </Item>
        <Item href="/fixtures/item/size" size="sm" variant="outline">
          <ItemMedia variant="icon">OK</ItemMedia>
          <ItemContent>
            <ItemTitle>Small link</ItemTitle>
            <ItemDescription>Small native link row.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    )
  }

  if (fixture.id === 'variant' || fixture.id === 'variants') {
    return (
      <ItemGroup>
        <Item>
          <ItemContent>
            <ItemTitle>Default item</ItemTitle>
            <ItemDescription>Default variant with action.</ItemDescription>
          </ItemContent>
          <ItemActions><Button size="sm" variant="outline">Open</Button></ItemActions>
        </Item>
        <Item variant="outline" size={fixture.id === 'variants' ? 'sm' : 'default'}>
          <ItemMedia variant="icon">A</ItemMedia>
          <ItemContent>
            <ItemTitle>Outline item</ItemTitle>
            <ItemDescription>Outline variant with action.</ItemDescription>
          </ItemContent>
          <ItemActions><Button size="sm" variant="outline">Open</Button></ItemActions>
        </Item>
        <Item variant="muted" size={fixture.id === 'variants' ? 'xs' : 'default'}>
          <ItemMedia variant="default">B</ItemMedia>
          <ItemContent>
            <ItemTitle>Muted item</ItemTitle>
            <ItemDescription>Muted variant with action.</ItemDescription>
          </ItemContent>
          <ItemActions><Button size="sm" variant="outline">Open</Button></ItemActions>
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
  let href = fixture.id === 'demo' ? '#' : '/fixtures/pagination/default'

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href={href} text={customLabels ? 'Back' : 'Previous'} /></PaginationItem>
        <PaginationItem><PaginationLink href={href}>1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href={href} isActive={activePage === '2'}>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href={href} isActive={activePage === '3'}>3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationNext href={href} text={customLabels ? 'Forward' : 'Next'} /></PaginationItem>
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
