# Stage 5 Audit

Stage 5 is complete after Experiment 25.

| Target | Outcome | Evidence | Notes |
| --- | --- | --- | --- |
| `input-group` | Core source | [Experiment 22](22-stage-5-form-input-cluster.md), `packages/radcn/src/components/input-group.tsx`, `fixtures/tests/form-input-cluster.spec.ts` | Server-rendered grouped control/adornment surface with native controls preserved. |
| `input-otp` | Core source | [Experiment 22](22-stage-5-form-input-cluster.md), `packages/radcn/src/components/input-otp.tsx`, `fixtures/tests/form-input-cluster.spec.ts` | One real input owns value, validation, submission, reset, paste, and editing; visual slots mirror that state. |
| `form` | Recipe/disposition | [Experiment 22](22-stage-5-form-input-cluster.md), `docs/radcn-source.md`, `fixtures/tests/form-input-cluster.spec.ts` | No `radcn/form` export; Remix native forms plus RadCN `Field`, `Label`, and controls are the supported replacement for the React Hook Form adapter. |
| `chart` | Core source | [Experiment 23](23-stage-5-data-display-and-table-block.md), `packages/radcn/src/components/chart.tsx`, `fixtures/tests/data-display.spec.ts` | Dependency-free accessible SVG chart primitives replace the React/Recharts wrapper. |
| `data-table` | Block/recipe disposition | [Experiment 23](23-stage-5-data-display-and-table-block.md), `docs/radcn-source.md`, `fixtures/tests/data-display.spec.ts` | No `radcn/data-table` export; application table behavior stays in recipe/block code composed from existing primitives. |
| `sonner` | Core source | [Experiment 24](24-stage-5-notifications.md), `packages/radcn/src/components/sonner.tsx`, `fixtures/tests/notifications.spec.ts` | Server-rendered notification viewport and optional browser event enhancement replace the React Sonner runtime. |
| `toast` | Helper/event source | [Experiment 24](24-stage-5-notifications.md), `packages/radcn/src/components/toast.ts`, `fixtures/tests/notifications.spec.ts` | `toast` is the event helper for `sonner`, not a second visual primitive. |
| `resizable` | Core source | [Experiment 25](25-stage-5-application-shell-and-closure.md), `packages/radcn/src/components/resizable.tsx`, `fixtures/tests/application-shell.spec.ts` | Dependency-free panel group, panel, and separator handle with pointer and keyboard resizing replace `react-resizable-panels`. |
| `sidebar` | Core source | [Experiment 25](25-stage-5-application-shell-and-closure.md), `packages/radcn/src/components/sidebar.tsx`, `fixtures/tests/application-shell.spec.ts` | Server-rendered shell parts plus small enhancement replace React context, Radix Slot, CVA, mobile hook, and cookie-backed state. |

## Verification

- `pnpm radcn:typecheck` passed.
- `pnpm fixtures:candidate:typecheck` passed.
- `pnpm fixtures:reference:typecheck` passed with the existing React Router
  `module.register()` deprecation warning.
- `pnpm playwright test -c fixtures/playwright.config.ts fixtures/tests/application-shell.spec.ts`
  passed: 3 tests.
- `pnpm fixtures:artifacts` passed: 703 tests.
- `git status --short -- vendor` returned no output.

## Issue 2 Closure Audit

Do not close Issue 2 yet.

Stage 5 itself is complete, but the inventory-wide closure audit found one
remaining unresolved inventory row:

- `direction` appears in
  [Issue 1 component inventory](../0001-shadcn-port-scope/component-inventory.md)
  with a likely server-rendered/native `dir`-attribute disposition, but Issue 2
  does not yet contain a dedicated experiment, package source, fixture, test, or
  approved no-export disposition for it.

The next experiment should resolve `direction` explicitly. A likely outcome is
a documented no-export/native-attribute disposition, but that decision still
needs the normal design review, plan commit, verification, completion review,
and result commit before Issue 2 can close.
