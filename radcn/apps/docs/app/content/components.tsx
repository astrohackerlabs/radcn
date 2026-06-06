import type { RemixNode } from 'remix/ui'
import { css } from 'remix/ui'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'radcn/accordion'
import { Alert, AlertAction, AlertDescription, AlertTitle } from 'radcn/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'radcn/alert-dialog'
import { AspectRatio } from 'radcn/aspect-ratio'
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from 'radcn/avatar'
import { Badge } from 'radcn/badge'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'radcn/breadcrumb'
import { Button } from 'radcn/button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from 'radcn/button-group'
import {
  Calendar,
  CalendarCaption,
  CalendarDay,
  CalendarDayButton,
  CalendarGrid,
  CalendarMonth,
  CalendarNav,
  CalendarNext,
  CalendarPrevious,
  CalendarWeek,
  CalendarWeekdays,
} from 'radcn/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'radcn/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'radcn/carousel'
import {
  ChartBarSeries,
  ChartContainer,
  ChartLegend,
  ChartLegendItem,
  ChartLineSeries,
  ChartTooltip,
  ChartTooltipItem,
} from 'radcn/chart'
import { Checkbox } from 'radcn/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'radcn/collapsible'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPortal,
  ComboboxTrigger,
  ComboboxValue,
} from 'radcn/combobox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from 'radcn/command'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from 'radcn/context-menu'
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableColumnControls,
  DataTableContent,
  DataTableDetail,
  DataTableFilter,
  DataTableHeader,
  DataTableHeaderCell,
  DataTablePagination,
  DataTableRow,
  DataTableRowActions,
  DataTableSelectionSummary,
  DataTableToolbar,
} from 'radcn/data-table'
import { DatePicker } from 'radcn/date-picker'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from 'radcn/dialog'
import { DirectionProvider } from 'radcn/direction'
import {
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
} from 'radcn/drawer'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'radcn/dropdown-menu'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from 'radcn/empty'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from 'radcn/field'
import { Form, FormDescription, FormField, FormLabel, FormMessage, formControlAttributes, formFieldIds } from 'radcn/form'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'radcn/hover-card'
import { Input } from 'radcn/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from 'radcn/input-group'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, REGEXP_ONLY_DIGITS_AND_CHARS } from 'radcn/input-otp'
import {
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
} from 'radcn/item'
import { Kbd, KbdGroup } from 'radcn/kbd'
import { Label } from 'radcn/label'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from 'radcn/menubar'
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from 'radcn/native-select'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'radcn/navigation-menu'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'radcn/pagination'
import { Popover, PopoverContent, PopoverDescription, PopoverPortal, PopoverTitle, PopoverTrigger } from 'radcn/popover'
import { Progress } from 'radcn/progress'
import { RadioGroup, RadioGroupItem } from 'radcn/radio-group'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'radcn/resizable'
import { ScrollArea, ScrollAreaThumb, ScrollAreaViewport, ScrollBar } from 'radcn/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radcn/select'
import { Separator } from 'radcn/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'radcn/sheet'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from 'radcn/sidebar'
import { Skeleton } from 'radcn/skeleton'
import { Slider } from 'radcn/slider'
import { Toaster } from 'radcn/sonner'
import { Spinner } from 'radcn/spinner'
import { Switch } from 'radcn/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'radcn/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'radcn/table'
import { Textarea } from 'radcn/textarea'
import { createToastEvent } from 'radcn/toast'
import { Toggle } from 'radcn/toggle'
import { ToggleGroup, ToggleGroupItem } from 'radcn/toggle-group'
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from 'radcn/tooltip'
import {
  TypographyBlockquote,
  TypographyH2,
  TypographyInlineCode,
  TypographyLead,
  TypographyList,
  TypographyListItem,
  TypographyP,
} from 'radcn/typography'

export type ComponentStatus = 'ready' | 'draft'
export type ComponentKind = 'component' | 'helper' | 'recipe' | 'block'
export type ComponentDisposition =
  | 'ready'
  | 'draft'
  | 'recipe'
  | 'helper'
  | 'block'
  | 'not-shipped-yet'

export interface ComponentExample {
  slug: string
  title: string
  description: string
  source: string
  preview: RemixNode
}

export interface ComponentDoc {
  slug: string
  title: string
  category: string
  kind: ComponentKind
  disposition: ComponentDisposition
  status: ComponentStatus
  summary: string
  importPath: string
  importExample: string
  install: string
  examples: ComponentExample[]
  accessibility: string[]
  customization: string[]
  divergence: string[]
}

const previewStackStyle = css({
  display: 'grid',
  gap: '1rem',
  width: 'min(100%, 28rem)',
})

const previewRowStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.75rem',
})

const previewFieldStyle = css({
  display: 'grid',
  gap: '0.5rem',
  width: 'min(100%, 22rem)',
  '& label': {
    color: 'var(--radcn-foreground)',
    fontSize: '0.875rem',
    fontWeight: 600,
  },
  '& p': {
    margin: 0,
    color: 'var(--radcn-muted-foreground)',
    fontSize: '0.8125rem',
  },
})

const previewCardStyle = css({
  display: 'grid',
  gap: '0.75rem',
  width: 'min(100%, 28rem)',
  border: '1px solid var(--radcn-border)',
  borderRadius: 'var(--radcn-radius)',
  background: 'var(--radcn-card)',
  padding: '1rem',
  color: 'var(--radcn-card-foreground)',
  '& p': {
    margin: 0,
    color: 'var(--radcn-muted-foreground)',
    fontSize: '0.875rem',
  },
})

const forceVisiblePreviewStyle = css({
  '& [data-radcn-dialog]': {
    display: 'grid !important',
    gap: '0.75rem',
    width: 'min(100%, 28rem)',
  },
  '& [data-radcn-dialog-portal][hidden]': {
    inset: 'auto !important',
    position: 'static !important',
    zIndex: 'auto !important',
    width: '100%',
  },
  '& [data-radcn-dialog-content][hidden]': {
    color: 'var(--radcn-foreground) !important',
    left: 'auto !important',
    opacity: '1 !important',
    position: 'static !important',
    top: 'auto !important',
    transform: 'none !important',
    visibility: 'visible !important',
  },
  '& [data-radcn-tabs-content][hidden]': {
    display: 'grid !important',
  },
  '& [data-radcn-alert-dialog-content][hidden], & [data-radcn-drawer-content][hidden], & [data-radcn-sheet-content][hidden], & [data-radcn-popover-content][hidden], & [data-radcn-hover-card-content][hidden], & [data-radcn-tooltip-content][hidden], & [data-radcn-dropdown-menu-content][hidden], & [data-radcn-dropdown-menu-sub-content][hidden], & [data-radcn-context-menu-content][hidden], & [data-radcn-menubar-content][hidden], & [data-radcn-select-content][hidden], & [data-radcn-combobox-content][hidden], & [data-radcn-navigation-menu-content][hidden]': {
    color: 'var(--radcn-foreground) !important',
    display: 'grid !important',
    left: 'auto !important',
    maxWidth: '100%',
    opacity: '1 !important',
    position: 'static !important',
    top: 'auto !important',
    transform: 'none !important',
    visibility: 'visible !important',
    width: 'min(100%, 28rem)',
  },
})

const previewMediaStyle = css({
  display: 'grid',
  minHeight: '8rem',
  placeItems: 'center',
  width: '100%',
  borderRadius: 'calc(var(--radcn-radius) - 2px)',
  background:
    'linear-gradient(135deg, color-mix(in oklab, var(--radcn-primary) 18%, transparent), color-mix(in oklab, var(--radcn-accent) 34%, transparent))',
  color: 'var(--radcn-foreground)',
  fontWeight: 800,
})

const previewConstrainedStyle = css({
  width: 'min(100%, 34rem)',
  minWidth: 0,
})

const draftPreviewStyle = css({
  display: 'grid',
  gap: '0.75rem',
  width: 'min(100%, 32rem)',
  border: '1px dashed var(--radcn-border)',
  borderRadius: 'var(--radcn-radius)',
  background: 'var(--radcn-card)',
  color: 'var(--radcn-card-foreground)',
  padding: '1rem',
  '& p': {
    margin: 0,
    color: 'var(--radcn-muted-foreground)',
    fontSize: '0.875rem',
  },
  '& code': {
    color: 'var(--radcn-foreground)',
    fontFamily: 'var(--docs-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)',
    fontSize: '0.8125rem',
  },
})

const buttonSource = `import { Button } from 'radcn/button'
import { Spinner } from 'radcn/spinner'

export function ButtonPreview() {
  return (
    <div class="button-preview">
      <Button>Deploy site</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="outline">View docs</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Link</Button>
      <Button href="/docs/components/button">Href Button</Button>
      <Button size="sm" variant="outline">
        <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
        New Branch
      </Button>
      <Button disabled size="sm" variant="outline">
        <Spinner ariaLabel="Submitting" />
        Submit
      </Button>
      <Button ariaLabel="Submit" size="icon" variant="outline">
        <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </Button>
      <Button ariaLabel="Upload" class="radcn-fixture-rounded-button" size="icon" variant="outline">
        <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button ariaLabel="Submit small" size="icon-sm" variant="outline">^</Button>
      <Button ariaLabel="Submit large" size="icon-lg" variant="outline">^</Button>
    </div>
  )
}`

const buttonGroupSource = `import { Button } from 'radcn/button'
import { ButtonGroup, ButtonGroupSeparator } from 'radcn/button-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'radcn/dropdown-menu'
import { Input } from 'radcn/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'radcn/select'

export function ButtonGroupPreview() {
  return (
    <div class="button-group-preview">
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
          <DropdownMenu>
            <DropdownMenuTrigger ariaLabel="More options">•••</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Mark as Read</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </ButtonGroup>

      <ButtonGroup>
        <Input name="search" placeholder="Search..." />
        <Button ariaLabel="Search" variant="outline">⌕</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Select defaultValue="usd" name="currency">
          <SelectTrigger ariaLabel="Currency"><SelectValue>USD</SelectValue></SelectTrigger>
          <SelectContent><SelectItem value="usd">USD</SelectItem></SelectContent>
        </Select>
        <Input name="amount" value="10.00" />
        <Button ariaLabel="Send" size="icon" variant="outline">→</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="secondary">Button</Button>
        <ButtonGroupSeparator />
        <Button ariaLabel="Add" size="icon" variant="secondary">+</Button>
      </ButtonGroup>
    </div>
  )
}`

const inputGroupSource = `import { ButtonGroup, ButtonGroupText } from 'radcn/button-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'radcn/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from 'radcn/input-group'
import { Label } from 'radcn/label'
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from 'radcn/popover'
import { Separator } from 'radcn/separator'
import { Spinner } from 'radcn/spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from 'radcn/tooltip'

export function InputGroupPreview() {
  return (
    <div class="input-group-preview">
      <InputGroup ariaLabel="Repository URL">
        <InputGroupInput name="clone" readOnly value="git@github.com:radcn/radcn.git" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton ariaLabel="Copy URL" size="icon-xs">⧉</InputGroupButton>
          <Popover>
            <PopoverTrigger ariaLabel="Explain URL">?</PopoverTrigger>
            <PopoverContent>
              <PopoverTitle>Clone URL</PopoverTitle>
              <PopoverDescription>Copy behavior is app-owned enhancement.</PopoverDescription>
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>

      <ButtonGroup ariaLabel="Workspace URL">
        <ButtonGroupText><Label for="workspace">https://</Label></ButtonGroupText>
        <InputGroup ariaLabel="Workspace">
          <InputGroupInput id="workspace" name="workspace" value="radcn" />
          <InputGroupAddon align="inline-end"><InputGroupText>✓</InputGroupText></InputGroupAddon>
        </InputGroup>
        <ButtonGroupText>.dev</ButtonGroupText>
      </ButtonGroup>

      <InputGroup ariaLabel="Command message">
        <InputGroupTextarea name="message" rows={4} value="Ship InputGroup parity." />
        <InputGroupAddon align="block-end">
          <DropdownMenu>
            <DropdownMenuTrigger>Commands</DropdownMenuTrigger>
            <DropdownMenuContent><DropdownMenuItem>Insert snippet</DropdownMenuItem></DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" />
          <InputGroupText>63%</InputGroupText>
          <InputGroupButton disabled>Send</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup disabled ariaLabel="Saving workspace">
        <InputGroupAddon><Spinner ariaLabel="Saving" /></InputGroupAddon>
        <InputGroupInput disabled name="workspace-status" value="radcn" />
        <InputGroupAddon align="inline-end"><InputGroupText>Saving...</InputGroupText></InputGroupAddon>
      </InputGroup>

      <InputGroup ariaLabel="Password">
        <InputGroupInput name="password" type="password" value="radical-secret" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger ariaLabel="Password requirements">?</TooltipTrigger>
            <TooltipContent>Use at least twelve characters.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}`

const itemSource = `import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from 'radcn/avatar'
import { Button } from 'radcn/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'radcn/dropdown-menu'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from 'radcn/item'

export function ItemPreview() {
  return (
    <ItemGroup>
      <Item variant="outline">
        <ItemMedia><Avatar><AvatarFallback>AR</AvatarFallback></Avatar></ItemMedia>
        <ItemContent>
          <ItemTitle>Ada Radley</ItemTitle>
          <ItemDescription>Avatar media inside an Item row.</ItemDescription>
        </ItemContent>
        <ItemActions><Button ariaLabel="Invite Ada Radley" size="icon-sm">+</Button></ItemActions>
      </Item>

      <Item href="/docs/components/item" size="sm" variant="outline">
        <ItemMedia variant="icon">OK</ItemMedia>
        <ItemContent>
          <ItemTitle>Verified profile</ItemTitle>
          <ItemDescription>RadCN uses href instead of shadcn asChild.</ItemDescription>
        </ItemContent>
      </Item>

      <ItemSeparator />

      <Item href="https://example.com/radcn" rel="noreferrer" target="_blank" variant="muted">
        <ItemMedia variant="image"><img alt="RadCN mark" src="/images/radcn-1-96.webp" /></ItemMedia>
        <ItemContent>
          <ItemTitle>External reference</ItemTitle>
          <ItemDescription>Native anchors keep external attributes.</ItemDescription>
        </ItemContent>
        <ItemContent><ItemTitle>4:08</ItemTitle><ItemDescription>Duration</ItemDescription></ItemContent>
      </Item>

      <Item variant="outline">
        <ItemHeader><img alt="RadCN robot" src="/images/radcn-1-300.webp" /></ItemHeader>
        <ItemContent><ItemTitle>Header image card</ItemTitle></ItemContent>
        <ItemFooter><span>Local WebP asset</span></ItemFooter>
      </Item>

      <Item variant="outline">
        <ItemMedia>
          <AvatarGroup ariaLabel="Review team">
            <Avatar size="sm"><AvatarFallback>RC</AvatarFallback></Avatar>
            <Avatar size="sm"><AvatarFallback>UI</AvatarFallback></Avatar>
            <AvatarGroupCount>+2</AvatarGroupCount>
          </AvatarGroup>
        </ItemMedia>
        <ItemContent><ItemTitle>Grouped reviewers</ItemTitle></ItemContent>
      </Item>

      <DropdownMenu>
        <DropdownMenuTrigger>Teams</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Item size="sm"><ItemContent><ItemTitle>RadCN Core</ItemTitle></ItemContent></Item>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ItemGroup>
  )
}`

const badgeSource = `import { Badge } from 'radcn/badge'

export function BadgePreview() {
  return (
    <div class="badge-preview">
      <div data-radcn-docs-badge-family="badge-demo">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>

        <Badge
          class="verified-badge"
          style="background:#2563eb;color:white"
          variant="secondary"
        >
          <span aria-hidden="true">✓</span>
          Verified
        </Badge>
        <Badge class="count-badge">8</Badge>
        <Badge class="count-badge" variant="destructive">99</Badge>
        <Badge class="count-badge" variant="outline">20+</Badge>
      </div>

      <Badge data-radcn-docs-badge-family="badge-destructive" variant="destructive">
        Destructive
      </Badge>
      <Badge data-radcn-docs-badge-family="badge-outline" variant="outline">
        Outline
      </Badge>
      <Badge data-radcn-docs-badge-family="badge-secondary" variant="secondary">
        Secondary
      </Badge>
    </div>
  )
}`

const comboboxSource = `import { Button } from 'radcn/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPortal,
  ComboboxTrigger,
} from 'radcn/combobox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'radcn/command'
import { Drawer, DrawerContent, DrawerPortal, DrawerTrigger } from 'radcn/drawer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from 'radcn/dropdown-menu'
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from 'radcn/popover'

export function ComboboxPreview() {
  return (
    <div class="combobox-examples">
      <div data-radcn-docs-combobox-family="combobox-demo">
        <Combobox defaultValue="remix" name="framework">
          <div class="radcn-combobox-control">
            <ComboboxInput ariaLabel="Framework" placeholder="Search framework..." />
            <ComboboxTrigger>v</ComboboxTrigger>
          </div>
          <ComboboxPortal>
            <ComboboxContent>
              <ComboboxList>
                <ComboboxGroup>
                  <ComboboxItem value="next.js">Next.js</ComboboxItem>
                  <ComboboxItem value="sveltekit">SvelteKit</ComboboxItem>
                  <ComboboxItem value="nuxt.js">Nuxt.js</ComboboxItem>
                  <ComboboxItem value="remix">Remix</ComboboxItem>
                  <ComboboxItem value="astro">Astro</ComboboxItem>
                </ComboboxGroup>
                <ComboboxEmpty>No framework found.</ComboboxEmpty>
              </ComboboxList>
            </ComboboxContent>
          </ComboboxPortal>
        </Combobox>
      </div>

      <div data-radcn-docs-combobox-family="combobox-dropdown-menu">
        <span data-radcn-docs-combobox-label>feature</span>
        <span>Create a new project</span>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger ariaLabel="Project actions">...</DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Assign to...</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Apply label</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <Command>
                    <CommandInput placeholder="Filter label..." />
                    <CommandList>
                      <CommandEmpty>No label found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem value="feature">feature</CommandItem>
                        <CommandItem value="bug">bug</CommandItem>
                        <CommandItem value="design">design</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>

      <div data-radcn-docs-combobox-family="combobox-popover">
        <span>Status</span>
        <Popover defaultOpen>
          <PopoverTrigger class="radcn-button radcn-button--outline">+ Set status</PopoverTrigger>
          <PopoverPortal>
            <PopoverContent align="start" side="right">
              <Command>
                <CommandInput placeholder="Change status..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem value="backlog">Backlog</CommandItem>
                    <CommandItem value="todo">Todo</CommandItem>
                    <CommandItem value="done">Done</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </div>

      <div data-radcn-docs-combobox-family="combobox-responsive">
        <div class="combobox-responsive-desktop">
          <Popover defaultOpen>
            <PopoverTrigger class="radcn-button radcn-button--outline">Desktop status</PopoverTrigger>
            <PopoverPortal><PopoverContent><Command><CommandInput placeholder="Filter status..." /></Command></PopoverContent></PopoverPortal>
          </Popover>
        </div>
        <div class="combobox-responsive-mobile">
          <Drawer defaultOpen>
            <DrawerTrigger>Mobile status</DrawerTrigger>
            <DrawerPortal><DrawerContent><Command><CommandInput placeholder="Filter status..." /></Command></DrawerContent></DrawerPortal>
          </Drawer>
        </div>
      </div>
    </div>
  )
}`

const inputSource = `import { Button } from 'radcn/button'
import { Input } from 'radcn/input'
import { Label } from 'radcn/label'

export function InputPreview() {
  return (
    <div class="input-examples">
      <Input type="email" placeholder="Email" />

      <Input disabled type="email" placeholder="Email" />

      <div class="field">
        <Label for="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>

      <form class="row" action="/subscribe" method="post">
        <Input name="email" type="email" placeholder="Email" />
        <Button type="submit" variant="outline">Subscribe</Button>
      </form>

      <div class="field">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="Email" />
      </div>

      <div class="field">
        <Label for="described-email">Email</Label>
        <Input
          ariaDescribedBy="email-help"
          id="described-email"
          type="email"
          placeholder="Email"
        />
        <p id="email-help">Enter your workspace email address.</p>
      </div>
    </div>
  )
}`

const fieldSource = `import { Button } from 'radcn/button'
import { Checkbox } from 'radcn/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from 'radcn/field'
import { Input } from 'radcn/input'
import { RadioGroup, RadioGroupItem } from 'radcn/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'radcn/select'
import { Slider } from 'radcn/slider'
import { Switch } from 'radcn/switch'
import { Textarea } from 'radcn/textarea'

export function FieldPreview() {
  return (
    <form action="/checkout" method="post">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Workspace</FieldLegend>
          <FieldDescription>Field owns reusable layout; form owns submission.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel for="workspace">Workspace name</FieldLabel>
              <Input id="workspace" name="workspace" value="RadCN" />
            </Field>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel for="notes">Launch notes</FieldLabel>
                <FieldDescription>Responsive fields collapse on small screens.</FieldDescription>
              </FieldContent>
              <Textarea id="notes" name="notes" value="Ship web-first components." />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Controls</FieldLegend>
          <Field>
            <FieldLabel for="payment">Payment method</FieldLabel>
            <Select defaultValue="card" id="payment" name="payment">
              <SelectTrigger ariaLabel="Payment method"><SelectValue>Card</SelectValue></SelectTrigger>
              <SelectContent><SelectItem value="card">Card</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field orientation="horizontal">
            <Switch checked id="alerts" name="alerts" />
            <FieldContent>
              <FieldLabel for="alerts">Security alerts</FieldLabel>
              <FieldDescription>Horizontal rows keep label copy beside the control.</FieldDescription>
            </FieldContent>
          </Field>
          <Field>
            <FieldTitle>Budget range</FieldTitle>
            <FieldDescription>Use native range controls and server defaults.</FieldDescription>
            <Slider ariaLabel="Budget minimum" defaultValue={200} name="budget_min" />
          </Field>
        </FieldSet>

        <RadioGroup name="plan">
          <Field class="radcn-field--choice-card" orientation="horizontal">
            <RadioGroupItem checked id="plan-pro" name="plan" value="pro" />
            <FieldContent>
              <FieldLabel for="plan-pro"><FieldTitle>Pro</FieldTitle></FieldLabel>
              <FieldDescription>Card-like choices are composition, not a separate component.</FieldDescription>
            </FieldContent>
          </Field>
        </RadioGroup>

        <Field orientation="horizontal">
          <Checkbox checked id="save" name="save" value="yes" />
          <FieldContent>
            <FieldLabel for="save">Save as template</FieldLabel>
            <FieldDescription>Checkbox rows use the same FieldContent pattern.</FieldDescription>
          </FieldContent>
        </Field>

        <Button type="submit">Save workspace</Button>
      </FieldGroup>
    </form>
  )
}`

const formSource = `import { Button } from 'radcn/button'
import { Form, FormDescription, FormField, FormLabel, FormMessage, formControlAttributes, formFieldIds } from 'radcn/form'
import { Input } from 'radcn/input'

export function FormPreview() {
  let email = formFieldIds('signup-email')
  let control = formControlAttributes(email, { invalid: true, message: true })

  return (
    <Form action="/signup" method="post">
      <FormField invalid name="email">
        <FormLabel error for={control.id}>Email</FormLabel>
        <Input
          ariaDescribedBy={control.ariaDescribedBy}
          ariaInvalid={control.ariaInvalid}
          id={control.id}
          name="email"
          placeholder="name@example.com"
          required
          value="radcn"
        />
        <FormDescription id={email.descriptionId}>
          Use the email address for your workspace.
        </FormDescription>
        <FormMessage id={email.messageId}>Enter a valid email address.</FormMessage>
      </FormField>
      <Button type="submit">Create workspace</Button>
    </Form>
  )
}`

const formControlsSource = `import { Button } from 'radcn/button'
import { Checkbox } from 'radcn/checkbox'
import { Form, FormDescription, FormField, FormLabel } from 'radcn/form'
import { RadioGroup, RadioGroupItem } from 'radcn/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'radcn/select'
import { Switch } from 'radcn/switch'
import { Textarea } from 'radcn/textarea'

export function FormControlsPreview() {
  return (
    <Form action="/settings" method="post">
      <FormField name="language">
        <FormLabel>Language</FormLabel>
        <Select name="language" value="typescript">
          <SelectTrigger ariaLabel="Language"><SelectValue>TypeScript</SelectValue></SelectTrigger>
          <SelectContent><SelectItem value="typescript">TypeScript</SelectItem></SelectContent>
        </Select>
      </FormField>
      <FormField name="plan">
        <FormLabel>Plan</FormLabel>
        <RadioGroup name="plan">
          <label><RadioGroupItem checked name="plan" value="pro" /> Pro</label>
        </RadioGroup>
      </FormField>
      <FormField name="notifications">
        <FormLabel>Notifications</FormLabel>
        <label><Checkbox checked name="notifications" value="deploys" /> Deploys</label>
        <label><Switch checked name="security" value="enabled" /> Security alerts</label>
      </FormField>
      <FormField name="about">
        <FormLabel>About</FormLabel>
        <Textarea name="about" value="Server-rendered form controls." />
        <FormDescription>Controls stay native and app-owned.</FormDescription>
      </FormField>
      <Button type="submit">Save settings</Button>
    </Form>
  )
}`

const formComplexSource = `import { Button } from 'radcn/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'radcn/card'
import { Form, FormDescription, FormField, FormLabel, FormMessage } from 'radcn/form'
import { Input } from 'radcn/input'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from 'radcn/input-group'
import { Progress } from 'radcn/progress'

export function FormComplexPreview() {
  return (
    <Form action="/workspace" method="post">
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Arrays, password strength, and complex sections are app-owned.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField name="emails">
            <FormLabel>Team emails</FormLabel>
            <Input name="emails" value="ada@example.com" />
            <Input name="emails" value="grace@example.com" />
            <FormDescription>Repeated fields submit as repeated native values.</FormDescription>
          </FormField>
          <FormField invalid name="password">
            <FormLabel error>Password</FormLabel>
            <InputGroup invalid>
              <InputGroupInput name="password" value="radcn" />
              <InputGroupAddon align="inline-end"><InputGroupText>Weak</InputGroupText></InputGroupAddon>
            </InputGroup>
            <Progress ariaLabel="Password strength" value={38} />
            <FormMessage>Add a number and a symbol.</FormMessage>
          </FormField>
        </CardContent>
      </Card>
      <Button type="submit">Save workspace</Button>
    </Form>
  )
}`

