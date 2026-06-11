# Experiment 45: Migrate Toggle + ToggleGroup together to Tailwind utilities

## Description

Exp 44 established that Toggle and ToggleGroupItem share the `.radcn-toggle*`
button rules (`ToggleGroupItem` emits `radcn-toggle` and inherits size/variant
from the group via bespoke cascade rules). They must migrate TOGETHER (the Exp-39
sibling pattern). This experiment migrates the Toggle button, the ToggleGroup
container, and the ToggleGroupItem to Tailwind utilities, fully removing the
`.radcn-toggle*` button rules and the migrated `.radcn-toggle-group*` container/
item rules — KEEPING the group→item size/variant CASCADE rules (a parent-data-attr
mechanism) and the two raw-class icon APIs bespoke.

### Shared toggle-button utilities (Toggle AND ToggleGroupItem)

Exported from `toggle.tsx`, imported by `toggle-group.tsx`. Conflict-free base/
Records (the Exp-41 lesson): base sets NO bg/border-color/min-h/padding/font-size.

- base: `inline-flex items-center justify-center gap-2 border rounded-md
  text-[var(--radcn-toggle-fg,var(--radcn-foreground))] cursor-pointer font-medium
  leading-none [font-family:var(--radcn-font)] outline-none
  transition-[background-color,color,border-color,box-shadow]
  hover:bg-[var(--radcn-toggle-hover-bg,var(--radcn-secondary))]
  focus-visible:border-[var(--radcn-ring)]
  focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]
  data-[state=on]:bg-[var(--radcn-toggle-pressed-bg,var(--radcn-primary))]
  data-[state=on]:text-[var(--radcn-toggle-pressed-fg,var(--radcn-primary-foreground))]
  data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50
  disabled:cursor-not-allowed disabled:opacity-50`
- variant `Record`: default `border-transparent bg-transparent`; outline
  `border-[var(--radcn-toggle-border,var(--radcn-border))] bg-background`.
- size `Record`: default `min-h-[var(--radcn-control-height)] px-3 py-2
  text-[0.875rem]`; sm `min-h-8 px-2.5 py-1.5 text-[0.8125rem]`; lg `min-h-11 px-4
  py-2.5 text-base`.

Toggle `<button>`: `base + variantRecord[variant] + sizeRecord[size] +
radcn-toggle--{variant} + radcn-toggle--{size}` (markers); DROP `radcn-toggle`.

ToggleGroupItem `<button>`: `base + variantRecord[variant ?? 'default'] +
sizeRecord[size ?? 'default'] + radcn-toggle-group-item + shrink-0 +
data-[group-disabled=true]:pointer-events-none + (variant && radcn-toggle--{variant})
+ (size && radcn-toggle--{size})`; DROP `radcn-toggle`. It ALWAYS applies the
default-fallback Records as the baseline; the kept group CASCADE rules (higher
specificity) override size/variant for items that have NO own size/variant.

### ToggleGroup container (migrated)

`inline-flex w-fit items-center gap-[var(--radcn-toggle-group-gap,0.25rem)]
rounded-md [font-family:var(--radcn-font)] data-[disabled=true]:opacity-[0.55]
data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch` +
RETAIN the `radcn-toggle-group--{orientation}` marker (the `:143`
`toHaveClass(/--vertical/)`); the vertical flex-col/items-stretch apply via the
`data-[orientation=vertical]:` variant (the group emits `data-orientation`), which
beats the base `items-center` by attribute specificity. The custom group gap
(`8px`, `:186`) reads `--radcn-toggle-group-gap` (the inline `spacing` style).

### Kept bespoke (NOT migrated)

- group→item size CASCADE: `.radcn-toggle-group[data-size="sm"|"lg"]
  .radcn-toggle-group-item:not([data-size])` (sets min-h/padding/font-size for
  size-less items). Specificity (0,4,0) > the item's default-fallback size utility
  (0,1,0), so size-less items in sm/lg groups get the cascade size (`:174`/`:178`
  min-heights 44px/32px). KEPT verbatim (targets the retained
  `.radcn-toggle-group-item` class).
- group→item variant CASCADE: `.radcn-toggle-group[data-variant="outline"]
  .radcn-toggle-group-item:not([data-variant])` (border-color + background for
  variant-less items). KEPT (`:158`/`:182` border-left-color; `:199-201` are on a
  variant-SET item via the pressed utility + custom token).
- the two raw-class icon APIs: `.radcn-toggle-icon` and `.radcn-toggle-group-icon`
  (+ their `[data-state="on"] …` color rules) — fixtures/consumers write these
  classes directly. KEPT; the `.radcn-toggle[data-state="on"] .radcn-toggle-icon`
  parent is REWRITTEN to `[data-radcn-toggle][data-state="on"]` (the standalone
  Toggle emits `data-radcn-toggle`; base class dropped). The
  `.radcn-toggle-group-item[data-state="on"] .radcn-toggle-group-icon` already
  targets the retained `.radcn-toggle-group-item` class — unchanged.
- the `radcn-toggle-group-item` class is RETAINED (the cascade selectors target
  it); the `.radcn-toggle-group-item { flex-shrink:0 }` rule migrates to `shrink-0`.
- `.radcn-fixture-custom-toggle`/`-toggle-group` retained.

