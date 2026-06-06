import { run } from 'remix/ui'
import { enhanceContextMenu } from 'radcn/context-menu'
import { enhanceDropdownMenu } from 'radcn/dropdown-menu'
import { enhanceHoverCard } from 'radcn/hover-card'
import { enhanceMenubar } from 'radcn/menubar'
import { enhanceNavigationMenu } from 'radcn/navigation-menu'
import { enhancePopover } from 'radcn/popover'
import { enhanceSwitch } from 'radcn/switch'
import { enhanceTabs } from 'radcn/tabs'

const THEME_MODE_STORAGE_KEY = 'radcn-theme-mode'
const LEGACY_THEME_STORAGE_KEY = 'radcn-theme'
type RadcnTheme = 'light' | 'dark'
type RadcnThemeMode = 'system' | RadcnTheme

let currentThemeMode: RadcnThemeMode = 'system'
let colorSchemeQuery: MediaQueryList | undefined

function isThemeMode(value: string | null): value is RadcnThemeMode {
  return value === 'system' || value === 'light' || value === 'dark'
}

function safeStoredThemeMode(): RadcnThemeMode {
  try {
    let storedMode = localStorage.getItem(THEME_MODE_STORAGE_KEY)
    if (isThemeMode(storedMode)) return storedMode

    let legacyTheme = localStorage.getItem(LEGACY_THEME_STORAGE_KEY)
    if (legacyTheme === 'light' || legacyTheme === 'dark') return legacyTheme
  } catch {
    // Theme mode should still default correctly when storage is unavailable.
  }

  return 'system'
}

function systemColorSchemeQuery(): MediaQueryList | undefined {
  if (colorSchemeQuery) return colorSchemeQuery
  if (!('matchMedia' in window)) return undefined

  colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  return colorSchemeQuery
}

function resolveTheme(mode: RadcnThemeMode): RadcnTheme {
  if (mode === 'light' || mode === 'dark') return mode
  return systemColorSchemeQuery()?.matches ? 'dark' : 'light'
}

function persistThemeMode(mode: RadcnThemeMode) {
  try {
    localStorage.setItem(THEME_MODE_STORAGE_KEY, mode)
    localStorage.removeItem(LEGACY_THEME_STORAGE_KEY)
  } catch {
    // Theme switching should still work when storage is unavailable.
  }
}

function updateThemeModeControls(mode: RadcnThemeMode, resolvedTheme: RadcnTheme) {
  document
    .querySelectorAll<HTMLElement>('[data-radcn-theme-mode-option]')
    .forEach((option) => {
      let optionMode = option.getAttribute('data-radcn-theme-mode-option')
      let isActive = optionMode === mode

      option.setAttribute('aria-checked', isActive ? 'true' : 'false')
      option.setAttribute('data-active', isActive ? 'true' : 'false')
      option.setAttribute('tabindex', isActive ? '0' : '-1')
    })

  document
    .querySelectorAll<HTMLElement>('[data-radcn-theme-mode-control]')
    .forEach((control) => {
      control.setAttribute('data-radcn-theme-resolved', resolvedTheme)
    })
}

function applyThemeMode(mode: RadcnThemeMode, options: { persist?: boolean } = {}) {
  currentThemeMode = mode
  let resolvedTheme = resolveTheme(mode)

  document.documentElement.dataset.radcnThemeMode = mode
  document.documentElement.dataset.radcnTheme = resolvedTheme
  document.documentElement.style.colorScheme = resolvedTheme
  updateThemeModeControls(mode, resolvedTheme)

  if (options.persist !== false) {
    persistThemeMode(mode)
  }
}

function focusThemeModeOption(control: HTMLElement, mode: RadcnThemeMode) {
  control.querySelector<HTMLElement>(`[data-radcn-theme-mode-option="${mode}"]`)?.focus()
}

