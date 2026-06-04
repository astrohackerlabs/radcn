export type FixtureComponent =
  | "accordion"
  | "alert"
  | "aspect-ratio"
  | "badge"
  | "button"
  | "card"
  | "empty"
  | "field"
  | "kbd"
  | "separator"
  | "skeleton"
  | "spinner"
  | "textarea"

export interface FixtureScenario {
  component: FixtureComponent
  description: string
  id: string
  title: string
}
