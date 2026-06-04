import { run } from 'remix/ui'
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
enhanceToggle()
enhanceToggleGroup()
