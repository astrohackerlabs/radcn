# Experiment 8: Process Logo Assets with Sharp

## Description

Replace the docs site's code-native SVG logo with generated raster assets from
the raw RadCN logo image.

The raw source logo is:

```text
raw-icons/radcn-1.png
```

Local inspection found it is a square `1254 x 1254` RGBA PNG, which is suitable
as the source for deterministic resized docs assets.

This experiment should add a small Sharp-based image pipeline, generate WebP
logo assets for the docs site, generate a PNG favicon at `128 x 128` while
keeping the requested filename `favicon.ico`, and update the docs UI to use
the generated assets. All docs images from this pipeline should be WebP except
for the favicon, which should be PNG bytes at `radcn/apps/docs/public/favicon.ico`.

The plan is based on existing local Sharp pipelines:

- `~/dev/termsurf/website/scripts/process-icons.ts`
- `~/dev/rxc/homepage/process-icons.ts`
- `~/dev/artintellica/ts/www-artintellica-com/process-icons.ts`
- `~/dev/id/webapp/process-icons.ts`

The reusable pattern from those projects is:

- keep source PNGs in `raw-icons/`;
- process with `sharp`;
- emit resized public assets under `public/images`;
- generate a small typed helper for valid image paths;
- handle favicon separately from normal image outputs.

Do not use `png-to-ico` in RadCN for this experiment. The favicon should retain
the path `/favicon.ico`, but its file contents should be a normal 128x128 PNG.

## Changes

- `package.json`
  - Add an `icons` script that runs the image pipeline from the repository root.
  - Add the smallest necessary dev dependency for the pipeline, expected to be
    `sharp`.
  - Do not add `png-to-ico`.
- `pnpm-lock.yaml`
  - Update through `pnpm install` from the repository root after adding `sharp`.
  - Preserve the root workspace boundary from Experiment 7.
  - Do not introduce any `vendor/` dependency resolution.
- `pnpm-workspace.yaml`
  - Update only if pnpm 11 requires a build approval policy for Sharp or one of
    its native dependencies.
  - Preserve explicit workspace globs:
    - `radcn/apps/*`
    - `radcn/packages/*`
    - `radcn/fixtures/*`
  - Do not add broad globs or `vendor/**`.
- `scripts/process-icons.mjs`
  - Add a repo-root image generation script based on the local Sharp patterns.
  - Use a runnable ESM JavaScript script so the root `icons` command does not
    require adding a TypeScript script runner.
  - Read source PNGs from `raw-icons/`.
  - Generate WebP logo images into `radcn/apps/docs/public/images/`.
  - Generate only WebP image outputs for normal image assets.
  - Generate `radcn/apps/docs/public/favicon.ico` as a 128x128 PNG file using
    Sharp's PNG output.
  - Generate a typed image helper for docs code, likely
    `radcn/apps/docs/app/ui/images.ts`, with allowed `/images/...webp` paths.
  - Use deterministic output names based on the source filename, such as
    `radcn-1-32.webp`.
- `raw-icons/radcn-1.png`
  - Commit this source image if it is still untracked.
  - Do not move it under `vendor/` or into the docs app.
- `radcn/apps/docs/public/images/`
  - Add generated WebP assets for useful docs logo sizes:
    - `radcn-1-32.webp`
    - `radcn-1-64.webp`
    - `radcn-1-96.webp`
    - `radcn-1-128.webp`
    - `radcn-1-180.webp`
    - `radcn-1-200.webp`
    - `radcn-1-300.webp`
    - `radcn-1-400.webp`
- `radcn/apps/docs/public/favicon.ico`
  - Generate a 128x128 PNG file at this path.
  - The filename remains `.ico` by request, but file inspection should show PNG
    bytes and `128 x 128`.
- `radcn/apps/docs/public/favicon.svg`
  - Remove it if the docs app no longer references it.
