import { api } from "@/app/api-client";

import { createExercicioRequest } from "./create-exercicio";

export async function updateExercicio(
  id: number,
  request: createExercicioRequest,
) {
  try {
    const response = await api
      .put(`exercicios/${id}`, { json: request })
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