const datePickerSource = `import { DatePicker } from 'radcn/date-picker'

export function DatePickerExamples() {
  return (
    <>
      <DatePicker defaultOpen month="2026-06-01" name="date" />

      <DatePicker
        defaultOpen
        month="2026-06-01"
        name="preset_date"
        presets={[
          { label: 'Today', value: '2026-06-12' },
          { label: 'Tomorrow', value: '2026-06-13' },
          { label: 'In 3 days', value: '2026-06-15' },
          { label: 'In a week', value: '2026-06-19' },
        ]}
      />

      <DatePicker
        defaultOpen
        defaultValue="2026-06-12..2026-06-18"
        mode="range"
        month="2026-06-01"
        name="range"
        numberOfMonths={2}
      />
    </>
  )
}`

const dataTableSource = `import { Badge } from 'radcn/badge'
import { Button } from 'radcn/button'
import { Checkbox } from 'radcn/checkbox'
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableColumnControls,
  DataTableContent,
  DataTableFilter,
  DataTableHeader,
  DataTableHeaderCell,
  DataTablePagination,
  DataTableRow,
  DataTableRowActions,
  DataTableSelectionSummary,
  DataTableToolbar,
} from 'radcn/data-table'
import { Input } from 'radcn/input'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from 'radcn/pagination'

export function DataTablePreview() {
  return (
    <DataTable caption="Payments" rowCount={3} selectedCount={1}>
      <form action="/payments" method="get">
        <DataTableToolbar>
          <DataTableFilter label="Filter emails">
            <Input name="email" value="ada" />
          </DataTableFilter>
          <DataTableColumnControls>
            <Button variant="outline">Columns</Button>
          </DataTableColumnControls>
        </DataTableToolbar>
      </form>
      <DataTableContent caption="Recent payments" dense>
        <DataTableHeader>
          <DataTableRow>
            <DataTableHeaderCell>Select</DataTableHeaderCell>
            <DataTableHeaderCell ariaSort="ascending" href="/payments?sort=email">Email</DataTableHeaderCell>
            <DataTableHeaderCell>Status</DataTableHeaderCell>
            <DataTableHeaderCell>Amount</DataTableHeaderCell>
          </DataTableRow>
        </DataTableHeader>
        <DataTableBody>
          <DataTableRow selected>
            <DataTableCell><Checkbox checked name="rows" value="pay-1" /></DataTableCell>
            <DataTableCell>ada@example.com</DataTableCell>
            <DataTableCell><Badge variant="secondary">Success</Badge></DataTableCell>
            <DataTableCell>$316.00</DataTableCell>
          </DataTableRow>
        </DataTableBody>
      </DataTableContent>
      <DataTablePagination page={1} pageCount={2}>
        <DataTableSelectionSummary rowCount={3} selectedCount={1} />
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationLink href="/payments?page=1" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="/payments?page=2">2</PaginationLink></PaginationItem>
          </PaginationContent>
        </Pagination>
      </DataTablePagination>
      <DataTableRowActions>
        <Button variant="outline">Open row</Button>
        <Button variant="ghost">Duplicate</Button>
      </DataTableRowActions>
    </DataTable>
  )
}`

const dialogSource = `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from 'radcn/dialog'

export function DialogPreview() {
  return (
    <Dialog defaultOpen id="docs-dialog-preview">
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogPortal>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Publish component docs?</DialogTitle>
            <DialogDescription>
              This server-rendered dialog markup is ready for RadCN enhancement.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <button type="button">Publish</button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}`

const tabsSource = `import { Tabs, TabsContent, TabsList, TabsTrigger } from 'radcn/tabs'

export function TabsPreview() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Real RadCN components render in the docs.</TabsContent>
      <TabsContent value="code">Source snippets stay beside the live example.</TabsContent>
    </Tabs>
  )
}`

const sonnerSource = `import { Toaster } from 'radcn/sonner'

export function SonnerPreview() {
  return (
    <Toaster
      position="bottom-right"
      toasts={[
        {
          description: 'The docs preview renders a package toast.',
          title: 'Build complete',
          type: 'success',
        },
      ]}
    />
  )
}`

const toastSource = `import { Button } from 'radcn/button'
import { Toaster } from 'radcn/sonner'
import { createToastEvent, toast } from 'radcn/toast'

export function ToastPreview() {
  return (
    <div class="toast-examples">
      <span
        data-radcn-toast-trigger
        data-toast-action-label="Undo"
        data-toast-action-url="#undo"
        data-toast-description="Friday, February 10, 2023 at 5:57 PM"
        data-toast-title="Scheduled: Catch up"
      >
        <Button>Add to calendar</Button>
      </span>

      <span
        data-radcn-toast-trigger
        data-toast-action-label="Try again"
        data-toast-action-url="#try-again"
        data-toast-description="There was a problem with your request."
        data-toast-title="Uh oh! Something went wrong."
        data-toast-type="error"
      >
        <Button>Show Toast</Button>
      </span>

      <span
        data-radcn-toast-trigger
        data-toast-description="Your message has been sent."
      >
        <Button>Show Toast</Button>
      </span>

      <Toaster defaultDuration={0} />
    </div>
  )
}

export function dispatchToast() {
  toast({
    actionLabel: 'Try again',
    actionUrl: '#try-again',
    description: 'There was a problem with your request.',
    title: 'Uh oh! Something went wrong.',
    type: 'error',
  })

  window.dispatchEvent(createToastEvent({
    description: 'Your message has been sent.',
  }))
}`

const breadcrumbSource = `import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'radcn/breadcrumb'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from 'radcn/drawer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from 'radcn/dropdown-menu'

function SlashGlyph() {
  return <span aria-hidden="true" class="radcn-breadcrumb-glyph">/</span>
}

function ChevronGlyph() {
  return <span aria-hidden="true" class="radcn-breadcrumb-glyph">⌄</span>
}

export function BreadcrumbPreview() {
  return (
    <div class="breadcrumb-preview">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator><SlashGlyph /></BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger class="radcn-breadcrumb-trigger">Components<ChevronGlyph /></DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Documentation</DropdownMenuItem>
                  <DropdownMenuItem>Themes</DropdownMenuItem>
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator><SlashGlyph /></BreadcrumbSeparator>
          <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span class="radcn-breadcrumb-responsive-desktop">
              <DropdownMenu>
                <DropdownMenuTrigger ariaLabel="Toggle menu" class="radcn-breadcrumb-trigger"><BreadcrumbEllipsis /></DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Build Your Application</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
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
                    <div class="radcn-breadcrumb-drawer-links">
                      <a class="radcn-breadcrumb-link" href="#">Documentation</a>
                      <a class="radcn-breadcrumb-link" href="#">Build Your Application</a>
                    </div>
                    <DrawerFooter>
                      <DrawerClose class="radcn-button radcn-button--outline radcn-button--default">Close</DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </DrawerPortal>
              </Drawer>
            </span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink class="radcn-breadcrumb-truncate" href="#">Data Fetching</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>
          <BreadcrumbItem><BreadcrumbPage class="radcn-breadcrumb-truncate">Caching and Revalidating</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}`

const emptySource = `import { Avatar, AvatarFallback, AvatarGroup } from 'radcn/avatar'
import { Button } from 'radcn/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from 'radcn/empty'
import { InputGroup, InputGroupAddon, InputGroupInput } from 'radcn/input-group'
import { Kbd } from 'radcn/kbd'

export function EmptyPreview() {
  return (
    <div class="empty-preview">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">+</EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>Create a project or import an existing workspace.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">Create Project</Button>
          <Button size="sm" variant="outline">Import Project</Button>
          <Button href="/docs/components/empty" size="sm" variant="link">Learn More</Button>
        </EmptyContent>
      </Empty>

      <Empty>
        <EmptyMedia><Avatar><AvatarFallback>RC</AvatarFallback></Avatar></EmptyMedia>
        <EmptyHeader><EmptyTitle>User offline</EmptyTitle></EmptyHeader>
      </Empty>

      <Empty>
        <EmptyMedia><AvatarGroup><Avatar><AvatarFallback>AD</AvatarFallback></Avatar></AvatarGroup></EmptyMedia>
        <EmptyHeader><EmptyTitle>Invite your team</EmptyTitle></EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">?</EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>Search docs or contact support.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup ariaLabel="Search docs"><InputGroupInput name="q" placeholder="Search documentation" /><InputGroupAddon align="inline-end"><Kbd>/</Kbd></InputGroupAddon></InputGroup>
        </EmptyContent>
      </Empty>
    </div>
  )
}`

const toggleGroupSource = `import { ToggleGroup, ToggleGroupItem } from 'radcn/toggle-group'

function Icon({ label }: { label: string }) {
  return <span aria-hidden="true" class="radcn-toggle-group-icon">{label}</span>
}

export function ToggleGroupPreview() {
  return (
    <div class="toggle-group-preview">
      <ToggleGroup type="multiple" variant="outline">
        <ToggleGroupItem ariaLabel="Toggle bold" value="bold"><Icon label="B" /></ToggleGroupItem>
        <ToggleGroupItem ariaLabel="Toggle italic" value="italic"><Icon label="I" /></ToggleGroupItem>
        <ToggleGroupItem ariaLabel="Toggle underline" value="underline"><Icon label="U" /></ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup disabled defaultValue={['bold']} type="multiple">
        <ToggleGroupItem ariaLabel="Toggle bold" value="bold"><Icon label="B" /></ToggleGroupItem>
        <ToggleGroupItem ariaLabel="Toggle italic" value="italic"><Icon label="I" /></ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup defaultValue={['star']} size="sm" spacing={2} type="multiple" variant="outline">
        <ToggleGroupItem ariaLabel="Toggle star" value="star"><Icon label="S" /> Star</ToggleGroupItem>
        <ToggleGroupItem ariaLabel="Toggle heart" value="heart"><Icon label="H" /> Heart</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}`

const toggleSource = `import { Toggle } from 'radcn/toggle'

function Icon({ label, color }: { label: string; color?: string }) {
  return (
    <span
      aria-hidden="true"
      class="radcn-toggle-icon"
      style={color ? \`--radcn-toggle-icon-on-fg:\${color}\` : undefined}
    >
      {label}
    </span>
  )
}

export function TogglePreview() {
  return (
    <div class="toggle-preview">
      <Toggle
        ariaLabel="Toggle bookmark"
        class="bookmark-toggle"
        size="sm"
        variant="outline"
      >
        <Icon label="B" color="#3b82f6" />
        Bookmark
      </Toggle>

      <Toggle ariaLabel="Toggle italic" disabled><Icon label="U" /></Toggle>
      <Toggle ariaLabel="Toggle italic" size="lg"><Icon label="I" /></Toggle>
      <Toggle ariaLabel="Toggle italic" variant="outline"><Icon label="I" /></Toggle>
      <Toggle ariaLabel="Toggle italic" size="sm"><Icon label="I" /></Toggle>
      <Toggle ariaLabel="Toggle italic"><Icon label="I" /> Italic</Toggle>
    </div>
	  )
	}`

const textareaSource = `import { Button } from 'radcn/button'
import { Label } from 'radcn/label'
import { Textarea } from 'radcn/textarea'

export function TextareaPreview() {
  return (
    <div class="textarea-examples">
      <Textarea name="message" placeholder="Type your message here." />

      <Textarea disabled name="message" placeholder="Type your message here." />

      <div class="field">
        <Textarea name="message" placeholder="Type your message here." />
        <Button type="submit">Send message</Button>
      </div>

      <div class="field">
        <Label for="message">Your message</Label>
        <Textarea id="message" name="message" placeholder="Type your message here." />
      </div>

      <div class="field">
        <Label for="message-2">Your Message</Label>
        <Textarea
          ariaDescribedBy="message-2-help"
          id="message-2"
          name="message"
          placeholder="Type your message here."
        />
        <p id="message-2-help">Your message will be copied to the support team.</p>
      </div>
    </div>
  )
}`

const kbdSource = `import { Button } from 'radcn/button'
import { ButtonGroup } from 'radcn/button-group'
import { InputGroup, InputGroupAddon, InputGroupInput } from 'radcn/input-group'
import { Kbd, KbdGroup } from 'radcn/kbd'
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from 'radcn/tooltip'

export function KbdPreview() {
  return (
    <div class="kbd-preview">
      <div data-radcn-docs-kbd-family="kbd-button">
        <Button size="sm" variant="outline">Save <Kbd>⏎</Kbd></Button>
        <Button size="sm" variant="outline">Cancel <Kbd>Esc</Kbd></Button>
      </div>

      <div data-radcn-docs-kbd-family="kbd-demo">
        <KbdGroup><Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>⌥</Kbd><Kbd>⌃</Kbd></KbdGroup>
        <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>B</Kbd></KbdGroup>
      </div>

      <div data-radcn-docs-kbd-family="kbd-group">
        Use <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>B</Kbd></KbdGroup> for bold and
        <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>K</Kbd></KbdGroup> for links.
      </div>

      <div data-radcn-docs-kbd-family="kbd-input-group">
        <InputGroup ariaLabel="Search documentation">
          <InputGroupAddon align="inline-start"><span aria-hidden="true">S</span></InputGroupAddon>
          <InputGroupInput name="q" placeholder="Search documentation" />
          <InputGroupAddon align="inline-end"><Kbd>⌘</Kbd><Kbd>K</Kbd></InputGroupAddon>
        </InputGroup>
      </div>

      <div data-radcn-docs-kbd-family="kbd-tooltip">
        <ButtonGroup ariaLabel="Kbd tooltip shortcuts">
          <Tooltip defaultOpen>
            <TooltipTrigger class="radcn-button radcn-button--outline radcn-button--sm" ariaLabel="Save command">Save</TooltipTrigger>
            <TooltipPortal><TooltipContent>Save draft <Kbd>S</Kbd></TooltipContent></TooltipPortal>
          </Tooltip>
          <Tooltip defaultOpen>
            <TooltipTrigger class="radcn-button radcn-button--outline radcn-button--sm" ariaLabel="Print command">Print</TooltipTrigger>
            <TooltipPortal><TooltipContent>Print page <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>P</Kbd></KbdGroup></TooltipContent></TooltipPortal>
          </Tooltip>
        </ButtonGroup>
      </div>
    </div>
  )
}`

const carouselSource = `import { Card, CardContent } from 'radcn/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'radcn/carousel'

const slides = ['1', '2', '3', '4', '5']

function SlideCard({ label }: { label: string }) {
  return (
    <Card class="radcn-carousel-slide-card">
      <CardContent style="display:grid;min-height:inherit;place-items:center;padding:1rem;">
        <span>{label}</span>
      </CardContent>
    </Card>
  )
}

function SlideItems() {
  return slides.map((slide, index) => (
    <CarouselItem ariaLabel={\`Slide \${index + 1} of \${slides.length}\`} index={index} selected={index === 0}>
      <SlideCard label={slide} />
    </CarouselItem>
  ))
}

export function CarouselPreview() {
  return (
    <div class="carousel-preview">
      <Carousel class="radcn-carousel--demo" ariaLabel="Featured slides">
        <CarouselContent><SlideItems /></CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div data-carousel-example>
        <Carousel class="radcn-carousel--api" ariaLabel="API slides">
          <CarouselContent><SlideItems /></CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div class="radcn-carousel-status" data-carousel-status>Slide 1 of 5</div>
      </div>

      <Carousel class="radcn-carousel--size" ariaLabel="Responsive slides">
        <CarouselContent><SlideItems /></CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Carousel class="radcn-carousel--spacing" ariaLabel="Compact slides">
        <CarouselContent><SlideItems /></CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Carousel class="radcn-carousel--orientation" ariaLabel="Vertical slides" orientation="vertical">
        <CarouselContent><SlideItems /></CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div data-carousel-autoplay data-carousel-delay="2000">
        <Carousel class="radcn-carousel--plugin" ariaLabel="Autoplay slides">
          <CarouselContent><SlideItems /></CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div class="radcn-carousel-plugin-note">Autoplay pauses on hover.</div>
      </div>
    </div>
  )
}

export function enhanceCarouselStatus(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-carousel-example]').forEach((example) => {
    let carousel = example.querySelector<HTMLElement>('[data-radcn-carousel]')
    let status = example.querySelector<HTMLElement>('[data-carousel-status]')
    if (!carousel || !status) return
    let sync = () => {
      status.textContent = 'Slide ' + (carousel.dataset.current || '1') + ' of ' + (carousel.dataset.count || '0')
    }
    carousel.addEventListener('radcn-carousel-select', sync)
    carousel.addEventListener('radcn-carousel-scroll', sync)
    sync()
  })
}

export function enhanceCarouselAutoplay(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-carousel-autoplay]').forEach((example) => {
    let next = example.querySelector<HTMLButtonElement>('[data-radcn-carousel-next]')
    if (!next) return
    let delay = Number(example.dataset.carouselDelay || '2000')
    let timer = window.setInterval(() => next.click(), delay)
    example.addEventListener('mouseenter', () => window.clearInterval(timer))
    example.addEventListener('mouseleave', () => {
      timer = window.setInterval(() => next.click(), delay)
    })
  })
}`

const spinnerSource = `import { Badge } from 'radcn/badge'
import { Button } from 'radcn/button'
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from 'radcn/empty'
import { InputGroup, InputGroupAddon, InputGroupInput } from 'radcn/input-group'
import { Item, ItemContent, ItemFooter, ItemGroup, ItemMedia, ItemTitle } from 'radcn/item'
import { Progress } from 'radcn/progress'
import { Spinner } from 'radcn/spinner'

export function SpinnerPreview() {
  return (
    <div class="spinner-preview">
      <Spinner />
      <Spinner style="--radcn-spinner-size:1.5rem;--radcn-spinner-color:#2563eb" />
      <Button disabled size="sm"><Spinner ariaLabel="Loading" /> Loading...</Button>
      <Badge variant="outline"><Spinner ariaLabel="Processing" /> Processing</Badge>
      <InputGroup disabled><InputGroupInput disabled placeholder="Searching..." /><InputGroupAddon align="inline-end"><Spinner /></InputGroupAddon></InputGroup>
      <Empty>
        <EmptyHeader><EmptyMedia variant="icon"><Spinner /></EmptyMedia><EmptyTitle>Processing your request</EmptyTitle></EmptyHeader>
        <EmptyContent><Button size="sm" variant="outline">Cancel</Button></EmptyContent>
      </Empty>
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon"><Spinner /></ItemMedia>
          <ItemContent><ItemTitle>Downloading...</ItemTitle></ItemContent>
          <ItemFooter><Progress value={75} /></ItemFooter>
        </Item>
      </ItemGroup>
    </div>
  )
}`

function ButtonPreview() {
  return () => (
    <div mix={previewRowStyle}>
      <Button>Deploy site</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="outline">View docs</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Link</Button>
      <Button href="/docs/components/button" rmxDocument>Href Button</Button>
      <Button size="sm" variant="outline">
        <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
        New Branch
      </Button>
      <Button disabled size="sm" variant="outline">
        <Spinner ariaLabel="Submitting" />
        Submit
      </Button>
      <Button ariaLabel="Submit" size="icon" variant="outline">
        <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </Button>
      <Button ariaLabel="Upload" class="radcn-fixture-rounded-button" size="icon" variant="outline">
        <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button ariaLabel="Submit small" size="icon-sm" variant="outline">^</Button>
      <Button ariaLabel="Submit large" size="icon-lg" variant="outline">^</Button>
    </div>
  )
}

function ButtonGroupPreview() {
  return () => (
    <div mix={previewStackStyle} style="width: min(100%, 42rem);">
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
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Label As</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value="personal">
                      <DropdownMenuRadioItem value="personal">Personal</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem variant="destructive">Trash</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </ButtonGroup>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline">Follow</Button>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger ariaLabel="Conversation actions" class="radcn-button radcn-button--outline radcn-button--default">More</DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
              <DropdownMenuItem>Mark as Read</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Delete Conversation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </ButtonGroup>

      <ButtonGroup>
        <Input name="search" placeholder="Search..." value="radcn" />
        <Button ariaLabel="Search" variant="outline">⌕</Button>
      </ButtonGroup>

      <ButtonGroup class="radcn-fixture-button-group-pill">
        <ButtonGroup>
          <Button ariaLabel="Add attachment" size="icon" variant="outline">+</Button>
        </ButtonGroup>
        <ButtonGroup>
          <InputGroup disabled>
            <InputGroupInput disabled name="message" placeholder="Record and send audio..." />
            <InputGroupAddon align="inline-end">
              <Tooltip defaultOpen>
                <TooltipTrigger ariaLabel="Voice Mode" class="radcn-input-group-button radcn-input-group-button--icon-xs">≋</TooltipTrigger>
                <TooltipPortal><TooltipContent>Voice Mode</TooltipContent></TooltipPortal>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </ButtonGroup>
      </ButtonGroup>

      <ButtonGroup ariaLabel="Pagination controls" class="radcn-button-group--clustered">
        <ButtonGroup>
          <Button size="sm" variant="outline">1</Button>
          <Button size="sm" variant="outline">2</Button>
          <Button size="sm" variant="outline">3</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button ariaLabel="Previous" size="icon-sm" variant="outline">←</Button>
          <Button ariaLabel="Next" size="icon-sm" variant="outline">→</Button>
        </ButtonGroup>
      </ButtonGroup>

      <ButtonGroup ariaLabel="Media controls" orientation="vertical">
        <Button ariaLabel="Increase" size="icon" variant="outline">+</Button>
        <Button ariaLabel="Decrease" size="icon" variant="outline">−</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline">Copilot</Button>
        <Popover defaultOpen>
          <PopoverTrigger ariaLabel="Open Popover" class="radcn-button radcn-button--outline radcn-button--icon">⌄</PopoverTrigger>
          <PopoverPortal>
            <PopoverContent align="end">
              <PopoverTitle>Agent Tasks</PopoverTitle>
              <Separator />
              <Textarea name="task" value="Review ButtonGroup examples." />
              <PopoverDescription>Popover state belongs to the overlay primitive.</PopoverDescription>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </ButtonGroup>

      <ButtonGroup>
        <ButtonGroup>
          <Select defaultValue="usd" id="docs-button-group-currency" name="currency">
            <SelectTrigger ariaLabel="Currency"><SelectValue>USD</SelectValue></SelectTrigger>
            <SelectPortal>
              <SelectContent>
                <SelectViewport>
                  <SelectItem value="usd">USD US Dollar</SelectItem>
                  <SelectItem value="eur">EUR Euro</SelectItem>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </Select>
          <Input name="amount" value="10.00" />
        </ButtonGroup>
        <ButtonGroup>
          <Button ariaLabel="Send" size="icon" variant="outline">→</Button>
        </ButtonGroup>
      </ButtonGroup>

      <ButtonGroup>
        <Button size="sm" variant="secondary">Copy</Button>
        <ButtonGroupSeparator />
        <Button size="sm" variant="secondary">Paste</Button>
      </ButtonGroup>

      <div mix={previewStackStyle}>
        <ButtonGroup>
          <Button size="sm" variant="outline">Small</Button>
          <Button ariaLabel="Add small" size="icon-sm" variant="outline">+</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Default</Button>
          <Button ariaLabel="Add default" size="icon" variant="outline">+</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="lg" variant="outline">Large</Button>
          <Button ariaLabel="Add large" size="icon-lg" variant="outline">+</Button>
        </ButtonGroup>
      </div>

      <ButtonGroup>
        <Button variant="secondary">Button</Button>
        <ButtonGroupSeparator />
        <Button ariaLabel="Add" size="icon" variant="secondary">+</Button>
      </ButtonGroup>
    </div>
  )
}

