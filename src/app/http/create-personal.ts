import { api } from "../api-client"

export interface CreatePersonalRequest {
  nome: string
  email: string
  password: string
  descricao: string
  area_atuacao: string
  profissao: string
  modelo_atendimento: string
}

export interface CreatePersonalResponse {
  personal: {
    id: string
    nome: string
    email: string
    password: string
    descricao: string
    area_atuacao: string
    profissao: string
    modelo_atendimento: string
  }
}

export default async function createPersonal({
  nome,
  email,
  password,
}: CreatePersonalRequest) {
  try {
    const response = await api
      .post('personal/', {
        json: {
          nome,
          email,
          password,
          descricao: "string",
          area_atuacao: "string",
          profissao: "string",
          modelo_atendimento: "Presencial"
        },
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
