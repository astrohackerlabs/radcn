# Spinner Example Inventory

Generated during Experiment 19 on 2026-06-06.

## Sources

- Upstream registry:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Upstream examples:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/spinner-*.tsx`
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-group-spinner.tsx`
- Upstream package:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/spinner.tsx`
- RadCN packages:
  `radcn/packages/radcn/src/components/spinner.tsx`
  `radcn/packages/radcn/src/components/button.tsx`
  `radcn/packages/radcn/src/components/badge.tsx`
  `radcn/packages/radcn/src/components/input-group.tsx`
  `radcn/packages/radcn/src/components/empty.tsx`
  `radcn/packages/radcn/src/components/item.tsx`
  `radcn/packages/radcn/src/components/progress.tsx`
  `radcn/packages/radcn/src/styles/tokens.css`
- RadCN docs:
  `radcn/apps/docs/app/content/components.tsx`
- RadCN fixtures:
  `radcn/fixtures/scenarios/index.ts`
  `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  `radcn/fixtures/candidate-remix/app/fixtures/input-group.tsx`
  `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  `radcn/fixtures/tests/static-display.spec.ts`
  `radcn/fixtures/tests/form-input-cluster.spec.ts`
  `radcn/fixtures/tests/navigation-collection.spec.ts`

## Summary

Spinner example parity is covered after Experiment 20. RadCN currently exports a package
`Spinner` that renders an SVG with `role="status"`, a default accessible name
of `Loading`, public `data-radcn-spinner` and part hooks, and CSS-variable
customization through `--radcn-spinner-size` and `--radcn-spinner-color`.
Docs and fixtures now prove standalone status semantics, Button loading rows,
Badge loading rows, InputGroup loading addons, Empty loading composition, Item
loading rows, Progress footer composition, size and color matrices, and
app-owned custom spinner replacement mapping.

The `spinner` example cluster can be marked resolved in
`resolved-clusters.json` and excluded from the unresolved recommendation queue.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `spinner-badge` | Three Badges with Spinner plus loading text across default, secondary, and outline badge variants. | Covered by rich Spinner docs, `/fixtures/spinner/badge`, and Playwright proof for Spinner inside default, secondary, and outline Badges with loading text. | Covered | None. |
| `spinner-basic` | Standalone centered Spinner with default status semantics. | Covered by package default `role="status"` and `aria-label="Loading"`, rich Spinner docs, `/fixtures/spinner/basic`, `/fixtures/spinner/default`, and Playwright proof. | Covered | None. |
| `spinner-button` | Disabled small Buttons in default, outline, and secondary variants containing Spinner and loading text. | Covered by rich Spinner docs, `/fixtures/spinner/button`, and Playwright proof for disabled Button loading rows with Spinner and text across default, outline, and secondary variants. | Covered | None. |
| `spinner-color` | Multiple Spinners with the same size and different foreground colors. | Covered by rich Spinner docs, `/fixtures/spinner/color`, and Playwright computed-color proof using `--radcn-spinner-color`, without Tailwind utility dependencies. | Covered | None. |
| `spinner-custom` | A locally defined custom Spinner using lucide `LoaderIcon`, `role="status"`, and `aria-label="Loading"`. | Covered as an intentional mapping: RadCN keeps its package-owned SVG and docs/fixtures prove app-owned custom status SVG replacement without lucide. | Covered | None. |
| `spinner-demo` | Muted Item row with Spinner in ItemMedia, primary title, and secondary amount content. | Covered by rich Spinner docs, `/fixtures/spinner/demo`, and Playwright proof for muted Item row, Spinner media, and secondary amount content. | Covered | None. |
| `spinner-empty` | Empty state with Spinner inside `EmptyMedia variant="icon"`, title, description, and Cancel Button. | Covered by rich Spinner docs, `/fixtures/spinner/empty`, and Playwright proof for Spinner inside Empty media with title, description, and Cancel Button. | Covered | None. |
| `spinner-input-group` | Disabled InputGroup examples with Spinner in addons and an InputGroupButton send action. | Covered by rich Spinner docs, direct `/fixtures/spinner/input-group` proof, prior Experiment 16 InputGroup evidence, and Playwright proof for disabled controls, addon Spinners, loading text, and send action. | Covered | None. |
| `spinner-item` | Outline Item with Spinner icon media, title, description, Cancel Button action, and Progress footer. | Covered by rich Spinner docs, `/fixtures/spinner/item`, and Playwright proof for Spinner in ItemMedia, Cancel Button action, and Progress footer. | Covered | None. |
| `spinner-size` | Spinners rendered at several sizes. | Covered by rich Spinner docs, `/fixtures/spinner/size`, and Playwright computed-width proof using `--radcn-spinner-size`, without Tailwind utility dependencies. | Covered | None. |

## Mapping Decisions

- RadCN should not depend on lucide for Spinner. Upstream `LoaderIcon` and
  `Loader2Icon` map to RadCN's package-owned SVG for the default Spinner, or
  to app-owned custom SVG/icon components when users need a different glyph.
- React `ComponentProps<"svg">` spreading is not a RadCN API requirement.
  RadCN should expose only deliberate Remix UI props. Current `class`, `style`,
  and `ariaLabel` cover the core customization path unless the implementation
  experiment proves a concrete package API gap.
- Tailwind `size-*` and `text-*` classes map to RadCN public class hooks,
  inline `style`, or CSS variables such as `--radcn-spinner-size` and
  `--radcn-spinner-color`; RadCN should not depend on Tailwind utility names.
- custom Spinner replacement is app-owned presentation, not a RadCN package
  dependency.
- Default standalone Spinner semantics are already covered: `role="status"` and
  default `aria-label="Loading"`.
- Loading text such as `Loading...`, `Please wait`, and `Processing` is
  composition beside Spinner, not Spinner-owned state.
- Button, Badge, InputGroup, Empty, Item, and Progress behavior stays owned by
  those package primitives. Spinner should remain a status/presentation
  primitive unless the implementation experiment proves a narrow API gap.
- The upstream `input-group-spinner` example belongs to the InputGroup example
  cluster and was addressed by Experiment 16, but Spinner parity should still
  record it as supporting evidence when proving Spinner loading composition in
  addons.
- Reduced-motion behavior is not explicitly covered by upstream examples.
  If implemented later, it should be treated as an accessibility improvement to
  Spinner animation styling rather than a required shadcn parity item.
- The audit should not assume DOM equivalence. The implementation target is
  equivalent visual loading feedback, accessibility, and author-facing
  customization.

## Next Recommendation

Regenerate `parity-inventory.md` with `spinner` recorded in
`resolved-clusters.json`, then follow the generated first recommendation for
the next unresolved example, block, chart, or package outcome cluster.
