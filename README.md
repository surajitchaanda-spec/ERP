# ERP Platform Monorepo

This repository hosts the foundational tooling, shared libraries, and operational playbooks for the School ERP platform.

## Structure

- `packages/shared-ui` — Design system tokens, React components, localization utilities, and Storybook stories.
- `packages/shared-services` — API clients, environment configuration, localization helpers for server and mobile use.
- `docs/` — Design system strategy, deployment runbook, and onboarding guides.
- `tests/`, `contract-tests/`, `e2e/` — Automated test suites (unit, integration, contract, and end-to-end).
- `infra/` — Observability, logging, and backup documentation.
- `.github/workflows/` — CI pipelines for web, mobile, and backend applications.

## Getting Started

```bash
npm install
npm run lint
npm run test
npm run storybook
```

## Continuous Integration

GitHub Actions workflows orchestrate build, test, and deployment pipelines for each application surface:

- Web CI builds, runs Storybook, executes unit/integration tests, and deploys to staging/production.
- Mobile CI produces signed builds for Firebase App Distribution (Android) and TestFlight (iOS).
- Backend CI runs unit, integration, and contract tests before deploying infrastructure updates.
