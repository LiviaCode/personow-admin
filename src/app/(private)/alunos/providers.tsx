"use client";

import { Suspense } from "react";
import { Mail, Send, UsersRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { AppSidebar, ItemsProps } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const items: ItemsProps[] = [
  {
    title: "Home",
    url: "/alunos/home",
    icon: UsersRound,
  },
  {
    title: "Mensagens",
    url: "/alunos/mensagens",
    icon: Mail,
  },
  {
    title: "Agenda",
    url: "/alunos/minha-agenda",
    icon: Send,
  },
];

export default function ProvidersAlunos({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <>
      <SidebarProvider className="">
        <AppSidebar items={items} />

        <SidebarTrigger className="mt-5 px-2 text-text-web opacity-80 hover:opacity-100" />

        <div className="absolute left-0 top-0 z-20 grid h-screen w-full grid-rows-[1fr_5fr] md:relative md:z-auto">
          <header className="flex flex-col items-start justify-center px-10 py-8">
            <div className="text-left">
              <h1 className="font-semibold">Olá, usuário!</h1>
              <span className="text-xs text-gray-500">
                Encontre o melhor profissional que se encaixe com você
              </span>
            </div>
          </header>

          <div className="overflow-visible rounded-t-[25px] bg-purple-900 p-4">
            <Suspense key={pathname}>{children}</Suspense>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
