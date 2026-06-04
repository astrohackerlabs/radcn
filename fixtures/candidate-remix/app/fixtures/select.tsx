import type { FixtureScenario } from '../../../scenarios/types.ts'
import type { RemixNode } from 'remix/ui'
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radcn'

const baseItems = [
  ['react', 'React'],
  ['remix', 'Remix'],
  ['svelte', 'Svelte'],
  ['vue', 'Vue'],
] as const

function SelectShell({
  children,
  className,
  defaultOpen,
  defaultValue,
  disabled,
  id = 'candidate-select',
  invalid,
  name = 'framework',
  placeholder = 'Choose framework',
  position = 'item-aligned',
  required,
  side = 'bottom',
  align = 'start',
}: {
  align?: 'start' | 'center' | 'end'
  children?: RemixNode
  className?: string
  defaultOpen?: boolean
  defaultValue?: string
  disabled?: boolean
  id?: string
  invalid?: boolean
  name?: string
  placeholder?: string
  position?: 'item-aligned' | 'popper'
  required?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  return (
    <div style="display:grid;gap:8px;max-width:360px">
      <Label for={`${id}-trigger`} disabled={disabled}>Framework</Label>
      <Select defaultOpen={defaultOpen} defaultValue={defaultValue} disabled={disabled} id={id} invalid={invalid} name={name} required={required}>
        <SelectTrigger ariaLabel="Framework" class={className} id={`${id}-trigger`} size={id.includes('small') ? 'sm' : 'default'}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent align={align} class={className} position={position} side={side}>
            <SelectScrollUpButton />
            <SelectViewport>{children || baseItems.map(([value, label]) => <SelectItem textValue={label} value={value}>{label}</SelectItem>)}</SelectViewport>
            <SelectScrollDownButton />
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  )
}

function groupedItems() {
  return (
    <>
      <SelectGroup>
        <SelectLabel>Libraries</SelectLabel>
        <SelectItem textValue="React" value="react">React</SelectItem>
        <SelectItem textValue="Remix" value="remix">Remix</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Meta frameworks</SelectLabel>
        <SelectItem textValue="Astro" value="astro">Astro</SelectItem>
        <SelectItem disabled textValue="Beta disabled" value="beta">Beta disabled</SelectItem>
        <SelectItem textValue="SvelteKit" value="sveltekit">SvelteKit</SelectItem>
      </SelectGroup>
    </>
  )
}

function manyItems() {
  return Array.from({ length: 18 }, (_, index) => {
    let value = `option-${index + 1}`
    return <SelectItem textValue={`Option ${index + 1}`} value={value}>Option {index + 1}</SelectItem>
  })
}

export function renderSelectFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'placeholder':
      return SelectShell({ id: 'candidate-select-placeholder', placeholder: 'Choose framework' })
    case 'groups':
      return SelectShell({ children: groupedItems(), defaultOpen: true, defaultValue: 'remix', id: 'candidate-select-groups' })
    case 'disabled-invalid':
      return (
        <div style="display:grid;gap:18px">
          {SelectShell({ defaultValue: 'react', disabled: true, id: 'candidate-select-disabled' })}
          {SelectShell({ defaultValue: '', id: 'candidate-select-invalid', invalid: true, required: true })}
        </div>
      )
    case 'keyboard-typeahead':
      return SelectShell({
        children: (
          <>
            <SelectItem textValue="Alpha" value="alpha">Alpha</SelectItem>
            <SelectItem disabled textValue="Beta disabled" value="beta">Beta disabled</SelectItem>
            <SelectItem textValue="Gamma" value="gamma">Gamma</SelectItem>
            <SelectItem textValue="Delta" value="delta">Delta</SelectItem>
          </>
        ),
        defaultValue: 'alpha',
        id: 'candidate-select-keyboard',
      })
    case 'scrollable':
      return SelectShell({ children: manyItems(), defaultOpen: true, defaultValue: 'option-4', id: 'candidate-select-scrollable' })
    case 'popper-placement':
      return (
        <div style="display:flex;justify-content:flex-end;width:100%;padding-top:80px">
          {SelectShell({ align: 'end', defaultOpen: true, defaultValue: 'vue', id: 'candidate-select-popper', position: 'popper', side: 'right' })}
        </div>
      )
    case 'form-submit-reset':
      return (
        <form action="/fixtures/select/form-submit-reset" method="get" style="display:grid;gap:12px;max-width:360px">
          {SelectShell({ defaultValue: 'react', id: 'candidate-select-form', name: 'framework' })}
          <div style="display:flex;gap:12px">
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    case 'custom-token':
      return SelectShell({ className: 'radcn-fixture-custom-select', defaultOpen: true, defaultValue: 'svelte', id: 'candidate-select-custom' })
    default:
      return SelectShell({ defaultOpen: true, defaultValue: 'remix', id: 'candidate-select-default' })
  }
}
