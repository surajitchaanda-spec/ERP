# Deployment Runbook

This document captures the standardized deployment procedures for the ERP platform across web, mobile, and backend services.

## Prerequisites

- Ensure the `main` branch is green in CI and all required reviews are complete.
- Verify the CHANGELOG entry for the release has been authored and QA sign-off recorded in Jira.

## Web Application

1. Trigger the `ci-web.yml` workflow manually or via merge to `main`.
2. Monitor the build and integration test stages. On success, the workflow promotes the build to the staging environment using the infrastructure-as-code deploy job.
3. Run smoke tests in staging (automated via Playwright) and collect approvals from stakeholders.
4. Approve the production deployment step in GitHub Actions. The workflow deploys to the production CDN and purges cache.

## Mobile Applications

1. Create a release branch and bump the mobile app version numbers.
2. Trigger the `ci-mobile.yml` workflow with the appropriate platform input (`ios` or `android`).
3. The pipeline builds signed artifacts and distributes them via Firebase App Distribution (Android) or TestFlight (iOS).
4. QA validates the build. Once approved, promote the build to production stores following platform-specific submission guidelines.

## Backend Services

1. Merge the release branch to `main` to trigger `ci-backend.yml`.
2. Ensure unit, integration, and contract tests pass. The deploy stage runs database migrations and applies infrastructure changes.
3. After deployment, verify health dashboards in Datadog/New Relic and confirm no Sentry alerts are firing.

## Rollback Plan

- Web: Redeploy the previous artifact using the `Rollback` job in `ci-web.yml`.
- Mobile: Revert to the last store-approved build and notify stakeholders.
- Backend: Deploy the previous container image and execute rollback migrations if required.

## Communication

- Post release notes in the #releases Slack channel, tagging support and customer success.
- Update the status page with the deployment window and outcome.
