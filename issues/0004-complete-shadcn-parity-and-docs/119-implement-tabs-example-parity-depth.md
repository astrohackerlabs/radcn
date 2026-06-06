# Experiment 119: Implement tabs example parity depth

## Description

Experiment 118 audited the single direct upstream Tabs example, `tabs-demo`,
and found it partial. RadCN already has strong Tabs package behavior and
generic fixture coverage, but there is no named docs, candidate fixture, or
Playwright evidence for the exact upstream Account/Password card form.

This experiment should resolve the direct Tabs example cluster by adding named
docs, fixture, and Playwright coverage for the upstream composition while
preserving RadCN's dependency-free browser-enhanced Tabs model:

- render wrapper layout equivalent to upstream
  `className="flex w-full max-w-sm flex-col gap-6"`;
- render `Tabs defaultValue="account"`;
- render Account and Password triggers;
- render Account content as a Card with title `Account`, description
  `Make changes to your account here. Click save when you're done.`,
  labelled Name and Username fields, ids `tabs-demo-name` and
  `tabs-demo-username`, default values `Pedro Duarte` and `@peduarte`, and
  footer button `Save changes`;
- render Password content as a Card with title `Password`, description
  `Change your password here. After saving, you'll be logged out.`, labelled
  password fields with ids `tabs-demo-current` and `tabs-demo-new`, and footer
  button `Save password`;
- prove public Tabs root/list/trigger/content hooks, default selected state,
  tab ARIA associations, pointer activation, keyboard behavior, hidden panels,
  and composition with Card, Label, Input, and Button;
- record dependency-divergence mapping for `"use client"`, React component
  props, Radix Tabs primitives, `TabsPrimitive.Root`,
  `TabsPrimitive.List`, `TabsPrimitive.Trigger`,
  `TabsPrimitive.Content`, `cva`, `VariantProps`, `tabsListVariants`,
  unused upstream `AppWindowIcon` and `CodeIcon` imports,
  `lucide-react`, `className`, Tailwind utilities, `cn`, `data-slot`,
  `data-orientation`, `data-variant`, `data-state`, custom tokens, and vendor
  source.

The implementation should not add React, React DOM, Radix, lucide-react,
class-variance-authority, Tailwind, or vendor dependencies. Package code should
change only if the current Tabs primitive cannot represent the upstream
example's user-facing behavior, accessibility, browser behavior, or
author-facing modifiability.

## Changes

- Update `radcn/apps/docs/app/assets/entry.ts`.
  - Import `enhanceTabs` from `radcn/tabs`.
  - Scope docs Tabs enhancement to the named `tabs-demo` example, and keep
    existing docs enhancers unchanged.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Tabs docs from generic preview/code-only content to include a
    named `tabs-demo` rich example.
  - Render stable docs hooks such as
    `data-radcn-docs-tabs-family="tabs-demo"`.
  - Render the exact upstream Account/Password triggers, default `account`
    value, Card titles/descriptions, field labels, input ids, input types,
    default values, buttons, wrapper layout mapping, and public Tabs hooks.
  - Include exact source snippet and mapping copy for React/Radix/cva/
    lucide/Tailwind/`cn`/`className`/`data-slot`/`data-orientation`/
    `data-variant`/`data-state`/custom-token/vendor mechanics.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/tabs.tsx`
  Add a named `tabs/demo` fixture route that renders the exact upstream
  Account/Password card form and preserves existing generic Tabs scenarios.
- Update fixture Playwright coverage in `radcn/fixtures/tests/tabs.spec.ts`.
  - Verify `tabs/demo` renders the named route, exact triggers, default
    selected Account panel, hidden Password panel, Card composition, labels,
    input ids, default values, password input types, buttons, public hooks,
    ARIA associations, pointer activation, keyboard activation, and
    composition with Card/Input/Label/Button.
  - Keep existing generic Tabs behavior tests unchanged unless selectors must
    be narrowed around the new named fixture.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/tabs` page renders the named family hook,
    exact Account/Password demo, source snippet, public hooks, tab behavior,
    Card/Input/Label/Button composition, and required dependency-divergence
    mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/tabs-example-inventory.md`.
  - Change `tabs-demo` from `Partial` to `Covered` only after docs, fixture,
    and Playwright evidence exists.
  - Record final decisions for Account/Password form composition, wrapper
    layout, default value, labels, input ids/default values/types, buttons,
    ARIA/keyboard/pointer behavior, unused lucide imports, dependency
    divergences, custom tokens, and vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `tabs` as a resolved example cluster only after the inventory row is
    `Covered`. Whole-row intentional divergence is not a pass path for this
    experiment; if a new discovery makes exact demo coverage impossible,
    record a `Partial` or `Fail` result with follow-up instead. Individual
    mechanics such as React/Radix/Tailwind/`data-slot` may still be documented
    as dependency divergences.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Tabs example outcome in `## Learnings`.
  - Update the Experiment 119 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Tabs is resolved.

