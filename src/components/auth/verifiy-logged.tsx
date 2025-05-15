'use client'

import { deleteCookie, getCookie } from 'cookies-next'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function VerifyLoggedIn({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      const token = getCookie('token-drive')

      if (!token) {
        router.push('/entrar')
        return
      }

      try {
        const res = await fetch('/personal', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          deleteCookie('token-drive')
          router.push('/entrar')
        } else {
          setLoading(false)
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        deleteCookie('token-drive')
        router.push('/entrar')
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
