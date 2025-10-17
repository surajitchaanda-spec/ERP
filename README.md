# ERP Platform Monorepo

This repository hosts a scaffolded enterprise resource planning (ERP) platform for schools. It
includes a NestJS backend service and a Vite-powered React admin console, CI/CD definitions, and
infrastructure-as-code templates to accelerate deployments.

## Structure

```
platform/
  backend/     # NestJS service exposing multi-tenant APIs and database migrations
  web-admin/   # React admin portal with dashboards and master data management
ci/            # GitHub Actions workflows
infra/         # Terraform and Helm starter templates
```

Refer to each package's README for setup instructions.