Package code should otherwise stay unchanged. If a package change is needed,
record the reason in the result and prove it with package, fixture, and docs
tests.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:

  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```

- Fixture Tabs coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts tabs.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves `tabs-example-inventory.md` has exactly
  one direct upstream row, `tabs-demo`, and the row is `Covered`.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "tabs"`, `status = "resolved"`, and evidence
  for Experiment 118, Experiment 119, and `tabs-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates `parity-inventory.md`; a
  deterministic check proves:
  - `tabs` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for tabs`;
  - block and chart-gallery sections remain out of scope, not unresolved
    deliverables.
- Fixture tests assert:
  - `tabs/demo` renders the named route;
  - the Tabs root has `data-default-value="account"` and initial
    `data-value="account"`;
  - Account and Password triggers have stable public hooks and accessible
    names;
  - Account is selected by default, `aria-selected="true"`, active
    `data-state`, and the Account panel is visible;
  - Password is inactive by default and the Password panel is hidden;
  - clicking Password selects it and reveals the Password panel;
  - keyboard navigation from Account to Password works according to the
    package's automatic horizontal activation behavior;
  - Account Card renders exact title, description, Name and Username labels,
    input ids, default values, and `Save changes` button;
  - Password Card renders exact title, description, password labels, input
    ids, `type="password"`, and `Save password` button;
  - public Tabs, Card, Label, Input, and Button hooks/classes are present;
  - no test depends on React state, Radix internals, Tailwind, `cn`, or literal
    DOM equivalence with upstream.
- Docs coverage asserts the Tabs page renders stable evidence for the named
  docs example, exact Account/Password demo, source snippet, public hooks,
  tab behavior, Card/Input/Label/Button composition, and required
  dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 119 learning, Tabs
  inventory reference, and next generated recommendation were recorded.
