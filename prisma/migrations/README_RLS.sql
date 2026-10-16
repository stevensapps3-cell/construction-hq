version: 1

-- RLS and Tenant isolation guidance migration
-- IMPORTANT: Review and apply carefully. These SQL statements assume you will set
-- the session variable "app.current_tenant" for each DB connection to the current tenant's UUID.
-- Example (in your application): SET SESSION "app.current_tenant" = '<tenant-uuid>';

-- Enable row level security for tables (example for customers, projects, invoices)
ALTER TABLE "Customer" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tenant_isolation_customers" ON "Customer"
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tenant_isolation_projects" ON "Project"
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

ALTER TABLE "Invoice" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tenant_isolation_invoices" ON "Invoice"
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Repeat for other models as needed.

-- NOTE: Depending on how Prisma maps model names to table names, you may need to
-- adjust capitalization or schema qualifiers. Alternatively, create a database user
-- and application roles that enforce tenant-scoped access.
