import { api } from "@/app/api-client";

export interface createSessaoRequest {
  id: string;
  identificador: string;
  titulo: string;
  ordem: string;
}

export async function createSessao({
  id,
  identificador,
  titulo,
  ordem,
}: createSessaoRequest) {
  try {
    const response = await api
      .post(`sessao/treino/${id}`, { json: { identificador, titulo, ordem } })
      .json();
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
