import { api } from "../../api-client";

export interface getAulaResponse {
  id: string;
  AulaAgendas: AulaAgenda[];
  PersonalAgendas: PersonalAgenda[];
}

export interface AulaAgenda {
  id: string;
  aluno_id: string;
  status: string;
  endereco: string;
  date_init: string;
  date_end: string;
  Aluno: {
    id: string;
    nome: string;
    email: string;
  };
}

export interface PersonalAgenda {
  id: string;
  title: string;
  date_init: string;
  date_end: string;
}

export async function getAulaPersonal(id: string) {
  try {
    const response = await api
      .get(`personal/${id}?$select=id&$expand=aulas,agenda`)
      .json<getAulaResponse>();

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