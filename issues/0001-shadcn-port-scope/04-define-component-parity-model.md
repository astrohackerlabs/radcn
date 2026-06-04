# Experiment 4: Define Component Parity Model

## Description

Use the inventory, paired fixture apps, and Playwright artifact harness to define
the RadCN component parity model. This experiment should turn the previous
scaffolding work into concrete rules for deciding when a RadCN component is a
valid Remix 3 port of a shadcn/ui component.

The model must preserve the project direction established so far:

- RadCN should match shadcn/ui's user-visible behavior and author customization
  value, not clone React internals.
- Exact DOM equivalence is not required and should not be treated as the primary
  pass/fail bar.
- Visual output, accessibility semantics, interaction outcomes, form behavior,
  theming, and customization hooks are the important parity surfaces.
- Intentional Remix 3 divergences are allowed, but must be documented and
  reviewed rather than accidental.

This experiment should produce the decision artifacts needed to close Issue 1
if they are concrete enough to guide future component-port issues.

## Changes

Create parity-model documentation under the issue folder:

```text
issues/0001-shadcn-port-scope/
├── 04-define-component-parity-model.md
└── parity-model.md
```

The exact file split may change if the implementation finds a clearer structure,
but the issue must end with a durable parity-model document linked from the
experiment result.

### Parity Model Document

Create `issues/0001-shadcn-port-scope/parity-model.md` with these sections:

1. `# RadCN Component Parity Model`
2. `## Purpose`
3. `## Parity Surfaces`
4. `## Non-Goals`
5. `## Acceptable Divergence`
6. `## Customization Contract`
7. `## Scenario Requirements`
8. `## Verification Layers`
9. `## Component Done Checklist`
10. `## Open Follow-Up Work`

The document should define each parity surface:

- **Visual parity:** component screenshots should match shadcn/ui in default
  theme, states, variants, density, and supported viewports unless an intentional
  divergence is documented.
- **Customization parity:** authors should be able to modify the component in
  equivalent ways through class names, CSS variables, variants, tokens,
  composition slots, and documented RadCN-specific hooks.
- **Accessibility parity:** roles, names, states, relationships, focus order,
  keyboard affordances, disabled/invalid state, and screen-reader relevant
  semantics should match user outcomes even when markup differs.
- **Interaction parity:** keyboard, pointer, open/close, selection, focus trap,
  dismissal, and animation outcomes should match component expectations.
- **Form/native-web parity:** components that participate in forms should submit,
  reset, validate, disable, and progressively enhance through web-native
  behavior where possible.
- **Install/source parity:** RadCN source layout and installable artifacts should
  preserve shadcn/ui's practical copy-own-customize workflow while adapting to
  Remix 3.

The document should explicitly reject exact DOM-tree equality as a default pass
criterion. DOM assertions should be targeted diagnostics only: roles, labels,
attributes, focusable elements, form linkage, and customization hooks.

### Component Done Checklist

Define a checklist future component-port issues can copy. It should include at
least:

- inventory entry exists and component category is known;
- reference and candidate fixtures exist for required scenarios;
- artifact harness captures paired screenshots;
- visual review is complete or an intentional divergence is recorded;
- accessibility assertions are defined for component-critical semantics;
- keyboard and pointer interaction checks are defined where applicable;
- customization probes verify the intended author modification surface;
- form behavior checks exist where applicable;
- Remix 3 divergence notes are documented;
- independent AI review has approved the component result.

### Proof-Set Application

Apply the model to the current proof set at a planning level:

- `button`
- `field`/`input`
- `accordion`

For each proof component, list the minimum required scenario groups and
verification layers. This should be a model exercise, not a full component port.

### Issue Closure Decision

At the end of this experiment, decide whether Issue 1 can close.

If the parity model is concrete enough to guide the next component-port issue,
the experiment result should recommend closing Issue 1 and the issue README
should receive a `## Conclusion` section in the same result commit. The issue
frontmatter should be updated to:

```toml
+++
status = "closed"
opened = "2026-06-04"
closed = "2026-06-04"
+++
```

Then regenerate the full issue index:

```bash
scripts/build-issues-index.sh
```

If the parity model is still incomplete, keep Issue 1 open and record exactly
what decision is missing.

## Verification

The experiment passes if:

1. `parity-model.md` exists and defines the parity surfaces, non-goals,
   acceptable divergence rules, customization contract, scenario requirements,
   verification layers, component done checklist, and open follow-up work.
