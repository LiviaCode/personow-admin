import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type Option = {
  label: string
  value: string
}

type FiltroContainerProps = {
  title: string
  selectOptions: Option[]
  children: React.ReactNode
} & React.ComponentProps<'input'>

export function FiltroContainer({
  title,
  selectOptions,
  children,
}: FiltroContainerProps) {
  return (
    <div className="space-y-4 p-6">
      <div className="justify- flex items-center text-2xl font-semibold text-text-web">
        {title}
      </div>
      <Separator />

      <div className="flex items-center justify-start">
        <label htmlFor="filter">Filtros: </label>
        <input
          name="filter"
          type="text"
          placeholder="Nome"
          className="basis-2xs mx-8 rounded-[8px] border border-secondary-web p-2 focus:outline-none"
        ></input>
        <select className="basis-2xs mx-8 w-36 rounded-[8px] border border-secondary-web p-2 focus:outline-none">
          {selectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Button className="mx-8">
          <Search />
        </Button>
      </div>
      {children}
    </div>
  )
}