function setupThemeModeControl() {
  applyThemeMode(safeStoredThemeMode())

  systemColorSchemeQuery()?.addEventListener('change', () => {
    if (currentThemeMode === 'system') {
      applyThemeMode('system', { persist: false })
    }
  })

  document.addEventListener('click', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return

    let option = target.closest<HTMLElement>('[data-radcn-theme-mode-option]')
    if (!option) return

    let mode = option.getAttribute('data-radcn-theme-mode-option')
    if (!isThemeMode(mode)) return

    event.preventDefault()
    applyThemeMode(mode)
  })

  document.addEventListener('keydown', (event) => {
    let target = event.target
    if (!(target instanceof HTMLElement)) return

    let option = target.closest<HTMLElement>('[data-radcn-theme-mode-option]')
    if (!option) return

    let control = option.closest<HTMLElement>('[data-radcn-theme-mode-control]')
    if (!control) return

    let modes: RadcnThemeMode[] = ['system', 'light', 'dark']
    let index = modes.indexOf(currentThemeMode)
    let nextMode: RadcnThemeMode | undefined

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextMode = modes[(index + modes.length - 1) % modes.length]
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextMode = modes[(index + 1) % modes.length]
    } else if (event.key === 'Home') {
      nextMode = modes[0]
    } else if (event.key === 'End') {
      nextMode = modes[modes.length - 1]
    }

    if (!nextMode) return

    event.preventDefault()
    applyThemeMode(nextMode)
    focusThemeModeOption(control, nextMode)
  })
}

function setupCodeCopyButtons() {
  document
    .querySelectorAll<HTMLButtonElement>('[data-radcn-code-copy-button]')
    .forEach((button) => {
      button.setAttribute('data-radcn-code-copy-ready', 'true')
    })

  document.addEventListener('click', async (event) => {
    let target = event.target
    if (!(target instanceof Element)) return

    let button = target.closest<HTMLButtonElement>('[data-radcn-code-copy-button]')
    if (!button) return

    let frame = button.closest<HTMLElement>('[data-radcn-code-block]')
    let code = frame?.querySelector('code')?.textContent
    if (!code) return

    event.preventDefault()
    await copyCode(button, code)
  })
}

async function copyCode(button: HTMLButtonElement, code: string) {
  let label = button.querySelector<HTMLElement>('[data-radcn-code-copy-label]')

  try {
    await navigator.clipboard.writeText(code)
    setCodeCopyState(button, label, 'copied', 'Copied to clipboard')
  } catch {
    setCodeCopyState(button, label, 'failed', 'Copy failed')
  }

  window.setTimeout(() => {
    setCodeCopyState(button, label, 'idle', 'Copy code')
  }, 1200)
}

function setCodeCopyState(
  button: HTMLButtonElement,
  label: HTMLElement | null,
  state: 'copied' | 'failed' | 'idle',
  text: string,
) {
  button.setAttribute('aria-label', text)
  button.setAttribute('data-copy-state', state)
  if (label) label.textContent = text
}

function setupInputOTPControlledExamples() {
  document
    .querySelectorAll<HTMLElement>('[data-radcn-docs-input-otp-family="input-otp-controlled"]')
    .forEach((example) => {
      if (example.dataset.radcnDocsInputOtpControlledReady === 'true') return
      let input = example.querySelector<HTMLInputElement>('[data-radcn-input-otp-input]')
      let output = example.querySelector<HTMLElement>('[data-radcn-docs-input-otp-controlled-output]')
      if (!input || !output) return

      let sync = () => {
        output.textContent = input.value ? `You entered: ${input.value}` : 'Enter your one-time password.'
      }

      input.addEventListener('input', sync)
      example.addEventListener('radcn-input-otp-change', sync)
      example.dataset.radcnDocsInputOtpControlledReady = 'true'
      sync()
    })
}

