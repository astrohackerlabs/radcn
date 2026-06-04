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
  | "spinner"
  | "switch"
  | "table"
  | "textarea"
  | "typography"

export interface FixtureScenario {
  component: FixtureComponent
  description: string
  id: string
  title: string
}
