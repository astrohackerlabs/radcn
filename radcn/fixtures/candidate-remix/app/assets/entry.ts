import { run } from 'remix/ui'
import { enhanceAlertDialog } from 'radcn/alert-dialog'
import { enhanceCalendar } from 'radcn/calendar'
import { enhanceCarousel } from 'radcn/carousel'
import { enhanceCombobox } from 'radcn/combobox'
import { enhanceCommand } from 'radcn/command'
import { enhanceContextMenu } from 'radcn/context-menu'
import { enhanceDatePicker } from 'radcn/date-picker'
import { enhanceDialog } from 'radcn/dialog'
import { enhanceDrawer } from 'radcn/drawer'
import { enhanceDropdownMenu } from 'radcn/dropdown-menu'
import { enhanceHoverCard } from 'radcn/hover-card'
import { enhanceInputGroup } from 'radcn/input-group'
import { enhanceInputOTP } from 'radcn/input-otp'
import { enhanceMenubar } from 'radcn/menubar'
import { enhanceNavigationMenu } from 'radcn/navigation-menu'
import { enhancePopover } from 'radcn/popover'
import { enhanceResizable } from 'radcn/resizable'
import { enhanceSelect } from 'radcn/select'
import { enhanceSheet } from 'radcn/sheet'
import { enhanceSidebar } from 'radcn/sidebar'
import { enhanceSlider } from 'radcn/slider'
import { enhanceToaster } from 'radcn/sonner'
import { enhanceTabs } from 'radcn/tabs'
import { enhanceToggle } from 'radcn/toggle'
import { enhanceToggleGroup } from 'radcn/toggle-group'
import { enhanceTooltip } from 'radcn/tooltip'

run({
  async loadModule(moduleUrl, exportName) {
    let mod = await import(moduleUrl)
    return mod[exportName]
  },
})

enhanceTabs()
enhanceDialog()
enhanceAlertDialog()
enhanceSheet()
enhanceDrawer()
enhanceSelect()
enhanceCalendar()
enhanceDatePicker()
enhanceCarousel()
enhanceCombobox()
enhanceCommand()
enhanceDropdownMenu()
enhanceContextMenu()
enhanceMenubar()
enhanceNavigationMenu()
enhancePopover()
enhanceTooltip()
enhanceHoverCard()
enhanceResizable()
enhanceSidebar()
enhanceSlider()
enhanceToaster()
enhanceToggle()
enhanceToggleGroup()
enhanceInputGroup()
enhanceInputOTP()

function enhanceFixtureCarouselStatus(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-fixture-carousel-example]').forEach((example) => {
    let carousel = example.querySelector<HTMLElement>('[data-radcn-carousel]')
    let status = example.querySelector<HTMLElement>('[data-fixture-carousel-status]')
    if (!carousel || !status || status.dataset.fixtureCarouselStatusReady === 'true') return

    let sync = () => {
      let current = carousel.dataset.current || '1'
      let count = carousel.dataset.count || String(carousel.querySelectorAll('[data-radcn-carousel-item]').length || 0)
      status.textContent = `Slide ${current} of ${count}`
    }

    carousel.addEventListener('radcn-carousel-select', sync)
    carousel.addEventListener('radcn-carousel-scroll', sync)
    new MutationObserver(sync).observe(carousel, {
      attributeFilter: ['data-current', 'data-count'],
      attributes: true,
    })
    status.dataset.fixtureCarouselStatusReady = 'true'
    sync()
  })
}

function enhanceFixtureCarouselAutoplay(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-fixture-carousel-autoplay="true"]').forEach((example) => {
    if (example.dataset.fixtureCarouselAutoplayReady === 'true') return
    let carousel = example.querySelector<HTMLElement>('[data-radcn-carousel]')
    let next = example.querySelector<HTMLButtonElement>('[data-radcn-carousel-next]')
    if (!carousel || !next) return

    let delay = Number(example.dataset.fixtureCarouselDelay || '2000')
    let timer: number | undefined

    let tick = () => {
      if (next.disabled) {
        carousel.focus()
        carousel.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Home' }))
      } else {
        next.click()
      }
    }

    let start = () => {
      window.clearInterval(timer)
      timer = window.setInterval(tick, delay)
      example.dataset.autoplay = 'running'
    }

    let stop = () => {
      window.clearInterval(timer)
      timer = undefined
      example.dataset.autoplay = 'paused'
    }

    example.addEventListener('mouseenter', stop)
    example.addEventListener('mouseleave', start)
    example.dataset.fixtureCarouselAutoplayReady = 'true'
    start()
  })
}

function closeFixtureOverlays(scope: ParentNode) {
  scope.querySelectorAll<HTMLElement>('[data-radcn-dropdown-menu-content], [data-radcn-dropdown-menu-sub-content], [data-radcn-popover-content], [data-radcn-drawer-content], [data-radcn-drawer-overlay]').forEach((element) => {
    element.hidden = true
    element.dataset.state = 'closed'
  })
  scope.querySelectorAll<HTMLElement>('[data-radcn-dropdown-menu-trigger], [data-radcn-dropdown-menu-sub-trigger], [data-radcn-popover-trigger], [data-radcn-drawer-trigger]').forEach((trigger) => {
    trigger.dataset.state = 'closed'
    trigger.setAttribute('aria-expanded', 'false')
  })
}

