import { api } from "../../api-client";

export interface getPersonalResponse {
  id: number;
  nome: string;
  experiencia: string;
  cidade: string;
  profissao: string;
  formacao: string;
  areaAtuacao: string;
  modeloAtendimento: string;
  descricao: string;
  PersonalFotos: [{ url: string; filename: string }];
  PersonalAgendas: [];
  AulaAgendas: [];
}

export default async function getPersonal(id: string) {
  try {
    const response = await api
      .get(
        `personal/${id}?$select=id,nome,experiencia,cidade,profissao,formacao,areaAtuacao,modeloAtendimento,descricao&$expand=aulas,foto,agenda`,
      )
      .json<getPersonalResponse>();

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
