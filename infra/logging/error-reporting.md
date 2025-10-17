# Error Reporting & Logging

## Sentry

- Frontend and mobile clients initialize Sentry using DSNs provided via environment configuration (`packages/shared-services/src/config/environment.ts`).
- Release health is tracked via source maps generated in the CI build stage.
- User privacy: PII is scrubbed before events are sent using Sentry before-send hooks.

## Backend Logging

- Structured logging format: JSON lines with the following keys: `timestamp`, `level`, `service`, `correlationId`, `message`, and `metadata`.
- Logs are shipped to Datadog via Fluent Bit. Retention: 30 days in Datadog, 1 year in cold storage (S3 + Glacier).

## Alert Workflow

1. Sentry issues alerts to PagerDuty for P1 incidents, Slack for P2/P3.
2. Support team triages and links alerts to Jira incidents.
3. Engineering performs root cause analysis (RCA) within 48 hours for P1 events.
