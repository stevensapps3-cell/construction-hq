import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' }, include: { customer: true } })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const body = await req.json()

  const project = await prisma.project.create({
    data: {
      tenantId: body.tenantId ?? 'pending',
      customerId: body.customerId ?? null,
      title: body.title,
      description: body.description ?? null,
      status: body.status ?? 'planning',
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      budget: body.budget ? Number(body.budget) : null,
    },
  })

  return NextResponse.json(project, { status: 201 })
}
