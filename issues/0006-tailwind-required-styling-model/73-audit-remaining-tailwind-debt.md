# Experiment 73: Audit remaining Tailwind debt

## Description

Experiment 72 cleared the overlay trigger/close cluster, but Issue 6 is still
open and the previous "remaining" maps are stale. This experiment performs a
fresh, current-state audit of every remaining style rule that can affect RadCN
components, docs, or fixtures.

The goal is not to migrate styles yet. The goal is to produce an authoritative
inventory that separates:

- required theme/token rules;
- behavior or positioning glue that should intentionally remain bespoke;
- component visual styling that must still move into Tailwind utilities;
- docs/fixture/demo styling that should move out of package `tokens.css` or into
  Tailwind-scanned call sites;
- obsolete comments or historical maps that now mislead future experiments.

The audit result will determine whether Issue 6 can be closed after a small
cleanup, or which final migration clusters remain before closure.

## Changes

- `issues/0006-tailwind-required-styling-model/73-audit-remaining-tailwind-debt.md`:
  record the audit method, inventory, result, and conclusion.
- `issues/0006-tailwind-required-styling-model/README.md`: add this experiment
  to the experiment index as `Designed`; after the audit, copy durable findings
  into `## Learnings` and update stale remaining-debt guidance.

No source migration is part of this experiment. If the audit finds concrete
style debt, the next experiment will migrate one coherent cluster with its own
plan/review/commit cycle.

## Verification

Audit commands and checks:

1. Enumerate remaining package style selectors and at-rules:
   `rg -n "^\\.|^\\[data-radcn|^@media|^@keyframes|radcn-[a-z0-9-]+" radcn/packages/radcn/src/styles/tokens.css`.
2. Confirm `tokens.css` and `radcn/packages/radcn/src/styles/index.ts` are in
   sync with the repository's JSON-stringify formula.
3. Search component, docs, and fixture usage for each remaining visual selector
   family before classifying it:
   `rg -n "<selector-or-marker>" radcn/packages/radcn/src/components radcn/apps/docs/app radcn/fixtures/candidate-remix/app`.
4. Classify every remaining rule group as one of:
   - `Theme/token foundation`
   - `Intentional behavior/layout glue`
   - `Component Tailwind migration debt`
   - `Docs/fixture/demo Tailwind migration debt`
   - `Obsolete or stale documentation`
5. For every `Component Tailwind migration debt` and
   `Docs/fixture/demo Tailwind migration debt` group, identify:
   - owner files;
   - whether the migration is component-emitted, consumer-site, or both;
   - likely verification tests;
   - whether it can be safely grouped with another debt item.
6. Run hygiene checks:
   - `git diff --check`;
   - `git status --short`;
   - `git diff --name-only | rg '^vendor/'` must produce no matches.

Pass criteria:

- The experiment result contains a complete current-state inventory of remaining
  style rule groups in `tokens.css`.
- The inventory distinguishes closure-acceptable bespoke behavior from actual
  Tailwind migration debt.
- The Issue 6 README Learnings section records durable audit findings and
  removes or supersedes stale remaining-debt claims.
- No source migration occurs in this experiment.
- Hygiene checks pass and vendor is untouched.

Fail criteria:

- Any remaining rule group cannot be classified from current evidence.
- The audit relies on the stale post-Experiment-69 map instead of current code.
- The audit silently treats visual component styling as acceptable bespoke CSS
  without a Remix 3 behavior/layout reason.
- The experiment starts migrating source styles before the audit is concluded.

## Design Review

Reviewer: Feynman (`019ebe11-2d6e-7052-9a3f-ef3899ca502c`), fresh Codex
subagent with `fork_context: false`.

Findings: none.

Approval result: approved. The reviewer confirmed the issue README links the
experiment as `Designed`, the experiment has the required Description, Changes,
Verification, and Design Review sections, the scope is audit-only and narrow
enough for one experiment, verification includes concrete classification and
hygiene checks, vendor cleanliness is covered, and durable learnings must be
copied back into the Issue 6 README.

## Result

**Result:** Pass

The audit found that Issue 6 is not ready to close. Experiment 72 removed the
largest stale trigger/close cluster, but `tokens.css` still contains a mixture
of required theme foundation, intentional Remix 3 behavior/layout glue, and real
Tailwind migration debt. The old remaining-debt maps are no longer safe as a
work queue because they undercount docs/fixture/demo classes and overstate some
rules that are now only behavior hooks.

Audit commands run:

- `rg -n "^\\.|^\\[data-radcn|^@media|^@keyframes|radcn-[a-z0-9-]+" radcn/packages/radcn/src/styles/tokens.css`
- `node -e "...JSON.stringify(tokens.css)..."` style-sync check — pass,
  `styles in sync`.
- `rg -n "<selector-or-marker>" radcn/packages/radcn/src/components radcn/apps/docs/app radcn/fixtures/candidate-remix/app` for the remaining rule families.
- `git diff --check` — pass.
- `git status --short` — only issue docs changed during the audit result.
- `git diff --name-only | rg '^vendor/'` — no matches.

