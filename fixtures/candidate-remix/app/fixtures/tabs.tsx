import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'radcn'

function AccountTabs({
  activationMode,
  className,
  defaultValue = 'account',
  disabled,
  orientation,
}: {
  activationMode?: 'automatic' | 'manual'
  className?: string
  defaultValue?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
}) {
  return (
    <Tabs activationMode={activationMode} class={className} defaultValue={defaultValue} orientation={orientation}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled={disabled}>
          Password
        </TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Manage your profile and public account details.</TabsContent>
      <TabsContent value="password">Update your password and session security.</TabsContent>
      <TabsContent value="billing">Review invoices and payment methods.</TabsContent>
    </Tabs>
  )
}

export function renderTabsFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'default-value':
      return AccountTabs({ defaultValue: 'billing' })
    case 'disabled':
      return AccountTabs({ disabled: true })
    case 'vertical':
      return AccountTabs({ defaultValue: 'password', orientation: 'vertical' })
    case 'manual':
      return AccountTabs({ activationMode: 'manual' })
    case 'custom-token':
      return AccountTabs({ className: 'radcn-fixture-custom-tabs', defaultValue: 'billing' })
    default:
      return AccountTabs({})
  }
}
