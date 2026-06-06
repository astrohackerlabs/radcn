# Experiment 10: Implement button example parity depth

## Description

Experiment 9 audited all 13 upstream shadcn button examples and found concrete
Button example gaps. RadCN already has a native Button API, but it does not yet
cover the upstream `link` variant, `icon-sm`/`icon-lg` sizes, accessible
icon-only buttons, or proof for loading/icon/rounded/link examples.

This experiment implements Button example parity depth. It should keep RadCN's
web-first model: no React Slot, no React icon packages, no vendor imports, and
no npm publishing. shadcn's `asChild` maps to RadCN's explicit `href` anchor
path.

## Changes

- Update `radcn/packages/radcn/src/components/button.tsx`.
  - Add `link` to `ButtonVariant`.
  - Add `icon-sm` and `icon-lg` to `ButtonSize`.
  - Add an accessible-name prop for icon-only buttons, named `ariaLabel`, and
    render it as `aria-label` on both `<button>` and `<a>` outputs.
- Update RadCN styles:
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/packages/radcn/src/styles/index.ts`
  Add `.radcn-button--link`, `.radcn-button--icon-sm`, and
  `.radcn-button--icon-lg` rules that match RadCN tokens and shadcn-style
  sizing behavior.
- Update the docs component page in
  `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Button docs examples so the docs page demonstrates default,
    secondary, destructive, outline, ghost, link, icon-with-text, loading,
    icon-only, `href` link, rounded customization, and size variants.
  - Use inline SVG or package-compatible plain SVG markup for icons.
  - Compose loading examples with `radcn/spinner`; do not add a package-level
    loading prop.
  - Document that `href` is the RadCN mapping for shadcn's React-only
    `asChild` example.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/button.tsx`
  Add fixture scenarios for the missing example depth: link variant,
  icon-with-text, loading, icon-only accessible label, rounded customization,
  `href` link semantics, and complete text/icon sizing.
- Update Playwright coverage in `radcn/fixtures/tests/native-controls.spec.ts`.
  Verify:
  - link variant renders `data-variant="link"` and link styling hook;
  - `href` Button renders an anchor with `data-radcn-button` and the expected
    `href`;
  - icon-only Buttons expose the accessible name through `aria-label`;
  - `icon-sm`, `icon`, and `icon-lg` render distinct `data-size` values;
  - `icon-sm`, `icon`, and `icon-lg` render distinct CSS width and min-height
    values;
  - `sm`, default, and `lg` text Buttons render distinct min-height values;
  - loading composition renders a disabled Button with a nested Spinner;
  - rounded customization applies through author class or token hook.
- Update `issues/0004-complete-shadcn-parity-and-docs/button-example-inventory.md`.
  - Change each upstream row to Covered or intentional divergence after the new
    proof lands.
  - Preserve the mapping decisions from Experiment 9.
- Update `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Mark `button` as a resolved example cluster with evidence from Experiments
    9 and 10 plus `button-example-inventory.md`.
- Regenerate `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Update Issue 4 learnings with the final Button outcome and next generated
  recommendation.

## Verification

Pass criteria:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts native-controls.spec.ts`
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
- `node scripts/audit-shadcn-parity.mjs`
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  exits 0 and prints no diff.
- A deterministic Node check proves all 13 upstream button example ids appear
  exactly once in `button-example-inventory.md`.
- A deterministic Node check proves every upstream button example row has a
  final outcome of `Covered` or `Intentional divergence`, and that no row keeps
  a `Partial` or `Missing` outcome.
- A deterministic Node check proves `resolved-clusters.json` includes
  `button` in the `examples` queue.
- A deterministic Node check proves
  `radcn/packages/radcn/src/styles/index.ts` is exactly
  `export const radcnStyles = ${JSON.stringify(tokensCss)}\n` for
  `radcn/packages/radcn/src/styles/tokens.css`.
- `rg -n "Example parity for button|Audit upstream examples for button" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  exits 1 with no matches.
- `rg -n "ButtonVariant = .*'link'|ButtonSize = .*'icon-sm'.*'icon-lg'|ariaLabel" radcn/packages/radcn/src/components/button.tsx`
  finds the new Button API surface.
- `rg -n "lucide-react|@tabler/icons-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json issues/0004-complete-shadcn-parity-and-docs/button-example-inventory.md`
  exits 1 with no matches.
- `git diff --check`
- `git status --short` shows only expected package, docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Button still lacks `link`, `icon-sm`, `icon-lg`, or accessible-name support.
- Icon examples require React icon packages, vendored source, or client-only
  React semantics.
- The implementation ports shadcn `asChild`/Slot instead of using RadCN's
  explicit `href` anchor path.
- The audit inventory marks `button` resolved while any upstream button example
  still lacks package/docs/fixture/test evidence or a documented intentional
  divergence.
- The regenerated parity inventory still recommends `button` as the first
  unresolved example cluster.

## Design Review

Reviewer: Hume (`019e9a4a-b5aa-7c63-b04b-c4cfc77063d8`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: verification could pass while `button-example-inventory.md` still
  had `Partial` or `Missing` rows. Fixed by adding a deterministic final-outcome
  check that requires each upstream row to be `Covered` or
  `Intentional divergence`.
- Blocker: verification did not prove `tokens.css` and `styles/index.ts` remain
  synchronized. No style-generation script exists in `radcn/packages/radcn`; the
  plan now requires a deterministic Node comparison between `tokens.css` and
  the serialized `radcnStyles` export.
- Major: size verification only checked `data-size` values, not rendered size
  behavior. Fixed by requiring Playwright assertions for distinct icon
  width/min-height values and distinct text Button min-height values.

Review result: not approved until blockers are fixed. The findings above have
been addressed and require re-review before the plan commit.

Re-review result: approved with no blockers or major findings. Hume confirmed
the revised design now includes the final inventory outcome check, style
serialization check, and rendered-size assertions.
