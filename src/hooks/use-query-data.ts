import { useQuery } from '@tanstack/react-query'

import { profilePersonal } from '@/app/http/personal/profile-personal'


export function useGetProfilePersonal(email?: string, password?: string) {
  return useQuery({
    queryKey: ['profile', email, password],
    queryFn: () => profilePersonal({ email: email!, password: password! }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 20,
    refetchIntervalInBackground: false,
    enabled: Boolean(email && password), // só executa se email e senha existirem
  })
}