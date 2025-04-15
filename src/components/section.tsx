'use client'

import { SearchIcon } from 'lucide-react'
import {
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { Button as ButtonUI } from './ui/button'

interface RootProps extends ComponentProps<'div'> {
  children: ReactNode
}

function Root({ children, className, ...props }: RootProps) {
  return (
    <Dialog>
      <main className={twMerge(['space-y-4 p-6', className])} {...props}>
        {children}
      </main>
    </Dialog>
  )
}

interface TitleProps extends ComponentProps<'div'> {
  title: string
}

function Title({ title, className, children, ...props }: TitleProps) {
  return (
    <div
      {...props}
      className={twMerge(['flex items-center justify-between', className])}
    >
      <h1 className="text-2xl font-semibold text-text-web">{title}</h1>

      {children}
    </div>
  )
}

type ButtonProps = ComponentProps<'button'>

function Button({ className, ...props }: ButtonProps) {
  return (
    <DialogTrigger asChild>
      <ButtonUI {...props} className={twMerge(['', className])} />
    </DialogTrigger>
  )
}

interface SearchProps {
  onSearchChange?: (value: string) => void
  onSearchClick: (value: string) => void
}

function Search({ onSearchClick, onSearchChange }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>('')

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearchValue(value)
    onSearchChange?.(value)
  }

  function handleSearchClick() {
    onSearchClick(searchValue)
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Buscar"
        value={searchValue}
        onChange={handleSearchChange}
        className={twMerge(['w-full max-w-md'])}
        onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
      />

      <Button onClick={handleSearchClick}>
        <SearchIcon />
      </Button>
    </div>
  )
}

export const Section = {
  Root,
  Title,
  Button,
  Search,
}
