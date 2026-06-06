# Experiment 20: Implement spinner example parity depth

## Description

Experiment 19 audited all 10 upstream shadcn Spinner examples and found that
RadCN's primitive `Spinner` is solid, but example parity depth is not complete.
Current proof covers standalone `role="status"` semantics, a default
`aria-label="Loading"`, public spinner hooks, and one custom size/color class.
It does not yet prove Spinner in Button loading rows, Badge loading rows,
InputGroup loading addons from the Spinner cluster, Empty media, Item loading
rows, Progress footer composition, size and color matrices, or custom spinner
replacement mapping.

This experiment implements that Spinner parity depth. It should preserve
RadCN's Remix 3 model: no React dependency, no lucide dependency, no Tailwind
dependency, no vendor imports, no custom spinner replacement as a package
dependency, and no npm publishing.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Spinner docs page from seed coverage into rich docs.
  - Demonstrate all 10 upstream Spinner example families: `badge`, `basic`,
    `button`, `color`, `custom`, `demo`, `empty`, `input-group`, `item`, and
    `size`.
  - Document that upstream lucide `LoaderIcon`/`Loader2Icon` maps to RadCN's
    package-owned SVG by default, or to app-owned custom SVG/icon components
    when users intentionally replace the visual glyph.
  - Document that React SVG prop spreading maps to deliberate Remix UI props,
    public class hooks, inline styles, and CSS variables.
  - Document that Tailwind `size-*` and `text-*` utilities map to RadCN
    classes, `style`, or `--radcn-spinner-size` /
    `--radcn-spinner-color`.
  - Keep install copy aspirational and do not claim RadCN is published.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  Add fixture scenarios for all 10 upstream Spinner examples:
  `badge`, `basic`, `button`, `color`, `custom`, `demo`, `empty`,
  `input-group`, `item`, and `size`. Preserve the existing `default` and
  `custom-size` scenarios unless a replacement intentionally proves the same
  behavior.
  - Implement Spinner-cluster InputGroup proof as `/fixtures/spinner/input-group`
    inside `static-display.tsx`. Existing `/fixtures/input-group/spinner`
    remains prior InputGroup-cluster evidence, but the Spinner cluster gets its
    own scenario so the resolved Spinner inventory can cite direct proof.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/static-display.spec.ts` or a focused Spinner spec if
  that keeps the suite clearer. Verify:
  - standalone Spinner keeps `role="status"` and default
    `aria-label="Loading"`;
  - custom accessible labels still work;
  - size matrix rows render distinct visible dimensions through public
    class/style/CSS-variable customization;
  - color matrix rows render distinct computed colors through public
    class/style/CSS-variable customization;
  - Button loading rows render disabled Buttons with nested Spinners and
    loading text across default, outline, and secondary variants;
  - Badge loading rows render Spinners inside default, secondary, and outline
    Badges with loading text;
  - InputGroup loading composition renders disabled controls, addon Spinners,
    loading text, and a send action while InputGroup owns group/control state;
  - Empty loading composition renders Spinner inside `EmptyMedia
    variant="icon"`, title, description, and Cancel Button;
  - Item loading demo renders Spinner in ItemMedia and secondary amount
    content;
  - Item loading/progress composition renders Spinner in ItemMedia, Cancel
    Button action, and Progress footer;
  - custom spinner replacement is documented or fixture-proved as app-owned
    presentation with `role="status"` and an accessible name, without importing
    lucide.
- Update `issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md`.
  - Change each upstream row to `Covered` or `Intentional divergence` after the
    new proof lands.
  - Preserve mapping decisions from Experiment 19.
- Update `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Mark `spinner` as a resolved example cluster with evidence from
    Experiments 19 and 20 plus `spinner-example-inventory.md`.
- Regenerate `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Update Issue 4 learnings with the final Spinner outcome and the next
  generated recommendation.
- Update `radcn/packages/radcn/src/components/spinner.tsx`,
  `radcn/packages/radcn/src/styles/tokens.css`, and generated
  `radcn/packages/radcn/src/styles/index.ts` only if implementation proves a
  concrete package/style gap. Prefer existing `class`, `style`,
  `ariaLabel`, `--radcn-spinner-size`, and `--radcn-spinner-color`.

## Verification

Pass criteria:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts`
  or the focused Spinner Playwright spec created by this experiment.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
- `node scripts/audit-shadcn-parity.mjs`
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  exits 0 and prints no diff.
- A deterministic Node check proves all 10 upstream Spinner example ids appear
  exactly once in `spinner-example-inventory.md`.
