import { useQuery } from '@tanstack/react-query'

import { profilePersonal } from '@/app/http/profile-personal'

export function useProfilePersonal() {
  return useQuery({
    queryKey: ['personal'],
    queryFn: profilePersonal,
  })
}
