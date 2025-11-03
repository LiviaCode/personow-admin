import { api } from "@/app/api-client";

export interface createPlanoRequest {
  nome: string;
  data_inicio: string;
  data_fim: string;
  status: string;
  observacoes_gerais: string;
}

export async function createPlano(id: number, request: createPlanoRequest) {
  try {
    const response = await api.post(`plano/${id}`, { json: request }).json();
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const body = await error.response.text();
      console.error(`Erro ${status}:`, body);
    } else {
      console.error("Erro inesperado:", error);
    }
    throw error;
  }
}
