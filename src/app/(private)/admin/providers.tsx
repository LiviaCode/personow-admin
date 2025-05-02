// <<<<<<< HEAD
// 'use client'

// import { usePathname } from 'next/navigation'
// import { Suspense } from 'react'

// import { AppSidebar } from '@/components/app-sidebar'
// // import { VerifyAdmin } from '@/components/auth/verify-admin'
// import { Header } from '@/components/header'
// import { Separator } from '@/components/ui/separator'
// import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
// =======
"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

import { AppSidebar, ItemsProps } from "@/components/app-sidebar";
// import { VerifyAdmin } from '@/components/auth/verify-admin'
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChartNoAxesCombined, Mail, Send, UsersRound } from "lucide-react";

const items: ItemsProps[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Meus Alunos",
    url: "/admin/meus-alunos",
    icon: UsersRound,
  },
  {
    title: "Mensagens",
    url: "/admin/mensagens",
    icon: Mail,
  },
  {
    title: "Solicitações de Agendamentos",
    url: "/admin/solicitacoes-agendamentos",
    icon: Send,
    subItems: [
      {
        title: "Minha Agenda",
        url: "/admin/solicitacoes-agendamentos/minha-agenda",
      },
    ],
  },
];

export default function ProvidersAdmin({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <>
      <SidebarProvider>
        <AppSidebar items={items} />

        <SidebarTrigger className="mt-5 px-2 text-text-web opacity-80 hover:opacity-100" />

        {/* <<<<<<< HEAD
//         <div className="grid h-screen w-full grid-rows-[auto_1fr]"> */}

        <div className="absolute left-0 top-0 z-20 grid h-screen w-full grid-rows-[auto_1fr] md:relative md:z-auto">
          <div>
            <Header />

            <div className="px-6">
              <Separator />
            </div>
          </div>

          {/* <<<<<<< HEAD
          <div className="overflow-y-auto">
======= */}
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
