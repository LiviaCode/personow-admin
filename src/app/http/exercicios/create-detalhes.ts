import { api } from "@/app/api-client";

export interface createExercicioDetalheRequest {
  id_sessao: string;
  exercicio_personal_id: string;
  ordem: number;
  series: number;
  repeticoes: number;
  tempo_descanso_segundos: number;
  observacoes: string;
}

export async function createExercicioDetalhe({
  id_sessao,
  exercicio_personal_id,
  ordem,
  series,
  repeticoes,
  tempo_descanso_segundos,
  observacoes,
}: createExercicioDetalheRequest) {
  try {
    const response = await api
      .post(`item/exercicio/${id_sessao}`, {
        json: {
          exercicio_personal_id,
          ordem,
          series,
          repeticoes,
          tempo_descanso_segundos,
          observacoes,
        },
      })
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
