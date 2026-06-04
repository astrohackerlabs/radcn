import { cn } from "../lib/utils"

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  )
}

function Field({
  children,
  description,
  error,
  label,
}: {
  children: React.ReactNode
  description?: string
  error?: string
  label: string
}) {
  return (
    <div className="grid max-w-sm gap-2">
      <label className="text-sm font-medium leading-none" htmlFor="fixture-input">
        {label}
      </label>
      {children}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {error && (
        <p className="text-sm font-medium text-destructive" id="fixture-input-error">
          {error}
        </p>
      )}
    </div>
  )
}

export function renderFieldFixture(scenario: string) {
  switch (scenario) {
    case "input-invalid":
      return (
        <Field label="Email" error="Enter a valid email address.">
          <Input
            id="fixture-input"
            name="email"
            defaultValue="not-an-email"
            aria-invalid="true"
            aria-describedby="fixture-input-error"
          />
        </Field>
      )
    case "input-disabled":
      return (
        <Field label="Email" description="This field is disabled for the fixture.">
          <Input id="fixture-input" name="email" defaultValue="disabled@example.com" disabled />
        </Field>
      )
    case "required":
      return (
        <Field label="Email" description="Required email address.">
          <Input id="fixture-input" name="email" placeholder="name@example.com" required />
        </Field>
      )
    case "custom-error-token":
      return (
        <div className="reference-fixture-custom-field">
          <Field label="Email" error="Custom token error color.">
            <Input
              id="fixture-input"
              name="email"
              defaultValue="not-an-email"
              aria-invalid="true"
              aria-describedby="fixture-input-error"
            />
          </Field>
        </div>
      )
    default:
      return (
        <Field label="Email" description="Use a stable test email address.">
          <Input id="fixture-input" name="email" placeholder="name@example.com" />
        </Field>
      )
  }
}
