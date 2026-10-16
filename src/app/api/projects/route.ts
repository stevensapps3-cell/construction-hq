import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const customers = await prisma.customer.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(customers)
}

export async function POST(req: Request) {
  const body = await req.json()

  const customer = await prisma.customer.create({
    data: {
      tenantId: body.tenantId ?? 'pending',
      name: body.name,
      businessName: body.businessName ?? null,
      email: body.email ?? null,
      phone: body.phone ?? null,
      billingAddress: body.billingAddress ?? null,
      jobSiteAddress: body.jobSiteAddress ?? null,
    },
  })

  return NextResponse.json(customer, { status: 201 })
}
