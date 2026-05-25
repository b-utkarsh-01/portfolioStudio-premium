# Premium Templates Structure

Each premium template must live in its own folder under:

`src/templates/<template-id>/`

## Current pattern

- `src/templates/nebula1/` (template id: `premium-v1`)

Shared runtime-level files:
- `src/portfolio/PortfolioRenderer.jsx` (template-aware section renderer)
- `src/index.js` (public exports)

## Add a new premium template

1. Create a new folder:
- `src/templates/obsidian/`

2. Add all template-specific code inside that folder:
- layout
- about/sections
- features (if needed)
- template metadata file (example: `premium-v2.template.js`)

3. Export new template metadata + components from:
- `src/index.js`

4. Register selection logic (if needed) in:
- `src/portfolio/PortfolioRenderer.jsx`

Rule: do not mix files of different premium templates in one folder.
