import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type InputType = 'text' | 'email' | 'file' | 'password' | 'tel' | 'url'

// Tailwind utility classes copied verbatim from shadcn/ui v4
// (registry/new-york-v4/ui/input.tsx, the three concatenated cn args). See
// Issue 6, Experiment 18. border-input resolves via the theme contract; the
// --border base (Exp 16) is overridden by border-input.
const inputClass =
  'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'

export interface InputProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  class?: string
  disabled?: boolean
  id?: string
  name?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  style?: string
  type?: InputType
  value?: string
}

export function Input(handle: Handle<InputProps>) {
  return () => {
    let {
      ariaDescribedBy,
      ariaInvalid,
      class: className,
      disabled,
      id,
      name,
      placeholder,
      readOnly,
      required,
      style,
      type = 'text',
      value,
    } = handle.props
    let sharedProps = {
      class: classes(inputClass, className),
      'data-radcn-input': true,
      id,
      name,
      placeholder,
      readonly: readOnly,
      required,
      disabled,
      style,
      value,
      'aria-describedby': ariaDescribedBy,
    }

    if (type === 'file' || type === 'password') {
      return <input {...sharedProps} type={type} aria-invalid={ariaInvalid ? 'true' : undefined} />
    }

    return (
      <input
        {...sharedProps}
        aria-invalid={ariaInvalid ? 'true' : undefined}
        role="textbox"
        type={type}
      />
    )
  }
}
