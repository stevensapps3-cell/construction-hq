import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p style={{ margin: 0, color: '#4b5563' }}>CRM</p>
          <h1 style={{ margin: '0.25rem 0 0' }}>Customers</h1>
        </div>
        <Link href="/" style={{ color: '#111827', textDecoration: 'none', fontWeight: 600 }}>Back to dashboard</Link>
      </header>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {customers.length === 0 ? (
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.5rem' }}>
            <p style={{ margin: 0, color: '#6b7280' }}>No customer records exist yet. Create the first verified customer record to begin project work.</p>
          </div>
        ) : (
          customers.map((customer) => (
            <div key={customer.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>{customer.name}</h3>
              <p style={{ margin: 0, color: '#4b5563' }}>{customer.businessName || 'Individual customer'}</p>
              <p style={{ margin: '0.35rem 0 0', color: '#4b5563' }}>{customer.email || 'No email provided'}</p>
              <p style={{ margin: '0.2rem 0 0', color: '#4b5563' }}>{customer.phone || 'No phone on file'}</p>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
