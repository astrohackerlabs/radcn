# RadCN

RadCN is a component library for Remix 3. The project ports the spirit and
component coverage of shadcn/ui into Remix 3's web-first model, and includes a
Remix 3 documentation site for explaining and demonstrating the library.

## Issues and Experiments

Every significant piece of work gets an issue in `issues/`. Issues describe the
problem, provide background, and frame the solution space. Experiments are the
incremental steps that solve the issue.

## Agent Docs Compatibility

This repository is used by both Codex and Claude.

Every `AGENTS.md` must have a corresponding `CLAUDE.md` in the same directory.
Prefer making `CLAUDE.md` a symlink to `AGENTS.md`, so both agents read the same
instructions:

```bash
ln -s AGENTS.md CLAUDE.md
```

If a symlink is not possible in a subdirectory, `CLAUDE.md` must contain
equivalent instructions and explain why it is not a symlink. When adding,
moving, or removing agent docs, update both names together.

Project-local skills live in the top-level `skills/` directory. Keep
`.claude/skills` and `.codex/skills` as symlinks to `../skills`; do not let them
become divergent copies.

## Remix-Origin Skills

Some project-local skills are adapted from the vendored Remix repository under
`vendor/remix/.agents/skills/`. They are copied into `skills/` so Codex and
Claude can use them without depending on the ignored `vendor/` checkout.

Use the local `remix` skill when building or reviewing the Remix 3 docs app,
routes, controllers, assets, hydration, navigation, `remix/ui` components, or
docs app tests. Use `author-ui-modules` for docs UI modules and component
examples that need Remix UI-style state, mixins, or host-element behavior. Use
`write-tests` when adding or reviewing RadCN package, fixture, Playwright, or
docs-app tests.

Prefer RadCN repository commands, Issue 3 experiment requirements, and this
workflow over upstream Remix maintainer workflows. Do not import or use
Remix-origin PR, publish, or repository-maintenance skills unless a future
experiment records a concrete RadCN need for them.

## Adversarial Review

Use the local `adversarial-review` skill for experiment design reviews,
experiment completion reviews, and any requested adversarial review of RadCN
implementation work.

The default reviewer is a fresh-context subagent of the same tool that authored
the work: for Codex-authored work, a separate Codex subagent with
`fork_context: false`; for Claude-authored work, a separate Claude subagent
spawned with the Agent tool (subagents start with no parent conversation
context). Do not call `claude -p`, `codex exec`, or other external paid
reviewer CLIs from the other tool unless the user explicitly asks for
cross-tool review later.

Give the reviewer only the files and rules needed for the review, such as
`AGENTS.md`, the relevant issue README, the experiment file, and the relevant
diff or source files. Do not pass the parent conversation by default. Record the
reviewer name or ID, fresh-context status, findings, fixes, and approval result
inside the experiment file.

If a fresh subagent is unavailable, do not silently reuse a warm agent for a
required adversarial gate. Wait for a fresh slot or record the fallback as a
weaker review that does not satisfy the gate unless the user explicitly accepts
it.

## Vendor Sources

Upstream reference repositories live under `vendor/` as ignored nested git
checkouts. They are for reading, diffing, and porting guidance only. Do not
commit their source into the RadCN repository.

Current vendor sources:

- `vendor/shadcn-ui/` — `https://github.com/shadcn-ui/ui.git`
- `vendor/remix/` — `https://github.com/remix-run/remix.git`
- `vendor/react-router/` — `https://github.com/remix-run/react-router.git`

Keep vendor directories listed in `vendor/.gitignore`. If a vendor checkout
needs local agent instructions, add both `AGENTS.md` and `CLAUDE.md` inside that
nested checkout, following the compatibility policy above.

### Issue Structure

Each issue is a folder. The `README.md` is the issue spine: frontmatter, goal,
background, analysis, an ordered index of experiments, and the final conclusion.
Every experiment is its own numbered file in the same folder. The README never
contains experiment bodies, only links to them.

```text
issues/0001-component-porting-model/
├── README.md                    # spine: frontmatter, goal, background,
│                                # experiments index, conclusion
├── 01-audit-shadcn-button.md    # Experiment 1 body
├── 02-port-button-markup.md     # Experiment 2 body
└── 03-...                       # one file per experiment, in sequence
```

The folder name is `{NNNN}-{slug}`. The number is zero-padded to 4 digits and
globally sequential within this repository. The slug is lowercase, hyphenated,
and describes the topic.

The full issue index is `issues/README.md`. Regenerate it with:

```bash
scripts/build-issues-index.sh
```

### Frontmatter

Every issue `README.md` starts with TOML frontmatter:

```toml
+++
status = "open"
opened = "2026-06-04"
+++
```

For closed issues:

```toml
+++
status = "closed"
opened = "2026-06-04"
closed = "2026-06-04"
+++
```

Issues may add their own TOML frontmatter keys to `README.md`, experiment files,
or other issue docs for issue-specific metadata, as long as:

- `README.md` always preserves the reserved keys `status` and `opened`, plus
  `closed` when closed;
- additive keys are valid TOML between the `+++` delimiters;
- additive keys do not contradict the reserved keys or index tooling;
- the issue documents any added schema in its own `README.md`.

### README.md Structure

After the frontmatter, a new issue's `README.md` has these sections:

1. Title: `# Issue {N}: {descriptive title}`
2. Goal: one or two sentences describing the desired outcome.
3. Background: context, prior work, constraints.
4. Architecture, Analysis, or Proposed Solutions: technical details.

A new issue README has no experiments listed yet.