- A deterministic Node check proves every upstream Spinner example row has a
  final outcome of `Covered` or `Intentional divergence`, and that no row keeps
  a `Partial` or `Missing` outcome.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "spinner"`, `status = "resolved"`, and
  evidence for Experiment 19, Experiment 20, and
  `spinner-example-inventory.md`.
- If `tokens.css` changes, a deterministic Node check proves
  `radcn/packages/radcn/src/styles/index.ts` is exactly
  `export const radcnStyles = ${JSON.stringify(tokensCss)}\n` for
  `radcn/packages/radcn/src/styles/tokens.css`.
- A deterministic Node check proves `spinner` is absent from
  `## Unresolved Example Clusters` and is not the `## First Recommended
  Cluster` in `parity-inventory.md`.
- Positive documentation checks prove
  `issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md`
  still records intentional mappings for lucide `LoaderIcon`/`Loader2Icon`,
  React SVG prop spreading, Tailwind `size-*`/`text-*` utilities, custom
  spinner replacement, and composed loading-state ownership.
- A deterministic docs check proves `radcn/apps/docs/app/content/components.tsx`
  contains the 10 intended Spinner example family labels or slugs (`badge`,
  `basic`, `button`, `color`, `custom`, `demo`, `empty`, `input-group`,
  `item`, `size`) and the required mapping copy for lucide, React SVG props,
  Tailwind utilities, custom spinner replacement, and app-owned composed
  loading states.
- A focused docs Playwright assertion or deterministic source check proves the
  Spinner docs page renders package-backed Spinner examples for the family
  matrix rather than only the generic seed preview.
- A targeted Tailwind-avoidance check proves Spinner docs, fixtures, and source
  snippets do not use Tailwind utility classes such as `size-3`, `size-4`,
  `size-6`, `size-8`, `text-red-500`, `text-green-500`, `text-blue-500`,
  `text-yellow-500`, or `text-purple-500` as implementation examples. Mentions
  of Tailwind utility names are allowed only in issue inventory or docs
  divergence/mapping prose.
- `rg -n "from ['\"]react['\"]|from ['\"][^'\"]*lucide-react|from ['\"][^'\"]*@tabler/icons-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
  exits 1 with no matches.
- `git diff --check`
- `git status --short` shows only expected package, docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Spinner still lacks proof for any audited upstream example family.
- Spinner examples depend on React, lucide, Tailwind, vendor imports, or npm
  publishing.
- Docs or fixtures imply Spinner owns Button, Badge, InputGroup, Empty, Item,
  or Progress state.
- Custom spinner replacement is treated as a RadCN package dependency instead
  of app-owned presentation.
- The audit inventory marks `spinner` resolved while any upstream Spinner
  example still lacks package/docs/fixture/test evidence or a documented
  intentional divergence.
- The regenerated parity inventory still recommends `spinner` as the first
  unresolved example cluster.

## Design Review

