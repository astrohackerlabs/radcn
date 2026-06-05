# Experiment 2: Ship Remix-native form parity

## Description

Experiment 1 found that `form` is the only upstream shadcn/ui v4 New York
registry UI item missing from RadCN package exports. This experiment turns that
gap into a Remix-native package surface and docs page.

The upstream `ui/form.tsx` implementation is a React Hook Form adapter. It
exports `Form`, `FormField`, `useFormField`, `FormItem`, `FormLabel`,
`FormControl`, `FormDescription`, and `FormMessage`, and uses React context,
`React.useId()`, `Slot`, `Controller`, `FormProvider`, `useFormContext`, and
`useFormState` to connect labels, controls, descriptions, validation messages,
and field errors.

RadCN should not port those React-only mechanics literally. The Remix 3 outcome
should preserve the user-facing capability: native form submission, explicit
label/control/error wiring, accessible description and message IDs,
server/action error display, invalid styling, customization hooks, and docs
recipes for the shadcn form example families. The implementation should favor
explicit IDs and host-element components over hidden React context.

This experiment is narrow to the `form` parity cluster. It does not implement
`date-picker`, `data-table`, charts, blocks, external installation, or npm
publishing.

## Changes

- Add `radcn/packages/radcn/src/components/form.tsx`.
  - Export Remix UI host-element components analogous to the shadcn form parts:
    `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`,
    `FormDescription`, and `FormMessage`.
  - Export helper utilities for explicit accessible wiring, such as a field ID
    helper and/or control attribute helper, so callers can connect RadCN inputs,
    selects, textareas, and composite controls without React context.
  - Support invalid state, description/message IDs, native form attributes,
    class/style customization, and `data-radcn-*` hooks.
  - Do not add `react-hook-form`, `zod`, `@hookform/resolvers`, React, Radix
    Slot, or any dependency copied from `vendor/`.
- Add the `./form` public subpath to `radcn/packages/radcn/package.json`.
- Export the form components and types from `radcn/packages/radcn/src/index.ts`.
- Reuse existing field tokens where possible. If new form CSS hooks are needed,
  update both the source token stylesheet and the exported `radcnStyles` string
  so docs and consumers receive the same CSS.
- Update candidate fixtures in `radcn/fixtures/candidate-remix/` so form
  scenarios use `radcn/form` instead of docs-only field recipes.
- Update fixture tests in `radcn/fixtures/tests/` so the form cluster asserts:
  - `./form` is exported;
  - React Hook Form and validation-library dependencies are still absent;
  - native validation, server errors, action-state text, reset/submit behavior,
    invalid ARIA, and custom token hooks still work.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Move the Form page from `not-shipped-yet` to a ready package API page.
  - Add a live docs preview backed by `radcn/form`.
  - Include source snippets for native validation, server/action errors, and
    explicit accessible wiring.
  - Explain the divergence from shadcn's React Hook Form wrapper and document
    the intended Remix 3 approach.
  - Keep installation copy aspirational and do not claim RadCN is published.
- Update docs tests if they currently treat `form` as a non-exported
  disposition.
- Re-run `node scripts/audit-shadcn-parity.mjs` and commit the regenerated
  `parity-inventory.md`.
- Add learnings to the issue README, including:
  - the final `radcn/form` API decision;
  - why React Hook Form/context semantics were not ported;
  - any reusable form/accessibility patterns needed by later `date-picker`,
    `data-table`, block, or example work.

## Verification

Pass criteria:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm fixtures:reference:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts form-input-cluster.spec.ts`
  runs the focused form/input browser coverage. The config owns the separate
  reference and candidate fixture servers on ports 4601 and 4602.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  proves every package export has a docs route and live preview hook, including
  the new `form` export.
- `node scripts/audit-shadcn-parity.mjs`
- A temporary regeneration check proves `parity-inventory.md` is current after
  the audit script.
- `git diff --check`
- `git status --short` shows only expected RadCN source, docs, fixture, issue,
  inventory, and test changes before the result commit.
- Vendor cleanliness check confirms nested vendor repos were not modified.
- Scope checks confirm:
  - no RadCN package/app code imports from `vendor/`;
  - no `react-hook-form`, `zod`, `@hookform/resolvers`, React, or Radix Slot
    dependency was added for form parity;
  - no package publishing or external install machinery was added.

Failure criteria:

- `form` remains a docs-only gap in the parity inventory.
- The form API depends on React-only context/hook behavior.
- The docs page claims external npm installation works today.
- Fixture or docs tests only prove DOM existence without checking native form,
  ARIA, invalid-state, and customization behavior.

## Design Review

Reviewer: Aquinas (`019e99f4-0965-7e70-b893-3a9360d07690`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: the original verification used non-existent pnpm workspace filters
  for docs and fixture packages. Fixed by replacing them with concrete commands:
  `pnpm --dir radcn/apps/docs typecheck`,
  `pnpm fixtures:candidate:typecheck`, and
  `pnpm fixtures:reference:typecheck`.
- Major: the original browser verification described focused coverage without
  exact commands. Fixed by naming the exact fixture and docs Playwright commands.

Re-review result: approved with no blocker, major, or minor findings.
