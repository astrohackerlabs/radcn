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
    component: "breadcrumb",
    id: "default",
    title: "Default Breadcrumb",
    description: "Breadcrumb navigation with current page semantics.",
  },
  {
    component: "breadcrumb",
    id: "collapsed",
    title: "Collapsed Breadcrumb",
    description: "Breadcrumb navigation with ellipsis.",
  },
  {
    component: "breadcrumb",
    id: "custom-separator",
    title: "Custom Breadcrumb Separator",
    description: "Breadcrumb using author-supplied separators and color hooks.",
  },
  {
    component: "button-group",
    id: "horizontal",
    title: "Horizontal Button Group",
    description: "Grouped buttons in horizontal orientation.",
  },
  {
    component: "button-group",
    id: "vertical",
    title: "Vertical Button Group",
    description: "Grouped buttons in vertical orientation.",
  },
  {
    component: "button-group",
    id: "with-separator",
    title: "Button Group Separator",
    description: "Button group text and separator part hooks.",
  },
  {
    component: "item",
    id: "default",
    title: "Default Item",
    description: "Item composition with media, title, description, and action.",
  },
  {
    component: "item",
    id: "variants",
    title: "Item Variants",
    description: "Item variant, size, and media hooks.",
  },
  {
    component: "item",
    id: "grouped",
    title: "Grouped Items",
    description: "Item group with header, footer, and separator hooks.",
  },
  {
    component: "pagination",
    id: "default",
    title: "Default Pagination",
    description: "Pagination navigation with previous, pages, ellipsis, and next.",
  },
  {
    component: "pagination",
    id: "active",
    title: "Active Pagination",
    description: "Pagination active page semantics.",
  },
  {
    component: "pagination",
    id: "custom-labels",
    title: "Custom Pagination Labels",
    description: "Pagination previous and next links with custom labels.",
  },
  {
    component: "table",
    id: "default",
    title: "Default Table",
    description: "Semantic table with caption, head, body, rows, and cells.",
  },
  {
    component: "table",
    id: "dense",
    title: "Dense Table",
    description: "Dense table spacing hook.",
  },
  {
    component: "table",
    id: "footer",
    title: "Table Footer",
    description: "Semantic table footer.",
  },
  {
    component: "typography",
    id: "article",
    title: "Typography Article",
    description: "Article typography recipe with headings, paragraph, list, and quote.",
  },
  {
    component: "typography",
    id: "inline",
    title: "Inline Typography",
    description: "Inline code, lead, large, small, and muted text.",
  },
  {
    component: "typography",
    id: "custom-token",
    title: "Custom Typography Token",
    description: "Typography recipe customized through public CSS variables.",
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
