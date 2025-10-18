# ERP Principal Application Scaffold

This repository now includes a Python-based scaffold for the Principal
mobile application. The modules are framework-agnostic, making them easy
to adapt to Django, FastAPI, or mobile backends.

## Structure

- `apps/principal/mobile_core.py` – shared models for device binding,
  notifications, and user context management.
- `apps/principal/security/authentication.py` – MFA, device binding, and
  session validation helpers.
- `apps/principal/dashboards/summary.py` – data models and aggregation
  helpers for attendance, fee collections, academic performance, and
  incident logs.
- `apps/principal/workflows/` – reusable state machine plus workflows for
  leave requests, budget expenses, and announcements.
- `apps/principal/communications/tools.py` – broadcast composer,
  scheduling, and observation note repositories.
- `apps/principal/bi/widgets.py` – BI/reporting widget configuration with
  export helpers.
- `apps/principal/analytics/audit.py` – audit logging, delegation
  registry, and usage analytics utilities.

These modules are intentionally lightweight, allowing you to plug them
into existing services or expand them with persistence layers, external
integrations, and user interfaces.
