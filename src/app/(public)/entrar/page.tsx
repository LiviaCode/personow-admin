import { Label } from '@/components/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-purple-800"></div>

      <div className="flex w-full max-w-md flex-col justify-center bg-purple-900 p-10 text-white">
        <h2 className="mb-2 text-2xl font-bold">ENTRAR</h2>
        <p className="mb-6 text-sm">
          Faça login com sua conta google ou insira suas informações abaixo.
        </p>

        <Button className="mb-6 flex w-full items-center justify-center rounded border border-orange-400 bg-purple-900 p-3"></Button>

        <hr className="mb-6 border-gray-400" />

        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              placeholder="Digite seu e-mail"
              className="w-full rounded border border-orange-400 bg-transparent p-2 text-white placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              placeholder="Digite sua senha"
              className="w-full rounded border border-orange-400 bg-transparent p-2 text-white placeholder:text-gray-400"
            />
          </div>

          <Button className="mt-4 w-full rounded bg-orange-400 p-3 font-semibold text-white transition-colors hover:bg-orange-500">
            Entrar
          </Button>
        </div>

        <p className="mt-6 text-center text-xs">
          Não possui conta?{' '}
          <a href="/register" className="font-bold text-white">
            Cadastrar-se
          </a>
        </p>
      </div>
    </div>
  )
}