- `radcn/apps/docs/app/ui/logo.tsx`
  - Replace the hard-coded SVG robot with an `<img>` using generated WebP
    assets.
  - Keep the existing `RadcnLogo` component API if practical so the docs shell
    and homepage do not need broad rewrites.
  - Use a smaller asset for top navigation and a larger asset for the homepage
    hero.
  - Preserve `data-radcn-logo` hooks used by existing checks.
- `radcn/apps/docs/app/ui/document.tsx`
  - Point the favicon link at `/favicon.ico`.
  - Use `type="image/png"` even though the filename is `favicon.ico`.
- `issues/0003-build-radcn-documentation-site/README.md`
  - Record learnings about the image pipeline, generated formats, and favicon
    filename/content mismatch.
- `issues/0003-build-radcn-documentation-site/08-process-logo-assets-with-sharp.md`
  - Record result, verification, screenshot paths, conclusion, and completion
    review after implementation.

Do not redesign the docs identity in this experiment. The goal is to replace
the current hand-coded SVG logo with generated assets from the selected raw
logo, not to revisit the broader visual system.

## Verification

The experiment passes when all of these are true:

- `raw-icons/radcn-1.png` is present and committed as the source logo.
- `pnpm icons` runs from `/Users/ryan/dev/radcn` and regenerates the docs image
  assets.
- All normal generated docs logo images are WebP files.
- `radcn/apps/docs/public/favicon.ico` exists, has PNG file contents, and is
  exactly `128 x 128`.
- The docs document links `/favicon.ico` with `type="image/png"`.
- The docs logo component renders an `<img>` backed by generated WebP assets,
  not a hand-coded SVG.
- The top navigation logo renders cleanly in light and dark mode.
- The homepage hero logo renders cleanly in light and dark mode.
- No generated image asset overflows, blurs badly, or causes layout shift in
  the nav or hero.
- `pnpm install` passes from the repository root after adding the image
  pipeline dependency.
- `pnpm --dir radcn/apps/docs typecheck` passes.
- `pnpm radcn:typecheck` passes.
- `pnpm list -r --depth -1` still lists only the root workspace and RadCN
  packages under `radcn/apps/*`, `radcn/packages/*`, and `radcn/fixtures/*`.
- `pnpm-lock.yaml` does not resolve any dependency from `vendor/`.
- `git diff --check` passes.
- `git status --short -- vendor` produces no output.
- A separate AI agent reviews the completed experiment result before the result
  commit or any next experiment design.

Suggested verification commands:

```sh
pnpm install
pnpm icons
file raw-icons/radcn-1.png
file radcn/apps/docs/public/images/radcn-1-300.webp
file radcn/apps/docs/public/favicon.ico
sips -g pixelWidth -g pixelHeight radcn/apps/docs/public/favicon.ico
find radcn/apps/docs/public/images -type f | sort
find radcn/apps/docs/public/images -type f ! -name '*.webp'
rg '/favicon.ico|image/png|favicon.svg' radcn/apps/docs/app radcn/apps/docs/public
rg '<svg|<img|data-radcn-logo|radcn-1-' radcn/apps/docs/app/ui/logo.tsx
pnpm --dir radcn/apps/docs typecheck
pnpm radcn:typecheck
pnpm list -r --depth -1
rg -n "vendor/|\\.\\./vendor|link:.*vendor|file:.*vendor" pnpm-lock.yaml package.json pnpm-workspace.yaml
git diff --check
git status --short -- vendor
PORT=5175 pnpm dev
curl -s -o /dev/null -w 'home %{http_code}\n' http://localhost:5175/ | rg '^home 200$'
curl -s -o /dev/null -w 'logo %{http_code}\n' http://localhost:5175/images/radcn-1-300.webp | rg '^logo 200$'
curl -s -o /dev/null -w 'favicon %{http_code}\n' http://localhost:5175/favicon.ico | rg '^favicon 200$'
```

Capture and inspect screenshots after implementation:

