import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'radcn'

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

function TabsDemo() {
  return (
    <div
      class="flex w-full max-w-sm flex-col gap-6"
      data-radcn-fixture-tabs-family="tabs-demo"
      style="display:flex;width:100%;max-width:24rem;flex-direction:column;gap:1.5rem;"
    >
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6" style="display:grid;gap:1.5rem;">
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" value="Pedro Duarte" />
              </div>
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" value="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6" style="display:grid;gap:1.5rem;">
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div class="grid gap-3" style="display:grid;gap:0.75rem;">
                <Label for="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function renderTabsFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'demo':
      return TabsDemo()
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
