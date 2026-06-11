import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Tailwind utility classes copied verbatim from shadcn/ui v4
// (registry/new-york-v4/ui/textarea.tsx). See Issue 6, Experiment 18.
const textareaClass =
  'flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40'

export interface TextareaProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  class?: string
  disabled?: boolean
  id?: string
  name?: string
  placeholder?: string
  required?: boolean
  rows?: number
  style?: string
  value?: string
}

export function Textarea(handle: Handle<TextareaProps>) {
  return () => {
    let {
      ariaDescribedBy,
      ariaInvalid,
      class: className,
      disabled,
      id,
      name,
      placeholder,
      required,
      rows,
      style,
      value,
    } = handle.props

    return (
      <textarea
        class={classes(textareaClass, className)}
        data-radcn-textarea
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={style}
        value={value}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid ? 'true' : undefined}
      />
    )
  }
}
