import type { RemixNode } from 'remix/ui'
import { css } from 'remix/ui'
import { Badge } from 'radcn/badge'
import { Button } from 'radcn/button'
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
import { Input } from 'radcn/input'
import { Toaster } from 'radcn/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'radcn/tabs'

export type ComponentStatus = 'ready' | 'draft'

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

export const componentDocs: ComponentDoc[] = [
  {
    slug: 'button',
    title: 'Button',
    category: 'Inputs',
    status: 'ready',
    summary:
      'A native button and link primitive with RadCN variants, sizing, disabled states, and token-driven styling.',
    importPath: 'radcn/button',
    importExample: "import { Button } from 'radcn/button'",
    install: 'pnpm add radcn',
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
    status: 'ready',
    summary:
      'A compact label primitive for status, metadata, filters, and links.',
    importPath: 'radcn/badge',
    importExample: "import { Badge } from 'radcn/badge'",
    install: 'pnpm add radcn',
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
    status: 'ready',
    summary:
      'A native text input with RadCN sizing, border, disabled, required, and invalid-state styling.',
    importPath: 'radcn/input',
    importExample: "import { Input } from 'radcn/input'",
    install: 'pnpm add radcn',
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
    slug: 'dialog',
    title: 'Dialog',
    category: 'Overlays',
    status: 'ready',
    summary:
      'A modal dialog primitive with trigger, content, title, description, footer, and dismiss controls.',
    importPath: 'radcn/dialog',
    importExample:
      "import { Dialog, DialogContent, DialogTrigger } from 'radcn/dialog'",
    install: 'pnpm add radcn',
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
    status: 'ready',
    summary:
      'A tablist, trigger, and panel set for switching between related sections of content.',
    importPath: 'radcn/tabs',
    importExample:
      "import { Tabs, TabsContent, TabsList, TabsTrigger } from 'radcn/tabs'",
    install: 'pnpm add radcn',
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
    status: 'ready',
    summary:
      'A notification surface for rendering queued toasts and browser-triggered toast events.',
    importPath: 'radcn/sonner',
    importExample: "import { Toaster } from 'radcn/sonner'",
    install: 'pnpm add radcn',
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

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return componentDocs.find((component) => component.slug === slug)
}