function setDocsCommandDialogOpen(wrapper: HTMLElement, open: boolean) {
  let dialog = wrapper.querySelector<HTMLElement>('[data-radcn-dialog]')
  if (!dialog) return
  let portal = dialog.id
    ? document.querySelector<HTMLElement>(`[data-radcn-dialog-portal][data-dialog-id="${CSS.escape(dialog.id)}"]`)
    : null
  portal ||= wrapper.querySelector<HTMLElement>('[data-radcn-dialog-portal]')
  if (!portal) return

  dialog.dataset.state = open ? 'open' : 'closed'
  dialog.dataset.open = open ? 'true' : 'false'
  portal.dataset.state = open ? 'open' : 'closed'
  portal.hidden = !open
  portal.querySelectorAll<HTMLElement>('[data-radcn-dialog-overlay], [data-radcn-dialog-content]').forEach((part) => {
    part.dataset.state = open ? 'open' : 'closed'
    part.hidden = !open
    if (part.matches('[data-radcn-dialog-content]')) {
      part.setAttribute('role', 'dialog')
      part.setAttribute('aria-modal', 'true')
    }
  })

  if (open) {
    portal.querySelector<HTMLInputElement>('[data-radcn-command-input]')?.focus()
  }
}

function setupCommandDialogShortcutExample() {
  document.addEventListener('keydown', (event) => {
    let wrapper = document.querySelector<HTMLElement>('[data-radcn-docs-command-dialog-shortcut="true"]')
    if (!wrapper) return

    if (event.key === 'Escape') {
      let content = wrapper.querySelector<HTMLElement>('[data-radcn-dialog-content]')
      if (content?.dataset.state === 'open') {
        event.preventDefault()
        setDocsCommandDialogOpen(wrapper, false)
      }
      return
    }

    if (event.key.toLowerCase() !== 'j' || (!event.metaKey && !event.ctrlKey)) return
    event.preventDefault()
    setDocsCommandDialogOpen(wrapper, true)
  })
}

function setupProgressDemoExample(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-docs-progress-family="progress-demo"]').forEach((example) => {
    if (example.dataset.radcnDocsProgressDemoReady === 'true') return
    let progress = example.querySelector<HTMLProgressElement>('[data-radcn-progress]')
    let indicator = example.querySelector<HTMLElement>('[data-radcn-progress-indicator]')
    if (!progress || !indicator) return

    example.dataset.radcnDocsProgressDemoReady = 'true'
    window.setTimeout(() => {
      progress.value = 66
      progress.setAttribute('value', '66')
      indicator.style.width = '66%'
    }, 500)
  })
}

setupThemeModeControl()
setupCodeCopyButtons()
setupInputOTPControlledExamples()
setupCommandDialogShortcutExample()
setupProgressDemoExample()

run({
  async loadModule(moduleUrl, exportName) {
    let mod = await import(moduleUrl)
    return mod[exportName]
  },
})

enhanceContextMenu()
document
  .querySelectorAll<HTMLElement>('[data-radcn-docs-data-table-family="data-table-demo"]')
  .forEach((example) => enhanceDropdownMenu(example))
document
  .querySelectorAll<HTMLElement>('[data-radcn-docs-hover-card-family="hover-card-demo"]')
  .forEach((example) => enhanceHoverCard(example))
document
  .querySelectorAll<HTMLElement>('[data-radcn-docs-menubar-family="menubar-demo"]')
  .forEach((example) => enhanceMenubar(example))
document
  .querySelectorAll<HTMLElement>('[data-radcn-docs-navigation-menu-family="navigation-menu-demo"]')
  .forEach((example) => enhanceNavigationMenu(example))
document
  .querySelectorAll<HTMLElement>('[data-radcn-docs-popover-family="popover-demo"]')
  .forEach((example) => enhancePopover(example))
document
  .querySelectorAll<HTMLElement>('[data-radcn-docs-switch-family="switch-demo"]')
  .forEach((example) => enhanceSwitch(example))
document
  .querySelectorAll<HTMLElement>('[data-radcn-docs-tabs-family="tabs-demo"]')
  .forEach((example) => enhanceTabs(example))
