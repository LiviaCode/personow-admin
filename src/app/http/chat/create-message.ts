import { api } from "../../api-client";

export interface CreateMessageRequest {
  conversa_id: number;
  remetente_id: number;
  tipo_remetente: string;
  conteudo: string;
}

export interface createMessageResponse {
  id: number;
  conversa_id: string;
  remetente_id: string;
  tipo_remetente: string;
  conteudo: string;
  created_at: string;
}

export default async function createMessage({
  conversa_id,
  remetente_id,
  tipo_remetente,
  conteudo,
}: CreateMessageRequest) {
  try {
    const response = await api
      .post("chat/mensagens/", {
        json: {
          conversa_id,
          remetente_id,
          tipo_remetente,
          conteudo,
        },
      })
      .json<createMessageResponse>();

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
