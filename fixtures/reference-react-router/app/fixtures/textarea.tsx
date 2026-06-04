import { cn } from "../lib/utils"

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  )
}

function Field({
  children,
  description,
  label,
}: {
  children: React.ReactNode
  description?: string
  label: string
}) {
  return (
    <div className="grid max-w-sm gap-2">
      <label className="text-sm font-medium leading-none" htmlFor="fixture-textarea">
        {label}
      </label>
      {children}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}

export function renderTextareaFixture(scenario: string) {
  switch (scenario) {
    case "disabled":
      return (
        <Field label="Message" description="This textarea is disabled for the fixture.">
          <Textarea
            id="fixture-textarea"
            name="message"
            defaultValue="Disabled textarea content"
            disabled
          />
        </Field>
      )
    default:
      return (
        <Field label="Message" description="Use a stable message for the fixture.">
          <Textarea id="fixture-textarea" name="message" placeholder="Write a message" />
        </Field>
      )
  }
}
