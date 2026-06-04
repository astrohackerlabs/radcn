import * as React from "react"

function Slider({
  className,
  defaultValue,
  disabled,
  id,
  max = 100,
  min = 0,
  name,
  step = 1,
}: {
  className?: string
  defaultValue?: number
  disabled?: boolean
  id?: string
  max?: number
  min?: number
  name?: string
  step?: number
}) {
  let currentValue = defaultValue ?? min
  let percent = max <= min ? 0 : Math.max(0, Math.min(100, ((currentValue - min) / (max - min)) * 100))

  return (
    <span
      className={`reference-slider ${className ?? ""}`}
      data-disabled={disabled ? "true" : undefined}
      data-max={String(max)}
      data-min={String(min)}
      data-orientation="horizontal"
      data-step={String(step)}
      data-value={String(currentValue)}
      style={{ "--reference-slider-percent": `${percent}%` } as React.CSSProperties}
    >
      <input
        aria-label="Slider"
        className="reference-slider-input"
        defaultValue={currentValue}
        disabled={disabled}
        id={id}
        max={max}
        min={min}
        name={name}
        onInput={(event) => {
          let input = event.currentTarget
          let root = input.closest<HTMLElement>(".reference-slider")
          if (!root) return
          let nextPercent = max <= min ? 0 : Math.max(0, Math.min(100, ((Number(input.value) - min) / (max - min)) * 100))
          root.dataset.value = input.value
          root.style.setProperty("--reference-slider-percent", `${nextPercent}%`)
        }}
        step={step}
        type="range"
      />
      <span aria-hidden="true" className="reference-slider-track">
        <span className="reference-slider-range" />
      </span>
      <span aria-hidden="true" className="reference-slider-thumb" />
    </span>
  )
}

const formStyle = { display: "grid", gap: "12px", maxWidth: "360px" }
const buttonRowStyle = { display: "flex", gap: "12px" }

export function renderSliderFixture(scenario: string) {
  switch (scenario) {
    case "value":
      return (
        <div className="reference-field">
          <label className="reference-label" htmlFor="reference-slider-value">Volume</label>
          <Slider defaultValue={72} id="reference-slider-value" name="volume" />
        </div>
      )
    case "disabled":
      return (
        <div className="reference-field">
          <label className="reference-label" htmlFor="reference-slider-disabled">Locked volume</label>
          <Slider defaultValue={40} disabled id="reference-slider-disabled" name="volume" />
        </div>
      )
    case "step":
      return (
        <div className="reference-field">
          <label className="reference-label" htmlFor="reference-slider-step">Brightness</label>
          <Slider defaultValue={30} id="reference-slider-step" max={50} min={10} name="brightness" step={5} />
        </div>
      )
    case "custom-token":
      return (
        <div className="reference-field">
          <label className="reference-label" htmlFor="reference-slider-custom">Custom slider</label>
          <Slider className="reference-fixture-custom-slider" defaultValue={65} id="reference-slider-custom" name="custom" />
        </div>
      )
    case "form-submit-reset":
      return (
        <form action="/fixtures/slider/form-submit-reset" method="get" style={formStyle}>
          <div className="reference-field">
            <label className="reference-label" htmlFor="reference-slider-form">Volume</label>
            <Slider defaultValue={25} id="reference-slider-form" name="volume" />
          </div>
          <div style={buttonRowStyle}>
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    default:
      return (
        <div className="reference-field">
          <label className="reference-label" htmlFor="reference-slider-default">Volume</label>
          <Slider defaultValue={50} id="reference-slider-default" name="volume" />
        </div>
      )
  }
}