Reviewer: Turing (`019e9abf-eb4b-7973-92ab-49845adcf243`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: the original verification only ran generic docs coverage and
  inventory checks, but did not directly prove the expanded Spinner docs contain
  all 10 example families or the required divergence/mapping copy. Fixed by
  adding deterministic docs checks and focused docs render/source proof for the
  Spinner docs page.
- Major: the original dependency grep did not mechanically guard against
  Tailwind utility strings in Spinner implementation examples. Fixed by adding
  a targeted Tailwind-avoidance check over Spinner docs, fixtures, and source
  snippets, while allowing mentions only in issue inventory or
  divergence/mapping prose.
- Minor: the fixture scope for InputGroup proof was ambiguous because existing
  `input-group/spinner` proof lives in the InputGroup fixture, while the
  Spinner changes only named `static-display.tsx`. Fixed by clarifying that the
  Spinner cluster gets a direct `/fixtures/spinner/input-group` scenario in
  `static-display.tsx`, while existing `/fixtures/input-group/spinner` remains
  prior InputGroup evidence.

Approval result: approved. Turing confirmed there were no blockers, the plan
follows the issue workflow, is linked as `Designed`, includes required sections
and hygiene checks, and does not start implementation before the plan commit.

## Result

**Result:** Pass

Implemented Spinner example parity depth without changing the Spinner package
API.

- `radcn/apps/docs/app/content/components.tsx` now has rich Spinner docs with a
  live package-backed example matrix for `badge`, `basic`, `button`, `color`,
  `custom`, `demo`, `empty`, `input-group`, `item`, and `size`.
- `radcn/fixtures/scenarios/index.ts` and
  `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx` now expose
  direct `/fixtures/spinner/*` scenarios for all 10 upstream Spinner example
  families.
- `radcn/fixtures/tests/static-display.spec.ts` now proves standalone status
  semantics, custom labels, size and color matrices, disabled Button loading
  rows, Badge loading rows, InputGroup addon loading rows, Empty loading
  composition, Item secondary content, Item Progress footer composition, and
  app-owned custom status SVG replacement.
- `issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md`
  now marks all 10 upstream Spinner examples `Covered` and preserves mapping
  decisions for lucide icons, React SVG prop spreading, Tailwind utility
  mapping, custom Spinner replacement, and composed loading-state ownership.
- `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json` marks
  the `spinner` example cluster resolved, and regenerated
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` no longer
  lists `spinner` as unresolved. The first generated recommendation is now
  example parity for `empty`.

Verification run:

- `pnpm radcn:typecheck` passed.
- `pnpm --dir radcn/apps/docs typecheck` passed.
- `pnpm fixtures:candidate:typecheck` passed.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts`
  passed: 7 tests passed. The run printed the existing Node
  `module.register()` deprecation warning.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  passed: 5 tests passed. The run printed the existing Node
  `module.register()` deprecation warning.
- `node scripts/audit-shadcn-parity.mjs` passed and regenerated
  `parity-inventory.md`.
- The parity regeneration no-diff check passed after regeneration.
- Deterministic Node checks passed for:
  - all 10 upstream Spinner example ids appearing exactly once in
    `spinner-example-inventory.md`;
  - every upstream Spinner example row having a final outcome of `Covered` or
    `Intentional divergence`;
  - `resolved-clusters.json` containing `examples` entry `slug = "spinner"`,
    `status = "resolved"`, and evidence for Experiment 19, Experiment 20, and
    `spinner-example-inventory.md`;
  - `spinner` being absent from `## Unresolved Example Clusters` and not the
    `## First Recommended Cluster`;
  - `radcn/apps/docs/app/content/components.tsx` containing all 10 Spinner docs
    family hooks and required mapping copy for lucide, React SVG props,
    Tailwind utilities, custom spinner replacement, and app-owned composed
    loading states;
  - `spinner-example-inventory.md` retaining mapping records for lucide
    `LoaderIcon`/`Loader2Icon`, React SVG prop spreading, Tailwind
    `size-*`/`text-*` utilities, custom Spinner replacement, and composed
    loading-state ownership.
- The targeted Tailwind-avoidance check passed for Spinner docs, fixture
  markup, and tests: no implementation example uses `size-3`, `size-4`,
  `size-6`, `size-8`, `text-red-500`, `text-green-500`, `text-blue-500`,
  `text-yellow-500`, or `text-purple-500`.
- The dependency and scope scan passed:
  - `rg -n "from ['\"]react['\"]|from ['\"][^'\"]*lucide-react|from ['\"][^'\"]*@tabler/icons-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
    exited 1 with no matches.
- `git diff --check` passed.
- `git status --short` showed only expected docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before result recording.
  No `radcn/packages/radcn/src/components/spinner.tsx` change was needed.
- After result recording, the current pre-review status was:
  ```text
   M issues/0004-complete-shadcn-parity-and-docs/20-implement-spinner-example-parity-depth.md
   M issues/0004-complete-shadcn-parity-and-docs/README.md
   M issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md
   M issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json
   M issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md
   M radcn/apps/docs/app/content/components.tsx
   M radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx
   M radcn/fixtures/scenarios/index.ts
   M radcn/fixtures/tests/static-display.spec.ts
  ```
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  printed no output.

## Conclusion

Spinner example parity depth is complete. The existing Spinner API was enough:
`ariaLabel`, `class`, `style`, `--radcn-spinner-size`, and
`--radcn-spinner-color` cover the upstream user-facing size, color, status, and
customization needs without React, lucide, Tailwind, vendor imports, or custom
spinner replacement as a package dependency. The cluster is resolved in the
generated parity inventory, and the next Issue 4 experiment should audit the
generated first recommendation: `empty` example parity.

## Completion Review

Reviewer: Zeno (`019e9ac9-edc1-70d1-b1a1-f1f50370aeb5`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Review result: approved. Zeno confirmed the implementation satisfies the
approved scope and RadCN workflow contract; the experiment has `## Result` and
`## Conclusion`; the Issue 4 README status is `Pass` and records learnings;
Spinner docs include direct family coverage; fixture tests directly cover
Spinner parity; and the result commit had not been made before review.

Zeno independently reran the main verification checks:
`pnpm radcn:typecheck`, `pnpm --dir radcn/apps/docs typecheck`,
`pnpm fixtures:candidate:typecheck`,
`pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts`,
`pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`,
`node scripts/audit-shadcn-parity.mjs`, `git diff --check`, vendor status
checks, forbidden React/lucide/vendor/publish scan, and the targeted Tailwind
utility scan. All passed.