As experiments are created, the README grows an `## Experiments` section: an
ordered list linking to each experiment file, one per line, with a one-line
status. The README holds links and statuses only, never experiment bodies.

```markdown
## Experiments

- [Experiment 1: Audit shadcn button behavior](01-audit-shadcn-button.md) —
  **Pass**
- [Experiment 2: Port button markup and styles](02-port-button-markup.md) —
  **Partial** (needs keyboard-state coverage)
- [Experiment 3: Add form integration](03-form-integration.md) — **Designed**
```

Keep each status to one of: `Designed`, `In progress`, `Pass`, `Partial`,
`Fail`. Update the line when the experiment result is recorded, so the README is
an at-a-glance progress tracker.

When the issue is solved or abandoned, add a `## Conclusion` section to the
README.

### Experiment Files

Each experiment lives in its own file `NN-{slug}.md` in the issue folder, where
`NN` is a zero-padded two-digit number in creation order (`01`, `02`, ...,
`99`). The slug is lowercase-hyphenated and describes the experiment.

An experiment file may begin with optional TOML frontmatter (`+++ ... +++`)
before its H1 title for issue-specific metadata such as agent provenance.
Experiment frontmatter is optional and must not replace the required H1 title
and H2 sections.

Each experiment file contains:

1. Title: `# Experiment {N}: {descriptive title}`
2. `## Description`: what and why.
3. `## Changes`: specific code changes, listed by file.
4. `## Verification`: concrete test steps and pass/fail criteria.
5. `## Result` and `## Conclusion`: added after the experiment runs.

Keep each file focused. If one grows past roughly 1000 lines, split the work
into the next numbered experiment.

### Multiple Open Issues

Multiple issues can be open at the same time. This allows broad roadmap issues
to stay open while smaller implementation issues are opened and closed alongside
them.

### Experiments

Only create an experiment after the issue requirements are clear. Each
experiment is designed, implemented, and concluded before the next one is
designed.

Never list all experiments upfront. The outcome of each experiment informs what
comes next.

Each experiment is added as a new link in the issue README's `## Experiments`
index the moment it is created. Inside the file, use an H1 title and H2
sections:

1. `# Experiment {N}: {descriptive title}`
2. `## Description`
3. `## Changes`
4. `## Verification`
5. `## Result` and `## Conclusion`, added after it runs.

### One at a Time

Design and implement one experiment at a time. The result of Experiment 1
directly informs what Experiment 2 should be.

### AI Review Gate

Every experiment should be reviewed by another AI agent before moving to the
next stage.

1. Design review before implementation:
   - After writing the experiment design, ask another AI agent to review it.
   - Fix real issues found by the review.
   - Record the review result in the experiment file.
   - Do not implement the experiment until the reviewing agent approves the
     design.

2. Result review before the next experiment:
   - After implementation, verification, and result recording, ask another AI
     agent to review the completed experiment and result.
   - Fix real issues found by the review.
   - Record the completion-review result in the experiment file.
   - Do not design or implement the next experiment until the reviewing agent
     approves the completed output.

The reviewing agent must be separate from the implementation pass. Use the
`adversarial-review` skill and prefer a fresh-context subagent of the same tool
that authored the work (Codex: `fork_context: false`; Claude: a subagent
spawned with the Agent tool). The review must be read-only and must approve
only when no blocker findings remain.

### Experiment Commits

When the repository is under git, every experiment has two required commit
points:

1. Plan commit: after the experiment design is written, reviewed, fixed,
   approved, and linked from the issue README, commit the experiment plan before
   implementation begins.
2. Result commit: after implementation, verification, result recording,
   completion review, and any required fixes, commit the experiment result
   before designing the next experiment.

These commits must be separate. Do not combine an experiment plan and its result
in the same commit, and do not start the next experiment before the previous
experiment's result commit exists.

### Recording Results

After testing, append the result inside the experiment's own file, below
Verification:

```markdown
## Result

**Result:** Pass / Partial / Fail

{description}

## Conclusion

{what we learned, what the next experiment should be}
```

Then update that experiment's status on its line in the README's
`## Experiments` index: `Designed` to `Pass`, `Partial`, or `Fail`. All three
outcomes are useful. Failed experiments eliminate dead ends.

### Closing an Issue

When the issue is solved or abandoned, add a `## Conclusion` section to the
issue `README.md` after the `## Experiments` index. Summarize what was learned
and the outcome. Update the frontmatter to `status = "closed"` with a `closed`
date. Regenerate the index:

```bash
scripts/build-issues-index.sh
```

### Immutability

Closed issues are historical records. They are immutable and must not be
modified. History stays as it was written.

The one-file-per-experiment structure applies to issues created from now on. If
older imported issues ever use another structure, keep their original form as
historical records.

### Process Summary

1. Create the issue: `issues/{NNNN}-{slug}/README.md` with frontmatter, goal,
   background, and analysis. No experiments yet.
2. Design Experiment 1: create `01-{slug}.md` with the experiment body, and add
   a link to it under `## Experiments` in the README with status `Designed`.
3. Review and commit the plan: get another AI agent to approve the design, fix
   real findings, record the review result, and commit the experiment plan.
4. Implement Experiment 1.
5. Record the result: append `## Result` and `## Conclusion` inside
   `01-{slug}.md`, and update its status on the README index line.
6. Review and commit the result: get another AI agent to approve the completed
   output, fix real findings, record the completion review, and commit the
   experiment result.
7. Repeat: create `02-{slug}.md` for the next experiment. The prior result
   informs it.
8. Close the issue: write the README conclusion, update frontmatter, and rebuild
   the index.
