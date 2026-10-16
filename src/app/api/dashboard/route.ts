import Link from 'next/link'

export default function SettingsPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p style={{ margin: 0, color: '#4b5563' }}>System configuration</p>
          <h1 style={{ margin: '0.25rem 0 0' }}>Settings</h1>
        </div>
        <Link href="/" style={{ textDecoration: 'none', color: '#111827', fontWeight: 600 }}>Back to dashboard</Link>
      </header>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <Panel title="Company profile" description="Tenant details, addresses, invoice preferences, and business configuration." />
        <Panel title="User roles & permissions" description="Server-side authorization, RBAC, and company-level isolation controls." />
        <Panel title="Integrations" description="QuickBooks status, payments, notifications, and storage connectivity." />
      </div>
    </main>
  )
}

function Panel({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.25rem' }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ marginBottom: 0, color: '#4b5563' }}>{description}</p>
    </div>
  )
}
