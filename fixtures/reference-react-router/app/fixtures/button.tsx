import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const buttonVariants = cva(
  "inline-flex h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({ asChild, className, variant, ...props }: ButtonProps) {
  let Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />
}

export function renderButtonFixture(scenario: string) {
  switch (scenario) {
    case "variants":
      return (
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      )
    case "disabled":
      return (
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled outline
          </Button>
        </div>
      )
    case "as-child-or-link":
      return (
        <Button asChild>
          <a href="/fixtures/button/default">Link styled as button</a>
        </Button>
      )
    case "sizes":
      return (
        <div className="flex flex-wrap items-center gap-3">
          <Button className="h-8 px-3 text-xs">Small</Button>
          <Button>Default</Button>
          <Button className="h-11 px-5 text-base">Large</Button>
          <Button aria-disabled="true" className="size-9 px-0">
            +
          </Button>
        </div>
      )
    case "custom-class":
      return <Button className="reference-fixture-custom-button">Custom Button</Button>
    case "form-submit":
      return (
        <form action="/fixtures/button/form-submit" className="grid max-w-sm gap-3" method="get">
          <label htmlFor="reference-button-form-value">Value</label>
          <input
            className="h-9 rounded-md border border-input px-3 text-sm"
            defaultValue="initial"
            id="reference-button-form-value"
            name="value"
          />
          <div className="flex gap-3">
            <Button name="intent" type="submit" value="submit">
              Submit
            </Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </div>
        </form>
      )
    default:
      return <Button>Default button</Button>
  }
}
