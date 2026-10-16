import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function InvoicesPage() {
  const invoices = await prisma.invoice.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p style={{ margin: 0, color: '#4b5563' }}>Finance</p>
          <h1 style={{ margin: '0.25rem 0 0' }}>Invoices</h1>
        </div>
        <Link href="/" style={{ textDecoration: 'none', color: '#111827', fontWeight: 600 }}>Back to dashboard</Link>
      </header>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {invoices.length === 0 ? (
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.5rem' }}>
            <p style={{ margin: 0, color: '#6b7280' }}>No financial documents have been recorded yet. Verified invoices and payments will appear here.</p>
          </div>
        ) : (
          invoices.map((invoice) => (
            <div key={invoice.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>{invoice.number}</h3>
              <p style={{ margin: '0.25rem 0 0', color: '#4b5563' }}>Status: {invoice.status}</p>
              <p style={{ margin: '0.25rem 0 0', color: '#4b5563' }}>Balance: {invoice.total ? Number(invoice.total).toFixed(2) : '0.00'}</p>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
