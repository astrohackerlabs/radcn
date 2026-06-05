# Experiment 2: Scaffold Docs App With Remix CLI

## Description

Use the official Remix 3 CLI scaffold path to create the initial RadCN docs app.
The upstream Remix 3 README documents:

```sh
npx remix@next new my-remix-app
```

The pnpm equivalent is:

```sh
pnpm dlx remix@next new apps/docs
```

This experiment should prefer the CLI over manually copying
`vendor/remix/template` because the CLI is the canonical setup path. It may
apply template substitutions, package metadata, dependency versions, generated
files, install prompts, or other setup logic that a direct copy would miss.

The goal is not to design the finished documentation site yet. The goal is to
prove that RadCN can create and run a Remix 3 docs app from the same setup path
recommended by Remix 3 itself, then record any setup facts that future
experiments must respect.

## Changes

- `apps/docs/`
  - Run `pnpm dlx remix@next new apps/docs` from the repository root.
  - If the CLI refuses a nested path, run it in a temporary sibling location and
    move the generated app into `apps/docs` without changing generated source
    semantics.
  - Keep the generated app shape as close to the CLI output as possible.
  - Ensure the generated app is committed as normal RadCN workspace source, not
    as a nested git repository. If the CLI creates `apps/docs/.git`, remove only
    that nested metadata after recording the behavior.
- `package.json`
  - Add or adjust workspace scripts only if needed to run the docs app from the
    RadCN repository root.
- `pnpm-workspace.yaml`
  - Add `apps/*` if the repository does not already include apps in the
    workspace.
- `issues/0003-build-radcn-documentation-site/README.md`
  - Add a `## Learnings` section if it does not exist, then record setup
    learnings if the CLI exposes requirements or constraints that later
    docs-site experiments must know.
- `issues/0003-build-radcn-documentation-site/02-scaffold-docs-app-with-remix-cli.md`
  - Record the exact command used, any prompts or deviations, verification
    output, resolved Remix CLI/package version, result, conclusion, and
    completion review.

Do not build the RadCN landing page in this experiment. A minimal generated
homepage is acceptable if the app runs and establishes the correct Remix 3
foundation.

## Verification

The experiment passes when all of these are true:

- The docs app exists at `apps/docs`.
- The app was created by the Remix CLI path or by a documented fallback that
  preserves the generated CLI output.
- The generated app uses Remix 3 app conventions such as `app/routes.ts`,
  `app/router.ts`, route actions/controllers, server rendering middleware, and
  browser asset entrypoints.
- The repository has workspace wiring sufficient to install and run the docs
  app.
- `apps/docs/.git` does not exist after setup.
- The docs app can run on a documented port that does not conflict with the
  comparison fixtures. Prefer an explicit docs port such as `5175` if the
  scaffold supports it.
- A browser request to the running app returns the generated homepage.
- Typecheck and/or build commands are recorded. If the generated scaffold does
  not provide one of these commands, record that as a learning instead of
  inventing broad infrastructure.
- The resolved Remix CLI/package version used by `remix@next` is recorded in
  the result.
- Any differences between the CLI output and `vendor/remix/template` that
  matter for future work are recorded in the issue learnings.
- `git diff --check` passes.
- `git status --short -- vendor` confirms this experiment did not modify
  ignored vendor checkouts.
- A separate AI agent reviews the completed experiment result before the result
  commit or any next experiment design.

Setup command:

```sh
pnpm dlx remix@next new apps/docs
```

Suggested post-setup verification commands:

```sh
pnpm install
pnpm --dir apps/docs typecheck
pnpm --dir apps/docs start -- --port 5175
curl -I http://localhost:5175/
test ! -e apps/docs/.git
git diff --check
git status --short -- vendor
```

If the generated scripts differ, use the generated scripts and record the exact
commands.

## Design Review

Reviewed by Raman on 2026-06-05.

Findings:

- The original design did not explicitly include repository hygiene gates or
  completion review in verification.
- The original design did not guard against the CLI creating a nested git
  repository under `apps/docs`.
- The original design mixed the one-time setup command with post-setup
  verification commands.
- The original design did not explicitly require recording the resolved
  `remix@next` version.

Resolution:

- Added explicit verification for `git diff --check`, vendor status, completion
  review, absence of `apps/docs/.git`, and resolved CLI/package version.
- Split the scaffold command from post-setup verification commands.
- Raman approved the fixed design for the plan commit.
