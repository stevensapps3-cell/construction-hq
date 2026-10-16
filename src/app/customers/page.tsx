import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getDashboardStats() {
  const [customerCount, projectCount, estimateCount, invoiceCount, overdueInvoices] = await Promise.all([
    prisma.customer.count(),
    prisma.project.count(),
    prisma.estimate.count(),
    prisma.invoice.count(),
    prisma.invoice.count({ where: { status: 'overdue' } }),
  ])

  return { customerCount, projectCount, estimateCount, invoiceCount, overdueInvoices }
}

export default async function HomePage() {
  const stats = await getDashboardStats().catch(() => ({
    customerCount: 0,
    projectCount: 0,
    estimateCount: 0,
    invoiceCount: 0,
    overdueInvoices: 0,
  }))

  const nav = [
    { href: '/customers', label: 'Customers' },
    { href: '/projects', label: 'Projects' },
    { href: '/estimates', label: 'Estimates' },
    { href: '/invoices', label: 'Invoices' },
    { href: '/documents', label: 'Documents' },
    { href: '/settings', label: 'Settings' },
  ]

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p style={{ color: '#4b5563', margin: 0 }}>ConstructionHQ</p>
          <h1 style={{ margin: '0.25rem 0 0', fontSize: '2.25rem' }}>Operational dashboard</h1>
        </div>
        <Link href="/settings" style={{ padding: '0.75rem 1rem', background: '#111827', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>Company settings</Link>
      </header>

      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: '#111827', background: '#f3f4f6', padding: '0.65rem 0.9rem', borderRadius: 8, fontWeight: 600 }}>
            {item.label}
          </Link>
        ))}
      </nav>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Customers" value={stats.customerCount} />
        <StatCard title="Projects" value={stats.projectCount} />
        <StatCard title="Estimates" value={stats.estimateCount} />
        <StatCard title="Invoices" value={stats.invoiceCount} />
        <StatCard title="Overdue" value={stats.overdueInvoices} />
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <Panel title="Recent activity">
          <EmptyState message="No activity yet. Create a customer, project, or invoice to start tracking operational updates." />
        </Panel>
        <Panel title="Upcoming deadlines">
          <EmptyState message="No upcoming deadlines were found. Add project milestones or task dates to populate this view." />
        </Panel>
        <Panel title="Financial overview">
          <EmptyState message="No verified financial records have been entered yet. Use real invoices, estimates, and expenses to populate the reporting data." />
        </Panel>
      </section>
    </main>
  )
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem' }}>
      <p style={{ margin: 0, color: '#6b7280' }}>{title}</p>
      <h2 style={{ margin: '0.5rem 0 0', fontSize: '2rem' }}>{value}</h2>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem' }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return <p style={{ color: '#6b7280', marginBottom: 0 }}>{message}</p>
}