function enhanceFixtureComboboxExamples(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-fixture-combobox-example]').forEach((example) => {
    if (example.dataset.fixtureComboboxExampleReady === 'true') return

    let syncComboboxLabel = () => {
      let combobox = example.querySelector<HTMLElement>('[data-radcn-combobox]')
      let label = example.querySelector<HTMLElement>('[data-fixture-combobox-label]')
      if (!combobox || !label) return
      let value = combobox.dataset.value || ''
      let item = value ? document.querySelector<HTMLElement>(`[data-radcn-combobox-item][data-value="${CSS.escape(value)}"]`) : null
      label.textContent = item?.textContent?.replace('✓', '').trim() || '+ Set status'
    }

    let combobox = example.querySelector<HTMLElement>('[data-radcn-combobox]')
    if (combobox) {
      new MutationObserver(syncComboboxLabel).observe(combobox, {
        attributeFilter: ['data-value'],
        attributes: true,
      })
      syncComboboxLabel()
    }

    example.dataset.fixtureComboboxExampleReady = 'true'
  })

  root.querySelectorAll<HTMLElement>('[data-fixture-combobox-command-owner]').forEach((wrapper) => {
    if (wrapper.dataset.fixtureComboboxCommandReady === 'true') return
    let command = wrapper.querySelector<HTMLElement>('[data-radcn-command]')
    if (!command) return
    let update = (value: string, item: HTMLElement | null) => {
      let owner = wrapper.dataset.fixtureComboboxCommandOwner
      let example = owner ? document.querySelector<HTMLElement>(`[data-fixture-combobox-example][data-fixture-combobox-owner="${CSS.escape(owner)}"]`) : null
      if (!example) return
      let text = item?.textContent?.replace('✓', '').trim() || value
      example.querySelectorAll<HTMLElement>('[data-fixture-combobox-label]').forEach((label) => {
        label.textContent = text
      })
      closeFixtureOverlays(document)
    }
    command.addEventListener('radcn-command-select', (event) => {
      let detail = (event as CustomEvent<{ value?: string }>).detail
      let value = detail?.value || command.dataset.value || ''
      let item = value ? command.querySelector<HTMLElement>(`[data-radcn-command-item][data-value="${CSS.escape(value)}"]`) : null
      update(value, item)
    })
    wrapper.addEventListener('click', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let item = target.closest<HTMLElement>('[data-radcn-command-item]')
      if (!item || item.dataset.disabled === 'true') return
      update(item.dataset.value || '', item)
    })
    wrapper.dataset.fixtureComboboxCommandReady = 'true'
  })

  let mobileResponsiveCombobox = document.getElementById('candidate-combobox-responsive-mobile')
  if (mobileResponsiveCombobox instanceof HTMLElement && mobileResponsiveCombobox.dataset.fixtureComboboxMobileReady !== 'true') {
    let syncMobile = () => {
      let value = mobileResponsiveCombobox.dataset.value || ''
      let item = value ? document.querySelector<HTMLElement>(`#candidate-combobox-responsive-mobile-content [data-radcn-combobox-item][data-value="${CSS.escape(value)}"], [data-radcn-combobox-item][data-value="${CSS.escape(value)}"]`) : null
      let text = item?.textContent?.replace('✓', '').trim() || '+ Set status'
      let example = document.querySelector<HTMLElement>('[data-fixture-combobox-example][data-fixture-combobox-owner="combobox-responsive"]')
      example?.querySelectorAll<HTMLElement>('[data-fixture-combobox-label]').forEach((label) => {
        label.textContent = text
      })
      if (value) closeFixtureOverlays(document)
    }
    new MutationObserver(syncMobile).observe(mobileResponsiveCombobox, {
      attributeFilter: ['data-value'],
      attributes: true,
    })
    mobileResponsiveCombobox.dataset.fixtureComboboxMobileReady = 'true'
    syncMobile()
  }
}

document.addEventListener('click', (event) => {
  let target = event.target
  if (!(target instanceof Element)) return
  let item = target.closest<HTMLElement>('[data-radcn-command-item]')
  if (!item || item.dataset.disabled === 'true') return
  let wrapper = item.closest<HTMLElement>('[data-fixture-combobox-command-owner]')
  let owner = wrapper?.dataset.fixtureComboboxCommandOwner
  if (!owner && item.closest('[data-radcn-drawer-content]')) owner = 'combobox-responsive'
  let example = owner ? document.querySelector<HTMLElement>(`[data-fixture-combobox-example][data-fixture-combobox-owner="${CSS.escape(owner)}"]`) : null
  if (!example) return
  let text = item.textContent?.replace('✓', '').trim() || item.dataset.value || ''
  example.querySelectorAll<HTMLElement>('[data-fixture-combobox-label]').forEach((label) => {
    label.textContent = text
  })
  closeFixtureOverlays(document)
})

enhanceFixtureCarouselStatus()
enhanceFixtureCarouselAutoplay()
enhanceFixtureComboboxExamples()

document.addEventListener('click', (event) => {
  let target = event.target
  if (!(target instanceof Element)) return
  if (!target.closest('[data-radcn-drawer-trigger], [data-radcn-popover-trigger], [data-radcn-dropdown-menu-trigger], [data-radcn-dropdown-menu-sub-trigger]')) return
  window.setTimeout(() => enhanceFixtureComboboxExamples())
})
