# Deployment SOP (Templates → Frontend/Renderer)

`default-templates/` and `premium-templates/` are consumed by `frontend/` and `template-renderer/` via **GitHub tarball URLs** pinned to an exact Git commit SHA.

## What “SHA” means

The “SHA” is the Git commit hash of the templates repo commit you want production to use.

## How to get the SHA (templates repo)

After you commit your change:

1) `cd premium-templates`
2) `git rev-parse HEAD`

Example output:
- `59fc501ddca68a1a201c4e3c5b5bd0cc05176487`

## Which files to update with that SHA

### Premium templates (`portfolioStudio-premium`)

Update:
- `frontend/package.json`
  - `dependencies.portfolio-studio-premium`
  - `overrides.portfolio-studio-premium`
  - `overrides["portfolio-template-renderer"].portfolio-studio-premium`
- `template-renderer/package.json`
  - `dependencies.portfolio-studio-premium`

URL format used:
- `https://codeload.github.com/b-utkarsh-01/portfolioStudio-premium/tar.gz/<SHA>`

### Default templates (`portfolioStudio-default`)

Same idea, different repo URL:
- `https://codeload.github.com/b-utkarsh-01/portfolioStudio-default/tar.gz/<SHA>`

Update locations are the same keys but for `portfolio-studio-default`.

## Lockfile rule (very important)

After changing the SHA in `frontend/package.json`:

1) `cd frontend`
2) `npm install` (updates `frontend/package-lock.json`)
3) `npm run build`
4) Commit + push **both** `package.json` and `package-lock.json`