function InputGroupPreview() {
  return () => (
    <div mix={[previewStackStyle, forceVisiblePreviewStyle]} style="width: min(100%, 34rem);">
      <InputGroup ariaLabel="Repository clone URL" style="max-width:100%">
        <InputGroupInput name="clone" readOnly value="git@github.com:radcn/radcn.git" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton ariaLabel="Copy URL" size="icon-xs">⧉</InputGroupButton>
          <Popover defaultOpen>
            <PopoverTrigger ariaLabel="Explain clone URL" class="radcn-input-group-button radcn-input-group-button--icon-xs">?</PopoverTrigger>
            <PopoverPortal>
              <PopoverContent align="end">
                <PopoverTitle>Clone URL</PopoverTitle>
                <PopoverDescription>Copy behavior belongs to app enhancement.</PopoverDescription>
              </PopoverContent>
            </PopoverPortal>
          </Popover>
          <InputGroupButton ariaLabel="Favorite repository" size="icon-xs">☆</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <ButtonGroup ariaLabel="Workspace URL" style="max-width:100%">
        <ButtonGroupText><Label for="docs-input-group-workspace">https://</Label></ButtonGroupText>
        <InputGroup ariaLabel="Workspace host">
          <InputGroupInput id="docs-input-group-workspace" name="workspace" value="radcn" />
          <InputGroupAddon align="inline-end"><InputGroupText>✓</InputGroupText></InputGroupAddon>
        </InputGroup>
        <ButtonGroupText>.dev</ButtonGroupText>
      </ButtonGroup>

      <InputGroup ariaLabel="Scoped docs search" style="max-width:100%">
        <InputGroupAddon><InputGroupText>⌕</InputGroupText></InputGroupAddon>
        <InputGroupInput name="query" value="input group" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu defaultOpen>
            <DropdownMenuTrigger ariaLabel="Search scope" class="radcn-input-group-button radcn-input-group-button--sm">Docs</DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Search docs</DropdownMenuItem>
                  <DropdownMenuItem>Search packages</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup ariaLabel="Command message" style="max-width:100%">
        <InputGroupAddon align="block-start">
          <Label for="docs-input-group-message">app/routes.ts</Label>
          <Tooltip defaultOpen>
            <TooltipTrigger ariaLabel="File help" class="radcn-input-group-button radcn-input-group-button--icon-xs">?</TooltipTrigger>
            <TooltipPortal><TooltipContent>Labels and help actions compose in addons.</TooltipContent></TooltipPortal>
          </Tooltip>
        </InputGroupAddon>
        <InputGroupTextarea id="docs-input-group-message" name="message" rows={4} value="Ship InputGroup parity." />
        <InputGroupAddon align="block-end">
          <InputGroupButton ariaLabel="Add attachment" size="icon-xs">+</InputGroupButton>
          <Separator orientation="vertical" />
          <InputGroupText>63%</InputGroupText>
          <InputGroupButton disabled size="sm">Send</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup disabled ariaLabel="Saving workspace" style="max-width:100%">
        <InputGroupAddon><Spinner ariaLabel="Saving" /></InputGroupAddon>
        <InputGroupInput disabled name="workspace-status" value="radcn" />
        <InputGroupAddon align="inline-end"><InputGroupText>Saving...</InputGroupText></InputGroupAddon>
      </InputGroup>

      <InputGroup ariaLabel="Password" style="max-width:100%">
        <InputGroupInput name="password" type="password" value="radical-secret" />
        <InputGroupAddon align="inline-end">
          <Tooltip defaultOpen>
            <TooltipTrigger ariaLabel="Password requirements" class="radcn-input-group-button radcn-input-group-button--icon-xs">?</TooltipTrigger>
            <TooltipPortal><TooltipContent>Use at least twelve characters.</TooltipContent></TooltipPortal>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function ItemPreview() {
  return () => (
    <div mix={previewStackStyle} style="width: min(100%, 44rem);">
      <ItemGroup style="width: 100%;">
        <Item variant="outline">
          <ItemMedia>
            <Avatar>
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Ada Radley</ItemTitle>
            <ItemDescription>Avatar media and icon-only invite action.</ItemDescription>
          </ItemContent>
          <ItemActions><Button ariaLabel="Invite Ada Radley" size="icon-sm" variant="outline">+</Button></ItemActions>
        </Item>
        <Item href="/docs/components/item" size="sm" variant="outline">
          <ItemMedia variant="icon">OK</ItemMedia>
          <ItemContent>
            <ItemTitle>Verified profile</ItemTitle>
            <ItemDescription>Explicit href replaces shadcn asChild and Radix Slot.</ItemDescription>
          </ItemContent>
          <ItemActions><span aria-hidden="true">&gt;</span></ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia><Avatar><AvatarFallback>AL</AvatarFallback></Avatar></ItemMedia>
          <ItemContent>
            <ItemTitle>Alex Lee</ItemTitle>
            <ItemDescription>Repeated rows are app/server-owned mapping.</ItemDescription>
          </ItemContent>
          <ItemActions><Button ariaLabel="Message Alex Lee" size="icon-sm" variant="outline">M</Button></ItemActions>
        </Item>
      </ItemGroup>

      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger class="radcn-button radcn-button--outline radcn-button--default">Team menu</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="start">
            <DropdownMenuItem textValue="RadCN Core">
              <Item size="sm">
                <ItemMedia><Avatar size="sm"><AvatarFallback>RC</AvatarFallback></Avatar></ItemMedia>
                <ItemContent>
                  <ItemTitle>RadCN Core</ItemTitle>
                  <ItemDescription>DropdownMenu owns menu behavior.</ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>

      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem;">
        <Item variant="outline">
          <ItemHeader><img alt="RadCN robot" src="/images/radcn-1-300.webp" /></ItemHeader>
          <ItemContent>
            <ItemTitle>Header image card</ItemTitle>
            <ItemDescription>Native docs-owned WebP image.</ItemDescription>
          </ItemContent>
          <ItemFooter><span>Static asset</span></ItemFooter>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">!</ItemMedia>
          <ItemContent>
            <ItemTitle>Security alert</ItemTitle>
            <ItemDescription>Icon media stays presentation-owned.</ItemDescription>
          </ItemContent>
          <ItemActions><Button size="sm" variant="outline">Review</Button></ItemActions>
        </Item>
      </div>

      <ItemGroup style="width: 100%;">
        <Item href="/docs/components/item" variant="outline">
          <ItemMedia variant="image"><img alt="RadCN mark" src="/images/radcn-1-96.webp" /></ItemMedia>
          <ItemContent>
            <ItemTitle>Neon server</ItemTitle>
            <ItemDescription>Image row with local media.</ItemDescription>
          </ItemContent>
          <ItemContent>
            <ItemTitle>3:42</ItemTitle>
            <ItemDescription>Duration</ItemDescription>
          </ItemContent>
        </Item>
        <Item href="https://example.com/radcn" rel="noreferrer" target="_blank" variant="outline">
          <ItemMedia variant="icon">EX</ItemMedia>
          <ItemContent>
            <ItemTitle>External reference</ItemTitle>
            <ItemDescription>Native external link attributes.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>

      <ItemGroup style="width: 100%;">
        <Item variant="outline">
          <ItemMedia>
            <AvatarGroup ariaLabel="Review team">
              <Avatar size="sm"><AvatarFallback>RC</AvatarFallback></Avatar>
              <Avatar size="sm"><AvatarFallback>UI</AvatarFallback></Avatar>
              <AvatarGroupCount>+2</AvatarGroupCount>
            </AvatarGroup>
          </ItemMedia>
          <ItemContent><ItemTitle>Stacked reviewers</ItemTitle></ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent><ItemTitle>Default size</ItemTitle><ItemDescription>Variant matrix row.</ItemDescription></ItemContent>
          <ItemActions><Button size="sm" variant="outline">Open</Button></ItemActions>
        </Item>
        <Item size="sm" variant="muted">
          <ItemContent><ItemTitle>Small muted item</ItemTitle><ItemDescription>Size and variant row.</ItemDescription></ItemContent>
          <ItemActions><Button size="sm" variant="outline">Open</Button></ItemActions>
        </Item>
      </ItemGroup>
    </div>
  )
}

function BadgePreview() {
  return () => (
    <div style="display:grid;gap:1rem;width:min(100%,42rem)">
      <div data-radcn-docs-badge-family="badge-demo" mix={previewRowStyle}>
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge
          class="radcn-docs-badge-verified"
          style="background:#2563eb;color:white;"
          variant="secondary"
        >
          <span aria-hidden="true">✓</span>
          Verified
        </Badge>
        <Badge class="radcn-docs-badge-count" style="border-radius:999px;min-width:1.25rem;height:1.25rem;padding:0 0.25rem;">8</Badge>
        <Badge class="radcn-docs-badge-count" style="border-radius:999px;min-width:1.25rem;height:1.25rem;padding:0 0.25rem;" variant="destructive">99</Badge>
        <Badge class="radcn-docs-badge-count" style="border-radius:999px;min-width:1.25rem;height:1.25rem;padding:0 0.25rem;" variant="outline">20+</Badge>
      </div>
      <div data-radcn-docs-badge-family="badge-destructive" mix={previewRowStyle}>
        <Badge variant="destructive">Destructive</Badge>
      </div>
      <div data-radcn-docs-badge-family="badge-outline" mix={previewRowStyle}>
        <Badge variant="outline">Outline</Badge>
      </div>
      <div data-radcn-docs-badge-family="badge-secondary" mix={previewRowStyle}>
        <Badge variant="secondary">Secondary</Badge>
      </div>
    </div>
  )
}

const comboboxStatusItems = [
  ['backlog', 'Backlog'],
  ['todo', 'Todo'],
  ['in-progress', 'In Progress'],
  ['done', 'Done'],
  ['canceled', 'Canceled'],
] as const

function DocsStatusCommand({ placeholder = 'Filter status...' }: { placeholder?: string }) {
  return (
    <Command>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {comboboxStatusItems.map(([value, label]) => (
            <CommandItem value={value}>{label}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function ComboboxPreview() {
  return () => (
    <div style="display:grid;gap:1.25rem;width:min(100%,44rem)">
      <div data-radcn-docs-combobox-family="combobox-demo" mix={previewStackStyle}>
        <Combobox defaultOpen defaultValue="remix" name="framework" style="width:min(100%,16rem)">
          <div class="radcn-combobox-control">
            <ComboboxInput ariaLabel="Framework" placeholder="Search framework..." />
            <ComboboxTrigger>v</ComboboxTrigger>
          </div>
          <ComboboxPortal>
            <ComboboxContent>
              <ComboboxList>
                <ComboboxGroup>
                  <ComboboxItem textValue="Next.js" value="next.js">Next.js</ComboboxItem>
                  <ComboboxItem textValue="SvelteKit" value="sveltekit">SvelteKit</ComboboxItem>
                  <ComboboxItem textValue="Nuxt.js" value="nuxt.js">Nuxt.js</ComboboxItem>
                  <ComboboxItem textValue="Remix" value="remix">Remix</ComboboxItem>
                  <ComboboxItem textValue="Astro" value="astro">Astro</ComboboxItem>
                </ComboboxGroup>
                <ComboboxEmpty>No framework found.</ComboboxEmpty>
              </ComboboxList>
            </ComboboxContent>
          </ComboboxPortal>
        </Combobox>
        <p style="margin:0;color:var(--radcn-muted-foreground);font-size:0.875rem">Selected label: Remix</p>
      </div>

      <div data-radcn-docs-combobox-family="combobox-dropdown-menu" mix={[previewRowStyle, forceVisiblePreviewStyle]} style="width:min(100%,36rem);align-items:flex-start;border:1px solid var(--radcn-border);border-radius:var(--radcn-radius);padding:0.75rem">
        <p style="margin:0;display:flex;gap:0.5rem;align-items:center;flex:1 1 16rem">
          <span data-radcn-docs-combobox-label style="border-radius:0.5rem;background:var(--radcn-primary);color:var(--radcn-primary-foreground);padding:0.25rem 0.5rem;font-size:0.75rem">feature</span>
          <span style="color:var(--radcn-muted-foreground);font-size:0.875rem">Create a new project</span>
        </p>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger ariaLabel="Project actions" class="radcn-button radcn-button--ghost radcn-button--icon-sm">...</DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Assign to...</DropdownMenuItem>
                <DropdownMenuItem>Set due date...</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Apply label</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <Command>
                      <CommandInput placeholder="Filter label..." />
                      <CommandList>
                        <CommandEmpty>No label found.</CommandEmpty>
                        <CommandGroup>
                          {['feature', 'bug', 'enhancement', 'documentation', 'design'].map((label) => (
                            <CommandItem value={label}>{label}</CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Delete<DropdownMenuShortcut>Cmd+Del</DropdownMenuShortcut></DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>

      <div data-radcn-docs-combobox-family="combobox-popover" mix={[previewRowStyle, forceVisiblePreviewStyle]} style="align-items:flex-start">
        <span style="color:var(--radcn-muted-foreground);font-size:0.875rem">Status</span>
        <Popover defaultOpen>
          <PopoverTrigger class="radcn-button radcn-button--outline">+ Set status</PopoverTrigger>
          <PopoverPortal>
            <PopoverContent align="start" side="right">
              {DocsStatusCommand({ placeholder: 'Change status...' })}
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </div>

      <div data-radcn-docs-combobox-family="combobox-responsive" mix={forceVisiblePreviewStyle} style="display:grid;gap:0.75rem;width:min(100%,36rem)">
        <div class="radcn-docs-combobox-responsive-desktop" data-radcn-docs-combobox-responsive-branch="desktop">
          <Popover defaultOpen>
            <PopoverTrigger class="radcn-button radcn-button--outline">Desktop status</PopoverTrigger>
            <PopoverPortal>
              <PopoverContent align="start">{DocsStatusCommand({})}</PopoverContent>
            </PopoverPortal>
          </Popover>
        </div>
        <div class="radcn-docs-combobox-responsive-mobile" data-radcn-docs-combobox-responsive-branch="mobile">
          <Drawer defaultOpen>
            <DrawerTrigger>Mobile status</DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay />
              <DrawerContent>{DocsStatusCommand({})}</DrawerContent>
            </DrawerPortal>
          </Drawer>
        </div>
      </div>
    </div>
  )
}

const dropdownMenuSource = `import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'radcn/dialog'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from 'radcn/dropdown-menu'

export function DropdownMenuExamples() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenuCheckboxItem checked>Status Bar</DropdownMenuCheckboxItem>
      <DropdownMenuRadioGroup value="bottom">
        <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
      <Dialog>
        <DialogContent><DialogHeader><DialogTitle>Create New File</DialogTitle></DialogHeader></DialogContent>
      </Dialog>
    </>
  )
}`

function DropdownMenuPreview() {
  return () => (
    <div style="display:grid;gap:1.25rem;width:min(100%,44rem)">
      <div data-radcn-docs-dropdown-menu-family="dropdown-menu-demo" mix={[previewRowStyle, forceVisiblePreviewStyle]} style="align-items:flex-start">
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger class="radcn-button radcn-button--outline">Open</DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="start" style="width:14rem">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile<DropdownMenuShortcut>Shift+Cmd+P</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuItem>Billing<DropdownMenuShortcut>Cmd+B</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuItem>Settings<DropdownMenuShortcut>Cmd+S</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuItem>Keyboard shortcuts<DropdownMenuShortcut>Cmd+K</DropdownMenuShortcut></DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>New Team<DropdownMenuShortcut>Cmd+T</DropdownMenuShortcut></DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out<DropdownMenuShortcut>Shift+Cmd+Q</DropdownMenuShortcut></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>

      <div data-radcn-docs-dropdown-menu-family="dropdown-menu-checkboxes" mix={[previewRowStyle, forceVisiblePreviewStyle]} style="align-items:flex-start">
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger class="radcn-button radcn-button--outline">Open</DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent style="width:14rem">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Status Bar</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem disabled>Activity Bar</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Panel</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
        <p style="margin:0;color:var(--radcn-muted-foreground);font-size:0.875rem">Checkbox persistence is app-owned state.</p>
      </div>

      <div data-radcn-docs-dropdown-menu-family="dropdown-menu-radio-group" mix={[previewRowStyle, forceVisiblePreviewStyle]} style="align-items:flex-start">
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger class="radcn-button radcn-button--outline">Open</DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent style="width:14rem">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="bottom">
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>

      <div data-radcn-docs-dropdown-menu-family="dropdown-menu-dialog" mix={[previewRowStyle, forceVisiblePreviewStyle]} style="align-items:flex-start">
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger ariaLabel="Open menu" class="radcn-button radcn-button--outline radcn-button--icon-sm">...</DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end" style="width:10rem">
              <DropdownMenuLabel>File Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>New File...</DropdownMenuItem>
                <DropdownMenuItem>Share...</DropdownMenuItem>
                <DropdownMenuItem disabled>Download</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
        <Dialog defaultOpen id="docs-dropdown-menu-dialog-preview">
          <DialogTrigger class="radcn-button radcn-button--outline">Preview dialog</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent showCloseButton={false} style="max-width:26rem">
              <DialogHeader>
                <DialogTitle>Create New File</DialogTitle>
                <DialogDescription>Provide a name for your new file.</DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <FieldLabel for="docs-dropdown-menu-filename">File Name</FieldLabel>
                  <Input id="docs-dropdown-menu-filename" name="filename" placeholder="document.txt" />
                </Field>
                <Field>
                  <FieldLabel for="docs-dropdown-menu-message">Message (Optional)</FieldLabel>
                  <Textarea id="docs-dropdown-menu-message" name="message" placeholder="Check out this file" />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose class="radcn-button radcn-button--outline">Cancel</DialogClose>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </div>
  )
}

const inputOTPSource = `import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, REGEXP_ONLY_DIGITS_AND_CHARS } from 'radcn/input-otp'

export function InputOTPExamples() {
  return (
    <>
      <InputOTP ariaLabel="One-time code" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <InputOTP ariaLabel="Alphanumeric code" maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </>
  )
}`

function InputOTPPreview() {
  return () => (
    <div style="display:grid;gap:1.25rem;width:min(100%,42rem)">
      <div data-radcn-docs-input-otp-family="input-otp-demo" mix={previewStackStyle}>
        <InputOTP ariaLabel="One-time code" defaultValue="123456" maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div data-radcn-docs-input-otp-family="input-otp-pattern" mix={previewStackStyle}>
        <InputOTP ariaLabel="Alphanumeric code" defaultValue="A1B2C3" maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p style="margin:0;color:var(--radcn-muted-foreground);font-size:0.875rem">Letters and numbers are accepted.</p>
      </div>

      <div data-radcn-docs-input-otp-family="input-otp-separator" mix={previewStackStyle}>
        <InputOTP ariaLabel="Separated one-time code" defaultValue="123456" maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div data-radcn-docs-input-otp-family="input-otp-controlled" mix={previewStackStyle}>
        <InputOTP ariaLabel="Controlled one-time code" maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p data-radcn-docs-input-otp-controlled-output style="margin:0;color:var(--radcn-muted-foreground);font-size:0.875rem">Enter your one-time password.</p>
      </div>
    </div>
  )
}

const nativeSelectSource = `import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from 'radcn/native-select'

export function NativeSelectExamples() {
  return (
    <>
      <NativeSelect name="status">
        <NativeSelectOption value="">Select status</NativeSelectOption>
        <NativeSelectOption value="todo">Todo</NativeSelectOption>
        <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
        <NativeSelectOption value="done">Done</NativeSelectOption>
        <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
      </NativeSelect>

      <NativeSelect disabled name="priority">
        <NativeSelectOption value="">Select priority</NativeSelectOption>
        <NativeSelectOption value="low">Low</NativeSelectOption>
        <NativeSelectOption value="medium">Medium</NativeSelectOption>
        <NativeSelectOption value="high">High</NativeSelectOption>
        <NativeSelectOption value="critical">Critical</NativeSelectOption>
      </NativeSelect>

      <NativeSelect name="department">
        <NativeSelectOption value="">Select department</NativeSelectOption>
        <NativeSelectOptGroup label="Engineering">
          <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
          <NativeSelectOption value="backend">Backend</NativeSelectOption>
          <NativeSelectOption value="devops">DevOps</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Sales">
          <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
          <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
          <NativeSelectOption value="sales-director">Sales Director</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Operations">
          <NativeSelectOption value="support">Customer Support</NativeSelectOption>
          <NativeSelectOption value="product-manager">Product Manager</NativeSelectOption>
          <NativeSelectOption value="ops-manager">Operations Manager</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>

      <NativeSelect ariaInvalid name="role">
        <NativeSelectOption value="">Select role</NativeSelectOption>
        <NativeSelectOption value="admin">Admin</NativeSelectOption>
        <NativeSelectOption value="editor">Editor</NativeSelectOption>
        <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
        <NativeSelectOption value="guest">Guest</NativeSelectOption>
      </NativeSelect>
    </>
  )
}`

const checkboxSource = `import { Checkbox } from 'radcn/checkbox'
import { Label } from 'radcn/label'

export function CheckboxExamples() {
  return (
    <>
      <div>
        <Checkbox id="terms" name="terms" />
        <Label for="terms">Accept terms and conditions</Label>
      </div>

      <div>
        <Checkbox checked id="terms-2" name="terms-2" />
        <Label for="terms-2">Accept terms and conditions</Label>
        <p>By clicking this checkbox, you agree to the terms and conditions.</p>
      </div>

      <div>
        <Checkbox disabled id="toggle" name="toggle" />
        <Label disabled for="toggle">Enable notifications</Label>
      </div>

      <label>
        <Checkbox checked class="custom-checkbox" id="toggle-2" name="toggle-2" />
        <span>Enable notifications</span>
        <span>You can enable or disable notifications at any time.</span>
      </label>
    </>
  )
}`

function CheckboxPreview() {
  return () => (
    <div style="display:grid;gap:1.25rem;width:min(100%,42rem)">
      <div data-radcn-docs-checkbox-family="checkbox-demo" style="display:grid;gap:1.5rem">
        <div mix={previewRowStyle}>
          <Checkbox id="docs-checkbox-terms" name="terms" />
          <Label for="docs-checkbox-terms">Accept terms and conditions</Label>
        </div>

        <div style="display:flex;align-items:flex-start;gap:0.75rem">
          <Checkbox checked id="docs-checkbox-terms-2" name="terms-2" />
          <div style="display:grid;gap:0.5rem">
            <Label for="docs-checkbox-terms-2">Accept terms and conditions</Label>
            <FieldDescription>By clicking this checkbox, you agree to the terms and conditions.</FieldDescription>
          </div>
        </div>

        <div style="display:flex;align-items:flex-start;gap:0.75rem">
          <Checkbox disabled id="docs-checkbox-toggle" name="toggle" />
          <Label disabled for="docs-checkbox-toggle">Enable notifications</Label>
        </div>

        <Label
          class="radcn-docs-checkbox-card"
          style="display:flex;align-items:flex-start;gap:0.75rem;border:1px solid var(--radcn-primary);border-radius:var(--radcn-radius);padding:0.75rem;background:color-mix(in srgb, var(--radcn-primary) 8%, transparent)"
        >
          <Checkbox
            checked
            class="radcn-docs-checkbox-blue"
            id="docs-checkbox-toggle-2"
            name="toggle-2"
            style="--radcn-control-checked-bg:#2563eb;--radcn-control-border:#2563eb"
          />
          <div style="display:grid;gap:0.375rem;font-weight:400">
            <span style="font-size:0.875rem;line-height:1;font-weight:500">Enable notifications</span>
            <FieldDescription>You can enable or disable notifications at any time.</FieldDescription>
          </div>
        </Label>
      </div>

      <div data-radcn-docs-checkbox-family="checkbox-disabled" mix={previewRowStyle}>
        <Checkbox disabled id="docs-checkbox-disabled-terms" name="terms2" />
        <Label disabled for="docs-checkbox-disabled-terms">Accept terms and conditions</Label>
      </div>

      <div data-radcn-docs-checkbox-family="checkbox-with-text" style="display:flex;align-items:flex-start;gap:0.75rem">
        <Checkbox id="docs-checkbox-with-text" name="terms1" />
        <div style="display:grid;gap:0.375rem">
          <Label for="docs-checkbox-with-text">Accept terms and conditions</Label>
          <FieldDescription>You agree to our Terms of Service and Privacy Policy.</FieldDescription>
        </div>
      </div>
    </div>
  )
}

function NativeSelectPreview() {
  return () => (
    <div style="display:grid;gap:1.25rem;width:min(100%,42rem)">
      <div data-radcn-docs-native-select-family="native-select-demo" mix={previewFieldStyle}>
        <Label for="docs-native-select-status">Status</Label>
        <NativeSelect id="docs-native-select-status" name="status">
          <NativeSelectOption value="">Select status</NativeSelectOption>
          <NativeSelectOption selected value="todo">Todo</NativeSelectOption>
          <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
          <NativeSelectOption value="done">Done</NativeSelectOption>
          <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
        </NativeSelect>
      </div>

      <div data-radcn-docs-native-select-family="native-select-disabled" mix={previewFieldStyle}>
        <Label disabled for="docs-native-select-priority">Priority</Label>
        <NativeSelect disabled id="docs-native-select-priority" name="priority">
          <NativeSelectOption value="">Select priority</NativeSelectOption>
          <NativeSelectOption value="low">Low</NativeSelectOption>
          <NativeSelectOption value="medium">Medium</NativeSelectOption>
          <NativeSelectOption value="high">High</NativeSelectOption>
          <NativeSelectOption value="critical">Critical</NativeSelectOption>
        </NativeSelect>
      </div>

      <div data-radcn-docs-native-select-family="native-select-groups" mix={previewFieldStyle}>
        <Label for="docs-native-select-department">Department</Label>
        <NativeSelect id="docs-native-select-department" name="department">
          <NativeSelectOption value="">Select department</NativeSelectOption>
          <NativeSelectOptGroup label="Engineering">
            <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
            <NativeSelectOption value="backend">Backend</NativeSelectOption>
            <NativeSelectOption value="devops">DevOps</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Sales">
            <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
            <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
            <NativeSelectOption value="sales-director">Sales Director</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Operations">
            <NativeSelectOption value="support">Customer Support</NativeSelectOption>
            <NativeSelectOption value="product-manager">Product Manager</NativeSelectOption>
            <NativeSelectOption value="ops-manager">Operations Manager</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </div>

      <div data-radcn-docs-native-select-family="native-select-invalid" mix={previewFieldStyle}>
        <Label for="docs-native-select-role">Role</Label>
        <NativeSelect ariaDescribedBy="docs-native-select-role-error" ariaInvalid id="docs-native-select-role" name="role">
          <NativeSelectOption selected value="">Select role</NativeSelectOption>
          <NativeSelectOption value="admin">Admin</NativeSelectOption>
          <NativeSelectOption value="editor">Editor</NativeSelectOption>
          <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
          <NativeSelectOption value="guest">Guest</NativeSelectOption>
        </NativeSelect>
        <FieldError id="docs-native-select-role-error">Choose a role.</FieldError>
      </div>
    </div>
  )
}

const resizableSource = `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'radcn/resizable'

export function ResizableExamples() {
  return (
    <>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={50}>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize={25}>Two</ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>Three</ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>

      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={25}>Sidebar</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>Content</ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}`

function ResizablePanelContent({ children }: { children: string }) {
  return <div class="radcn-fixture-panel">{children}</div>
}

function ResizableNestedExample({ withHandle = false }: { withHandle?: boolean }) {
  return (
    <ResizablePanelGroup orientation="horizontal" style="width:min(100%,28rem);min-height:12.5rem">
      <ResizablePanel defaultSize={50}>{ResizablePanelContent({ children: 'One' })}</ResizablePanel>
      <ResizableHandle withHandle={withHandle} />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup orientation="vertical" style="width:100%;min-height:100%;border:0;border-radius:0">
          <ResizablePanel defaultSize={25}>{ResizablePanelContent({ children: 'Two' })}</ResizablePanel>
          <ResizableHandle withHandle={withHandle} />
          <ResizablePanel defaultSize={75}>{ResizablePanelContent({ children: 'Three' })}</ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

function ResizablePreview() {
  return () => (
    <div style="display:grid;gap:1.25rem;width:min(100%,42rem)">
      <div data-radcn-docs-resizable-family="resizable-demo">
        {ResizableNestedExample({})}
      </div>

      <div data-radcn-docs-resizable-family="resizable-demo-with-handle">
        {ResizableNestedExample({ withHandle: true })}
      </div>

      <div data-radcn-docs-resizable-family="resizable-handle">
        <ResizablePanelGroup orientation="horizontal" style="width:min(100%,28rem);min-height:12.5rem">
          <ResizablePanel defaultSize={25}>{ResizablePanelContent({ children: 'Sidebar' })}</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>{ResizablePanelContent({ children: 'Content' })}</ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div data-radcn-docs-resizable-family="resizable-vertical">
        <ResizablePanelGroup orientation="vertical" style="width:min(100%,28rem);min-height:12.5rem">
          <ResizablePanel defaultSize={25}>{ResizablePanelContent({ children: 'Header' })}</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>{ResizablePanelContent({ children: 'Content' })}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

function InputPreview() {
  return () => (
    <div style="display:grid;gap:1rem;width:min(100%,42rem)">
      <div data-radcn-docs-example="input-demo" mix={previewFieldStyle}>
        <Input name="email" placeholder="Email" type="email" />
      </div>

      <div data-radcn-docs-example="input-disabled" mix={previewFieldStyle}>
        <Input disabled name="email" placeholder="Email" type="email" />
      </div>

      <div data-radcn-docs-example="input-file" mix={previewFieldStyle}>
        <Label for="docs-input-file-picture">Picture</Label>
        <Input id="docs-input-file-picture" name="picture" type="file" />
      </div>

      <form
        action="/docs/components/input"
        data-radcn-docs-example="input-with-button"
        method="get"
        mix={previewRowStyle}
        style="width:min(100%,28rem)"
      >
        <Input id="docs-input-subscribe" name="email" placeholder="Email" type="email" />
        <Button name="intent" type="submit" value="subscribe" variant="outline">Subscribe</Button>
      </form>

      <div data-radcn-docs-example="input-with-label" mix={previewFieldStyle}>
        <Label for="docs-input-label-email">Email</Label>
        <Input id="docs-input-label-email" name="email" placeholder="Email" type="email" />
      </div>

      <div data-radcn-docs-example="input-with-text" mix={previewFieldStyle}>
        <Label for="docs-input-text-email">Email</Label>
        <Input
          ariaDescribedBy="docs-input-text-description"
          id="docs-input-text-email"
          name="email"
          placeholder="Email"
          type="email"
        />
        <p id="docs-input-text-description">Enter your workspace email address.</p>
      </div>
    </div>
  )
}

function TextareaPreview() {
  return () => (
    <div style="display:grid;gap:1rem;width:min(100%,42rem)">
      <div data-radcn-docs-textarea-family="textarea-demo" mix={previewFieldStyle}>
        <Textarea name="message" placeholder="Type your message here." />
      </div>

      <div data-radcn-docs-textarea-family="textarea-disabled" mix={previewFieldStyle}>
        <Textarea disabled name="message" placeholder="Type your message here." />
      </div>

      <div data-radcn-docs-textarea-family="textarea-with-button" mix={previewFieldStyle}>
        <Textarea name="message" placeholder="Type your message here." />
        <Button type="submit">Send message</Button>
      </div>

      <div data-radcn-docs-textarea-family="textarea-with-label" mix={previewFieldStyle}>
        <Label for="docs-textarea-message">Your message</Label>
        <Textarea id="docs-textarea-message" name="message" placeholder="Type your message here." />
      </div>

      <div data-radcn-docs-textarea-family="textarea-with-text" mix={previewFieldStyle}>
        <Label for="docs-textarea-message-2">Your Message</Label>
        <Textarea
          ariaDescribedBy="docs-textarea-message-2-help"
          id="docs-textarea-message-2"
          name="message"
          placeholder="Type your message here."
        />
        <p id="docs-textarea-message-2-help">Your message will be copied to the support team.</p>
      </div>
    </div>
  )
}

function FieldPreview() {
  return () => (
    <form action="/docs/components/field" method="post" style="width: min(100%, 36rem);">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Workspace</FieldLegend>
          <FieldDescription>Field owns reusable grouping, labels, descriptions, and layout.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel for="docs-field-workspace">Workspace name</FieldLabel>
              <Input id="docs-field-workspace" name="workspace" value="RadCN" />
              <FieldDescription>Basic input fields use real labels and native controls.</FieldDescription>
            </Field>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel for="docs-field-notes">Launch notes</FieldLabel>
                <FieldDescription>Responsive fields place copy beside the control on wider screens.</FieldDescription>
              </FieldContent>
              <Textarea id="docs-field-notes" name="notes" value="Ship web-first components." />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Controls</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel for="docs-field-payment-trigger">Payment method</FieldLabel>
              <Select defaultValue="card" id="docs-field-payment" name="payment">
                <SelectTrigger ariaLabel="Payment method" id="docs-field-payment-trigger">
                  <SelectValue placeholder="Payment method">Card</SelectValue>
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    <SelectViewport>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="bank">Bank account</SelectItem>
                    </SelectViewport>
                  </SelectContent>
                </SelectPortal>
              </Select>
              <FieldDescription>Selects submit a hidden native value.</FieldDescription>
            </Field>
            <Field orientation="horizontal">
              <Switch checked id="docs-field-alerts" name="alerts" />
              <FieldContent>
                <FieldLabel for="docs-field-alerts">Security alerts</FieldLabel>
                <FieldDescription>Horizontal rows keep supporting copy beside the control.</FieldDescription>
              </FieldContent>
            </Field>
            <Field>
              <FieldTitle>Budget range</FieldTitle>
              <FieldDescription>Server default: $200 to $800. Native range controls submit both ends.</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel for="docs-field-budget-min">Minimum budget</FieldLabel>
                  <Slider ariaLabel="Minimum budget" defaultValue={200} id="docs-field-budget-min" max={1000} min={0} name="budget_min" step={50} />
                </Field>
                <Field>
                  <FieldLabel for="docs-field-budget-max">Maximum budget</FieldLabel>
                  <Slider ariaLabel="Maximum budget" defaultValue={800} id="docs-field-budget-max" max={1000} min={0} name="budget_max" step={50} />
                </Field>
              </FieldGroup>
            </Field>
          </FieldGroup>
        </FieldSet>

        <RadioGroup name="plan">
          <Field class="radcn-field--choice-card" orientation="horizontal">
            <RadioGroupItem checked id="docs-field-plan-pro" name="plan" value="pro" />
            <FieldContent>
              <FieldLabel for="docs-field-plan-pro"><FieldTitle>Pro</FieldTitle></FieldLabel>
              <FieldDescription>Choice cards are styled Field composition over radio semantics.</FieldDescription>
            </FieldContent>
          </Field>
        </RadioGroup>

        <Field orientation="horizontal">
          <Checkbox checked id="docs-field-save" name="save" value="yes" />
          <FieldContent>
            <FieldLabel for="docs-field-save">Save as template</FieldLabel>
            <FieldDescription>Checkbox groups use the same FieldContent pattern.</FieldDescription>
          </FieldContent>
        </Field>

        <Button type="submit">Save workspace</Button>
      </FieldGroup>
    </form>
  )
}

function FormPreview() {
  return () => {
    let email = formFieldIds('docs-form-email')
    let control = formControlAttributes(email, { invalid: true, message: true })

    return (
      <Form action="/docs/components/form" method="post">
        <FormField invalid name="email">
          <FormLabel error for={control.id}>Email</FormLabel>
          <Input
            ariaDescribedBy={control.ariaDescribedBy}
            ariaInvalid={control.ariaInvalid}
            id={control.id}
            name="email"
            placeholder="name@example.com"
            required
            value="radcn"
          />
          <FormDescription id={email.descriptionId}>
            Use the email address for your workspace.
          </FormDescription>
          <FormMessage id={email.messageId}>Enter a valid email address.</FormMessage>
        </FormField>
        <Button type="submit">Create workspace</Button>
      </Form>
    )
  }
}

function FormControlsPreview() {
  return () => (
    <Form action="/docs/components/form" method="post" style="width: min(100%, 34rem);">
      <FormField name="language">
        <FormLabel>Language</FormLabel>
        <Select name="language" value="typescript">
          <SelectTrigger ariaLabel="Language"><SelectValue placeholder="Language">TypeScript</SelectValue></SelectTrigger>
          <SelectContent>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="go">Go</SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>Enhanced selects submit a hidden native value.</FormDescription>
      </FormField>
      <FormField name="plan">
        <FormLabel>Plan</FormLabel>
        <RadioGroup name="plan">
          <label style="display:flex;gap:8px;align-items:center"><RadioGroupItem checked name="plan" value="pro" /> Pro</label>
          <label style="display:flex;gap:8px;align-items:center"><RadioGroupItem name="plan" value="enterprise" /> Enterprise</label>
        </RadioGroup>
      </FormField>
      <FormField name="notifications">
        <FormLabel>Notifications</FormLabel>
        <label style="display:flex;gap:8px;align-items:center"><Checkbox checked name="notifications" value="deploys" /> Deploys</label>
        <label style="display:flex;gap:8px;align-items:center"><Switch checked name="security" value="enabled" /> Security alerts</label>
      </FormField>
      <FormField name="about">
        <FormLabel>About</FormLabel>
        <Textarea name="about" value="Server-rendered form controls." />
        <FormDescription>Controls stay native and app-owned.</FormDescription>
      </FormField>
      <Button type="submit">Save settings</Button>
    </Form>
  )
}

function FormComplexPreview() {
  return () => (
    <Form action="/docs/components/form" method="post" style="width: min(100%, 34rem);">
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Arrays, password strength, and complex sections are app-owned.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField name="emails">
            <FormLabel>Team emails</FormLabel>
            <Input name="emails" value="ada@example.com" />
            <Input name="emails" value="grace@example.com" />
            <FormDescription>Repeated fields submit as repeated native values.</FormDescription>
          </FormField>
          <FormField invalid name="password">
            <FormLabel error>Password</FormLabel>
            <InputGroup invalid>
              <InputGroupInput name="password" value="radcn" />
              <InputGroupAddon align="inline-end"><InputGroupText>Weak</InputGroupText></InputGroupAddon>
            </InputGroup>
            <Progress ariaLabel="Password strength" value={38} />
            <FormMessage>Add a number and a symbol.</FormMessage>
          </FormField>
        </CardContent>
      </Card>
      <Button type="submit">Save workspace</Button>
    </Form>
  )
}

function DatePickerPreview() {
  return () => (
    <div mix={previewStackStyle}>
      <div data-radcn-docs-date-picker-family="date-picker-demo">
        <DatePicker defaultOpen month="2026-06-01" name="date" />
      </div>
      <div data-radcn-docs-date-picker-family="date-picker-with-presets">
        <DatePicker
          defaultOpen
          month="2026-06-01"
          name="preset_date"
          presets={[
            { label: 'Today', value: '2026-06-12' },
            { label: 'Tomorrow', value: '2026-06-13' },
            { label: 'In 3 days', value: '2026-06-15' },
            { label: 'In a week', value: '2026-06-19' },
          ]}
        />
      </div>
      <div data-radcn-docs-date-picker-family="date-picker-with-range">
        <DatePicker
          defaultOpen
          defaultValue="2026-06-12..2026-06-18"
          mode="range"
          month="2026-06-01"
          name="range"
          numberOfMonths={2}
        />
      </div>
    </div>
  )
}

function DataTablePreview() {
  return () => (
    <DataTable caption="Payments" rowCount={3} selectedCount={1} style="width: min(100%, 46rem);">
      <form action="/docs/components/data-table" method="get">
        <DataTableToolbar>
          <DataTableFilter label="Filter emails">
            <Input name="email" value="ada" />
          </DataTableFilter>
          <DataTableColumnControls>
            <Button variant="outline">Columns</Button>
            <Button variant="outline">Add payment</Button>
          </DataTableColumnControls>
        </DataTableToolbar>
      </form>
      <DataTableContent caption="Recent payments" dense>
        <DataTableHeader>
          <DataTableRow>
            <DataTableHeaderCell>Select</DataTableHeaderCell>
            <DataTableHeaderCell ariaSort="ascending" href="/docs/components/data-table?sort=email">
              Email
            </DataTableHeaderCell>
            <DataTableHeaderCell>Status</DataTableHeaderCell>
            <DataTableHeaderCell>Amount</DataTableHeaderCell>
          </DataTableRow>
        </DataTableHeader>
        <DataTableBody>
          <DataTableRow selected>
            <DataTableCell><Checkbox checked name="rows" value="pay-1" /></DataTableCell>
            <DataTableCell>ada@example.com</DataTableCell>
            <DataTableCell><Badge variant="secondary">Success</Badge></DataTableCell>
            <DataTableCell>$316.00</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell><Checkbox name="rows" value="pay-2" /></DataTableCell>
            <DataTableCell>grace@example.com</DataTableCell>
            <DataTableCell><Badge variant="outline">Processing</Badge></DataTableCell>
            <DataTableCell>$242.00</DataTableCell>
          </DataTableRow>
        </DataTableBody>
      </DataTableContent>
      <DataTablePagination page={1} pageCount={2}>
        <DataTableSelectionSummary rowCount={3} selectedCount={1} />
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationLink href="/docs/components/data-table?page=1" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="/docs/components/data-table?page=2">2</PaginationLink></PaginationItem>
          </PaginationContent>
        </Pagination>
      </DataTablePagination>
      <DataTableRowActions>
        <Button variant="outline">Open row</Button>
        <Button variant="ghost">Duplicate</Button>
      </DataTableRowActions>
      <DataTableDetail>
        <strong>ada@example.com</strong>
        <p style="margin: 0.25rem 0 0; color: var(--radcn-muted-foreground);">
          Detail and editing panels remain app-owned composition.
        </p>
      </DataTableDetail>
    </DataTable>
  )
}

function DialogPreview() {
  return () => (
    <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
      <Dialog id="docs-dialog-preview">
        <DialogTrigger>Open dialog</DialogTrigger>
      </Dialog>
      <DialogContent
        showCloseButton={false}
        style="width: min(100%, 28rem);"
      >
        <DialogHeader>
          <DialogTitle>Publish component docs?</DialogTitle>
          <DialogDescription>
            This server-rendered dialog markup is ready for RadCN enhancement.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose style="position: static; width: auto; height: auto; padding: 0.5rem 1rem;">
            Cancel
          </DialogClose>
          <Button>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  )
}

function TabsPreview() {
  return () => (
    <Tabs defaultValue="preview" style="width: min(100%, 28rem);">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <div mix={[previewCardStyle, forceVisiblePreviewStyle]}>
        <TabsContent value="preview" style="display: grid; gap: 0.25rem;">
          <strong>Live preview</strong>
          <p>Real RadCN components render in the docs.</p>
        </TabsContent>
        <TabsContent value="code" style="display: grid; gap: 0.25rem;">
          <strong>Source pairing</strong>
          <p>Source snippets stay beside the live example.</p>
        </TabsContent>
      </div>
    </Tabs>
  )
}

function SonnerPreview() {
  return () => (
    <div mix={previewStackStyle}>
      <Toaster
        defaultDuration={0}
        position="bottom-right"
        style="position: static; width: min(100%, 28rem);"
        toasts={[
          {
            description: 'The docs preview renders a package toast.',
            id: 'docs-toast-build',
            title: 'Build complete',
            type: 'success',
          },
          {
            actionLabel: 'View',
            actionUrl: '#preview',
            description: 'The next deploy is waiting on review.',
            id: 'docs-toast-queue',
            title: 'Queued deploy',
            type: 'info',
          },
        ]}
      />
    </div>
  )
}

function ToastPreview() {
  return () => (
    <div style="display:grid;gap:1rem;width:min(100%,42rem)">
      <div data-radcn-docs-toast-family="toast-demo" mix={previewFieldStyle}>
        <span
          data-radcn-toast-trigger
          data-toast-action-label="Undo"
          data-toast-action-url="#undo"
          data-toast-description="Friday, February 10, 2023 at 5:57 PM"
          data-toast-duration="0"
          data-toast-title="Scheduled: Catch up"
        >
          <Button>Add to calendar</Button>
        </span>
        <Toaster
          defaultDuration={0}
          position="bottom-right"
          style="position: static; width: min(100%, 28rem);"
          toasts={[{
            actionLabel: 'Undo',
            actionUrl: '#undo',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            id: 'docs-toast-demo',
            title: 'Scheduled: Catch up',
          }]}
        />
      </div>

      <div data-radcn-docs-toast-family="toast-destructive" mix={previewFieldStyle}>
        <span
          data-radcn-toast-trigger
          data-toast-action-label="Try again"
          data-toast-action-url="#try-again"
          data-toast-description="There was a problem with your request."
          data-toast-duration="0"
          data-toast-title="Uh oh! Something went wrong."
          data-toast-type="error"
        >
          <Button>Show Toast</Button>
        </span>
        <Toaster
          defaultDuration={0}
          position="bottom-right"
          style="position: static; width: min(100%, 28rem);"
          toasts={[{
            actionLabel: 'Try again',
            actionUrl: '#try-again',
            description: 'There was a problem with your request.',
            id: 'docs-toast-destructive',
            title: 'Uh oh! Something went wrong.',
            type: 'error',
          }]}
        />
      </div>

      <div data-radcn-docs-toast-family="toast-simple" mix={previewFieldStyle}>
        <span
          data-radcn-toast-trigger
          data-toast-description="Your message has been sent."
          data-toast-duration="0"
        >
          <Button>Show Toast</Button>
        </span>
        <Toaster
          defaultDuration={0}
          position="bottom-right"
          style="position: static; width: min(100%, 28rem);"
          toasts={[{
            description: 'Your message has been sent.',
            id: 'docs-toast-simple',
          }]}
        />
      </div>

      <div data-radcn-docs-toast-family="toast-with-action" mix={previewFieldStyle}>
        <span
          data-radcn-toast-trigger
          data-toast-action-label="Try again"
          data-toast-action-url="#try-again"
          data-toast-description="There was a problem with your request."
          data-toast-duration="0"
          data-toast-title="Uh oh! Something went wrong."
        >
          <Button>Show Toast</Button>
        </span>
        <Toaster
          defaultDuration={0}
          position="bottom-right"
          style="position: static; width: min(100%, 28rem);"
          toasts={[{
            actionLabel: 'Try again',
            actionUrl: '#try-again',
            description: 'There was a problem with your request.',
            id: 'docs-toast-with-action',
            title: 'Uh oh! Something went wrong.',
          }]}
        />
      </div>

      <div data-radcn-docs-toast-family="toast-with-title" mix={previewFieldStyle}>
        <span
          data-radcn-toast-trigger
          data-toast-description="There was a problem with your request."
          data-toast-duration="0"
          data-toast-title="Uh oh! Something went wrong."
        >
          <Button>Show Toast</Button>
        </span>
        <Toaster
          defaultDuration={0}
          position="bottom-right"
          style="position: static; width: min(100%, 28rem);"
          toasts={[{
            description: 'There was a problem with your request.',
            id: 'docs-toast-with-title',
            title: 'Uh oh! Something went wrong.',
          }]}
        />
      </div>
    </div>
  )
}

function BreadcrumbSlashGlyph() {
  return () => <span aria-hidden="true" class="radcn-breadcrumb-glyph">/</span>
}

function BreadcrumbChevronGlyph() {
  return () => <span aria-hidden="true" class="radcn-breadcrumb-glyph">⌄</span>
}

function BreadcrumbPreview() {
  return () => (
    <div mix={previewStackStyle} style="width: min(100%, 44rem);">
      <div data-radcn-docs-breadcrumb-family="link">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div data-radcn-docs-breadcrumb-family="ellipsis">
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
      </div>

      <div data-radcn-docs-breadcrumb-family="separator">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator><BreadcrumbSlashGlyph /></BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator><BreadcrumbSlashGlyph /></BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div data-radcn-docs-breadcrumb-family="demo">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu defaultOpen>
                <DropdownMenuTrigger ariaLabel="Toggle menu" class="radcn-breadcrumb-trigger">
                  <BreadcrumbEllipsis />
                  <span class="radcn-sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Themes</DropdownMenuItem>
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/docs/components">Components</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div data-radcn-docs-breadcrumb-family="dropdown">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator><BreadcrumbSlashGlyph /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <DropdownMenu defaultOpen>
                <DropdownMenuTrigger class="radcn-breadcrumb-trigger">Components<BreadcrumbChevronGlyph /></DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Themes</DropdownMenuItem>
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator><BreadcrumbSlashGlyph /></BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div data-radcn-docs-breadcrumb-family="responsive">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span class="radcn-breadcrumb-responsive-desktop">
                <DropdownMenu defaultOpen>
                  <DropdownMenuTrigger ariaLabel="Toggle menu" class="radcn-breadcrumb-trigger"><BreadcrumbEllipsis /></DropdownMenuTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Documentation</DropdownMenuItem>
                      <DropdownMenuItem>Build Your Application</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>
              </span>
              <span class="radcn-breadcrumb-responsive-mobile">
                <Drawer defaultOpen>
                  <DrawerTrigger ariaLabel="Toggle Menu" class="radcn-breadcrumb-trigger"><BreadcrumbEllipsis /></DrawerTrigger>
                  <DrawerPortal>
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Navigate to</DrawerTitle>
                        <DrawerDescription>Select a page to navigate to.</DrawerDescription>
                      </DrawerHeader>
                      <div class="radcn-breadcrumb-drawer-links">
                        <a class="radcn-breadcrumb-link" href="#">Documentation</a>
                        <a class="radcn-breadcrumb-link" href="#">Build Your Application</a>
                      </div>
                      <DrawerFooter>
                        <DrawerClose class="radcn-button radcn-button--outline radcn-button--default">Close</DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </DrawerPortal>
                </Drawer>
              </span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink class="radcn-breadcrumb-truncate" href="#">Data Fetching</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>
            <BreadcrumbItem><BreadcrumbPage class="radcn-breadcrumb-truncate">Caching and Revalidating</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}

function EmptyPreview() {
  return () => (
    <div mix={previewStackStyle} style="width: min(100%, 44rem);">
      <div data-radcn-docs-empty-family="demo">
        <Empty style="width: min(100%, 34rem);">
          <EmptyHeader>
            <EmptyMedia variant="icon">+</EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>Create a project or import an existing workspace to populate this dashboard.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem">
            <Button size="sm">Create Project</Button>
            <Button size="sm" variant="outline">Import Project</Button>
            <Button href="/docs/components/empty" size="sm" variant="link">Learn More</Button>
          </EmptyContent>
        </Empty>
      </div>

      <div data-radcn-docs-empty-family="icon" style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));">
        {[
          ['Mail', 'No messages', 'Messages from collaborators appear here.'],
          ['Star', 'No favorites', 'Save pages to revisit them quickly.'],
          ['Heart', 'No likes', 'Liked releases will show up here.'],
          ['Mark', 'No bookmarks', 'Bookmark components as you review them.'],
        ].map(([glyph, title, description]) => (
          <Empty style="min-height: 13rem; width: 100%; padding: 1.25rem;">
            <EmptyHeader>
              <EmptyMedia variant="icon">{glyph.slice(0, 1)}</EmptyMedia>
              <EmptyTitle>{title}</EmptyTitle>
              <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ))}
      </div>

      <div data-radcn-docs-empty-family="avatar">
        <Empty style="width: min(100%, 34rem);">
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
      </div>

      <div data-radcn-docs-empty-family="avatar-group">
        <Empty style="width: min(100%, 34rem);">
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
      </div>

      <div data-radcn-docs-empty-family="input-group">
        <Empty style="width: min(100%, 34rem);">
          <EmptyHeader>
            <EmptyMedia variant="icon">?</EmptyMedia>
            <EmptyTitle>Page not found</EmptyTitle>
            <EmptyDescription>
              Search the docs or <a href="/docs/components/empty">contact support</a>.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent style="width:min(100%, 24rem);">
            <InputGroup ariaLabel="Search documentation">
              <InputGroupAddon align="inline-start">S</InputGroupAddon>
              <InputGroupInput name="q" placeholder="Search documentation" />
              <InputGroupAddon align="inline-end"><Kbd>/</Kbd></InputGroupAddon>
            </InputGroup>
          </EmptyContent>
        </Empty>
      </div>

      <div data-radcn-docs-empty-family="outline">
        <Empty style="width: min(100%, 34rem); border-style: dashed; border-color: color-mix(in srgb, var(--radcn-border) 80%, var(--radcn-primary));">
          <EmptyHeader>
            <EmptyMedia variant="icon">C</EmptyMedia>
            <EmptyTitle>No files uploaded</EmptyTitle>
            <EmptyDescription>Upload files to make this cloud workspace useful.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button size="sm" variant="outline">Upload Files</Button></EmptyContent>
        </Empty>
      </div>

      <div data-radcn-docs-empty-family="background">
        <Empty style="width: min(100%, 34rem); min-height: 18rem; background: var(--radcn-muted); border-color: transparent;">
          <EmptyHeader>
            <EmptyMedia variant="icon">!</EmptyMedia>
            <EmptyTitle>No notifications</EmptyTitle>
            <EmptyDescription>Refresh to check for new deployment alerts.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button size="sm" variant="outline">Refresh</Button></EmptyContent>
        </Empty>
      </div>
    </div>
  )
}

function toggleIcon(label: string, style?: string) {
  return <span aria-hidden="true" class="radcn-toggle-icon" style={style}>{label}</span>
}

function TogglePreview() {
  return () => (
    <div mix={previewStackStyle} style="width: min(100%, 42rem);">
      <div data-radcn-docs-toggle-family="toggle-demo" mix={previewRowStyle}>
        <Toggle
          ariaLabel="Toggle bookmark"
          class="radcn-docs-toggle-bookmark"
          size="sm"
          variant="outline"
        >
          {toggleIcon('B', '--radcn-toggle-icon-on-fg:#3b82f6')}
          Bookmark
        </Toggle>
      </div>

      <div data-radcn-docs-toggle-family="toggle-disabled" mix={previewRowStyle}>
        <Toggle ariaLabel="Toggle italic" disabled>{toggleIcon('U')}</Toggle>
      </div>

      <div data-radcn-docs-toggle-family="toggle-lg" mix={previewRowStyle}>
        <Toggle ariaLabel="Toggle italic" size="lg">{toggleIcon('I')}</Toggle>
      </div>

      <div data-radcn-docs-toggle-family="toggle-outline" mix={previewRowStyle}>
        <Toggle ariaLabel="Toggle italic" variant="outline">{toggleIcon('I')}</Toggle>
      </div>

      <div data-radcn-docs-toggle-family="toggle-sm" mix={previewRowStyle}>
        <Toggle ariaLabel="Toggle italic" size="sm">{toggleIcon('I')}</Toggle>
      </div>

      <div data-radcn-docs-toggle-family="toggle-with-text" mix={previewRowStyle}>
        <Toggle ariaLabel="Toggle italic">{toggleIcon('I')} Italic</Toggle>
      </div>
    </div>
  )
}

function KbdPreview() {
  return () => (
    <div mix={[previewStackStyle, forceVisiblePreviewStyle]} style="width: min(100%, 42rem);">
      <div data-radcn-docs-kbd-family="kbd-button" mix={previewRowStyle}>
        <Button size="sm" variant="outline">Save <Kbd>⏎</Kbd></Button>
        <Button size="sm" variant="outline">Cancel <Kbd>Esc</Kbd></Button>
      </div>

      <div data-radcn-docs-kbd-family="kbd-demo" mix={previewStackStyle}>
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

      <div
        data-radcn-docs-kbd-family="kbd-group"
        style="display:flex;flex-wrap:wrap;gap:0.35rem;align-items:center;color:var(--radcn-muted-foreground);line-height:1.7"
      >
        Use <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>B</Kbd></KbdGroup> for bold and{' '}
        <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>K</Kbd></KbdGroup> for links.
      </div>

      <div data-radcn-docs-kbd-family="kbd-input-group">
        <InputGroup ariaLabel="Search documentation" style="width:min(100%, 360px)">
          <InputGroupAddon align="inline-start">
            <span aria-hidden="true" data-radcn-docs-search-icon>S</span>
          </InputGroupAddon>
          <InputGroupInput name="q" placeholder="Search documentation" />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div data-radcn-docs-kbd-family="kbd-tooltip">
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
      </div>
    </div>
  )
}

function ToggleGroupPreview() {
  return () => (
    <div mix={previewStackStyle} style="width: min(100%, 42rem);">
      <div data-radcn-docs-toggle-group-family="demo" mix={previewRowStyle}>
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold"><span aria-hidden="true" class="radcn-toggle-group-icon">B</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic"><span aria-hidden="true" class="radcn-toggle-group-icon">I</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline"><span aria-hidden="true" class="radcn-toggle-group-icon">U</span></ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div data-radcn-docs-toggle-group-family="single" mix={previewRowStyle}>
        <ToggleGroup defaultValue="italic" type="single">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold"><span aria-hidden="true" class="radcn-toggle-group-icon">B</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic"><span aria-hidden="true" class="radcn-toggle-group-icon">I</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline"><span aria-hidden="true" class="radcn-toggle-group-icon">U</span></ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div data-radcn-docs-toggle-group-family="disabled" mix={previewRowStyle}>
        <ToggleGroup disabled defaultValue={['bold']} type="multiple">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold"><span aria-hidden="true" class="radcn-toggle-group-icon">B</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic"><span aria-hidden="true" class="radcn-toggle-group-icon">I</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline"><span aria-hidden="true" class="radcn-toggle-group-icon">U</span></ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div data-radcn-docs-toggle-group-family="lg" mix={previewRowStyle}>
        <ToggleGroup size="lg" type="multiple">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold"><span aria-hidden="true" class="radcn-toggle-group-icon">B</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic"><span aria-hidden="true" class="radcn-toggle-group-icon">I</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline"><span aria-hidden="true" class="radcn-toggle-group-icon">U</span></ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div data-radcn-docs-toggle-group-family="sm" mix={previewRowStyle}>
        <ToggleGroup size="sm" type="single">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold"><span aria-hidden="true" class="radcn-toggle-group-icon">B</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic"><span aria-hidden="true" class="radcn-toggle-group-icon">I</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline"><span aria-hidden="true" class="radcn-toggle-group-icon">U</span></ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div data-radcn-docs-toggle-group-family="outline" mix={previewRowStyle}>
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem ariaLabel="Toggle bold" value="bold"><span aria-hidden="true" class="radcn-toggle-group-icon">B</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle italic" value="italic"><span aria-hidden="true" class="radcn-toggle-group-icon">I</span></ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle underline" value="underline"><span aria-hidden="true" class="radcn-toggle-group-icon">U</span></ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div data-radcn-docs-toggle-group-family="spacing" mix={previewRowStyle}>
        <ToggleGroup defaultValue={['star']} size="sm" spacing={2} type="multiple" variant="outline">
          <ToggleGroupItem ariaLabel="Toggle star" value="star"><span aria-hidden="true" class="radcn-toggle-group-icon" style="--radcn-toggle-icon-on-fg:#ca8a04">S</span> Star</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle heart" value="heart"><span aria-hidden="true" class="radcn-toggle-group-icon" style="--radcn-toggle-icon-on-fg:#dc2626">H</span> Heart</ToggleGroupItem>
          <ToggleGroupItem ariaLabel="Toggle bookmark" value="bookmark"><span aria-hidden="true" class="radcn-toggle-group-icon" style="--radcn-toggle-icon-on-fg:#2563eb">B</span> Bookmark</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}

function CarouselSlideCard({ label }: { label: string }) {
  return (
    <Card class="radcn-carousel-slide-card">
      <CardContent style="display:grid;min-height:inherit;place-items:center;padding:1rem;">
        <span>{label}</span>
      </CardContent>
    </Card>
  )
}

function CarouselPreview() {
  let slides = ['1', '2', '3', '4', '5']

  return () => (
    <div mix={previewStackStyle} style="width: min(100%, 44rem);">
      <div data-radcn-docs-carousel-family="demo">
        <Carousel ariaLabel="Featured slides" class="radcn-carousel--demo">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem ariaLabel={`Slide ${index + 1} of ${slides.length}`} index={index} selected={index === 0}>
                {CarouselSlideCard({ label: slide })}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div data-radcn-docs-carousel-family="api" class="radcn-carousel-example-stack">
        <Carousel ariaLabel="API slides" class="radcn-carousel--api">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem ariaLabel={`Slide ${index + 1} of ${slides.length}`} index={index} selected={index === 0}>
                {CarouselSlideCard({ label: slide })}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div class="radcn-carousel-status">Slide 1 of 5</div>
      </div>

      <div data-radcn-docs-carousel-family="size">
        <Carousel ariaLabel="Responsive slides" class="radcn-carousel--size">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem index={index}>{CarouselSlideCard({ label: slide })}</CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div data-radcn-docs-carousel-family="spacing">
        <Carousel ariaLabel="Compact slides" class="radcn-carousel--spacing">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem index={index}>{CarouselSlideCard({ label: slide })}</CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div data-radcn-docs-carousel-family="orientation">
        <Carousel ariaLabel="Vertical slides" class="radcn-carousel--orientation" orientation="vertical">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem index={index}>{CarouselSlideCard({ label: slide })}</CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div data-radcn-docs-carousel-family="plugin" class="radcn-carousel-example-stack">
        <Carousel ariaLabel="Autoplay slides" class="radcn-carousel--plugin">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem index={index}>{CarouselSlideCard({ label: slide })}</CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div class="radcn-carousel-plugin-note">Autoplay can be app-owned browser behavior over public Carousel controls.</div>
      </div>
    </div>
  )
}

function SpinnerPreview() {
  return () => (
    <div mix={previewStackStyle} style="width: min(100%, 42rem);">
      <div data-radcn-docs-spinner-family="basic" mix={previewRowStyle}>
        <Spinner />
        <span>Basic</span>
      </div>

      <div data-radcn-docs-spinner-family="size" mix={previewRowStyle}>
        <Spinner ariaLabel="Small loading" style="--radcn-spinner-size:0.75rem" />
        <Spinner ariaLabel="Default loading" style="--radcn-spinner-size:1rem" />
        <Spinner ariaLabel="Medium loading" style="--radcn-spinner-size:1.5rem" />
        <Spinner ariaLabel="Large loading" style="--radcn-spinner-size:2rem" />
        <span>Size</span>
      </div>

      <div data-radcn-docs-spinner-family="color" mix={previewRowStyle}>
        <Spinner ariaLabel="Red loading" style="--radcn-spinner-size:1.5rem;--radcn-spinner-color:#dc2626" />
        <Spinner ariaLabel="Green loading" style="--radcn-spinner-size:1.5rem;--radcn-spinner-color:#16a34a" />
        <Spinner ariaLabel="Blue loading" style="--radcn-spinner-size:1.5rem;--radcn-spinner-color:#2563eb" />
        <span>Color</span>
      </div>

      <div data-radcn-docs-spinner-family="button" mix={previewStackStyle}>
        <Button disabled size="sm"><Spinner ariaLabel="Loading" /> Loading...</Button>
        <Button disabled size="sm" variant="outline"><Spinner ariaLabel="Please wait" /> Please wait</Button>
        <Button disabled size="sm" variant="secondary"><Spinner ariaLabel="Processing" /> Processing</Button>
      </div>

      <div data-radcn-docs-spinner-family="badge" mix={previewRowStyle}>
        <Badge><Spinner ariaLabel="Syncing" /> Syncing</Badge>
        <Badge variant="secondary"><Spinner ariaLabel="Updating" /> Updating</Badge>
        <Badge variant="outline"><Spinner ariaLabel="Processing" /> Processing</Badge>
      </div>

      <div data-radcn-docs-spinner-family="input-group">
        <InputGroup disabled ariaLabel="Searching docs" style="width: min(100%, 28rem);">
          <InputGroupInput disabled name="search" placeholder="Searching..." />
          <InputGroupAddon align="inline-end"><Spinner ariaLabel="Searching" /></InputGroupAddon>
        </InputGroup>
      </div>

      <div data-radcn-docs-spinner-family="empty">
        <Empty style="width: min(100%, 30rem);">
          <EmptyHeader>
            <EmptyMedia variant="icon"><Spinner ariaLabel="Processing request" /></EmptyMedia>
            <EmptyTitle>Processing your request</EmptyTitle>
            <EmptyDescription>Please wait while we process your request.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button size="sm" variant="outline">Cancel</Button></EmptyContent>
        </Empty>
      </div>

      <div data-radcn-docs-spinner-family="demo">
        <ItemGroup style="width: min(100%, 30rem);">
          <Item variant="muted">
            <ItemMedia><Spinner ariaLabel="Processing payment" /></ItemMedia>
            <ItemContent><ItemTitle>Processing payment...</ItemTitle></ItemContent>
            <ItemContent><ItemTitle>$100.00</ItemTitle></ItemContent>
          </Item>
        </ItemGroup>
      </div>

      <div data-radcn-docs-spinner-family="item">
        <ItemGroup style="width: min(100%, 30rem);">
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
      </div>

      <div data-radcn-docs-spinner-family="custom" mix={previewRowStyle}>
        <svg
          aria-label="Custom loading"
          data-radcn-docs-custom-spinner
          fill="none"
          role="status"
          style="width:1.5rem;height:1.5rem;animation:radcn-spin 1s linear infinite;color:#0f766e"
          viewBox="0 0 24 24"
        >
          <path d="M12 3a9 9 0 1 0 9 9" stroke="currentColor" stroke-linecap="round" stroke-width="4" />
        </svg>
        <span>Custom</span>
      </div>
    </div>
  )
}

function AuthoredPreview(handle: { props: { slug: string; title: string } }) {
  return () => {
    let { slug, title } = handle.props

    switch (slug) {
      case 'accordion':
        return (
          <Accordion defaultValue="usage" style="width: min(100%, 32rem);">
            <AccordionItem value="usage">
              <AccordionTrigger>What changes in Remix 3?</AccordionTrigger>
              <AccordionContent>RadCN renders platform markup first, then enhances disclosure behavior in the browser.</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      case 'alert':
        return (
          <Alert>
            <AlertTitle>Server render complete</AlertTitle>
            <AlertDescription>The docs route returned a real RadCN alert.</AlertDescription>
            <AlertAction>Inspect</AlertAction>
          </Alert>
        )
      case 'alert-dialog':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <AlertDialog id="docs-alert-dialog-preview">
              <AlertDialogTrigger>Delete token</AlertDialogTrigger>
            </AlertDialog>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete API token?</AlertDialogTitle>
                <AlertDialogDescription>This preview renders the alert dialog surface without opening a modal.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </div>
        )
      case 'aspect-ratio':
        return (
          <AspectRatio ratio="16 / 9" style="width: min(100%, 32rem);">
            <div mix={previewMediaStyle}>16:9 media slot</div>
          </AspectRatio>
        )
      case 'avatar':
        return (
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>RC</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="sm"><AvatarFallback>UI</AvatarFallback></Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        )
      case 'breadcrumb':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Docs</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{title}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )
      case 'button-group':
        return <ButtonGroupPreview />
      case 'calendar':
        return (
          <Calendar
            defaultMonth="2026-06-01"
            defaultSelected="2026-06-05"
            name="release-date"
            style="width: min(100%, 22rem);"
          />
        )
      case 'carousel':
        return (
          <Carousel style="width: min(100%, 28rem);">
            <CarouselContent>
              <CarouselItem><div mix={previewMediaStyle}>Component preview</div></CarouselItem>
              <CarouselItem><div mix={previewMediaStyle}>Token preview</div></CarouselItem>
            </CarouselContent>
            <CarouselPrevious>Previous</CarouselPrevious>
            <CarouselNext>Next</CarouselNext>
          </Carousel>
        )
      case 'card':
        return (
          <Card style="width: min(100%, 28rem);">
            <CardHeader>
              <CardTitle>Docs quality gate</CardTitle>
              <CardDescription>Every route gets authored content.</CardDescription>
            </CardHeader>
            <CardContent><p>Examples import from the RadCN package.</p></CardContent>
            <CardFooter><Button>Review page</Button></CardFooter>
          </Card>
        )
      case 'chart':
        return (
          <ChartContainer
            ariaLabel="Weekly component coverage"
            config={{ ready: { color: 'var(--radcn-primary)', label: 'Ready' } }}
            description="Authored docs coverage by week."
            title="Coverage"
            style="width: min(100%, 28rem);"
          >
            <ChartBarSeries labels={['Mon', 'Tue', 'Wed']} name="ready" values={[12, 28, 57]} />
            <ChartLineSeries labels={['Mon', 'Tue', 'Wed']} name="ready" values={[12, 28, 57]} />
            <ChartLegend><ChartLegendItem name="ready">Ready pages</ChartLegendItem></ChartLegend>
            <ChartTooltip label="Friday"><ChartTooltipItem label="Ready" value={57} /></ChartTooltip>
          </ChartContainer>
        )
      case 'checkbox':
        return (
          <label mix={previewRowStyle}>
            <Checkbox checked id="docs-checkbox" name="docs-checkbox" />
            Include authored examples
          </label>
        )
      case 'collapsible':
        return (
          <Collapsible open style="width: min(100%, 28rem);">
            <CollapsibleTrigger>Show implementation note</CollapsibleTrigger>
            <CollapsibleContent>Collapsible content is rendered in the initial document.</CollapsibleContent>
          </Collapsible>
        )
      case 'combobox':
        return (
          <Combobox defaultValue="remix" style="width: min(100%, 28rem);">
            <ComboboxValue>Remix 3</ComboboxValue>
            <ComboboxTrigger>Choose framework</ComboboxTrigger>
            <ComboboxContent>
              <ComboboxInput placeholder="Filter frameworks" />
              <ComboboxList>
                <ComboboxItem value="remix">Remix 3</ComboboxItem>
                <ComboboxItem value="web">The web platform</ComboboxItem>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )
      case 'command':
        return (
          <Command style="width: min(100%, 28rem);">
            <CommandInput placeholder="Search commands" />
            <CommandList>
              <CommandGroup>
                <CommandItem value="copy">Copy snippet <CommandShortcut>Cmd+C</CommandShortcut></CommandItem>
                <CommandItem value="open">Open preview <CommandShortcut>Cmd+O</CommandShortcut></CommandItem>
              </CommandGroup>
              <CommandEmpty>No command found.</CommandEmpty>
            </CommandList>
          </Command>
        )
      case 'context-menu':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <ContextMenu>
              <ContextMenuTrigger><Button variant="outline">Right click preview</Button></ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Copy import</ContextMenuItem>
                <ContextMenuItem>Open example</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        )
      case 'direction':
        return (
          <DirectionProvider dir="rtl">
            <div mix={previewCardStyle}>
              <strong>RTL preview</strong>
              <p>DirectionProvider writes real `dir` behavior into the rendered subtree.</p>
            </div>
          </DirectionProvider>
        )
      case 'drawer':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <Drawer id="docs-drawer-preview">
              <DrawerTrigger>Open drawer</DrawerTrigger>
            </Drawer>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Preview drawer</DrawerTitle>
                <DrawerDescription>Drawer content can be inspected in docs without opening the viewport edge panel.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>Close</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </div>
        )
      case 'dropdown-menu':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <DropdownMenu>
              <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Page actions</DropdownMenuLabel>
                <DropdownMenuItem>Copy import</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Open source <DropdownMenuShortcut>Cmd+Enter</DropdownMenuShortcut></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      case 'empty':
        return (
          <Empty style="width: min(100%, 28rem);">
            <EmptyMedia variant="icon">0</EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No drafts left</EmptyTitle>
              <EmptyDescription>Every package export now has a docs page.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent><Button variant="outline">Add example</Button></EmptyContent>
          </Empty>
        )
      case 'field':
        return <FieldPreview />
      case 'hover-card':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <HoverCard>
              <HoverCardTrigger>Hover RadCN</HoverCardTrigger>
              <HoverCardContent>Server-rendered trigger, browser-enhanced hover surface.</HoverCardContent>
            </HoverCard>
          </div>
        )
      case 'input-group':
        return (
          <InputGroup style="width: min(100%, 28rem);">
            <InputGroupAddon>@</InputGroupAddon>
            <InputGroupInput name="workspace" placeholder="radcn" value="radcn" />
            <InputGroupButton>Go</InputGroupButton>
            <InputGroupText>workspace</InputGroupText>
          </InputGroup>
        )
      case 'input-otp':
        return (
          <InputOTP ariaLabel="One-time code" defaultValue="RADCN1" maxLength={6} name="otp">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        )
      case 'item':
        return (
          <ItemGroup style="width: min(100%, 30rem);">
            <Item>
              <ItemMedia variant="icon">R</ItemMedia>
              <ItemContent>
                <ItemTitle>RadCN docs</ItemTitle>
                <ItemDescription>Component examples are package-backed.</ItemDescription>
              </ItemContent>
              <ItemActions><Button size="sm">Open</Button></ItemActions>
            </Item>
          </ItemGroup>
        )
      case 'kbd':
        return (
          <KbdGroup>
            <Kbd>Cmd</Kbd>
            <Kbd>K</Kbd>
            <span>Open command menu</span>
          </KbdGroup>
        )
      case 'label':
        return (
          <div mix={previewFieldStyle}>
            <Label for="docs-label-input">Project name</Label>
            <Input id="docs-label-input" value="radcn" />
          </div>
        )
      case 'menubar':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <Menubar>
              <MenubarMenu value="docs">
                <MenubarTrigger>Docs</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Components</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Tokens</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        )
      case 'native-select':
        return (
          <NativeSelect name="framework" style="width: min(100%, 20rem);">
            <NativeSelectOptGroup label="Frameworks">
              <NativeSelectOption selected value="remix">Remix 3</NativeSelectOption>
              <NativeSelectOption value="web">Web platform</NativeSelectOption>
            </NativeSelectOptGroup>
          </NativeSelect>
        )
      case 'navigation-menu':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem value="components">
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink href="/docs/components/button">Button</NavigationMenuLink>
                    <NavigationMenuLink href="/docs/components/dialog">Dialog</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )
      case 'pagination':
        return (
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#previous">Previous</PaginationPrevious></PaginationItem>
              <PaginationItem><PaginationLink href="#1" isActive>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#next">Next</PaginationNext></PaginationItem>
            </PaginationContent>
          </Pagination>
        )
      case 'popover':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <Popover>
              <PopoverTrigger>Open popover</PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>Install command</PopoverTitle>
                <p>Install copy is intentionally aspirational for this issue.</p>
              </PopoverContent>
            </Popover>
          </div>
        )
      case 'progress':
        return <Progress ariaLabel="Docs completion" value={72} style="width: min(100%, 24rem);" />
      case 'radio-group':
        return (
          <RadioGroup name="mode">
            <label mix={previewRowStyle}><RadioGroupItem checked name="mode" value="system" /> System</label>
            <label mix={previewRowStyle}><RadioGroupItem name="mode" value="light" /> Light</label>
            <label mix={previewRowStyle}><RadioGroupItem name="mode" value="dark" /> Dark</label>
          </RadioGroup>
        )
      case 'resizable':
        return (
          <ResizablePanelGroup style="width: min(100%, 30rem); min-height: 8rem;">
            <ResizablePanel defaultSize={60}><div mix={previewMediaStyle}>Preview</div></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40}><div mix={previewMediaStyle}>Code</div></ResizablePanel>
          </ResizablePanelGroup>
        )
      case 'scroll-area':
        return (
          <ScrollArea style="width: min(100%, 24rem); height: 9rem;">
            <ScrollAreaViewport>
              <div mix={previewStackStyle}>
                {['Accordion', 'Button', 'Dialog', 'Tabs', 'Tooltip'].map((item) => <Badge>{item}</Badge>)}
              </div>
            </ScrollAreaViewport>
            <ScrollBar><ScrollAreaThumb /></ScrollBar>
          </ScrollArea>
        )
      case 'select':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <Select defaultValue="docs" name="surface" style="width: min(100%, 22rem);">
              <SelectTrigger><SelectValue placeholder="Choose surface" /></SelectTrigger>
              <SelectContent>
                <SelectViewport>
                  <SelectItem value="docs">Docs site</SelectItem>
                  <SelectItem value="package">Package API</SelectItem>
                </SelectViewport>
              </SelectContent>
            </Select>
          </div>
        )
      case 'separator':
        return (
          <div mix={previewStackStyle}>
            <span>Preview</span>
            <Separator />
            <span>Source</span>
          </div>
        )
      case 'sheet':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <Sheet id="docs-sheet-preview">
              <SheetTrigger>Open sheet</SheetTrigger>
            </Sheet>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Component settings</SheetTitle>
                <SheetDescription>Sheet parts are package-rendered and browser-enhanced.</SheetDescription>
              </SheetHeader>
              <SheetFooter><SheetClose>Close</SheetClose></SheetFooter>
            </SheetContent>
          </div>
        )
      case 'sidebar':
        return (
          <SidebarProvider defaultOpen>
            <div mix={previewConstrainedStyle}>
              <Sidebar>
                <SidebarHeader><SidebarTrigger>Toggle</SidebarTrigger></SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Components</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem><SidebarMenuButton>Button</SidebarMenuButton></SidebarMenuItem>
                        <SidebarMenuItem><SidebarMenuButton>Dialog</SidebarMenuButton></SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
            </div>
          </SidebarProvider>
        )
      case 'skeleton':
        return (
          <div mix={previewStackStyle}>
            <Skeleton style="height: 1rem; width: 75%;" />
            <Skeleton style="height: 1rem; width: 50%;" />
          </div>
        )
      case 'slider':
        return <Slider ariaLabel="Example intensity" defaultValue={68} name="intensity" style="width: min(100%, 24rem);" />
      case 'spinner':
        return <Spinner ariaLabel="Loading docs preview" />
      case 'switch':
        return (
          <label mix={previewRowStyle}>
            <Switch checked name="notifications" />
            Enable notifications
          </label>
        )
      case 'table':
        return (
          <Table style="width: min(100%, 32rem);">
            <TableHeader>
              <TableRow><TableHead>Component</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Button</TableCell><TableCell>Ready</TableCell></TableRow>
              <TableRow><TableCell>Dialog</TableCell><TableCell>Ready</TableCell></TableRow>
            </TableBody>
          </Table>
        )
      case 'textarea':
        return <Textarea name="notes" placeholder="Write implementation notes" value="Server-rendered textareas keep native editing." style="width: min(100%, 24rem);" />
      case 'toast':
        return (
          <div mix={previewStackStyle}>
            <Button data-toast-event={createToastEvent.name}>Dispatch toast event</Button>
            <p>Use `createToastEvent` or `toast` from `radcn/toast` in browser-owned code.</p>
          </div>
        )
      case 'toggle':
        return <Toggle pressed>Bold</Toggle>
      case 'toggle-group':
        return (
          <ToggleGroup defaultValue="preview" type="multiple">
            <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
            <ToggleGroupItem value="code">Code</ToggleGroupItem>
          </ToggleGroup>
        )
      case 'tooltip':
        return (
          <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>Hover for hint</TooltipTrigger>
                <TooltipContent>Tooltips are browser-enhanced from package markup.</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )
      case 'typography':
        return (
          <div mix={previewStackStyle}>
            <TypographyLead>RadCN documentation is web-first.</TypographyLead>
            <TypographyH2>Portable primitives</TypographyH2>
            <TypographyP>Use <TypographyInlineCode>remix/ui</TypographyInlineCode> components with RadCN tokens.</TypographyP>
            <TypographyBlockquote>Keep examples honest and package-backed.</TypographyBlockquote>
            <TypographyList>
              <TypographyListItem>Server-rendered HTML</TypographyListItem>
              <TypographyListItem>Explicit browser enhancement</TypographyListItem>
            </TypographyList>
          </div>
        )
      default:
        return <DraftPreview title={title} importPath={`radcn/${slug}`} disposition="ready" />
    }
  }
}

function DraftPreview(handle: { props: { title: string; importPath: string; disposition: ComponentDisposition } }) {
  return () => {
    let { title, importPath, disposition } = handle.props
    let shipped = disposition !== 'not-shipped-yet'

    return (
      <div mix={draftPreviewStyle}>
        <strong>{title}</strong>
        <p>
          {shipped
            ? 'Unexpected fallback preview: this exported page should render an authored package example.'
            : 'This is an intended docs disposition. It is not an importable RadCN package API today.'}
        </p>
        <code>{shipped ? `import from '${importPath}'` : 'not shipped yet'}</code>
      </div>
    )
  }
}

const chartDemoLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const chartDemoSeries = [
  { name: 'desktop', label: 'Desktop', values: [186, 305, 237, 73, 209, 214] },
  { name: 'mobile', label: 'Mobile', values: [80, 200, 120, 190, 130, 140] },
]
const chartDemoConfig = {
  desktop: { color: '#2563eb', label: 'Desktop' },
  mobile: { color: '#60a5fa', label: 'Mobile' },
}

function chartExample({
  children,
  description,
  title,
}: {
  children: RemixNode
  description: string
  title: string
}) {
  return (
    <Card class="radcn-chart-example-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function ChartPreview() {
  return () => (
    <div class="radcn-chart-docs-grid">
      {chartExample({
        title: 'Default',
        description: 'Grouped bars share one dependency-free SVG coordinate system.',
        children: (
        <ChartContainer ariaLabel="Device traffic chart" config={chartDemoConfig} title="Device traffic">
          <ChartBarSeries labels={chartDemoLabels} name="desktop" series={chartDemoSeries} values={[]} />
        </ChartContainer>
        ),
      })}
      {chartExample({
        title: 'Grid',
        description: 'Grid lines are package-owned SVG marks.',
        children: (
        <ChartContainer ariaLabel="Device traffic chart with grid" config={chartDemoConfig} title="Device traffic">
          <ChartBarSeries labels={chartDemoLabels} name="desktop" series={chartDemoSeries} showGrid values={[]} />
        </ChartContainer>
        ),
      })}
      {chartExample({
        title: 'Axis',
        description: 'Month ticks are rendered as accessible server HTML/SVG.',
        children: (
        <ChartContainer ariaLabel="Device traffic chart with axis" config={chartDemoConfig} title="Device traffic">
          <ChartBarSeries labels={chartDemoLabels} name="desktop" series={chartDemoSeries} showGrid showXAxis values={[]} />
        </ChartContainer>
        ),
      })}
      {chartExample({
        title: 'Legend',
        description: 'Legend rows compose beside the chart instead of reading a Recharts payload.',
        children: (
        <ChartContainer ariaLabel="Device traffic chart with legend" config={chartDemoConfig} title="Device traffic">
          <ChartBarSeries labels={chartDemoLabels} name="desktop" series={chartDemoSeries} showGrid showXAxis values={[]} />
          <ChartLegend>
            <ChartLegendItem color="#2563eb" name="desktop">Desktop</ChartLegendItem>
            <ChartLegendItem color="#60a5fa" name="mobile">Mobile</ChartLegendItem>
          </ChartLegend>
        </ChartContainer>
        ),
      })}
      {chartExample({
        title: 'Tooltip',
        description: 'Tooltip rows are explicit RadCN content.',
        children: (
        <ChartContainer ariaLabel="Device traffic chart with tooltip" config={chartDemoConfig} title="Device traffic">
          <ChartBarSeries labels={chartDemoLabels} name="desktop" series={chartDemoSeries} showGrid showXAxis values={[]} />
          <ChartTooltip label="June">
            <ChartTooltipItem color="#2563eb" indicator="line" label="Desktop" name="desktop" value="214 visitors" />
            <ChartTooltipItem color="#60a5fa" indicator="line" label="Mobile" name="mobile" value="140 visitors" />
          </ChartTooltip>
        </ChartContainer>
        ),
      })}
      {chartExample({
        title: 'Tooltip Anatomy',
        description: 'Indicators, hidden labels, and formatted values are explicit props.',
        children: (
        <div class="radcn-chart-tooltip-demo">
          <ChartTooltip label="Page Views">
            <ChartTooltipItem color="#2563eb" indicator="dot" label="Desktop" name="desktop" value="12,486" />
            <ChartTooltipItem color="#60a5fa" indicator="dot" label="Mobile" name="mobile" value="8,420" />
          </ChartTooltip>
          <ChartTooltip hideLabel label="Browser">
            <ChartTooltipItem color="#22c55e" indicator="dashed" label="Chrome" name="chrome" value="1,286" />
          </ChartTooltip>
          <ChartTooltip label="Single metric">
            <ChartTooltipItem color="#7c3aed" indicator="line" label="Desktop" name="desktop" value="12,486" />
          </ChartTooltip>
          <ChartTooltip hideLabel label="Hidden indicator">
            <ChartTooltipItem hideIndicator label="Chrome" name="chrome" value="1,286" />
          </ChartTooltip>
        </div>
        ),
      })}
    </div>
  )
}

const chartSource = `import {
  ChartBarSeries,
  ChartContainer,
  ChartLegend,
  ChartLegendItem,
  ChartTooltip,
  ChartTooltipItem,
  type ChartConfig,
  type ChartSeries,
} from 'radcn/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'radcn/card'

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const series: ChartSeries[] = [
  { name: 'desktop', label: 'Desktop', values: [186, 305, 237, 73, 209, 214] },
  { name: 'mobile', label: 'Mobile', values: [80, 200, 120, 190, 130, 140] },
]
const config: ChartConfig = {
  desktop: { color: '#2563eb', label: 'Desktop' },
  mobile: { color: '#60a5fa', label: 'Mobile' },
}

export function ChartPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device traffic</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer ariaLabel="Device traffic chart" config={config} title="Device traffic">
          <ChartBarSeries labels={labels} name="desktop" series={series} showGrid showXAxis values={[]} />
          <ChartTooltip label="June">
            <ChartTooltipItem color="#2563eb" indicator="line" label="Desktop" name="desktop" value="214 visitors" />
            <ChartTooltipItem color="#60a5fa" indicator="line" label="Mobile" name="mobile" value="140 visitors" />
          </ChartTooltip>
          <ChartLegend>
            <ChartLegendItem color="#2563eb" name="desktop">Desktop</ChartLegendItem>
            <ChartLegendItem color="#60a5fa" name="mobile">Mobile</ChartLegendItem>
          </ChartLegend>
        </ChartContainer>
        <ChartTooltip hideLabel label="Browser">
          <ChartTooltipItem color="#22c55e" indicator="dashed" label="Chrome" name="chrome" value="1,286" />
          <ChartTooltipItem hideIndicator label="Firefox" name="firefox" value="1,000" />
        </ChartTooltip>
      </CardContent>
    </Card>
  )
}`

const richComponentDocs: ComponentDoc[] = [
  {
    slug: 'checkbox',
    title: 'Checkbox',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native checkbox primitive with explicit checked, disabled, invalid, mixed, form, label, and customization hooks.',
    importPath: 'radcn/checkbox',
    importExample: "import { Checkbox } from 'radcn/checkbox'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the three upstream Checkbox examples with labels, descriptions, disabled state, and card-like checked composition.',
        source: checkboxSource,
        preview: <CheckboxPreview />,
      },
    ],
    accessibility: [
      'Checkbox renders a native input type="checkbox", so checked, unchecked, disabled, form submission, reset, and label activation behavior stay browser-owned.',
      'Labels are real label elements wired by id/for or wrapping label composition; descriptions remain explicit app-owned markup.',
      'Invalid state maps to aria-invalid and aria-describedby when composed with Field or Form error text.',
      'Indeterminate examples use aria-checked="mixed" and data-state hooks for static server-rendered mixed state.',
    ],
    customization: [
      'Checkbox exposes data-radcn-checkbox-wrapper, data-radcn-checkbox-input, and data-radcn-checkbox-indicator hooks.',
      'Wrapper and input expose data-state for checked, unchecked, and indeterminate styling.',
      'Use class and style plus CSS variables such as --radcn-control-border, --radcn-control-bg, --radcn-control-checked-bg, --radcn-control-fg, and --radcn-control-invalid.',
      'Card-like label wrappers, description layout, hover styles, and checked parent styling remain app-owned composition.',
    ],
    divergence: [
      'defaultChecked maps to RadCN checked for server-rendered initial state; apps own later client state if they need it.',
      'className maps to class, data-slot maps to data-radcn-checkbox-* hooks, and aria-invalid maps to ariaInvalid.',
      'CheckboxPrimitive.Root, CheckboxPrimitive.Indicator, and Radix state mechanics map to a native input plus explicit RadCN props and data-state hooks.',
      'CheckIcon and lucide-react are presentation details; RadCN keeps a dependency-free package indicator that apps can restyle.',
      'Tailwind peer and has selectors map to app CSS using RadCN hooks, class, style, and CSS variables.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'button',
    title: 'Button',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native button and link primitive with RadCN variants, sizing, disabled states, and token-driven styling.',
    importPath: 'radcn/button',
    importExample: "import { Button } from 'radcn/button'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'default',
        title: 'Variants',
        description:
          'Use the same Button component for actions, secondary choices, and link-style navigation.',
        source: buttonSource,
        preview: <ButtonPreview />,
      },
    ],
    accessibility: [
      'Renders a native button by default, preserving keyboard and form behavior without client JavaScript.',
      'Renders an anchor when href is provided, so link semantics remain real links.',
      'Icon-only buttons can use ariaLabel to provide an accessible name while the icon stays decorative.',
      'Supports disabled and aria-disabled states for unavailable actions.',
    ],
    customization: [
      'The component is styled through RadCN CSS variables such as --radcn-primary, --radcn-radius, and --radcn-control-height.',
      'Variants and sizes are expressed as data attributes and class names so app-level CSS can extend the visual system.',
      'Loading buttons are plain composition: render a disabled Button with a nested Spinner.',
    ],
    divergence: [
      'The Remix 3 port does not wrap React components. It returns host elements from remix/ui and keeps behavior close to the platform.',
      'shadcn/ui asChild maps to the explicit href prop in RadCN, avoiding React Slot while preserving link semantics.',
      'Composition favors explicit props and package imports instead of a generated component copy inside the consuming app.',
    ],
  },
  {
    slug: 'button-group',
    title: 'Button Group',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A grouped control primitive for joined buttons, split actions, nested toolbars, and form-control compositions.',
    importPath: 'radcn/button-group',
    importExample:
      "import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from 'radcn/button-group'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Compose nested groups, split buttons, inputs, selects, dropdowns, popovers, separators, and size variants with package primitives.',
        source: buttonGroupSource,
        preview: <ButtonGroupPreview />,
      },
    ],
    accessibility: [
      'ButtonGroup renders role="group" and supports ariaLabel or ariaLabelledby for grouped icon controls.',
      'Icon-only actions use Button ariaLabel while visual glyphs remain presentation.',
      'DropdownMenu, Popover, Select, Tooltip, Input, and InputGroup keep their own accessible roles and labels when composed inside ButtonGroup.',
    ],
    customization: [
      'ButtonGroup exposes data-radcn-button-group and data-orientation hooks for horizontal and vertical layouts.',
      'Nested ButtonGroups keep visible spacing between child groups while inner controls stay joined.',
      'ButtonGroupSeparator and ButtonGroupText remain token-driven parts for split actions and inline metadata.',
      'Input, InputGroup, Select, DropdownMenu trigger, and Popover trigger composition can be styled through the existing public RadCN hooks.',
    ],
    divergence: [
      'shadcn/ui examples use React asChild for overlay triggers. RadCN maps that to explicit DropdownMenuTrigger and PopoverTrigger components.',
      'React useState examples map to server-provided defaults, native submitted values, route state, or app-owned dependency-free enhancement.',
      'ButtonGroup is a layout primitive; it composes controls but does not own select, menu, popover, tooltip, or input state.',
    ],
  },
  {
    slug: 'input-group',
    title: 'Input Group',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A control shell for inputs, textareas, addons, inline actions, toolbar rows, and composed overlay triggers.',
    importPath: 'radcn/input-group',
    importExample:
      "import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from 'radcn/input-group'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Compose buttons, ButtonGroup, dropdowns, popovers, tooltips, spinners, labels, text addons, and textarea toolbars with the InputGroup primitive.',
        source: inputGroupSource,
        preview: <InputGroupPreview />,
      },
    ],
    accessibility: [
      'InputGroup renders role="group" and supports ariaLabel or ariaLabelledby for grouped controls.',
      'InputGroupInput preserves native input semantics, including email, password, URL, tel, and text types.',
      'Icon-only InputGroupButton actions use ariaLabel so decorative glyphs do not become the only accessible name.',
      'Labels, tooltips, dropdowns, popovers, spinners, and separators keep their own RadCN semantics when composed inside addons.',
    ],
    customization: [
      'InputGroup exposes data-radcn-input-group, addon alignment hooks, input/textarea control hooks, and button size hooks.',
      'Inline addons, block addons, and toolbar rows are token-driven and can be extended with app CSS.',
      'Autosizing textarea behavior is app-owned. Use InputGroupTextarea or a custom control that follows the documented control hook.',
      'Icon packages are presentation choices; examples can use inline SVG, text glyphs, or app icons without changing InputGroup.',
    ],
    divergence: [
      'shadcn/ui asChild trigger examples map to explicit RadCN PopoverTrigger, DropdownMenuTrigger, and TooltipTrigger components.',
      'React useState and useCopyToClipboard examples map to server/default state, native submitted values, route state, or app-owned browser enhancement.',
      'react-textarea-autosize is not a RadCN package dependency; textarea autosize remains optional app behavior.',
      'InputGroup is a layout and control-shell primitive. It composes other RadCN primitives but does not own clipboard, favorite, menu, popover, tooltip, spinner, label, separator, or autosize state.',
    ],
  },
  {
    slug: 'input-otp',
    title: 'Input OTP',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A one-time-code input primitive that keeps a real native value while mirroring characters into visible slots.',
    importPath: 'radcn/input-otp',
    importExample:
      "import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'radcn/input-otp'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the four upstream Input OTP examples with RadCN slots, separators, patterns, and app-owned display state.',
        source: inputOTPSource,
        preview: <InputOTPPreview />,
      },
    ],
    accessibility: [
      'InputOTP renders a native text input with autocomplete="one-time-code", maxLength, name, required, disabled, and invalid state.',
      'Visible slots mirror the native input value while the native input remains the form and accessibility owner.',
      'InputOTPSeparator renders role="separator" for grouped visual code layouts.',
      'Keyboard movement, paste filtering, form submission, and reset behavior stay native-input based.',
    ],
    customization: [
      'InputOTP exposes public data-radcn-input-otp hooks for root, native input, slots container, groups, slots, caret, and separators.',
      'Use class for the input and containerClass for the visible slot shell; style and CSS variables remain app-owned extension points.',
      'REGEXP_ONLY_DIGITS_AND_CHARS is exported by RadCN and maps to dependency-free native pattern filtering.',
      'Controlled entered-value display text is app-owned browser/server state layered around the native value and radcn-input-otp-change event.',
    ],
    divergence: [
      'React useState, value, and onChange examples map to explicit RadCN props, native input events, radcn-input-otp-change, or app-owned state.',
      'The upstream input-otp package and OTPInput context are not RadCN dependencies; RadCN implements the required behavior with a native input and slots.',
      'lucide-react separator icons are app-owned presentation; InputOTPSeparator works without icon dependencies.',
      'Tailwind utilities map to class, containerClass, style, CSS variables, and app-authored CSS.',
      'className maps to class, containerClassName maps to containerClass, data-slot maps to data-radcn-input-otp-* hooks, and vendor source remains read-only evidence.',
      'input-otp-form and otp-* block recipes are adjacent form/block evidence rather than part of this four-example cluster.',
    ],
  },
  {
    slug: 'native-select',
    title: 'Native Select',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A token-driven wrapper around browser-native select, option, and optgroup elements.',
    importPath: 'radcn/native-select',
    importExample:
      "import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from 'radcn/native-select'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the four upstream Native Select examples with real select, option, and optgroup markup.',
        source: nativeSelectSource,
        preview: <NativeSelectPreview />,
      },
    ],
    accessibility: [
      'NativeSelect renders a real select element, so keyboard, pointer, value, form, reset, and constraint-validation behavior stay browser-owned.',
      'NativeSelectOption renders option and NativeSelectOptGroup renders optgroup for native option grouping semantics.',
      'Disabled and invalid states map to the select disabled attribute and aria-invalid attribute.',
      'Labels and error text stay composed with RadCN Label, Field, and FieldError rather than becoming Native Select-owned state.',
    ],
    customization: [
      'NativeSelect exposes data-radcn-native-select-wrapper, data-radcn-native-select, data-radcn-native-select-icon, data-radcn-native-select-option, and data-radcn-native-select-optgroup hooks.',
      'Use class and style on the wrapper plus CSS variables such as --radcn-native-select-border, --radcn-native-select-bg, --radcn-native-select-fg, and --radcn-native-select-invalid.',
      'The size prop supports default and sm sizes while native option popup chrome remains browser-owned.',
      'Option and optgroup Canvas colors map to package CSS using Canvas and CanvasText.',
    ],
    divergence: [
      'React props and state examples map to explicit RadCN props and browser-native select state.',
      'className maps to class, data-slot maps to data-radcn-native-select-* hooks, aria-invalid maps to ariaInvalid, and disabled maps to disabled.',
      'ChevronDownIcon and lucide-react are app-owned presentation; RadCN keeps a dependency-free decorative icon span.',
      'Tailwind utilities map to RadCN classes, CSS variables, and app-authored CSS.',
      'Browser-native option popup rendering is intentionally not forced into DOM parity.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'resizable',
    title: 'Resizable',
    category: 'Composite',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A dependency-free split-panel primitive with semantic handles, keyboard resizing, pointer resizing, and nested group support.',
    importPath: 'radcn/resizable',
    importExample:
      "import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from 'radcn/resizable'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the four upstream Resizable examples with nested groups, grip handles, and horizontal or vertical panel layouts.',
        source: resizableSource,
        preview: <ResizablePreview />,
      },
    ],
    accessibility: [
      'ResizableHandle renders role="separator" and enhancement adds aria-orientation, aria-valuemin, aria-valuemax, and aria-valuenow.',
      'Keyboard resizing uses arrow keys, Home, End, and Shift-modified larger steps without requiring React state.',
      'Pointer resizing and keyboard resizing both emit radcn-resizable-change for app-owned state or persistence.',
      'Nested ResizablePanelGroup instances enhance independently so each handle owns only its direct sibling panels.',
    ],
    customization: [
      'Resizable exposes data-radcn-resizable-panel-group, data-radcn-resizable-panel, data-radcn-resizable-handle, and data-radcn-resizable-handle-grip hooks.',
      'Use class and style plus CSS variables such as --radcn-resizable-border, --radcn-resizable-bg, --radcn-resizable-panel-bg, --radcn-resizable-handle-bg, and --radcn-resizable-grip-bg.',
      'Panel content remains app-owned composition; RadCN owns the panel, handle, orientation, sizing, and enhancement hooks.',
      'withHandle toggles a dependency-free decorative grip without pulling icon packages into RadCN.',
    ],
    divergence: [
      'react-resizable-panels mechanics map to RadCN dependency-free enhanceResizable behavior and explicit host-element props.',
      'defaultSize, minSize, orientation, and withHandle map to explicit RadCN props.',
      'className maps to class, data-slot maps to data-radcn-resizable-* hooks, and Tailwind utilities map to class, style, CSS variables, and app CSS.',
      'GripVerticalIcon and lucide-react are app-owned presentation; RadCN uses a dependency-free decorative grip.',
      'Nested panel groups are supported as independent groups rather than relying on React context from upstream.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'badge',
    title: 'Badge',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A compact label primitive for status, metadata, filters, and links.',
    importPath: 'radcn/badge',
    importExample: "import { Badge } from 'radcn/badge'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the four upstream Badge examples with app-owned icon and count presentation.',
        source: badgeSource,
        preview: <BadgePreview />,
      },
    ],
    accessibility: [
      'Renders a span for plain metadata and an anchor when href is supplied.',
      'Keeps the visible text as the accessible name for both static and linked badges.',
      'Avoids client behavior, so status labels remain available in server-rendered HTML.',
    ],
    customization: [
      'Variants are exposed as classes and data-variant attributes for app-level extension.',
      'Badge colors inherit the RadCN token set, including destructive, secondary, and outline surfaces.',
      'Icon and count/pill badge presentation remains app-owned children, class, style, and CSS variable composition.',
    ],
    divergence: [
      'The Remix 3 badge is a host element component, not a React slot wrapper.',
      'RadCN keeps link behavior explicit with href rather than forwarding arbitrary React children through asChild.',
      'shadcn className maps to RadCN class, data-slot="badge" maps to data-radcn-badge plus data-variant, and React prop spreading maps to explicit Remix UI props.',
      'Tailwind utility styling maps to RadCN classes, style, CSS variables, and app CSS; lucide-react icons are app-owned presentation and not Badge dependencies.',
    ],
  },
  {
    slug: 'combobox',
    title: 'Combobox',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A searchable listbox primitive for command-style selection, native form values, and composed popover, menu, and drawer examples.',
    importPath: 'radcn/combobox',
    importExample:
      "import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger } from 'radcn/combobox'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the four upstream Combobox examples through RadCN primitives and app-owned composition.',
        source: comboboxSource,
        preview: <ComboboxPreview />,
      },
    ],
    accessibility: [
      'ComboboxInput receives role="combobox", aria-expanded, aria-controls, aria-autocomplete, and aria-activedescendant during enhancement.',
      'ComboboxList renders role="listbox" and ComboboxItem renders role="option" with aria-selected and aria-disabled state.',
      'Keyboard navigation covers Arrow keys, Home, End, Enter, Escape, Tab, and disabled option skipping.',
      'Native hidden inputs preserve selected values for server actions and form submissions when name is supplied.',
    ],
    customization: [
      'Combobox exposes public data-radcn-combobox hooks for root, input, trigger, portal, content, list, group, label, item, empty state, clear button, and chips.',
      'Popover, DropdownMenu, Drawer, Command, and Button remain separate primitives that can be composed around Combobox examples.',
      'Selected labels, row badges, responsive branch selection, and icon choices are app-owned presentation and state.',
      'Tailwind width, padding, flex, and responsive utilities map to RadCN classes, class, style, CSS variables, CSS breakpoints, or small dependency-free browser enhancement.',
    ],
    divergence: [
      'shadcn React useState and onSelect map to RadCN package-owned selection behavior for Combobox and app-owned browser/server state for composed labels.',
      'Button asChild maps to explicit ComboboxTrigger, PopoverTrigger, DropdownMenuTrigger, and DrawerTrigger components.',
      'Upstream Command, Popover, DropdownMenu, and Drawer examples map to RadCN package imports without making them Combobox package dependencies.',
      'useMediaQuery maps to CSS breakpoints or dependency-free enhancement; lucide-react icons remain app-owned presentation.',
      'className maps to class, data-slot maps to data-radcn-* hooks, and vendor source remains read-only evidence.',
      'combobox-form is adjacent Form/Combobox evidence because its React Hook Form, Zod, Sonner, and validation mechanics belong to form composition.',
    ],
  },
  {
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    category: 'Overlays',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A menu overlay primitive for grouped commands, submenus, checkable items, radio choices, and app-owned cross-component actions.',
    importPath: 'radcn/dropdown-menu',
    importExample:
      "import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'radcn/dropdown-menu'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the four upstream Dropdown Menu examples through RadCN primitives and app-owned composition.',
        source: dropdownMenuSource,
        preview: <DropdownMenuPreview />,
      },
    ],
    accessibility: [
      'DropdownMenuTrigger receives aria-haspopup, aria-controls, aria-expanded, and keyboard opening behavior during enhancement.',
      'DropdownMenuContent renders role="menu", with menuitem, menuitemcheckbox, and menuitemradio roles on interactive items.',
      'Keyboard behavior covers Enter, Space, Arrow keys, Home, End, Escape, Tab, typeahead, submenu navigation, and disabled item skipping.',
      'Dropdown Menu is non-modal in RadCN and does not lock body scroll; Dialog composition owns modal focus and scroll behavior separately.',
    ],
    customization: [
      'DropdownMenu exposes public data-radcn-dropdown-menu hooks for root, trigger, portal, content, labels, groups, items, shortcuts, separators, checkbox items, radio groups, and submenus.',
      'Checkbox and radio persistence, menu-to-dialog effects, and form values remain app-owned state rather than package-global callbacks.',
      'Dialog, Field, Input, Textarea, Label, Button, and icon presentation remain separate composition surfaces.',
      'Tailwind width, padding, flex, and alignment utilities map to RadCN classes, class, style, CSS variables, or small dependency-free browser enhancement.',
    ],
    divergence: [
      'React useState, onCheckedChange, onValueChange, and onSelect map to explicit RadCN props, server/route state, or app-owned browser enhancement.',
      'modal={false} maps to RadCN Dropdown Menu non-modal behavior; Dialog remains the modal owner when composed from a menu item.',
      'Button asChild maps to explicit DropdownMenuTrigger styling and composition rather than React Slot semantics.',
      'lucide-react icons are app-owned presentation; Radix primitive types are read-only upstream evidence and not RadCN dependencies.',
      'className maps to class, data-slot maps to data-radcn-* hooks, and vendor source remains read-only evidence.',
    ],
  },
  {
    slug: 'chart',
    title: 'Chart',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'Dependency-free SVG chart primitives for grouped bars, grid lines, axis ticks, legends, and explicit tooltip content.',
    importPath: 'radcn/chart',
    importExample:
      "import { ChartBarSeries, ChartContainer, ChartLegend, ChartTooltip } from 'radcn/chart'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'component-examples',
        title: 'Component Examples',
        description:
          'Render the six shadcn Chart component examples as Remix 3-native SVG and explicit content composition.',
        source: chartSource,
        preview: <ChartPreview />,
      },
    ],
    accessibility: [
      'ChartContainer renders a named figure with role="img", visible title text, and optional description wiring.',
      'Bars, ticks, grid lines, legends, and tooltips are server-rendered SVG/HTML, so the chart is inspectable without client JavaScript.',
      'Tooltip content is authored explicitly, which keeps labels and values visible to assistive technology instead of depending on a hover payload.',
    ],
    customization: [
      'ChartContainer config writes chart-scoped CSS variables, so multiple series can share stable colors across bars, legends, and tooltips.',
      'ChartBarSeries supports grouped multi-series bars, optional grid lines, optional x-axis ticks, and the existing single-series values API.',
      'ChartTooltipItem supports dot, line, dashed, and hidden indicators with public data hooks for app CSS.',
      'Charts compose naturally inside Card, CardHeader, CardContent, and CardFooter without making Card a Chart dependency.',
    ],
    divergence: [
      'RadCN does not depend on Recharts. Recharts ResponsiveContainer maps to SVG viewBox sizing and RadCN CSS constraints.',
      'React payload objects, formatter callbacks, and chart context map to explicit props, formatted values, and app-owned state.',
      'lucide icons and upstream callout SVGs are presentation choices for apps, not Chart package dependencies.',
      'The 70 chart gallery examples remain unresolved and will be implemented family by family after the component example surface is stable.',
    ],
  },
  {
    slug: 'item',
    title: 'Item',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A flexible row primitive for media, title, description, metadata, actions, linked rows, grouped lists, and composed menu content.',
    importPath: 'radcn/item',
    importExample:
      "import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from 'radcn/item'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Compose avatar rows, linked rows, dropdown menu rows, grouped lists, header image cards, icon media, image media, sizes, and variants with package primitives.',
        source: itemSource,
        preview: <ItemPreview />,
      },
    ],
    accessibility: [
      'ItemGroup renders role="list" and Item renders role="listitem" so grouped rows have list semantics in server HTML.',
      'Linked Items keep the Item row wrapper as the listitem and render a native nested anchor through href, target, rel, and rmxDocument.',
      'Icon-only actions remain Button responsibilities and should use ariaLabel for accessible names.',
      'Avatar, DropdownMenu, Button, and Separator keep their own accessible semantics when composed inside Item.',
    ],
    customization: [
      'Item exposes public row, link, media, content, title, description, actions, header, footer, separator, size, and variant hooks.',
      'Use ItemMedia variant="icon" or variant="image" for visual affordances while keeping icon and image sources app-owned.',
      'Secondary metadata can be another ItemContent block beside the primary content, matching upstream duration and detail rows.',
      'Grouped rows, separators, card-like headers, and action clusters are composition over the same package parts.',
    ],
    divergence: [
      'shadcn/ui Item examples use asChild and Radix Slot for link rows; RadCN maps those to an explicit href API with a row wrapper plus native anchor.',
      'React fragments and arrays map to server-rendered repeated rows or app-owned data mapping outside the Item package.',
      'Next Image and remote image URLs are not RadCN dependencies; docs use native img elements and local WebP assets.',
      'Lucide and other icon packages are presentation choices for consuming apps, not Item package requirements.',
      'Item remains a layout/content primitive and does not own dropdown, avatar, button, separator, image loading, icon, or repeated-list state.',
    ],
  },
  {
    slug: 'kbd',
    title: 'Kbd',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'Semantic keyboard shortcut primitives for single keys, grouped chords, inline prose, and composed control hints.',
    importPath: 'radcn/kbd',
    importExample: "import { Kbd, KbdGroup } from 'radcn/kbd'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render Button, demo, inline group, InputGroup, and Tooltip shortcut examples with package primitives and app-owned presentation glyphs.',
        source: kbdSource,
        preview: <KbdPreview />,
      },
    ],
    accessibility: [
      'Kbd renders a semantic kbd element for individual keys and shortcut labels.',
      'KbdGroup groups related shortcut pieces without taking over button, input, or tooltip behavior.',
      'Search icons and other decorative glyphs should use aria-hidden when they do not provide the control name.',
      'Button, ButtonGroup, InputGroup, and Tooltip keep their native roles and labels when composed with Kbd.',
    ],
    customization: [
      'Kbd exposes data-radcn-kbd and the radcn-kbd class for app-level size, border, background, and text styling.',
      'KbdGroup exposes data-radcn-kbd-group and the radcn-kbd-group class for chord layout and inline composition.',
      'Shortcut separators such as plus signs are authored content around Kbd rather than package behavior.',
      'TooltipContent and InputGroup addons can style nested Kbd elements through their own public hooks, classes, and CSS variables.',
    ],
    divergence: [
      'shadcn/ui data-slot="kbd" and data-slot="kbd-group" map to RadCN public data-radcn-kbd and data-radcn-kbd-group hooks.',
      'Tailwind utility and tooltip-context styling maps to RadCN classes, inline styles, and app CSS variables.',
      'lucide icons are app presentation choices; RadCN Kbd examples use app-owned spans or inline SVGs instead of adding an icon dependency.',
      'TooltipTrigger asChild maps to explicit RadCN TooltipTrigger composition, avoiding Radix Slot while preserving visible trigger behavior.',
      'Kbd does not own Button, ButtonGroup, InputGroup, Tooltip, command palette, icon-package, or shortcut-routing state.',
    ],
  },
  {
    slug: 'input',
    title: 'Input',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native input primitive for text, email, file, label, helper text, and button composition.',
    importPath: 'radcn/input',
    importExample: "import { Input } from 'radcn/input'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the six plain shadcn Input examples with native Remix 3 controls and explicit RadCN composition.',
        source: inputSource,
        preview: <InputPreview />,
      },
    ],
    accessibility: [
      'Renders native input elements, preserving browser focus, editing, file picker, and form submission behavior.',
      'Supports aria-describedby and aria-invalid for field help and validation state through explicit string props.',
      'Leaves labeling to real Label components and native label elements so accessible names stay explicit.',
      'File inputs do not use role="textbox"; they keep browser-native file input semantics.',
    ],
    customization: [
      'Input dimensions, borders, focus rings, placeholder color, disabled state, and file selector styling are controlled by RadCN CSS variables.',
      'The public data-radcn-input hook supports targeted app CSS without relying on generated DOM wrappers.',
      'Button and Label composition stays outside the Input package, so layout and submission behavior remain app-owned.',
    ],
    divergence: [
      'The Remix 3 input uses explicit string props such as ariaDescribedBy instead of React prop aliases.',
      'It keeps a deliberate typed native input surface instead of forwarding arbitrary React ComponentProps.',
      'Label, Button, helper text, and form state are explicit composition, not Input-owned behavior.',
    ],
  },
  {
    slug: 'textarea',
    title: 'Textarea',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native textarea primitive for multi-line text input, disabled states, labels, helper text, and button composition.',
    importPath: 'radcn/textarea',
    importExample: "import { Textarea } from 'radcn/textarea'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the five plain shadcn Textarea examples with native Remix 3 controls and explicit RadCN composition.',
        source: textareaSource,
        preview: <TextareaPreview />,
      },
    ],
    accessibility: [
      'Renders a native textarea element, preserving browser focus, editing, selection, resize, and form submission behavior.',
      'Supports ariaDescribedBy and ariaInvalid for helper text and validation state through explicit string props.',
      'Leaves labeling to real Label components and helper text to authored content so accessible names and descriptions stay explicit.',
      'Disabled textareas use the native disabled attribute and public RadCN disabled styling.',
    ],
    customization: [
      'Textarea dimensions, borders, focus rings, placeholder color, disabled state, invalid state, and resize behavior are controlled by RadCN CSS variables and app CSS.',
      'The public data-radcn-textarea hook supports targeted app CSS without relying on generated DOM wrappers.',
      'Button, Label, helper text, Field, Form, and InputGroup composition stay outside the Textarea package, so layout and submission behavior remain app-owned.',
    ],
    divergence: [
      'shadcn/ui data-slot="textarea" maps to RadCN public data-radcn-textarea and the radcn-textarea class.',
      'Tailwind utility styling maps to RadCN classes, inline styles, CSS variables, and docs/fixture layout wrappers.',
      'React prop spreading maps to explicit Remix UI props such as id, name, placeholder, disabled, rows, value, ariaDescribedBy, and ariaInvalid.',
      'Autosize behavior, form-library integration, toast results, and icon presentation are app-owned or covered by Field, Form, and InputGroup rather than Textarea-owned dependencies.',
    ],
  },
  {
    slug: 'field',
    title: 'Field',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'Reusable field layout primitives for labels, descriptions, errors, fieldsets, grouped controls, separators, titles, and responsive rows.',
    importPath: 'radcn/field',
    importExample:
      "import { Field, FieldLabel, FieldSet, FieldLegend, FieldGroup, FieldContent } from 'radcn/field'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'workspace-settings',
        title: 'Workspace Settings',
        description:
          'Compose input, textarea, select, switch, checkbox, radio, slider, grouped sections, responsive rows, and choice cards with Field primitives.',
        source: fieldSource,
        preview: <FieldPreview />,
      },
    ],
    accessibility: [
      'FieldLabel renders a real label, FieldSet renders fieldset, and FieldLegend renders legend so grouped controls keep platform semantics.',
      'Field orientation is represented with data-orientation and CSS classes; it does not change form submission or accessible naming.',
      'Descriptions, errors, and titles are explicit content elements that apps wire to controls with native IDs and ARIA attributes when needed.',
    ],
    customization: [
      'Field parts expose data-radcn-field, field-label, field-set, field-legend, field-group, field-content, field-title, field-description, field-error, and field-separator hooks.',
      'Vertical, horizontal, responsive, and choice-card layouts are token-driven CSS hooks, so apps can restyle spacing and borders without replacing primitives.',
      'Field composes with existing input, textarea, select, checkbox, radio, switch, slider, and button primitives instead of owning control state.',
    ],
    divergence: [
      'shadcn/ui Field examples use React composition and, for slider value text, React state. RadCN maps this to native controls, server defaults, and optional app-owned browser enhancement.',
      'radcn/field owns reusable layout and grouping primitives. radcn/form remains the explicit server/action wiring API for submitted forms and validation messages.',
      'RadCN does not require DOM equivalence with shadcn/ui; parity is visual behavior, accessibility, and author-facing modifiability with Remix 3 host elements.',
    ],
  },
  {
    slug: 'form',
    title: 'Form',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native form and field wiring surface for labels, controls, descriptions, messages, server errors, and browser validation.',
    importPath: 'radcn/form',
    importExample:
      "import { Form, FormField, FormLabel, FormDescription, FormMessage } from 'radcn/form'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'server-error',
        title: 'Server Error',
        description:
          'Wire IDs and ARIA explicitly so native controls, server errors, and RadCN styling agree before hydration.',
        source: formSource,
        preview: <FormPreview />,
      },
      {
        slug: 'control-clusters',
        title: 'Control Clusters',
        description:
          'Compose select, radio, checkbox, switch, and textarea fields without adopting a package-level form-state library.',
        source: formControlsSource,
        preview: <FormControlsPreview />,
      },
      {
        slug: 'complex-and-array',
        title: 'Complex and Array Fields',
        description:
          'Represent repeated values, password strength, and multi-section forms as native controls and app-owned state.',
        source: formComplexSource,
        preview: <FormComplexPreview />,
      },
    ],
    accessibility: [
      'Renders a native form element, so browser validation and submission work without client JavaScript.',
      'Provides deterministic ID helpers for control, description, and message elements.',
      'Uses aria-describedby and aria-invalid on the actual form control instead of relying on hidden context.',
    ],
    customization: [
      'Form parts expose data-radcn-form, data-radcn-form-field, data-radcn-form-label, data-radcn-form-description, and data-radcn-form-message hooks.',
      'Invalid color and sizing inherit existing RadCN field tokens, including --radcn-field-error and --radcn-form-width.',
      'Select, checkbox, radio, switch, textarea, repeated fields, and password-strength examples use existing package primitives and native control hooks.',
    ],
    divergence: [
      'shadcn/ui form is a React Hook Form adapter around context, Controller, Slot, and useFormState. RadCN does not port those React-only mechanics.',
      'The Remix 3 port makes field wiring explicit through helpers and native attributes so server actions, native validation, and future enhancement can share the same markup.',
      'Schema validation and form-state libraries remain app choices rather than RadCN package dependencies.',
      'The upstream RHF, TanStack Form, Formisch, and Next examples map to behavior clusters in RadCN docs rather than one dependency-specific example per library.',
    ],
  },
  {
    slug: 'date-picker',
    title: 'Date Picker',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A package-backed date picker that composes RadCN button, popover, calendar, preset select, and native form submission.',
    importPath: 'radcn/date-picker',
    importExample: "import { DatePicker } from 'radcn/date-picker'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'single-presets-range',
        title: 'Single, Presets, and Range',
        description:
          'Render the three upstream Date Picker examples with single, preset, and range behavior while keeping ISO values and native forms explicit.',
        source: datePickerSource,
        preview: <DatePickerPreview />,
      },
    ],
    accessibility: [
      'Uses a native button trigger, popover content, and calendar grid semantics inherited from RadCN primitives.',
      'Stores submitted values in a native hidden input when name is provided.',
      'Supports disabled trigger state and required hidden inputs for form participation.',
    ],
    customization: [
      'Exposes data-radcn-date-picker, data-radcn-date-picker-label, data-radcn-date-picker-preset-select, and existing calendar/popover hooks.',
      'Uses ISO string values so apps can format labels, persist values, and validate dates without adopting a package-level date library.',
      'Use class and style plus Date Picker, Calendar, and Popover CSS variables for widths, spacing, borders, and calendar presentation.',
    ],
    divergence: [
      'shadcn/ui presents date picker as examples rather than a standalone ui component. RadCN promotes the composition into a package API so the product has an importable Date Picker surface.',
      'RadCN does not depend on React state, external calendar/date formatting packages, or slot wrappers. The browser enhancer updates labels, hidden inputs, presets, and range state from platform events.',
      'React useState and onSelect map to explicit DatePicker props, Calendar events, hidden input values, and app/server-owned state.',
      'date-fns format and addDays map to ISO values, deterministic DatePicker labels, and explicit preset values.',
      'react-day-picker DateRange maps to YYYY-MM-DD..YYYY-MM-DD range strings.',
      'defaultMonth maps to month, numberOfMonths maps to numberOfMonths, className maps to class, and asChild maps to explicit DatePicker trigger composition.',
      'CalendarIcon and lucide-react are app-owned presentation; RadCN keeps a dependency-free trigger icon span.',
      'Tailwind utilities map to RadCN classes, class, style, CSS variables, and app CSS.',
      'Popover and Calendar composition remains package-owned coordination over existing RadCN primitives.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'data-table',
    title: 'Data Table',
    category: 'Blocks',
    kind: 'block',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A package-backed Data Table composition for sortable, filterable, selectable, paginated, and action-oriented table screens.',
    importPath: 'radcn/data-table',
    importExample:
      "import { DataTable, DataTableContent, DataTableToolbar } from 'radcn/data-table'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'native-table-workflow',
        title: 'Native Table Workflow',
        description:
          'Compose native filter forms, sortable links, selection checkboxes, pagination, row actions, and detail panels with package-owned Data Table slots.',
        source: dataTableSource,
        preview: <DataTablePreview />,
      },
    ],
    accessibility: [
      'Keeps the core output as a semantic table with captions, table headers, table rows, and table cells.',
      'Uses aria-sort on sortable header cells and real links/forms for server-owned filtering, sorting, and pagination.',
      'Selection is represented by native checkbox controls and visible summary text rather than hidden client state.',
    ],
    customization: [
      'Exposes data-radcn-data-table, toolbar, filter, column-controls, content, row, selection-summary, pagination, row-actions, detail, and empty hooks.',
      'Data operations remain explicit in route state, query strings, and submitted form values so apps can use any data layer.',
    ],
    divergence: [
      'shadcn/ui demonstrates Data Table with React state and TanStack Table. RadCN ships composition slots, not a React table engine.',
      'Column visibility, sorting, filtering, pagination, row editing, and row actions are app-owned controls built from native forms, links, and existing RadCN primitives.',
      'Dashboard-only drag/reorder and chart detail patterns stay as recipe/block composition until a later experiment proves a reusable package behavior is needed.',
    ],
  },
  {
    slug: 'dialog',
    title: 'Dialog',
    category: 'Overlays',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A modal dialog primitive with trigger, content, title, description, footer, and dismiss controls.',
    importPath: 'radcn/dialog',
    importExample:
      "import { Dialog, DialogContent, DialogTrigger } from 'radcn/dialog'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'open-preview',
        title: 'Open Preview',
        description:
          'The docs render the package dialog parts in an open static preview while browser enhancement owns runtime focus behavior.',
        source: dialogSource,
        preview: <DialogPreview />,
      },
    ],
    accessibility: [
      'Enhanced dialogs assign dialog roles, aria-labelledby, aria-describedby, focus movement, Escape handling, and scroll locking.',
      'Titles and descriptions are separate parts so accessible relationships can be created when enhanced.',
      'Dismiss buttons are native buttons and remain visible in the server-rendered markup.',
    ],
    customization: [
      'Overlay, content, header, footer, title, description, trigger, and close parts all expose RadCN classes and data hooks.',
      'Use CSS variables and part classes to tune surface, shadow, radius, and spacing without replacing the primitive.',
    ],
    divergence: [
      'RadCN separates server markup from browser enhancement through enhanceDialog instead of depending on React state.',
      'The docs preview pins the dialog content into the page so users can inspect styling without opening a real modal.',
    ],
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    category: 'Composite',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A tablist, trigger, and panel set for switching between related sections of content.',
    importPath: 'radcn/tabs',
    importExample:
      "import { Tabs, TabsContent, TabsList, TabsTrigger } from 'radcn/tabs'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'preview-and-code',
        title: 'Preview and Code',
        description:
          'Tabs model the preview/code pattern the docs site will use broadly for component examples.',
        source: tabsSource,
        preview: <TabsPreview />,
      },
    ],
    accessibility: [
      'Enhanced tabs apply tab, tabpanel, aria-selected, aria-controls, and keyboard roving focus behavior.',
      'Triggers are native buttons and panels are real content regions.',
      'Supports horizontal and vertical orientation plus automatic or manual activation modes.',
    ],
    customization: [
      'List, trigger, and content parts expose stable RadCN classes and data-state values.',
      'Orientation and active state can be styled through public data attributes and tokens.',
    ],
    divergence: [
      'RadCN tabs use browser enhancement for selection and keyboard behavior instead of React component state.',
      'Server markup remains readable and package-owned, while interactive selection is attached explicitly by enhanceTabs.',
    ],
  },
  {
    slug: 'sonner',
    title: 'Sonner',
    category: 'Feedback',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A notification surface for rendering queued toasts and browser-triggered toast events.',
    importPath: 'radcn/sonner',
    importExample: "import { Toaster } from 'radcn/sonner'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'static-toasts',
        title: 'Static Toasts',
        description:
          'Render initial notifications from package data and let browser enhancement handle future toast events.',
        source: sonnerSource,
        preview: <SonnerPreview />,
      },
    ],
    accessibility: [
      'Renders a named notification region containing list items with status or alert roles.',
      'Toast urgency controls aria-live politeness through the toast type.',
      'Dismiss controls are native buttons when a toast is dismissible.',
    ],
    customization: [
      'Toast position, type, action, and dismissibility are data-driven through Toaster props.',
      'The list, toast, icon, body, title, description, action, and dismiss parts expose stable classes and data hooks.',
    ],
    divergence: [
      'RadCN keeps the event bridge explicit with enhanceToaster and the RadCN toast event instead of React context.',
      'Initial toasts can be server-rendered, while later notifications are appended by browser enhancement.',
    ],
  },
  {
    slug: 'toast',
    title: 'Toast Event Helper',
    category: 'Helpers',
    kind: 'helper',
    disposition: 'helper',
    status: 'ready',
    summary:
      'A browser-owned event helper for dispatching RadCN toasts rendered by the package Toaster.',
    importPath: 'radcn/toast',
    importExample: "import { createToastEvent, toast } from 'radcn/toast'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'deprecated-toast-parity',
        title: 'Deprecated Toast Parity',
        description:
          'Map the five deprecated shadcn toast examples to RadCN browser events, Toaster data, actions, and error type semantics.',
        source: toastSource,
        preview: <ToastPreview />,
      },
    ],
    accessibility: [
      'Toaster renders a named notification region while each toast uses status or alert roles based on type.',
      'Description-only payloads are valid, so simple notifications do not need a synthetic title.',
      'Destructive shadcn variants map to RadCN type: "error", which uses alert semantics and assertive live-region behavior.',
      'Toast actions render as focused links with data-radcn-toast-action; richer controls stay app-owned composition.',
    ],
    customization: [
      'createToastEvent and toast dispatch RADCN_TOAST_EVENT payloads from browser-owned code.',
      'Button triggers use native attributes such as data-radcn-toast-trigger, data-toast-title, data-toast-description, data-toast-action-label, data-toast-action-url, and data-toast-type.',
      'ToastAction maps to actionLabel and actionUrl, while useToast maps to explicit toast(), createToastEvent(), data triggers, or server-rendered Toaster state.',
      'data-slot and Tailwind utility styling map to RadCN public hooks, classes, CSS variables, and app layout wrappers.',
    ],
    divergence: [
      'Current upstream sonner examples are tracked separately from the deprecated toast example cluster.',
      'RadCN toast does not depend on React, Sonner, lucide, next-themes, Tailwind, Radix toast internals, or vendor source.',
      'React click handlers map to native Button/form behavior plus browser enhancement rather than React context.',
      'Server-rendered initial notifications belong to Toaster data; later notifications append through the explicit browser event helper.',
    ],
  },
  {
    slug: 'breadcrumb',
    title: 'Breadcrumb',
    category: 'Navigation',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native breadcrumb navigation primitive with linked ancestors, current-page semantics, separators, ellipsis, and composed menu or drawer branches.',
    importPath: 'radcn/breadcrumb',
    importExample:
      "import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'radcn/breadcrumb'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render Link, Ellipsis, Separator, Demo, Dropdown, and Responsive breadcrumb examples with native links and composed RadCN primitives.',
        source: breadcrumbSource,
        preview: <BreadcrumbPreview />,
      },
    ],
    accessibility: [
      'Breadcrumb renders a native nav with aria-label="breadcrumb" and an ordered list of items.',
      'BreadcrumbLink renders native anchors with href, so Next Link and shadcn asChild examples map to platform link semantics.',
      'BreadcrumbPage renders aria-current="page" with role="link" and aria-disabled="true" for the current location.',
      'BreadcrumbEllipsis includes hidden More text, while dropdown and drawer triggers use accessible names such as Toggle menu.',
      'DropdownMenu, Drawer, and Button-style close actions keep their own roles, labels, focus behavior, and enhancement boundaries when composed inside Breadcrumb items.',
    ],
    customization: [
      'Breadcrumb parts expose public RadCN classes and data hooks for nav, list, item, link, page, separator, and ellipsis parts.',
      'The default separator is a chevron-style glyph; author-supplied children can render Slash-style separators or any app-owned icon.',
      'Use radcn-breadcrumb-trigger, radcn-breadcrumb-glyph, radcn-breadcrumb-truncate, and responsive branch classes for example-style compositions.',
      'Truncation, max-width, gap, icon size, and responsive visibility map to classes, inline styles, or CSS variables instead of Tailwind utilities.',
    ],
    divergence: [
      'Next Link and shadcn asChild map to explicit BreadcrumbLink href or app-owned anchor composition without Radix Slot.',
      'React useState and useMediaQuery map to Remix 3 browser enhancement, CSS breakpoints, or app-owned state.',
      'Lucide ChevronRight, MoreHorizontal, SlashIcon, and ChevronDownIcon are presentation choices; examples use package/app-owned glyphs instead of icon package dependencies.',
      'Breadcrumb does not own DropdownMenu, Drawer, Button, routing, viewport state, or icon assets. It remains a navigation primitive that composes with those parts.',
    ],
  },
  {
    slug: 'empty',
    title: 'Empty',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A centered empty-state layout for missing content, onboarding prompts, search misses, and recovery actions.',
    importPath: 'radcn/empty',
    importExample:
      "import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from 'radcn/empty'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Compose default actions, icon grids, avatar media, stacked avatars, input-group search, outline surfaces, and muted background states with package primitives.',
        source: emptySource,
        preview: <EmptyPreview />,
      },
    ],
    accessibility: [
      'Empty renders server-first layout markup and lets headings, descriptions, links, inputs, and buttons keep their native semantics.',
      'Use EmptyTitle and EmptyDescription for the visible message, then put actions or controls in EmptyContent.',
      'Avatar, AvatarGroup, Button, InputGroup, Kbd, and links keep their own accessible behavior when composed inside Empty.',
      'Icon media remains decorative unless the surrounding title and description need a more specific accessible label.',
    ],
    customization: [
      'Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, and EmptyContent expose public RadCN classes and data hooks.',
      'Use class, style, and CSS variables to tune width, height, border, background, spacing, and icon presentation.',
      'Outline, dashed, muted, and background examples are styling over the same Empty parts rather than separate state APIs.',
      'Media can be text, inline SVG, Avatar, AvatarGroup, Spinner, or app-owned imagery.',
    ],
    divergence: [
      'shadcn/ui asChild maps to explicit RadCN Button href or native anchor composition, preserving link semantics without Radix Slot.',
      'Lucide and Tabler icons are presentation choices; RadCN examples use package-owned markup or app-owned glyphs instead of icon package dependencies.',
      'Tailwind utility classes map to RadCN public classes, inline styles, or CSS variables.',
      'Remote GitHub avatar images are content choices. Use local/static assets, app-owned images, data URIs, or AvatarFallback for deterministic examples.',
      'Empty remains a layout/content primitive and does not own Avatar, AvatarGroup, Button, InputGroup, Kbd, icon-package, image-loading, route, form, or support-link state.',
    ],
  },
  {
    slug: 'carousel',
    title: 'Carousel',
    category: 'Composite',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A browser-enhanced scroll carousel with native region and slide semantics, controls, vertical layout, responsive sizing, status hooks, and app-owned autoplay composition.',
    importPath: 'radcn/carousel',
    importExample:
      "import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'radcn/carousel'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render Demo, Size, Spacing, Orientation, API, and Plugin-style examples with Card slides, public events, and app-owned behavior.',
        source: carouselSource,
        preview: <CarouselPreview />,
      },
    ],
    accessibility: [
      'Carousel renders a named region with aria-roledescription="carousel" and each item renders a slide group.',
      'CarouselItem can provide ariaLabel or ariaLabelledby so numbered Card slides have deterministic accessible names.',
      'Previous and Next are native buttons with stable accessible labels and disabled boundary states.',
      'Enhanced carousels expose current/count data hooks and selection events so app-owned status text can remain visible and synchronized.',
      'Keyboard movement uses the active axis: left/right for horizontal, up/down for vertical, plus Home and End.',
    ],
    customization: [
      'Use class, style, and CSS variables such as --radcn-carousel-width, --radcn-carousel-gap, --radcn-carousel-item-size, and --radcn-carousel-vertical-height to tune layout.',
      'Card slides are ordinary composition; Carousel does not require or own Card.',
      'Responsive size and spacing examples map to public classes and CSS variables instead of Tailwind basis or negative-margin utilities.',
      'Autoplay/plugin behavior can be app-owned browser enhancement over public controls and data hooks.',
    ],
    divergence: [
      'React state/effects/context and shadcn setApi map to public data hooks, radcn-carousel-select events, radcn-carousel-scroll events, and app-owned browser state.',
      'Embla, useEmblaCarousel, opts, plugins, and embla-carousel-autoplay are upstream implementation mechanics, not RadCN dependencies.',
      'Lucide arrows are presentation choices; RadCN controls use package-owned glyphs or app-owned children with accessible button labels.',
      'Tailwind width, max-width, aspect-square, padding, negative margin, basis, height, and responsive utilities map to RadCN classes, inline styles, or CSS variables.',
    ],
  },
  {
    slug: 'toggle',
    title: 'Toggle',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native pressed-state button for icon, text, disabled, size, and outline toggle actions.',
    importPath: 'radcn/toggle',
    importExample: "import { Toggle } from 'radcn/toggle'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the six plain shadcn Toggle examples with native button semantics and app-owned icon presentation.',
        source: toggleSource,
        preview: <TogglePreview />,
      },
    ],
    accessibility: [
      'Toggle renders a native button with aria-pressed and data-state so pressed state is visible in server HTML and browser-enhanced DOM.',
      'Icon-only toggles use ariaLabel for an accessible name while app-owned icon spans stay aria-hidden.',
      'Disabled toggles use the native disabled attribute plus aria-disabled and data-disabled hooks.',
      'Icon plus text examples keep visible text in the button content so the action remains understandable without icon assets.',
    ],
    customization: [
      'Use size="sm" and size="lg" for shadcn-style compact and large toggle buttons.',
      'Use variant="outline" for border styling without adding a wrapper or dependency.',
      'Selected-state icon styling can target data-state="on" and the app-owned radcn-toggle-icon hook.',
      'Icons are app presentation. Use spans, inline SVG, or any app icon system without changing radcn/toggle.',
    ],
    divergence: [
      'Radix Toggle maps to RadCN native button markup plus explicit enhanceToggle browser behavior.',
      'lucide icons are not RadCN package dependencies; examples use decorative app-owned glyph spans.',
      'Tailwind selected-state utilities map to data-state, class hooks, inline styles, and CSS variables.',
      'Toggle owns pressed button behavior but does not own icon packages, bookmark state persistence, editor formatting state, or ToggleGroup selection.',
    ],
  },
  {
    slug: 'toggle-group',
    title: 'Toggle Group',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native button group for single or multiple pressed selections with group-level size, variant, spacing, and disabled defaults.',
    importPath: 'radcn/toggle-group',
    importExample:
      "import { ToggleGroup, ToggleGroupItem } from 'radcn/toggle-group'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render icon-only formatting groups, disabled groups, small and large groups, outline groups, and spaced icon-label choices without React or icon-package dependencies.',
        source: toggleGroupSource,
        preview: <ToggleGroupPreview />,
      },
    ],
    accessibility: [
      'ToggleGroup renders a named group of native buttons and each ToggleGroupItem exposes aria-pressed and data-state.',
      'Icon-only ToggleGroupItems must provide ariaLabel while app-owned glyphs stay decorative.',
      'Single and multiple selection preserve data-value on the group so submitted or enhanced app state can read the selected values.',
      'Enhanced groups provide roving focus with arrow keys, Home, End, Space, and Enter while skipping disabled items.',
    ],
    customization: [
      'Use group-level size, variant, disabled, and spacing props for common shadcn-style defaults.',
      'Use item-level size, variant, disabled, class, and style props when an item intentionally differs from its group.',
      'Selected-state styling can target data-state="on" and public classes such as radcn-toggle-group-icon.',
      'Spacing maps to --radcn-toggle-group-gap so apps can tune the group without Tailwind utilities.',
    ],
    divergence: [
      'Radix ToggleGroup maps to RadCN native button markup plus explicit enhanceToggleGroup browser behavior.',
      'Lucide icons are presentation choices; examples use app-owned glyphs and decorative spans.',
      'Tailwind h-4 w-4 icon utilities map to RadCN classes, inline styles, or CSS variables.',
      'Tailwind selected-state selectors map to data-state, data-value, classes, inline styles, and CSS variables.',
      'Toggle Group owns selection and focus behavior, but it does not own icon assets or app formatting state.',
    ],
  },
  {
    slug: 'spinner',
    title: 'Spinner',
    category: 'Feedback',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'An accessible loading status indicator for standalone feedback and composed loading states.',
    importPath: 'radcn/spinner',
    importExample: "import { Spinner } from 'radcn/spinner'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render standalone, sized, colored, button, badge, input-group, empty, item, progress, and custom presentation examples without React or icon-package dependencies.',
        source: spinnerSource,
        preview: <SpinnerPreview />,
      },
    ],
    accessibility: [
      'Spinner renders role="status" with a default Loading accessible name.',
      'Use ariaLabel when the loading state needs a more specific status name.',
      'Loading text belongs beside Spinner in Button, Badge, InputGroup, Empty, and Item compositions.',
      'Custom app-owned spinner replacements should preserve role="status" and an accessible name.',
    ],
    customization: [
      'Use class, style, --radcn-spinner-size, and --radcn-spinner-color for size and color customization.',
      'Spinner track and head parts expose package classes for token-driven styling.',
      'Button, Badge, InputGroup, Empty, Item, and Progress compositions keep their own public hooks and state.',
    ],
    divergence: [
      'Upstream lucide LoaderIcon and Loader2Icon map to RadCN package-owned SVG by default; app-owned custom icons can replace the visual glyph when needed.',
      'React SVG prop spreading maps to deliberate Remix UI props, public classes, inline styles, and CSS variables.',
      'Tailwind size-* and text-* utilities map to RadCN classes, style, --radcn-spinner-size, or --radcn-spinner-color.',
      'Custom spinner replacement is app-owned presentation, not a RadCN package dependency.',
      'Spinner does not own Button, Badge, InputGroup, Empty, Item, Progress, form, or async state.',
    ],
  },
]

