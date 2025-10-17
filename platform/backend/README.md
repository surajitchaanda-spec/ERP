# ERP Backend

NestJS-based backend service for the ERP monorepo. Provides multi-tenant APIs for attendance, grades, fees, announcements, messaging, and authentication.

## Getting Started

```bash
npm install
npm run start:dev
```

## Database

The service uses PostgreSQL with TypeORM. Configure environment variables via `.env` or the host environment:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`, `JWT_EXPIRES_IN`
- `TENANT_HEADER_KEY`

Run migrations and seed data:

```bash
npm run migration:run
npm run seed
```
