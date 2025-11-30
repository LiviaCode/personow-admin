import { api } from "@/app/api-client";

// Essa rota cria um conta para o aluno no ASAS, api de pagamentos
export interface CreateClienteRequest {
  nome: string;
  cpfCnpj: string;
  email: string;
  telefone: string;
}

export interface CreateClienteResponse {
  id: string;
  dateCreated: string;
  name: string;
  email: string;
  mobilePhone: string;
  cpfCnpj: string;
  personType: string;
  country: string;
}

export default async function createCliente(data: CreateClienteRequest) {
  try {
    const response = await api
      .post("subconta/", {
        json: data,
      })
      .json<CreateClienteResponse>();

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const body = await error.response.text(); // ou .json() se for JSON
      console.error(`Erro ${status}:`, body);
    } else {
      console.error("Erro inesperado:", error);
    }

    throw error; // relança o erro para o componente lidar, se quiser
  }
}
