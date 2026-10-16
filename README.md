# ConstructionHQ

Production-ready, multi-tenant construction management application scaffold.

This repository contains a secure, TypeScript-based Next.js + Prisma starter designed for multi-tenant operation. It intentionally includes row-level security (RLS) guidance and tenant-aware patterns.

Quick start (development):

1. Copy .env.example to .env and fill the values.
2. Start services: docker compose up -d
3. Install dependencies: npm install
4. Generate Prisma client: npx prisma generate
5. Run migrations: npx prisma migrate dev --name init
6. Start dev server: npm run dev

Only What I Need From You

1. Production Postgres connection string (DATABASE_URL) and read/write credentials — required for production deployment.
2. S3-compatible credentials (for file uploads) or cloud storage access — required to enable document uploads in production.
3. OAuth credentials for QuickBooks and payment providers when you want those integrations enabled.

I will not ask for these secrets until we reach the integration steps. Local development uses Docker Compose with a local Postgres and MinIO instance.
