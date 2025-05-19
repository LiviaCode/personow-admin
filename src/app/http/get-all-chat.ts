import { api } from "../api-client";

export interface GetAllChatResponse {
  id: number;
  usuario1_id: number;
  tipo_usuario1: string;
  usuario2_id: number;
  tipo_usuario2: string;
  updated_at: string;
  created_at: string;
}

export default async function getAllChat(
  usuario_id: number,
  tipo_usuario: string,
) {
  try {
    const response = await api
      .get(`chat/conversas/${usuario_id}/${tipo_usuario}`)
      .json<GetAllChatResponse[]>();

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
