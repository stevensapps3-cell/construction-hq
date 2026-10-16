import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p style={{ margin: 0, color: '#4b5563' }}>Document library</p>
          <h1 style={{ margin: '0.25rem 0 0' }}>Files & documents</h1>
        </div>
        <Link href="/" style={{ textDecoration: 'none', color: '#111827', fontWeight: 600 }}>Back to dashboard</Link>
      </header>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {documents.length === 0 ? (
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.5rem' }}>
            <p style={{ margin: 0, color: '#6b7280' }}>No uploaded files are available yet. Upload plans, permits, receipts, and project documents through the secure document workflow.</p>
          </div>
        ) : (
          documents.map((document) => (
            <div key={document.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>{document.fileName}</h3>
              <p style={{ margin: '0.25rem 0 0', color: '#4b5563' }}>{document.mimeType || 'Unknown type'}</p>
              <p style={{ margin: '0.25rem 0 0', color: '#4b5563' }}>{document.size ? `${document.size} bytes` : 'Size unavailable'}</p>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
