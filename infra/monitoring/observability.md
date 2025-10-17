# Observability Stack

## Datadog

- **APM & Logs**: The backend services emit structured logs (JSON) to Datadog via the Datadog agent sidecar. Dashboards: `ERP - API Latency`, `ERP - Database Throughput`.
- **RUM (Web)**: Web applications include the Datadog browser SDK configured in `packages/shared-services/src/config/environment.ts`.
- **Mobile**: React Native apps integrate the Datadog Mobile SDK for crash reporting and session replay.

## New Relic

- Used for infrastructure and synthetic monitoring. The NR Terraform module provisions uptime checks for public endpoints and monitors background jobs.

## Alerting

- Alerts route through PagerDuty using the `alerts@schoolerp` integration.
- High priority alerts: API latency, login failure rate, mobile crash-free sessions < 99%.
- Weekly reports summarize key metrics for stakeholders.
