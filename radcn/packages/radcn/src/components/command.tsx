import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { sharedContentStructure, sharedEmpty, sharedGroup, sharedIndicator, sharedInput, sharedItemStructure, sharedList, sharedSeparator } from './combobox.tsx'

// Command surfaces as Tailwind utilities (Issue 6, Experiment 53). Shares the
// control/input/content/list/item structure with Combobox (imported). The command
// root + input-wrapper carry their RESOLVED state directly (no shared-vs-override
// conflict, Exp-41). The item-indicator keeps its class for the kept
// [data-checked=false] cascade. Comments are ASCII.
const commandRootClass = `${sharedContentStructure} bg-[var(--radcn-command-bg,var(--radcn-background))] text-[var(--radcn-command-fg,var(--radcn-foreground))] [font-family:var(--radcn-font)] w-[min(100%,var(--radcn-command-width,26rem))]`
const commandInputWrapperClass =
  'flex w-full min-h-[var(--radcn-control-height)] items-center border-x-0 border-t-0 border-b rounded-none border-[color:var(--radcn-command-border,var(--radcn-border))] bg-[var(--radcn-command-bg,var(--radcn-background))] text-[var(--radcn-combobox-trigger-fg,var(--radcn-foreground))]'
const commandItemClass = `${sharedItemStructure} grid-cols-[minmax(0,1fr)_auto_auto]`
const commandGroupHeadingClass =
  'px-2 pt-1.5 pb-1 text-muted-foreground font-semibold text-[0.75rem] leading-[1.2] [font-family:var(--radcn-font)]'
const commandShortcutClass = 'text-muted-foreground font-medium text-[0.75rem] leading-none [font-family:var(--radcn-font)]'
const commandDialogClass = 'p-0 overflow-hidden'
const commandDialogHeaderClass = 'absolute w-px h-px overflow-hidden [clip:rect(0,0,0,0)]'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from './dialog.tsx'
import { setupSearchableListbox } from '../utils/searchable-listbox.ts'

export interface CommandProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  id?: string
  loop?: boolean
  style?: string
  value?: string
}

export interface CommandDialogProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  description?: string
  modal?: boolean
  open?: boolean
  showCloseButton?: boolean
  style?: string
  title?: string
}

export interface CommandInputProps {
  ariaLabel?: string
  class?: string
  defaultValue?: string
  disabled?: boolean
  placeholder?: string
  style?: string
}

export interface CommandItemProps {
  children?: RemixNode
  checked?: boolean
  class?: string
  disabled?: boolean
  keywords?: string
  style?: string
  value: string
}

export interface CommandPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface CommandGroupProps extends CommandPartProps {
  heading?: RemixNode
  id?: string
}

export function enhanceCommand(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-command]').forEach((command) => {
    if (command.dataset.radcnCommandReady === 'true') return
    let input = command.querySelector<HTMLInputElement>('[data-radcn-command-input]')
    let list = command.querySelector<HTMLElement>('[data-radcn-command-list]')
    if (!input || !list) return
    const inputEl = input
    const listEl = list

    let commandId = command.id || `radcn-command-${Math.random().toString(36).slice(2)}`
    command.id = commandId
    listEl.id = listEl.id || `${commandId}-list`
    inputEl.setAttribute('aria-controls', listEl.id)
    listEl.setAttribute('role', 'listbox')
    if (command.dataset.disabled === 'true') inputEl.disabled = true

    let searchable = setupSearchableListbox({
      emptySelector: '[data-radcn-command-empty]',
      groupSelector: '[data-radcn-command-group]',
      input: inputEl,
      itemSelector: '[data-radcn-command-item]',
      list: listEl,
      root: command,
    })

    function activate(item: HTMLElement) {
      if (item.dataset.disabled === 'true') return
      command.dataset.value = item.dataset.value || ''
      listEl.querySelectorAll<HTMLElement>('[data-radcn-command-item]').forEach((candidate) => {
        let selected = candidate === item
        candidate.dataset.selected = selected ? 'true' : 'false'
        candidate.dataset.checked = selected ? 'true' : candidate.dataset.checked || 'false'
        candidate.setAttribute('aria-selected', selected ? 'true' : 'false')
      })
      command.dispatchEvent(new CustomEvent('radcn-command-select', { bubbles: true, detail: { value: command.dataset.value } }))
    }

    inputEl.addEventListener('input', () => {
      searchable.filter(inputEl.value)
    })

    inputEl.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        searchable.move(event.key === 'ArrowDown' ? 1 : -1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        searchable.highlight(searchable.visibleItems()[0] || null)
      } else if (event.key === 'End') {
        event.preventDefault()
        searchable.highlight(searchable.visibleItems().at(-1) || null)
      } else if (event.key === 'Enter') {
        event.preventDefault()
        let active = searchable.activeItem()
        if (active) activate(active)
      } else if (event.key === 'Escape') {
        if (inputEl.value) {
          event.preventDefault()
          inputEl.value = ''
          searchable.filter('')
        }
      }
    })

    listEl.addEventListener('pointermove', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let item = target.closest<HTMLElement>('[data-radcn-command-item]')
      if (item && item.dataset.disabled !== 'true') searchable.highlight(item)
    })

    listEl.addEventListener('click', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let item = target.closest<HTMLElement>('[data-radcn-command-item]')
      if (item) {
        event.preventDefault()
        activate(item)
      }
    })

    listEl.querySelectorAll<HTMLElement>('[data-radcn-command-item]').forEach((item) => {
      item.setAttribute('role', 'option')
      item.setAttribute('aria-selected', item.dataset.selected === 'true' ? 'true' : 'false')
      if (item.dataset.disabled === 'true') item.setAttribute('aria-disabled', 'true')
    })
    searchable.filter(inputEl.value)
    if (!inputEl.value) searchable.highlight(null)
    command.dataset.radcnCommandReady = 'true'
  })
}

