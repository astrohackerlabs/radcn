export type FixtureComponent =
  | "accordion"
  | "alert"
  | "aspect-ratio"
  | "badge"
  | "breadcrumb"
  | "button"
  | "button-group"
  | "card"
  | "checkbox"
  | "collapsible"
  | "empty"
  | "field"
  | "kbd"
  | "item"
  | "native-select"
  | "pagination"
  | "progress"
  | "radio-group"
  | "separator"
  | "skeleton"
  | "slider"
  | "spinner"
  | "switch"
  | "table"
  | "tabs"
  | "textarea"
  | "toggle"
  | "toggle-group"
  | "typography"

export interface FixtureScenario {
  component: FixtureComponent
  description: string
  id: string
  title: string
}