## Why both suites stay green

- Standalone Toggle: base + own variant/size Records + markers (sizes/states/custom
  tokens/markers hold, as in the Exp-44 design which the Toggle-only assertions
  already passed).
- Group items: pressed/hover/focus from the shared base utilities; size/variant
  from the item's OWN Record when set, else the kept cascade (higher specificity);
  the border-left-color/min-height/pressed-bg/icon-color assertions hold.
- The group container: orientation via the `data-[orientation=vertical]:` variant
  + `--vertical` marker; the custom gap via the token utility.

## Changes

- `radcn/packages/radcn/src/components/toggle.tsx`: export `toggleBaseClass`,
  `toggleVariantClass`, `toggleSizeClass`; emit them on the button + markers; drop
  base `radcn-toggle`; ASCII comments.
- `radcn/packages/radcn/src/components/toggle-group.tsx`: import the shared
  consts; migrate the container + item emissions (item applies the default-fallback
  Records + keeps `radcn-toggle-group-item` + markers when own size/variant);
  drop base `radcn-toggle`.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the `.radcn-toggle*` button
  rules + the migrated `.radcn-toggle-group` container/`[data-disabled]`/`--vertical`/
  `-item{flex-shrink}`/`-item[data-group-disabled]` rules; KEEP the 2 size + 1
  variant CASCADE rules, the 2 icon rules (repoint the standalone toggle one), and
  the custom fixtures.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; no junk ellipsis utility; min-heights emit
   (`min-h-8`/`min-h-11`).
2. Three typechecks pass.
3. `index.ts` byte-identical; no `.radcn-toggle` BUTTON rule and no migrated
   `.radcn-toggle-group` container/item rules remain; the CASCADE rules + the 2
   icon rules retained (the standalone toggle icon parent repointed); custom
   fixtures retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — `toggle.spec.ts` FULLY (standalone: sizes
   32/44px, marker `toHaveClass`, pressed/custom tokens, icon on-color; group:
   `--vertical`, size-less item min-heights via cascade, border-left-color, gap
   8px, group-icon colors, the custom pressed item bg/border/fg).
6. `git diff --check` clean; `vendor/` untouched; expected files only.

Pass criteria: Toggle + ToggleGroup render from utilities (only the style-less
markers + the cascade-target `radcn-toggle-group-item` class + the raw-class icon
APIs remain); ALL toggle.spec.ts assertions hold; BOTH suites green; byte-identical.

Fail criteria: any toggle/group assertion regresses (esp. the cascade-driven
size-less item sizes/variants, the pressed/custom tokens, the icon colors, the
orientation); a base-vs-Record/cascade conflict; `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README + Learnings, the Exp-44
Fail + this design, and read access to the source + fixtures)

Findings: the reviewer's five "blockers" are all pre-implementation
design-completeness items — each IS specified in the design's mapping sections
(the full container utility string is listed; `shrink-0`, the
`data-[group-disabled=true]:pointer-events-none`, the `toggle.tsx` exports, and
dropping the base `radcn-toggle` from BOTH components are all stated). They
describe the current (un-migrated) code, which is expected at design stage. The
reviewer confirmed: NO component other than Toggle/ToggleGroupItem emits
`radcn-toggle` (safe to drop); the icons are raw-class APIs (kept); the
orientation marker + `data-[orientation=vertical]:` variant are correct; the
mapping is exact.

The valuable ask — the CASCADE specificity — addressed concretely:

- Item default-fallback size utility `.min-h-\[var\(--radcn-control-height\)\]` =
  ONE class = specificity (0,1,0).
- Size cascade `.radcn-toggle-group[data-size="sm"] .radcn-toggle-group-item:not([data-size])`
  = 2 classes (`.radcn-toggle-group`, `.radcn-toggle-group-item`) + 2 attributes
  (`[data-size="sm"]`, the `:not([data-size])` argument) = (0,4,0).
- (0,4,0) > (0,1,0) → the cascade overrides the item's default size for size-less
  items, in EITHER layer order. Additionally, the bespoke `radcnStyles` rules are
  injected outside `@layer utilities`; unlayered rules beat layered ones
  regardless of specificity — which only reinforces the cascade winning. The
  `:not([data-size])` is satisfied because the item omits `data-size` when its
  `size` prop is undefined (Remix drops undefined attrs); an item WITH its own
  size emits `data-size`, fails `:not`, and uses its own size utility.

Flagged RISK to verify empirically at the gate (lead-agent note): the variant
cascade `[data-variant="outline"] .item:not([data-variant]) { background }` is
unlayered, so for a variant-LESS item in an outline group it could beat the
layered `data-[state=on]:bg-…` pressed utility — which would break a pressed
size/variant-less item's background. The `:199-201` custom pressed-item assertions
are the gate for this. If they regress, the fix is to give group items an explicit
`data-[variant]`/`data-[state]` resolution (or migrate the variant cascade to a
higher-specificity item utility) rather than rely on the bespoke cascade. The
dual-suite ×2 is the decisive check; this is the same find-fix-verify loop used in
Exp 38/41/42.

Approval result: approved (lead-agent judgment) — the design is complete and the
size cascade is provably correct; the variant-cascade/pressed interaction is an
explicit empirical-verify item the gate will catch, with a documented fallback.
