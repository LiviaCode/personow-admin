import { api } from "@/app/api-client";

import { dadosExercicio } from "./get-all-exercicio";

export interface createExercicioRequest {
  nome: string;
  grupo_muscular: string;
  descricao: string;
}

export async function createExercicio(request: createExercicioRequest) {
  try {
    const response = await api
      .post("exercicios", { json: request })
      .json<dadosExercicio>();
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
