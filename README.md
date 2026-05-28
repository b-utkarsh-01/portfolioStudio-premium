## Using this repo from `frontend/` / `template-renderer/` (Git SHA pinning)

This repo is consumed by the `frontend` and `template-renderer` apps via a GitHub tarball URL that is pinned to a specific commit SHA.

### 1) Where to get the SHA

After you commit your changes in this repo:

- Get the current commit SHA:
  - `cd premium-templates`
  - `git rev-parse HEAD`

That printed value (example: `59fc501ddca68a1a201c4e3c5b5bd0cc05176487`) is the SHA you pin in the consuming apps.

### 2) Which files to update with the new SHA

Update the premium templates dependency in:

- `frontend/package.json`
  - `dependencies.portfolio-studio-premium`
  - `overrides.portfolio-studio-premium`
  - `overrides["portfolio-template-renderer"].portfolio-studio-premium`
- `template-renderer/package.json`
  - `dependencies.portfolio-studio-premium`

The value format used here is:

`https://codeload.github.com/<owner>/<repo>/tar.gz/<SHA>`

For this repo it is:

`https://codeload.github.com/b-utkarsh-01/portfolioStudio-premium/tar.gz/<SHA>`

### 3) Lockfile + push (important)

After updating the SHA in `frontend/package.json`:

- `cd frontend`
- `npm install` (this updates `frontend/package-lock.json`)
- `npm run build`
- commit + push both `package.json` and `package-lock.json`
