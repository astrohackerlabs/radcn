export type FixtureComponent =
  | "accordion"
  | "alert"
  | "aspect-ratio"
  | "badge"
  | "breadcrumb"
  | "button"
  | "button-group"
  | "card"
  | "empty"
  | "field"
  | "kbd"
  | "item"
  | "native-select"
  | "pagination"
  | "separator"
  | "skeleton"
  | "spinner"
  | "table"
  | "textarea"
  | "typography"

export interface FixtureScenario {
  component: FixtureComponent
  description: string
  id: string
  title: string
}
