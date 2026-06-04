import type { FixtureComponent, FixtureScenario } from "./types.ts"

export const fixtureScenarios: FixtureScenario[] = [
  {
    component: "button",
    id: "default",
    title: "Default Button",
    description: "Primary button in its default interactive state.",
  },
  {
    component: "button",
    id: "variants",
    title: "Button Variants",
    description: "Primary, secondary, outline, ghost, and destructive button variants.",
  },
  {
    component: "button",
    id: "disabled",
    title: "Disabled Button",
    description: "Disabled button state and focus behavior.",
  },
  {
    component: "button",
    id: "as-child-or-link",
    title: "Button Link",
    description: "Button styling applied to a link-like action.",
  },
  {
    component: "button",
    id: "sizes",
    title: "Button Sizes",
    description: "Small, default, large, and icon-sized buttons.",
  },
  {
    component: "button",
    id: "custom-class",
    title: "Custom Button Class",
    description: "Author styling applied through the public class hook.",
  },
  {
    component: "button",
    id: "form-submit",
    title: "Button Form Behavior",
    description: "Native submit and reset behavior with RadCN buttons.",
  },
  {
    component: "field",
    id: "input-default",
    title: "Default Input Field",
    description: "Label, input, and description in a normal form field.",
  },
  {
    component: "field",
    id: "input-invalid",
    title: "Invalid Input Field",
    description: "Invalid input state with error message and ARIA wiring.",
  },
  {
    component: "field",
    id: "input-disabled",
    title: "Disabled Input Field",
    description: "Disabled input with label and helper text.",
  },
  {
    component: "field",
    id: "required",
    title: "Required Input Field",
    description: "Required input field with native required semantics.",
  },
  {
    component: "field",
    id: "custom-error-token",
    title: "Custom Field Error Token",
    description: "Field error styling customized through a RadCN CSS variable.",
  },
  {
    component: "textarea",
    id: "default",
    title: "Default Textarea",
    description: "Native textarea with label and description.",
  },
  {
    component: "textarea",
    id: "disabled",
    title: "Disabled Textarea",
    description: "Disabled textarea state with helper text.",
  },
  {
    component: "alert",
    id: "default",
    title: "Default Alert",
    description: "Default status message with title, description, and action.",
  },
  {
    component: "alert",
    id: "destructive",
    title: "Destructive Alert",
    description: "Destructive alert variant for important errors.",
  },
  {
    component: "alert",
    id: "custom-token",
    title: "Custom Alert Token",
    description: "Alert colors customized through public CSS variables.",
  },
  {
    component: "aspect-ratio",
    id: "default",
    title: "Default Aspect Ratio",
    description: "Media container using a 16 by 9 ratio.",
  },
  {
    component: "aspect-ratio",
    id: "custom-ratio",
    title: "Custom Aspect Ratio",
    description: "Media container using a square ratio.",
  },
  {
    component: "badge",
    id: "variants",
    title: "Badge Variants",
    description: "Default, secondary, destructive, outline, ghost, and link badges.",
  },
  {
    component: "badge",
    id: "custom-class",
    title: "Custom Badge Class",
    description: "Badge styling customized through a public class hook.",
  },
  {
    component: "card",
    id: "default",
    title: "Default Card",
    description: "Card with header, action, content, and footer slots.",
  },
  {
    component: "card",
    id: "compact",
    title: "Compact Card",
    description: "Small card size with denser spacing.",
  },
  {
    component: "card",
    id: "custom-token",
    title: "Custom Card Token",
    description: "Card border and background customized with CSS variables.",
  },
  {
    component: "empty",
    id: "default",
    title: "Default Empty State",
    description: "Empty state with media, title, description, and action content.",
  },
  {
    component: "empty",
    id: "icon",
    title: "Icon Empty State",
    description: "Empty state using the icon media variant.",
  },
  {
    component: "kbd",
    id: "default",
    title: "Keyboard Shortcut",
    description: "Keyboard shortcut rendered with semantic kbd elements.",
  },
  {
    component: "separator",
    id: "orientations",
    title: "Separator Orientations",
    description: "Horizontal and vertical separator semantics.",
  },
  {
    component: "skeleton",
    id: "default",
    title: "Skeleton Placeholder",
    description: "Loading placeholder blocks.",
  },
  {
    component: "spinner",
    id: "default",
    title: "Default Spinner",
    description: "Accessible loading spinner.",
  },
  {
    component: "spinner",
    id: "custom-size",
    title: "Custom Spinner Size",
    description: "Spinner size customized through a public class hook.",
  },
  {
    component: "accordion",
    id: "single",
    title: "Single Accordion",
    description: "Single-item open state with collapsible behavior.",
  },
  {
    component: "accordion",
    id: "multiple",
    title: "Multiple Accordion",
    description: "Multiple accordion sections open at once.",
  },
  {
    component: "accordion",
    id: "disabled-item",
    title: "Disabled Accordion Item",
    description: "Accordion with one disabled trigger item.",
  },
]

export function getFixtureScenario(
  component: string | undefined,
  scenario: string | undefined,
): FixtureScenario | undefined {
  return fixtureScenarios.find((item) => item.component === component && item.id === scenario)
}

export function getComponentScenarios(component: string | undefined): FixtureScenario[] {
  return fixtureScenarios.filter((item) => item.component === component)
}

export const fixtureComponents: FixtureComponent[] = Array.from(
  new Set(fixtureScenarios.map((item) => item.component)),
)
