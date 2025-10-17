# Design System Strategy

The ERP platform uses a centralized design system to guarantee consistency across the web, iOS, and Android applications.

## Tooling

- **Figma** — Source of truth for components, color palettes, and typography. Libraries are versioned per release channel (alpha/beta/stable).
- **Storybook (React + Vite)** — Interactive documentation for the shared UI package. Storybook integrates design references via the Figma plugin to keep the code and design artifacts in sync.

## Governance

1. All visual changes begin in Figma. Designers publish updates to the shared library and attach changelog notes.
2. Engineers sync tokens by updating `packages/shared-ui/src/theme/tokens.ts` and regenerate snapshots via `npm run storybook`.
3. Pull requests must include screenshots or Storybook deploy previews. Linting enforces token usage and rejects hard-coded colors.

## Linting & Style Enforcement

- ESLint configuration (`eslint.config.js`) ensures React, accessibility, and import ordering rules are respected.
- Stylelint (`stylelint.config.cjs`) validates CSS or styled-components conventions when CSS modules are introduced.
- Prettier enforces formatting via the `lint-staged` pre-commit hook.

## Visual Regression

- Storybook stories serve as the baseline for Chromatic/Playwright visual diffing (to be connected in CI).
- Each component story references the Figma design via the `design` parameter to cross-link design tokens and implementation.

## Accessibility

- Components must provide keyboard focus states and use semantic elements.
- Unit tests should assert accessibility-critical behaviors (e.g., `aria-` attributes). Additional tooling such as Storybook a11y add-on can be enabled in `.storybook/main.ts` when needed.
