import * as React from "react"

type TabsOrientation = "horizontal" | "vertical"

function Tabs({
  activationMode = "automatic",
  children,
  className,
  defaultValue,
  orientation = "horizontal",
}: {
  activationMode?: "automatic" | "manual"
  children: React.ReactNode
  className?: string
  defaultValue: string
  orientation?: TabsOrientation
}) {
  let [value, setValue] = React.useState(defaultValue)
  let rootId = React.useId()
  let triggersRef = React.useRef<Array<HTMLButtonElement | null>>([])

  function enabledTriggers() {
    return triggersRef.current.filter((trigger): trigger is HTMLButtonElement => Boolean(trigger && !trigger.disabled))
  }

  function move(current: HTMLButtonElement, direction: number | "first" | "last") {
    let enabled = enabledTriggers()
    let index = enabled.indexOf(current)
    if (index === -1) return
    let nextIndex = direction === "first" ? 0 : direction === "last" ? enabled.length - 1 : (index + direction + enabled.length) % enabled.length
    let next = enabled[nextIndex]
    next.focus()
    if (activationMode !== "manual") setValue(next.dataset.value ?? value)
  }

  return (
    <div
      className={`reference-tabs reference-tabs--${orientation} ${className ?? ""}`}
      data-activation-mode={activationMode}
      data-orientation={orientation}
      data-value={value}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child as React.ReactElement<any>, {
          orientation,
          rootId,
          selectedValue: value,
          setSelectedValue: setValue,
          move,
          triggersRef,
          activationMode,
        })
      })}
    </div>
  )
}

function TabsList({
  activationMode,
  children,
  move,
  orientation,
  rootId,
  selectedValue,
  setSelectedValue,
  triggersRef,
}: {
  activationMode?: "automatic" | "manual"
  children: React.ReactNode
  move?: (current: HTMLButtonElement, direction: number | "first" | "last") => void
  orientation?: TabsOrientation
  rootId?: string
  selectedValue?: string
  setSelectedValue?: (value: string) => void
  triggersRef?: React.MutableRefObject<Array<HTMLButtonElement | null>>
}) {
  return (
    <div className="reference-tabs-list" role="tablist">
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child as React.ReactElement<any>, {
          index,
          move,
          orientation,
          rootId,
          selectedValue,
          setSelectedValue,
          triggersRef,
          activationMode,
        })
      })}
    </div>
  )
}

function TabsTrigger({
  activationMode = "automatic",
  children,
  disabled,
  index = 0,
  move,
  orientation = "horizontal",
  rootId,
  selectedValue,
  setSelectedValue,
  triggersRef,
  value,
}: {
  activationMode?: "automatic" | "manual"
  children: React.ReactNode
  disabled?: boolean
  index?: number
  move?: (current: HTMLButtonElement, direction: number | "first" | "last") => void
  orientation?: TabsOrientation
  rootId?: string
  selectedValue?: string
  setSelectedValue?: (value: string) => void
  triggersRef?: React.MutableRefObject<Array<HTMLButtonElement | null>>
  value: string
}) {
  let selected = selectedValue === value
  let triggerId = `${rootId}-trigger-${value}`
  let panelId = `${rootId}-content-${value}`

  return (
    <button
      aria-controls={panelId}
      aria-disabled={disabled || undefined}
      aria-selected={selected}
      className="reference-tabs-trigger"
      data-disabled={disabled ? "true" : undefined}
      data-state={selected ? "active" : "inactive"}
      data-value={value}
      disabled={disabled}
      id={triggerId}
      onClick={() => setSelectedValue?.(value)}
      onKeyDown={(event) => {
        let current = event.currentTarget
        let handled = true

        switch (event.key) {
          case "ArrowRight":
            if (orientation === "vertical") handled = false
            else move?.(current, 1)
            break
          case "ArrowLeft":
            if (orientation === "vertical") handled = false
            else move?.(current, -1)
            break
          case "ArrowDown":
            if (orientation !== "vertical") handled = false
            else move?.(current, 1)
            break
          case "ArrowUp":
            if (orientation !== "vertical") handled = false
            else move?.(current, -1)
            break
          case "Home":
            move?.(current, "first")
            break
          case "End":
            move?.(current, "last")
            break
          case "Enter":
          case " ":
            setSelectedValue?.(value)
            break
          default:
            handled = false
        }

        if (handled) event.preventDefault()
      }}
      ref={(node) => {
        if (triggersRef) triggersRef.current[index] = node
      }}
      role="tab"
      tabIndex={selected && !disabled ? 0 : -1}
      type="button"
    >
      {children}
    </button>
  )
}

function TabsContent({
  children,
  rootId,
  selectedValue,
  value,
}: {
  children: React.ReactNode
  rootId?: string
  selectedValue?: string
  value: string
}) {
  let selected = selectedValue === value

  return (
    <div
      aria-labelledby={`${rootId}-trigger-${value}`}
      className="reference-tabs-content"
      data-state={selected ? "active" : "inactive"}
      data-value={value}
      hidden={!selected}
      id={`${rootId}-content-${value}`}
      role="tabpanel"
      tabIndex={0}
    >
      {children}
    </div>
  )
}

function AccountTabs({
  activationMode,
  className,
  defaultValue = "account",
  disabled,
  orientation,
}: {
  activationMode?: "automatic" | "manual"
  className?: string
  defaultValue?: string
  disabled?: boolean
  orientation?: TabsOrientation
}) {
  return (
    <Tabs activationMode={activationMode} className={className} defaultValue={defaultValue} orientation={orientation}>
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

export function renderTabsFixture(scenario: string) {
  switch (scenario) {
    case "default-value":
      return <AccountTabs defaultValue="billing" />
    case "disabled":
      return <AccountTabs disabled />
    case "vertical":
      return <AccountTabs defaultValue="password" orientation="vertical" />
    case "manual":
      return <AccountTabs activationMode="manual" />
    case "custom-token":
      return <AccountTabs className="reference-fixture-custom-tabs" defaultValue="billing" />
    default:
      return <AccountTabs />
  }
}
