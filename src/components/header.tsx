'use client'

// import { deleteCookie } from 'cookies-next'
// import { signOut } from 'firebase/auth'
import { Bell, LogOut, Megaphone, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import userDefault from '@/assets/user.png'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { useGetProfile } from '@/hooks/use-query-data'
// import { auth } from '@/lib/firebase'

import { ThemeToggle } from './theme/theme-toggle'
import { Skeleton } from './ui/skeleton'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const isAdminPage = pathname === '/admin'

//   const { data, isPending } = useGetProfile()

//   async function handleDisconnect() {
//     await signOut(auth)
//     deleteCookie('token')
//     router.push('/')
//   }

  return (
    <header className="flex w-full items-center justify-between px-6 py-4">
      {isAdminPage && (
        <h1 className="text-2xl font-semibold text-text-web">
          Bem Vindo 
          {/* {data?.name.split(' ')[0]}! */}
        </h1>
      )}

      <div className="ml-auto flex items-center gap-4">
        {/* {isAdminPage && (
          <Input
            type="email"
            placeholder="Pesquisar"
            startIcon={Search}
            className="px-12 py-3"
          />
        )} */}

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                // variant="none"
                className="w-0 rounded-full bg-transparent"
              >
                <Bell className="size-8" />
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
               
                  <Skeleton className="size-8 rounded-full" />
            
                  <Avatar className="size-8">
                    <AvatarImage
                    />
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

              <DropdownMenuItem >
                <LogOut />
                <span>Desconectar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
