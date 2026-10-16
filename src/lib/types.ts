export function getRequiredTenantIdFromSession() {
  const tenantId = process.env.DEV_TENANT_ID || 'demo-tenant'
  return tenantId
}

export function assertTenantAccess(userTenantId: string, requestedTenantId: string) {
  if (!userTenantId || !requestedTenantId) {
    throw new Error('Tenant context is required for this request.')
  }

  if (userTenantId !== requestedTenantId) {
    throw new Error('You do not have access to this tenant.')
  }
}
