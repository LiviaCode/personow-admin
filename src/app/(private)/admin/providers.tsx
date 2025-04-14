'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function ProvidersAdmin({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <SidebarTrigger className="mt-5 px-2 text-text-web opacity-80 hover:opacity-100" />

        <div className="grid h-screen w-full grid-rows-[auto_1fr]">
          <div>
            <Header />

            <div className="px-6">
              <Separator />
            </div>
          </div>

          <div className="overflow-y-auto">
            <Suspense key={pathname}>
              {children}
            </Suspense>
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}
