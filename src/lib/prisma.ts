import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const documents = await prisma.document.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(documents)
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'A valid file upload is required.' }, { status: 400 })
  }

  const document = await prisma.document.create({
    data: {
      tenantId: 'pending',
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
    },
  })

  return NextResponse.json(document, { status: 201 })
}
