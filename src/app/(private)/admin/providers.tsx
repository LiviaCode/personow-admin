"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

import { AppSidebar } from "@/components/app-sidebar";
// import { VerifyAdmin } from '@/components/auth/verify-admin'
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ProvidersAdmin({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <SidebarTrigger className="mt-5 px-2 text-text-web opacity-80 hover:opacity-100" />

        <div className="absolute left-0 top-0 z-20 grid h-screen w-full grid-rows-[auto_1fr] md:relative md:z-auto">
          <div>
            <Header />

            <div className="px-6">
              <Separator />
            </div>
          </div>

          <div className="overflow-y-auto md:pr-5">
            <Suspense key={pathname}>
              {/* fallback={<LoaderPet full={false} />}> */}
              {children}
            </Suspense>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
