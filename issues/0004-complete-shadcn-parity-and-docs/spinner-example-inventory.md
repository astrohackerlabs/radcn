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

Spinner example parity is not complete yet. RadCN currently exports a package
`Spinner` that renders an SVG with `role="status"`, a default accessible name
of `Loading`, public `data-radcn-spinner` and part hooks, and CSS-variable
customization through `--radcn-spinner-size` and `--radcn-spinner-color`.
Existing fixtures prove the default status semantics and one custom-size/color
class.

That coverage proves the primitive, but it does not yet cover the full upstream
Spinner example surface.

The missing Spinner parity depth is:

- richer docs and fixture proof for Spinner inside Button loading rows;
- Badge loading composition;
- Spinner color and size matrices;
- custom spinner replacement mapping;
- Spinner inside Empty media;
- Spinner inside Item media with secondary amount/duration-style content;
- Spinner inside Item media plus Progress footer composition;
- richer InputGroup loading evidence tied to the Spinner cluster, while
  recognizing that `input-group-spinner` was already covered during
  InputGroup parity;
- documented mappings for lucide `LoaderIcon`/`Loader2Icon`, React SVG props,
  and Tailwind `size-*`/`text-*` utility classes.

Do not mark the `spinner` example cluster resolved yet. The next experiment
should implement Spinner example parity depth.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `spinner-badge` | Three Badges with Spinner plus loading text across default, secondary, and outline badge variants. | RadCN has `Badge` and `Spinner`, but current Spinner fixtures/docs do not prove Spinner composition inside Badge variants. | Partial | Add docs/fixtures/Playwright proof for Spinner inside default, secondary, and outline Badges with loading text. |
| `spinner-basic` | Standalone centered Spinner with default status semantics. | Current package renders `role="status"` with default `aria-label="Loading"`, and `/fixtures/spinner/default` plus `static-display.spec.ts` prove those semantics. | Covered | None for primitive behavior; include the standalone example in richer docs for completeness if implementing the cluster. |
| `spinner-button` | Disabled small Buttons in default, outline, and secondary variants containing Spinner and loading text. | RadCN has Button disabled state, variants, sizes, and Spinner, but current Spinner fixtures do not prove Button loading composition. | Partial | Add docs/fixtures/Playwright proof for disabled Button loading rows with Spinner and text across the relevant variants. |
| `spinner-color` | Multiple Spinners with the same size and different foreground colors. | Current custom-size fixture proves one CSS-variable color override, but not a color matrix or docs guidance for color customization. | Partial | Add color matrix proof using RadCN classes, styles, or CSS variables without depending on Tailwind utility names. |
| `spinner-custom` | A locally defined custom Spinner using lucide `LoaderIcon`, `role="status"`, and `aria-label="Loading"`. | RadCN package intentionally owns its own SVG and does not depend on lucide. Current docs do not document custom replacement behavior. | Partial | Document custom Spinner replacement as app-owned presentation: keep status semantics and accessible labels, but do not add lucide as a package dependency. |
| `spinner-demo` | Muted Item row with Spinner in ItemMedia, primary title, and secondary amount content. | RadCN has Item, ItemMedia, secondary ItemContent, muted variant, and Spinner, but current Spinner fixtures do not prove this composition. | Partial | Add Spinner-specific Item demo proof with secondary content and accessible status naming. |
| `spinner-empty` | Empty state with Spinner inside `EmptyMedia variant="icon"`, title, description, and Cancel Button. | RadCN has Empty, EmptyMedia, Button, and Spinner, but current Spinner fixtures/docs do not prove Empty loading composition. | Missing | Add docs/fixtures/Playwright proof for Spinner inside Empty media with title, description, and action. |
| `spinner-input-group` | Disabled InputGroup examples with Spinner in addons and an InputGroupButton send action. | Experiment 16 covered InputGroup spinner loading behavior and disabled inputs. Spinner-specific docs/fixtures do not yet connect that evidence to the Spinner cluster. | Partial | Reuse or add focused Spinner-cluster proof for InputGroup loading composition, and record the related `input-group-spinner` upstream example as prior InputGroup evidence. |
| `spinner-item` | Outline Item with Spinner icon media, title, description, Cancel Button action, and Progress footer. | RadCN has Item, Button, Progress, and Spinner, but current Spinner fixtures do not prove Spinner plus Progress composition inside Item. | Partial | Add docs/fixtures/Playwright proof for Spinner in ItemMedia, Cancel Button action, and Progress footer. |
| `spinner-size` | Spinners rendered at several sizes. | Current custom-size fixture proves one `--radcn-spinner-size` value of 2rem; it does not prove a size matrix. | Partial | Add size matrix proof using class/style/CSS variables and visible computed dimensions. |

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

Implement Spinner example parity depth:

- add docs and candidate fixtures for the missing or partial Spinner examples;
- add focused Playwright coverage for Button, Badge, InputGroup, Empty, Item,
  Progress, size, color, custom replacement, and standalone status semantics;
- decide whether the existing CSS-variable customization is enough for
  upstream size/color parity or whether Spinner needs explicit size/color
  props;
- record intentional divergences for lucide icons, React SVG prop spreading,
  Tailwind utility classes, custom spinner replacement, and ownership of
  composed loading states;
- then mark `spinner` resolved in `resolved-clusters.json` and regenerate
  `parity-inventory.md`.
