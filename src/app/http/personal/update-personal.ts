import { api } from "../../api-client";

export interface UpdatePersonalRequest {
  id: number;
  nome: string;
  experiencia: string;
  cidade: string;
  profissao: string;
  formacao: string;
  areaAtuacao: string;
  modeloAtendimento: string;
  descricao: string;
}

export interface UpdatePersonalResponse {
  id: number;
  nome: string;
  experiencia: string;
  cidade: string;
  profissao: string;
  formacao: string;
  areaAtuacao: string;
  modeloAtendimento: string;
  descricao: string;
}

export default async function updatePersonal(data: UpdatePersonalRequest) {
  const token = localStorage.getItem("token");
  try {
    const response = await api
      .put(`personal/${data.id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<UpdatePersonalResponse>();

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
