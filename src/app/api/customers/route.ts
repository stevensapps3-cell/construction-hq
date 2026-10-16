import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const [customers, projects, estimates, invoices] = await Promise.all([
    prisma.customer.count(),
    prisma.project.count(),
    prisma.estimate.count(),
    prisma.invoice.count(),
  ])

  return NextResponse.json({
    customers,
    projects,
    estimates,
    invoices,
    status: 'ok',
  })
}