- Dependency and scope checks pass:
  - deterministic source import scan over files changed by this experiment for
    forbidden React/Radix/lucide-react/cva/Tailwind/vendor source imports. The
    scan must include any changed files under `radcn/packages/radcn`,
    `radcn/apps/docs`, and `radcn/fixtures/candidate-remix`, but must not fail
    on unrelated pre-existing approved references;
  - manifest checks prove no forbidden dependencies were added;
  - `git diff --exit-code -- pnpm-lock.yaml`;
  - tracked-vendor-source check proves `git ls-files vendor` returns only
    `vendor/.gitignore`;
  - `git diff --check`;
  - `git status --short` shows only the expected Experiment 119 plan files
    before the plan commit:
    `issues/0004-complete-shadcn-parity-and-docs/119-implement-tabs-example-parity-depth.md`
    and `issues/0004-complete-shadcn-parity-and-docs/README.md`.
  - before the result commit, `git status --short` shows only files expected
    from this implementation experiment.
  - `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
    prints no output.

Failure criteria:

- The implementation omits the exact upstream Account/Password labels, field
  ids, default values, password input types, descriptions, buttons, tab values,
  or Card composition.
- The implementation marks `tabs-demo` covered without named docs, fixture,
  and Playwright evidence for the exact upstream Account/Password card form.
- The implementation treats generic preview/code Tabs docs as sufficient
  direct `tabs-demo` proof.
- The implementation treats React/Radix DOM equivalence as required instead of
  user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The implementation adds React, Radix, lucide-react, cva, Tailwind, or vendor
  source dependencies.
- The implementation changes blocks or chart-gallery scope.

## Design Review

Reviewer: Huygens the 3rd (`019e9ef2-ef78-72d0-853a-972bd3469ccb`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the design is plan-only and linked from the
Issue 4 README as `Designed`, the required `Description`, `Changes`,
`Verification`, and `Design Review` sections are present, the scope is narrow
to the single upstream `tabs-demo` parity gap, verification includes concrete
pass/fail criteria and repo hygiene checks, vendor sources remain read-only,
forbidden React/Radix/lucide/cva/Tailwind/vendor dependencies are excluded,
and Experiment 118 has its result commit before Experiment 119 begins.

## Result

**Result:** Pass

Implemented named `tabs-demo` parity across the docs app, candidate fixture,
Playwright coverage, and Issue 4 bookkeeping.

The docs app now scopes `enhanceTabs` to
`data-radcn-docs-tabs-family="tabs-demo"` and renders a named Tabs Demo
example for the upstream Account/Password card form. The candidate fixture now
has a `tabs/demo` route with the same composition. Fixture and docs tests
verify the wrapper layout mapping, default `account` selection, Account and
Password triggers, Card titles/descriptions/content/footer, labels, input ids,
server-rendered default values, password input types, Save buttons, public
Tabs/Card/Label/Input/Button hooks, ARIA associations, hidden panels, pointer
activation, and keyboard activation.

`tabs-example-inventory.md` now marks `tabs-demo` as `Covered`,
`resolved-clusters.json` records `tabs` as resolved with Experiment 118,
Experiment 119, and inventory evidence, and the regenerated
`parity-inventory.md` now recommends example parity for `tooltip` as the next
cluster.

Verification run:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts tabs.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
node scripts/audit-shadcn-parity.mjs
node deterministic check for direct upstream tabs registry/file/inventory count
node deterministic check for tabs-example-inventory Covered row
node deterministic check for tabs resolved-clusters evidence
node deterministic check for regenerated parity inventory recommendation
node deterministic README learning check
node deterministic source import scan over changed docs/fixture source files
node deterministic package manifest forbidden dependency scan
git diff --exit-code -- pnpm-lock.yaml
git ls-files vendor | sed '/^vendor\/.gitignore$/d'
git diff --check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
git status --short
```

All checks passed. The Playwright runs emitted the existing Node
`module.register()` deprecation warning and `NO_COLOR`/`FORCE_COLOR` warnings;
they did not fail the runs.

## Conclusion

Tabs direct example parity is complete for the current Issue 4 scope. No
package API change was required: the existing `Tabs`, `TabsList`,
`TabsTrigger`, `TabsContent`, and `enhanceTabs` primitives already represented
the upstream user-facing behavior. The next experiment should audit the final
unresolved direct example cluster, `tooltip-demo`.

## Completion Review

Reviewer: Aquinas the 3rd (`019e9efa-ae2d-79e2-9f18-92eb36819fe4`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the implementation matches the approved
Tabs demo scope in docs, fixture, and tests; upstream reference fields match
the RadCN port; the experiment has `Result` and `Conclusion`; the Issue 4
README marks Experiment 119 as `Pass` with Tabs learnings and the next
`tooltip` recommendation; `git diff --check` passed; vendor cleanliness was
checked; no ignored vendor sources were committed; and the result commit had
not been made before review.
