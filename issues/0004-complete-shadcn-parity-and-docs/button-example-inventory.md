# Button Example Inventory

Generated during Experiment 9 on 2026-06-05.

## Sources

- Upstream registry:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Upstream examples:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/button-*.tsx`
- RadCN package:
  `radcn/packages/radcn/src/components/button.tsx`
- RadCN docs:
  `radcn/apps/docs/app/content/components.tsx`
- RadCN fixtures:
  `radcn/fixtures/scenarios/index.ts`
  `radcn/fixtures/candidate-remix/app/fixtures/button.tsx`
  `radcn/fixtures/tests/native-controls.spec.ts`

## Summary

Button example parity is not complete yet. RadCN has a solid native package API
for default buttons, anchors via `href`, five variants, disabled states, form
submit/reset, and author classes. The upstream examples expose several missing
or under-proven surfaces:

- `variant="link"` is not a supported RadCN Button variant.
- `icon-sm` and `icon-lg` are not supported RadCN Button sizes.
- icon-only buttons need an author-facing accessible-name prop such as
  `ariaLabel`.
- loading, icon-with-text, icon-only, rounded, and link-button examples need
  docs/fixture/Playwright proof.

Do not mark the `button` example cluster resolved yet. The next experiment
should implement the missing Button example parity depth.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `button-demo` | Outline text button beside outline icon-only button with accessible label. | `Button` supports `variant="outline"` and `size="icon"`; docs render outline buttons; fixtures render size `icon` but use text content instead of an accessible-label prop. | Partial | Add icon-only Button proof with `ariaLabel` and package-compatible SVG/icon composition. |
| `button-default` | Default primary button. | `Button` defaults to `variant="default"` and `size="default"`; docs preview renders a default Button; fixture `button/default` falls through to `<Button>Button</Button>`. | Covered | None. |
| `button-secondary` | Secondary variant. | `ButtonVariant` includes `secondary`; docs preview renders `variant="secondary"`; fixture `button/variants` renders Secondary. | Covered | Add stronger example-cluster assertions in the implementation experiment. |
| `button-destructive` | Destructive variant. | `ButtonVariant` includes `destructive`; fixture `button/variants` renders Destructive. | Covered | Add stronger example-cluster assertions in the implementation experiment. |
| `button-outline` | Outline variant. | `ButtonVariant` includes `outline`; docs preview and fixture `button/variants` render Outline. | Covered | Add stronger example-cluster assertions in the implementation experiment. |
| `button-ghost` | Ghost variant. | `ButtonVariant` includes `ghost`; fixture `button/variants` renders Ghost. | Covered | Add stronger example-cluster assertions in the implementation experiment. |
| `button-link` | Link-styled button variant. | `ButtonVariant` does not include `link`, and `tokens.css` has no `.radcn-button--link` rule. RadCN has anchor rendering through `href`, but not link visual styling. | Missing | Add `link` variant support and docs/fixture/test proof. |
| `button-with-icon` | Small outline button with leading icon and text. | `Button` accepts arbitrary children and supports `variant="outline"` and `size="sm"`; no current Button docs/fixture proves package-compatible icon composition. | Partial | Add icon-with-text example using inline SVG or a non-React icon source. |
| `button-loading` | Disabled small outline button with spinner and text. | `Button` supports `disabled`, `variant="outline"`, and `size="sm"`; `Spinner` is exported as `radcn/spinner`; no current Button docs/fixture composes them. | Partial | Add Button plus Spinner loading composition proof. |
| `button-icon` | Outline icon-only button. | `Button` supports `size="icon"` but lacks `ariaLabel`; current fixture uses a `+` text character instead of icon-only accessible-name proof. | Partial | Add `ariaLabel` support and icon-only docs/fixture/test proof. |
| `button-as-child` | Button styling applied to a link. | shadcn's React `asChild`/Slot behavior maps to RadCN's explicit `href` anchor path. Fixture `button/as-child-or-link` renders `<Button href="/fixtures/button/default">Link Button</Button>`. | Partial | Add test/docs proof that `href` renders an anchor with button styling and real link semantics. |
| `button-rounded` | Icon button customized to full radius. | `Button` accepts `class`, and `native-controls.spec.ts` proves author class styling through `radcn-fixture-custom-button`; no rounded Button example exists. | Partial | Add rounded icon customization proof with `class` or token override. |
| `button-size` | Small/default/large text buttons and small/default/large icon buttons with accessible labels. | `ButtonSize` supports `sm`, `default`, `lg`, and `icon`; it does not support `icon-sm` or `icon-lg`, and lacks `ariaLabel` for icon-only buttons. | Missing | Add `icon-sm` and `icon-lg` sizes plus accessible icon-size docs/fixture/test proof. |

## Mapping Decisions

- shadcn's `asChild` is a React Slot mechanism. RadCN should not port Slot.
  The RadCN equivalent is the explicit `href` prop, which renders an `<a>` with
  `data-radcn-button` and Button classes.
- shadcn `variant="link"` is a real Button visual variant, distinct from anchor
  rendering. RadCN should add it instead of treating `href` as equivalent.
- shadcn `icon-sm` and `icon-lg` are size variants for square icon buttons.
  RadCN should add equivalent Button sizes rather than forcing app CSS for
  common upstream examples.
- loading buttons should remain composition: `Button disabled` plus
  `Spinner`. No package-level loading state is required.
- icon examples should use inline SVG or a package-compatible plain SVG source,
  not `lucide-react`, `@tabler/icons-react`, React components, or vendor
  imports.
- rounded buttons are author customization, not a package variant. RadCN should
  prove this with `class` or token customization.

## Next Recommendation

Implement Button example parity depth:

- add `link`, `icon-sm`, and `icon-lg` support to `radcn/button`;
- add accessible-name support for icon-only Buttons;
- expand docs and candidate fixtures for link, loading, icon-with-text,
  icon-only, rounded, and size examples;
- add Playwright coverage for the expanded Button example cluster;
- then mark `button` resolved in `resolved-clusters.json` and regenerate
  `parity-inventory.md`.
