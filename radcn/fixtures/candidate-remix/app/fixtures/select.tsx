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

const fruitItems = [
  ['apple', 'Apple'],
  ['banana', 'Banana'],
  ['blueberry', 'Blueberry'],
  ['grapes', 'Grapes'],
  ['pineapple', 'Pineapple'],
] as const

const timezoneGroups = [
  {
    label: 'North America',
    options: [
      ['est', 'Eastern Standard Time (EST)'],
      ['cst', 'Central Standard Time (CST)'],
      ['mst', 'Mountain Standard Time (MST)'],
      ['pst', 'Pacific Standard Time (PST)'],
      ['akst', 'Alaska Standard Time (AKST)'],
      ['hst', 'Hawaii Standard Time (HST)'],
    ],
  },
  {
    label: 'Europe & Africa',
    options: [
      ['gmt', 'Greenwich Mean Time (GMT)'],
      ['cet', 'Central European Time (CET)'],
      ['eet', 'Eastern European Time (EET)'],
      ['west', 'Western European Summer Time (WEST)'],
      ['cat', 'Central Africa Time (CAT)'],
      ['eat', 'East Africa Time (EAT)'],
    ],
  },
  {
    label: 'Asia',
    options: [
      ['msk', 'Moscow Time (MSK)'],
      ['ist', 'India Standard Time (IST)'],
      ['cst_china', 'China Standard Time (CST)'],
      ['jst', 'Japan Standard Time (JST)'],
      ['kst', 'Korea Standard Time (KST)'],
      ['ist_indonesia', 'Indonesia Central Standard Time (WITA)'],
    ],
  },
  {
    label: 'Australia & Pacific',
    options: [
      ['awst', 'Australian Western Standard Time (AWST)'],
      ['acst', 'Australian Central Standard Time (ACST)'],
      ['aest', 'Australian Eastern Standard Time (AEST)'],
      ['nzst', 'New Zealand Standard Time (NZST)'],
      ['fjt', 'Fiji Time (FJT)'],
    ],
  },
  {
    label: 'South America',
    options: [
      ['art', 'Argentina Time (ART)'],
      ['bot', 'Bolivia Time (BOT)'],
      ['brt', 'Brasilia Time (BRT)'],
      ['clt', 'Chile Standard Time (CLT)'],
    ],
  },
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

function SelectDemoFixture() {
  return (
    <div style="display:grid;gap:8px;max-width:360px">
      <Label for="candidate-select-demo-trigger">Fruit</Label>
      <Select id="candidate-select-demo" name="fruit">
        <SelectTrigger ariaLabel="Fruit" id="candidate-select-demo-trigger" style="width:180px;">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent style="width:180px;">
            <SelectViewport>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {fruitItems.map(([value, label]) => <SelectItem textValue={label} value={value}>{label}</SelectItem>)}
              </SelectGroup>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  )
}

function SelectScrollableDemoFixture() {
  return (
    <div style="display:grid;gap:8px;max-width:360px">
      <Label for="candidate-select-scrollable-demo-trigger">Timezone</Label>
      <Select id="candidate-select-scrollable-demo" name="timezone">
        <SelectTrigger ariaLabel="Timezone" id="candidate-select-scrollable-demo-trigger" style="width:280px;">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent style="width:280px;">
            <SelectScrollUpButton />
            <SelectViewport style="max-height:12rem;overflow:auto;">
              {timezoneGroups.map((group) => (
                <SelectGroup>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.options.map(([value, label]) => <SelectItem textValue={label} value={value}>{label}</SelectItem>)}
                </SelectGroup>
              ))}
            </SelectViewport>
            <SelectScrollDownButton />
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  )
}

export function renderSelectFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'demo':
      return SelectDemoFixture()
    case 'scrollable-demo':
      return SelectScrollableDemoFixture()
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
