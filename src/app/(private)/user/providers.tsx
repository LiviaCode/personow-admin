'use client'

import { usePathname } from 'next/navigation'

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  return (
    <>
      <div>oi</div>
    </>
  )
}
