import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seed() {
  // Create a demo tenant and admin user for local development only
  const tenant = await prisma.tenant.create({ data: { name: 'Demo Tenant' } })
  await prisma.user.create({ data: { tenantId: tenant.id, email: 'admin@example.com', name: 'Admin', role: 'admin', password: 'password' } })
  console.log('Seeded demo tenant:', tenant.id)
}

seed()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
