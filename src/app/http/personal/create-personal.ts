import { api } from "@/app/api-client"


export interface CreatePersonalRequest {
  nome: string
  email: string
  password: string
  descricao: string
  formacao: string
  experiencia: string
  cidade: string
  profissao: string
  areaAtuacao: string
  modeloAtendimento: 'presencial' | 'online'
}

export interface CreatePersonalResponse {
  personal: {
    id: string
    nome: string
    email: string
    password: string
    descricao: string
    formacao: string
    experiencia: string
    cidade: string
    profissao: string
    areaAtuacao: string
    modeloAtendimento: string
  }
}

export default async function createPersonal(data: CreatePersonalRequest) {
  try {
const response = await api
    .post('personal/', {
      json: data, 
    })
    .json<CreatePersonalResponse>()


    return response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status
      const body = await error.response.text() // ou .json() se for JSON
      console.error(`Erro ${status}:`, body)
    } else {
      console.error('Erro inesperado:', error)
    }

    throw error // relança o erro para o componente lidar, se quiser
  }
}
