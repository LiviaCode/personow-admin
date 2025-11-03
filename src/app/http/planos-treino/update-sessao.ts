import { api } from "@/app/api-client";

import { createSessaoRequest } from "./create-sessao";

export async function updateSessao(id: number, request: createSessaoRequest) {
  try {
    const response = await api
      .put(`sessao/treino/update/${id}`, { json: request })
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
