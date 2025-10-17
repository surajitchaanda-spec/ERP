# Shared UI Library

This package contains the design system primitives, reusable UI components, and localization helpers used across the ERP applications.

## Contents

- `src/theme/tokens.ts` — centrally managed design tokens.
- `src/components/` — composable React components built on the design tokens.
- `src/localization/` — utilities for initializing localized UI copy.
- `src/__stories__/` — Storybook stories for visual testing and documentation.
- `src/__tests__/` — unit tests validating component behavior and accessibility.

## Usage

```tsx
import { Button, tokens } from '@erp/shared-ui';
```

## Development scripts

- `npm run build --workspace @erp/shared-ui`
- `npm run lint --workspace @erp/shared-ui`
- `npm run test --workspace @erp/shared-ui`
- `npm run storybook`
