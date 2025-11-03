import { api } from "@/app/api-client";

export interface getExercicioResponse {
  result: dadosExercicio[];
}

export interface dadosExercicio {
  id: number;
  nome: string;
  grupo_muscular: string;
  descricao: string;
  created_at: string;
  updated_at: string;
  videoExercicios: [];
}
export async function getAllExercicio() {
  try {
    const response = await api.get(`exercicios`).json<getExercicioResponse>();
    return response.result;
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