```sh
pnpm exec playwright screenshot --viewport-size=1440,1000 http://localhost:5175/ /tmp/radcn-exp8-home-light-desktop.png
pnpm exec playwright screenshot --viewport-size=390,844 http://localhost:5175/ /tmp/radcn-exp8-home-light-mobile.png
```

Use Playwright to switch to dark mode, then capture:

```text
/tmp/radcn-exp8-home-dark-desktop.png
/tmp/radcn-exp8-home-dark-mobile.png
```

Inspect the screenshots for nav fit, hero logo clarity, dark/light contrast,
and absence of incoherent overlap.

## Design Review

Fresh-context design review was performed by Codex subagent `Parfit`
(`019e97d9-63fb-7322-9514-2dffc8f55131`) on 2026-06-05 with
`fork_context: false`.

Findings:

- **Blocker:** The experiment lacked a `Design Review` section to record the
  required review result before implementation.
- **Major:** The plan called for `scripts/process-icons.ts` while adding only
  `sharp`; the root workspace has no TypeScript runner for arbitrary scripts.

Resolution:

- Added this `Design Review` section with reviewer identity, fresh-context
  status, findings, fixes, and approval result.
- Changed the planned pipeline file to `scripts/process-icons.mjs`, a runnable
  ESM JavaScript script that only needs `sharp` as the image-processing
  dependency.

Result:

- Parfit approved the design after re-review with no blockers, major findings,
  or minor findings remaining.

## Result

**Result:** Pass

Implemented a Sharp-based RadCN docs logo pipeline and replaced the inline SVG
docs logo with generated raster assets.

Pipeline changes:

- Added `sharp` as a root dev dependency.
- Added `pnpm icons`, which runs `node scripts/process-icons.mjs`.
- Added `scripts/process-icons.mjs`.
- The generator reads source PNGs from `raw-icons/`.
- The generator writes WebP docs assets to `radcn/apps/docs/public/images/`.
- The generator writes `radcn/apps/docs/public/favicon.ico` as PNG bytes at
  `128 x 128`.
- The generator writes a typed docs image helper at
  `radcn/apps/docs/app/ui/images.ts`.
- `pnpm-workspace.yaml` now records `allowBuilds.sharp = true` for pnpm 11's
  build-script approval policy.

Logo and favicon changes:

- Committed `raw-icons/radcn-1.png` as the source logo image.
- Generated:
  - `radcn/apps/docs/public/images/radcn-1-32.webp`
  - `radcn/apps/docs/public/images/radcn-1-64.webp`
  - `radcn/apps/docs/public/images/radcn-1-96.webp`
  - `radcn/apps/docs/public/images/radcn-1-128.webp`
  - `radcn/apps/docs/public/images/radcn-1-180.webp`
  - `radcn/apps/docs/public/images/radcn-1-200.webp`
  - `radcn/apps/docs/public/images/radcn-1-300.webp`
  - `radcn/apps/docs/public/images/radcn-1-400.webp`
- Updated `radcn/apps/docs/app/ui/logo.tsx` to render an `<img>` using the
  generated WebP assets while preserving the `RadcnLogo` API and
  `data-radcn-logo` hook.
- Updated `radcn/apps/docs/app/ui/document.tsx` to link `/favicon.ico` with
  `type="image/png"`.
- Removed the obsolete `radcn/apps/docs/public/favicon.svg`.

Verification run from `/Users/ryan/dev/radcn` on 2026-06-05:

