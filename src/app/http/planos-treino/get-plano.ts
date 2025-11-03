import { api } from "@/app/api-client";

import { dadosPlano } from "./get-all-planos";

// Retorna apenas o plano especificado com o personal logado
export async function getPlano(idPlano: number) {
  try {
    const response = await api
      .get(`plano/personal/aluno/planos/${idPlano}`)
      .json<dadosPlano>();
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
