import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { customer: true },
  })

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p style={{ margin: 0, color: '#4b5563' }}>Project management</p>
          <h1 style={{ margin: '0.25rem 0 0' }}>Projects</h1>
        </div>
        <Link href="/" style={{ textDecoration: 'none', color: '#111827', fontWeight: 600 }}>Back to dashboard</Link>
      </header>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {projects.length === 0 ? (
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.5rem' }}>
            <p style={{ margin: 0, color: '#6b7280' }}>No projects exist yet. Create a real project linked to a verified customer.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>{project.title}</h3>
              <p style={{ margin: '0.25rem 0 0', color: '#4b5563' }}>{project.customer?.name || 'Unassigned customer'}</p>
              <p style={{ margin: '0.25rem 0 0', color: '#4b5563' }}>Status: {project.status}</p>
              <p style={{ margin: '0.25rem 0 0', color: '#4b5563' }}>Start: {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}</p>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
