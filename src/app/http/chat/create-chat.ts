import { api } from "../../api-client";

export interface CreateChatRequest {
  usuario1_id: number;
  tipo_usuario1: string;
  usuario2_id: number;
  tipo_usuario2: string;
}

export interface CreateChatResponse {
  id: string;
  usuario1_id: string;
  tipo_usuario1: string;
  usuario2_id: string;
  tipo_usuario2: string;
  updated_at: string;
  created_at: string;
}

export default async function createChat({
  usuario1_id,
  tipo_usuario1,
  usuario2_id,
  tipo_usuario2,
}: CreateChatRequest) {
  try {
    const response = await api
      .post("chat/conversas/", {
        json: {
          usuario1_id,
          tipo_usuario1,
          usuario2_id,
          tipo_usuario2,
        },
      })
      .json();

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const body = await error.response.json();
      console.error(`Erro ${status}:`, body);
      throw body;
    } else {
      console.error("Erro inesperado:", error);
      throw error;
    }
  }
}