interface RegistrySeed {
  slug: string
  title: string
  category: string
  kind?: ComponentKind
  disposition?: ComponentDisposition
  status?: ComponentStatus
  importNames?: string[]
  summary?: string
}

const registrySeeds: RegistrySeed[] = [
  { slug: 'accordion', title: 'Accordion', category: 'Composite', importNames: ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'] },
  { slug: 'alert', title: 'Alert', category: 'Display', importNames: ['Alert', 'AlertTitle', 'AlertDescription'] },
  { slug: 'alert-dialog', title: 'Alert Dialog', category: 'Overlays', importNames: ['AlertDialog', 'AlertDialogContent', 'AlertDialogTrigger'] },
  { slug: 'aspect-ratio', title: 'Aspect Ratio', category: 'Display', importNames: ['AspectRatio'] },
  { slug: 'avatar', title: 'Avatar', category: 'Display', importNames: ['Avatar', 'AvatarImage', 'AvatarFallback'] },
  { slug: 'breadcrumb', title: 'Breadcrumb', category: 'Navigation', importNames: ['Breadcrumb', 'BreadcrumbList', 'BreadcrumbItem', 'BreadcrumbLink'] },
  { slug: 'button-group', title: 'Button Group', category: 'Inputs', importNames: ['ButtonGroup', 'ButtonGroupText', 'ButtonGroupSeparator'] },
  { slug: 'calendar', title: 'Calendar', category: 'Inputs', importNames: ['Calendar'] },
  { slug: 'carousel', title: 'Carousel', category: 'Composite', importNames: ['Carousel', 'CarouselContent', 'CarouselItem'] },
  { slug: 'card', title: 'Card', category: 'Display', importNames: ['Card', 'CardHeader', 'CardTitle', 'CardContent'] },
  { slug: 'chart', title: 'Chart', category: 'Display', importNames: ['ChartContainer', 'ChartLineSeries', 'ChartTooltip'] },
  { slug: 'checkbox', title: 'Checkbox', category: 'Inputs', importNames: ['Checkbox'] },
  { slug: 'collapsible', title: 'Collapsible', category: 'Composite', importNames: ['Collapsible', 'CollapsibleTrigger', 'CollapsibleContent'] },
  { slug: 'combobox', title: 'Combobox', category: 'Inputs', importNames: ['Combobox', 'ComboboxTrigger', 'ComboboxContent'] },
  { slug: 'command', title: 'Command', category: 'Composite', importNames: ['Command', 'CommandInput', 'CommandList', 'CommandItem'] },
  { slug: 'context-menu', title: 'Context Menu', category: 'Overlays', importNames: ['ContextMenu', 'ContextMenuTrigger', 'ContextMenuContent'] },
  { slug: 'direction', title: 'Direction', category: 'Utilities', importNames: ['Direction', 'DirectionProvider'] },
  { slug: 'drawer', title: 'Drawer', category: 'Overlays', importNames: ['Drawer', 'DrawerTrigger', 'DrawerContent'] },
  { slug: 'dropdown-menu', title: 'Dropdown Menu', category: 'Overlays', importNames: ['DropdownMenu', 'DropdownMenuTrigger', 'DropdownMenuContent'] },
  { slug: 'empty', title: 'Empty', category: 'Display', importNames: ['Empty', 'EmptyHeader', 'EmptyTitle', 'EmptyDescription'] },
  { slug: 'field', title: 'Field', category: 'Inputs', importNames: ['Field', 'FieldLabel', 'FieldSet', 'FieldLegend', 'FieldGroup', 'FieldContent'] },
  { slug: 'hover-card', title: 'Hover Card', category: 'Overlays', importNames: ['HoverCard', 'HoverCardTrigger', 'HoverCardContent'] },
  { slug: 'input-group', title: 'Input Group', category: 'Inputs', importNames: ['InputGroup', 'InputGroupInput', 'InputGroupAddon'] },
  { slug: 'input-otp', title: 'Input OTP', category: 'Inputs', importNames: ['InputOTP', 'InputOTPGroup', 'InputOTPSlot'] },
  { slug: 'item', title: 'Item', category: 'Display', importNames: ['Item', 'ItemContent', 'ItemTitle'] },
  { slug: 'kbd', title: 'Kbd', category: 'Display', importNames: ['Kbd', 'KbdGroup'] },
  { slug: 'label', title: 'Label', category: 'Inputs', importNames: ['Label'] },
  { slug: 'menubar', title: 'Menubar', category: 'Navigation', importNames: ['Menubar', 'MenubarMenu', 'MenubarTrigger'] },
  { slug: 'native-select', title: 'Native Select', category: 'Inputs', importNames: ['NativeSelect', 'NativeSelectOption', 'NativeSelectOptGroup'] },
  { slug: 'navigation-menu', title: 'Navigation Menu', category: 'Navigation', importNames: ['NavigationMenu', 'NavigationMenuList', 'NavigationMenuItem'] },
  { slug: 'pagination', title: 'Pagination', category: 'Navigation', importNames: ['Pagination', 'PaginationContent', 'PaginationLink'] },
  { slug: 'popover', title: 'Popover', category: 'Overlays', importNames: ['Popover', 'PopoverTrigger', 'PopoverContent'] },
  { slug: 'progress', title: 'Progress', category: 'Feedback', importNames: ['Progress'] },
  { slug: 'radio-group', title: 'Radio Group', category: 'Inputs', importNames: ['RadioGroup', 'RadioGroupItem'] },
  { slug: 'resizable', title: 'Resizable', category: 'Composite', importNames: ['ResizablePanelGroup', 'ResizablePanel', 'ResizableHandle'] },
  { slug: 'scroll-area', title: 'Scroll Area', category: 'Layout', importNames: ['ScrollArea', 'ScrollAreaViewport', 'ScrollBar'] },
  { slug: 'select', title: 'Select', category: 'Inputs', importNames: ['Select', 'SelectTrigger', 'SelectContent', 'SelectItem'] },
  { slug: 'separator', title: 'Separator', category: 'Display', importNames: ['Separator'] },
  { slug: 'sheet', title: 'Sheet', category: 'Overlays', importNames: ['Sheet', 'SheetTrigger', 'SheetContent'] },
  { slug: 'sidebar', title: 'Sidebar', category: 'Layout', importNames: ['Sidebar', 'SidebarProvider', 'SidebarContent'] },
  { slug: 'skeleton', title: 'Skeleton', category: 'Feedback', importNames: ['Skeleton'] },
  { slug: 'slider', title: 'Slider', category: 'Inputs', importNames: ['Slider'] },
  { slug: 'spinner', title: 'Spinner', category: 'Feedback', importNames: ['Spinner'] },
  { slug: 'switch', title: 'Switch', category: 'Inputs', importNames: ['Switch'] },
  { slug: 'table', title: 'Table', category: 'Display', importNames: ['Table', 'TableHeader', 'TableRow', 'TableCell'] },
  { slug: 'textarea', title: 'Textarea', category: 'Inputs', importNames: ['Textarea'] },
  { slug: 'toast', title: 'Toast Event Helper', category: 'Helpers', kind: 'helper', disposition: 'helper', importNames: ['toast', 'createToastEvent'] },
  { slug: 'toggle', title: 'Toggle', category: 'Inputs', importNames: ['Toggle'] },
  { slug: 'toggle-group', title: 'Toggle Group', category: 'Inputs', importNames: ['ToggleGroup', 'ToggleGroupItem'] },
  { slug: 'tooltip', title: 'Tooltip', category: 'Overlays', importNames: ['Tooltip', 'TooltipTrigger', 'TooltipContent'] },
  { slug: 'typography', title: 'Typography', category: 'Recipes', kind: 'recipe', disposition: 'recipe', importNames: ['TypographyH1', 'TypographyP', 'TypographyInlineCode'] },
]

const richSlugs = new Set(richComponentDocs.map((component) => component.slug))

function sourceForSeed(seed: RegistrySeed, importExample: string) {
  let name = seed.title.replaceAll(' ', '')
  let body = sourceBodyBySlug[seed.slug] ?? `<${seed.importNames?.[0] ?? name}>${seed.title}</${seed.importNames?.[0] ?? name}>`

  return `${importExample}

export function ${name}Preview() {
  return (
${body
  .split('\n')
  .map((line) => `    ${line}`)
  .join('\n')}
  )
}`
}

const sourceBodyBySlug: Record<string, string> = {
  accordion: `<Accordion defaultValue="usage">
  <AccordionItem value="usage">
    <AccordionTrigger>What changes in Remix 3?</AccordionTrigger>
    <AccordionContent>RadCN renders platform markup first.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  alert: `<Alert>
  <AlertTitle>Server render complete</AlertTitle>
  <AlertDescription>The route returned a real RadCN alert.</AlertDescription>
</Alert>`,
  'alert-dialog': `<AlertDialog id="delete-token">
  <AlertDialogTrigger>Delete token</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete API token?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  'aspect-ratio': `<AspectRatio ratio="16 / 9">
  <img src="/images/radcn-logo.webp" alt="RadCN" />
</AspectRatio>`,
  avatar: `<AvatarGroup>
  <Avatar><AvatarFallback>RC</AvatarFallback></Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`,
  breadcrumb: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Docs</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  'button-group': `<ButtonGroup>
  <Button variant="outline">Preview</Button>
  <ButtonGroupSeparator />
  <Button ariaLabel="More" size="icon" variant="outline">•••</Button>
</ButtonGroup>`,
  calendar: `<Calendar defaultMonth="2026-06-01" defaultSelected="2026-06-05" name="release-date" />`,
  carousel: `<Carousel>
  <CarouselContent>
    <CarouselItem>Component preview</CarouselItem>
    <CarouselItem>Token preview</CarouselItem>
  </CarouselContent>
  <CarouselPrevious>Previous</CarouselPrevious>
  <CarouselNext>Next</CarouselNext>
</Carousel>`,
  card: `<Card>
  <CardHeader>
    <CardTitle>Docs quality gate</CardTitle>
    <CardDescription>Every route gets authored content.</CardDescription>
  </CardHeader>
  <CardContent>Examples import from the RadCN package.</CardContent>
</Card>`,
  chart: `<ChartContainer ariaLabel="Weekly component coverage" title="Coverage">
  <ChartBarSeries labels={['Mon', 'Tue', 'Wed']} name="ready" values={[12, 28, 57]} />
  <ChartLegend><ChartLegendItem name="ready">Ready pages</ChartLegendItem></ChartLegend>
</ChartContainer>`,
  checkbox: `<label>
  <Checkbox checked name="docs-checkbox" />
  Include authored examples
</label>`,
  collapsible: `<Collapsible open>
  <CollapsibleTrigger>Show implementation note</CollapsibleTrigger>
  <CollapsibleContent>Content is rendered in the initial document.</CollapsibleContent>
</Collapsible>`,
  combobox: `<Combobox defaultValue="remix">
  <ComboboxValue>Remix 3</ComboboxValue>
  <ComboboxTrigger>Choose framework</ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput placeholder="Filter frameworks" />
    <ComboboxList><ComboboxItem value="remix">Remix 3</ComboboxItem></ComboboxList>
  </ComboboxContent>
</Combobox>`,
  command: `<Command>
  <CommandInput placeholder="Search commands" />
  <CommandList>
    <CommandGroup><CommandItem value="copy">Copy snippet</CommandItem></CommandGroup>
  </CommandList>
</Command>`,
  'context-menu': `<ContextMenu>
  <ContextMenuTrigger>Right click preview</ContextMenuTrigger>
  <ContextMenuContent><ContextMenuItem>Copy import</ContextMenuItem></ContextMenuContent>
</ContextMenu>`,
  direction: `<DirectionProvider dir="rtl">
  <p>DirectionProvider writes real dir behavior into the subtree.</p>
</DirectionProvider>`,
  drawer: `<Drawer id="settings">
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader><DrawerTitle>Preview drawer</DrawerTitle></DrawerHeader>
  </DrawerContent>
</Drawer>`,
  'dropdown-menu': `<DropdownMenu>
  <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Page actions</DropdownMenuLabel>
    <DropdownMenuItem>Copy import</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  empty: `<Empty>
  <EmptyHeader>
    <EmptyTitle>No drafts left</EmptyTitle>
    <EmptyDescription>Every export now has docs.</EmptyDescription>
  </EmptyHeader>
</Empty>`,
  field: `<FieldSet>
  <FieldLegend>Workspace</FieldLegend>
  <FieldGroup>
    <Field orientation="responsive">
      <FieldContent>
        <FieldLabel for="workspace">Workspace name</FieldLabel>
        <FieldDescription>Responsive fields keep copy beside controls.</FieldDescription>
      </FieldContent>
      <Input id="workspace" name="workspace" />
    </Field>
  </FieldGroup>
</FieldSet>`,
  'hover-card': `<HoverCard>
  <HoverCardTrigger>Hover RadCN</HoverCardTrigger>
  <HoverCardContent>Server-rendered trigger, browser-enhanced surface.</HoverCardContent>
</HoverCard>`,
  'input-group': `<InputGroup>
  <InputGroupAddon>@</InputGroupAddon>
  <InputGroupInput name="workspace" placeholder="radcn" />
  <InputGroupButton>Go</InputGroupButton>
</InputGroup>`,
  'input-otp': `<InputOTP ariaLabel="One-time code" maxLength={6} name="otp">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
</InputOTP>`,
  item: `<ItemGroup>
  <Item>
    <ItemMedia variant="icon">R</ItemMedia>
    <ItemContent><ItemTitle>RadCN docs</ItemTitle></ItemContent>
  </Item>
</ItemGroup>`,
  kbd: `<KbdGroup>
  <Kbd>Cmd</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
  label: `<Label for="project-name">Project name</Label>`,
  menubar: `<Menubar>
  <MenubarMenu value="docs">
    <MenubarTrigger>Docs</MenubarTrigger>
    <MenubarContent><MenubarItem>Components</MenubarItem></MenubarContent>
  </MenubarMenu>
</Menubar>`,
  'native-select': `<NativeSelect name="framework">
  <NativeSelectOptGroup label="Frameworks">
    <NativeSelectOption selected value="remix">Remix 3</NativeSelectOption>
  </NativeSelectOptGroup>
</NativeSelect>`,
  'navigation-menu': `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="components">
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent><NavigationMenuLink href="/docs/components/button">Button</NavigationMenuLink></NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  pagination: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#previous">Previous</PaginationPrevious></PaginationItem>
    <PaginationItem><PaginationLink href="#1" isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#next">Next</PaginationNext></PaginationItem>
  </PaginationContent>
</Pagination>`,
  popover: `<Popover>
  <PopoverTrigger>Open popover</PopoverTrigger>
  <PopoverContent><PopoverTitle>Install command</PopoverTitle></PopoverContent>
</Popover>`,
  progress: `<Progress ariaLabel="Docs completion" value={72} />`,
  'radio-group': `<RadioGroup name="mode">
  <label><RadioGroupItem checked name="mode" value="system" /> System</label>
  <label><RadioGroupItem name="mode" value="light" /> Light</label>
</RadioGroup>`,
  resizable: `<ResizablePanelGroup>
  <ResizablePanel defaultSize={60}>Preview</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={40}>Code</ResizablePanel>
</ResizablePanelGroup>`,
  'scroll-area': `<ScrollArea>
  <ScrollAreaViewport>Scrollable component list</ScrollAreaViewport>
  <ScrollBar><ScrollAreaThumb /></ScrollBar>
</ScrollArea>`,
  select: `<Select defaultValue="docs" name="surface">
  <SelectTrigger><SelectValue placeholder="Choose surface" /></SelectTrigger>
  <SelectContent><SelectViewport><SelectItem value="docs">Docs site</SelectItem></SelectViewport></SelectContent>
</Select>`,
  separator: `<>
  <span>Preview</span>
  <Separator />
  <span>Source</span>
</>`,
  sheet: `<Sheet id="settings">
  <SheetTrigger>Open sheet</SheetTrigger>
  <SheetContent>
    <SheetHeader><SheetTitle>Component settings</SheetTitle></SheetHeader>
  </SheetContent>
</Sheet>`,
  sidebar: `<SidebarProvider defaultOpen>
  <Sidebar>
    <SidebarHeader><SidebarTrigger>Toggle</SidebarTrigger></SidebarHeader>
    <SidebarContent><SidebarMenu><SidebarMenuItem><SidebarMenuButton>Button</SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarContent>
  </Sidebar>
</SidebarProvider>`,
  skeleton: `<Skeleton style="height: 1rem; width: 75%;" />`,
  slider: `<Slider ariaLabel="Example intensity" defaultValue={68} name="intensity" />`,
  spinner: `<Spinner ariaLabel="Loading docs preview" />`,
  switch: `<label>
  <Switch checked name="notifications" />
  Enable notifications
</label>`,
  table: `<Table>
  <TableHeader><TableRow><TableHead>Component</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Button</TableCell><TableCell>Ready</TableCell></TableRow></TableBody>
</Table>`,
  textarea: `<Textarea name="notes" placeholder="Write implementation notes" />`,
  toast: `<button type="button" data-toast-event={createToastEvent.name}>
  Dispatch toast event
</button>`,
  toggle: `<Toggle pressed>Bold</Toggle>`,
  'toggle-group': `<ToggleGroup defaultValue="preview" type="multiple">
  <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
  <ToggleGroupItem value="code">Code</ToggleGroupItem>
</ToggleGroup>`,
  tooltip: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover for hint</TooltipTrigger>
    <TooltipContent>Tooltips are browser-enhanced from package markup.</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  typography: `<div>
  <TypographyLead>RadCN documentation is web-first.</TypographyLead>
  <TypographyP>Use <TypographyInlineCode>remix/ui</TypographyInlineCode> components.</TypographyP>
</div>`,
}

export const componentDocs: ComponentDoc[] = [
  ...richComponentDocs,
  ...registrySeeds.filter((seed) => !richSlugs.has(seed.slug)).map(createDraftDoc),
].sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title))

