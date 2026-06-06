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

Button example parity is complete after Experiment 10. RadCN now covers default
buttons, anchors via `href`, six variants, disabled states, form submit/reset,
author classes, loading composition, accessible icon-only buttons, and text/icon
size variants.

The only intentional divergence is shadcn's React-only `asChild` Slot pattern.
RadCN maps that behavior to the explicit `href` prop, which renders a real
anchor with Button styling.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `button-demo` | Outline text button beside outline icon-only button with accessible label. | `Button` supports `variant="outline"`, `size="icon"`, and `ariaLabel`; docs and fixture `button/icon-only` prove package-compatible inline SVG composition. | Covered | None. |
| `button-default` | Default primary button. | `Button` defaults to `variant="default"` and `size="default"`; docs preview renders a default Button; fixture `button/default` falls through to `<Button>Button</Button>`. | Covered | None. |
| `button-secondary` | Secondary variant. | `ButtonVariant` includes `secondary`; docs preview renders `variant="secondary"`; fixture `button/variants` renders Secondary. | Covered | None. |
| `button-destructive` | Destructive variant. | `ButtonVariant` includes `destructive`; docs preview and fixture `button/variants` render Destructive. | Covered | None. |
| `button-outline` | Outline variant. | `ButtonVariant` includes `outline`; docs preview and fixture `button/variants` render Outline. | Covered | None. |
| `button-ghost` | Ghost variant. | `ButtonVariant` includes `ghost`; docs preview and fixture `button/variants` render Ghost. | Covered | None. |
| `button-link` | Link-styled button variant. | `ButtonVariant` includes `link`; tokens add `.radcn-button--link`; docs and fixture `button/link-variant` prove `data-variant="link"` and the link styling hook. | Covered | None. |
| `button-with-icon` | Small outline button with leading icon and text. | `Button` accepts arbitrary children and supports `variant="outline"` and `size="sm"`; docs and fixture `button/with-icon` prove inline SVG plus text composition without React icon dependencies. | Covered | None. |
| `button-loading` | Disabled small outline button with spinner and text. | `Button disabled` composes with `radcn/spinner`; docs and fixture `button/loading` prove disabled Button plus nested Spinner. | Covered | None. |
| `button-icon` | Outline icon-only button. | `Button` supports `size="icon"` and `ariaLabel`; docs and fixture `button/icon-only` prove accessible icon-only Button output. | Covered | None. |
| `button-as-child` | Button styling applied to a link. | shadcn's React `asChild`/Slot behavior maps to RadCN's explicit `href` anchor path. Docs and fixture `button/as-child-or-link` prove a real anchor with `data-radcn-button`. | Intentional divergence | None. |
| `button-rounded` | Icon button customized to full radius. | `Button` accepts `class`; docs and fixture `button/rounded` prove rounded icon customization through `radcn-fixture-rounded-button`. | Covered | None. |
| `button-size` | Small/default/large text buttons and small/default/large icon buttons with accessible labels. | `ButtonSize` supports `sm`, `default`, `lg`, `icon-sm`, `icon`, and `icon-lg`; docs and fixture `button/sizes` prove text and icon sizes with accessible labels. | Covered | None. |

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
  not React-only icon packages, React components, or vendor imports.
- rounded buttons are author customization, not a package variant. RadCN should
  prove this with `class` or token customization.

## Resolution

`button` can be marked resolved in `resolved-clusters.json` after Experiment 10
verification passes. The regenerated parity inventory should advance to the
next unresolved example cluster.
