import type { Metadata } from 'next'

import ProvidersAdmin from './providers'

export const metadata: Metadata = {
  title: 'Personow | ADMIN',
}

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ProvidersAdmin>{children}</ProvidersAdmin>
}
