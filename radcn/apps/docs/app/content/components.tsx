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
  AlertDialogOverlay,
  AlertDialogPortal,
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
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'radcn/card'
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
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from 'radcn/command'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from 'radcn/context-menu'
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableColumnControls,
  DataTableContent,
  DataTableDetail,
  DataTableEmpty,
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
import { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger } from 'radcn/hover-card'
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
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from 'radcn/menubar'
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from 'radcn/native-select'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
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
import { ScrollArea, ScrollAreaCorner, ScrollAreaThumb, ScrollAreaViewport, ScrollBar } from 'radcn/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectScrollDownButton,
  SelectScrollUpButton,
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
  SheetOverlay,
  SheetPortal,
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
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from 'radcn/table'
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

const popoverDemoStyle = css({
  '& [data-radcn-docs-popover-form]': {
    display: 'grid',
    gap: '1rem',
  },
  '& [data-radcn-docs-popover-copy]': {
    display: 'grid',
    gap: '0.5rem',
  },
  '& [data-radcn-docs-popover-copy] h4': {
    margin: 0,
    color: 'var(--radcn-foreground)',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1,
  },
  '& [data-radcn-docs-popover-copy] p': {
    margin: 0,
    color: 'var(--radcn-muted-foreground)',
    fontSize: '0.875rem',
  },
  '& [data-radcn-docs-popover-fields]': {
    display: 'grid',
    gap: '0.5rem',
  },
  '& [data-radcn-docs-popover-row]': {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
    alignItems: 'center',
    gap: '1rem',
  },
  '& [data-radcn-docs-popover-row] [data-radcn-input]': {
    height: '2rem',
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
  '& [data-radcn-sheet-portal][hidden]': {
    display: 'grid !important',
    gap: '0.75rem',
    position: 'static !important',
    width: '100%',
  },
  '& [data-radcn-dialog-content][hidden]': {
    color: 'var(--radcn-foreground) !important',
    display: 'grid !important',
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
  '& [data-radcn-alert-dialog-portal][hidden]': {
    display: 'grid !important',
    position: 'static !important',
    visibility: 'visible !important',
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

const accordionDemoSource = `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'radcn/accordion'

const groupName = 'accordion-demo'

export function AccordionDemo() {
  return (
    <Accordion
      class="w-full"
      collapsible
      defaultValue="item-1"
      name={groupName}
      type="single"
    >
      <AccordionItem name={groupName} open value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent class="flex flex-col gap-4 text-balance">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem name={groupName} value="item-2">
        <AccordionTrigger>Shipping Details</AccordionTrigger>
        <AccordionContent class="flex flex-col gap-4 text-balance">
          <p>
            We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days.
          </p>
          <p>
            All orders are carefully packaged and fully insured. Track your
            shipment in real-time through our dedicated tracking portal.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem name={groupName} value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent class="flex flex-col gap-4 text-balance">
          <p>
            We stand behind our products with a comprehensive 30-day return
            policy. If you're not completely satisfied, simply return the item
            in its original condition.
          </p>
          <p>
            Our hassle-free return process includes free return shipping and
            full refunds processed within 48 hours of receiving the returned
            item.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`

const alertDialogDemoSource = `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'radcn/alert-dialog'

export function AlertDialogDemo() {
  return (
    <AlertDialog id="alert-dialog-demo">
      <AlertDialogTrigger class="radcn-button radcn-button--outline">
        Show Dialog
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  )
}`

const aspectRatioImageSrc = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
const avatarShadcnSrc = 'https://github.com/shadcn.png'
const avatarEvilrabbitSrc = 'https://github.com/evilrabbit.png'
const avatarMaxleiterSrc = 'https://github.com/maxleiter.png'

const aspectRatioDemoSource = `import { AspectRatio } from 'radcn/aspect-ratio'

const imageSrc =
  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'

export function AspectRatioDemo() {
  return (
    <AspectRatio class="rounded-lg bg-muted" ratio="16 / 9">
      <img
        alt="Photo by Drew Beamer"
        class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
        src={imageSrc}
        style="display:block;width:100%;height:100%;border-radius:inherit;object-fit:cover;"
      />
    </AspectRatio>
  )
}`

const avatarDemoSource = `import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from 'radcn/avatar'

export function AvatarDemo() {
  return (
    <div class="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback ariaHidden={true}>CN</AvatarFallback>
      </Avatar>
      <Avatar class="rounded-lg" style="border-radius:var(--radcn-radius);">
        <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
        <AvatarFallback ariaHidden={true}>ER</AvatarFallback>
      </Avatar>
      <AvatarGroup
        ariaLabel="RadCN contributors"
        class="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale"
      >
        <Avatar style="box-shadow:0 0 0 2px var(--radcn-background);">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            class="grayscale"
            style="filter:grayscale(1);"
          />
          <AvatarFallback ariaHidden={true}>CN</AvatarFallback>
        </Avatar>
        <Avatar style="margin-left:-0.5rem;box-shadow:0 0 0 2px var(--radcn-background);">
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
            class="grayscale"
            style="filter:grayscale(1);"
          />
          <AvatarFallback ariaHidden={true}>LR</AvatarFallback>
        </Avatar>
        <Avatar style="margin-left:-0.5rem;box-shadow:0 0 0 2px var(--radcn-background);">
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
            class="grayscale"
            style="filter:grayscale(1);"
          />
          <AvatarFallback ariaHidden={true}>ER</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  )
}`

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

const aspectRatioDemoStyle = css({
  display: 'grid',
  gap: '0.75rem',
  width: 'min(100%, 34rem)',
  '& [data-radcn-docs-aspect-ratio-image]': {
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    objectFit: 'cover',
    filter: 'none',
  },
  '&[data-radcn-theme="dark"] [data-radcn-docs-aspect-ratio-image]': {
    filter: 'brightness(0.2) grayscale(1)',
  },
})

const avatarDemoStyle = css({
  display: 'grid',
  gap: '0.75rem',
  '& [data-radcn-docs-avatar-row]': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '3rem',
  },
  '& .radcn-docs-avatar-rounded': {
    borderRadius: 'var(--radcn-radius)',
  },
  '& .radcn-docs-avatar-stack-image': {
    filter: 'grayscale(1)',
  },
})

const collapsibleDemoStyle = css({
  display: 'grid',
  gap: '0.75rem',
  width: 'min(100%, 42rem)',
  '& .radcn-docs-collapsible-demo [data-radcn-collapsible-icon]': {
    display: 'none',
  },
  '& .radcn-docs-collapsible-demo [data-radcn-collapsible-trigger-text]': {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  '& .radcn-docs-collapsible-demo-header': {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  '& .radcn-docs-collapsible-demo [data-radcn-collapsible-content-inner]': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: 0,
  },
})

const contextMenuDemoStyle = css({
  display: 'grid',
  gap: '0.75rem',
  width: 'min(100%, 42rem)',
  '& [data-radcn-context-menu-portal][hidden]': {
    display: 'block !important',
    position: 'static !important',
    visibility: 'visible !important',
  },
  '& [data-radcn-context-menu-content][hidden], & [data-radcn-context-menu-sub-content][hidden]': {
    display: 'grid !important',
    position: 'static !important',
    visibility: 'visible !important',
    opacity: '1 !important',
  },
  '& [data-radcn-docs-context-menu-layout]': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: '1rem',
  },
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

const cardSource = `import { Button } from 'radcn/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'radcn/card'
import { Input } from 'radcn/input'
import { Label } from 'radcn/label'
import { Select, SelectContent, SelectItem, SelectPortal, SelectTrigger, SelectValue, SelectViewport } from 'radcn/select'

export function CardExamples() {
  return (
    <>
      <Card style="width:min(100%,24rem);">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
          <CardAction><Button href="/signup" variant="link">Sign Up</Button></CardAction>
        </CardHeader>
        <form action="/login" method="post">
          <CardContent>
            <Label for="email">Email</Label>
            <Input id="email" name="email" required type="email" placeholder="m@example.com" />
            <Label for="password">Password</Label>
            <Input id="password" name="password" required type="password" />
          </CardContent>
          <CardFooter>
            <Button type="submit" style="width:100%;">Login</Button>
            <Button variant="outline" style="width:100%;">Login with Google</Button>
          </CardFooter>
        </form>
      </Card>

      <Card style="width:min(100%,350px);">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <form action="/projects" method="post">
          <CardContent>
            <Label for="project-name">Name</Label>
            <Input id="project-name" name="project" placeholder="Name of your project" />
            <Label for="framework">Framework</Label>
            <Select defaultOpen id="framework" name="framework">
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectPortal>
                <SelectContent position="popper">
                  <SelectViewport>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </Select>
          </CardContent>
          <CardFooter style="justify-content:space-between;">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Deploy</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}`

const commandSource = `import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from 'radcn/command'
import { Kbd, KbdGroup } from 'radcn/kbd'

function CommandIcon({ name }: { name: string }) {
  return <span aria-hidden="true" data-command-icon={name}>{name.slice(0, 1)}</span>
}

export function CommandExamples() {
  return (
    <>
      <Command class="command-demo" style="width:min(100%,450px);">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem value="calendar"><CommandIcon name="Calendar" /> Calendar</CommandItem>
            <CommandItem value="search-emoji"><CommandIcon name="Smile" /> Search Emoji</CommandItem>
            <CommandItem disabled value="calculator"><CommandIcon name="Calculator" /> Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem value="profile"><CommandIcon name="User" /> Profile <CommandShortcut>⌘P</CommandShortcut></CommandItem>
            <CommandItem value="billing"><CommandIcon name="CreditCard" /> Billing <CommandShortcut>⌘B</CommandShortcut></CommandItem>
            <CommandItem value="settings"><CommandIcon name="Settings" /> Settings <CommandShortcut>⌘S</CommandShortcut></CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>

      <p>Press <KbdGroup><Kbd>⌘</Kbd><Kbd>J</Kbd></KbdGroup></p>
      <CommandDialog title="Command Palette" description="Search for a command to run...">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>{/* same rows, with Calculator enabled */}</CommandList>
        </Command>
      </CommandDialog>
    </>
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

const calendarSource = `import { Calendar } from 'radcn/calendar'

export function CalendarExamples() {
  return (
    <>
      <Calendar
        captionLayout="dropdown"
        defaultMonth="2026-06-01"
        defaultSelected="2026-06-12"
        max="2030-12-31"
        min="2020-01-01"
        name="release_date"
      />

      <p>
        Alternate Persian or Hijri calendar engines remain app-owned recipes
        that can reuse RadCN tokens and hooks.
      </p>
    </>
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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuTrigger } from 'radcn/dropdown-menu'
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableColumnControls,
  DataTableContent,
  DataTableEmpty,
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

const payments = [
  { id: 'm5gr84i9', status: 'success', statusLabel: 'Success', email: 'ken99@example.com', amount: '$316.00', selected: true },
  { id: '3u1reuv4', status: 'success', statusLabel: 'Success', email: 'abe45@example.com', amount: '$242.00' },
  { id: 'derv1ws0', status: 'processing', statusLabel: 'Processing', email: 'monserrat44@example.com', amount: '$837.00' },
  { id: '5kma53ae', status: 'success', statusLabel: 'Success', email: 'silas22@example.com', amount: '$874.00' },
  { id: 'bhqecj4p', status: 'failed', statusLabel: 'Failed', email: 'carmella@example.com', amount: '$721.00' },
]

export function DataTablePreview() {
  return (
    <DataTable caption="Payments" rowCount={5} selectedCount={1}>
      <form action="/payments" method="get">
        <DataTableToolbar>
          <DataTableFilter label="Filter emails">
            <Input name="email" placeholder="Filter emails..." />
          </DataTableFilter>
          <DataTableColumnControls>
            <DropdownMenu>
              <DropdownMenuTrigger>Columns v</DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>Email</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>Amount</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </DataTableColumnControls>
        </DataTableToolbar>
      </form>
      <DataTableContent
        caption="Payments"
        class="overflow-hidden rounded-md border"
        dense
        style="overflow:hidden;border:1px solid var(--radcn-border);border-radius:var(--radcn-radius);"
      >
        <DataTableHeader>
          <DataTableRow>
            <DataTableHeaderCell>
              <label>
                <Checkbox name="select-all" />
                <span class="radcn-sr-only">Select all</span>
              </label>
            </DataTableHeaderCell>
            <DataTableHeaderCell>Status</DataTableHeaderCell>
            <DataTableHeaderCell ariaSort="ascending" href="/payments?sort=email">Email ^</DataTableHeaderCell>
            <DataTableHeaderCell style="text-align:right">Amount</DataTableHeaderCell>
            <DataTableHeaderCell style="text-align:right">Actions</DataTableHeaderCell>
          </DataTableRow>
        </DataTableHeader>
        <DataTableBody>
          {payments.map((payment) => (
            <DataTableRow selected={payment.selected}>
              <DataTableCell>
                <label>
                  <Checkbox checked={payment.selected} name="rows" value={payment.id} />
                  <span class="radcn-sr-only">Select row</span>
                </label>
              </DataTableCell>
              <DataTableCell><Badge variant={payment.status === 'failed' ? 'destructive' : 'secondary'}>{payment.statusLabel}</Badge></DataTableCell>
              <DataTableCell class="lowercase">{payment.email}</DataTableCell>
              <DataTableCell style="text-align:right;font-weight:500">{payment.amount}</DataTableCell>
              <DataTableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger ariaLabel="Open menu">...</DropdownMenuTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View customer</DropdownMenuItem>
                      <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>
              </DataTableCell>
            </DataTableRow>
          ))}
          <DataTableEmpty colSpan={5}>No results.</DataTableEmpty>
        </DataTableBody>
      </DataTableContent>
      <DataTablePagination page={1} pageCount={2}>
        <DataTableSelectionSummary rowCount={5} selectedCount={1}>1 of 5 row(s) selected.</DataTableSelectionSummary>
        <Button disabled size="sm" variant="outline">Previous</Button>
        <Button size="sm" variant="outline">Next</Button>
      </DataTablePagination>
    </DataTable>
  )
}`

const hoverCardDemoSource = `import { Avatar, AvatarFallback, AvatarImage } from 'radcn/avatar'
import { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger } from 'radcn/hover-card'

export function HoverCardDemo() {
  return (
    <HoverCard id="nextjs-hover-card">
      <HoverCardTrigger class="radcn-button radcn-button--link">
        @nextjs
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent style="--radcn-hover-card-width:20rem;">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div class="radcn-hover-card-body">
            <h4>@nextjs</h4>
            <p>The React Framework – created and maintained by @vercel.</p>
            <div>Joined December 2021</div>
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}`

const dialogSource = `import {
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
import { Input } from 'radcn/input'
import { Label } from 'radcn/label'

export function DialogPreview() {
  return (
    <>
      <Dialog defaultOpen={true} id="profile-dialog">
        <DialogTrigger class="radcn-button radcn-button--outline">
          Open Dialog
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent class="radcn-docs-dialog-demo-content" style="width:min(100%,425px);">
            <form method="post">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div style="display:grid;gap:1rem;">
                <Label for="name-1">Name</Label>
                <Input id="name-1" name="name" value="Pedro Duarte" />
                <Label for="username-1">Username</Label>
                <Input id="username-1" name="username" value="@peduarte" />
              </div>
              <DialogFooter>
                <DialogClose class="radcn-button radcn-button--outline">Cancel</DialogClose>
                <button class="radcn-button radcn-button--default" type="submit">
                  Save changes
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      <Dialog defaultOpen={true} id="share-dialog">
        <DialogTrigger class="radcn-button radcn-button--outline">Share</DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent class="radcn-docs-dialog-close-button-content" style="width:min(100%,448px);">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
            <Label class="radcn-sr-only" for="share-link">Link</Label>
            <Input
              id="share-link"
              readOnly
              value="https://ui.shadcn.com/docs/installation"
            />
          <DialogFooter class="radcn-docs-dialog-footer-start" style="justify-content:flex-start;">
            <DialogClose class="radcn-button radcn-button--secondary">Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
    </>
  )
}`

const drawerSource = `import { Button } from 'radcn/button'
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
import { Input } from 'radcn/input'
import { Label } from 'radcn/label'

export function DrawerPreview() {
  return (
    <>
      <Drawer defaultOpen direction="bottom" id="move-goal">
        <DrawerTrigger class="radcn-button radcn-button--outline">
          Open Drawer
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent direction="bottom" showHandle>
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div style="margin:0 auto;width:100%;max-width:24rem;">
              <Button ariaLabel="Decrease" size="icon" variant="outline">-</Button>
              <strong>350</strong>
              <Button ariaLabel="Increase" size="icon" variant="outline">+</Button>
              <span>Calories/day</span>
            </div>
            <DrawerFooter>
              <Button type="submit">Submit</Button>
              <DrawerClose class="radcn-button radcn-button--outline">Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>

      <Dialog id="edit-profile-desktop">
        <DialogTrigger class="radcn-button radcn-button--outline">Edit Profile</DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent style="width:min(100%,425px);">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Label for="email">Email</Label>
            <Input id="email" type="email" value="shadcn@example.com" />
            <Label for="username">Username</Label>
            <Input id="username" value="@shadcn" />
            <DialogFooter><Button type="submit">Save changes</Button></DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      <Drawer direction="bottom" id="edit-profile-mobile">
        <DrawerTrigger class="radcn-button radcn-button--outline">Edit Profile</DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent direction="bottom" showHandle>
            <DrawerHeader style="text-align:left;">
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you're done.
              </DrawerDescription>
            </DrawerHeader>
            <form method="post" style="display:grid;gap:1rem;padding:0 1rem;">
              <Label for="mobile-email">Email</Label>
              <Input id="mobile-email" type="email" value="shadcn@example.com" />
              <Label for="mobile-username">Username</Label>
              <Input id="mobile-username" value="@shadcn" />
              <Button type="submit">Save changes</Button>
            </form>
            <DrawerFooter>
              <DrawerClose class="radcn-button radcn-button--outline">Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </>
  )
}`

const scrollAreaSource = `import { ScrollArea, ScrollAreaThumb, ScrollAreaViewport, ScrollBar } from 'radcn/scroll-area'
import { Separator } from 'radcn/separator'

const tags = Array.from({ length: 50 }, (_, index) => \`v1.2.0-beta.\${50 - index}\`)

const artworks = [
  { artist: 'Ornella Binni', src: 'data:image/svg+xml,...' },
  { artist: 'Tom Byrom', src: 'data:image/svg+xml,...' },
  { artist: 'Vladimir Malyavko', src: 'data:image/svg+xml,...' },
]

export function ScrollAreaPreview() {
  return (
    <>
      <ScrollArea style="width:12rem;height:18rem;">
        <ScrollAreaViewport ariaLabel="Tags">
          <div style="padding:1rem;">
            <h4>Tags</h4>
            {tags.map((tag, index) => (
              <>
                <div>{tag}</div>
                {index < tags.length - 1 && <Separator />}
              </>
            ))}
          </div>
        </ScrollAreaViewport>
        <ScrollBar><ScrollAreaThumb /></ScrollBar>
      </ScrollArea>

      <ScrollArea style="width:24rem;">
        <ScrollAreaViewport ariaLabel="Artwork gallery">
          <div style="display:flex;width:max-content;gap:1rem;padding:1rem;white-space:nowrap;">
            {artworks.map((artwork) => (
              <figure>
                <img src={artwork.src} alt={\`Photo by \${artwork.artist}\`} width="300" height="400" />
                <figcaption>Photo by <strong>{artwork.artist}</strong></figcaption>
              </figure>
            ))}
          </div>
        </ScrollAreaViewport>
        <ScrollBar orientation="horizontal"><ScrollAreaThumb /></ScrollBar>
      </ScrollArea>
    </>
  )
}`

const selectSource = `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radcn/select'

const fruits = [
  ['apple', 'Apple'],
  ['banana', 'Banana'],
  ['blueberry', 'Blueberry'],
  ['grapes', 'Grapes'],
  ['pineapple', 'Pineapple'],
]

const timezones = [
  ['North America', [
    ['est', 'Eastern Standard Time (EST)'],
    ['cst', 'Central Standard Time (CST)'],
    ['mst', 'Mountain Standard Time (MST)'],
    ['pst', 'Pacific Standard Time (PST)'],
    ['akst', 'Alaska Standard Time (AKST)'],
    ['hst', 'Hawaii Standard Time (HST)'],
  ]],
  ['Europe & Africa', [
    ['gmt', 'Greenwich Mean Time (GMT)'],
    ['cet', 'Central European Time (CET)'],
    ['eet', 'Eastern European Time (EET)'],
    ['west', 'Western European Summer Time (WEST)'],
    ['cat', 'Central Africa Time (CAT)'],
    ['eat', 'East Africa Time (EAT)'],
  ]],
  ['Asia', [
    ['msk', 'Moscow Time (MSK)'],
    ['ist', 'India Standard Time (IST)'],
    ['cst_china', 'China Standard Time (CST)'],
    ['jst', 'Japan Standard Time (JST)'],
    ['kst', 'Korea Standard Time (KST)'],
    ['ist_indonesia', 'Indonesia Central Standard Time (WITA)'],
  ]],
  ['Australia & Pacific', [
    ['awst', 'Australian Western Standard Time (AWST)'],
    ['acst', 'Australian Central Standard Time (ACST)'],
    ['aest', 'Australian Eastern Standard Time (AEST)'],
    ['nzst', 'New Zealand Standard Time (NZST)'],
    ['fjt', 'Fiji Time (FJT)'],
  ]],
  ['South America', [
    ['art', 'Argentina Time (ART)'],
    ['bot', 'Bolivia Time (BOT)'],
    ['brt', 'Brasilia Time (BRT)'],
    ['clt', 'Chile Standard Time (CLT)'],
  ]],
]

export function SelectPreview() {
  return (
    <>
      <Select name="fruit" style="width:180px;">
        <SelectTrigger ariaLabel="Fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectViewport>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {fruits.map(([value, label]) => (
                <SelectItem textValue={label} value={value}>{label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectViewport>
        </SelectContent>
      </Select>

      <Select name="timezone" style="width:280px;">
        <SelectTrigger ariaLabel="Timezone">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectScrollUpButton />
          <SelectViewport style="max-height:12rem;overflow:auto;">
            {timezones.map(([group, options]) => (
              <SelectGroup>
                <SelectLabel>{group}</SelectLabel>
                {options.map(([value, label]) => (
                  <SelectItem textValue={label} value={value}>{label}</SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectViewport>
          <SelectScrollDownButton />
        </SelectContent>
      </Select>
    </>
  )
}`

const sheetSource = `import { Button } from 'radcn/button'
import { Input } from 'radcn/input'
import { Label } from 'radcn/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from 'radcn/sheet'

const sheetSides = ['top', 'right', 'bottom', 'left'] as const

export function SheetPreview() {
  return (
    <>
      <Sheet id="profile-sheet">
        <SheetTrigger class="radcn-button radcn-button--outline">Open</SheetTrigger>
        <SheetPortal>
          <SheetOverlay />
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
            </SheetHeader>
            <Label for="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" value="Pedro Duarte" />
            <Label for="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" value="@peduarte" />
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose class="radcn-button radcn-button--outline">Close</SheetClose>
            </SheetFooter>
          </SheetContent>
        </SheetPortal>
      </Sheet>

      <div>
        {sheetSides.map((side) => (
          <Sheet id={\`profile-sheet-\${side}\`}>
            <SheetTrigger class="radcn-button radcn-button--outline">{side}</SheetTrigger>
            <SheetPortal>
              <SheetOverlay />
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
                </SheetHeader>
                <Label for={\`sheet-side-\${side}-name\`}>Name</Label>
                <Input id={\`sheet-side-\${side}-name\`} value="Pedro Duarte" />
                <Label for={\`sheet-side-\${side}-username\`}>Username</Label>
                <Input id={\`sheet-side-\${side}-username\`} value="@peduarte" />
                <SheetFooter><SheetClose>Save changes</SheetClose></SheetFooter>
              </SheetContent>
            </SheetPortal>
          </Sheet>
        ))}
      </div>
    </>
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

const tabsDemoSource = `import { Button } from 'radcn/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'radcn/card'
import { Input } from 'radcn/input'
import { Label } from 'radcn/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'radcn/tabs'

export function TabsDemo() {
  return (
    <div class="flex w-full max-w-sm flex-col gap-6" style="display:flex;width:100%;max-width:24rem;flex-direction:column;gap:1.5rem;">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6" style="display:grid;gap:1.5rem;">
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" value="Pedro Duarte" />
              </div>
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" value="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6" style="display:grid;gap:1.5rem;">
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}`

const sonnerSource = `import { Button } from 'radcn/button'
import { Toaster } from 'radcn/sonner'

export function SonnerPreview() {
  return (
    <div class="sonner-examples">
      <section data-radcn-docs-sonner-family="sonner-demo">
        <span
          data-radcn-toast-trigger
          data-toast-action-label="Undo"
          data-toast-action-url="#undo"
          data-toast-description="Sunday, December 03, 2023 at 9:00 AM"
          data-toast-duration="0"
          data-toast-title="Event has been created"
        >
          <Button variant="outline">Show Toast</Button>
        </span>
        <Toaster defaultDuration={0} />
      </section>

      <section data-radcn-docs-sonner-family="sonner-types">
        <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Event has been created">
          <Button variant="outline">Default</Button>
        </span>
        <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Event has been created" data-toast-type="success">
          <Button variant="outline">Success</Button>
        </span>
        <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Be at the area 10 minutes before the event time" data-toast-type="info">
          <Button variant="outline">Info</Button>
        </span>
        <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Event start time cannot be earlier than 8am" data-toast-type="warning">
          <Button variant="outline">Warning</Button>
        </span>
        <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Event has not been created" data-toast-type="error">
          <Button variant="outline">Error</Button>
        </span>
        <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Loading..." data-toast-type="loading">
          <Button variant="outline">Promise</Button>
        </span>
        <Toaster defaultDuration={0} />
      </section>
    </div>
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

const alertSource = `import { Alert, AlertDescription, AlertTitle } from 'radcn/alert'

function AlertIcon({ label }: { label: string }) {
  return (
    <svg aria-hidden="true" class="alert-icon" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      <title>{label}</title>
    </svg>
  )
}

export function AlertExamples() {
  return (
    <div class="alert-example-grid">
      <Alert>
        <AlertIcon label="CheckCircle2Icon" />
        <div>
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
        </div>
      </Alert>

      <Alert>
        <AlertIcon label="PopcornIcon" />
        <div>
          <AlertTitle>This Alert has a title and an icon. No description.</AlertTitle>
        </div>
      </Alert>

      <Alert variant="destructive">
        <AlertIcon label="AlertCircleIcon" />
        <div>
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul>
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </div>
      </Alert>

      <Alert variant="destructive">
        <AlertIcon label="AlertCircleIcon" />
        <div>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        </div>
      </Alert>
    </div>
  )
}`

function AlertExampleIcon({ kind }: { kind: string }) {
  return (
    <svg
      aria-hidden="true"
      data-radcn-docs-alert-icon={kind}
      fill="none"
      style="width:1rem;height:1rem;margin-top:0.125rem;color:currentColor"
      viewBox="0 0 24 24"
    >
      {kind === 'popcorn' ? (
        <>
          <path d="M7 9h10l-1 10H8L7 9Z" stroke="currentColor" stroke-linejoin="round" stroke-width="2" />
          <path d="M8 9 7 5l3 2 2-3 2 3 3-2-1 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </>
      ) : kind === 'alert-circle' ? (
        <>
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
          <path d="M12 8v5" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
          <path d="M12 16h.01" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
          <path d="m8.5 12.5 2.25 2.25L15.5 10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </>
      )}
    </svg>
  )
}

function AlertPreview() {
  return () => (
    <div mix={previewStackStyle} style="width:min(100%,36rem)">
      <div data-radcn-docs-alert-family="alert-demo" mix={previewStackStyle} style="width:100%">
        <Alert style="grid-template-columns:auto minmax(0,1fr);column-gap:0.75rem;align-items:start">
          {AlertExampleIcon({ kind: 'check-circle' })}
          <div style="display:grid;gap:0.375rem">
            <AlertTitle>Success! Your changes have been saved</AlertTitle>
            <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
          </div>
        </Alert>

        <Alert style="grid-template-columns:auto minmax(0,1fr);column-gap:0.75rem;align-items:start">
          {AlertExampleIcon({ kind: 'popcorn' })}
          <div style="display:grid;gap:0.375rem">
            <AlertTitle>This Alert has a title and an icon. No description.</AlertTitle>
          </div>
        </Alert>

        <Alert
          style="grid-template-columns:auto minmax(0,1fr);column-gap:0.75rem;align-items:start"
          variant="destructive"
        >
          {AlertExampleIcon({ kind: 'alert-circle' })}
          <div style="display:grid;gap:0.375rem">
            <AlertTitle>Unable to process your payment.</AlertTitle>
            <AlertDescription>
              <p>Please verify your billing information and try again.</p>
              <ul style="margin:0;padding-left:1.25rem">
                <li>Check your card details</li>
                <li>Ensure sufficient funds</li>
                <li>Verify billing address</li>
              </ul>
            </AlertDescription>
          </div>
        </Alert>
      </div>

      <div data-radcn-docs-alert-family="alert-destructive">
        <Alert
          style="grid-template-columns:auto minmax(0,1fr);column-gap:0.75rem;align-items:start"
          variant="destructive"
        >
          {AlertExampleIcon({ kind: 'alert-circle' })}
          <div style="display:grid;gap:0.375rem">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
          </div>
        </Alert>
      </div>
    </div>
  )
}

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

const collapsibleDemoSource = `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'radcn/collapsible'

function RepositoryRow({ ariaHidden, children }: { ariaHidden?: boolean; children: string }) {
  return (
    <div
      aria-hidden={ariaHidden ? 'true' : undefined}
      class="rounded-md border px-4 py-2 font-mono text-sm"
    >
      {children}
    </div>
  )
}

export function CollapsibleDemo() {
  return (
    <Collapsible class="flex w-[350px] flex-col gap-2">
      <CollapsibleTrigger class="flex w-[350px] flex-col gap-2">
        <span class="flex items-center justify-between gap-4 px-4">
          <h4 aria-hidden="true" class="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <span class="radcn-button radcn-button--ghost radcn-button--icon size-8">
            <span class="radcn-sr-only">Toggle</span>
            <span aria-hidden="true">⇵</span>
          </span>
        </span>
        <RepositoryRow ariaHidden>@radix-ui/primitives</RepositoryRow>
      </CollapsibleTrigger>
      <CollapsibleContent class="flex flex-col gap-2">
        <RepositoryRow>@radix-ui/colors</RepositoryRow>
        <RepositoryRow>@stitches/react</RepositoryRow>
      </CollapsibleContent>
    </Collapsible>
  )
}`

function CollapsibleRepositoryRow({ ariaHidden, children }: { ariaHidden?: boolean; children: string }) {
  return (
    <div
      aria-hidden={ariaHidden ? 'true' : undefined}
      class="rounded-md border px-4 py-2 font-mono text-sm"
      data-radcn-docs-collapsible-row
      style='border:1px solid var(--radcn-border);border-radius:calc(var(--radcn-radius) - 0.125rem);padding:0.5rem 1rem;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-size:0.875rem;line-height:1.25rem;'
    >
      {children}
    </div>
  )
}

function CollapsibleDemoPreview() {
  return () => (
    <div data-radcn-docs-collapsible-family="collapsible-demo" mix={collapsibleDemoStyle}>
      <Collapsible
        class="flex w-[350px] flex-col gap-2 radcn-docs-collapsible-demo"
        style="display:flex;width:350px;max-width:100%;flex-direction:column;gap:0.5rem;border:0;background:transparent;color:var(--radcn-foreground);"
      >
        <CollapsibleTrigger
          class="flex w-[350px] flex-col gap-2 radcn-docs-collapsible-demo-trigger"
          style="display:flex;width:350px;max-width:100%;flex-direction:column;gap:0.5rem;padding:0;"
        >
          <span
            class="flex items-center justify-between gap-4 px-4 radcn-docs-collapsible-demo-header"
            data-radcn-docs-collapsible-header
            style="display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:0;padding-inline:1rem;"
          >
            <h4 aria-hidden="true" style="margin:0;font-size:0.875rem;font-weight:600;line-height:1.25rem;">@peduarte starred 3 repositories</h4>
            <span
              class="radcn-button radcn-button--ghost radcn-button--icon size-8"
              data-radcn-docs-collapsible-icon-button
              style="width:2rem;min-height:2rem;height:2rem;flex:0 0 auto;justify-content:center;gap:0;padding:0;border-radius:calc(var(--radcn-radius) - 0.125rem);"
            >
              <span class="radcn-sr-only">Toggle</span>
              <span aria-hidden="true" data-radcn-docs-collapsible-chevrons style="font-size:1rem;line-height:1;">
                ⇵
              </span>
            </span>
          </span>
          {CollapsibleRepositoryRow({ ariaHidden: true, children: '@radix-ui/primitives' })}
        </CollapsibleTrigger>
        <CollapsibleContent class="flex flex-col gap-2" style="display:flex;flex-direction:column;gap:0.5rem;border-top:0;color:inherit;">
          {CollapsibleRepositoryRow({ children: '@radix-ui/colors' })}
          {CollapsibleRepositoryRow({ children: '@stitches/react' })}
        </CollapsibleContent>
      </Collapsible>
      <p style="margin:0;color:var(--radcn-docs-muted);font-size:0.875rem;">
        React useState(false), open, and onOpenChange map to native
        details/summary open state for this example; apps can add browser
        enhancement if they need synchronized state outside the disclosure.
      </p>
    </div>
  )
}

const contextMenuDemoSource = `import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from 'radcn/context-menu'

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent class="w-52" style="width:13rem;min-width:13rem">
          <ContextMenuItem inset textValue="Back">
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled inset textValue="Forward">
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset textValue="Reload">
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset textValue="More Tools">More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent class="w-44" style="width:11rem;min-width:11rem">
              <ContextMenuItem textValue="Save Page">Save Page...</ContextMenuItem>
              <ContextMenuItem textValue="Create Shortcut">Create Shortcut...</ContextMenuItem>
              <ContextMenuItem textValue="Name Window">Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem textValue="Developer Tools">Developer Tools</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem textValue="Delete" variant="destructive">Delete</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked textValue="Show Bookmarks">Show Bookmarks</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem textValue="Show Full URLs">Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuRadioItem value="pedro" textValue="Pedro Duarte">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm" textValue="Colm Tuite">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  )
}`

function ContextMenuDemoItems() {
  return (
    <>
      <ContextMenuItem inset textValue="Back">Back<ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
      <ContextMenuItem disabled inset textValue="Forward">Forward<ContextMenuShortcut>⌘]</ContextMenuShortcut></ContextMenuItem>
      <ContextMenuItem inset textValue="Reload">Reload<ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger inset textValue="More Tools">More Tools</ContextMenuSubTrigger>
        <ContextMenuSubContent class="w-44" style="width:11rem;min-width:11rem">
          <ContextMenuItem textValue="Save Page">Save Page...</ContextMenuItem>
          <ContextMenuItem textValue="Create Shortcut">Create Shortcut...</ContextMenuItem>
          <ContextMenuItem textValue="Name Window">Name Window...</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem textValue="Developer Tools">Developer Tools</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem textValue="Delete" variant="destructive">Delete</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked textValue="Show Bookmarks">Show Bookmarks</ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem textValue="Show Full URLs">Show Full URLs</ContextMenuCheckboxItem>
      <ContextMenuSeparator />
      <ContextMenuRadioGroup value="pedro">
        <ContextMenuLabel inset>People</ContextMenuLabel>
        <ContextMenuRadioItem value="pedro" textValue="Pedro Duarte">Pedro Duarte</ContextMenuRadioItem>
        <ContextMenuRadioItem value="colm" textValue="Colm Tuite">Colm Tuite</ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </>
  )
}

function ContextMenuDemoPreview() {
  return () => (
    <div data-radcn-docs-context-menu-family="context-menu-demo" mix={contextMenuDemoStyle}>
      <div data-radcn-docs-context-menu-layout>
        <ContextMenu defaultOpen id="docs-context-menu-demo">
          <ContextMenuTrigger
            class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm radcn-docs-context-menu-demo-trigger"
            style="display:flex;width:300px;height:150px;align-items:center;justify-content:center;border:1px dashed var(--radcn-border);border-radius:calc(var(--radcn-radius) - 0.125rem);font-size:0.875rem;"
          >
            Right click here
          </ContextMenuTrigger>
          <ContextMenuPortal>
            <ContextMenuContent class="w-52 radcn-docs-context-menu-demo-content" style="width:13rem;min-width:13rem">
              {ContextMenuDemoItems()}
            </ContextMenuContent>
          </ContextMenuPortal>
        </ContextMenu>
      </div>
      <p style="margin:0;color:var(--radcn-docs-muted);font-size:0.875rem;">
        React client components and Radix Context Menu map to RadCN
        dependency-free menu-overlay behavior: right-click and keyboard
        activation enhance public data hooks while this docs preview keeps
        content visible for inspection.
      </p>
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

function CardPreview() {
  return () => (
    <div mix={previewStackStyle}>
      <div data-radcn-docs-card-family="card-demo">
        <Card class="radcn-docs-card-demo" style="width:min(100%,24rem);">
          <CardHeader>
            <div>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </div>
            <CardAction><Button href="/docs/components/card#signup" variant="link">Sign Up</Button></CardAction>
          </CardHeader>
          <form action="/docs/components/card" method="post" data-radcn-docs-card-form="login">
            <CardContent>
              <div style="display:grid;gap:1rem;">
                <div style="display:grid;gap:0.5rem;">
                  <Label for="docs-card-email">Email</Label>
                  <Input id="docs-card-email" name="email" placeholder="m@example.com" required type="email" />
                </div>
                <div style="display:grid;gap:0.5rem;">
                  <div style="display:flex;align-items:center;gap:0.75rem;">
                    <Label for="docs-card-password">Password</Label>
                    <a href="/docs/components/card#forgot-password" style="margin-left:auto;font-size:0.875rem;">Forgot your password?</a>
                  </div>
                  <Input id="docs-card-password" name="password" required type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter style="display:grid;gap:0.5rem;">
              <Button style="width:100%;" type="submit">Login</Button>
              <Button style="width:100%;" variant="outline">Login with Google</Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div data-radcn-docs-card-family="card-with-form">
        <Card class="radcn-docs-card-with-form" style="width:min(100%,350px);">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <form action="/docs/components/card" method="post" data-radcn-docs-card-form="project">
            <CardContent>
              <div style="display:grid;gap:1rem;">
                <div style="display:grid;gap:0.5rem;">
                  <Label for="docs-card-project-name">Name</Label>
                  <Input id="docs-card-project-name" name="project" placeholder="Name of your project" />
                </div>
                <div style="display:grid;gap:0.5rem;">
                  <Label for="docs-card-framework-trigger">Framework</Label>
                  <Select defaultOpen id="docs-card-framework" name="framework">
                    <SelectTrigger id="docs-card-framework-trigger" style="width:100%;"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectPortal>
                      <SelectContent position="popper">
                        <SelectViewport>
                          <SelectItem value="next">Next.js</SelectItem>
                          <SelectItem value="sveltekit">SvelteKit</SelectItem>
                          <SelectItem value="astro">Astro</SelectItem>
                          <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectViewport>
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter style="display:flex;justify-content:space-between;gap:0.75rem;">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Deploy</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

function CommandExampleIcon({ label }: { label: string }) {
  return <span aria-hidden="true" data-radcn-docs-command-icon={label}>{label.slice(0, 1)}</span>
}

function CommandExampleLabel({ children, icon }: { children: RemixNode; icon: string }) {
  return <span data-radcn-docs-command-row-content style="display:inline-flex;align-items:center;gap:0.5rem;min-width:0;">{CommandExampleIcon({ label: icon })}<span>{children}</span></span>
}

function CommandExampleRows({ dialog = false, idPrefix }: { dialog?: boolean; idPrefix: string }) {
  return (
    <>
      <CommandGroup heading="Suggestions" id={`${idPrefix}-suggestions`}>
        <CommandItem value="calendar">{CommandExampleLabel({ icon: 'Calendar', children: 'Calendar' })}</CommandItem>
        <CommandItem value="search-emoji">{CommandExampleLabel({ icon: 'Smile', children: 'Search Emoji' })}</CommandItem>
        <CommandItem disabled={!dialog} value="calculator">{CommandExampleLabel({ icon: 'Calculator', children: 'Calculator' })}</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings" id={`${idPrefix}-settings`}>
        <CommandItem value="profile">{CommandExampleLabel({ icon: 'User', children: 'Profile' })}<CommandShortcut>⌘P</CommandShortcut></CommandItem>
        <CommandItem value="billing">{CommandExampleLabel({ icon: 'CreditCard', children: 'Billing' })}<CommandShortcut>⌘B</CommandShortcut></CommandItem>
        <CommandItem value="settings">{CommandExampleLabel({ icon: 'Settings', children: 'Settings' })}<CommandShortcut>⌘S</CommandShortcut></CommandItem>
      </CommandGroup>
    </>
  )
}

function CommandPreview() {
  return () => (
    <div mix={previewStackStyle}>
      <div data-radcn-docs-command-family="command-demo">
        <Command class="radcn-docs-command-demo" id="docs-command-demo" style="width:min(100%,450px);border:1px solid var(--radcn-border);border-radius:0.5rem;box-shadow:0 1px 2px rgb(0 0 0 / 0.08);">
          <CommandInput ariaLabel="Command" placeholder="Type a command or search..." />
          <CommandList>
            {CommandExampleRows({ idPrefix: 'docs-command-demo' })}
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </Command>
      </div>

      <div data-radcn-docs-command-family="command-dialog" data-radcn-docs-command-dialog-shortcut="true">
        <p data-radcn-docs-command-dialog-guidance style="margin:0 0 0.75rem;color:var(--radcn-muted-foreground);font-size:0.875rem;">
          Press <KbdGroup><Kbd>⌘</Kbd><Kbd>J</Kbd></KbdGroup>
        </p>
        <CommandDialog title="Command Palette" description="Search for a command to run...">
          <Command id="docs-command-dialog">
            <CommandInput ariaLabel="Command dialog" placeholder="Type a command or search..." />
            <CommandList>
              {CommandExampleRows({ dialog: true, idPrefix: 'docs-command-dialog' })}
              <CommandEmpty>No results found.</CommandEmpty>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </div>
  )
}

function CalendarPreview() {
  return () => (
    <div mix={previewStackStyle}>
      <div data-radcn-docs-calendar-family="calendar-demo">
        <Calendar
          captionLayout="dropdown"
          class="radcn-docs-calendar-demo"
          defaultMonth="2026-06-01"
          defaultSelected="2026-06-12"
          max="2030-12-31"
          min="2020-01-01"
          name="docs-calendar-demo"
          style="--radcn-calendar-border:#0f766e;--radcn-calendar-cell-size:2.35rem;width:min(100%,24rem);"
        />
      </div>

      <div data-radcn-docs-calendar-family="calendar-hijri">
        <div data-radcn-docs-calendar-divergence="calendar-hijri" style="border:1px solid var(--radcn-border);border-radius:var(--radcn-radius);padding:1rem;width:min(100%,34rem);">
          <h3>calendar-hijri is an intentional divergence</h3>
          <p>Persian and Hijri rendering is app-owned alternate-calendar work that may compose its own engine with RadCN tokens and hooks.</p>
          <p>RadCN does not depend on react-day-picker/persian, next/font, or lucide-react.</p>
        </div>
      </div>
    </div>
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

const dataTablePayments = [
  { id: 'm5gr84i9', status: 'success', statusLabel: 'Success', email: 'ken99@example.com', amount: '$316.00', selected: true },
  { id: '3u1reuv4', status: 'success', statusLabel: 'Success', email: 'abe45@example.com', amount: '$242.00' },
  { id: 'derv1ws0', status: 'processing', statusLabel: 'Processing', email: 'monserrat44@example.com', amount: '$837.00' },
  { id: '5kma53ae', status: 'success', statusLabel: 'Success', email: 'silas22@example.com', amount: '$874.00' },
  { id: 'bhqecj4p', status: 'failed', statusLabel: 'Failed', email: 'carmella@example.com', amount: '$721.00' },
]

function DataTableDemoPreview() {
  return () => (
    <div data-radcn-docs-data-table-family="data-table-demo" style="display:grid;gap:1rem;width:min(100%,56rem);">
      <DataTable caption="Payments" rowCount={5} selectedCount={1} style="width:100%;max-width:none;">
        <form action="/docs/components/data-table" method="get">
          <DataTableToolbar>
            <DataTableFilter label="Filter emails">
              <Input name="email" placeholder="Filter emails..." />
            </DataTableFilter>
            <DataTableColumnControls>
              <DropdownMenu defaultOpen id="docs-data-table-columns">
                <DropdownMenuTrigger class="radcn-button radcn-button--outline">
                  Columns <span aria-hidden="true" data-radcn-docs-data-table-icon="chevron-down">v</span>
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent align="end" style="width:10rem">
                    <DropdownMenuCheckboxItem checked textValue="status">status</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked textValue="email">email</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked textValue="amount">amount</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            </DataTableColumnControls>
          </DataTableToolbar>
        </form>
        <DataTableContent caption="Payments" class="overflow-hidden rounded-md border" dense style="overflow:hidden;border:1px solid var(--radcn-border);border-radius:var(--radcn-radius);">
          <DataTableHeader>
            <DataTableRow>
              <DataTableHeaderCell>
                <label style="display:inline-flex;align-items:center;">
                  <Checkbox name="select-all" />
                  <span class="radcn-sr-only">Select all</span>
                </label>
              </DataTableHeaderCell>
              <DataTableHeaderCell>Status</DataTableHeaderCell>
              <DataTableHeaderCell ariaSort="ascending" href="/docs/components/data-table?sort=email">
                Email <span aria-hidden="true" data-radcn-docs-data-table-icon="arrow-up-down">↕</span>
              </DataTableHeaderCell>
              <DataTableHeaderCell class="text-right" style="text-align:right;">Amount</DataTableHeaderCell>
              <DataTableHeaderCell class="text-right" style="text-align:right;">Actions</DataTableHeaderCell>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>
            {dataTablePayments.map((payment, index) => (
              <DataTableRow selected={payment.selected}>
                <DataTableCell>
                  <label style="display:inline-flex;align-items:center;">
                    <Checkbox checked={payment.selected} name="rows" value={payment.id} />
                    <span class="radcn-sr-only">Select row</span>
                  </label>
                </DataTableCell>
                <DataTableCell><span data-payment-status={payment.status}>{payment.statusLabel}</span></DataTableCell>
                <DataTableCell class="lowercase"><span class="lowercase" data-payment-id={payment.id}>{payment.email}</span></DataTableCell>
                <DataTableCell class="text-right font-medium" style="text-align:right;font-weight:500;">{payment.amount}</DataTableCell>
                <DataTableCell class="text-right" style="text-align:right;">
                  <DataTableRowActions>
                    <DropdownMenu defaultOpen={index === 0} id={`docs-data-table-row-${payment.id}`}>
                      <DropdownMenuTrigger ariaLabel="Open menu" class="radcn-button radcn-button--ghost radcn-button--icon-sm" data-payment-id={payment.id}>
                        <span class="radcn-sr-only">Open menu</span>
                        <span aria-hidden="true" data-radcn-docs-data-table-icon="more-horizontal">...</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuContent align="end" style="width:12rem">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem textValue="Copy payment ID"><span data-payment-copy-id={payment.id}>Copy payment ID</span></DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem textValue="View customer">View customer</DropdownMenuItem>
                          <DropdownMenuItem textValue="View payment details">View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenuPortal>
                    </DropdownMenu>
                  </DataTableRowActions>
                </DataTableCell>
              </DataTableRow>
            ))}
            <DataTableEmpty colSpan={5}>No results.</DataTableEmpty>
          </DataTableBody>
        </DataTableContent>
        <DataTablePagination page={1} pageCount={2}>
          <DataTableSelectionSummary rowCount={5} selectedCount={1}>1 of 5 row(s) selected.</DataTableSelectionSummary>
          <div style="display:flex;gap:0.5rem;">
            <Button disabled size="sm" variant="outline">Previous</Button>
            <Button size="sm" variant="outline">Next</Button>
          </div>
        </DataTablePagination>
        <DataTableDetail>
          <strong>Clipboard behavior</strong>
          <p style="margin:0.25rem 0 0;color:var(--radcn-muted-foreground);">
            Copy payment ID stays app-owned browser behavior over the visible
            payment id data.
          </p>
        </DataTableDetail>
      </DataTable>
    </div>
  )
}

function HoverCardDemoPreview() {
  return () => (
    <div data-radcn-docs-hover-card-family="hover-card-demo" style="display:grid;justify-items:start;gap:1rem;">
      <HoverCard id="docs-hover-card-demo">
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
              class="radcn-hover-card-body"
              data-radcn-docs-hover-card-layout="profile"
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

function DialogPreview() {
  return () => (
    <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
      <div data-radcn-docs-dialog-family="dialog-demo">
        <Dialog defaultOpen={true} id="docs-dialog-demo">
          <DialogTrigger class="radcn-button radcn-button--outline">Open Dialog</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent class="radcn-docs-dialog-demo-content" style="width:min(100%,425px);">
              <form action="/docs/components/dialog" method="post" data-radcn-docs-dialog-form="profile">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <div style="display:grid;gap:1rem;">
                  <div style="display:grid;gap:0.5rem;">
                    <Label for="docs-dialog-name">Name</Label>
                    <Input id="docs-dialog-name" name="name" value="Pedro Duarte" />
                  </div>
                  <div style="display:grid;gap:0.5rem;">
                    <Label for="docs-dialog-username">Username</Label>
                    <Input id="docs-dialog-username" name="username" value="@peduarte" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose class="radcn-button radcn-button--outline">Cancel</DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>

      <div data-radcn-docs-dialog-family="dialog-close-button">
        <Dialog defaultOpen={true} id="docs-dialog-close-button">
          <DialogTrigger class="radcn-button radcn-button--outline">Share</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent class="radcn-docs-dialog-close-button-content" style="width:min(100%,448px);">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
              </DialogHeader>
              <div style="display:flex;align-items:center;gap:0.5rem;">
                <div style="display:grid;flex:1;gap:0.5rem;">
                  <Label class="radcn-sr-only" for="docs-dialog-share-link">Link</Label>
                  <Input id="docs-dialog-share-link" readOnly value="https://ui.shadcn.com/docs/installation" />
                </div>
              </div>
              <DialogFooter class="radcn-docs-dialog-footer-start" style="justify-content:flex-start;">
                <DialogClose class="radcn-button radcn-button--secondary">Close</DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </div>
  )
}

function DrawerPreview() {
  return () => {
    let data = [400, 300, 200, 300, 200, 278, 189, 239, 300, 200, 278, 189, 349]

    return (
      <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
        <div data-radcn-docs-drawer-family="drawer-demo">
          <Drawer defaultOpen direction="bottom" id="docs-drawer-demo">
            <DrawerTrigger class="radcn-button radcn-button--outline">Open Drawer</DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay />
              <DrawerContent class="radcn-docs-drawer-demo-content" direction="bottom" showHandle>
                <div data-radcn-docs-drawer-layout="move-goal" style="margin:0 auto;width:100%;max-width:24rem;">
                  <DrawerHeader>
                    <DrawerTitle>Move Goal</DrawerTitle>
                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                  </DrawerHeader>
                  <div style="display:grid;gap:1rem;padding:0 1rem;">
                    <div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:1rem;">
                      <Button ariaLabel="Decrease" size="icon" variant="outline">-</Button>
                      <div style="text-align:center;">
                        <div data-radcn-docs-drawer-goal-value style="font-size:3rem;font-weight:700;line-height:1;">350</div>
                        <div>Calories/day</div>
                      </div>
                      <Button ariaLabel="Increase" size="icon" variant="outline">+</Button>
                    </div>
                    <div data-radcn-docs-drawer-bounds style="display:flex;gap:0.5rem;justify-content:center;">
                      <Button ariaLabel="Decrease at minimum" disabled size="icon-sm" variant="outline">-</Button>
                      <Button ariaLabel="Increase at maximum" disabled size="icon-sm" variant="outline">+</Button>
                    </div>
                    <div
                      aria-label="Daily activity goal history"
                      data-radcn-docs-drawer-chart
                      role="img"
                      style="display:flex;align-items:end;gap:0.25rem;height:120px;padding:0.75rem 0;"
                    >
                      {data.map((value) => (
                        <span
                          data-goal={String(value)}
                          data-radcn-docs-drawer-bar
                          style={`display:block;flex:1;min-width:0;border-radius:999px;background:var(--radcn-primary);height:${Math.max(24, Math.round(value / 4))}px;opacity:${value < 220 ? '0.42' : '0.8'};`}
                        />
                      ))}
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button type="submit">Submit</Button>
                    <DrawerClose class="radcn-button radcn-button--outline">Cancel</DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </DrawerPortal>
          </Drawer>
        </div>

        <div data-radcn-docs-drawer-family="drawer-dialog" style="display:grid;gap:1rem;">
          <div data-radcn-docs-drawer-dialog-branch="desktop">
            <Dialog defaultOpen={true} id="docs-drawer-dialog-desktop">
              <DialogTrigger class="radcn-button radcn-button--outline">Edit Profile</DialogTrigger>
              <DialogPortal>
                <DialogOverlay />
                <DialogContent class="radcn-docs-drawer-dialog-desktop-content" style="width:min(100%,425px);">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                  </DialogHeader>
                  <form action="/docs/components/drawer" data-radcn-docs-drawer-form="desktop" method="post" style="display:grid;gap:1rem;">
                    <div style="display:grid;gap:0.5rem;">
                      <Label for="docs-drawer-dialog-desktop-email">Email</Label>
                      <Input id="docs-drawer-dialog-desktop-email" name="email" type="email" value="shadcn@example.com" />
                    </div>
                    <div style="display:grid;gap:0.5rem;">
                      <Label for="docs-drawer-dialog-desktop-username">Username</Label>
                      <Input id="docs-drawer-dialog-desktop-username" name="username" value="@shadcn" />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>

          <div data-radcn-docs-drawer-dialog-branch="mobile">
            <Drawer defaultOpen direction="bottom" id="docs-drawer-dialog-mobile">
              <DrawerTrigger class="radcn-button radcn-button--outline">Edit Profile</DrawerTrigger>
              <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent class="radcn-docs-drawer-dialog-mobile-content" direction="bottom" showHandle>
                  <DrawerHeader style="text-align:left;">
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>Make changes to your profile here. Click save when you're done.</DrawerDescription>
                  </DrawerHeader>
                  <form action="/docs/components/drawer" data-radcn-docs-drawer-form="mobile" method="post" style="display:grid;gap:1rem;padding:0 1rem;">
                    <div style="display:grid;gap:0.5rem;">
                      <Label for="docs-drawer-dialog-mobile-email">Email</Label>
                      <Input id="docs-drawer-dialog-mobile-email" name="email" type="email" value="shadcn@example.com" />
                    </div>
                    <div style="display:grid;gap:0.5rem;">
                      <Label for="docs-drawer-dialog-mobile-username">Username</Label>
                      <Input id="docs-drawer-dialog-mobile-username" name="username" value="@shadcn" />
                    </div>
                    <Button type="submit">Save changes</Button>
                  </form>
                  <DrawerFooter>
                    <DrawerClose class="radcn-button radcn-button--outline">Cancel</DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </DrawerPortal>
            </Drawer>
          </div>
        </div>
      </div>
    )
  }
}

const scrollAreaTags = Array.from({ length: 50 }, (_, index) => `v1.2.0-beta.${50 - index}`)
const scrollAreaArtworks = [
  {
    artist: 'Ornella Binni',
    color: '#0f766e',
    src: "data:image/svg+xml,%3Csvg viewBox='0 0 300 400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='400' fill='%230f766e'/%3E%3Ccircle cx='92' cy='112' r='52' fill='%23ccfbf1'/%3E%3Cpath d='M24 332 C92 246 176 286 276 176 L276 400 L24 400 Z' fill='%23134e4a'/%3E%3C/svg%3E",
  },
  {
    artist: 'Tom Byrom',
    color: '#7c3aed',
    src: "data:image/svg+xml,%3Csvg viewBox='0 0 300 400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='400' fill='%237c3aed'/%3E%3Crect x='54' y='74' width='192' height='252' rx='28' fill='%23ede9fe'/%3E%3Cpath d='M72 304 L144 188 L204 248 L246 156 L246 326 L72 326 Z' fill='%235b21b6'/%3E%3C/svg%3E",
  },
  {
    artist: 'Vladimir Malyavko',
    color: '#be123c',
    src: "data:image/svg+xml,%3Csvg viewBox='0 0 300 400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='400' fill='%23be123c'/%3E%3Cpath d='M40 96 L260 40 L222 344 L76 360 Z' fill='%23ffe4e6'/%3E%3Ccircle cx='192' cy='156' r='46' fill='%239f1239'/%3E%3C/svg%3E",
  },
]

const selectFruits = [
  ['apple', 'Apple'],
  ['banana', 'Banana'],
  ['blueberry', 'Blueberry'],
  ['grapes', 'Grapes'],
  ['pineapple', 'Pineapple'],
] as const

const selectTimezoneGroups = [
  {
    label: 'North America',
    options: [
      ['est', 'Eastern Standard Time (EST)'],
      ['cst', 'Central Standard Time (CST)'],
      ['mst', 'Mountain Standard Time (MST)'],
      ['pst', 'Pacific Standard Time (PST)'],
      ['akst', 'Alaska Standard Time (AKST)'],
      ['hst', 'Hawaii Standard Time (HST)'],
    ],
  },
  {
    label: 'Europe & Africa',
    options: [
      ['gmt', 'Greenwich Mean Time (GMT)'],
      ['cet', 'Central European Time (CET)'],
      ['eet', 'Eastern European Time (EET)'],
      ['west', 'Western European Summer Time (WEST)'],
      ['cat', 'Central Africa Time (CAT)'],
      ['eat', 'East Africa Time (EAT)'],
    ],
  },
  {
    label: 'Asia',
    options: [
      ['msk', 'Moscow Time (MSK)'],
      ['ist', 'India Standard Time (IST)'],
      ['cst_china', 'China Standard Time (CST)'],
      ['jst', 'Japan Standard Time (JST)'],
      ['kst', 'Korea Standard Time (KST)'],
      ['ist_indonesia', 'Indonesia Central Standard Time (WITA)'],
    ],
  },
  {
    label: 'Australia & Pacific',
    options: [
      ['awst', 'Australian Western Standard Time (AWST)'],
      ['acst', 'Australian Central Standard Time (ACST)'],
      ['aest', 'Australian Eastern Standard Time (AEST)'],
      ['nzst', 'New Zealand Standard Time (NZST)'],
      ['fjt', 'Fiji Time (FJT)'],
    ],
  },
  {
    label: 'South America',
    options: [
      ['art', 'Argentina Time (ART)'],
      ['bot', 'Bolivia Time (BOT)'],
      ['brt', 'Brasilia Time (BRT)'],
      ['clt', 'Chile Standard Time (CLT)'],
    ],
  },
] as const

const sheetSides = ['top', 'right', 'bottom', 'left'] as const

function ScrollAreaPreview() {
  return () => (
    <div mix={previewStackStyle}>
      <div data-radcn-docs-scroll-area-family="scroll-area-demo">
        <ScrollArea
          class="radcn-docs-scroll-area-demo"
          style="width:12rem;height:18rem;"
        >
          <ScrollAreaViewport ariaLabel="Tags">
            <div data-radcn-docs-scroll-area-tags style="display:grid;padding:1rem;">
              <h4 style="margin:0 0 1rem;font-size:0.875rem;font-weight:500;line-height:1;">Tags</h4>
              {scrollAreaTags.map((tag, index) => (
                <div data-radcn-docs-scroll-area-tag-row>
                  <div data-radcn-docs-scroll-area-tag style="font-size:0.875rem;">{tag}</div>
                  {index < scrollAreaTags.length - 1 && <Separator class="radcn-docs-scroll-area-tag-separator" style="margin:0.5rem 0;" />}
                </div>
              ))}
            </div>
          </ScrollAreaViewport>
          <ScrollBar>
            <ScrollAreaThumb />
          </ScrollBar>
        </ScrollArea>
      </div>

      <div data-radcn-docs-scroll-area-family="scroll-area-horizontal-demo">
        <ScrollArea
          class="radcn-docs-scroll-area-horizontal-demo"
          style="width:min(100%,24rem);height:29rem;white-space:nowrap;"
        >
          <ScrollAreaViewport ariaLabel="Artwork gallery">
            <div data-radcn-docs-scroll-area-artwork-strip style="display:flex;width:max-content;gap:1rem;padding:1rem;">
              {scrollAreaArtworks.map((artwork) => (
                <figure data-radcn-docs-scroll-area-artwork style="flex:0 0 auto;margin:0;">
                  <div style="overflow:hidden;border-radius:var(--radcn-radius);">
                    <img
                      alt={`Photo by ${artwork.artist}`}
                      data-radcn-docs-scroll-area-artwork-image
                      height="400"
                      src={artwork.src}
                      style={`display:block;width:300px;height:400px;aspect-ratio:3 / 4;object-fit:cover;background:${artwork.color};`}
                      width="300"
                    />
                  </div>
                  <figcaption data-radcn-docs-scroll-area-artwork-caption style="padding-top:0.5rem;color:var(--radcn-muted-foreground);font-size:0.75rem;">
                    Photo by <strong style="color:var(--radcn-foreground);">{artwork.artist}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
          </ScrollAreaViewport>
          <ScrollBar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollBar>
          <ScrollAreaCorner />
        </ScrollArea>
      </div>
    </div>
  )
}

function SheetProfileFields({ prefix }: { prefix: string }) {
  return (
    <div data-radcn-docs-sheet-form style="display:grid;gap:0.75rem;padding:1rem 0;">
      <div style="display:grid;gap:0.375rem;">
        <Label for={`${prefix}-name`}>Name</Label>
        <Input id={`${prefix}-name`} value="Pedro Duarte" />
      </div>
      <div style="display:grid;gap:0.375rem;">
        <Label for={`${prefix}-username`}>Username</Label>
        <Input id={`${prefix}-username`} value="@peduarte" />
      </div>
    </div>
  )
}

const skeletonSource = `import { Skeleton } from 'radcn/skeleton'

export function SkeletonPreview() {
  return (
    <>
      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        <Skeleton style="height:125px;width:250px;border-radius:0.75rem;" />
        <div style="display:grid;gap:0.5rem;">
          <Skeleton style="height:1rem;width:250px;" />
          <Skeleton style="height:1rem;width:200px;" />
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:1rem;">
        <Skeleton style="height:48px;width:48px;border-radius:999px;" />
        <div style="display:grid;gap:0.5rem;">
          <Skeleton style="height:1rem;width:250px;" />
          <Skeleton style="height:1rem;width:200px;" />
        </div>
      </div>
    </>
  )
}`

function SkeletonPreview() {
  return () => (
    <div mix={previewStackStyle}>
      <div data-radcn-docs-skeleton-family="skeleton-card" style="display:flex;flex-direction:column;gap:0.75rem;">
        <Skeleton class="radcn-docs-skeleton-card-media" style="height:125px;width:250px;border-radius:0.75rem;" />
        <div data-radcn-docs-skeleton-card-lines style="display:grid;gap:0.5rem;">
          <Skeleton style="height:1rem;width:250px;" />
          <Skeleton style="height:1rem;width:200px;" />
        </div>
      </div>

      <div data-radcn-docs-skeleton-family="skeleton-demo" style="display:flex;align-items:center;gap:1rem;">
        <Skeleton class="radcn-docs-skeleton-demo-avatar" style="height:48px;width:48px;border-radius:999px;" />
        <div data-radcn-docs-skeleton-demo-lines style="display:grid;gap:0.5rem;">
          <Skeleton style="height:1rem;width:250px;" />
          <Skeleton style="height:1rem;width:200px;" />
        </div>
      </div>
    </div>
  )
}

function SheetPreview() {
  return () => (
    <div mix={[previewStackStyle, forceVisiblePreviewStyle]}>
      <div data-radcn-docs-sheet-family="sheet-demo">
        <Sheet id="docs-sheet-demo">
          <SheetTrigger class="radcn-button radcn-button--outline">Open</SheetTrigger>
          <SheetPortal>
            <SheetOverlay />
            <SheetContent class="radcn-docs-sheet-demo-content">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
              </SheetHeader>
              {SheetProfileFields({ prefix: 'sheet-demo' })}
              <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose class="radcn-button radcn-button--outline">Close</SheetClose>
              </SheetFooter>
            </SheetContent>
          </SheetPortal>
        </Sheet>
      </div>

      <div data-radcn-docs-sheet-family="sheet-side">
        <div data-radcn-docs-sheet-side-triggers style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.5rem;width:min(100%,18rem);">
          {sheetSides.map((side) => (
            <Sheet id={`docs-sheet-side-${side}`}>
              <SheetTrigger class="radcn-button radcn-button--outline">{side}</SheetTrigger>
              <SheetPortal>
                <SheetOverlay />
                <SheetContent class="radcn-docs-sheet-side-content" side={side}>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
                  </SheetHeader>
                  {SheetProfileFields({ prefix: `sheet-side-${side}` })}
                  <SheetFooter>
                    <SheetClose class="radcn-button">Save changes</SheetClose>
                  </SheetFooter>
                </SheetContent>
              </SheetPortal>
            </Sheet>
          ))}
        </div>
      </div>
    </div>
  )
}

function SelectPreview() {
  return () => (
    <div mix={previewStackStyle}>
      <div data-radcn-docs-select-family="select-demo">
        <Select defaultOpen name="fruit" style="width:180px;">
          <SelectTrigger ariaLabel="Fruit" style="width:180px;">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent style="width:180px;">
            <SelectViewport>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {selectFruits.map(([value, label]) => (
                  <SelectItem textValue={label} value={value}>{label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectViewport>
          </SelectContent>
        </Select>
      </div>

      <div data-radcn-docs-select-family="select-scrollable">
        <Select defaultOpen name="timezone" style="width:280px;">
          <SelectTrigger ariaLabel="Timezone" style="width:280px;">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent style="width:280px;">
            <SelectScrollUpButton />
            <SelectViewport style="max-height:12rem;overflow:auto;">
              {selectTimezoneGroups.map((group) => (
                <SelectGroup>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.options.map(([value, label]) => (
                    <SelectItem textValue={label} value={value}>{label}</SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectViewport>
            <SelectScrollDownButton />
          </SelectContent>
        </Select>
      </div>
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

function TabsDemoPreview() {
  return () => (
    <div
      class="flex w-full max-w-sm flex-col gap-6"
      data-radcn-docs-tabs-family="tabs-demo"
      style="display:flex;width:100%;max-width:24rem;flex-direction:column;gap:1.5rem;"
    >
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6" style="display:grid;gap:1.5rem;">
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" value="Pedro Duarte" />
              </div>
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" value="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6" style="display:grid;gap:1.5rem;">
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SonnerPreview() {
  return () => (
    <div style="display:grid;gap:1rem;width:min(100%,42rem)">
      <div data-radcn-docs-sonner-family="sonner-demo" mix={previewFieldStyle}>
        <span
          data-radcn-toast-trigger
          data-toast-action-label="Undo"
          data-toast-action-url="#undo"
          data-toast-description="Sunday, December 03, 2023 at 9:00 AM"
          data-toast-duration="0"
          data-toast-title="Event has been created"
        >
          <Button variant="outline">Show Toast</Button>
        </span>
        <Toaster
          defaultDuration={0}
          position="bottom-right"
          style="position: static; width: min(100%, 28rem);"
          toasts={[{
            actionLabel: 'Undo',
            actionUrl: '#undo',
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            id: 'docs-sonner-demo',
            title: 'Event has been created',
            type: 'default',
          }]}
        />
        <p style="margin:0;color:var(--radcn-docs-muted);font-size:0.875rem;">
          React onClick plus sonner toast maps to a native Button trigger,
          RadCN toast event payload, and app-owned action callback behavior.
          The upstream console.log Undo callback is represented as explicit app
          behavior through actionLabel/actionUrl.
        </p>
      </div>

      <div data-radcn-docs-sonner-family="sonner-types" mix={previewFieldStyle}>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
          <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Event has been created">
            <Button variant="outline">Default</Button>
          </span>
          <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Event has been created" data-toast-type="success">
            <Button variant="outline">Success</Button>
          </span>
          <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Be at the area 10 minutes before the event time" data-toast-type="info">
            <Button variant="outline">Info</Button>
          </span>
          <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Event start time cannot be earlier than 8am" data-toast-type="warning">
            <Button variant="outline">Warning</Button>
          </span>
          <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Event has not been created" data-toast-type="error">
            <Button variant="outline">Error</Button>
          </span>
          <span data-radcn-toast-trigger data-toast-duration="0" data-toast-title="Loading..." data-toast-type="loading">
            <Button variant="outline">Promise</Button>
          </span>
        </div>
        <Toaster
          defaultDuration={0}
          position="bottom-right"
          style="position: static; width: min(100%, 28rem);"
          toasts={[
            { id: 'docs-sonner-type-default', title: 'Event has been created', type: 'default' },
            { id: 'docs-sonner-type-success', title: 'Event has been created', type: 'success' },
            { id: 'docs-sonner-type-info', title: 'Be at the area 10 minutes before the event time', type: 'info' },
            { id: 'docs-sonner-type-warning', title: 'Event start time cannot be earlier than 8am', type: 'warning' },
            { id: 'docs-sonner-type-error', title: 'Event has not been created', type: 'error' },
            { description: 'Event has been created; Error', id: 'docs-sonner-type-promise', title: 'Loading...', type: 'loading' },
          ]}
        />
        <p style="margin:0;color:var(--radcn-docs-muted);font-size:0.875rem;">
          toast, toast.success, toast.info, toast.warning, toast.error, and
          toast.promise map to explicit RadCN event payloads. toast.promise
          maps to app-owned orchestration that dispatches loading, then the
          success message Event has been created or error message Error.
        </p>
      </div>
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

const accordionDemoName = 'accordion-demo'

function AccordionDemoPreview() {
  return () => (
    <div data-radcn-docs-accordion-family="accordion-demo" mix={previewStackStyle} style="width: min(100%, 42rem);">
      <Accordion
        class="radcn-docs-accordion-demo w-full"
        collapsible
        defaultValue="item-1"
        name={accordionDemoName}
        style="width: 100%;"
        type="single"
      >
        <AccordionItem name={accordionDemoName} open value="item-1">
          <AccordionTrigger>Product Information</AccordionTrigger>
          <AccordionContent class="radcn-docs-accordion-demo-content flex flex-col gap-4 text-balance" style="display:flex;flex-direction:column;gap:1rem;text-wrap:balance;">
            <p>Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.</p>
            <p>Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem name={accordionDemoName} value="item-2">
          <AccordionTrigger>Shipping Details</AccordionTrigger>
          <AccordionContent class="radcn-docs-accordion-demo-content flex flex-col gap-4 text-balance" style="display:flex;flex-direction:column;gap:1rem;text-wrap:balance;">
            <p>We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.</p>
            <p>All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem name={accordionDemoName} value="item-3">
          <AccordionTrigger>Return Policy</AccordionTrigger>
          <AccordionContent class="radcn-docs-accordion-demo-content flex flex-col gap-4 text-balance" style="display:flex;flex-direction:column;gap:1rem;text-wrap:balance;">
            <p>We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.</p>
            <p>Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <p style="margin:0;color:var(--radcn-docs-muted);font-size:0.875rem;">
        Root defaultValue and name are RadCN metadata hooks; server-rendered
        open state and native single grouping are explicit item open/name props.
      </p>
    </div>
  )
}

function AlertDialogDemoPreview() {
  return () => (
    <div data-radcn-docs-alert-dialog-family="alert-dialog-demo" mix={[previewStackStyle, forceVisiblePreviewStyle]}>
      <AlertDialog id="docs-alert-dialog-demo">
        <AlertDialogTrigger class="radcn-button radcn-button--outline">Show Dialog</AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
      <p style="margin:0;color:var(--radcn-docs-muted);font-size:0.875rem;">
        Button asChild maps to explicit AlertDialogTrigger styling with
        radcn-button and radcn-button--outline classes.
      </p>
    </div>
  )
}

function AspectRatioDemoPreview() {
  return () => (
    <div data-radcn-docs-aspect-ratio-family="aspect-ratio-demo" data-radcn-theme="dark" mix={aspectRatioDemoStyle}>
      <AspectRatio class="rounded-lg bg-muted radcn-docs-aspect-ratio-demo" ratio="16 / 9" style="width:100%;">
        <img
          alt="Photo by Drew Beamer"
          class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
          data-radcn-docs-aspect-ratio-image
          data-radcn-docs-image-source="remote-unsplash"
          src={aspectRatioImageSrc}
          style="display:block;width:100%;height:100%;border-radius:inherit;object-fit:cover;"
        />
      </AspectRatio>
      <p style="margin:0;color:var(--radcn-docs-muted);font-size:0.875rem;">
        Next Image fill maps to a native img that fills the RadCN aspect-ratio
        box; the exact upstream remote URL is used as read-only demo content.
      </p>
    </div>
  )
}

function AvatarDemoPreview() {
  return () => (
    <div data-radcn-docs-avatar-family="avatar-demo" mix={avatarDemoStyle}>
      <div
        class="flex flex-row flex-wrap items-center gap-12"
        data-radcn-docs-avatar-row
      >
        <Avatar>
          <AvatarImage alt="@shadcn" src={avatarShadcnSrc} />
          <AvatarFallback ariaHidden={true}>CN</AvatarFallback>
        </Avatar>
        <Avatar
          class="rounded-lg radcn-docs-avatar-rounded"
          style="border-radius:var(--radcn-radius);"
        >
          <AvatarImage alt="@evilrabbit" src={avatarEvilrabbitSrc} />
          <AvatarFallback ariaHidden={true}>ER</AvatarFallback>
        </Avatar>
        <AvatarGroup
          ariaLabel="RadCN contributors"
          class="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale"
        >
          <Avatar style="box-shadow:0 0 0 2px var(--radcn-background);">
            <AvatarImage
              alt="@shadcn"
              class="grayscale radcn-docs-avatar-stack-image"
              src={avatarShadcnSrc}
              style="filter:grayscale(1);"
            />
            <AvatarFallback ariaHidden={true}>CN</AvatarFallback>
          </Avatar>
          <Avatar style="margin-left:-0.5rem;box-shadow:0 0 0 2px var(--radcn-background);">
            <AvatarImage
              alt="@maxleiter"
              class="grayscale radcn-docs-avatar-stack-image"
              src={avatarMaxleiterSrc}
              style="filter:grayscale(1);"
            />
            <AvatarFallback ariaHidden={true}>LR</AvatarFallback>
          </Avatar>
          <Avatar style="margin-left:-0.5rem;box-shadow:0 0 0 2px var(--radcn-background);">
            <AvatarImage
              alt="@evilrabbit"
              class="grayscale radcn-docs-avatar-stack-image"
              src={avatarEvilrabbitSrc}
              style="filter:grayscale(1);"
            />
            <AvatarFallback ariaHidden={true}>ER</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>
      <p style="margin:0;color:var(--radcn-docs-muted);font-size:0.875rem;">
        Remote GitHub avatar images are app-owned content; RadCN owns the
        Avatar, Image, Fallback, and Group hooks plus class/style
        customization.
      </p>
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

const labelDemoSource = `import { Checkbox } from 'radcn/checkbox'
import { Label } from 'radcn/label'

export function LabelDemo() {
  return (
    <div>
      <div class="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label for="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}`

function LabelDemoPreview() {
  return () => (
    <div>
      <div
        data-radcn-docs-label-family="label-demo"
        data-radcn-docs-label-layout="inline"
        style="display:flex;align-items:center;gap:0.5rem;"
      >
        <Checkbox id="terms" name="terms" />
        <Label for="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}

const menubarDemoSource = `import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from 'radcn/menubar'

export function MenubarDemo() {
  return (
    <Menubar id="menubar-demo">
      <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarPortal>
          <MenubarContent sideOffset={8}>
            <MenubarItem textValue="New Tab">New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
            <MenubarItem textValue="New Window">New Window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
            <MenubarItem disabled textValue="New Incognito Window">New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger textValue="Share">Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem textValue="Email link">Email link</MenubarItem>
                <MenubarItem textValue="Messages">Messages</MenubarItem>
                <MenubarItem textValue="Notes">Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem textValue="Print...">Print... <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>
      <MenubarMenu value="edit">
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarPortal>
          <MenubarContent sideOffset={8}>
            <MenubarItem textValue="Undo">Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
            <MenubarItem textValue="Redo">Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger textValue="Find">Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem textValue="Search the web">Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem textValue="Find...">Find...</MenubarItem>
                <MenubarItem textValue="Find Next">Find Next</MenubarItem>
                <MenubarItem textValue="Find Previous">Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem textValue="Cut">Cut</MenubarItem>
            <MenubarItem textValue="Copy">Copy</MenubarItem>
            <MenubarItem textValue="Paste">Paste</MenubarItem>
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>
      <MenubarMenu value="view">
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarPortal>
          <MenubarContent sideOffset={8}>
            <MenubarCheckboxItem textValue="Always Show Bookmarks Bar">Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked textValue="Always Show Full URLs">Always Show Full URLs</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset textValue="Reload">Reload <MenubarShortcut>⌘R</MenubarShortcut></MenubarItem>
            <MenubarItem disabled inset textValue="Force Reload">Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut></MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset textValue="Toggle Fullscreen">Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset textValue="Hide Sidebar">Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>
      <MenubarMenu value="profiles">
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarPortal>
          <MenubarContent sideOffset={8}>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy" textValue="Andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit" textValue="Benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis" textValue="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset textValue="Edit...">Edit...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset textValue="Add Profile...">Add Profile...</MenubarItem>
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>
    </Menubar>
  )
}`

function MenubarDemoPreview() {
  return () => (
    <div data-radcn-docs-menubar-family="menubar-demo">
      <Menubar id="docs-menubar-demo">
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarPortal>
            <MenubarContent sideOffset={8}>
              <MenubarItem textValue="New Tab">New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
              <MenubarItem textValue="New Window">New Window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
              <MenubarItem disabled textValue="New Incognito Window">New Incognito Window</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger textValue="Share">Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem textValue="Email link">Email link</MenubarItem>
                  <MenubarItem textValue="Messages">Messages</MenubarItem>
                  <MenubarItem textValue="Notes">Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem textValue="Print...">Print... <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
        <MenubarMenu value="edit">
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarPortal>
            <MenubarContent sideOffset={8}>
              <MenubarItem textValue="Undo">Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
              <MenubarItem textValue="Redo">Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger textValue="Find">Find</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem textValue="Search the web">Search the web</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem textValue="Find...">Find...</MenubarItem>
                  <MenubarItem textValue="Find Next">Find Next</MenubarItem>
                  <MenubarItem textValue="Find Previous">Find Previous</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem textValue="Cut">Cut</MenubarItem>
              <MenubarItem textValue="Copy">Copy</MenubarItem>
              <MenubarItem textValue="Paste">Paste</MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
        <MenubarMenu value="view">
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarPortal>
            <MenubarContent sideOffset={8}>
              <MenubarCheckboxItem textValue="Always Show Bookmarks Bar">Always Show Bookmarks Bar</MenubarCheckboxItem>
              <MenubarCheckboxItem checked textValue="Always Show Full URLs">Always Show Full URLs</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset textValue="Reload">Reload <MenubarShortcut>⌘R</MenubarShortcut></MenubarItem>
              <MenubarItem disabled inset textValue="Force Reload">Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset textValue="Toggle Fullscreen">Toggle Fullscreen</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset textValue="Hide Sidebar">Hide Sidebar</MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
        <MenubarMenu value="profiles">
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarPortal>
            <MenubarContent sideOffset={8}>
              <MenubarRadioGroup value="benoit">
                <MenubarRadioItem value="andy" textValue="Andy">Andy</MenubarRadioItem>
                <MenubarRadioItem value="benoit" textValue="Benoit">Benoit</MenubarRadioItem>
                <MenubarRadioItem value="Luis" textValue="Luis">Luis</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem inset textValue="Edit...">Edit...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset textValue="Add Profile...">Add Profile...</MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

const tooltipDemoSource = `import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from 'radcn/tooltip'

export function TooltipDemo() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip id="tooltip-demo">
        <TooltipTrigger class="radcn-button radcn-button--outline">Hover</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent sideOffset={0}>
            <p>Add to library</p>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}`

function TooltipDemoPreview() {
  return () => (
    <div data-radcn-docs-tooltip-family="tooltip-demo">
      <TooltipProvider delayDuration={0}>
        <Tooltip id="docs-tooltip-demo">
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

const navigationMenuDemoStyle = css({
  width: 'min(100%, 48rem)',
  '& .radcn-docs-navigation-menu-desktop-only': {
    display: 'none',
  },
  '@media (min-width: 768px)': {
    '& .radcn-docs-navigation-menu-desktop-only': {
      display: 'block',
    },
  },
})

const navigationMenuPanelStyle = css({
  display: 'grid',
  gap: '0.5rem',
  width: 'min(100%, var(--radcn-docs-navigation-menu-panel-width, 32rem))',
})

const navigationMenuHomePanelStyle = css({
  display: 'grid',
  gap: '0.75rem',
  width: 'min(100%, 32rem)',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '0.75fr 1fr',
  },
})

const navigationMenuFeatureLinkStyle = css({
  display: 'flex',
  minHeight: '10rem',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  borderRadius: 'var(--radcn-radius)',
  background: 'linear-gradient(180deg, color-mix(in srgb, var(--radcn-muted) 55%, transparent), var(--radcn-muted))',
  padding: '1rem',
  textDecoration: 'none',
  outline: 'none',
  '@media (min-width: 768px)': {
    minHeight: '100%',
    padding: '1.5rem',
  },
  '& [data-radcn-docs-navigation-menu-title]': {
    marginBlockEnd: '0.5rem',
    color: 'var(--radcn-foreground)',
    fontSize: '1.125rem',
    fontWeight: 500,
  },
  '& p': {
    margin: 0,
    color: 'var(--radcn-muted-foreground)',
    fontSize: '0.875rem',
    lineHeight: 1.25,
  },
})

const navigationMenuComponentsPanelStyle = css({
  display: 'grid',
  gap: '0.5rem',
  width: 'min(100%, 38rem)',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
})

const navigationMenuLinkTitleStyle = css({
  color: 'var(--radcn-foreground)',
  fontSize: '0.875rem',
  fontWeight: 600,
  lineHeight: 1,
})

const navigationMenuLinkDescriptionStyle = css({
  margin: '0.25rem 0 0',
  color: 'var(--radcn-muted-foreground)',
  fontSize: '0.875rem',
  lineHeight: 1.35,
})

const navigationMenuIconStyle = css({
  display: 'inline-grid',
  width: '1rem',
  height: '1rem',
  flex: '0 0 auto',
  placeItems: 'center',
  color: 'var(--radcn-muted-foreground)',
  fontSize: '0.75rem',
  lineHeight: 1,
})

const navigationMenuDemoSource = `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radcn/navigation-menu'

const components = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu defaultValue="home" id="navigation-menu-demo">
      <NavigationMenuList class="flex-wrap">
        <NavigationMenuItem value="home">
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div class="navigation-menu-home-grid">
              <NavigationMenuLink href="/">
                <div>shadcn/ui</div>
                <p>Beautifully designed components built with Tailwind CSS.</p>
              </NavigationMenuLink>
              <div>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="components">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div class="navigation-menu-components-grid">
              {components.map((component) => (
                <ListItem href={component.href} title={component.title}>
                  {component.description}
                </ListItem>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="docs">
          <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem class="desktop-only" value="list">
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ListItem href="#" title="Components">Browse all components in the library.</ListItem>
            <ListItem href="#" title="Documentation">Learn how to use the library.</ListItem>
            <ListItem href="#" title="Blog">Read our latest blog posts.</ListItem>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem class="desktop-only" value="simple">
          <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#">Components</NavigationMenuLink>
            <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
            <NavigationMenuLink href="#">Blocks</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem class="desktop-only" value="with-icon">
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#">? Backlog</NavigationMenuLink>
            <NavigationMenuLink href="#">o To Do</NavigationMenuLink>
            <NavigationMenuLink href="#">✓ Done</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuIndicator />
      <NavigationMenuViewport />
    </NavigationMenu>
  )
}

function ListItem({ children, href, title }) {
  return (
    <NavigationMenuLink href={href}>
      <div>{title}</div>
      <p>{children}</p>
    </NavigationMenuLink>
  )
}`

function NavigationMenuDemoPreview() {
  return () => (
    <div
      data-radcn-docs-navigation-menu-family="navigation-menu-demo"
      mix={navigationMenuDemoStyle}
    >
      <NavigationMenu defaultValue="home" id="docs-navigation-menu-demo">
        <NavigationMenuList class="flex-wrap">
          <NavigationMenuItem value="home">
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div mix={navigationMenuHomePanelStyle}>
                <NavigationMenuLink href="/">
                  <div mix={navigationMenuFeatureLinkStyle}>
                    <div data-radcn-docs-navigation-menu-title>shadcn/ui</div>
                    <p>Beautifully designed components built with Tailwind CSS.</p>
                  </div>
                </NavigationMenuLink>
                <div mix={navigationMenuPanelStyle}>
                  {NavigationMenuListItem({
                    href: '/docs',
                    title: 'Introduction',
                    children: 'Re-usable components built using Radix UI and Tailwind CSS.',
                  })}
                  {NavigationMenuListItem({
                    href: '/docs/installation',
                    title: 'Installation',
                    children: 'How to install dependencies and structure your app.',
                  })}
                  {NavigationMenuListItem({
                    href: '/docs/primitives/typography',
                    title: 'Typography',
                    children: 'Styles for headings, paragraphs, lists...etc',
                  })}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="components">
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div mix={navigationMenuComponentsPanelStyle}>
                {navigationMenuComponents.map((component) =>
                  NavigationMenuListItem({
                    href: component.href,
                    title: component.title,
                    children: component.description,
                  }),
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="docs">
            <NavigationMenuLink class="radcn-docs-navigation-menu-trigger-link" href="/docs">Docs</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem class="radcn-docs-navigation-menu-desktop-only" value="list">
            <NavigationMenuTrigger>List</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div mix={navigationMenuPanelStyle} style="--radcn-docs-navigation-menu-panel-width: 19rem;">
                {NavigationMenuListItem({
                  href: '#',
                  title: 'Components',
                  children: 'Browse all components in the library.',
                })}
                {NavigationMenuListItem({
                  href: '#',
                  title: 'Documentation',
                  children: 'Learn how to use the library.',
                })}
                {NavigationMenuListItem({
                  href: '#',
                  title: 'Blog',
                  children: 'Read our latest blog posts.',
                })}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem class="radcn-docs-navigation-menu-desktop-only" value="simple">
            <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div mix={navigationMenuPanelStyle} style="--radcn-docs-navigation-menu-panel-width: 13rem;">
                <NavigationMenuLink href="#">Components</NavigationMenuLink>
                <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
                <NavigationMenuLink href="#">Blocks</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem class="radcn-docs-navigation-menu-desktop-only" value="with-icon">
            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div mix={navigationMenuPanelStyle} style="--radcn-docs-navigation-menu-panel-width: 13rem;">
                <NavigationMenuLink href="#" style="flex-direction:row;align-items:center;justify-content:flex-start;gap:0.5rem">
                  <span aria-hidden="true" data-radcn-docs-navigation-menu-icon="help" mix={navigationMenuIconStyle}>?</span>
                  Backlog
                </NavigationMenuLink>
                <NavigationMenuLink href="#" style="flex-direction:row;align-items:center;justify-content:flex-start;gap:0.5rem">
                  <span aria-hidden="true" data-radcn-docs-navigation-menu-icon="circle" mix={navigationMenuIconStyle}>o</span>
                  To Do
                </NavigationMenuLink>
                <NavigationMenuLink href="#" style="flex-direction:row;align-items:center;justify-content:flex-start;gap:0.5rem">
                  <span aria-hidden="true" data-radcn-docs-navigation-menu-icon="check" mix={navigationMenuIconStyle}>✓</span>
                  Done
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator />
        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  )
}

function NavigationMenuListItem({ children, href, title }: { children: RemixNode; href: string; title: string }) {
  return (
    <NavigationMenuLink href={href}>
      <div mix={navigationMenuLinkTitleStyle}>{title}</div>
      <p mix={navigationMenuLinkDescriptionStyle}>{children}</p>
    </NavigationMenuLink>
  )
}

const navigationMenuComponents = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description: 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

const paginationDemoSource = `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'radcn/pagination'

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`

function PaginationDemoPreview() {
  return () => (
    <div data-radcn-docs-pagination-family="pagination-demo" mix={previewRowStyle}>
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

const popoverDemoSource = `import { Input } from 'radcn/input'
import { Label } from 'radcn/label'
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from 'radcn/popover'

export function PopoverDemo() {
  return (
    <Popover id="popover-demo">
      <PopoverTrigger class="radcn-button radcn-button--outline">
        Open popover
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent class="w-80" style="width:20rem;">
          <div class="grid gap-4">
            <div class="space-y-2">
              <h4 class="leading-none font-medium">Dimensions</h4>
              <p class="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div class="grid gap-2">
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="width">Width</Label>
                <Input id="width" value="100%" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="maxWidth">Max. width</Label>
                <Input id="maxWidth" value="300px" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="height">Height</Label>
                <Input id="height" value="25px" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="maxHeight">Max. height</Label>
                <Input id="maxHeight" value="none" class="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}`

function PopoverDimensionsFields({ idPrefix }: { idPrefix: string }) {
  let fields = [
    ['width', 'Width', '100%'],
    ['maxWidth', 'Max. width', '300px'],
    ['height', 'Height', '25px'],
    ['maxHeight', 'Max. height', 'none'],
  ]

  return (
    <div data-radcn-docs-popover-fields>
      {fields.map(([id, label, value]) => {
        let inputId = `${idPrefix}-${id}`

        return (
          <div data-radcn-docs-popover-row>
            <Label for={inputId}>{label}</Label>
            <Input class="col-span-2 h-8" id={inputId} value={value} />
          </div>
        )
      })}
    </div>
  )
}

function PopoverDemoPreview() {
  return () => (
    <div data-radcn-docs-popover-family="popover-demo" mix={popoverDemoStyle}>
      <Popover id="docs-popover-demo">
        <PopoverTrigger class="radcn-button radcn-button--outline">Open popover</PopoverTrigger>
        <PopoverPortal>
          <PopoverContent class="w-80 radcn-docs-popover-demo-content" style="width:20rem;">
            <div data-radcn-docs-popover-form>
              <div data-radcn-docs-popover-copy>
                <h4>Dimensions</h4>
                <p>Set the dimensions for the layer.</p>
              </div>
              {PopoverDimensionsFields({ idPrefix: 'docs-popover-demo' })}
            </div>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </div>
  )
}

const progressDemoSource = `import { Progress } from 'radcn/progress'

export function ProgressDemo() {
  return (
    <Progress
      ariaLabel="Progress"
      class="w-[60%]"
      value={13}
      style="width:60%;"
    />
  )
}`

function ProgressDemoPreview() {
  return () => (
    <div data-radcn-docs-progress-family="progress-demo" mix={previewRowStyle} style="width:100%;">
      <Progress ariaLabel="Progress" class="w-[60%]" value={13} style="width:60%;" />
    </div>
  )
}

const sliderDemoSource = `import { Slider } from 'radcn/slider'

type SliderProps = {
  ariaLabel?: string
  class?: string
  defaultValue?: number
  disabled?: boolean
  id?: string
  max?: number
  min?: number
  name?: string
  step?: number
  style?: string
}

export function SliderDemo({ class: className = '', ...props }: SliderProps = {}) {
  return (
    <Slider
      ariaLabel="Slider"
      class={\`w-[60%] \${className}\`.trim()}
      defaultValue={50}
      max={100}
      step={1}
      style="width:60%;"
      {...props}
    />
  )
}`

function SliderDemoPreview() {
  return () => (
    <div data-radcn-docs-slider-family="slider-demo" data-radcn-docs-slider-width="60" mix={previewRowStyle} style="width:100%;">
      <Slider
        ariaLabel="Slider"
        class="w-[60%]"
        defaultValue={50}
        max={100}
        name="slider-demo"
        step={1}
        style="width:60%;"
      />
    </div>
  )
}

const switchDemoSource = `import { Label } from 'radcn/label'
import { Switch } from 'radcn/switch'

export function SwitchDemo() {
  return (
    <div class="flex items-center space-x-2" style="display:flex;align-items:center;gap:0.5rem;">
      <Switch id="airplane-mode" />
      <Label for="airplane-mode">Airplane Mode</Label>
    </div>
  )
}`

function SwitchDemoPreview() {
  return () => (
    <div
      class="flex items-center space-x-2"
      data-radcn-docs-switch-family="switch-demo"
      data-radcn-docs-switch-row
      style="display:flex;align-items:center;gap:0.5rem;"
    >
      <Switch id="airplane-mode" />
      <Label for="airplane-mode">Airplane Mode</Label>
    </div>
  )
}

const tableInvoices = [
  ['INV001', 'Paid', 'Credit Card', '$250.00'],
  ['INV002', 'Pending', 'PayPal', '$150.00'],
  ['INV003', 'Unpaid', 'Bank Transfer', '$350.00'],
  ['INV004', 'Paid', 'Credit Card', '$450.00'],
  ['INV005', 'Paid', 'PayPal', '$550.00'],
  ['INV006', 'Pending', 'Bank Transfer', '$200.00'],
  ['INV007', 'Unpaid', 'Credit Card', '$300.00'],
] as const

const tableDemoSource = `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'radcn/table'

const invoices = [
  ['INV001', 'Paid', 'Credit Card', '$250.00'],
  ['INV002', 'Pending', 'PayPal', '$150.00'],
  ['INV003', 'Unpaid', 'Bank Transfer', '$350.00'],
  ['INV004', 'Paid', 'Credit Card', '$450.00'],
  ['INV005', 'Paid', 'PayPal', '$550.00'],
  ['INV006', 'Pending', 'Bank Transfer', '$200.00'],
  ['INV007', 'Unpaid', 'Credit Card', '$300.00'],
] as const

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]" style="width:100px;">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead class="text-right" style="text-align:right;">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(([invoice, status, method, amount]) => (
          <TableRow>
            <TableCell class="font-medium" style="font-weight:500;">{invoice}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{method}</TableCell>
            <TableCell class="text-right" style="text-align:right;">{amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell class="text-right" style="text-align:right;">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}`

function TableDemoPreview() {
  return () => (
    <div data-radcn-docs-table-family="table-demo" style="width:100%;overflow-x:auto;">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]" style="width:100px;">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead class="text-right" style="text-align:right;">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableInvoices.map(([invoice, status, method, amount]) => (
            <TableRow>
              <TableCell class="font-medium" style="font-weight:500;">{invoice}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell>{method}</TableCell>
              <TableCell class="text-right" style="text-align:right;">{amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell class="text-right" style="text-align:right;">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

const radioGroupDemoSource = `import { Label } from 'radcn/label'
import { RadioGroup, RadioGroupItem } from 'radcn/radio-group'

export function RadioGroupDemo() {
  return (
    <RadioGroup name="radio-group-demo">
      <div class="flex items-center gap-3" style="display:flex;align-items:center;gap:0.75rem;">
        <RadioGroupItem value="default" id="r1" name="radio-group-demo" />
        <Label for="r1">Default</Label>
      </div>
      <div class="flex items-center gap-3" style="display:flex;align-items:center;gap:0.75rem;">
        <RadioGroupItem value="comfortable" id="r2" name="radio-group-demo" checked />
        <Label for="r2">Comfortable</Label>
      </div>
      <div class="flex items-center gap-3" style="display:flex;align-items:center;gap:0.75rem;">
        <RadioGroupItem value="compact" id="r3" name="radio-group-demo" />
        <Label for="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}`

const radioGroupDemoOptions = [
  ['r1', 'default', 'Default', false],
  ['r2', 'comfortable', 'Comfortable', true],
  ['r3', 'compact', 'Compact', false],
] as const

function RadioGroupDemoPreview() {
  return () => (
    <div data-radcn-docs-radio-group-family="radio-group-demo">
      <RadioGroup name="radio-group-demo">
        {radioGroupDemoOptions.map(([id, value, label, checked]) => (
          <div class="flex items-center gap-3" data-radcn-docs-radio-group-row style="display:flex;align-items:center;gap:0.75rem;">
            <RadioGroupItem checked={checked} id={id} name="radio-group-demo" value={value} />
            <Label for={id}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

const separatorDemoSource = `import { Separator } from 'radcn/separator'

export function SeparatorDemo() {
  return (
    <div>
      <div class="space-y-1">
        <h4 class="text-sm leading-none font-medium">Radix Primitives</h4>
        <p class="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator class="my-4" style="margin:1rem 0;" />
      <div class="flex h-5 items-center space-x-4 text-sm" style="display:flex;height:1.25rem;align-items:center;gap:1rem;font-size:0.875rem;">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}`

function SeparatorDemoPreview() {
  return () => (
    <div data-radcn-docs-separator-family="separator-demo" style="width:min(100%,24rem);">
      <div class="space-y-1" data-radcn-docs-separator-copy style="display:grid;gap:0.25rem;">
        <h4 class="text-sm leading-none font-medium" style="margin:0;font-size:0.875rem;line-height:1;font-weight:500;">Radix Primitives</h4>
        <p class="text-sm text-muted-foreground" style="margin:0;color:var(--radcn-muted-foreground);font-size:0.875rem;">
          An open-source UI component library.
        </p>
      </div>
      <Separator class="my-4" data-radcn-docs-separator-horizontal style="margin:1rem 0;" />
      <div
        class="flex h-5 items-center space-x-4 text-sm"
        data-radcn-docs-separator-row
        style="display:flex;height:1.25rem;align-items:center;gap:1rem;font-size:0.875rem;"
      >
        <div>Blog</div>
        <Separator data-radcn-docs-separator-vertical orientation="vertical" />
        <div>Docs</div>
        <Separator data-radcn-docs-separator-vertical orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}

const richComponentDocs: ComponentDoc[] = [
  {
    slug: 'accordion',
    title: 'Accordion',
    category: 'Composite',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native details/summary accordion for single or multiple disclosure groups with explicit server-rendered state.',
    importPath: 'radcn/accordion',
    importExample:
      "import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'radcn/accordion'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'accordion-demo',
        title: 'Accordion Demo',
        description:
          'Render the upstream product, shipping, and return policy example with native single-group behavior and exact copy.',
        source: accordionDemoSource,
        preview: <AccordionDemoPreview />,
      },
    ],
    accessibility: [
      'Accordion uses native details and summary elements, so disclosure state, keyboard activation, and content association are present in server HTML.',
      'Single mode uses matching item name attributes for native single-open behavior without React state.',
      'The first item is server-rendered open with an explicit item open prop, matching the upstream defaultValue="item-1" initial state.',
      'Trigger text remains visible text, while the decorative icon uses data-radcn-accordion-icon and aria-hidden.',
    ],
    customization: [
      'Root, item, trigger, trigger text, icon, content, and content inner parts expose public data-radcn hooks and classes.',
      'Full-width styling maps from upstream w-full to class/style on Accordion and can be tested with public root hooks.',
      'Tailwind flex, gap, and text-balance content utilities map to class, style, CSS variables, or app-owned wrapper styles over public content hooks.',
      'Root defaultValue and name are metadata hooks; item open and matching item name props own server-rendered state and native grouping.',
    ],
    divergence: [
      'Radix Accordion maps to browser-native details/summary markup and does not become a RadCN dependency.',
      'React client markers, React state, className, cn, data-slot, and Tailwind utilities map to explicit Remix UI props, class, style, CSS variables, and public data-radcn hooks.',
      'lucide ChevronDownIcon maps to the package-owned accordion icon hook; apps can replace presentation without adding an icon dependency.',
      'Accordion animation utilities map to package CSS transitions and app-owned styling over data-state hooks.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'alert',
    title: 'Alert',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A server-rendered alert primitive for important status, success, and destructive messages with app-owned icon composition.',
    importPath: 'radcn/alert',
    importExample: "import { Alert, AlertDescription, AlertTitle } from 'radcn/alert'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the upstream Alert demo and destructive examples with exact copy, variants, description lists, and app-owned icons.',
        source: alertSource,
        preview: <AlertPreview />,
      },
    ],
    accessibility: [
      'Alert renders role="alert" so important messages are exposed as assertive status content.',
      'AlertTitle and AlertDescription keep title and supporting copy separate for screen readers and visual hierarchy.',
      'Description content may include paragraphs and lists because AlertDescription accepts app-owned children.',
      'Decorative icons should be aria-hidden unless the app provides additional accessible text.',
    ],
    customization: [
      'Alert exposes data-radcn-alert, data-radcn-alert-title, data-radcn-alert-description, and data-radcn-alert-action hooks.',
      'Use variant="destructive" for destructive alert styling and data-variant for tests or app-level styling.',
      'Use class, style, and CSS variables such as --radcn-alert-bg, --radcn-alert-border, and --radcn-alert-fg for customization.',
      'Icon grid layout, SVG presentation, and stacked example layout remain app-owned composition.',
    ],
    divergence: [
      'className maps to class, data-slot maps to data-radcn-alert* hooks, and React prop spreading maps to explicit Remix UI props.',
      'cva and Tailwind utilities map to RadCN package classes, style, and CSS variables.',
      'AlertCircleIcon, CheckCircle2Icon, PopcornIcon, and lucide-react are app-owned presentation, not RadCN package dependencies.',
      'Icon grid and SVG layout stay in docs or application markup rather than the Alert package API.',
      'Alert Dialog is a separate component surface and is not part of Alert example parity.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'alert-dialog',
    title: 'Alert Dialog',
    category: 'Overlays',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A dependency-free destructive confirmation dialog with alertdialog semantics, non-dismissible defaults, and explicit action/cancel controls.',
    importPath: 'radcn/alert-dialog',
    importExample:
      "import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from 'radcn/alert-dialog'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'alert-dialog-demo',
        title: 'Alert Dialog Demo',
        description:
          'Render the upstream destructive account deletion confirmation with an outline Show Dialog trigger, exact copy, action/cancel controls, and no media block.',
        source: alertDialogDemoSource,
        preview: <AlertDialogDemoPreview />,
      },
    ],
    accessibility: [
      'AlertDialog enhances content to role="alertdialog" with aria-modal when opened in the browser.',
      'AlertDialogTitle and AlertDialogDescription provide the labelledby and describedby targets used by the modal enhancement.',
      'Destructive confirmations are non-dismissible by default, so Escape and overlay clicks do not close the dialog.',
      'Action and cancel controls are native buttons that close through enhanceAlertDialog and return focus to the trigger.',
    ],
    customization: [
      'Root, trigger, portal, overlay, content, header, footer, title, description, action, and cancel parts expose public data-radcn hooks and package classes.',
      'Button variant="outline" maps to radcn-button and radcn-button--outline classes applied directly to AlertDialogTrigger.',
      'Content size defaults to data-size="default"; apps can use size="sm", class, style, and CSS variables for custom sizing and tokens.',
      'Responsive header and footer layout maps to package CSS over public header/footer hooks instead of Tailwind utility classes.',
    ],
    divergence: [
      'React client component markers and Radix AlertDialog map to dependency-free Remix UI markup plus explicit enhanceAlertDialog browser behavior.',
      'Button asChild maps to explicit AlertDialogTrigger styling; RadCN does not need a Slot dependency for this example.',
      'className maps to class, data-slot maps to data-radcn-alert-dialog* hooks, and cn maps to explicit class composition.',
      'Tailwind fixed positioning, overlay/content animation utilities, responsive layout utilities, and size classes map to RadCN package CSS, data-state hooks, data-size, class, style, and CSS variables.',
      'AlertDialogMedia is intentionally omitted because upstream alert-dialog-demo has no media block.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'aspect-ratio',
    title: 'Aspect Ratio',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A dependency-free CSS aspect-ratio wrapper for responsive media, art, and arbitrary fixed-ratio content.',
    importPath: 'radcn/aspect-ratio',
    importExample: "import { AspectRatio } from 'radcn/aspect-ratio'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'aspect-ratio-demo',
        title: 'Aspect Ratio Demo',
        description:
          'Render the upstream 16:9 Drew Beamer photo example with rounded muted root styling, full-cover image sizing, exact alt text, and dark-mode image filters.',
        source: aspectRatioDemoSource,
        preview: <AspectRatioDemoPreview />,
      },
    ],
    accessibility: [
      'AspectRatio is a layout wrapper and does not alter the semantics of its child content.',
      'Meaningful image content keeps its accessible name on the native img alt attribute.',
      'The wrapper exposes data-radcn-aspect-ratio for tests and composition without introducing ARIA noise.',
      'Dark-mode image treatment is visual only and does not change the image accessible name.',
    ],
    customization: [
      'Use ratio="16 / 9" for the upstream demo ratio; custom ratios remain string CSS aspect-ratio values.',
      'Root rounded/muted styling maps to package CSS by default and can be changed with class, style, and CSS variables.',
      'Next Image fill maps to native img width, height, border-radius, and object-fit styling inside the AspectRatio wrapper.',
      'Dark-mode brightness and grayscale utilities map to app-owned CSS under data-radcn-theme="dark".',
    ],
    divergence: [
      'React client component markers and Radix AspectRatio map to dependency-free CSS aspect-ratio markup.',
      'Next Image is not a RadCN dependency; the demo uses a native img with the exact upstream remote URL.',
      'data-slot="aspect-ratio" maps to data-radcn-aspect-ratio, and className maps to class.',
      'Tailwind rounded-lg, bg-muted, h-full, w-full, object-cover, dark:brightness-[0.2], and dark:grayscale utilities map to package CSS, class, style, CSS variables, and theme-scoped app CSS.',
      'Remote image loading remains app-owned; RadCN owns the ratio wrapper, not image optimization or hosting policy.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'avatar',
    title: 'Avatar',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A dependency-free avatar primitive for image-backed identities, fallbacks, badges, and stacked groups.',
    importPath: 'radcn/avatar',
    importExample:
      "import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from 'radcn/avatar'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'avatar-demo',
        title: 'Avatar Demo',
        description:
          'Render the upstream Avatar demo with exact GitHub image URLs, alt text, fallbacks, rounded-square styling, and a stacked grayscale group.',
        source: avatarDemoSource,
        preview: <AvatarDemoPreview />,
      },
    ],
    accessibility: [
      'Meaningful image-backed avatars keep their accessible names on native img alt attributes.',
      'Fallback initials remain in the DOM for visual backup and can be aria-hidden when an image alt already names the person.',
      'AvatarGroup can receive an ariaLabel when the stacked set needs a group label in application context.',
      'Avatar exposes data-radcn-avatar, AvatarImage exposes data-radcn-avatar-image, AvatarFallback exposes data-radcn-avatar-fallback, and AvatarGroup exposes data-radcn-avatar-group for stable tests and composition.',
    ],
    customization: [
      'Default Avatar shape is circular through package CSS, matching the first upstream avatar.',
      'The upstream rounded-lg Avatar maps to class plus style or CSS variables on the Avatar root; no package-specific shape prop is required.',
      'Stacked negative spacing and ring treatment map to AvatarGroup package CSS and public class/style hooks.',
      'Grayscale image treatment maps to app-owned class/style on AvatarImage, while image URLs, loading strategy, and hosting remain app-owned content.',
      'Custom tokens remain available through package CSS variables such as --radcn-avatar-bg, --radcn-avatar-fg, --radcn-avatar-border, and --radcn-avatar-size.',
    ],
    divergence: [
      'React client component markers and Radix Avatar primitives map to dependency-free native img and span/div markup.',
      'data-slot="avatar", data-slot="avatar-image", and data-slot="avatar-fallback" map to data-radcn-avatar, data-radcn-avatar-image, and data-radcn-avatar-fallback.',
      'data-size maps to RadCN data-size plus size classes, while className maps to class and cn maps to explicit class composition.',
      'Tailwind flex, flex-row, flex-wrap, items-center, gap-12, rounded-lg, -space-x-2, ring, ring-background, and grayscale utilities map to RadCN package CSS, class, style, CSS variables, and docs/app CSS.',
      'Remote GitHub avatar images are content choices and are tested by stable attributes rather than network image decoding.',
      'AvatarBadge and AvatarGroupCount are package capabilities, but they are not required by the direct avatar-demo example.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'hover-card',
    title: 'Hover Card',
    category: 'Overlays',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A dependency-free hover/focus card for profile previews and adjacent contextual content.',
    importPath: 'radcn/hover-card',
    importExample:
      "import { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger } from 'radcn/hover-card'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'hover-card-demo',
        title: 'Hover Card Demo',
        description:
          'Render the upstream @nextjs profile preview with a link-styled trigger, Avatar image/fallback, 20rem content width, and exact profile copy.',
        source: hoverCardDemoSource,
        preview: <HoverCardDemoPreview />,
      },
    ],
    accessibility: [
      'HoverCardTrigger is a native button, so focus and keyboard interaction remain accessible without React state.',
      'Hover and focus open the same content through enhanceHoverCard; Escape closes the card and returns to a closed state.',
      'Hover Card is non-modal and does not lock body scrolling.',
      'AvatarImage keeps the profile image accessible name on native img alt, while AvatarFallback remains visible backup content.',
    ],
    customization: [
      'Root, trigger, portal, and content expose public data-radcn-hover-card hooks and package classes.',
      'The upstream w-80 width maps to --radcn-hover-card-width: 20rem on HoverCardContent.',
      'Button variant="link" maps to RadCN button link classes on HoverCardTrigger, preserving the visible link-button presentation without Slot/asChild mechanics.',
      'Profile layout and text styling map to app-owned class/style composition around Avatar and HoverCardContent.',
    ],
    divergence: [
      'use client and Radix Hover Card primitives map to server-rendered Remix UI markup plus scoped enhanceHoverCard browser behavior.',
      'HoverCardTrigger asChild maps to explicit RadCN trigger styling; RadCN does not need Slot for this example.',
      'Avatar, AvatarImage, AvatarFallback, and Button composition maps to existing RadCN packages.',
      'className maps to class, data-slot maps to data-radcn-hover-card* hooks, and cn maps to explicit class composition.',
      'Tailwind w-80, flex, justify-between, gap-4, space-y-1, text-sm, font-semibold, text-xs, and text-muted-foreground utilities map to CSS variables, package classes, class, and style.',
      'The upstream CalendarIcon import is unused source noise and does not introduce an icon dependency.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
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
    slug: 'collapsible',
    title: 'Collapsible',
    category: 'Composite',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native details/summary disclosure primitive for single-panel reveal patterns with app-owned trigger presentation.',
    importPath: 'radcn/collapsible',
    importExample:
      "import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'radcn/collapsible'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'collapsible-demo',
        title: 'Collapsible Demo',
        description:
          'Render the upstream @peduarte repository disclosure with default closed state, icon-only Toggle trigger, and exact repository rows.',
        source: collapsibleDemoSource,
        preview: <CollapsibleDemoPreview />,
      },
    ],
    accessibility: [
      'Collapsible renders native details and summary markup, so disclosure state, keyboard toggling, and content association stay browser-owned.',
      'The icon-only trigger preserves the upstream screen-reader text Toggle inside the summary while the app-owned chevrons icon is aria-hidden.',
      'The default demo starts closed, leaving @radix-ui/primitives visible and @radix-ui/colors plus @stitches/react hidden until the user toggles the summary.',
      'Public data-radcn-collapsible, data-radcn-collapsible-trigger, and data-radcn-collapsible-content hooks are present for tests and app-owned styling.',
    ],
    customization: [
      'Root width/flex/gap maps from flex w-[350px] flex-col gap-2 to class, style, and package tokens on the Collapsible root.',
      'Header layout maps from flex items-center justify-between gap-4 px-4 to app-owned wrapper class/style around the trigger.',
      'Rounded bordered monospace repository rows map from rounded-md border px-4 py-2 font-mono text-sm to ordinary app markup composed inside Collapsible.',
      'Button ghost and size="icon" composition maps to explicit radcn-button, radcn-button--ghost, radcn-button--icon, and size-8 classes on the app-owned icon presentation inside CollapsibleTrigger.',
      'Custom tokens remain available through Collapsible CSS variables and public content/trigger hooks.',
    ],
    divergence: [
      'React client component markers and Radix Collapsible map to dependency-free native details/summary markup plus package hooks.',
      'React useState(false), open, and onOpenChange map to native details[open] state for this example; synchronized external state can be app-owned enhancement.',
      'data-slot maps to public data-radcn-collapsible* hooks, className maps to class, and cn maps to explicit class composition.',
      'Tailwind width, flex, gap, spacing, border, rounded, and font utilities map to class, style, CSS variables, and app CSS over public hooks.',
      'CollapsibleTrigger asChild and Button composition map to styling the summary trigger directly; RadCN does not need a Slot dependency for this example.',
      'lucide ChevronsUpDown maps to app-owned decorative chevrons icon markup instead of lucide-react.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
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
    slug: 'select',
    title: 'Select',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A custom select primitive with trigger, value, grouped options, selected indicators, scroll affordances, and native hidden form values.',
    importPath: 'radcn/select',
    importExample:
      "import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'radcn/select'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'select-demo-and-scrollable',
        title: 'Demo and Scrollable',
        description:
          'Render the upstream fruit Select and grouped timezone Select examples with RadCN package primitives and app-owned option data.',
        source: selectSource,
        preview: <SelectPreview />,
      },
    ],
    accessibility: [
      'SelectTrigger renders a button with combobox semantics after enhancement while SelectViewport owns listbox semantics.',
      'SelectItem renders role="option" with aria-selected and selected indicator hooks.',
      'SelectGroup and SelectLabel provide visible grouping for fruit and timezone option sets.',
      'When name is provided, Select synchronizes the selected value to a native hidden input for form submission and reset behavior.',
    ],
    customization: [
      'Select exposes root, trigger, value, content, viewport, group, label, item, indicator, separator, scroll button, and hidden input hooks through data-radcn-select* attributes.',
      'Trigger widths such as w-[180px] and w-[280px] map to class, style, CSS variables, or app CSS rather than Tailwind utilities.',
      'Fruit options, timezone groups, option labels, submitted values, and selected display text remain app-owned data rendered through RadCN item primitives.',
      'Scroll buttons, viewport height, popper placement, custom classes, styles, and tokens are explicit RadCN props or app CSS extension points.',
    ],
    divergence: [
      'React props, Radix SelectPrimitive, className, data-slot, Tailwind utilities, cn, and vendor source map to explicit RadCN props, class, public data hooks, package CSS, inline style, and CSS variables.',
      'CheckIcon, ChevronDownIcon, ChevronUpIcon, and lucide-react are presentation choices; RadCN provides dependency-free indicators and trigger glyphs.',
      'Portal behavior is supported through SelectPortal when an app needs it, but the named docs examples keep content scoped for visible documentation evidence.',
      'React state and onValueChange map to package-owned browser enhancement, native hidden values, route state, or app-owned event handling.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'sheet',
    title: 'Sheet',
    category: 'Overlays',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A modal side panel primitive with trigger, portal, overlay, side placement, header, footer, close controls, and focus management.',
    importPath: 'radcn/sheet',
    importExample:
      "import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from 'radcn/sheet'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'sheet-demo-and-side',
        title: 'Demo and Side',
        description:
          'Render the upstream profile Sheet and four-side Sheet examples with RadCN modal primitives and app-owned form controls.',
        source: sheetSource,
        preview: <SheetPreview />,
      },
    ],
    accessibility: [
      'SheetContent is enhanced with role="dialog", aria-modal, aria-labelledby, and aria-describedby from visible title and description parts.',
      'Sheet focus is trapped while open, returns to the trigger when closed, and locks body scrolling during the modal session.',
      'Escape, overlay pointer dismissal, default close button, and explicit SheetClose controls close dismissible sheets.',
      'Profile inputs and labels remain native Input and Label composition inside the sheet surface.',
    ],
    customization: [
      'Sheet exposes root, trigger, portal, overlay, content, header, title, description, footer, and close hooks through data-radcn-sheet* attributes.',
      'Side placement maps to side="top", side="right", side="bottom", and side="left" on SheetContent.',
      'Button, Input, and Label composition stays app-owned while Sheet owns the modal side panel behavior.',
      'Grid layout, padding, text alignment, widths, and repeated side examples map to class, style, CSS variables, or app CSS rather than Tailwind utilities.',
    ],
    divergence: [
      'React props, Radix Dialog primitives, className, data-slot, Tailwind utilities, cn, and vendor source map to explicit RadCN props, class, public data hooks, package CSS, inline style, and CSS variables.',
      'asChild maps to explicit SheetTrigger and SheetClose composition with RadCN Button styling instead of React Slot behavior.',
      'SHEET_SIDES, React keys, and repeated rendering map to deterministic server-rendered markup with valid unique ids.',
      'Form submit actions, profile persistence, and input state remain app-owned; Sheet owns the modal surface and close behavior.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'skeleton',
    title: 'Skeleton',
    category: 'Feedback',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A dependency-free loading placeholder primitive with hidden semantics, pulse animation, and app-owned dimensions and shapes.',
    importPath: 'radcn/skeleton',
    importExample: "import { Skeleton } from 'radcn/skeleton'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'skeleton-card-and-demo',
        title: 'Card and Demo',
        description:
          'Render the upstream card loading placeholder and avatar/list loading row with exact dimensions and shapes.',
        source: skeletonSource,
        preview: <SkeletonPreview />,
      },
    ],
    accessibility: [
      'Skeleton renders aria-hidden="true" because it is decorative loading affordance, not readable content.',
      'Loading status text should be supplied by the surrounding application when users need an announced status.',
      'The primitive emits data-radcn-skeleton so apps and tests can identify placeholders without relying on DOM shape.',
      'Pulse animation is visual only; content structure and loading announcements remain app-owned.',
    ],
    customization: [
      'Skeleton exposes data-radcn-skeleton plus class and style for exact width, height, border radius, and layout composition.',
      'Card media, avatar circles, and text lines are app-owned uses of the same Skeleton primitive.',
      'Use CSS variables such as --radcn-skeleton-bg or ordinary app CSS to adjust placeholder color.',
      'Flex, grid, spacing, fixed dimensions, rounded-full, and rounded-xl wrappers belong to examples or app markup.',
    ],
    divergence: [
      'React props, className, data-slot, Tailwind utilities, cn, and vendor source map to explicit RadCN props, class, public data hooks, package CSS, inline style, and CSS variables.',
      'data-slot="skeleton" maps to data-radcn-skeleton.',
      'The package does not add card, avatar, text-line, flex, or spacing-specific APIs; those are composition details.',
      'Fixed dimensions and rounded shapes remain app-owned style choices rather than Skeleton package dependencies.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
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
    slug: 'scroll-area',
    title: 'Scroll Area',
    category: 'Layout',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native scroll container primitive with viewport, scrollbar, thumb, corner, focus, and app-owned content composition.',
    importPath: 'radcn/scroll-area',
    importExample:
      "import { ScrollArea, ScrollAreaViewport, ScrollBar } from 'radcn/scroll-area'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'example-parity',
        title: 'Example Parity',
        description:
          'Render the upstream tag list and horizontal artwork Scroll Area examples with native scrolling and deterministic non-network artwork.',
        source: scrollAreaSource,
        preview: <ScrollAreaPreview />,
      },
    ],
    accessibility: [
      'ScrollAreaViewport is focusable by default and can provide an ariaLabel for named scroll regions.',
      'Native overflow owns keyboard, pointer, and assistive-technology scroll behavior without a client-side scroll engine.',
      'Scrollbar, thumb, and corner parts are aria-hidden presentation while the viewport remains the accessible scroll container.',
      'Figure, figcaption, image alt text, headings, tag text, and Separator semantics remain authored content inside the viewport.',
    ],
    customization: [
      'ScrollArea exposes root, viewport, scrollbar, thumb, and corner hooks through data-radcn-scroll-area* attributes and package classes.',
      'Use class, style, and CSS variables to tune width, height, border, radius, background, thumb color, and corner color.',
      'Use ScrollBar orientation="horizontal" when an example needs explicit horizontal scroll affordance.',
      'Repeated content, Separator rows, image presentation, whitespace, max-content strip layout, and spacing stay app-owned composition.',
    ],
    divergence: [
      'React props, Radix ScrollAreaPrimitive, className, data-slot, Tailwind utilities, and cn map to explicit RadCN props, class, public data hooks, package CSS, inline style, and CSS variables.',
      'The upstream default vertical ScrollBar maps to explicit ScrollBar composition in RadCN examples.',
      'React fragments and keys are upstream rendering mechanics; RadCN examples render ordinary repeated markup.',
      'next/image, remote Unsplash URLs, and image optimization are app presentation concerns, not RadCN dependencies.',
      'The horizontal artwork example uses deterministic non-network artwork data so tests do not depend on remote image loading.',
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
    slug: 'label',
    title: 'Label',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native label primitive for explicit form-control association, disabled state, and app-owned control composition.',
    importPath: 'radcn/label',
    importExample: "import { Label } from 'radcn/label'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'label-demo',
        title: 'Label Demo',
        description:
          'Render the upstream Checkbox and Label composition with exact terms copy, flex row layout, and native label activation.',
        source: labelDemoSource,
        preview: <LabelDemoPreview />,
      },
    ],
    accessibility: [
      'Label renders native label markup, so for links directly to a form control id in server HTML.',
      'Clicking the Label activates the associated native Checkbox without React state or Radix Label behavior.',
      'The upstream htmlFor prop maps to the native for prop in Remix UI.',
      'Disabled label presentation is explicit through disabled, data-disabled, and native disabled controls composed by the app.',
    ],
    customization: [
      'Label exposes class, style, data-disabled, and data-radcn-label for app-level styling and tests.',
      'Checkbox composition exposes data-radcn-checkbox-wrapper, data-radcn-checkbox-input, and data-radcn-checkbox-indicator hooks.',
      'The upstream flex items-center space-x-2 wrapper maps to app-owned row layout around RadCN primitives.',
      'className, cn, and data-slot map to class and data-radcn-label hooks.',
    ],
    divergence: [
      'use client and Radix LabelPrimitive Root map to native label markup.',
      'Radix Label remains a non-dependency because browser label semantics provide the required association and activation.',
      'Tailwind text-sm, leading-none, font-medium, and select-none styling maps to package CSS plus app-owned class/style overrides.',
      'group-data disabled and peer-disabled behavior map to explicit disabled props, native disabled controls, and app-owned composition.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'menubar',
    title: 'Menubar',
    category: 'Navigation',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A dependency-free application menubar with trigger-owned menus, portal content, submenus, checked items, radio groups, and keyboard navigation.',
    importPath: 'radcn/menubar',
    importExample:
      "import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarPortal, MenubarTrigger } from 'radcn/menubar'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'menubar-demo',
        title: 'Menubar Demo',
        description:
          'Render the upstream four-menu browser-style demo with exact menu copy, shortcuts, checked state, submenus, and sideOffset parity.',
        source: menubarDemoSource,
        preview: <MenubarDemoPreview />,
      },
    ],
    accessibility: [
      'Menubar renders role="menubar" with aria-orientation and trigger role="menuitem" semantics.',
      'Triggers expose aria-haspopup, aria-controls, and aria-expanded when enhanced in the browser.',
      'Menu content renders role="menu"; checkbox and radio items expose menuitemcheckbox and menuitemradio states.',
      'Keyboard movement, typeahead, Escape close, submenu focus, disabled skip, and hover switching are browser-enhanced without React state.',
    ],
    customization: [
      'Root, menu, trigger, portal, content, items, separators, submenus, checkbox items, radio groups, radio items, indicators, and shortcuts expose public data-radcn hooks.',
      'The named demo passes sideOffset={8} to match upstream MenubarContent placement without changing the package default.',
      'Shortcut glyphs, check marks, radio dots, and submenu carets are app-owned presentation over package hooks.',
      'className, Tailwind utilities, and cn map to class, style, CSS variables, package classes, and data-radcn-menubar hooks.',
    ],
    divergence: [
      'use client and Radix Menubar primitives map to server-rendered Menubar markup plus scoped enhanceMenubar browser behavior.',
      'lucide CheckIcon, ChevronRightIcon, and CircleIcon map to RadCN-owned text indicators and app-owned presentation, not a package dependency.',
      'data-slot maps to public data-radcn-menubar* hooks and shared data-radcn-menu-* hooks.',
      'Radix Portal maps to explicit MenubarPortal content moved into data-radcn-portal-root by the browser enhancer.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'navigation-menu',
    title: 'Navigation Menu',
    category: 'Navigation',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A dependency-free navigation menu with trigger-owned panels, link triggers, viewport sizing, indicator hooks, and keyboard navigation.',
    importPath: 'radcn/navigation-menu',
    importExample:
      "import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from 'radcn/navigation-menu'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'navigation-menu-demo',
        title: 'Navigation Menu Demo',
        description:
          'Render the upstream docs-style navigation menu with exact panel copy, responsive sections, icon links, and viewport behavior.',
        source: navigationMenuDemoSource,
        preview: <NavigationMenuDemoPreview />,
      },
    ],
    accessibility: [
      'NavigationMenu renders a labelled nav landmark and native list structure for top-level controls.',
      'Triggers receive aria-controls and aria-expanded during enhanceNavigationMenu, while content panels stay associated with their owning item.',
      'Links remain native anchors, so the Docs trigger-style link keeps normal link behavior.',
      'Keyboard movement covers horizontal roving focus, Home, End, Enter or Space opening, Escape close, and focusout close without React state.',
    ],
    customization: [
      'Root, list, item, trigger, content, link, viewport, and indicator parts expose public data-radcn-navigation-menu hooks and package classes.',
      'The Docs link uses the public NavigationMenuLink class as the RadCN equivalent of upstream navigationMenuTriggerStyle().',
      'The upstream viewport={isMobile} recipe maps to explicit NavigationMenuViewport composition plus documented app-owned responsive behavior.',
      'Responsive desktop-only sections use app-owned CSS over public item classes, preserving the upstream hidden md:block behavior without Tailwind.',
      'Icon links are app-owned presentation over NavigationMenuLink; apps may use text glyphs, inline SVG, or an icon package without changing RadCN.',
    ],
    divergence: [
      'use client, React state, Next Link, useIsMobile, Radix Navigation Menu, and cva map to server-rendered RadCN markup plus scoped enhanceNavigationMenu browser behavior.',
      'lucide ChevronDownIcon, CircleHelpIcon, CircleIcon, and CircleCheckIcon remain app presentation and are not RadCN dependencies.',
      'className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-navigation-menu* hooks.',
      'Tailwind grid, width, gap, flex-wrap, rounded, muted, transition, hidden md:block, and text utilities map to package CSS, docs-owned styles, CSS variables, and media queries.',
      'NavigationMenuIndicator is package capability evidence; the upstream demo relies on root-rendered viewport behavior rather than explicitly rendering an indicator.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'pagination',
    title: 'Pagination',
    category: 'Navigation',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A semantic pagination nav with list structure, active page state, previous and next links, ellipsis text, and tokenized link styling.',
    importPath: 'radcn/pagination',
    importExample:
      "import { Pagination, PaginationContent, PaginationItem, PaginationLink } from 'radcn/pagination'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'pagination-demo',
        title: 'Pagination Demo',
        description:
          'Render the upstream previous, 1, active 2, 3, ellipsis, and next sequence with native links and exact accessibility labels.',
        source: paginationDemoSource,
        preview: <PaginationDemoPreview />,
      },
    ],
    accessibility: [
      'Pagination renders a navigation landmark with aria-label="pagination" and a real list of page controls.',
      'Previous and next are native links with accessible labels: Go to previous page and Go to next page.',
      'The active page link renders aria-current="page", matching the upstream isActive behavior without React state.',
      'PaginationEllipsis keeps a decorative visible/icon affordance and exposes screen-reader text More pages.',
    ],
    customization: [
      'Root, content, item, link, previous, next, icon, text, and ellipsis parts expose public data-radcn-pagination hooks and package classes.',
      'buttonVariants and Button size typing map to radcn-pagination-link classes, active-state classes, and tokenized package CSS.',
      'className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-pagination* hooks.',
      'Custom labels, route-local hrefs, classes, styles, and CSS variables remain app-owned without changing the package API.',
    ],
    divergence: [
      'React component props map to explicit Remix UI props and server-rendered native nav/list/link markup.',
      'lucide ChevronLeftIcon, ChevronRightIcon, and MoreHorizontalIcon map to RadCN-owned icon affordance hooks, not lucide-react dependencies.',
      'Tailwind mx-auto, flex, gap, size, px, hidden sm:block, ghost, outline, and active utilities map to package CSS, classes, CSS variables, and app-owned responsive styles.',
      'The named docs demo uses upstream href="#" values; fixture routes may use route-local hrefs as an app-owned routing divergence while preserving link semantics.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'popover',
    title: 'Popover',
    category: 'Overlays',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A dependency-free click popover with explicit trigger, portal, content, placement, dismissal, and form-composition hooks.',
    importPath: 'radcn/popover',
    importExample:
      "import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from 'radcn/popover'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'popover-demo',
        title: 'Popover Demo',
        description:
          'Render the upstream dimensions form with an outline trigger, 20rem content, labelled inputs, and default values.',
        source: popoverDemoSource,
        preview: <PopoverDemoPreview />,
      },
    ],
    accessibility: [
      'PopoverTrigger renders a native button with aria-haspopup="dialog" and browser-enhanced aria-expanded and aria-controls state.',
      'Popover content moves through PopoverPortal during browser enhancement while preserving visible labelled form controls.',
      'The dimensions form uses real Label and Input associations for width, maxWidth, height, and maxHeight fields.',
      'Popover remains non-modal: Escape, outside click, and close behavior do not lock document scrolling.',
    ],
    customization: [
      'Root, trigger, portal, content, anchor, close, header, title, and description expose public data-radcn-popover hooks and package classes.',
      'PopoverTrigger asChild and Button variant="outline" map to explicit trigger styling with RadCN button classes, without Slot or React child cloning.',
      'PopoverContent className="w-80" maps to class/style/CSS variable evidence for a 20rem content width.',
      'default align center and sideOffset 4 remain explicit content props and data hooks; apps can tune side, align, offset, width, and tokens.',
      'Input and Label composition remains app-owned form markup inside PopoverContent, not Popover package state.',
    ],
    divergence: [
      'use client, React component props, and Radix Popover primitives map to server-rendered RadCN markup plus scoped enhancePopover browser behavior.',
      'Radix implicit Popover portal maps to explicit PopoverPortal composition so portal ownership is visible to authors and tests.',
      'className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-popover* hooks.',
      'Tailwind grid, gap, width, col-span, height, leading, font, text-sm, muted foreground, transition, data-state, and data-side utilities map to package CSS, classes, style, CSS variables, and app-owned CSS.',
      'Input defaultValue maps to RadCN Input value for deterministic server-rendered default form values.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'progress',
    title: 'Progress',
    category: 'Feedback',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native progress primitive with determinate, indeterminate, timed-demo, and tokenized indicator states.',
    importPath: 'radcn/progress',
    importExample: "import { Progress } from 'radcn/progress'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'progress-demo',
        title: 'Progress Demo',
        description:
          'Render the upstream timed progress demo from value 13 to 66 with a 60% wrapper width.',
        source: progressDemoSource,
        preview: <ProgressDemoPreview />,
      },
    ],
    accessibility: [
      'Progress renders a native progress element with an accessible label, max value, and determinate value in server HTML.',
      'The named demo starts with value 13 and updates to value 66 through scoped browser enhancement without React state.',
      'The native progress element remains the semantic source of progress state while the visual indicator mirrors the value.',
      'Indeterminate state remains available when value is omitted and is covered by existing fixture behavior.',
    ],
    customization: [
      'Wrapper, native progress, track, and indicator parts expose public data-radcn-progress hooks and package classes.',
      'className="w-[60%]" maps to class plus explicit 60% wrapper width style evidence.',
      'bg-primary/20 and bg-primary map to --radcn-progress-bg, --radcn-progress-fg, and package token defaults.',
      'Apps can customize width, class, style, max, value, accessible label, and CSS variables without changing the package API.',
      'Existing custom-token fixtures remain the evidence for public Progress token modifiability.',
    ],
    divergence: [
      'use client, React useState, React useEffect, and the 500ms timeout map to scoped dependency-free browser behavior in the docs and fixture apps.',
      'React component props and Radix Progress primitives map to server-rendered RadCN markup with a native progress element.',
      'ProgressPrimitive.Root maps to data-radcn-progress-wrapper plus the native progress element; ProgressPrimitive.Indicator maps to data-radcn-progress-indicator.',
      'className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-progress* hooks.',
      'Tailwind w-[60%], bg-primary/20, bg-primary, h-2, rounded-full, overflow-hidden, flex, transition-all, and transform utilities map to package CSS, classes, style, CSS variables, and app-owned CSS.',
      'Upstream translateX indicator movement maps to equivalent visible percentage progress through indicator width, not literal transform style equivalence.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'radio-group',
    title: 'Radio Group',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native radio group with labelled options, server-rendered default state, browser selection, and tokenized item styling.',
    importPath: 'radcn/radio-group',
    importExample: "import { RadioGroup, RadioGroupItem } from 'radcn/radio-group'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'radio-group-demo',
        title: 'Radio Group Demo',
        description:
          'Render the upstream Default, Comfortable, and Compact options with Comfortable checked by default.',
        source: radioGroupDemoSource,
        preview: <RadioGroupDemoPreview />,
      },
    ],
    accessibility: [
      'RadioGroup renders a role="radiogroup" wrapper and native radio inputs for browser-owned selection behavior.',
      'The named demo maps upstream defaultValue="comfortable" to the comfortable native radio being checked in server HTML.',
      'Each Label uses for to associate Default, Comfortable, and Compact text with ids r1, r2, and r3.',
      'Native radio inputs preserve keyboard and form behavior without React or Radix state.',
    ],
    customization: [
      'Group, item, input, and indicator parts expose public data-radcn-radio hooks and package classes.',
      'The upstream flex items-center gap-3 row layout maps to explicit class and style evidence on each option row.',
      'className maps to class, and apps can customize name, value, checked state, labels, classes, styles, and tokens.',
      'Existing disabled, invalid, form-submit-reset, and custom-token fixtures remain evidence for broader Radio Group modifiability.',
    ],
    divergence: [
      'use client, React component props, and Radix Radio Group primitives map to server-rendered RadCN markup with native radio inputs.',
      'RadioGroupPrimitive.Root maps to data-radcn-radio-group with role="radiogroup"; RadioGroupPrimitive.Item maps to RadioGroupItem; RadioGroupPrimitive.Indicator maps to data-radcn-radio-indicator.',
      'lucide CircleIcon maps to package CSS indicator presentation, not a lucide-react dependency.',
      'className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-radio* hooks.',
      'Tailwind grid, gap, flex, items-center, size, rounded-full, border, focus, disabled, invalid, fill, translate, and transition utilities map to package CSS, classes, style, CSS variables, and app-owned CSS.',
      'Label htmlFor maps to RadCN Label for while preserving native label/input association.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'slider',
    title: 'Slider',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native range slider with track, range, thumb, percent state, and form-compatible value behavior.',
    importPath: 'radcn/slider',
    importExample: "import { Slider } from 'radcn/slider'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'slider-demo',
        title: 'Slider Demo',
        description:
          'Render the upstream 60% width slider with default value 50, max 100, and step 1.',
        source: sliderDemoSource,
        preview: <SliderDemoPreview />,
      },
    ],
    accessibility: [
      'Slider renders a native range input with an accessible label, min, max, step, and initial value in server HTML.',
      'The named demo maps upstream defaultValue={[50]} to scalar defaultValue={50} for RadCN single-thumb Slider behavior.',
      'The native input owns keyboard, pointer, disabled, form submission, and form reset behavior without React state.',
      'Root metadata mirrors browser state with data-value, data-min, data-max, data-step, and data-orientation="horizontal" for testable state.',
    ],
    customization: [
      'Root, native input, track, range, and thumb expose public data-radcn-slider hooks and package classes.',
      'className={cn("w-[60%]", className)} maps to class plus explicit style="width:60%;" evidence, with cn represented by deterministic class composition.',
      'The upstream prop spread maps to explicit RadCN props: ariaLabel, class, style, id, name, defaultValue, value, min, max, step, and disabled.',
      'Track, range, and thumb visuals are driven by --radcn-slider-percent and Slider token variables, so apps can customize appearance without Radix or Tailwind.',
      'Existing custom-token fixtures remain evidence for public Slider token modifiability.',
    ],
    divergence: [
      'use client, React component props, React.ComponentProps<typeof Slider>, and React useMemo map to explicit Remix UI props plus browser-owned range state.',
      'Radix SliderPrimitive.Root, SliderPrimitive.Track, SliderPrimitive.Range, and SliderPrimitive.Thumb map to RadCN root, native input, track, range, and thumb hooks.',
      'The upstream single-value array defaultValue maps to a scalar number because RadCN currently models a single native range input.',
      'className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-slider* hooks.',
      'Tailwind w-[60%], relative, flex, touch, select, disabled, orientation, track, range, thumb, border, focus, hover, transition, and sizing utilities map to package CSS, classes, style, CSS variables, and app-owned CSS.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'table',
    title: 'Table',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'Semantic table primitives for captions, column headers, body rows, footers, responsive containers, and app-owned formatting.',
    importPath: 'radcn/table',
    importExample:
      "import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from 'radcn/table'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'table-demo',
        title: 'Table Demo',
        description:
          'Render the upstream invoice table with seven rows, caption, aligned amounts, and a footer total.',
        source: tableDemoSource,
        preview: <TableDemoPreview />,
      },
    ],
    accessibility: [
      'Table renders native table, caption, thead, tbody, tfoot, tr, th, and td elements so browser table semantics are present in server HTML.',
      'TableHead renders scope="col" for column headers while caption text describes the invoice table.',
      'The named demo keeps the upstream caption, headers, seven invoice rows, and footer total as plain semantic table content.',
      'Native colspan on the footer Total cell preserves the intended footer grouping without React or table-state dependencies.',
    ],
    customization: [
      'Container, table, caption, header, body, footer, row, head, and cell parts expose public data-radcn-table hooks and package classes.',
      'TableHead className="w-[100px]" maps to class plus explicit width:100px style evidence on the Invoice header.',
      'text-right maps to class plus explicit text-align:right style evidence on Amount header, body cells, and footer amount cell.',
      'font-medium maps to class plus explicit font-weight:500 style evidence on invoice id cells.',
      'Existing dense and footer fixtures remain evidence for broader Table modifiability, while DataTable remains a separate composition layer.',
    ],
    divergence: [
      'use client and React intrinsic ComponentProps aliases map to explicit Remix UI props and native table elements.',
      'data-slot maps to public data-radcn-table-container, data-radcn-table, data-radcn-table-caption, data-radcn-table-header, data-radcn-table-body, data-radcn-table-footer, data-radcn-table-row, data-radcn-table-head, and data-radcn-table-cell hooks.',
      'className maps to class, cn maps to explicit class composition, and Tailwind utilities map to package CSS, classes, style, CSS variables, and app-owned CSS.',
      'The upstream responsive overflow container maps to RadCN table container markup and overflow styling.',
      'radcn/data-table is related composition evidence, not a substitute for direct plain Table example parity.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'switch',
    title: 'Switch',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A native checkbox-backed switch with explicit label wiring, state hooks, sizing, and tokenized thumb styling.',
    importPath: 'radcn/switch',
    importExample: "import { Switch } from 'radcn/switch'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'switch-demo',
        title: 'Switch Demo',
        description:
          'Render the upstream Airplane Mode switch row with default unchecked state and native label activation.',
        source: switchDemoSource,
        preview: <SwitchDemoPreview />,
      },
    ],
    accessibility: [
      'Switch renders a native checkbox input with role="switch" and keeps the input as the accessible control.',
      'The named demo maps upstream id="airplane-mode" and Label htmlFor to RadCN id plus Label for, preserving the Airplane Mode accessible name.',
      'The default demo is unchecked in server HTML and uses size="default" metadata on the wrapper and input.',
      'Browser checkbox behavior owns pointer, keyboard, label activation, disabled, form submission, and reset behavior while enhanceSwitch mirrors public data-state metadata.',
    ],
    customization: [
      'Wrapper, native input, and thumb expose public data-radcn-switch hooks and package classes.',
      'The upstream flex items-center space-x-2 row layout maps to class plus explicit display, alignment, and 0.5rem gap style evidence.',
      'className maps to class, and apps can customize id, name, checked state, value, required, disabled, size, classes, styles, and tokens.',
      'Existing checked, disabled, form-submit-reset, size sm, and custom-token fixtures remain evidence for broader Switch modifiability.',
    ],
    divergence: [
      'use client, React component props, and React.ComponentProps<typeof SwitchPrimitive.Root> map to explicit Remix UI props and browser-owned checkbox state.',
      'Radix SwitchPrimitive.Root maps to the RadCN switch wrapper plus native input; SwitchPrimitive.Thumb maps to data-radcn-switch-thumb.',
      'Radix data-slot maps to public data-radcn-switch-wrapper, data-radcn-switch-input, and data-radcn-switch-thumb hooks.',
      'size = "default" maps to RadCN size="default" plus data-size="default" metadata.',
      'Tailwind peer, group, inline-flex, shrink, items-center, rounded, border, shadow, focus, disabled, size, checked/unchecked background, and thumb translation utilities map to package CSS, classes, style, CSS variables, and app-owned CSS.',
      'Label htmlFor maps to RadCN Label for while preserving native label/input association.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'separator',
    title: 'Separator',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A decorative or semantic separator primitive with horizontal and vertical orientation support.',
    importPath: 'radcn/separator',
    importExample: "import { Separator } from 'radcn/separator'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'separator-demo',
        title: 'Separator Demo',
        description:
          'Render the upstream Radix Primitives copy, horizontal rule, and Blog/Docs/Source row with vertical separators.',
        source: separatorDemoSource,
        preview: <SeparatorDemoPreview />,
      },
    ],
    accessibility: [
      'Separator defaults to decorative mode for visual grouping, matching upstream decorative=true behavior.',
      'The named demo uses decorative separators for the horizontal rule and the two vertical dividers.',
      'Semantic separator behavior remains available with decorative={false}, which exposes role="separator" and aria-orientation.',
      'Browser accessibility behavior is verified through roles and aria-orientation instead of React or Radix internals.',
    ],
    customization: [
      'Separator exposes public data-radcn-separator hooks, data-orientation, orientation classes, and class/style customization.',
      'className="my-4" maps to class plus explicit margin style evidence for the horizontal separator.',
      'The upstream flex h-5 items-center space-x-4 text-sm row layout maps to class plus explicit display, height, alignment, gap, and font-size styles.',
      'Horizontal and vertical sizing map to package CSS over .radcn-separator--horizontal and .radcn-separator--vertical with --radcn-border token color.',
    ],
    divergence: [
      'use client, React component props, and Radix Separator primitive map to dependency-free server-rendered RadCN markup.',
      'SeparatorPrimitive.Root maps to a div with data-radcn-separator and data-orientation.',
      'className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-separator plus data-orientation hooks.',
      'Tailwind my-4, flex, h-5, items-center, space-x-4, text-sm, bg-border, shrink-0, h-px, w-full, h-full, and w-px utilities map to package CSS, classes, style, CSS variables, and app-owned CSS.',
      'decorative={true} maps to role="none"; semantic decorative={false} maps to role="separator" with aria-orientation.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
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
    slug: 'card',
    title: 'Card',
    category: 'Display',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A flexible content surface with header, title, description, action, content, and footer slots.',
    importPath: 'radcn/card',
    importExample: "import { Card, CardContent, CardHeader, CardTitle } from 'radcn/card'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'card-demo-and-form',
        title: 'Demo and Form',
        description:
          'Render the upstream login/account Card and project form Card with named slots, native forms, package inputs, package buttons, and package Select composition.',
        source: cardSource,
        preview: <CardPreview />,
      },
    ],
    accessibility: [
      'Card preserves native semantics for the content placed inside it: forms remain forms, labels remain labels, inputs keep their type and required state, and links remain links.',
      'CardTitle and CardDescription provide visible structure while apps decide heading levels around the card surface.',
      'CardAction is a layout slot; the composed Button or anchor keeps its own accessible role and name.',
    ],
    customization: [
      'Card root, header, title, description, action, content, and footer expose data-radcn-card* hooks.',
      'className maps to class, and width utilities such as w-full, max-w-sm, and w-[350px] map to class, style, CSS variables, or app CSS.',
      'data-slot maps to data-radcn-card* hooks; cn and Tailwind utilities map to RadCN package classes, CSS variables, and app CSS.',
      'CardAction, Button variant="link", Button variant="outline", Input type="email", Input type="password", and Select position="popper" compose existing RadCN primitives.',
    ],
    divergence: [
      'Card owns the surface and slots, not app form state, login behavior, project creation behavior, or Select overlay state.',
      'Native form semantics remain app-owned unless a route chooses to compose RadCN Form helpers.',
      'Form, Chart, and Carousel Card references are separate resolved clusters; block Card references stay block parity work.',
      'The switch registry dependency in card-demo.json is treated as stale metadata because the current card-demo source does not render Switch.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'command',
    title: 'Command',
    category: 'Composite',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A searchable command-list primitive with grouped rows, shortcuts, disabled items, and dialog composition.',
    importPath: 'radcn/command',
    importExample:
      "import { Command, CommandInput, CommandList, CommandItem } from 'radcn/command'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'command-demo-and-dialog',
        title: 'Demo and Dialog',
        description:
          'Render the upstream Command card and Command dialog examples with grouped rows, app-owned icons, shortcuts, and app-owned shortcut opening.',
        source: commandSource,
        preview: <CommandPreview />,
      },
    ],
    accessibility: [
      'CommandList renders role="listbox" and CommandItem renders role="option" with aria-selected and aria-disabled state during enhancement.',
      'CommandGroup heading renders visible text with data-radcn-command-group-heading and can label the group when an explicit id is supplied.',
      'Keyboard navigation covers Arrow keys, Home, End, Enter, and Escape for query clearing while disabled items stay unavailable.',
      'CommandDialog composes RadCN Dialog so the command palette keeps dialog role, title, description, focus, and Escape dismissal behavior.',
    ],
    customization: [
      'Command exposes public data-radcn-command hooks for root, input, list, empty state, groups, group headings, items, separators, shortcuts, and dialog composition.',
      'Rows accept arbitrary children, so app-owned icons, labels, and shortcut hints can match the upstream examples without lucide-react.',
      'className maps to class; Tailwind width, border, shadow, flex, and gap utilities map to class, style, CSS variables, or app CSS.',
      'Dialog shortcut guidance can compose RadCN Kbd while the document-level shortcut listener remains app-owned enhancement.',
    ],
    divergence: [
      'React useState, useEffect, open, and onOpenChange map to explicit server-rendered state plus app-owned browser enhancement where dynamic shortcut opening is needed.',
      'cmdk and CommandPrimitive are upstream React implementation details; RadCN implements searchable listbox behavior with native DOM enhancement.',
      'SearchIcon, Calendar, Smile, Calculator, User, CreditCard, Settings, lucide-react, and icon sizing utilities are app-owned presentation, not Command dependencies.',
      'className maps to class, data-slot maps to data-radcn-command* hooks, cn and Tailwind utilities map to RadCN package classes/CSS variables/app CSS, and vendor source remains read-only evidence.',
      'Command composes Dialog and Kbd without making global keyboard routing, Dialog state callbacks, or Kbd styling part of the Command package.',
    ],
  },
  {
    slug: 'calendar',
    title: 'Calendar',
    category: 'Inputs',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A package-backed date grid with native selection state, optional dropdown captions, and explicit alternate-calendar boundaries.',
    importPath: 'radcn/calendar',
    importExample: "import { Calendar } from 'radcn/calendar'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'calendar-demo',
        title: 'Calendar Demo',
        description:
          'Render upstream calendar-demo as a single-selection Calendar with dropdown captions, ISO values, grid semantics, hidden form state, and custom styling hooks.',
        source: calendarSource,
        preview: <CalendarPreview />,
      },
    ],
    accessibility: [
      'Calendar renders a role="grid" table with day buttons named by full dates.',
      'Selection is reflected through data-selected, aria-selected, and a native hidden input when name is provided.',
      'captionLayout="dropdown" renders native month and year select controls in the caption area without replacing previous/next navigation.',
    ],
    customization: [
      'Use class, style, CSS variables, and data-radcn-calendar* hooks instead of className, classNames, data-slot, cva, or Tailwind utilities.',
      'defaultMonth maps to defaultMonth/month ISO props; selected and onSelect map to selected/defaultSelected props, hidden input values, and radcn-calendar-select events.',
      'captionLayout maps to package-owned label or dropdown captions with data-radcn-calendar-month-select and data-radcn-calendar-year-select hooks.',
      'Button composition stays inside the Calendar day and navigation controls; Date Picker composition remains separate package evidence.',
    ],
    divergence: [
      'react-day-picker, DayPicker, DayButton, and getDefaultClassNames map to RadCN package-owned calendar markup and browser enhancement.',
      'buttonVariants, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, and lucide-react map to package classes or app-owned presentation rather than package dependencies.',
      'react-day-picker/persian, next/font/google, Vazirmatn, and RTL chevron behavior are app-owned alternate-calendar recipes, not RadCN package dependencies.',
      'Calendar examples document block/sidebar separation: layout demos stay in docs or app composition while the package owns reusable calendar behavior.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
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
        slug: 'data-table-demo',
        title: 'Data Table Demo',
        description:
          'Port the upstream payments table with native filter forms, hideable columns, row actions, selection, pagination, and package-owned Data Table slots.',
        source: dataTableSource,
        preview: <DataTableDemoPreview />,
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
      'use client, React state, useReactTable, ColumnDef, row models, and flexRender map to explicit server state, query strings, native controls, and package-owned Data Table slots.',
      'TanStack Table remains an app choice, not a RadCN dependency.',
      'Column filters, sorting, column visibility, row selection, pagination, and row actions are app-owned controls built from native forms, links, checkboxes, and existing RadCN primitives.',
      'Button, Checkbox, DropdownMenu, Input, and Table composition maps to existing RadCN packages.',
      'className and Tailwind utilities map to class, style, RadCN package classes, CSS variables, and app CSS.',
      'lucide ArrowUpDown, ChevronDown, and MoreHorizontal map to app-owned icon presentation.',
      'navigator.clipboard.writeText stays app-owned browser behavior around visible payment id data.',
      'Dashboard-only drag/reorder and chart detail patterns stay as recipe/block composition until a later experiment proves a reusable package behavior is needed.',
      'vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'context-menu',
    title: 'Context Menu',
    category: 'Overlays',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A dependency-free contextual menu primitive for right-click and keyboard-triggered action lists with submenus and checked state.',
    importPath: 'radcn/context-menu',
    importExample:
      "import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from 'radcn/context-menu'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'context-menu-demo',
        title: 'Context Menu Demo',
        description:
          'Render the upstream browser-tools context menu with exact trigger, shortcuts, submenu, checked rows, radio items, and destructive item.',
        source: contextMenuDemoSource,
        preview: <ContextMenuDemoPreview />,
      },
    ],
    accessibility: [
      'ContextMenuTrigger is focusable and enhanced for right-click, ContextMenu key, and Shift+F10 activation.',
      'ContextMenuContent renders menu semantics while items expose menuitem, menuitemcheckbox, and menuitemradio roles.',
      'Disabled Forward exposes aria-disabled and data-disabled and must not highlight or close the menu when activated.',
      'Checkbox and radio rows expose aria-checked and package-owned indicator hooks while the visible text remains ordinary menu text.',
    ],
    customization: [
      'Trigger sizing maps from h-[150px] w-[300px] flex centering, rounded, dashed border, and text-sm utilities to class/style on ContextMenuTrigger.',
      'Content widths map from w-52 and w-44 to class/style or --radcn-menu-width on ContextMenuContent and ContextMenuSubContent.',
      'Item inset maps to inset props and radcn-menu-item--inset / radcn-menu-label--inset package classes.',
      'Shortcuts, separators, checked indicators, radio indicators, submenu caret, destructive item styling, and highlight state expose public RadCN hooks and classes.',
      'Custom tokens remain available through menu CSS variables such as --radcn-menu-width, --radcn-menu-border, --radcn-menu-bg, --radcn-menu-highlight-bg, and --radcn-menu-indicator-fg.',
    ],
    divergence: [
      'React client component markers and Radix Context Menu primitives map to dependency-free RadCN menu-overlay enhancement.',
      'Radix Portal, Content, Sub, CheckboxItem, RadioGroup, and RadioItem mechanics map to explicit RadCN portal/content/sub/checkbox/radio parts and public data hooks.',
      'data-slot maps to data-radcn-context-menu* and shared data-radcn-menu-* hooks.',
      'className maps to class, and cn maps to explicit class composition, style, CSS variables, and app CSS.',
      'Tailwind sizing, layout, border, typography, animation, focus, and inset utilities map to RadCN classes, inline styles, package CSS, data-state hooks, and tokens.',
      'lucide CheckIcon, ChevronRightIcon, and CircleIcon map to package-owned indicator/caret glyphs or app-owned presentation, not lucide-react dependencies.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
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
        slug: 'dialog-demo-and-close-button',
        title: 'Demo and Close Button',
        description:
          'Render the upstream edit-profile Dialog and share-link Dialog examples with native form, labelled inputs, read-only link input, and explicit close actions.',
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
      'DialogTrigger and DialogClose are native buttons, so shadcn asChild Button composition maps to Button classes or app-owned styling on the Dialog part.',
      'Input, Label, Button, native form shells, sr-only labels, read-only fields, and share-link presentation remain composed surfaces outside Dialog.',
    ],
    divergence: [
      'RadCN separates server markup from browser enhancement through enhanceDialog instead of depending on React state.',
      'React open/onOpenChange, Radix DialogPrimitive, className, data-slot, cn, Tailwind utilities, XIcon, and lucide-react are upstream implementation details rather than RadCN Dialog dependencies.',
      'DialogFooter showCloseButton is an upstream convenience API that the active examples do not use; RadCN composes explicit DialogClose actions in the footer.',
      'The share-link example displays a read-only URL only. RadCN does not add copy-to-clipboard behavior for this row.',
      'The docs preview keeps hidden dialog content inspectable so users can review styling; isolated fixture tests prove runtime focus and dismissal behavior.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'drawer',
    title: 'Drawer',
    category: 'Overlays',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A modal edge-panel primitive for bottom, side, and app-composed responsive Dialog or Drawer workflows.',
    importPath: 'radcn/drawer',
    importExample:
      "import { Drawer, DrawerContent, DrawerTrigger } from 'radcn/drawer'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'drawer-demo-and-dialog',
        title: 'Demo and Responsive Dialog',
        description:
          'Render the upstream Move Goal drawer and responsive edit-profile Dialog/Drawer examples with app-owned state, chart, form, and viewport branching.',
        source: drawerSource,
        preview: <DrawerPreview />,
      },
    ],
    accessibility: [
      'Enhanced drawers assign dialog roles, aria-labelledby, aria-describedby, focus movement, Escape handling, outside dismissal, focus restoration, and scroll locking.',
      'DrawerTrigger and DrawerClose are native buttons and expose aria-expanded, aria-controls, and visible or labelled text.',
      'Move Goal icon-style controls use ariaLabel for Decrease and Increase while the glyphs remain presentation.',
      'The edit-profile example composes real Label and Input controls so the form remains accessible independent of the Drawer primitive.',
    ],
    customization: [
      'Drawer exposes root, trigger, portal, overlay, content, handle, header, footer, title, description, and close hooks with classes, data attributes, style, and CSS variables.',
      'Use class and style on DrawerContent for shadcn-style max-width, padding, alignment, and bottom-sheet surface tuning.',
      'Button, Input, Label, Dialog, native forms, chart visualization, and responsive branch markup remain ordinary composition around the Drawer package.',
      'Min/max goal states, disabled controls, increments, chart data, and viewport branch selection are app-owned state that can be enhanced without changing radcn/drawer.',
    ],
    divergence: [
      'React props/state, Vaul DrawerPrimitive, controlled open/onOpenChange, useState, useMediaQuery, asChild, className, data-slot, cn, and Tailwind utilities map to explicit RadCN props, browser enhancement, class, public data-radcn hooks, package CSS, and app-owned state.',
      'Button asChild maps to styling DrawerTrigger and DrawerClose directly with Button classes or composing RadCN Button where a nested button is not involved.',
      'Minus, Plus, lucide-react, Recharts, chart engines, form-state libraries, and media-query hooks are app presentation or app state and are not RadCN dependencies.',
      'The docs use dependency-free chart bars as the Recharts composition substitute while preserving the user-facing Move Goal chart slot.',
      'The responsive Dialog/Drawer example is proven with deterministic desktop and mobile branch fixtures; applications own the actual breakpoint policy.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
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
        slug: 'tabs-demo',
        title: 'Tabs Demo',
        description:
          'The upstream Account and Password card form composition ported to RadCN Tabs.',
        source: tabsDemoSource,
        preview: <TabsDemoPreview />,
      },
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
      'The Account/Password demo composes Tabs with Card, Label, Input, and Button; defaultValue=\"account\" maps to server markup plus browser-enhanced data-value state.',
      'Upstream wrapper utilities flex, w-full, max-w-sm, flex-col, and gap-6 map to class plus explicit style evidence in RadCN docs.',
    ],
    divergence: [
      'RadCN tabs use browser enhancement for selection and keyboard behavior instead of React component state.',
      'Server markup remains readable and package-owned, while interactive selection is attached explicitly by enhanceTabs.',
      'use client, React component props, and Radix TabsPrimitive.Root/List/Trigger/Content map to server-rendered RadCN parts with scoped enhanceTabs behavior.',
      'cva, VariantProps, tabsListVariants, className, Tailwind utilities, cn, data-slot, data-orientation, data-variant, and data-state map to RadCN props, class, public data-radcn hooks, data-orientation, and data-state.',
      'AppWindowIcon and CodeIcon are unused upstream lucide-react imports and are not RadCN package dependencies.',
      'Upstream Input defaultValue maps to RadCN Input value for static server-rendered demo defaults.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
    ],
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    category: 'Overlays',
    kind: 'component',
    disposition: 'ready',
    status: 'ready',
    summary:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    importPath: 'radcn/tooltip',
    importExample:
      "import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from 'radcn/tooltip'",
    install: 'pnpm add radcn # intended future package',
    examples: [
      {
        slug: 'tooltip-demo',
        title: 'Tooltip Demo',
        description:
          'The upstream Hover trigger and Add to library tooltip composition ported to RadCN.',
        source: tooltipDemoSource,
        preview: <TooltipDemoPreview />,
      },
    ],
    accessibility: [
      'Enhanced tooltips expose role="tooltip" and connect trigger to content with aria-describedby.',
      'The Hover trigger is a native button styled with outline Button classes, so the upstream asChild Button trigger maps without nested interactive controls.',
      'The named demo opens on pointer hover and keyboard focus, and closes when focus leaves or Escape is pressed.',
    ],
    customization: [
      'Provider, root, trigger, portal, content, and arrow parts expose stable RadCN classes and data-radcn hooks.',
      'Provider delayDuration={0} maps to delay metadata, and TooltipContent sideOffset={0} maps to data-side-offset="0".',
      'Side, align, open state, portal placement, and arrow rendering are public behavior and styling surfaces.',
    ],
    divergence: [
      'use client, React component props, and Radix TooltipPrimitive.Provider/Root/Trigger/Portal/Content/Arrow map to server-rendered RadCN parts with scoped enhanceTooltip behavior.',
      'TooltipTrigger asChild maps to styling RadCN TooltipTrigger with radcn-button radcn-button--outline classes, avoiding nested buttons while preserving the visible outline Button trigger.',
      'className, Tailwind utilities, cn, data-slot, data-state, and data-side map to RadCN class, public data-radcn hooks, data-state, data-side, and package CSS.',
      'Provider delayDuration = 0 and content sideOffset = 0 map to explicit RadCN props and data metadata.',
      'Custom Tooltip tokens remain package-owned CSS variables and fixture-proven custom classes, not Tailwind runtime dependencies.',
      'Vendor source remains read-only evidence and is not imported by RadCN.',
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
        slug: 'sonner-demo-and-types',
        title: 'Demo and Types',
        description:
          'Map the active shadcn Sonner examples to native Button triggers, RadCN toast events, and server-rendered Toaster evidence.',
        source: sonnerSource,
        preview: <SonnerPreview />,
      },
    ],
    accessibility: [
      'Renders a named notification region containing list items with status or alert roles.',
      'Toast urgency controls aria-live politeness through the toast type.',
      'Dismiss controls are native buttons when a toast is dismissible.',
      'Default, success, info, and loading notifications use status semantics; warning and error use alert semantics.',
    ],
    customization: [
      'Toast position, type, action, and dismissibility are data-driven through Toaster props.',
      'The list, toast, icon, body, title, description, action, and dismiss parts expose stable classes and data hooks.',
      'Button composition stays explicit: wrap any RadCN Button in a data-radcn-toast-trigger host to dispatch a toast payload.',
      'Custom classes, styles, and tokens attach to public RadCN hooks instead of upstream className, data-slot, cn, or Tailwind utility internals.',
    ],
    divergence: [
      'RadCN keeps the event bridge explicit with enhanceToaster and the RadCN toast event instead of React context.',
      'Initial toasts can be server-rendered, while later notifications are appended by browser enhancement.',
      'The upstream sonner package, next-themes, lucide icons, React client markers, React onClick handlers, console.log callbacks, vendor source, and Tailwind utilities are documented mappings or app-owned concerns, not RadCN dependencies.',
      'toast.promise maps to app-owned orchestration: dispatch a loading toast, then dispatch the success or error notification from the app promise branch.',
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
