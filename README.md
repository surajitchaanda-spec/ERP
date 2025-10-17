# ERP Staff Mobile Scaffold

This repository now contains a minimal monorepo scaffold for a staff-facing mobile application that reuses shared services from `@erp/mobile-core`.

## Structure

- `packages/mobile-core` – Core React utilities (authentication context), API client wrappers, offline store helpers, and integrations such as document uploads, chat, push notifications, and incident reporting.
- `apps/staff` – Staff mobile app scaffold with role-based dashboards for teachers and office staff. Modules cover rosters, attendance, gradebook, homework, timetable management, admissions, transport, inventory, announcements, document uploads, chat, and incident reporting.

Each module uses the shared core services to model API communication and offline-first behaviours.
