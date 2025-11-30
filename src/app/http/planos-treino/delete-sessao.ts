import { api } from "@/app/api-client";

export async function deleteSessao(id: number) {
  try {
    const response = await api.delete(`sessao/treino/delete/${id}`).json();
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