### Inventory

| Rule group | Classification | Evidence and next action |
| --- | --- | --- |
| `:root`, `[data-radcn-theme="dark"]` token definitions | Theme/token foundation | Keep. These are the Tailwind-backed semantic tokens and system/dark theme inputs. |
| Field invalid label cascades and `.radcn-field--choice-card` | Component / consumer-site Tailwind debt | Migrate with Field/Form. The parent-invalid label color can move to descendant arbitrary variants or var propagation; choice-card is a consumer class used by docs and fixtures and needs Tailwind-scanned call-site utilities. |
| Form invalid label cascades | Component Tailwind debt | Migrate with Field/Form because it shares the same invalid label color behavior and markers. |
| InputGroup nested input/textarea resets, addon alignment/borders, and small/icon button modifiers | Component Tailwind debt | Migrate with InputGroup/ButtonGroup. The root can emit descendant arbitrary variants or set local vars; addon/button modifiers can emit their own utilities. |
| InputOTP caret keyframes | Intentional behavior/layout glue | Keep unless a future component experiment replaces the custom caret animation with a Tailwind animation utility. It is behavior animation, not static visual surface styling. |
| `.radcn-fixture-custom-*` token overrides and custom fixture selectors | Docs/fixture/demo Tailwind migration debt | Move out of package `tokens.css` or convert to Tailwind-scanned fixture/docs classes. They should not live in package styling after Issue 6 closes. |
| Non-custom fixture/demo helpers: `.radcn-fixture-rounded-button`, `.radcn-fixture-aspect-media`, `.radcn-fixture-navigation-panel`, `.radcn-fixture-panel` | Docs/fixture/demo Tailwind migration debt | Move to fixture/docs Tailwind call sites or local fixture/demo CSS. These are example presentation helpers, not package component styling. |
| Chart docs helper classes and `radcn-data-table-recipe` | Docs/fixture/demo Tailwind migration debt / possible obsolete CSS | Move to docs/fixture call sites or remove if unused. This is not package component styling. |
| `.radcn-sr-only` | Docs/fixture/demo Tailwind migration debt | Replace raw usage with Tailwind `sr-only` utilities at call sites or a local docs/fixture helper, then remove from package CSS. |
| Breadcrumb trigger/truncate/responsive/drawer-link classes | Consumer-site Tailwind migration debt | Migrate by appending utilities to docs/fixture raw class sites or introducing explicit small example helpers. These are not emitted by the Breadcrumb component. |
| ButtonGroup child grouping cascades | Component Tailwind migration debt | Migrate with ButtonGroup/InputGroup/select trigger. These cascades encode layout/radius/overlap behavior that can be emitted from ButtonGroup with arbitrary descendant variants or variable propagation. |
| Item descendant image rule | Intentional behavior/layout glue | Acceptable if retained: it styles arbitrary consumer `img` children inside image/header slots. It is content normalization, not an exported visual class. |
| Checkbox/radio indicator reveal cascades | Component Tailwind migration debt | Migrate with Checkbox/RadioGroup using parent-state descendant utilities or child variables. The current CSS is small but still visual state styling. |
| Switch thumb size/slide cascades | Component Tailwind migration debt | Migrate with Switch by moving size and checked translation into component utilities with data/has variants or parent-set variables. |
| Progress indeterminate animation | Intentional behavior/layout glue | Keep as a RadCN extension unless a future experiment promotes it to Tailwind animation utilities. shadcn has no indeterminate progress equivalent. |
| Slider thumb focus cascade | Component Tailwind migration debt | Migrate with Slider using a root descendant arbitrary variant or parent-set focus variable read by the thumb. |
| Accordion/Collapsible child icon rotation and disabled trigger cascades | Intentional behavior/layout glue, low-priority migration candidate | Acceptable as native-details parent-child behavior. Can later migrate to descendant arbitrary variants, but it is behavior coupling rather than static component styling. |
| Tabs vertical-list cascade | Intentional behavior/layout glue, low-priority migration candidate | Acceptable orientation propagation. Can later migrate with root descendant variants or CSS vars if closing criteria require zero component cascades. |
| Toggle icon, toggle-group disabled/vertical/item cascades | Component / consumer-site Tailwind debt | `radcn-toggle-icon` still has raw docs/fixture usages; migrate those call sites. Group disabled/vertical/item state rules can move to component utilities. |
| Avatar group overlap and ScrollArea orientation thumb min-size | Intentional behavior/layout glue | Acceptable parent-child layout normalization. Could be Tailwind arbitrary descendants later, but not a blocker cluster by itself. |
| Portal/root display and z-index rules for Dialog, AlertDialog, Sheet, Popover, Tooltip, HoverCard, Drawer | Intentional behavior/layout glue | Keep. These support portals and fixed overlay hosts rather than component surface appearance. |
| AlertDialog width/size/footer grid and Sheet side positioning/animation | Component Tailwind migration debt | Migrate with modal layout glue. These are component-emitted data-state/side/size rules and can move to content utility constants. |
| Popover/HoverCard/Tooltip positioning glue and tooltip arrow side placement | Intentional behavior/layout glue | Keep. This is RadCN's dependency-free equivalent of Popper positioning. The surface styling has already moved to utilities. |
| Menu inset/destructive/disabled helpers | Component Tailwind migration debt | Migrate through menu-family components or data attributes. They still emit visible padding/color/opacity. |
| Drawer content/direction/handle/close positioning and drawer keyframes | Mixed: intentional behavior/layout glue plus component Tailwind debt | Keep drag/transform/keyframes as behavior; migrate static content surface, direction geometry, handle appearance, and direct close sizing to Tailwind utilities where practical. |
| Select trigger and placeholder/disabled/invalid state rules | Component Tailwind migration debt | This is the clearest remaining package component surface. Migrate next with ButtonGroup coupling handled by the same var/descendant pattern used in Experiments 70 and 72. |
| Command checked-indicator cascade | Component Tailwind migration debt | Small state reveal; migrate with command/menu residual state helpers. |
| DatePicker trigger/content overrides | Component Tailwind migration debt | Migrate with Select trigger or a focused DatePicker cleanup; these are simple component-emitted utilities. |
| Carousel selected slide, previous/next position, slide-card, status/example/plugin demo classes, responsive sizing | Docs/fixture/demo Tailwind migration debt and component layout debt | Split: control positioning can live on component utilities; slide-card/status/example/demo classes should move to fixture/docs Tailwind call sites. |
| Toast loading icon animation | Intentional behavior/layout glue | Keep unless replaced by a package animation utility in a future cleanup. |
| Sidebar floating/inset inner and collapse-hide cascades | Intentional behavior/layout glue, low-priority migration candidate | Acceptable app-shell parent-state layout behavior. Can later migrate with arbitrary descendants if a zero-cascade closure standard is adopted. |
| Direction sample/nested classes | Docs/fixture/demo Tailwind migration debt | Move to docs/fixture call sites; these are example presentation, not component styling. |

