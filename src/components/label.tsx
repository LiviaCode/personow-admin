import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Label as LabelUI } from './ui/label'

type LabelProps = ComponentProps<typeof LabelUI>

export function Label({ className, ...props }: LabelProps) {
  return (
    <LabelUI
      className={twMerge(['ml-2 text-sm text-white', className])}
      {...props}
    />
  )
}
