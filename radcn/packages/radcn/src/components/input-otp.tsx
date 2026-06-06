import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export const REGEXP_ONLY_DIGITS = '[0-9]*'
export const REGEXP_ONLY_DIGITS_AND_CHARS = '[0-9A-Za-z]*'

export interface InputOTPProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  ariaLabel?: string
  ariaLabelledby?: string
  children?: RemixNode
  class?: string
  containerClass?: string
  defaultValue?: string
  disabled?: boolean
  id?: string
  maxLength: number
  name?: string
  pattern?: string
  placeholder?: string
  required?: boolean
  style?: string
  value?: string
}

export interface InputOTPGroupProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface InputOTPSlotProps {
  class?: string
  index: number
  style?: string
}

export interface InputOTPSeparatorProps {
  children?: RemixNode
  class?: string
  style?: string
}

function initialValue(value: string | undefined, defaultValue: string | undefined, maxLength: number) {
  return (value ?? defaultValue ?? '').slice(0, Math.max(0, maxLength))
}

function acceptsCharacter(character: string, pattern: string | undefined) {
  if (!pattern) return true
  if (pattern === REGEXP_ONLY_DIGITS_AND_CHARS || pattern.includes('A-Za-z')) return /^[0-9A-Za-z]$/.test(character)
  if (pattern === REGEXP_ONLY_DIGITS || pattern.includes('0-9') || pattern.includes('\\d')) return /^[0-9]$/.test(character)
  try {
    return new RegExp(`^(?:${pattern})$`).test(character)
  } catch {
    return true
  }
}

function filteredValue(value: string, pattern: string | undefined, maxLength: number) {
  return Array.from(value)
    .filter((character) => acceptsCharacter(character, pattern))
    .join('')
    .slice(0, Math.max(0, maxLength))
}

function setupInputOTP(root: HTMLElement) {
  if (root.dataset.radcnInputOtpReady === 'true') return
  let input = root.querySelector<HTMLInputElement>('[data-radcn-input-otp-input]')
  if (!input) return
  let inputElement = input
  let slots = Array.from(root.querySelectorAll<HTMLElement>('[data-radcn-input-otp-slot]'))
  let maxLength = Number(inputElement.maxLength > 0 ? inputElement.maxLength : root.dataset.maxLength || slots.length)
  let pattern = inputElement.getAttribute('pattern') || undefined

  function activeIndex() {
    let position = inputElement.selectionStart ?? inputElement.value.length
    return Math.max(0, Math.min(position, Math.max(0, maxLength - 1)))
  }

  function applyValue(nextValue: string, nextSelection = activeIndex()) {
    let accepted = filteredValue(nextValue, pattern, maxLength)
    inputElement.value = accepted
    inputElement.dataset.value = accepted
    root.dataset.value = accepted
    root.dataset.complete = accepted.length >= maxLength ? 'true' : 'false'
    root.dataset.empty = accepted.length === 0 ? 'true' : 'false'
    let active = Math.max(0, Math.min(nextSelection, Math.max(0, maxLength - 1)))

    for (let slotIndex = 0; slotIndex < slots.length; slotIndex += 1) {
      let slot = slots[slotIndex]
      let character = accepted[slotIndex] || ''
      slot.dataset.char = character
      slot.dataset.filled = character ? 'true' : 'false'
      slot.dataset.active = !inputElement.disabled && document.activeElement === inputElement && slotIndex === active ? 'true' : 'false'
      slot.textContent = character || slot.dataset.placeholder || ''
      if (!character && slot.dataset.active === 'true') {
        let caret = document.createElement('span')
        caret.className = 'radcn-input-otp-caret'
        caret.dataset.radcnInputOtpCaret = ''
        slot.appendChild(caret)
      }
    }

    root.dispatchEvent(new CustomEvent('radcn-input-otp-change', { bubbles: true, detail: { value: accepted } }))
  }

  function syncFromInput() {
    let selection = activeIndex()
    applyValue(inputElement.value, selection)
    inputElement.setSelectionRange(Math.min(selection, inputElement.value.length), Math.min(selection, inputElement.value.length))
  }

  inputElement.addEventListener('input', syncFromInput)
  inputElement.addEventListener('focus', syncFromInput)
  inputElement.addEventListener('blur', syncFromInput)
  inputElement.addEventListener('paste', (event) => {
    let text = event.clipboardData?.getData('text') || ''
    if (!text) return
    event.preventDefault()
    let start = inputElement.selectionStart ?? inputElement.value.length
    let end = inputElement.selectionEnd ?? start
    let next = `${inputElement.value.slice(0, start)}${text}${inputElement.value.slice(end)}`
    let inserted = filteredValue(text, pattern, maxLength).length
    applyValue(next, Math.min(start + inserted, maxLength))
    inputElement.setSelectionRange(Math.min(start + inserted, inputElement.value.length), Math.min(start + inserted, inputElement.value.length))
  })
  inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Home') {
      inputElement.setSelectionRange(0, 0)
      window.requestAnimationFrame(syncFromInput)
    } else if (event.key === 'End') {
      let end = inputElement.value.length
      inputElement.setSelectionRange(end, end)
      window.requestAnimationFrame(syncFromInput)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Backspace' || event.key === 'Delete') {
      window.requestAnimationFrame(syncFromInput)
    }
  })
  slots.forEach((slot) => {
    slot.addEventListener('click', () => {
      let index = Number(slot.dataset.index || '0')
      inputElement.focus()
      let position = Math.max(0, Math.min(index, inputElement.value.length))
      inputElement.setSelectionRange(position, position)
      syncFromInput()
    })
  })
  inputElement.form?.addEventListener('reset', () => {
    window.requestAnimationFrame(() => {
      let next = input.getAttribute('value') || root.dataset.defaultValue || ''
      applyValue(next, Math.min(next.length, maxLength))
    })
  })

  applyValue(inputElement.value || root.dataset.defaultValue || '', Math.min(inputElement.value.length, maxLength))
  root.dataset.radcnInputOtpReady = 'true'
}