### Remaining migration clusters

The remaining work should not be one giant cleanup. The audit supports these
clusters, in order:

1. **Select + DatePicker trigger/content + ButtonGroup coupling.** This is the
   clearest package component surface debt and exercises the same var/descendant
   patterns already proven by Button and overlay triggers.
2. **Field/Form/InputGroup residuals.** This clears shared invalid-label,
   choice-card, nested input/textarea, addon, and input-group button rules.
3. **State-indicator residuals.** Checkbox, RadioGroup, Switch, Slider, Command,
   menu helpers, and Toggle icon/group state can move through a compact
   parent-state/descendant-variant pass.
4. **Modal/drawer layout residuals.** AlertDialog size/footer, Sheet side
   geometry, and Drawer static surface/handle/close geometry should migrate
   while retaining drag/portal/keyframe behavior.
5. **Docs/fixture/demo CSS evacuation.** Move fixture custom classes,
   non-custom fixture helpers (`radcn-fixture-rounded-button`,
   `radcn-fixture-aspect-media`, `radcn-fixture-navigation-panel`,
   `radcn-fixture-panel`), chart/data table docs helpers, breadcrumb raw
   compositions, carousel example classes, direction samples, and
   `radcn-sr-only` out of package `tokens.css` and into Tailwind-scanned
   docs/fixture source.

### Closure standard

Issue 6 can close only after package `tokens.css` contains no ordinary component
surface styling. What may remain is:

- semantic theme tokens;
- keyframes and behavior animations that have no Tailwind equivalent yet;
- portal/z-index/fixed host rules;
- dependency-free positioning and drag mechanics;
- parent-child behavior glue with a documented Remix 3 reason;
- no docs/fixture/demo presentation classes.

## Conclusion

The experiment succeeded as an audit and found meaningful remaining work. The
next experiment should migrate the Select + DatePicker trigger/content +
ButtonGroup-coupling cluster because it is the highest-signal remaining package
component surface debt and is narrow enough to verify with existing select,
date-picker, button-group, docs, and full fixture gates.

## Completion Review

Reviewer: Sartre (`019ebe13-ca25-7693-91f6-2f9364c94703`), fresh Codex subagent
with `fork_context: false`.

Initial findings:

- Major: the README still contained the stale active "Remaining Component
  Migration Map" after the Experiment 73 map superseded old maps.
- Major: the docs/fixture evacuation cluster omitted four non-custom fixture
  helpers still present in package CSS: `radcn-fixture-rounded-button`,
  `radcn-fixture-aspect-media`, `radcn-fixture-navigation-panel`, and
  `radcn-fixture-panel`.

Fixes:

- Replaced the stale map with `## Superseded Remaining Map`, pointing readers to
  the Experiment 73 current map as authoritative.
- Added the four non-custom fixture helpers to the experiment inventory and to
  the README's docs/fixture/demo evacuation cluster.

Re-review result: approved. No blocker, major, or minor findings remained.
