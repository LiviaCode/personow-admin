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

// 🔧 ATUALIZADO: tipagem mais completa, alinhada com a agenda que o aluno criou
export interface PersonalAgenda {
  id: string;
  title: string;
  date_init: string;
  date_end: string;
  status: string;
  aluno_id: string;
  Aluno?: {
    id: string;
    nome: string;
    email: string;
  };
}

export async function getAulaPersonal(id: string) {
  try {
    const response = await api
      .get(`personal/${id}?$select=id&$expand=aulas,agenda`)
      .json<getAulaResponse>();

    console.log("DEBUG getAulaPersonal RESPONSE:", response);
    console.log("AulaAgendas:", response.AulaAgendas);
    console.log("PersonalAgendas (agenda):", response.PersonalAgendas);

    return response;
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