function createDraftDoc(seed: RegistrySeed): ComponentDoc {
  let kind = seed.kind ?? 'component'
  let disposition = seed.disposition ?? 'ready'
  let status = seed.status ?? (disposition === 'not-shipped-yet' ? 'draft' : 'ready')
  let importPath = disposition === 'not-shipped-yet' ? '' : `radcn/${seed.slug}`
  let importExample =
    disposition === 'not-shipped-yet'
      ? `// ${seed.title} is not shipped by RadCN yet.`
      : `import { ${seed.importNames?.join(', ') ?? seed.title.replaceAll(' ', '')} } from '${importPath}'`
  let source = disposition === 'not-shipped-yet' ? importExample : sourceForSeed(seed, importExample)

  return {
    slug: seed.slug,
    title: seed.title,
    category: seed.category,
    kind,
    disposition,
    status,
    summary:
      seed.summary ??
      (disposition === 'not-shipped-yet'
        ? `${seed.title} is tracked as an intended RadCN docs disposition, but it is not an importable package API yet.`
        : `${seed.title} is included in the RadCN public package surface with authored docs metadata, package import guidance, and a live preview.`),
    importPath,
    importExample,
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: disposition === 'not-shipped-yet' ? 'not-shipped-yet' : 'authored-preview',
        title: disposition === 'not-shipped-yet' ? 'Not shipped yet' : 'Authored preview',
        description:
          disposition === 'not-shipped-yet'
            ? 'This page documents a known Issue 3 recipe/block disposition without claiming a package export exists.'
            : `${seed.title} renders from the RadCN package in the docs app, with a compact example suitable for visual inspection.`,
        source,
        preview:
          disposition === 'not-shipped-yet'
            ? <DraftPreview title={seed.title} importPath={importPath} disposition={disposition} />
            : <AuthoredPreview slug={seed.slug} title={seed.title} />,
      },
    ],
    accessibility:
      disposition === 'not-shipped-yet'
        ? ['No shipped RadCN API exists yet; accessibility requirements must be defined before implementation.']
        : [
            `${seed.title} renders semantic host elements from the RadCN package so baseline accessibility is present in server HTML.`,
            'Interactive behavior is attached through explicit Remix 3 browser enhancement where the component requires runtime state.',
          ],
    customization:
      disposition === 'not-shipped-yet'
        ? ['No shipped tokens or class hooks exist yet for this disposition.']
        : [
            'Use RadCN CSS variables for color, radius, spacing, and focus treatment.',
            `Target public ${seed.slug} data hooks and part classes from the package instead of depending on docs-only wrappers.`,
          ],
    divergence:
      disposition === 'not-shipped-yet'
        ? ['This is an aspirational docs disposition, not a current package export.']
        : [
            'RadCN documents this surface as Remix UI package code rather than a copied React component.',
            'The docs example imports from the package subpath users are intended to import from once installation is available.',
          ],
  }
}

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return componentDocs.find((component) => component.slug === slug)
}