export function Command(handle: Handle<CommandProps>) {
  return () => {
    let { children, class: className, disabled, id, loop, style, value } = handle.props
    return <div class={classes(commandRootClass, className)} data-disabled={disabled ? 'true' : undefined} data-loop={loop ? 'true' : undefined} data-query="" data-radcn-command data-value={value} id={id} style={style}>{children}</div>
  }
}

export function CommandDialog(handle: Handle<CommandDialogProps>) {
  return () => {
    let { children, class: className, defaultOpen, description = 'Search for a command to run...', modal = true, open, showCloseButton = false, style, title = 'Command Palette' } = handle.props
    return (
      <Dialog defaultOpen={open ?? defaultOpen} dismissible={modal}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent class={classes(commandDialogClass, 'radcn-command-dialog', className)} showCloseButton={showCloseButton} style={style}>
            <DialogHeader class={commandDialogHeaderClass}>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  }
}

export function CommandInput(handle: Handle<CommandInputProps>) {
  return () => {
    let { ariaLabel, class: className, defaultValue, disabled, placeholder = 'Type a command or search...', style } = handle.props
    return <div class={commandInputWrapperClass} data-radcn-command-input-wrapper><input aria-label={ariaLabel} class={classes(sharedInput, className)} data-radcn-command-input disabled={disabled} placeholder={placeholder} style={style} value={defaultValue} /><span aria-hidden="true" class="radcn-command-input-icon" data-radcn-command-input-icon>?</span></div>
  }
}

export function CommandList(handle: Handle<CommandPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(sharedList, className)} data-radcn-command-list style={style}>{children}</div>
  }
}

export function CommandEmpty(handle: Handle<CommandPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(sharedEmpty, className)} data-empty="false" data-radcn-command-empty hidden style={style}>{children || 'No results found.'}</div>
  }
}

export function CommandGroup(handle: Handle<CommandGroupProps>) {
  return () => {
    let { children, class: className, heading, id, style } = handle.props
    let headingId = heading && id ? `${id}-heading` : undefined
    return (
      <div aria-labelledby={headingId} class={classes(sharedGroup, className)} data-radcn-command-group id={id} role="group" style={style}>
        {heading ? <div class={commandGroupHeadingClass} data-radcn-command-group-heading id={headingId}>{heading}</div> : null}
        {children}
      </div>
    )
  }
}

export function CommandItem(handle: Handle<CommandItemProps>) {
  return () => {
    let { checked, children, class: className, disabled, keywords, style, value } = handle.props
    return <div aria-disabled={disabled ? 'true' : undefined} aria-selected="false" class={classes(commandItemClass, className)} data-checked={checked ? 'true' : 'false'} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-keywords={keywords} data-radcn-command-item data-selected="false" data-value={value} role="option" style={style}>{children}<span aria-hidden="true" class={classes(sharedIndicator, 'radcn-command-item-indicator')} data-radcn-command-item-indicator>✓</span></div>
  }
}

export function CommandShortcut(handle: Handle<CommandPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <span class={classes(commandShortcutClass, className)} data-radcn-command-shortcut style={style}>{children}</span>
  }
}

export function CommandSeparator(handle: Handle<CommandPartProps>) {
  return () => {
    let { class: className, style } = handle.props
    return <div class={classes(sharedSeparator, className)} data-radcn-command-separator role="separator" style={style} />
  }
}
