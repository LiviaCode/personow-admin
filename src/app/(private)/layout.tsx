import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Personow | Admin',
}

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
