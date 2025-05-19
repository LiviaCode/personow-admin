'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { profilePersonal } from '@/app/http/profile-personal'
import { Label } from '@/components/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type LoginFormData = {
  email: string
  password: string
}

export default function LoginPersonal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit(data: LoginFormData) {
    setErrorMessage(null)

    try {
      const response = await profilePersonal(data)
      console.log('Login bem-sucedido:', response)

      localStorage.setItem('token', response.token)
      window.location.href = '/admin'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrorMessage('E-mail ou senha inválidos. Tente novamente.')
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-purple-800"></div>

      <div className="flex w-full max-w-md flex-col justify-center bg-purple-900 p-10 text-white">
        <h2 className="mb-2 text-2xl font-bold">ENTRAR</h2>
        <p className="mb-6 text-sm">
          Faça login com sua conta google ou insira suas informações abaixo.
        </p>

        <Button className="mb-6 flex w-full items-center justify-center rounded border border-orange-400 bg-purple-900 p-3 hover:bg-purple-900">
          {/* botão para Google login, se quiser implementar depois */}
        </Button>

        <hr className="mb-6 border-gray-400" />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              {...register('email')}
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full rounded border border-orange-400 bg-transparent p-2 text-white placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              {...register('password')}
              type="password"
              placeholder="Digite sua senha"
              className="w-full rounded border border-orange-400 bg-transparent p-2 text-white placeholder:text-gray-400"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded bg-orange-400 p-3 font-semibold text-white transition-colors hover:bg-orange-500"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs">
          Não possui conta?{' '}
          <a href="/registrar-personal" className="font-bold text-white">
            Cadastrar-se
          </a>
        </p>
      </div>
    </div>
  )
}
