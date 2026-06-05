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
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount } from 'radcn/avatar'
import { Badge } from 'radcn/badge'
import {
  Breadcrumb,
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
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
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
import { DatePicker } from 'radcn/date-picker'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
  DrawerTitle,
  DrawerTrigger,
} from 'radcn/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from 'radcn/dropdown-menu'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from 'radcn/empty'
import { Field, FieldDescription, FieldError } from 'radcn/field'
import { Form, FormDescription, FormField, FormLabel, FormMessage, formControlAttributes, formFieldIds } from 'radcn/form'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'radcn/hover-card'
import { Input } from 'radcn/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from 'radcn/input-group'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'radcn/input-otp'
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from 'radcn/item'
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
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from 'radcn/popover'
import { Progress } from 'radcn/progress'
import { RadioGroup, RadioGroupItem } from 'radcn/radio-group'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'radcn/resizable'
import { ScrollArea, ScrollAreaThumb, ScrollAreaViewport, ScrollBar } from 'radcn/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'radcn/tooltip'
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
  '& [data-radcn-alert-dialog-content][hidden], & [data-radcn-drawer-content][hidden], & [data-radcn-sheet-content][hidden], & [data-radcn-popover-content][hidden], & [data-radcn-hover-card-content][hidden], & [data-radcn-tooltip-content][hidden], & [data-radcn-dropdown-menu-content][hidden], & [data-radcn-context-menu-content][hidden], & [data-radcn-menubar-content][hidden], & [data-radcn-select-content][hidden], & [data-radcn-combobox-content][hidden], & [data-radcn-navigation-menu-content][hidden]': {
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

export function ButtonPreview() {
  return (
    <div class="button-preview">
      <Button>Deploy site</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="outline">View docs</Button>
    </div>
  )
}`

const badgeSource = `import { Badge } from 'radcn/badge'

export function BadgePreview() {
  return (
    <div class="badge-preview">
      <Badge>Ready</Badge>
      <Badge variant="secondary">Server-first</Badge>
      <Badge variant="outline">Remix 3</Badge>
      <Badge variant="destructive">Breaking</Badge>
    </div>
  )
}`

const inputSource = `import { Input } from 'radcn/input'

export function InputPreview() {
  return (
    <label class="field">
      Workspace
      <Input id="workspace" name="workspace" placeholder="radcn" value="radcn" />
    </label>
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

const datePickerSource = `import { DatePicker } from 'radcn/date-picker'

export function DatePickerPreview() {
  return (
    <DatePicker
      defaultOpen
      defaultValue="2026-06-12"
      month="2026-06-01"
      name="ship_date"
      presets={[
        { label: 'Today', value: '2026-06-12' },
        { label: 'Tomorrow', value: '2026-06-13' },
        { label: 'In 3 days', value: '2026-06-15' },
      ]}
    />
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

function ButtonPreview() {
  return () => (
    <div mix={previewRowStyle}>
      <Button>Deploy site</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="outline">View docs</Button>
    </div>
  )
}

function BadgePreview() {
  return () => (
    <div mix={previewRowStyle}>
      <Badge>Ready</Badge>
      <Badge variant="secondary">Server-first</Badge>
      <Badge variant="outline">Remix 3</Badge>
      <Badge variant="destructive">Breaking</Badge>
    </div>
  )
}

function InputPreview() {
  return () => (
    <div mix={previewFieldStyle}>
      <label for="docs-input-workspace">Workspace</label>
      <Input
        ariaDescribedBy="docs-input-workspace-help"
        id="docs-input-workspace"
        name="workspace"
        placeholder="radcn"
        value="radcn"
      />
      <p id="docs-input-workspace-help">Native text input with RadCN tokens.</p>
    </div>
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

function DatePickerPreview() {
  return () => (
    <div mix={previewStackStyle}>
      <DatePicker
        defaultOpen
        defaultValue="2026-06-12"
        month="2026-06-01"
        name="ship_date"
        presets={[
          { label: 'Today', value: '2026-06-12' },
          { label: 'Tomorrow', value: '2026-06-13' },
          { label: 'In 3 days', value: '2026-06-15' },
        ]}
      />
      <DatePicker
        defaultOpen
        defaultValue="2026-06-12..2026-06-18"
        mode="range"
        month="2026-06-01"
        numberOfMonths={2}
      />
    </div>
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
        return (
          <ButtonGroup>
            <Button>Preview</Button>
            <ButtonGroupSeparator />
            <ButtonGroupText>v0.0</ButtonGroupText>
            <Button variant="outline">Ship</Button>
          </ButtonGroup>
        )
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
        return (
          <Field style="width: min(100%, 24rem);">
            <Label for="docs-field-email">Email</Label>
            <Input id="docs-field-email" name="email" placeholder="team@example.com" />
            <FieldDescription>Used for release notifications.</FieldDescription>
            <FieldError>Use a work email.</FieldError>
          </Field>
        )
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

const richComponentDocs: ComponentDoc[] = [
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
      'Supports disabled and aria-disabled states for unavailable actions.',
    ],
    customization: [
      'The component is styled through RadCN CSS variables such as --radcn-primary, --radcn-radius, and --radcn-control-height.',
      'Variants and sizes are expressed as data attributes and class names so app-level CSS can extend the visual system.',
    ],
    divergence: [
      'The Remix 3 port does not wrap React components. It returns host elements from remix/ui and keeps behavior close to the platform.',
      'Composition favors explicit props and package imports instead of a generated component copy inside the consuming app.',
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
        slug: 'variants',
        title: 'Variants',
        description:
          'Use badge variants to show status without introducing a custom docs-only label component.',
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
    ],
    divergence: [
      'The Remix 3 badge is a host element component, not a React slot wrapper.',
      'RadCN keeps link behavior explicit with href rather than forwarding arbitrary React children through asChild.',
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
      'A native text input with RadCN sizing, border, disabled, required, and invalid-state styling.',
    importPath: 'radcn/input',
    importExample: "import { Input } from 'radcn/input'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'with-label',
        title: 'With Label',
        description:
          'Pair Input with platform labels and descriptions so forms work before hydration.',
        source: inputSource,
        preview: <InputPreview />,
      },
    ],
    accessibility: [
      'Renders a native text input, preserving browser focus, editing, and form submission behavior.',
      'Supports aria-describedby and aria-invalid for field help and validation state.',
      'Leaves labeling to real label elements so accessible names stay explicit.',
    ],
    customization: [
      'Input dimensions and focus rings are controlled by RadCN CSS variables.',
      'The public data-radcn-input hook supports targeted app CSS without relying on generated DOM wrappers.',
    ],
    divergence: [
      'The Remix 3 input uses explicit string props such as ariaDescribedBy instead of React prop aliases.',
      'It is intentionally a controlled server-rendered text input primitive, not a React state helper.',
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
    ],
    accessibility: [
      'Renders a native form element, so browser validation and submission work without client JavaScript.',
      'Provides deterministic ID helpers for control, description, and message elements.',
      'Uses aria-describedby and aria-invalid on the actual form control instead of relying on hidden context.',
    ],
    customization: [
      'Form parts expose data-radcn-form, data-radcn-form-field, data-radcn-form-label, data-radcn-form-description, and data-radcn-form-message hooks.',
      'Invalid color and sizing inherit existing RadCN field tokens, including --radcn-field-error and --radcn-form-width.',
    ],
    divergence: [
      'shadcn/ui form is a React Hook Form adapter around context, Controller, Slot, and useFormState. RadCN does not port those React-only mechanics.',
      'The Remix 3 port makes field wiring explicit through helpers and native attributes so server actions, native validation, and future enhancement can share the same markup.',
      'Schema validation and form-state libraries remain app choices rather than RadCN package dependencies.',
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
          'Use one package API for the shadcn date-picker example families while keeping ISO values and native forms explicit.',
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
    ],
    divergence: [
      'shadcn/ui presents date picker as examples rather than a standalone ui component. RadCN promotes the composition into a package API so the product has an importable Date Picker surface.',
      'RadCN does not depend on React state, external calendar/date formatting packages, or slot wrappers. The browser enhancer updates labels, hidden inputs, presets, and range state from platform events.',
      'Docs previews are server-rendered proof surfaces; fixture Playwright coverage owns detailed interactive behavior for selection, reset, presets, and range construction.',
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
  { slug: 'field', title: 'Field', category: 'Inputs', importNames: ['Field', 'FieldDescription', 'FieldError'] },
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
  { slug: 'data-table', title: 'Data Table', category: 'Blocks', kind: 'block', disposition: 'not-shipped-yet', status: 'draft', importNames: [] },
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
  <Button>Preview</Button>
  <ButtonGroupSeparator />
  <ButtonGroupText>v0.0</ButtonGroupText>
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
  field: `<Field>
  <Label for="email">Email</Label>
  <Input id="email" name="email" />
  <FieldDescription>Used for release notifications.</FieldDescription>
</Field>`,
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
