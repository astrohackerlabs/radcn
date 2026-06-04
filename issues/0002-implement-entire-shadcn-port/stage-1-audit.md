# Stage 1 Audit

Audit date: 2026-06-04

Stage 1 is complete. Every Stage 1 component listed in Issue 2 has a final
ported disposition with RadCN source, package exports, reference and candidate
fixtures, artifact coverage, component-specific checks, documentation, and
independent review coverage.

## Evidence

- Source root: `packages/radcn/src/components/`
- Package exports: `packages/radcn/package.json`
- Root exports: `packages/radcn/src/index.ts`
- Candidate fixtures: `fixtures/candidate-remix/app/fixtures/`
- Reference fixtures: `fixtures/reference-react-router/app/fixtures/`
- Shared scenarios: `fixtures/scenarios/index.ts`
- Component-specific checks:
  - `fixtures/tests/native-controls.spec.ts`
  - `fixtures/tests/static-display.spec.ts`
  - `fixtures/tests/navigation-collection.spec.ts`
  - `fixtures/tests/native-select.spec.ts`
- Documentation: `docs/radcn-source.md`
- Artifact command: `pnpm fixtures:artifacts`
- Experiment 4 verification: `pnpm fixtures:artifacts` passed with 139 tests.
- Latest artifact manifest evidence from Experiment 4: 120 paired screenshots
  across 60 scenarios, including 8 `native-select` scenarios for both
  reference and candidate apps.

## Component Matrix

| Component | Source and exports | Fixtures and artifacts | Component checks | Docs | Review | Disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `button` | `packages/radcn/src/components/button.tsx`, root and subpath exports | `button/*` scenarios in reference and candidate apps | `native-controls.spec.ts` | `docs/radcn-source.md` | Experiment 1 | Ported |
| `input` | `packages/radcn/src/components/input.tsx`, root and subpath exports | `field/input-*` scenarios in reference and candidate apps | `native-controls.spec.ts` | `docs/radcn-source.md` | Experiment 1 | Ported |
| `field` | `packages/radcn/src/components/field.tsx`, root and subpath exports | `field/*` scenarios in reference and candidate apps | `native-controls.spec.ts` | `docs/radcn-source.md` | Experiment 1 | Ported |
| `label` | `packages/radcn/src/components/label.tsx`, root and subpath exports | `field/*`, `textarea/*`, and `native-select/*` scenarios | `native-controls.spec.ts`, `native-select.spec.ts` | `docs/radcn-source.md` | Experiment 1 | Ported |
| `textarea` | `packages/radcn/src/components/textarea.tsx`, root and subpath exports | `textarea/*` scenarios in reference and candidate apps | `native-controls.spec.ts` | `docs/radcn-source.md` | Experiment 1 | Ported |
| `native-select` | `packages/radcn/src/components/native-select.tsx`, root and subpath exports | `native-select/*` scenarios in reference and candidate apps | `native-select.spec.ts` | `docs/radcn-source.md` | Experiment 4 | Ported |
| `separator` | `packages/radcn/src/components/separator.tsx`, root and subpath exports | `separator/orientations` scenario | `static-display.spec.ts` | `docs/radcn-source.md` | Experiment 2 | Ported |
| `badge` | `packages/radcn/src/components/badge.tsx`, root and subpath exports | `badge/*` scenarios | `static-display.spec.ts` | `docs/radcn-source.md` | Experiment 2 | Ported |
| `alert` | `packages/radcn/src/components/alert.tsx`, root and subpath exports | `alert/*` scenarios | `static-display.spec.ts` | `docs/radcn-source.md` | Experiment 2 | Ported |
| `card` | `packages/radcn/src/components/card.tsx`, root and subpath exports | `card/*` scenarios | `static-display.spec.ts` | `docs/radcn-source.md` | Experiment 2 | Ported |
| `skeleton` | `packages/radcn/src/components/skeleton.tsx`, root and subpath exports | `skeleton/default` scenario | `static-display.spec.ts` | `docs/radcn-source.md` | Experiment 2 | Ported |
| `spinner` | `packages/radcn/src/components/spinner.tsx`, root and subpath exports | `spinner/*` scenarios | `static-display.spec.ts` | `docs/radcn-source.md` | Experiment 2 | Ported |
| `kbd` | `packages/radcn/src/components/kbd.tsx`, root and subpath exports | `kbd/default` scenario | `static-display.spec.ts` | `docs/radcn-source.md` | Experiment 2 | Ported |
| `table` | `packages/radcn/src/components/table.tsx`, root and subpath exports | `table/*` scenarios | `navigation-collection.spec.ts` | `docs/radcn-source.md` | Experiment 3 | Ported |
| `pagination` | `packages/radcn/src/components/pagination.tsx`, root and subpath exports | `pagination/*` scenarios | `navigation-collection.spec.ts` | `docs/radcn-source.md` | Experiment 3 | Ported |
| `breadcrumb` | `packages/radcn/src/components/breadcrumb.tsx`, root and subpath exports | `breadcrumb/*` scenarios | `navigation-collection.spec.ts` | `docs/radcn-source.md` | Experiment 3 | Ported |
| `aspect-ratio` | `packages/radcn/src/components/aspect-ratio.tsx`, root and subpath exports | `aspect-ratio/*` scenarios | `static-display.spec.ts` | `docs/radcn-source.md` | Experiment 2 | Ported |
| `empty` | `packages/radcn/src/components/empty.tsx`, root and subpath exports | `empty/*` scenarios | `static-display.spec.ts` | `docs/radcn-source.md` | Experiment 2 | Ported |
| `item` | `packages/radcn/src/components/item.tsx`, root and subpath exports | `item/*` scenarios | `navigation-collection.spec.ts` | `docs/radcn-source.md` | Experiment 3 | Ported |
| `button-group` | `packages/radcn/src/components/button-group.tsx`, root and subpath exports | `button-group/*` scenarios | `navigation-collection.spec.ts` | `docs/radcn-source.md` | Experiment 3 | Ported |
| `typography` | `packages/radcn/src/components/typography.tsx`, root and subpath exports | `typography/*` scenarios | `navigation-collection.spec.ts` | `docs/radcn-source.md` | Experiment 3 | Ported as importable recipe components |

## Conclusion

Stage 1 is complete. Experiment 4's completion review passed, and the next
experiment may begin Stage 2 after the Experiment 4 result commit is recorded.