```sh
pnpm install
# Pass: completed after sharp was added and approved

pnpm icons
# Pass: generated all WebP logo assets, favicon.ico PNG bytes, and images.ts

file raw-icons/radcn-1.png
# raw-icons/radcn-1.png: PNG image data, 1254 x 1254, 8-bit/color RGBA, non-interlaced

file radcn/apps/docs/public/images/radcn-1-300.webp
# RIFF (little-endian) data, Web/P image

file radcn/apps/docs/public/favicon.ico
# PNG image data, 128 x 128, 8-bit/color RGBA, non-interlaced

sips -g pixelWidth -g pixelHeight radcn/apps/docs/public/favicon.ico
# pixelWidth: 128
# pixelHeight: 128

find radcn/apps/docs/public/images -type f | sort
# Pass: listed only the eight generated radcn-1 WebP files

find radcn/apps/docs/public/images -type f ! -name '*.webp'
# Pass: no output

rg '/favicon.ico|image/png|favicon.svg' radcn/apps/docs/app radcn/apps/docs/public
# Pass: document links /favicon.ico as image/png; no favicon.svg reference remains

rg '<svg|<img|data-radcn-logo|radcn-1-' radcn/apps/docs/app/ui/logo.tsx
# Pass: logo component renders an img, preserves data-radcn-logo, and references radcn-1 WebP assets

pnpm --dir radcn/apps/docs typecheck
# Pass: tsc --noEmit

pnpm radcn:typecheck
# Pass: pnpm --dir radcn/packages/radcn typecheck

pnpm list -r --depth -1
# Pass: listed only the root workspace, docs app, two fixtures, and radcn package

rg -n "vendor/|\\.\\./vendor|link:.*vendor|file:.*vendor" pnpm-lock.yaml package.json pnpm-workspace.yaml
# Pass: no output

git diff --check
# Pass

git status --short -- vendor
# Pass: no output

PORT=5175 pnpm dev
# Pass: started docs through pnpm --dir radcn/apps/docs dev

curl -s -o /dev/null -w 'home %{http_code}\n' http://localhost:5175/ | rg '^home 200$'
curl -s -o /dev/null -w 'logo %{http_code}\n' http://localhost:5175/images/radcn-1-300.webp | rg '^logo 200$'
curl -s -o /dev/null -w 'favicon %{http_code}\n' http://localhost:5175/favicon.ico | rg '^favicon 200$'
# Pass

entry=$(curl -s http://localhost:5175/assets/app/assets/entry.ts | sed -n '1p' | sed -E 's/^import \{ run \} from "([^"]+)";.*/\1/')
curl -s -o /dev/null -w 'entry-dependency %{http_code}\n' "http://localhost:5175${entry}" | rg '^entry-dependency 200$'
# Pass
```

Screenshot artifacts captured and inspected:

- `/tmp/radcn-exp8-home-light-desktop.png`
- `/tmp/radcn-exp8-home-light-mobile.png`
- `/tmp/radcn-exp8-home-dark-desktop.png`
- `/tmp/radcn-exp8-home-dark-mobile.png`

Inspection found the generated nav logo fits in desktop and mobile headers,
the generated hero logo is clear in light and dark mode, contrast remains
readable, and there is no incoherent overlap or layout shift in the inspected
viewports.

## Conclusion

Experiment 8 establishes the docs image asset pipeline. The source logo lives
in `raw-icons/`, generated page images are WebP, and the favicon keeps the path
`/favicon.ico` while intentionally containing PNG bytes.

The docs site now uses the same generated logo image in the nav and homepage
hero instead of the earlier hand-coded SVG robot. Future docs image additions
should go through `pnpm icons` so generated paths stay typed and all normal
docs images remain WebP.

## Completion Review

Fresh-context completion review was performed by Codex subagent `Hypatia`
(`019e97df-74c0-7313-b058-86bdadcebbf9`) on 2026-06-05 with
`fork_context: false`.

Findings:

- **Blocker:** None.
- **Major:** None.
- **Minor:** None.

Result:

- Hypatia approved the completed experiment. The reviewer reran the key checks
  for `pnpm icons`, image metadata, favicon dimensions, favicon/logo references,
  both typechecks, workspace listing, vendor dependency scan, route/image
  serving, `git diff --check`, vendor cleanliness, and commit ordering.
