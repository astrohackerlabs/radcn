# Fixture Apps

These apps provide stable browser fixtures for comparing upstream shadcn/ui
against RadCN.

## Apps

- Reference React Router app: `fixtures/reference-react-router`
- Candidate Remix 3 app: `fixtures/candidate-remix`

## Ports

- Reference: `http://localhost:4601`
- Candidate: `http://localhost:4602`

Both apps accept a `PORT` environment variable, but browser comparison tooling
should use the defaults unless a port conflict requires an override.

## Install

Install from the repository root:

```bash
pnpm install
```

The Remix candidate app uses workspace links to the vendored Remix packages
under `vendor/remix/packages/*`.

## Run

In separate terminals:

```bash
pnpm fixtures:reference:dev
pnpm fixtures:candidate:dev
```

## Artifact Harness

Capture the first paired browser artifacts from the repository root:

```bash
pnpm fixtures:artifacts
```

The harness starts or reuses the reference app on `http://localhost:4601` and
the candidate app on `http://localhost:4602`. It visits every scenario from
`fixtures/scenarios/`, asserts the stable fixture shell attributes, and captures
screenshots of `[data-fixture-stage]`.

Generated output is ignored by git and written to:

```text
fixtures/artifacts/
├── manifest.json
├── reference/
└── candidate/
```

## Shared Routes

Both apps expose:

- `/`
- `/fixtures`
- `/fixtures/:component`
- `/fixtures/:component/:scenario`

Proof-set routes:

- `/fixtures/button/default`
- `/fixtures/button/variants`
- `/fixtures/button/disabled`
- `/fixtures/button/as-child-or-link`
- `/fixtures/button/sizes`
- `/fixtures/button/custom-class`
- `/fixtures/button/form-submit`
- `/fixtures/field/input-default`
- `/fixtures/field/input-invalid`
- `/fixtures/field/input-disabled`
- `/fixtures/field/required`
- `/fixtures/field/custom-error-token`
- `/fixtures/textarea/default`
- `/fixtures/textarea/disabled`
- `/fixtures/alert/default`
- `/fixtures/alert/destructive`
- `/fixtures/alert/custom-token`
- `/fixtures/aspect-ratio/default`
- `/fixtures/aspect-ratio/custom-ratio`
- `/fixtures/badge/variants`
- `/fixtures/badge/custom-class`
- `/fixtures/card/default`
- `/fixtures/card/compact`
- `/fixtures/card/custom-token`
- `/fixtures/empty/default`
- `/fixtures/empty/icon`
- `/fixtures/kbd/default`
- `/fixtures/separator/orientations`
- `/fixtures/skeleton/default`
- `/fixtures/spinner/default`
- `/fixtures/spinner/custom-size`
- `/fixtures/accordion/single`
- `/fixtures/accordion/multiple`
- `/fixtures/accordion/disabled-item`

Every scenario page renders:

```html
<main data-fixture-app="reference|candidate" data-component="..." data-scenario="...">
  <section data-fixture-stage>
    ...
  </section>
</main>
```
