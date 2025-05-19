import { api } from "../api-client";

export interface GetAllmessageResponse {
  id: number;
  conversa_id: string;
  remetente_id: number;
  tipo_remetente: string;
  conteudo: string;
  created_at: string;
}

export default async function getAllmessage(usuario_id: string) {
  try {
    const response = await api
      .get(`chat/mensagens/${usuario_id}/`)
      .json<GetAllmessageResponse[]>();
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
