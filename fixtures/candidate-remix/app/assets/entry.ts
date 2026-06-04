import { run } from 'remix/ui'
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
enhanceSlider()
enhanceToggle()
enhanceToggleGroup()
