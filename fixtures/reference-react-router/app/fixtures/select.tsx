import { cn } from "../lib/utils"

const baseItems = [
  ["react", "React"],
  ["remix", "Remix"],
  ["svelte", "Svelte"],
  ["vue", "Vue"],
] as const

function ReferenceSelect({
  children,
  className,
  disabled,
  invalid,
  open = true,
  placeholder = "Choose framework",
  selected = "remix",
  small,
  popper,
}: {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  invalid?: boolean
  open?: boolean
  placeholder?: string
  selected?: string
  small?: boolean
  popper?: boolean
}) {
  let selectedLabel = baseItems.find(([value]) => value === selected)?.[1] || ""
  if (!selectedLabel && selected === "alpha") selectedLabel = "Alpha"

  return (
    <div className="reference-select-root" data-invalid={invalid ? "true" : undefined}>
      <button
        aria-expanded={open ? "true" : "false"}
        aria-haspopup="listbox"
        className={cn("reference-select-trigger", className)}
        data-placeholder={selectedLabel ? "false" : "true"}
        data-size={small ? "sm" : "default"}
        data-state={open ? "open" : "closed"}
        disabled={disabled}
        role="combobox"
        type="button"
      >
        <span className="reference-select-value">{selectedLabel || placeholder}</span>
        <span aria-hidden="true" className="reference-select-icon">v</span>
      </button>
      {open && (
        <div className={cn("reference-select-content", className, popper && "reference-select-content--popper")} data-align={popper ? "end" : "start"} data-position={popper ? "popper" : "item-aligned"} data-side={popper ? "right" : "bottom"}>
          <div className="reference-select-scroll-button">^</div>
          <div className="reference-select-viewport" role="listbox">
            {children || baseItems.map(([value, label]) => (
              <div aria-selected={selected === value} className="reference-select-item" data-highlighted={selected === value ? "true" : "false"} data-selected={selected === value ? "true" : "false"} key={value} role="option">
                <span className="reference-select-indicator">{selected === value ? "✓" : ""}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="reference-select-scroll-button">v</div>
        </div>
      )}
    </div>
  )
}

function groupedItems(selected = "remix") {
  return (
    <>
      <div className="reference-select-group" role="group">
        <div className="reference-select-label">Libraries</div>
        {["React", "Remix"].map((label) => {
          let value = label.toLowerCase()
          return <div aria-selected={selected === value} className="reference-select-item" data-selected={selected === value ? "true" : "false"} key={value} role="option"><span className="reference-select-indicator">{selected === value ? "✓" : ""}</span><span>{label}</span></div>
        })}
      </div>
      <div className="reference-select-separator" role="separator" />
      <div className="reference-select-group" role="group">
        <div className="reference-select-label">Meta frameworks</div>
        <div aria-selected="false" className="reference-select-item" role="option"><span className="reference-select-indicator" /><span>Astro</span></div>
        <div aria-disabled="true" aria-selected="false" className="reference-select-item" data-disabled="true" role="option"><span className="reference-select-indicator" /><span>Beta disabled</span></div>
        <div aria-selected="false" className="reference-select-item" role="option"><span className="reference-select-indicator" /><span>SvelteKit</span></div>
      </div>
    </>
  )
}

function manyItems() {
  return Array.from({ length: 18 }, (_, index) => (
    <div aria-selected={index === 3} className="reference-select-item" data-selected={index === 3 ? "true" : "false"} key={index} role="option">
      <span className="reference-select-indicator">{index === 3 ? "✓" : ""}</span>
      <span>Option {index + 1}</span>
    </div>
  ))
}

function keyboardItems() {
  return (
    <>
      <div aria-selected="true" className="reference-select-item" data-highlighted="true" data-selected="true" role="option"><span className="reference-select-indicator">✓</span><span>Alpha</span></div>
      <div aria-disabled="true" aria-selected="false" className="reference-select-item" data-disabled="true" role="option"><span className="reference-select-indicator" /><span>Beta disabled</span></div>
      <div aria-selected="false" className="reference-select-item" role="option"><span className="reference-select-indicator" /><span>Gamma</span></div>
      <div aria-selected="false" className="reference-select-item" role="option"><span className="reference-select-indicator" /><span>Delta</span></div>
    </>
  )
}

export function renderSelectFixture(id: string) {
  switch (id) {
    case "placeholder":
      return <ReferenceSelect open={false} selected="" />
    case "groups":
      return <ReferenceSelect selected="remix">{groupedItems()}</ReferenceSelect>
    case "disabled-invalid":
      return <div className="grid gap-4"><ReferenceSelect disabled open={false} selected="react" /><ReferenceSelect invalid selected="" /></div>
    case "keyboard-typeahead":
      return <ReferenceSelect selected="alpha">{keyboardItems()}</ReferenceSelect>
    case "scrollable":
      return <ReferenceSelect selected="option-4">{manyItems()}</ReferenceSelect>
    case "popper-placement":
      return <div className="reference-select-edge"><ReferenceSelect popper selected="vue" /></div>
    case "form-submit-reset":
      return <ReferenceSelect selected="react" />
    case "custom-token":
      return <ReferenceSelect className="reference-fixture-custom-select" selected="svelte" />
    default:
      return <ReferenceSelect selected="remix" />
  }
}
