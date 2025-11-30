import { api } from "@/app/api-client";

// Essa rota cria um conta para o personal no ASAS, api de pagamentos
export interface CreateSubcontaRequest {
  nome: string;
  personalId: string;
  email: string;
  cpfCnpj: string;
  dataNascimento: string;
  rendaMensal: string;
  endereco: string;
  numeroEndereco: string;
  bairro: string;
}

export interface CreateSubcontaResponse {
  message: string;
  personal: {
    id: string;
    personal_id: string;
    cpf_cnpj: string;
    data_nascimento: string;
    renda_mensal: string;
    endereco: string;
    numero_endereco: string;
    bairro: string;
    cep: string;
    telefone: string;
    status: string;
    conta_id: string;
    carteira_id: string;
    api_key: string;
  };
}

export default async function createSubconta(data: CreateSubcontaRequest) {
  try {
    const response = await api
      .post("subconta/", {
        json: data,
      })
      .json<CreateSubcontaResponse>();

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
