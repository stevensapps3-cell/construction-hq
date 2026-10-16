# Placeholder for authentication utilities. Implement NextAuth or your preferred auth provider.

export function getTenantIdFromSession(req: any) {
  // In production, extract tenant id from the authenticated session.
  // For local dev, use a fixed demo tenant id if present in env.
  return process.env.DEV_TENANT_ID ?? null
}
