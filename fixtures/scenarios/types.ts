export type FixtureComponent = "button" | "field" | "textarea" | "accordion"

export interface FixtureScenario {
  component: FixtureComponent
  description: string
  id: string
  title: string
}
