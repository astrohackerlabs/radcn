import { run } from 'remix/ui'
import { enhanceAlertDialog } from 'radcn/alert-dialog'
import { enhanceCombobox } from 'radcn/combobox'
import { enhanceCommand } from 'radcn/command'
import { enhanceContextMenu } from 'radcn/context-menu'
import { enhanceDialog } from 'radcn/dialog'
import { enhanceDrawer } from 'radcn/drawer'
import { enhanceDropdownMenu } from 'radcn/dropdown-menu'
import { enhanceHoverCard } from 'radcn/hover-card'
import { enhanceMenubar } from 'radcn/menubar'
import { enhanceNavigationMenu } from 'radcn/navigation-menu'
import { enhancePopover } from 'radcn/popover'
import { enhanceSelect } from 'radcn/select'
import { enhanceSheet } from 'radcn/sheet'
import { enhanceSlider } from 'radcn/slider'
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
enhanceCombobox()
enhanceCommand()
enhanceDropdownMenu()
enhanceContextMenu()
enhanceMenubar()
enhanceNavigationMenu()
enhancePopover()
enhanceTooltip()
enhanceHoverCard()
enhanceSlider()
enhanceToggle()
enhanceToggleGroup()
