"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { Bell, LogOut, Megaphone, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { profileAluno } from "@/app/http/aluno/profile-aluno";
import { profilePersonal } from "@/app/http/personal/profile-personal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ThemeToggle } from "./theme/theme-toggle";
import { Skeleton } from "./ui/skeleton";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";

  const [nome, setNome] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = getCookie("token");
      if (!token) {
        setLoading(false);
        return;
      }

      // try {
      //   let response
      //   // Tenta buscar como aluno
      //   try {
      //     response = await profileAluno({ token } as any)
      //   } catch {
      //     // Se falhar, tenta como personal
      //     response = await profilePersonal({ token } as any)
      //   }
      //   setNome(response.nome)
      // } catch (error) {
      //   console.error('Erro ao buscar dados do usuário', error)
      // } finally {
      //   setLoading(false)
      // }
    }

    fetchUser();
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/");
  };

  return (
    <header className="flex w-full items-center justify-between px-6 py-4">
      {isAdminPage && (
        <h1 className="text-2xl font-semibold text-text-web">
          Bem Vindo{" "}
          {loading ? <Skeleton className="inline-block h-6 w-20" /> : nome}
        </h1>
      )}

      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="none" className="w-0 rounded-full bg-transparent">
              <Bell className="size-6" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 text-center">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Megaphone />
                <span>puxar Api</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              size="icon"
              className="rounded-full bg-transparent"
            >
              <Avatar className="size-8">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/admin/perfil">
                <DropdownMenuItem>
                  <User />
                  <span>Perfil</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/admin/configuracoes">
                <DropdownMenuItem>
                  <Settings />
                  <span>Configurações</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>Desconectar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