2. The model clearly states that exact DOM equivalence is not a default pass
   criterion.
3. The model defines how screenshots from `pnpm fixtures:artifacts` are used in
   future visual review without requiring pixel diffs in this issue.
4. The model defines how author customization parity will be tested.
5. The model defines how accessibility, interaction, and form behavior parity
   will be tested.
6. The proof-set planning section covers `button`, `field`/`input`, and
   `accordion`.
7. The result section records whether Issue 1 should close or stay open, and
   why.
8. If Issue 1 closes, the issue README has a conclusion, frontmatter is updated,
   and `scripts/build-issues-index.sh` has been run.
9. No files under `vendor/` are modified.
10. Independent completion review approves the model or any review findings are
    addressed and recorded.

This experiment should finish the issue if the resulting model answers the
scoping questions in the issue README. It should not start the first real
component port; that belongs in a separate follow-up issue.

## Design Review

Independent AI design review was performed by subagent `Nietzsche`, which
approved the design.

The review found no blocking issues. It verified that the design is centered on
defining the RadCN/shadcn parity model rather than starting a component port,
explicitly rejects exact DOM equality as the default pass criterion, specifies
`parity-model.md` and its required sections, covers visual, customization,
accessibility, interaction, form/native-web, and install/source parity, includes
proof-set planning for `button`, `field`/`input`, and `accordion`, and gives a
valid path to close Issue 1 if the resulting model is sufficient.

Residual risks:

- The implementation must keep `parity-model.md` operational enough for future
  component-port issues, not merely descriptive.
- Install/source parity is included, but the actual package and source layout
  may still need a later dedicated issue once the first real port begins.

## Result

**Result:** Pass

Created [the RadCN component parity model](parity-model.md). The model defines:

- parity surfaces for visual output, customization, accessibility, interaction,
  form/native-web behavior, and install/source workflow;
- non-goals, including a clear rejection of exact DOM-tree equality as a default
  pass criterion;
- acceptable and unacceptable Remix 3 divergence rules;
- the author customization contract every future component port must define;
- scenario requirements for future reference and candidate fixtures;
- verification layers that start with `pnpm fixtures:artifacts` and add visual,
  accessibility, interaction, customization, form, and review checks;
- a component done checklist future component-port issues can copy;
- proof-set planning for `button`, `field`/`input`, and `accordion`;
- open follow-up work for the first real component port, visual review policy,
  assertion helpers, customization probes, source/install layout, and high-risk
  primitives.

Verification commands run from the repository root:

```bash
scripts/build-issues-index.sh
rg -n "DOM|fixtures:artifacts|Customization|Accessibility|Interaction|Form|Button|Field|Accordion|Component Done|Acceptable Divergence|Non-Goals|Open Follow-Up" \
  issues/0001-shadcn-port-scope/parity-model.md
git status --short -- vendor
```

`scripts/build-issues-index.sh` reported `issues/README.md: 0 open, 1 closed`.
`issues/README.md` now lists Issue 1 under closed issues with closed date
`2026-06-04`. `git status --short -- vendor` reported no vendor modifications.

Issue 1 should close. The model answers the issue's scoping questions by
establishing the target component inventory, the Remix 3 mapping posture, the
comparison harness, and the parity bar future component ports must satisfy. It
does not start the first real component port; that belongs in a follow-up issue.

## Conclusion

The parity model is concrete enough to guide future component-port issues.
Issue 1 can close with the conclusion recorded in `README.md` and the full issue
index regenerated. The next issue should use the model to port the native
form-control proof set, likely `button`, `input`, and `field`.

## Completion Review

Independent AI completion review was performed by subagent `Lovelace`, which
approved the result.

The review found no blocking issues. It verified that `parity-model.md` exists
and covers the required model sections, rejects exact DOM equivalence as the
default pass criterion, uses `pnpm fixtures:artifacts` screenshots as review
artifacts without requiring pixel diffs, defines customization, accessibility,
interaction, and form/native-web testing, covers proof-set planning for
`button`, `field`/`input`, and `accordion`, closes Issue 1 with Experiment 4 as
`Pass` and a conclusion, regenerates `issues/README.md` with `0 open, 1 closed`,
and leaves vendor files unmodified.

Residual risks:

- Pixel baseline policy, assertion helpers, source/install layout, and the first
  real component port are intentionally deferred to follow-up work.
