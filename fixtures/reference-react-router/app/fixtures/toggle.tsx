import * as React from "react"

type ToggleGroupOrientation = "horizontal" | "vertical"
type ToggleGroupType = "single" | "multiple"
type ToggleSize = "default" | "sm" | "lg"
type ToggleVariant = "default" | "outline"

function Toggle({
  children,
  className,
  disabled,
  pressed,
  size = "default",
  variant = "default",
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  pressed?: boolean
  size?: ToggleSize
  variant?: ToggleVariant
}) {
  let [isPressed, setPressed] = React.useState(Boolean(pressed))

  return (
    <button
      aria-disabled={disabled || undefined}
      aria-pressed={isPressed}
      className={`reference-toggle reference-toggle--${variant} reference-toggle--${size} ${className ?? ""}`}
      data-disabled={disabled ? "true" : undefined}
      data-state={isPressed ? "on" : "off"}
      data-variant={variant}
      disabled={disabled}
      onClick={() => setPressed((value) => !value)}
      type="button"
    >
      {children}
    </button>
  )
}

function ToggleGroup({
  children,
  className,
  defaultValue,
  orientation = "horizontal",
  type = "single",
}: {
  children: React.ReactNode
  className?: string
  defaultValue?: string | string[]
  orientation?: ToggleGroupOrientation
  type?: ToggleGroupType
}) {
  let initial = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  let [values, setValues] = React.useState(new Set(initial))
  let itemsRef = React.useRef<Array<HTMLButtonElement | null>>([])

  function enabledItems() {
    return itemsRef.current.filter((item): item is HTMLButtonElement => Boolean(item && !item.disabled))
  }

  function toggleValue(value: string) {
    setValues((current) => {
      let next = new Set(current)
      if (type === "single") {
        if (next.has(value)) next.clear()
        else {
          next.clear()
          next.add(value)
        }
      } else if (next.has(value)) {
        next.delete(value)
      } else {
        next.add(value)
      }
      return next
    })
  }

  function move(current: HTMLButtonElement, direction: number | "first" | "last") {
    let enabled = enabledItems()
    let index = enabled.indexOf(current)
    if (index === -1) return
    let nextIndex = direction === "first" ? 0 : direction === "last" ? enabled.length - 1 : (index + direction + enabled.length) % enabled.length
    enabled[nextIndex].focus()
  }

  return (
    <div
      className={`reference-toggle-group reference-toggle-group--${orientation} ${className ?? ""}`}
      data-default-value={initial.join(" ")}
      data-orientation={orientation}
      data-type={type}
      data-value={Array.from(values).join(" ")}
      role="group"
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child as React.ReactElement<any>, {
          index,
          move,
          orientation,
          pressed: values.has((child.props as { value: string }).value),
          toggleValue,
          itemsRef,
        })
      })}
    </div>
  )
}

function ToggleGroupItem({
  children,
  disabled,
  index = 0,
  itemsRef,
  move,
  orientation = "horizontal",
  pressed,
  size = "default",
  toggleValue,
  value,
  variant = "default",
}: {
  children: React.ReactNode
  disabled?: boolean
  index?: number
  itemsRef?: React.MutableRefObject<Array<HTMLButtonElement | null>>
  move?: (current: HTMLButtonElement, direction: number | "first" | "last") => void
  orientation?: ToggleGroupOrientation
  pressed?: boolean
  size?: ToggleSize
  toggleValue?: (value: string) => void
  value: string
  variant?: ToggleVariant
}) {
  return (
    <button
      aria-disabled={disabled || undefined}
      aria-pressed={Boolean(pressed)}
      className={`reference-toggle reference-toggle-group-item reference-toggle--${variant} reference-toggle--${size}`}
      data-disabled={disabled ? "true" : undefined}
      data-state={pressed ? "on" : "off"}
      data-value={value}
      data-variant={variant}
      disabled={disabled}
      onClick={() => toggleValue?.(value)}
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
            toggleValue?.(value)
            break
          default:
            handled = false
        }
        if (handled) event.preventDefault()
      }}
      ref={(node) => {
        if (itemsRef) itemsRef.current[index] = node
      }}
      tabIndex={index === 0 && !disabled ? 0 : -1}
      type="button"
    >
      {children}
    </button>
  )
}

const row = { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" as const }

export function renderToggleFixture(scenario: string) {
  switch (scenario) {
    case "pressed":
      return <Toggle pressed>Bold</Toggle>
    case "disabled":
      return <Toggle disabled>Muted</Toggle>
    case "variants-sizes":
      return (
        <div style={row}>
          <Toggle size="sm">Small</Toggle>
          <Toggle variant="outline">Outline</Toggle>
          <Toggle size="lg" pressed>
            Large
          </Toggle>
        </div>
      )
    case "custom-token":
      return (
        <Toggle className="reference-fixture-custom-toggle" pressed variant="outline">
          Custom
        </Toggle>
      )
    default:
      return <Toggle>Bold</Toggle>
  }
}

export function renderToggleGroupFixture(scenario: string) {
  switch (scenario) {
    case "multiple":
      return (
        <ToggleGroup defaultValue={["bold", "underline"]} type="multiple">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
    case "disabled":
      return (
        <ToggleGroup defaultValue="bold" type="single">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem disabled value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
    case "vertical":
      return (
        <ToggleGroup defaultValue="italic" orientation="vertical" type="single">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
    case "custom-token":
      return (
        <ToggleGroup className="reference-fixture-custom-toggle-group" defaultValue="underline" type="single">
          <ToggleGroupItem value="bold" variant="outline">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic" variant="outline">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline" variant="outline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
    default:
      return (
        <ToggleGroup defaultValue="bold" type="single">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      )
  }
}
