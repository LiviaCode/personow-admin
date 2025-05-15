'use client'

import { useForm } from 'react-hook-form'

import createPersonal from '@/app/http/create-personal'
import { Label } from '@/components/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


type RegisterFormData = {
  nome: string
  email: string
  password: string
  descricao: string
  area_atuacao: string
  profissao: string
  modelo_atendimento: string
}

export default  function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>()

  async function onSubmit(data: RegisterFormData) {
    try {
      const response = await createPersonal(data)
      console.log('Usuário criado:', response)
 
    } catch (error) {
      console.error('Erro ao cadastrar:', error)

    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-purple-800"></div>

      <div className="flex w-full max-w-md flex-col justify-center bg-purple-900 p-10 text-white">
        <h2 className="mb-2 text-2xl font-bold">CADASTRO</h2>

        <p className="mb-6 text-sm">
          Faça seu cadastro com sua conta google ou insira suas informações
          abaixo.
        </p>

        <Button className="mb-6 flex w-full items-center justify-center rounded border border-orange-400 bg-purple-900 p-3">
          {/* botão para Google login, se quiser implementar depois */}
        </Button>

        <hr className="mb-6 border-gray-400" />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Nome completo</Label>
            <Input
              {...register('nome')}
              placeholder="Digite seu nome"
              className="w-full rounded border border-orange-400 bg-transparent p-2 text-white placeholder:text-gray-400"
            />
          </div>

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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded bg-orange-400 p-3 font-semibold text-white transition-colors hover:bg-orange-500"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs">
          Já possui conta?{' '}
          <a href="/entrar" className="font-bold text-white">
            Entrar
          </a>
        </p>
      </div>
    </div>
  )
}
