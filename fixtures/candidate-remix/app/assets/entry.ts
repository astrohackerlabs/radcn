import { run } from 'remix/ui'
import { enhanceAlertDialog } from 'radcn/alert-dialog'
import { enhanceDialog } from 'radcn/dialog'
import { enhanceSheet } from 'radcn/sheet'
import { enhanceSlider } from 'radcn/slider'
import { enhanceTabs } from 'radcn/tabs'
import { enhanceToggle } from 'radcn/toggle'
import { enhanceToggleGroup } from 'radcn/toggle-group'

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
enhanceSlider()
enhanceToggle()
enhanceToggleGroup()