export function enhanceInputOTP(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-input-otp]').forEach(setupInputOTP)
}

export function InputOTP(handle: Handle<InputOTPProps>) {
  return () => {
    let {
      ariaDescribedBy,
      ariaInvalid,
      ariaLabel,
      ariaLabelledby,
      children,
      class: className,
      containerClass,
      defaultValue,
      disabled,
      id,
      maxLength,
      name,
      pattern,
      placeholder = '',
      required,
      style,
      value,
    } = handle.props
    let currentValue = initialValue(value, defaultValue, maxLength)

    return (
      <div
        class={classes('radcn-input-otp', containerClass)}
        data-complete={currentValue.length >= maxLength ? 'true' : 'false'}
        data-default-value={currentValue}
        data-disabled={disabled ? 'true' : undefined}
        data-empty={currentValue.length === 0 ? 'true' : 'false'}
        data-invalid={ariaInvalid ? 'true' : undefined}
        data-max-length={maxLength}
        data-radcn-input-otp
        data-value={currentValue}
        style={style}
      >
        <input
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid ? 'true' : undefined}
          aria-label={ariaLabelledby ? undefined : ariaLabel}
          aria-labelledby={ariaLabelledby}
          autocomplete="one-time-code"
          class={classes('radcn-input-otp-input', className)}
          data-radcn-input-otp-input
          disabled={disabled}
          id={id}
          inputMode={pattern === REGEXP_ONLY_DIGITS ? 'numeric' : 'text'}
          maxLength={maxLength}
          name={name}
          pattern={pattern}
          placeholder={placeholder}
          required={required}
          spellcheck={false}
          type="text"
          value={currentValue}
        />
        <div class="radcn-input-otp-slots" data-radcn-input-otp-slots>
          {children}
        </div>
      </div>
    )
  }
}

export function InputOTPGroup(handle: Handle<InputOTPGroupProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-input-otp-group', className)} data-radcn-input-otp-group style={style}>
        {children}
      </div>
    )
  }
}

export function InputOTPSlot(handle: Handle<InputOTPSlotProps>) {
  return () => {
    let { class: className, index, style } = handle.props

    return (
      <div
        aria-hidden="true"
        class={classes('radcn-input-otp-slot', className)}
        data-active="false"
        data-char=""
        data-filled="false"
        data-index={index}
        data-radcn-input-otp-slot
        style={style}
      />
    )
  }
}

export function InputOTPSeparator(handle: Handle<InputOTPSeparatorProps>) {
  return () => {
    let { children = '-', class: className, style } = handle.props

    return (
      <div class={classes('radcn-input-otp-separator', className)} data-radcn-input-otp-separator role="separator" style={style}>
        {children}
      </div>
    )
  }
}
