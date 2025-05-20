import { api } from "../api-client"

export interface Aluno {
  map(arg0: (aluno: Aluno) => { nome: string; email: string; celular: string }): unknown
  id: string
  nome: string
  email: string
  password: string
  dateNascimento: string
  genero: 'Masculino' | 'Feminino' | 'Outro'
  celular: string
  altura: string
  objetivo: string
  peso: string
  condicaoMedica: string
  historicoLesao: string
  nivelAtividade: 'Sedentário' | 'Moderado' | 'Ativo'
}

export interface GetAllAlunosResponse {
  alunos: Aluno[]
}

export default async function getAllAlunos() {
  try {
    const response = await api.get('alunos/').json<Aluno[]>()
    return response

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status
      const body = await error.response.text()
      console.error(`Erro ${status}:`, body)
    } else {
      console.error('Erro inesperado:', error)
    }

    throw error
  }
}
