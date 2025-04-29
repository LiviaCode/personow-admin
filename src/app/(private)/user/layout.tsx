import type { Metadata } from 'next'

import ProvidersUser from './providers'

export const metadata: Metadata = {
  title: 'Personow | Aluno',
}

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ProvidersUser>{children}</ProvidersUser>
}
