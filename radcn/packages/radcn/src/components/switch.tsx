import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Switch surfaces as Tailwind utilities (Issue 6, Experiment 38). RadCN's
// native-input toggle: the wrapper styles itself from the input's :checked /
// :focus-visible via has-[:checked]:/has-[:focus-visible]: variants reading the
// --radcn-control-* tokens. The base/input/state rules were SHARED with Checkbox
// + RadioGroup (split in tokens.css, keeping those); the knob's size + slide
// stay bespoke parent-state->child rules keyed on the data attributes.
const switchWrapperClass =
  'relative inline-flex shrink-0 items-center justify-start w-9 h-5 rounded-[999px] border border-[var(--radcn-control-border,var(--radcn-input))] bg-[var(--radcn-control-bg,var(--radcn-background))] text-[var(--radcn-control-fg,var(--radcn-primary-foreground))] p-0.5 outline-none transition-[border-color,background-color,box-shadow] has-[:focus-visible]:border-[var(--radcn-ring)] has-[:focus-visible]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] has-[:checked]:border-[var(--radcn-control-checked-bg,var(--radcn-primary))] has-[:checked]:bg-[var(--radcn-control-checked-bg,var(--radcn-primary))] data-[invalid=true]:border-[var(--radcn-control-invalid,var(--radcn-destructive))] data-[invalid=true]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-control-invalid,var(--radcn-destructive))_20%,transparent)] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50'
const switchSizeClass: Record<SwitchSize, string> = {
  default: '',
  sm: 'w-8 h-4',
}
const switchInputClass = 'absolute inset-0 m-0 opacity-0 cursor-pointer'
const switchThumbClass =
  'w-3.5 h-3.5 rounded-[999px] bg-[var(--radcn-switch-thumb-bg,var(--radcn-background))] shadow-[0_1px_2px_rgb(0_0_0_/_0.18)] pointer-events-none transition-transform'

export type SwitchSize = 'default' | 'sm'

export interface SwitchProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  checked?: boolean
  class?: string
  disabled?: boolean
  id?: string
  name?: string
  required?: boolean
  size?: SwitchSize
  style?: string
  value?: string
}

function switchState(input: HTMLInputElement) {
  return input.checked ? 'checked' : 'unchecked'
}

function syncSwitch(root: HTMLElement, input: HTMLInputElement) {
  let state = switchState(input)
  root.dataset.state = state
  input.dataset.state = state
}

function setupSwitch(root: HTMLElement) {
  if (root.dataset.radcnSwitchReady === 'true') return

  let input = root.querySelector<HTMLInputElement>('[data-radcn-switch-input]')
  if (!input) return

  syncSwitch(root, input)
  root.dataset.radcnSwitchReady = 'true'

  input.addEventListener('input', () => syncSwitch(root, input))
  input.addEventListener('change', () => syncSwitch(root, input))
  input.form?.addEventListener('reset', () => {
    requestAnimationFrame(() => syncSwitch(root, input))
  })
}

export function enhanceSwitch(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-switch-wrapper]').forEach(setupSwitch)
}

export function Switch(handle: Handle<SwitchProps>) {
  return () => {
    let {
      ariaDescribedBy,
      ariaInvalid,
      checked,
      class: className,
      disabled,
      id,
      name,
      required,
      size = 'default',
      style,
      value = 'on',
    } = handle.props
    let state = checked ? 'checked' : 'unchecked'

    return (
      <span
        class={classes(switchWrapperClass, switchSizeClass[size], className)}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={ariaInvalid ? 'true' : undefined}
        data-radcn-switch-wrapper
        data-size={size}
        data-state={state}
        style={style}
      >
        <input
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid ? 'true' : undefined}
          checked={checked}
          class={switchInputClass}
          data-radcn-switch-input
          data-size={size}
          data-state={state}
          disabled={disabled}
          id={id}
          name={name}
          required={required}
          role="switch"
          type="checkbox"
          value={value}
        />
        <span aria-hidden="true" class={switchThumbClass} data-radcn-switch-thumb />
      </span>
    )
  }
}
