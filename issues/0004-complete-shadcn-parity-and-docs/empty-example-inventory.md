# Empty Example Inventory

Generated during Experiment 21 on 2026-06-06.

## Sources

- Upstream registry:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Upstream examples:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/empty-*.tsx`
- Upstream package:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/empty.tsx`
- RadCN packages:
  `radcn/packages/radcn/src/components/empty.tsx`
  `radcn/packages/radcn/src/components/avatar.tsx`
  `radcn/packages/radcn/src/components/button.tsx`
  `radcn/packages/radcn/src/components/input-group.tsx`
  `radcn/packages/radcn/src/components/kbd.tsx`
  `radcn/packages/radcn/src/components/spinner.tsx`
  `radcn/packages/radcn/src/styles/tokens.css`
- RadCN docs:
  `radcn/apps/docs/app/content/components.tsx`
- RadCN fixtures:
  `radcn/fixtures/scenarios/index.ts`
  `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  `radcn/fixtures/tests/static-display.spec.ts`

## Summary

Empty example parity is not complete yet. RadCN currently exports the core
upstream Empty parts: `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`,
`EmptyDescription`, and `EmptyContent`. Existing fixtures prove the basic
package slots, the default media hook, the `variant="icon"` media hook, and one
Spinner loading composition from the Spinner cluster.

That coverage proves the primitive, but it does not yet cover the full upstream
Empty example surface.

The missing Empty parity depth is:

- richer default Empty composition with multiple Button actions and a
  link-style action;
- representative icon media grids;
- Avatar and stacked-avatar media composition;
- InputGroup search composition with Kbd addon and support/help link;
- outline/dashed and muted/background surface styling examples;
- documented mappings for shadcn `asChild`, lucide icons, Tabler icons,
  Tailwind utility classes, remote GitHub avatar images, and link composition.

Do not mark the `empty` example cluster resolved yet. The next experiment
should implement Empty example parity depth.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `empty-avatar` | Empty state with Avatar media, offline user title/description, and Leave Message Button. Uses remote GitHub avatar image and grayscale/size utilities. | RadCN has Avatar, AvatarFallback, AvatarImage, Button, and Empty media primitives, but current Empty fixtures/docs do not prove Avatar composition inside EmptyMedia or remote image mapping. | Partial | Add docs/fixtures/Playwright proof for Avatar media inside Empty and map remote GitHub images to local/static/app-owned image choices or AvatarFallback. |
| `empty-avatar-group` | Empty state with stacked Avatar media, invite copy, and Invite Members Button with icon. Uses remote GitHub avatar images, Tailwind stack/ring/grayscale utilities, and lucide Plus icon. | RadCN has AvatarGroup, Avatar, Button, and Empty primitives, but current Empty fixtures/docs do not prove stacked-avatar media composition or invite action parity. | Partial | Add stacked Avatar/AvatarGroup Empty proof and map lucide icon plus utility styling to app-owned glyphs/classes/styles. |
| `empty-background` | Full-height muted/background Empty state with icon media, title/description, and outline Refresh Button. Uses Tabler bell icon, lucide refresh icon, and gradient utility classes. | RadCN supports Empty class/style hooks and Button variants, but current fixtures do not prove muted/background surface customization or icon-button composition in Empty. | Partial | Add background/muted Empty proof using RadCN classes/styles/CSS variables and record icon packages as presentation choices. |
| `empty-demo` | Default project Empty state with icon media, title/description, primary Create Project Button, outline Import Project Button, and link-style Learn More action using `asChild`. | Current default Empty fixture proves one media/title/description/action composition, but not multiple action buttons, link-style action, or `asChild` mapping. | Partial | Add richer default Empty proof with multiple actions and explicit RadCN link behavior instead of shadcn `asChild`. |
| `empty-icon` | Grid of four Empty states with icon media and distinct titles/descriptions for messages, favorites, likes, and bookmarks. Uses Tabler icons. | Current icon fixture proves one `EmptyMedia variant="icon"` case, but not a representative icon grid or multiple Empty states. | Partial | Add docs/fixtures/Playwright proof for a multi-empty icon grid and map Tabler icons to app-owned glyphs/assets. |
| `empty-input-group` | 404 Empty state with title/description, InputGroup search field, Search icon addon, inline-end Kbd addon, and support link in description. | RadCN has InputGroup and Kbd packages, but current Empty fixtures/docs do not prove InputGroup/Kbd composition inside EmptyContent or support link copy. | Missing | Add InputGroup search proof inside EmptyContent with Kbd addon and support link semantics. |
| `empty-outline` | Dashed outline Empty state with icon media, cloud storage title/description, and outline Upload Files Button. Uses Tabler cloud icon and border utility classes. | Current Empty base style already has dashed border, and Button outline exists, but current fixtures/docs do not prove the upstream outline example as a named parity case. | Partial | Add explicit outline Empty proof and map Tabler icon plus utility border styling to RadCN hooks/styles. |

## Mapping Decisions

- RadCN should not port shadcn's `asChild` or Radix Slot mechanics directly.
  Link-style Empty actions should map to explicit RadCN `Button href` or native
  anchor composition.
- Lucide icons and Tabler icons are presentation choices. Empty parity should
  verify icon media, button affordances, and accessible text without adding
  icon packages as RadCN dependencies.
- Tailwind utility classes map to RadCN public class hooks, inline `style`, or
  CSS variables; RadCN should not depend on Tailwind utility names.
- Remote GitHub avatar images are content choices, not package requirements.
  Docs/fixtures should avoid depending on remote images and can use local/static
  assets, generated assets, app-owned images, or AvatarFallback where the
  user-facing behavior is equivalent.
- Avatar, AvatarGroup, Button, InputGroup, Kbd, Spinner, and link behavior stay
  owned by those package primitives or app-owned markup. Empty should remain a
  layout/content primitive unless the implementation experiment proves a narrow
  package API gap.
- Empty outline, muted, and background examples should be treated as styling
  and composition parity over public hooks rather than new stateful package
  behavior.
- The audit should not assume DOM equivalence. The implementation target is
  equivalent visual empty-state composition, accessibility, and author-facing
  customization.

## Next Recommendation

Implement Empty example parity depth:

- add docs and candidate fixtures for all 7 upstream Empty examples;
- add focused Playwright coverage for default multi-action Empty states, icon
  grids, Avatar media, stacked-avatar media, InputGroup/Kbd search composition,
  outline styling, muted/background styling, link-style actions, and support
  links;
- decide whether the existing Empty parts and style hooks are enough for
  upstream outline/background parity or whether narrow style hooks are needed;
- record intentional divergences for `asChild`, lucide icons, Tabler icons,
  Tailwind utilities, remote GitHub avatar images, and ownership of composed
  primitives;
- then mark `empty` resolved in `resolved-clusters.json` and regenerate
  `parity-inventory.md`.
