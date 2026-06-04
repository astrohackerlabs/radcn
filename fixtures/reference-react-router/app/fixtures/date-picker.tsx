import { renderCalendarFixture } from "./calendar"

export function renderDatePickerFixture(id: string) {
  let selected = id === "default" || id === "disabled" ? "" : "2026-06-12"
  return (
    <div className={id === "custom-token" ? "reference-date-picker reference-fixture-custom-date-picker" : "reference-date-picker"} data-value={selected}>
      {id === "form-submit-reset" && <input name="date" type="hidden" value={selected} readOnly />}
      <button disabled={id === "disabled"}>{selected || "Pick a date"}</button>
      {(id === "popover" || id === "custom-token") && <div className="reference-date-picker-popover">{renderCalendarFixture("selected")}</div>}
    </div>
  )
}
