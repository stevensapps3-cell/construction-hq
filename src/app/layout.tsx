import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ConstructionHQ',
  description: 'Secure multi-tenant construction management platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
