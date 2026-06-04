import { run } from 'remix/ui'
import { enhanceTabs } from 'radcn/tabs'

run({
  async loadModule(moduleUrl, exportName) {
    let mod = await import(moduleUrl)
    return mod[exportName]
  },
})

enhanceTabs()
