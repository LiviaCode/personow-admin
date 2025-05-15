import { api } from "../api-client"

interface ProfilePersonalRequest {
  email: string
  password: string
}

interface ProfilePersonalResponse {
  token: string
  personal: {
    id: string
    nome: string
    email: string
  }
}

export async function profilePersonal({
  email,
  password,
}: ProfilePersonalRequest): Promise<ProfilePersonalResponse> {
  try {
    const response = await api
      .post('personal/token/', {
        json: { email, password },
      })
      .json<ProfilePersonalResponse>()

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
